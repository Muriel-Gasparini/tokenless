import { BaseStrategy } from './base.strategy';
import { STOPWORDS } from '../data/stopwords';
import { splitWords, normalizeText, joinWords } from '../core/text-utils';

export class StopwordRemovalStrategy extends BaseStrategy {
  readonly name = 'Remoção de Stopwords';
  readonly priority = 2;

  compress(text: string): string {
    const words = splitWords(text);
    const filtered = words
      .map(word => word.replace(/[.,;:!?]/g, ''))
      .filter(word => {
        if (word.length === 0) return false;
        const normalized = normalizeText(word);
        return !STOPWORDS.has(normalized);
      });

    return joinWords(filtered);
  }
}
