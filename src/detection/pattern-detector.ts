import { Token, TokenType, TransformSource, createToken } from '../token';
import { normalizeText, splitWords } from '../core/text-utils';

export interface PatternRule {
  readonly pattern: string;
  readonly replacement: string;
  readonly wordCount: number;
}

export class CompoundPatternDetector {
  private readonly patterns: Map<string, PatternRule>;
  private readonly maxWordCount: number;

  constructor(patterns: [string, string][]) {
    this.patterns = new Map();
    let max = 0;

    for (const [pattern, replacement] of patterns) {
      const wordCount = splitWords(pattern).length;
      const normalizedPattern = normalizeText(pattern);

      this.patterns.set(normalizedPattern, {
        pattern: normalizedPattern,
        replacement,
        wordCount,
      });

      if (wordCount > max) {
        max = wordCount;
      }
    }

    this.maxWordCount = max;
  }

  detect(text: string): Token[] {
    const words = splitWords(text);
    const tokens: Token[] = [];
    let i = 0;

    while (i < words.length) {
      let matched = false;

      for (let windowSize = this.maxWordCount; windowSize > 0; windowSize--) {
        if (i + windowSize > words.length) continue;

        const phrase = words.slice(i, i + windowSize).join(' ');
        const normalizedPhrase = normalizeText(phrase);
        const rule = this.patterns.get(normalizedPhrase);

        if (rule) {
          tokens.push(
            createToken(rule.replacement, TokenType.COMPOUND, phrase, {
              pattern: rule.pattern,
              source: TransformSource.COMPOUND_PATTERN,
            })
          );
          i += windowSize;
          matched = true;
          break;
        }
      }

      if (!matched) {
        tokens.push(createToken(words[i], TokenType.ATOMIC, words[i]));
        i++;
      }
    }

    return tokens;
  }

  hasPattern(phrase: string): boolean {
    return this.patterns.has(normalizeText(phrase));
  }

  getPatternCount(): number {
    return this.patterns.size;
  }
}
