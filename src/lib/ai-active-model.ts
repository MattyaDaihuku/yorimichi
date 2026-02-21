export const AVAILABLE_MODELS = [
	// "gemini-2.5-flash",
	// "gemini-2.5-flash-lite",
	// "gemini-3-flash-preview",
	// "gemma-3-27b-it",
	"gemma-3-1b-it",
] as const;

export type AiModel = (typeof AVAILABLE_MODELS)[number];

export const ACTIVE_MODEL: AiModel = "gemma-3-1b-it";
