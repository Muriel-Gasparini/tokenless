import { CompressionResult } from './types';
import { countTokens, calculateReduction } from './tokenizer';
import { CompoundPatternDetector } from '../detection/pattern-detector';
import { Token, tokensToText } from '../token';
import { TokenBaseStrategy } from '../strategies/base/strategy';
import { PolitenessRemovalStrategy } from '../strategies/implementations/politeness-removal';
import { StopwordRemovalStrategy } from '../strategies/implementations/stopword-removal';
import { AbbreviationStrategy } from '../strategies/implementations/abbreviation';
import { ConnectorRemovalStrategy } from '../strategies/implementations/connector-removal';
import { SingleWordContractionStrategy } from '../strategies/implementations/single-word-contraction';
import { getCompoundContractions } from '../data/ptbr-contractions';
import { getCompoundAbbreviations } from '../data/tech-dict';

export class CompressionOrchestrator {
  private readonly patternDetector: CompoundPatternDetector;
  private readonly strategies: TokenBaseStrategy[];

  constructor() {
    const compoundPatterns: [string, string][] = [
      ...getCompoundContractions(),
      ...getCompoundAbbreviations(),
    ];

    this.patternDetector = new CompoundPatternDetector(compoundPatterns);

    this.strategies = [
      new PolitenessRemovalStrategy(),
      new StopwordRemovalStrategy(),
      new AbbreviationStrategy(),
      new ConnectorRemovalStrategy(),
      new SingleWordContractionStrategy(),
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

    let tokens: Token[] = this.patternDetector.detect(text);

    const appliedStrategies: string[] = [];

    for (const strategy of this.strategies) {
      if (strategy.shouldApply(tokens)) {
        tokens = strategy.transform(tokens);
        appliedStrategies.push(strategy.name);
      }
    }

    const compressedText = tokensToText(tokens);
    const compressedTokens = countTokens(compressedText);

    return {
      original: text,
      compressed: compressedText,
      originalTokens,
      compressedTokens,
      reduction: calculateReduction(originalTokens, compressedTokens),
      strategiesApplied: appliedStrategies,
    };
  }
}
