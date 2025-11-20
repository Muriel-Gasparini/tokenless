import { Token, TokenType } from '../../token';
import { AtomicTokenTransformStrategy } from '../base/atomic-transform';
import { STOPWORDS } from '../../data/stopwords';
import { PRIORITY } from '../config/priority';
import { normalizeText } from '../../core/text-utils';

export class StopwordRemovalStrategy extends AtomicTokenTransformStrategy {
  readonly name = 'stopword-removal';
  readonly priority = PRIORITY.STOPWORD_REMOVAL;

  shouldApply(tokens: Token[]): boolean {
    return tokens.some(
      (token) => token.type === TokenType.ATOMIC && STOPWORDS.has(normalizeText(token.value))
    );
  }

  protected transformAtomicToken(token: Token): Token | null {
    if (STOPWORDS.has(normalizeText(token.value))) {
      return null;
    }
    return token;
  }
}
