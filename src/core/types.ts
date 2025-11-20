export interface CompressionResult {
  original: string;
  translated: string;
  compressed: string;
  originalTokens: number;
  translatedTokens: number;
  compressedTokens: number;
  reduction: number;
  strategiesApplied: string[];
}
