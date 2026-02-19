import { NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export async function GET() {
  // user_idをClerkから取得
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Clerkから詳細情報を取得
  const clerkUser = await currentUser();
  if (!clerkUser) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const email = clerkUser.emailAddresses[0]?.emailAddress;
  const name =
    clerkUser.fullName ??
    `${clerkUser.firstName ?? ""} ${clerkUser.lastName ?? ""}`.trim() ??
    "No Name";

  if (!email) {
    return NextResponse.json({ error: "Email not found" }, { status: 400 });
  }

  try {
    // Supabaseに保存 (Upsert: なければ作成、あれば更新)
    const savedUser = await prisma.users.upsert({
      where: { user_id: userId },
      update: {
        name,
        email,
      },
      create: {
        user_id: userId,
        name,
        email,
      },
    });

    return NextResponse.json({
      success: true,
      user: savedUser,
    });
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json({ error: "Database Sync Failed" }, { status: 500 });
  }
}
