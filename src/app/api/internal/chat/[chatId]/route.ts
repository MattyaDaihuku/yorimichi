import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getAuthUserId } from "@/lib/auth-utils";
import { Branches, Block } from "@/generated/prisma";
import { z } from "zod";

// Type definitions to help with the recursive structure (internally)
type BranchWithBlocks = Branches & { blocks: Block[] };

const patchSchema = z.object({
  is_pinned: z.boolean(),
});

export async function GET(
  req: Request,
  { params }: { params: Promise<{ chatId: string }> },
) {
  try {
    const userId = await getAuthUserId(req);
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const { chatId } = await params;

    const chat = await prisma.chatlist.findUnique({
      where: { chat_id: chatId },
      select: {
        chat_id: true,
        chat_title: true,
        created_at: true,
        user_id: true,
      },
    });

    if (!chat || chat.user_id !== userId) {
      return new NextResponse("Chat not found", { status: 404 });
    }

    // 1. Fetch all NON-DELETED branches and blocks for this chat
    // We fetch everything first to minimize DB queries, then filter in memory.
    const allBranches = await prisma.branches.findMany({
      where: {
        chat_id: chatId,
        status: { in: ["active", "locked"] },
      },
      include: {
        blocks: {
          orderBy: { created_at: "asc" },
        },
      },
    });

    // 2. Build Maps for fast lookup
    const branchLookup = new Map<string, BranchWithBlocks>();
    const branchesByParentBlock = new Map<string, BranchWithBlocks[]>();

    // Find the root branch (depth 0, no parent)
    let rootBranch: BranchWithBlocks | null = null;

    for (const branch of allBranches) {
      branchLookup.set(branch.branch_id, branch);

      if (branch.depth === 0 && !branch.parent_branch_id) {
        rootBranch = branch;
      }

      if (branch.parent_block_id) {
        const existing =
          branchesByParentBlock.get(branch.parent_block_id) || [];
        existing.push(branch);
        branchesByParentBlock.set(branch.parent_block_id, existing);
      }
    }

    // 3. Recursive Traversal to collect reachable nodes
    const reachableBranchIds = new Set<string>();
    const reachableBlockIds = new Set<string>();

    // Queue for BFS traversal: [Branch]
    const queue: BranchWithBlocks[] = [];

    if (rootBranch) {
      queue.push(rootBranch);
      reachableBranchIds.add(rootBranch.branch_id);
    }

    while (queue.length > 0) {
      const currentBranch = queue.shift()!;

      // Add all blocks in this branch
      for (const block of currentBranch.blocks) {
        reachableBlockIds.add(block.block_id);

        // Find branches that fork off from this block
        const childBranches = branchesByParentBlock.get(block.block_id);
        if (childBranches) {
          for (const child of childBranches) {
            if (!reachableBranchIds.has(child.branch_id)) {
              reachableBranchIds.add(child.branch_id);
              queue.push(child);
            }
          }
        }
      }
    }

    // 4. Construct Response Data (Only reachable nodes)
    const branchMap: Record<string, any> = {};
    const blockMap: Record<string, any> = {};

    for (const branch of allBranches) {
      if (!reachableBranchIds.has(branch.branch_id)) continue;

      // Add reachable blocks of this branch
      for (const block of branch.blocks) {
        // Technically all blocks of a reachable branch are reachable (linear history),
        // but we double check logic if needed. Here we just add them.
        blockMap[block.block_id] = {
          block_id: block.block_id,
          branch_id: block.branch_id,
          user_content: block.user_content,
          ai_content: block.ai_content,
          created_at: block.created_at,
          update_at: block.update_at,
        };
      }

      // Add Branch info
      branchMap[branch.branch_id] = {
        branch_id: branch.branch_id,
        chat_id: branch.chat_id,
        parent_branch_id: branch.parent_branch_id,
        parent_block_id: branch.parent_block_id,
        branch_title: branch.branch_title,
        status: branch.status,
        depth: branch.depth,
        created_at: branch.created_at,
        update_at: branch.update_at,
      };
    }

    const responseData = {
      chat_id: chat.chat_id,
      chat_title: chat.chat_title,
      created_at: chat.created_at,
      branches: branchMap,
      blocks: blockMap,
    };

    return NextResponse.json(responseData);
  } catch (error) {
    console.error("[CHAT_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ chatId: string }> },
) {
  try {
    const userId = await getAuthUserId(req);
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const { chatId } = await params;
    const body = await req.json();
    const validation = patchSchema.safeParse(body);

    if (!validation.success) {
      return new NextResponse(JSON.stringify(validation.error), {
        status: 400,
      });
    }

    const updated = await prisma.chatlist.updateMany({
      where: {
        chat_id: chatId,
        user_id: userId,
      },
      data: {
        is_pinned: validation.data.is_pinned,
      },
    });

    if (updated.count === 0) {
      return new NextResponse("Chat not found", { status: 404 });
    }

    return NextResponse.json({
      chat_id: chatId,
      is_pinned: validation.data.is_pinned,
    });
  } catch (error) {
    console.error("[CHAT_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ chatId: string }> },
) {
  try {
    const userId = await getAuthUserId(req);
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const { chatId } = await params;

    const chat = await prisma.chatlist.findFirst({
      where: {
        chat_id: chatId,
        user_id: userId,
      },
      select: { chat_id: true },
    });

    if (!chat) {
      return new NextResponse("Chat not found", { status: 404 });
    }

    const result = await prisma.$transaction(async (tx) => {
      const branches = await tx.branches.findMany({
        where: { chat_id: chatId },
        select: { branch_id: true },
      });

      const branchIds = branches.map((branch) => branch.branch_id);

      const deletedBlocks =
        branchIds.length > 0
          ? await tx.block.deleteMany({
              where: {
                branch_id: { in: branchIds },
              },
            })
          : { count: 0 };

      const deletedBranches =
        branchIds.length > 0
          ? await tx.branches.deleteMany({
              where: {
                branch_id: { in: branchIds },
              },
            })
          : { count: 0 };

      const deletedChats = await tx.chatlist.deleteMany({
        where: {
          chat_id: chatId,
          user_id: userId,
        },
      });

      return {
        deletedBlocks: deletedBlocks.count,
        deletedBranches: deletedBranches.count,
        deletedChats: deletedChats.count,
      };
    });

    return NextResponse.json({
      status: "ok",
      chat_id: chatId,
      ...result,
    });
  } catch (error) {
    console.error("[CHAT_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
