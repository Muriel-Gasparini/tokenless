import { Token, TransformSource, TokenType } from '../../token';
import { LookupTransformStrategy } from '../base/lookup-transform';
import { lookupAbbreviation } from '../../data/dict';
import { PRIORITY } from '../config/priority';

export class AbbreviationStrategy extends LookupTransformStrategy {
  readonly name = 'abbreviation';
  readonly priority = PRIORITY.ABBREVIATION;
  protected readonly lookupFn = lookupAbbreviation;
  protected readonly transformSource = TransformSource.ABBREVIATION;

  shouldApply(tokens: Token[]): boolean {
    return tokens.some(
      (token) => token.type === TokenType.ATOMIC && lookupAbbreviation(token.value) !== undefined
    );
  }
}
