import { Token } from '../../token';

export abstract class TokenBaseStrategy {
  abstract readonly name: string;
  abstract readonly priority: number;

  shouldApply(_tokens: Token[]): boolean {
    return true;
  }

  abstract transform(tokens: Token[]): Token[];
}
