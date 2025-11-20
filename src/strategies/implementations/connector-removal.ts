import { Token, TokenType } from '../../token';
import { PhraseRemovalStrategy } from '../base/phrase-removal';
import { CONNECTORS } from '../../data/stopwords';
import { PRIORITY } from '../config/priority';
import { normalizeText } from '../../core/text-utils';

export class ConnectorRemovalStrategy extends PhraseRemovalStrategy {
  readonly name = 'connector-removal';
  readonly priority = PRIORITY.CONNECTOR_REMOVAL;
  protected readonly phraseSet = CONNECTORS;
  protected readonly maxWindowSize = 4;

  shouldApply(tokens: Token[]): boolean {
    return tokens.some(
      (token) => token.type === TokenType.ATOMIC && CONNECTORS.has(normalizeText(token.value))
    );
  }
}
