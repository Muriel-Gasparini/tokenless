import { normalizeText } from '../core/text-utils';

const rawContractions: [string, string][] = [
  ['voce', 'vc'],
  ['para o', 'pro'],
  ['para a', 'pra'],
  ['para os', 'pros'],
  ['para as', 'pras'],
  ['atraves de', 'via'],
  ['no entanto', 'mas'],
  ['por exemplo', 'ex'],
  ['dessa forma', 'assim'],
  ['por causa de', 'devido'],
  ['anteriormente', 'antes'],
  ['aproximadamente', 'aprox'],
  ['portanto', 'logo'],
  ['ou seja', 'ie'],
  ['isto e', 'ie'],
  ['precisa de', 'precisa'],
  ['vai ser', 'sera'],
  ['atualmente', 'agora'],
  ['de acordo com', 'segundo'],
];

export const CONTRACTIONS = new Map<string, string>(
  rawContractions.map(([full, short]) => [normalizeText(full), short])
);

export const lookupContraction = (phrase: string): string | undefined => {
  return CONTRACTIONS.get(normalizeText(phrase));
};
