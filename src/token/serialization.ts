import { Token } from './types';

export const tokensToText = (tokens: Token[]): string =>
  tokens.map(t => t.value).join(' ');
