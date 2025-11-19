import { normalizeText } from "../core/text-utils";

const rawContractions: [string, string][] = [
  ["para o", "pro"],
  ["para a", "pra"],
  ["para os", "pros"],
  ["para as", "pras"],
  ["atraves de", "via"],
  ["no entanto", "mas"],
  ["por exemplo", "ex"],
  ["dessa forma", "assim"],
  ["por causa de", "devido"],
  ["anteriormente", "antes"],
  ["aproximadamente", "aprox"],
  ["portanto", "logo"],
  ["ou seja", "ie"],
  ["isto e", "ie"],
  ["precisa de", "precisa"],
  ["vai ser", "sera"],
  ["atualmente", "agora"],
  ["de acordo com", "segundo"],
  ["muitas", "mtas"],
  ["muitos", "mtos"],
  ["a menos que", "unless"],
  ["a não ser", "unless"],
  ["mais", "+"],
  ["menos", "-"],
  ["sempre", "smp"],
  ["nunca", "n"],
  ["estar", "star"],
  ["devemos", "dev"],
  ["deve", "dev"],
  ["haver", "ter"],
  ["possui", "tem"],
  ["queremos", "dev"],
  ["modificar", "mudar"],
  ["por que", "pq"],
  ["porque", "pq"],
  ["quero", "qro"],
  ["tiver sido", "for"],
  ["não", "n"],
  ["nao", "n"],
  ["geração", "generation"],
  ["inicie", "start"],
  ["renovado", "renew"],
  ["que o", "qo"],
  ["que não há", "havent"],
];

export const getCompoundContractions = (): [string, string][] => {
  return rawContractions.filter(([pattern]) => pattern.includes(" "));
};

export const getSingleWordContractions = (): [string, string][] => {
  return rawContractions.filter(([pattern]) => !pattern.includes(" "));
};

export const CONTRACTIONS = new Map<string, string>(
  rawContractions.map(([full, short]) => [normalizeText(full), short]),
);

export const lookupContraction = (phrase: string): string | undefined => {
  return CONTRACTIONS.get(normalizeText(phrase));
};
