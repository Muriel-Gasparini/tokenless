import { BaseStrategy } from "./base.strategy";
import { splitWords, joinWords } from "../core/text-utils";
import { lookupContraction } from "../data/ptbr-contractions";

export class PtBrOptimizationStrategy extends BaseStrategy {
  readonly name = "Otimização PT-BR";
  readonly priority = 5;

  compress(text: string): string {
    const words = splitWords(text);
    const result: string[] = [];

    for (let i = 0; i < words.length; i++) {
      const currentWord = words[i];
      const nextWord = words[i + 1];
      const thirdWord = words[i + 2];

      if (nextWord && thirdWord) {
        const trigram = `${currentWord} ${nextWord} ${thirdWord}`;
        const contraction = lookupContraction(trigram);

        if (contraction) {
          result.push(contraction);
          i += 2;
          continue;
        }
      }

      if (nextWord) {
        const bigram = `${currentWord} ${nextWord}`;
        const contraction = lookupContraction(bigram);

        if (contraction) {
          result.push(contraction);
          i++;
          continue;
        }
      }

      const singleContraction = lookupContraction(currentWord);
      if (singleContraction) {
        result.push(singleContraction);
      } else {
        result.push(currentWord);
      }
    }

    return joinWords(result);
  }
}
