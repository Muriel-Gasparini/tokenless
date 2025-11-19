import { PhraseRemovalStrategy } from '../base/phrase-removal';
import { StrategyPriority } from '../config/priority';
import { POLITENESS_PHRASES } from '../../data/stopwords';

export class PolitenessRemovalStrategy extends PhraseRemovalStrategy {
  readonly name = 'Remoção de Cortesia';
  readonly priority = StrategyPriority.POLITENESS_REMOVAL;
  protected readonly phraseSet = POLITENESS_PHRASES;
  protected readonly maxWindowSize = 3;
}
