import { AtomicTokenTransformStrategy } from '../base/atomic-transform';
import { Token, createToken } from '../../token';
import { StrategyPriority } from '../config/priority';
import { CONNECTORS } from '../../data/stopwords';
import { normalizeText } from '../../core/text-utils';

export class ConnectorRemovalStrategy extends AtomicTokenTransformStrategy {
  readonly name = 'Remoção de Conectivos';
  readonly priority = StrategyPriority.CONNECTOR_REMOVAL;

  protected transformAtomicToken(token: Token): Token | null {
    const cleaned = token.value.replace(/[.,;:!?]/g, '');
    if (cleaned.length === 0) return null;

    const normalized = normalizeText(cleaned);
    if (CONNECTORS.has(normalized)) return null;

    if (cleaned !== token.value) {
      return createToken(cleaned, token.type, token.original, token.metadata);
    }

    return token;
  }
}
