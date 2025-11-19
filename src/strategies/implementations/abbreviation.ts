import { LookupTransformStrategy } from '../base/lookup-transform';
import { TransformSource } from '../../token';
import { StrategyPriority } from '../config/priority';
import { lookupAbbreviation } from '../../data/tech-dict';

export class AbbreviationStrategy extends LookupTransformStrategy {
  readonly name = 'Abreviações Técnicas';
  readonly priority = StrategyPriority.ABBREVIATION;
  protected readonly lookupFn = lookupAbbreviation;
  protected readonly transformSource = TransformSource.ABBREVIATION;
}
