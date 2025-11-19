import { normalizeText } from '../core/text-utils';

const createNormalizedSet = (words: string[]): Set<string> => {
  return new Set(words.map(normalizeText));
};

const rawStopwords = [
  'o', 'a', 'os', 'as',
  'um', 'uma', 'uns', 'umas',
  'de', 'do', 'da', 'dos', 'das',
  'em', 'no', 'na', 'nos', 'nas',
  'por', 'pelo', 'pela', 'pelos', 'pelas',
  'ao', 'aos',
  'com', 'sem', 'sob', 'sobre',
  'para', 'ate',
  'e', 'ou', 'mas', 'porem', 'todavia', 'contudo',
  'que', 'qual', 'quais', 'quando', 'onde', 'quanto', 'quantos', 'quanta', 'quantas',
  'este', 'esse', 'aquele', 'estes', 'esses', 'aqueles',
  'esta', 'essa', 'aquela', 'estas', 'essas', 'aquelas',
  'isto', 'isso', 'aquilo',
  'seu', 'sua', 'seus', 'suas',
  'meu', 'minha', 'meus', 'minhas',
  'nosso', 'nossa', 'nossos', 'nossas',
  'dele', 'dela', 'deles', 'delas',
  'lhe', 'lhes',
  'me', 'te', 'se', 'nos', 'vos',
  'muito', 'muita', 'muitos', 'muitas',
  'pouco', 'pouca', 'poucos', 'poucas',
  'mais', 'menos',
  'bem', 'mal',
  'ja', 'ainda', 'apenas', 'sempre', 'nunca',
  'sim',
  'ser', 'estar', 'ter', 'haver',
  'foi', 'eram', 'sao', 'sera',
  'tinha', 'tem', 'tera',
];

export const STOPWORDS = createNormalizedSet(rawStopwords);

const rawPoliteness = [
  'por favor',
  'por gentileza',
  'voce pode',
  'voce poderia',
  'poderia',
  'pode',
  'gostaria que',
  'gostaria de',
  'eu gostaria',
  'preciso que',
  'quero que',
  'queria que',
  'se possivel',
  'se puder',
  'agradeceria',
  'obrigado',
  'obrigada',
  'agradeco',
  'desde ja agradeco',
  'desde ja',
  'muito obrigado',
  'muito obrigada',
];

export const POLITENESS_PHRASES = createNormalizedSet(rawPoliteness);

const rawConnectors = [
  'portanto',
  'entao',
  'assim',
  'logo',
  'pois',
  'porque',
  'consequentemente',
  'por isso',
  'por este motivo',
  'por essa razao',
  'alem disso',
  'alem de',
  'tambem',
  'igualmente',
  'similarmente',
  'da mesma forma',
  'do mesmo modo',
  'ainda',
  'ademais',
  'outrossim',
  'alias',
  'ou seja',
  'isto e',
  'em outras palavras',
  'por exemplo',
  'como por exemplo',
];

export const CONNECTORS = createNormalizedSet(rawConnectors);
