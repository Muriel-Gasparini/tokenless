export enum TokenType {
  ATOMIC = 'ATOMIC',
  COMPOUND = 'COMPOUND',
  PROTECTED = 'PROTECTED',
}

export enum TransformSource {
  COMPOUND_PATTERN = 'COMPOUND_PATTERN',
  ABBREVIATION = 'ABBREVIATION',
  SINGLE_WORD_CONTRACTION = 'SINGLE_WORD_CONTRACTION',
}

export interface Token {
  readonly value: string;
  readonly type: TokenType;
  readonly original: string;
  readonly metadata?: {
    readonly pattern?: string;
    readonly source?: TransformSource;
  };
}
