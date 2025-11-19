import { TokenBaseStrategy } from './strategy';
import { Token, isAtomicToken } from '../../token';

export abstract class AtomicTokenTransformStrategy extends TokenBaseStrategy {
  protected abstract transformAtomicToken(token: Token): Token | null;

  transform(tokens: Token[]): Token[] {
    return tokens
      .map(token =>
        isAtomicToken(token) ? this.transformAtomicToken(token) : token
      )
      .filter((token): token is Token => token !== null);
  }
}
