import { Token, TokenType } from './types';

export const createToken = (
  value: string,
  type: TokenType,
  original: string,
  metadata?: Token['metadata']
): Token => ({
  value,
  type,
  original,
  metadata,
});
