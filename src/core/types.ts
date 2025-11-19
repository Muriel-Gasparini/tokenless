export interface CompressionResult {
  original: string;
  compressed: string;
  originalTokens: number;
  compressedTokens: number;
  reduction: number;
  strategiesApplied: string[];
}
