export const AVAILABLE_MODELS = [
	"gemini-3.1-flash-lite-preview",
	"gemini-2.5-flash",
	"gemini-2.5-flash-lite",
	"gemini-3-flash-preview",
	"gemma-3-27b-it",
	"gpt-4o",
	"gpt-4o-mini",
	"claude-3-5-sonnet-latest",
	"claude-3-5-haiku-latest",
] as const;

export type AiModel = (typeof AVAILABLE_MODELS)[number];

export type ModelProvider = "google" | "openai" | "anthropic";

type ModelConfig = {
	readonly displayName: string;
	readonly provider: ModelProvider;
};

/** 各モデルのAPI名 → 表示名・プロバイダ情報のマッピング */
export const MODEL_DISPLAY_CONFIG: Record<AiModel, ModelConfig> = {
	"gemini-3.1-flash-lite-preview": { displayName: "Gemini 3.1 Flash Lite", provider: "google" },
	"gemini-2.5-flash": { displayName: "Gemini 2.5 Flash", provider: "google" },
	"gemini-2.5-flash-lite": { displayName: "Gemini 2.5 Flash Lite", provider: "google" },
	"gemini-3-flash-preview": { displayName: "Gemini 3 Flash", provider: "google" },
	"gemma-3-27b-it": { displayName: "Gemma 3 27B", provider: "google" },
	"gpt-4o": { displayName: "GPT-4o", provider: "openai" },
	"gpt-4o-mini": { displayName: "GPT-4o Mini", provider: "openai" },
	"claude-3-5-sonnet-latest": { displayName: "Claude 3.5 Sonnet", provider: "anthropic" },
	"claude-3-5-haiku-latest": { displayName: "Claude 3.5 Haiku", provider: "anthropic" },
};

/** プロバイダの表示ラベル */
export const PROVIDER_LABELS: Record<ModelProvider, string> = {
	google: "Google",
	openai: "OpenAI",
	anthropic: "Anthropic",
};

/** デフォルト（無料）モデル */
export const ACTIVE_MODEL: AiModel = "gemini-3.1-flash-lite-preview";

/** 無料枠の1日あたり利用上限回数 */
export const FREE_DAILY_LIMIT = 5;
