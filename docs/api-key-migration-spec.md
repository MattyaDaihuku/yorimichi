# APIキー管理ならびにAIプロバイダー対応移行仕様書

## 1. 目的と概要
- **APIキー管理のフロントエンド化**: 既存の `.env.local` に保存されていたサーバーサイドの Google Gemini API キーを削除し、フロントエンド側からリクエスト時にAPIキーを送信するアーキテクチャへと変更する。バックエンドでは送られてきたAPIキーを用いてVercel AI SDKを実行し、キー自体は永続保存しない。
- **マルチプロバイダー対応**: 有名なプロバイダー（Google Gemini, OpenAI, Anthropic）に対応し、ユーザーがフロントエンドからモデルを選択して各種AIの機能を利用できるようにする。
- **一時的な定数による実装**: 本来設定画面となる部分は別の開発者が対応中のため、一時的にフロントエンド側のコード（定数）にテスト用APIキーをハードコードして開発・検証ができる状態をとる。

## 2. 変更・実装ステップ

### Step 1: 依存パッケージの導入と連携設定
- `compose.yaml` で規定された `app` (コンテナ名 `gitchat-dev`) 上において、プロバイダ連携のため以下の依存関係を `package.json` に追加（またはインストール）する。
  - `@ai-sdk/openai`
  - `@ai-sdk/anthropic`

### Step 2: フロントエンド(定数)でのAPIキー設定とリクエスト処理の修正
- `src/lib/temp-api-keys.ts` (新規作成) 等の一時ファイルに、フロントエンドのクライアントサイドから読み込める形で各プロバイダー用APIキーをハードコードして定義する。
  ```typescript
  export const TEMP_API_KEYS = {
    google: "YOUR_GOOGLE_API_KEY",
    openai: "YOUR_OPENAI_API_KEY",
    anthropic: "YOUR_ANTHROPIC_API_KEY"
  };
  ```
  *(注: 後日この部分は設定画面から取得できる `localStorage` や DB設定などに置き換わります)*
- クライアント通信部分の修正
  - `src/lib/chat-send.ts` などの「メッセージ送信」を行うフロントエンド処理で、APIリクエストボディ（またはヘッダー）に、選択したモデルと関連するAPIキーを含めてバックエンドへ送信するよう改修する。

### Step 3: モデル選択・定義の更新
- `src/lib/ai-active-model.ts` における `AVAILABLE_MODELS` を拡張する。
- 追加モデル例:
  - OpenAI: `gpt-4o`, `gpt-4o-mini`
  - Anthropic: `claude-3-5-sonnet-latest`, `claude-3-5-haiku-latest`
  - Google: `gemini-2.5-flash`, `gemini-2.5-pro` (既存のものに加えてプロバイダ指定を明確化)
- 既存のUI（デザイン変更なし）でこれらが選択可能になり、内部値としてバックエンドに渡るようにする。

### Step 4: バックエンドのプロバイダー振り分けロジックの実装
- `src/lib/chat-utils.ts` の `processChatInteraction` (ならびにそれを呼び出す各種 Route Handler) を修正する。
- クライアントから受け取った**APIキー**と**モデル名**を元に、次のように分岐・呼び出しを行う：
  - モデル名が `gpt-` で始まる場合は `@ai-sdk/openai` を初期化。
  - モデル名が `claude-` で始まる場合は `@ai-sdk/anthropic` を初期化。
  - モデル名が `gemini-` で始まる場合は `@ai-sdk/google` を初期化。
- Vercel AI SDK の `streamText` にて指定モデルを正しく起動し、レスポンスを返す。

### Step 5: .env.local等の整理
- `.env.local` から `GOOGLE_GENERATIVE_AI_API_KEY` 等の設定を物理的に取り除く、もしくは無効化し、旧実装のようにサーバーローカルのAPIキーを勝手に読み取ろうとする処理が実行されないことを確認する。

### Step 6: 動作検証
- 開発環境(Docker)からコンテナ内で npm run dev が正常に動作するか、複数モデルでチャット可能なフローを通し検証する。
