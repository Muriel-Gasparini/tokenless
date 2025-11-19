import { TokenBaseStrategy } from './strategy';
import { Token, isAtomicToken } from '../../token';
import { normalizeText } from '../../core/text-utils';

export abstract class PhraseRemovalStrategy extends TokenBaseStrategy {
  protected abstract readonly phraseSet: Set<string>;
  protected abstract readonly maxWindowSize: number;

  transform(tokens: Token[]): Token[] {
    const result: Token[] = [];
    let i = 0;

    while (i < tokens.length) {
      const currentToken = tokens[i];

      if (!isAtomicToken(currentToken)) {
        result.push(currentToken);
        i++;
        continue;
      }

      let matched = false;

      for (let windowSize = this.maxWindowSize; windowSize > 0; windowSize--) {
        if (i + windowSize > tokens.length) continue;

        const window = tokens.slice(i, i + windowSize);
        const allAtomic = window.every(isAtomicToken);

        if (!allAtomic) continue;

        const phrase = window.map(t => t.value).join(' ');
        const normalized = normalizeText(phrase);

        if (this.phraseSet.has(normalized)) {
          i += windowSize;
          matched = true;
          break;
        }
      }

      if (!matched) {
        const normalized = normalizeText(currentToken.value);
        if (!this.phraseSet.has(normalized)) {
          result.push(currentToken);
        }
        i++;
      }
    }

    return result;
  }
}
