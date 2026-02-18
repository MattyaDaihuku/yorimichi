
# API 検証ガイド (Postman用)

このドキュメントは、PostmanなどのAPIクライアントを使用して開発環境のAPIをテストするためのガイドです。
認証をバイパスして動作確認を行う手順を記載しています。

## 1. 環境設定

### Base URL
`http://localhost:3000`

### 共通ヘッダー (Headers)
すべてのリクエストに以下のヘッダーを設定してください。

| Key | Value | 説明 |
| :--- | :--- | :--- |
| `Content-Type` | `application/json` | JSONボディを使用するため必須 |
| `X-Test-User-Id` | `aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa` | 開発用認証バイパス (※有効なUUID形式である必要があります) |

---

## 2. 検証シナリオ (ステップバイステップ)

以下の順番でAPIを叩くことで、チャット開始から分岐、マージまでの基本フローを確認できます。
※IDはサンプルです。必要に応じて書き換えてください。

### Step 0: データベースリセット (任意)
データをクリアな状態にします。

*   **Endpoint**: `POST /api/internal/debug/reset`
*   **Body**: なし

### Step 0.5: テストユーザー作成
開発環境用のテストユーザー (`aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa`) を作成します。
`init` APIを呼ぶ前に必ず実行してください。

*   **Endpoint**: `POST /api/internal/debug/user/init`
*   **Body**: なし

### Step 1: 新規チャット開始
チャット、メインブランチ、最初のメッセージを一括で作成します。

*   **Endpoint**: `POST /api/internal/chat/init`
*   **Body**:
```json
{
  "chat_id": "e01726ca-9730-4be6-a36c-2f9876251bd4",
  "branch_id": "d28a3036-74fc-4b8c-b631-419b786c5720",
  "block_id": "23af6c61-05bf-4099-b13c-074402633002",
  "message": "GitChatのコンセプトについて教えてください"
}
```
*   **確認事項**: ステータス200が返り、AIからの応答テキストがストリーミングされること（ツールによっては一括表示）。

### Step 2: チャットデータの確認 (GET)
作成されたデータが正しく保存されているか確認します。

*   **Endpoint**: `GET /api/internal/chat/e01726ca-9730-4be6-a36c-2f9876251bd4`
*   **Body**: なし
*   **確認事項**:
    *   ステータス `200 OK` が返ること。
    *   レスポンスが以下のJSON形式（`chat_id` と `branches`, `blocks` のMap）になっていること。

    ```json
    {
      "chat_id": "e01726ca-9730-4be6-a36c-2f9876251bd4",
      "chat_title": "GitChatのコンセプトについて教えてください",
      "created_at": "...",
      "branches": {
        "d28a3036-74fc-4b8c-b631-419b786c5720": {
          "branch_id": "d28a3036-74fc-4b8c-b631-419b786c5720",
          "chat_id": "e01726ca-9730-4be6-a36c-2f9876251bd4",
          "status": "active",
          "depth": 0,
          ...
        }
      },
      "blocks": {
        "23af6c61-05bf-4099-b13c-074402633002": {
          "block_id": "23af6c61-05bf-4099-b13c-074402633002",
          "branch_id": "d28a3036-74fc-4b8c-b631-419b786c5720",
          "user_content": "GitChatのコンセプトについて教えてください",
          "ai_content": "...",
          ...
        }
      }
    }
    ```

### Step 3: メインブランチで会話を継続
同じブランチに新しいメッセージを追加します。

*   **Endpoint**: `POST /api/internal/message/send`
*   **Body**:
```json
{
  "branch_id": "d28a3036-74fc-4b8c-b631-419b786c5720",
  "chat_id": "e01726ca-9730-4be6-a36c-2f9876251bd4",
  "block_id": "b6b9074c-47ea-4df2-bc8e-171b305e5595",
  "message": "なるほど、ではそのメリットは何ですか？",
  "history": [
    { "role": "user", "content": "GitChatのコンセプトについて教えてください" },
    { "role": "assistant", "content": "(AIの回答)" }
  ]
}
```
*   **Note**: `history` はAIにコンテキストを渡すために必要です。実際のアプリではフロントエンドが構築して送信します。

### Step 4: 新しいブランチを作成 (分岐)
Step 1で作った最初の会話ブロック (`23af...`) から分岐して、別の話題を展開します。

*   **Endpoint**: `POST /api/internal/branch/create`
*   **Body**:
```json
{
  "branch_id": "34a02302-6020-4a88-81e0-011832049830",
  "chat_id": "e01726ca-9730-4be6-a36c-2f9876251bd4",
  "parent_branch_id": "d28a3036-74fc-4b8c-b631-419b786c5720",
  "parent_block_id": "23af6c61-05bf-4099-b13c-074402633002",
  "block_id": "95d52251-8742-4f33-8889-183011328901",
  "depth": 1,
  "message": "技術スタックについて詳しく",
  "history": [
    { "role": "user", "content": "GitChatのコンセプトについて教えてください" },
    { "role": "assistant", "content": "(AIの回答)" }
  ]
}
```
*   **確認事項**:
    *   新しいブランチ (`34a0...`) が作成される。
    *   親ブランチ (`d28a...`) が `locked` ステータスになるかどうか再度GETして確認すると良いでしょう。

### Step 5: ブランチをマージ
Step 4で作ったブランチの内容をメインブランチに統合します。
※マージ先となる親ブランチ (`d28a...`) に、新しいブロックとしてコピーされます。

*   **Endpoint**: `POST /api/internal/branch/merge`
*   **Body**:
```json
{
  "branch_id": "34a02302-6020-4a88-81e0-011832049830",
  "copied_block_id": "7b3b6c23-1089-497b-9189-222271822812"
}
```
*   **確認事項**:
    *   元のブランチ (`34a0...`) のステータスが `merged` になる。
    *   親ブランチ (`d28a...`) のステータスが `active` (ロック解除) になる。
    *   親ブランチに新しいブロック (`7b3b...`) が追加されている。

---

## 3. その他のAPI

### ブランチの削除 (ゴミ箱)
*   **Endpoint**: `POST /api/internal/branch/trash`
*   **Body**:
```json
{
  "trash_branch_id": "34a02302-6020-4a88-81e0-011832049830"
}
```

### DBダンプ (開発用)
データベースの中身をJSON形式ですべて取得します。

*   **Endpoint**: `GET /api/internal/debug/dump`
*   **Body**: なし

## 4. トラブルシューティング

*   **500 Internal Error**: `docker logs gitchat-dev` でログを確認してください。Prismaのエラーである場合が多いです。
*   **AI応答がない**: `.env.local` のAPIキー設定を確認してください。
*   **Prisma Client Error**: 開発環境では `npm run dev` で起動しているため、自動生成ファイルのパスなどが合っているか確認してください。
