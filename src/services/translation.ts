import translate from "google-translate-api-browser";

const CORS_PROXY = "https://corsproxy.io/?url=";

export interface TranslationResult {
  text: string;
  from: string;
  to: string;
}

export class TranslationService {
  async translateToEnglish(text: string): Promise<string> {
    if (!text || text.trim().length === 0) {
      return text;
    }

    try {
      const result = await translate(text, {
        from: "pt",
        to: "en",
        corsUrl: CORS_PROXY,
      });
      return result.text;
    } catch (error) {
      console.error("Translation failed:", error);
      throw new Error("Translation service unavailable");
    }
  }

  async translate(
    text: string,
    from: string,
    to: string,
  ): Promise<TranslationResult> {
    if (!text || text.trim().length === 0) {
      return { text, from, to };
    }

    try {
      const result = await translate(text, {
        from,
        to,
        corsUrl: CORS_PROXY,
      });
      return {
        text: result.text,
        from: result.from.language.iso,
        to,
      };
    } catch (error) {
      console.error("Translation failed:", error);
      throw new Error("Translation service unavailable");
    }
  }
}
