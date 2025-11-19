import { Tiktoken } from 'tiktoken/lite';
import cl100k_base from 'tiktoken/encoders/cl100k_base.json';

let encoder: Tiktoken | null = null;

export const initTokenizer = () => {
  if (!encoder) {
    encoder = new Tiktoken(
      cl100k_base.bpe_ranks,
      cl100k_base.special_tokens,
      cl100k_base.pat_str
    );
  }
  return encoder;
};

export const countTokens = (text: string): number => {
  const enc = initTokenizer();
  return enc.encode(text).length;
};

export const calculateReduction = (original: number, compressed: number): number => {
  if (original === 0) return 0;
  return Math.round(((original - compressed) / original) * 100);
};

export const freeTokenizer = (): void => {
  if (encoder) {
    encoder.free();
    encoder = null;
  }
};
