import { AtomicTokenTransformStrategy } from './atomic-transform';
import { Token, TransformSource, createToken } from '../../token';

type LookupFn = (value: string) => string | undefined;

export abstract class LookupTransformStrategy extends AtomicTokenTransformStrategy {
  protected abstract readonly lookupFn: LookupFn;
  protected abstract readonly transformSource: TransformSource;

  protected transformAtomicToken(token: Token): Token | null {
    const result = this.lookupFn(token.value);
    if (result) {
      return createToken(result, token.type, token.original, {
        ...token.metadata,
        source: this.transformSource,
      });
    }
    return token;
  }
}
