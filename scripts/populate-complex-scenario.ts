
import crypto from "node:crypto";

/**
 * GitChat 複雑な分岐・マージシナリオ投入スクリプト
 * 運行方法: npx tsx scripts/populate-complex-scenario.ts
 */

const BASE_URL = "http://localhost:3000";
const USER_ID = "user_39q8uxB2Lmnyuo6q6NdejtDhgOs"; // 既存のテストユーザーID

// ヘルパー：ストリームを読み切る
async function consumeStream(response: Response) {
    if (!response.body) return "";
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let content = "";
    while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        content += decoder.decode(value, { stream: true });
    }
    return content;
}

// ヘルパー：API呼び出し
async function callApi(endpoint: string, method: string, body?: any) {
    process.stdout.write(`[${method}] ${endpoint} ... `);
    const response = await fetch(`${BASE_URL}${endpoint}`, {
        method,
        headers: {
            "Content-Type": "application/json",
            "X-Test-User-Id": USER_ID,
        },
        body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
        const err = await response.text();
        console.error(`\nFAILED: ${response.status} - ${err}`);
        process.exit(1);
    }

    // ストリームレスポンスの場合は読み切る
    if (response.headers.get("content-type")?.includes("text/plain") || !response.headers.get("content-type")?.includes("application/json")) {
        const text = await consumeStream(response);
        console.log("Stream Finished.");
        return text;
    }

    const json = await response.json();
    console.log("Done.");
    return json;
}

// ヘルパー：特定のブランチの履歴をAPIから取得
async function fetchHistory(branchId: string) {
    const data = await callApi(`/api/internal/branch/${branchId}/history`, "GET");
    return data.history || [];
}

async function main() {
    console.log("=== Complex Scenario Start ===\n");

    // 1. 新規チャット開始 (Main Branch)
    const chatId = crypto.randomUUID();
    const mainBranchId = crypto.randomUUID();
    let lastBlockId = crypto.randomUUID();

    await callApi("/api/internal/chat/init", "POST", {
        chat_id: chatId,
        branch_id: mainBranchId,
        block_id: lastBlockId,
        message: "最初の質問です。GitChatの基本概念を教えてください。"
    });

    // 2. メインブランチで会話を継続
    const mainBlock2Id = crypto.randomUUID();
    await callApi("/api/internal/message/send", "POST", {
        chat_id: chatId,
        branch_id: mainBranchId,
        block_id: mainBlock2Id,
        message: "継続の質問です。ブランチ機能の仕組みを詳しく。",
        history: await fetchHistory(mainBranchId)
    });
    lastBlockId = mainBlock2Id;

    // 3. Subブランチ1を切る (Main Q2から分岐)
    const sub1BranchId = crypto.randomUUID();
    const sub1Block1Id = crypto.randomUUID();
    await callApi("/api/internal/branch/create", "POST", {
        chat_id: chatId,
        branch_id: sub1BranchId,
        parent_branch_id: mainBranchId,
        parent_block_id: lastBlockId,
        block_id: sub1Block1Id,
        depth: 1,
        message: "ここから分岐します。UIデザインの方向性を提案して。",
        history: await fetchHistory(mainBranchId)
    });

    // 4. Subブランチ2を並列で切る (Main Q2から分岐)
    const sub2BranchId = crypto.randomUUID();
    const sub2Block1Id = crypto.randomUUID();
    await callApi("/api/internal/branch/create", "POST", {
        chat_id: chatId,
        branch_id: sub2BranchId,
        parent_branch_id: mainBranchId,
        parent_block_id: lastBlockId,
        block_id: sub2Block1Id,
        depth: 1,
        message: "並列の分岐です。パフォーマンスの最適化について話しましょう。",
        history: await fetchHistory(mainBranchId)
    });

    // 5. Subブランチ3を並列で切る (Main Q2から分岐)
    const sub3BranchId = crypto.randomUUID();
    const sub3Block1Id = crypto.randomUUID();
    await callApi("/api/internal/branch/create", "POST", {
        chat_id: chatId,
        branch_id: sub3BranchId,
        parent_branch_id: mainBranchId,
        parent_block_id: lastBlockId,
        block_id: sub3Block1Id,
        depth: 1,
        message: "3つ目の並列。多言語対応について。",
        history: await fetchHistory(mainBranchId)
    });

    // 6. Sub2に追加で質問
    await callApi("/api/internal/message/send", "POST", {
        chat_id: chatId,
        branch_id: sub2BranchId,
        block_id: crypto.randomUUID(),
        message: "具体的にどのライブラリを使うべきですか？",
        history: await fetchHistory(sub2BranchId)
    });

    // 7. Sub3に追加で質問
    await callApi("/api/internal/message/send", "POST", {
        chat_id: chatId,
        branch_id: sub3BranchId,
        block_id: crypto.randomUUID(),
        message: "日本語と英語以外のサポートは必要？",
        history: await fetchHistory(sub3BranchId)
    });

    // 8. Subブランチ1に追加で質問 1
    const sub1Block2Id = crypto.randomUUID();
    await callApi("/api/internal/message/send", "POST", {
        chat_id: chatId,
        branch_id: sub1BranchId,
        block_id: sub1Block2Id,
        message: "継続1。ダークモードの実装についても。",
        history: await fetchHistory(sub1BranchId)
    });

    // 9. Subブランチ1に追加で質問 2
    const sub1Block3Id = crypto.randomUUID();
    await callApi("/api/internal/message/send", "POST", {
        chat_id: chatId,
        branch_id: sub1BranchId,
        block_id: sub1Block3Id,
        message: "継続2。レスポンシブ対応の優先順位は？",
        history: await fetchHistory(sub1BranchId)
    });

    // 8. Subブランチ1から SubSubブランチ1を切る (Sub1末尾から分岐)
    const subSub1BranchId = crypto.randomUUID();
    const subSub1Block1Id = crypto.randomUUID();
    await callApi("/api/internal/branch/create", "POST", {
        chat_id: chatId,
        branch_id: subSub1BranchId,
        parent_branch_id: sub1BranchId,
        parent_block_id: sub1Block3Id,
        block_id: subSub1Block1Id,
        depth: 2,
        message: "Sub1からさらに分岐。モバイルアプリ特有のUIについて。",
        history: await fetchHistory(sub1BranchId)
    });

    // 9. Subブランチ1から SubSubブランチ2を並列で切る
    const subSub2BranchId = crypto.randomUUID();
    const subSub2Block1Id = crypto.randomUUID();
    await callApi("/api/internal/branch/create", "POST", {
        chat_id: chatId,
        branch_id: subSub2BranchId,
        parent_branch_id: sub1BranchId,
        parent_block_id: sub1Block3Id,
        block_id: subSub2Block1Id,
        depth: 2,
        message: "Sub1からの第2分岐。アクセシビリティ対応について。",
        history: await fetchHistory(sub1BranchId)
    });

    // 10. SubSubブランチ1に追加で質問 1
    const subSub1Block2Id = crypto.randomUUID();
    await callApi("/api/internal/message/send", "POST", {
        chat_id: chatId,
        branch_id: subSub1BranchId,
        block_id: subSub1Block2Id,
        message: "継続1。通知バッジのデザイン案をください。",
        history: await fetchHistory(subSub1BranchId)
    });

    // 11. SubSubブランチ1に追加で質問 2
    const subSub1Block3Id = crypto.randomUUID();
    await callApi("/api/internal/message/send", "POST", {
        chat_id: chatId,
        branch_id: subSub1BranchId,
        block_id: subSub1Block3Id,
        message: "継続2。プッシュ通知の許諾ダイアログ。",
        history: await fetchHistory(subSub1BranchId)
    });

    // 12. SubSubブランチ2に追加で質問 1
    const subSub2Block2Id = crypto.randomUUID();
    await callApi("/api/internal/message/send", "POST", {
        chat_id: chatId,
        branch_id: subSub2BranchId,
        block_id: subSub2Block2Id,
        message: "継続1。スクリーンリーダー対応のベストプラクティス。",
        history: await fetchHistory(subSub2BranchId)
    });

    // 13. SubSubブランチ1をSubブランチ1に統合する
    // 統合（Merge）により、SubSub1の最後のブロックの内容がSub1の新しいブロックとしてコピーされる
    await callApi("/api/internal/branch/merge", "POST", {
        branch_id: subSub1BranchId,
        copied_block_id: crypto.randomUUID() // マージ先で作成される新しいブロックのID
    });

    console.log("\n=== Scenario Completed Successfully ===");
    console.log(`Chat ID: ${chatId}`);
    console.log("Check the results using GET /api/internal/chat/" + chatId);
}

main().catch(error => {
    console.error("\nUnexpected Error:", error);
});
