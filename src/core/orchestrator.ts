import { CompressionResult } from './types';
import { countTokens, calculateReduction } from './tokenizer';
import { CompoundPatternDetector } from '../detection/pattern-detector';
import { Token, tokensToText } from '../token';
import { TokenBaseStrategy } from '../strategies/base/strategy';
import { TranslationService } from '../services/translation';
import { PolitenessRemovalStrategy } from '../strategies/implementations/politeness-removal';
import { StopwordRemovalStrategy } from '../strategies/implementations/stopword-removal';
import { AbbreviationStrategy } from '../strategies/implementations/abbreviation';
import { ConnectorRemovalStrategy } from '../strategies/implementations/connector-removal';
import { ContractionStrategy } from '../strategies/implementations/contraction';
import { getCompoundContractions, getCompoundAbbreviations } from '../data/dict';

export class CompressionOrchestrator {
  private readonly translationService: TranslationService;
  private readonly patternDetector: CompoundPatternDetector;
  private readonly strategies: TokenBaseStrategy[];

  constructor() {
    this.translationService = new TranslationService();

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
      new ContractionStrategy(),
    ].sort((a, b) => a.priority - b.priority);
  }

  async compress(text: string): Promise<CompressionResult> {
    if (!text || text.trim().length === 0) {
      return {
        original: text,
        translated: text,
        compressed: text,
        originalTokens: 0,
        translatedTokens: 0,
        compressedTokens: 0,
        reduction: 0,
        strategiesApplied: [],
      };
    }

    const originalTokens = countTokens(text);

    const translatedText = await this.translationService.translateToEnglish(text);
    const translatedTokens = countTokens(translatedText);

    let tokens: Token[] = this.patternDetector.detect(translatedText);

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
      translated: translatedText,
      compressed: compressedText,
      originalTokens,
      translatedTokens,
      compressedTokens,
      reduction: calculateReduction(originalTokens, compressedTokens),
      strategiesApplied: appliedStrategies,
    };
  }
}
