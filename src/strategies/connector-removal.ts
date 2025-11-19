import { BaseStrategy } from './base.strategy';
import { CONNECTORS } from '../data/stopwords';
import { splitWords, normalizeText, joinWords } from '../core/text-utils';

export class ConnectorRemovalStrategy extends BaseStrategy {
  readonly name = 'Remoção de Conectivos';
  readonly priority = 4;

  compress(text: string): string {
    const words = splitWords(text);
    const filtered = words
      .map(word => word.replace(/[.,;:!?]/g, ''))
      .filter(word => {
        if (word.length === 0) return false;
        const normalized = normalizeText(word);
        return !CONNECTORS.has(normalized);
      });

    return joinWords(filtered);
  }
}
