
import { auth } from "@clerk/nextjs/server";

/**
 * 認証されたユーザーIDを取得するユーティリティ関数
 * 開発環境ではモックIDを使用可能
 */
export async function getAuthUserId(req: Request): Promise<string | null> {
    // 1. Clerkによる認証チェック
    try {
        const { userId } = await auth();
        if (userId) {
            return userId;
        }
    } catch (e) {
        // Clerkミドルウェア外やエラー時は無視して次へ（開発環境用フォールバック）
    }

    // 2. 開発環境用のヘッダーチェック
    // 本番環境ではセキュリティリスクになるため、NODE_ENVチェックを入れることを推奨
    if (process.env.NODE_ENV !== 'production') {
        const testUserId = req.headers.get('X-Test-User-Id');
        if (testUserId) {
            return testUserId;
        }
    }

    return null;
}
