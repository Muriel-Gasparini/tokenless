import { Token, TokenType } from './types';

export const isCompoundToken = (token: Token): boolean =>
  token.type === TokenType.COMPOUND;

export const isProtectedToken = (token: Token): boolean =>
  token.type === TokenType.PROTECTED;

export const isAtomicToken = (token: Token): boolean =>
  token.type === TokenType.ATOMIC;

export const shouldPreserveToken = (token: Token): boolean =>
  isCompoundToken(token) || isProtectedToken(token);
