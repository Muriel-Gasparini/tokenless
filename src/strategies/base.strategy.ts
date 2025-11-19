import { CompressionStrategy } from '../core/types';

export abstract class BaseStrategy implements CompressionStrategy {
  abstract readonly name: string;
  abstract readonly priority: number;

  abstract compress(text: string): string;

  shouldApply(text: string): boolean {
    return text.length > 0;
  }
}
