export const AVAILABLE_MODELS = [
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

export const ACTIVE_MODEL: AiModel = "gemini-2.5-flash";
