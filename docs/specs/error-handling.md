# エラーハンドリング仕様書

## 概要
Gemini APIを使用したチャット機能におけるエラーハンドリング、特にレートリミット（429）への対応と、APIキーおよびモデルのローテーションロジック、およびUUID重複エラーの扱いについて定義します。

## 対象ファイル
- Backend: `src/lib/chat-utils.ts`, `src/app/api/internal/message/send/route.ts`
- Frontend: `src/components/chat/main-branch-view.tsx`
- Configuration: `src/lib/ai-active-model.ts` (参照のみ)

## エラーハンドリング方針

### 1. レートリミット (429 Too Many Requests)
Gemini APIがレートリミットエラー（`429`）を返した場合、以下の情報を識別および処理します。

- **識別**: エラーレスポンスの内容から、`Daily Limit`（1日あたりの制限）か `Rate Limit`（分間/短時間の制限）かを判別します。
- **レスポンスコード**: フロントエンドに対して HTTP ステータス `429` を返却し、JSONボディに詳細なエラーコードを含めます。
  - `RATE_LIMIT_DAILY`: 1日のクォータ超過
  - `RATE_LIMIT_MINUTE`: 短時間のレート制限

### 2. UUID重複エラー (409 Conflict)
クライアント生成のUUIDが万が一重複した場合、システムはこれを検知してエラーを返却します。
- **理由**: クライアント側でIDを再生成してリトライ可能にするため。データの整合性を保つため。
- **レスポンスコード**: HTTP ステータス `409`。JSONボディに `{ "code": "UUID_CONFLICT" }`。
- **対応**: 現状の `block.create` 処理を `block.upsert` に変更することで、リトライ時に同じ `block_id` を送信してもエラーにならないように緩和することも検討しますが、純粋な新規作成での重複はエラーとします（リトライロジックの一貫性のため、リトライ時は `upsert` 挙動が望ましい）。
  - **決定事項**: message/send エンドポイントはリトライを前提とするため、`create` ではなく `upsert` を使用して、「同じリクエストの再送」を受け入れられるように変更します。これによりUUID重複エラー自体は「リトライ時の正常動作」として吸収されますが、全く別の文脈で衝突した場合は `upsert` で上書き（または無視）されるか、整合性エラーになります。今回は「リトライ」をスムーズにするため `upsert` を採用します。

## ローテーションロジック (Backend)

`src/lib/chat-utils.ts` にて以下の状態を保持・管理します。

### APIキーのローテーション
- 複数のAPIキー (`GOOGLE_GENERATIVE_AI_API_KEY`, `_2`... `_20`) を配列で管理。
- 現在のインデックス (`currentKeyIndex`) を保持。
- 429エラー発生時、インデックスをインクリメントして次のキーに切り替えます。

### モデルのローテーション
- APIキーをすべて試してもエラーが続く場合、またはAPIキーの切り替えと並行して、モデルを「優先順位順」に切り替えます。
- **優先順位**:
  1. `gemini-2.5-flash`
  2. `gemini-2.5-flash-lite`
  3. `gemini-3-flash-preview`
  4. `gemma-3-27b-it`
- ロジック:
  1. リクエスト受信時、現在の `Active Model` と `Current Key` で試行。
  2. 429エラーが発生した場合:
     - `currentKeyIndex` を更新（Global変数）。
     - 次のキーが利用可能ならそのキーの使用を促すエラーを返す（フロントエンドが再送）。
     - もしキーが一巡した場合（あるいは一定回数連続で429が出た場合）、`Active Model` を次の優先順位のモデルに変更する。

※ ステートレスな環境（Serverlessなど）では変数がリセットされる可能性がありますが、`Next.js` の `dev` サーバーや通常のコンテナ環境ではメモリ内変数が維持される前提で実装します。

## フロントエンド実装 (`main-branch-view.tsx`)

### 自動リトライ機能
- メッセージ送信 (`fetch`) が `429` を返した場合、自動的にリトライを行います。
- **最大リトライ回数**: 5回（APIキーの数やモデル数に応じて調整可能な値、今回は仮置き）。
- リトライ時にはバックエンド側ですでに「次のキー/モデル」への切り替え準備（インデックス更新）が完了していることを期待します。

### フロー
1. ユーザーが送信。
2. `fetch("/api/internal/message/send")` 実行。
3. 成功 -> 完了。
4. 失敗 (429) -> `retryCount < MAX_RETRIES` ならば、1秒待機してから再度 `fetch`。
5. 失敗 (その他) -> エラー表示。

## APIレスポンス定義

### 成功時
Stream Response (変更なし)

### エラー時 (JSON)
```json
{
  "error": "Rate limit exceeded",
  "code": "RATE_LIMIT_MINUTE", // or RATE_LIMIT_DAILY, UUID_CONFLICT, INTERNAL_ERROR
  "retryable": true
}
```
