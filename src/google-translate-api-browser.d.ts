declare module 'google-translate-api-browser' {
  interface TranslateOptions {
    from?: string;
    to?: string;
    corsUrl?: string;
  }

  interface TranslateResult {
    text: string;
    from: {
      language: {
        iso: string;
      };
      text: {
        autoCorrected: boolean;
        value: string;
        didYouMean: boolean;
      };
    };
  }

  function translate(text: string, options?: TranslateOptions): Promise<TranslateResult>;

  export default translate;
}
