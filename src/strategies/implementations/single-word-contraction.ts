import { LookupTransformStrategy } from '../base/lookup-transform';
import { TransformSource } from '../../token';
import { StrategyPriority } from '../config/priority';
import { lookupContraction } from '../../data/ptbr-contractions';

export class SingleWordContractionStrategy extends LookupTransformStrategy {
  readonly name = 'Contrações de Palavra Única';
  readonly priority = StrategyPriority.SINGLE_WORD_CONTRACTION;
  protected readonly lookupFn = lookupContraction;
  protected readonly transformSource = TransformSource.SINGLE_WORD_CONTRACTION;
}
