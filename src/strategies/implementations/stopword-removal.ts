import { AtomicTokenTransformStrategy } from '../base/atomic-transform';
import { Token, createToken } from '../../token';
import { StrategyPriority } from '../config/priority';
import { STOPWORDS } from '../../data/stopwords';
import { normalizeText } from '../../core/text-utils';

export class StopwordRemovalStrategy extends AtomicTokenTransformStrategy {
  readonly name = 'Remoção de Stopwords';
  readonly priority = StrategyPriority.STOPWORD_REMOVAL;

  protected transformAtomicToken(token: Token): Token | null {
    const cleaned = token.value.replace(/[.,;:!?]/g, '');
    if (cleaned.length === 0) return null;

    const normalized = normalizeText(cleaned);
    if (STOPWORDS.has(normalized)) return null;

    if (cleaned !== token.value) {
      return createToken(cleaned, token.type, token.original, token.metadata);
    }

    return token;
  }
}
