import { Token, TokenType } from '../../token';
import { PhraseRemovalStrategy } from '../base/phrase-removal';
import { POLITENESS_PHRASES } from '../../data/stopwords';
import { PRIORITY } from '../config/priority';
import { normalizeText } from '../../core/text-utils';

export class PolitenessRemovalStrategy extends PhraseRemovalStrategy {
  readonly name = 'politeness-removal';
  readonly priority = PRIORITY.POLITENESS_REMOVAL;
  protected readonly phraseSet = POLITENESS_PHRASES;
  protected readonly maxWindowSize = 4;

  shouldApply(tokens: Token[]): boolean {
    return tokens.some(
      (token) => token.type === TokenType.ATOMIC && POLITENESS_PHRASES.has(normalizeText(token.value))
    );
  }
}
