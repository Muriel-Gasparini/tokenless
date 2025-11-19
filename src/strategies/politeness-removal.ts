import { BaseStrategy } from './base.strategy';
import { POLITENESS_PHRASES } from '../data/stopwords';
import { normalizeText, normalizeWhitespace } from '../core/text-utils';

export class PolitenessRemovalStrategy extends BaseStrategy {
  readonly name = 'Remoção de Cortesia';
  readonly priority = 1;

  compress(text: string): string {
    let result = text;

    const segments = text.split(/\s+/);
    for (let i = 0; i < segments.length - 1; i++) {
      const bigram = normalizeText(`${segments[i]} ${segments[i + 1]}`);
      if (POLITENESS_PHRASES.has(bigram)) {
        segments[i] = '';
        segments[i + 1] = '';
      }
    }

    result = segments.filter(s => s.length > 0).join(' ');

    POLITENESS_PHRASES.forEach(phrase => {
      const regex = new RegExp(`\\b${phrase.replace(/\s+/g, '\\s+')}\\b`, 'gi');
      result = result.replace(regex, '');
    });

    return normalizeWhitespace(result);
  }
}
