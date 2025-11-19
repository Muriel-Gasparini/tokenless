export interface CompressionResult {
  original: string;
  compressed: string;
  originalTokens: number;
  compressedTokens: number;
  reduction: number;
  strategiesApplied: string[];
}

export interface CompressionStrategy {
  readonly name: string;
  readonly priority: number;
  compress(text: string): string;
  shouldApply(text: string): boolean;
}
