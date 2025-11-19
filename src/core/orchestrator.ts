import { CompressionStrategy, CompressionResult } from './types';
import { countTokens, calculateReduction } from './tokenizer';
import { PtBrOptimizationStrategy } from '../strategies/ptbr-optimization';
import { PolitenessRemovalStrategy } from '../strategies/politeness-removal';
import { StopwordRemovalStrategy } from '../strategies/stopword-removal';
import { AbbreviationStrategy } from '../strategies/abbreviation';
import { ConnectorRemovalStrategy } from '../strategies/connector-removal';

export class CompressionOrchestrator {
  private strategies: CompressionStrategy[];

  constructor() {
    this.strategies = [
      new PtBrOptimizationStrategy(),
      new PolitenessRemovalStrategy(),
      new StopwordRemovalStrategy(),
      new AbbreviationStrategy(),
      new ConnectorRemovalStrategy(),
    ].sort((a, b) => a.priority - b.priority);
  }

  compress(text: string): CompressionResult {
    if (!text || text.trim().length === 0) {
      return {
        original: text,
        compressed: text,
        originalTokens: 0,
        compressedTokens: 0,
        reduction: 0,
        strategiesApplied: [],
      };
    }

    const originalTokens = countTokens(text);
    let currentText = text;
    const appliedStrategies: string[] = [];

    for (const strategy of this.strategies) {
      if (strategy.shouldApply(currentText)) {
        currentText = strategy.compress(currentText);
        appliedStrategies.push(strategy.name);
      }
    }

    const compressedTokens = countTokens(currentText);

    return {
      original: text,
      compressed: currentText,
      originalTokens,
      compressedTokens,
      reduction: calculateReduction(originalTokens, compressedTokens),
      strategiesApplied: appliedStrategies,
    };
  }
}
