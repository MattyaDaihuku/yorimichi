export const AVAILABLE_MODELS = [
	"gemini-2.5-flash",
	"gemini-2.5-flash-lite",
	"gemini-3-flash-preview",
	"gemma-3-27b-it",
] as const;

export type AiModel = (typeof AVAILABLE_MODELS)[number];

export const ACTIVE_MODEL: AiModel = "gemini-2.5-flash";
