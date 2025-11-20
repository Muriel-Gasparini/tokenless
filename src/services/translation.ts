const CORS_PROXY = "https://corsproxy.io/?";

export interface TranslationResult {
  text: string;
  from: string;
  to: string;
}

interface GoogleTranslateResponse {
  detectedSourceLanguage?: string;
}

export class TranslationService {
  private async fetchTranslation(
    text: string,
    sourceLang: string,
    targetLang: string
  ): Promise<{ text: string; detectedLang: string }> {
    const apiUrl = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLang}&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`;
    const proxiedUrl = `${CORS_PROXY}${encodeURIComponent(apiUrl)}`;

    const response = await fetch(proxiedUrl);

    if (!response.ok) {
      throw new Error(`Translation request failed with status ${response.status}`);
    }

    const data = await response.json();

    if (!data || !Array.isArray(data) || !data[0] || !Array.isArray(data[0])) {
      throw new Error("Invalid translation response format");
    }

    const translatedText = data[0]
      .map((segment: Array<string>) => segment[0])
      .filter(Boolean)
      .join("");

    const detectedLang = data[2] || sourceLang;

    return { text: translatedText, detectedLang };
  }

  async translateToEnglish(text: string): Promise<string> {
    if (!text || text.trim().length === 0) {
      return text;
    }

    try {
      const result = await this.fetchTranslation(text, "pt", "en");
      return result.text;
    } catch (error) {
      console.error("Translation failed:", error);
      return text;
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
      const result = await this.fetchTranslation(text, from, to);
      return {
        text: result.text,
        from: result.detectedLang,
        to,
      };
    } catch (error) {
      console.error("Translation failed:", error);
      return { text, from, to };
    }
  }
}
