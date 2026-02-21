# 実装仕様書: ブランチマージ機能

## 1. 概要
分岐したブランチの内容を親ブランチに統合（マージ）する機能を実装します。マージ後、親ブランチは再びアクティブになり、マージされたブランチおよびその兄弟ブランチの状態が更新されます。

## 2. 変更内容

### 2.1. API エンドポイント
- **Endpoint**: `POST /api/internal/branch/merge`
- **Body**:
  ```json
  {
    "branch_id": "string (UUID)",
    "copied_block_id": "string (UUID)"
  }
  ```
- **動作**:
  1. 指定されたブランチの全ブロックを親ブランチにコピー。
  2. マージされたブランチのステータスを `merged` に変更。
  3. 同じ親を持つ他のアクティブな兄弟ブランチのステータスを `dropped` に変更。
  4. ロックされていた親ブランチのステータスを `active` に戻す。

### 2.2. フロントエンド (Zustand)
- `useChatStore` に `mergeBranch` アクション（または直接 `fetchChat` による同期）を検討。
- ユーザーの要求に従い、ストア上のデータもAPIと同じロジックで更新し、UIのレスポンス性を高める。

### 2.3. UI (React)
- `MessageBlock`: 左下のチェックボタン（マージボタン）にクリックイベントを追加。
- `BlockList`: マージ操作のコールバックを伝播。
- `ChatWindow`: APIを呼び出し、成功後に状態を同期する `handleMerge` を実装。

## 3. ステータス遷移
- **Merged Branch**: `active` -> `merged`
- **Sibling Branches**: `active` -> `dropped` (同じ親ブロック・親ブランチを持つもの)
- **Parent Branch**: `locked` -> `active`
