import { Token, TransformSource, TokenType } from '../../token';
import { LookupTransformStrategy } from '../base/lookup-transform';
import { lookupContraction } from '../../data/dict';
import { PRIORITY } from '../config/priority';

export class ContractionStrategy extends LookupTransformStrategy {
  readonly name = 'contraction';
  readonly priority = PRIORITY.CONTRACTION;
  protected readonly lookupFn = lookupContraction;
  protected readonly transformSource = TransformSource.CONTRACTION;

  shouldApply(tokens: Token[]): boolean {
    return tokens.some(
      (token) => token.type === TokenType.ATOMIC && lookupContraction(token.value) !== undefined
    );
  }
}
