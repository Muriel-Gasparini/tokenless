import { BaseStrategy } from './base.strategy';
import { lookupAbbreviation } from '../data/tech-dict';
import { splitWords, joinWords } from '../core/text-utils';

export class AbbreviationStrategy extends BaseStrategy {
  readonly name = 'Abreviações Técnicas';
  readonly priority = 3;

  compress(text: string): string {
    const words = splitWords(text);
    const abbreviated = words.map(word => {
      const abbr = lookupAbbreviation(word);
      return abbr || word;
    });

    return joinWords(abbreviated);
  }
}
