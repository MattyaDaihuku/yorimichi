
# API 仕様書 (v6)

## 概要
フロントエンドとの衝突を避けるため、エンドポイントは `/api/internal/*` 配下に配置されています。
AIのレートリミット対策として、バックエンドでは複数のAPIキー（`GOOGLE_GENERATIVE_AI_API_KEY`, `_2`...`_20`）をランダムに切り替えて使用します。

## 共通仕様
- **Content-Type**: `application/json` （POST時）
- **認証**: Clerkによる認証、または開発環境では `X-Test-User-Id` ヘッダーによるユーザー指定が可能。
- **エラーレスポンス**: `500 Internal Error` (詳細な原因はセキュリティ上隠蔽される場合があります)

---

## 0. チャットリストの取得
**Endpoint**: `GET /api/internal/chat/list`

認証されたユーザーに紐付くチャットの一覧を取得します。

### Output (JSON)
```json
[
  {
    "chat_id": "uuid-chat-1",
    "chat_title": "チャットのタイトル",
    "is_pinned": false,
    "created_at": "...",
    "main_branch_id": "uuid-root-branch-id"
  },
  ...
]
```

---

## 1. 新規チャット開始
**Endpoint**: `POST /api/internal/chat/init`

フロントエンドで各種ID (`chat_id`, `branch_id`, `block_id`) を生成し、最初の質問と共にAPIを呼び出します。

### Body (入力例)
```json
{
  "chat_id": "uuid-chat-1",
  "branch_id": "uuid-branch-1",
  "block_id": "uuid-block-1",
  "message": "こんにちは"
}
```

---

## 2. チャット履歴取得 (既存チャット再開時)
**Endpoint**: `GET /api/internal/chat/[chatId]`

チャットの全ブランチとブロックを、**IDをキーとしたオブジェクト（Map）形式**で取得します。Zustand等のState管理に適した形式です。

### Request Path
URL: `/api/internal/chat/uuid-chat-1`

### Output (JSON)
```json
{
  "chat_id": "uuid-chat-1",
  "chat_title": "...",
  "created_at": "...",
  "branches": {
    "uuid-branch-1": {
      "branch_id": "uuid-branch-1",
      "parent_branch_id": null,
      "branch_title": "...",
      "status": "active",
      "depth": 0,
      ...
    },
    "uuid-branch-2": { ... }
  },
  "blocks": {
    "uuid-block-1": {
      "block_id": "uuid-block-1",
      "branch_id": "uuid-branch-1",
      "user_content": "こんにちは",
      "ai_content": "はい、こんにちは。",
      "created_at": "..."
    },
    "uuid-block-2": { ... }
  }
}
```

---

## 3. ブランチ作成（分岐して質問）
**Endpoint**: `POST /api/internal/branch/create`

既存の会話の**最新ブロック**（Tip）から分岐して新しいブランチを作成します。
**注意**: 分岐元のブランチ（親）は自動的にロックされ、以降の更新ができなくなります（Tip-Only Policy）。

### Body (入力例)
```json
{
  "branch_id": "uuid-branch-new",
  "chat_id": "uuid-chat-1",
  "parent_branch_id": "uuid-branch-1",
  "parent_block_id": "uuid-block-tip",
  "block_id": "uuid-block-new",
  "depth": 1,
  "message": "その話をもっと詳しく",
  "history": [ ... ]
}
```

---

## 4. メッセージ送信（既存ブランチで会話継続）
**Endpoint**: `POST /api/internal/message/send`

分岐せず、現在のブランチに新しいブロックを追加して質問します。

### Body (入力例)
```json
{
  "branch_id": "uuid-branch-1",
  "block_id": "uuid-block-2",
  "message": "なるほど、では次は？",
  "history": [ ... ]
}
```

---

## 5. ブランチのマージ
**Endpoint**: `POST /api/internal/branch/merge`

指定したブランチの内容を親ブランチに統合（ブロックのコピー）し、自身のステータスを `merged` に変更します。

### Body (入力例)
```json
{
  "branch_id": "uuid-branch-new",
  "copied_block_id": "uuid-block-new"
}
```

---

## 6. ブランチのゴミ箱送り
**Endpoint**: `POST /api/internal/branch/trash`

ブランチとその子孫ブランチのステータスを `deleted` （ゴミ箱）に変更します。

### Body (入力例)
```json
{
  "trash_branch_id": "uuid-branch-1"
}
```

---

## 7. データベースリセット (開発用)
**Endpoint**: `POST /api/internal/debug/reset`

**注意**: 全てのデータを削除します。開発環境でのみ使用してください。
