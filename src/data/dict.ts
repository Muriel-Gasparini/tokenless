import { normalizeText } from "../core/text-utils";

const rawContractions: [string, string][] = [
  ["do not", "don't"],
  ["does not", "doesn't"],
  ["did not", "didn't"],
  ["will not", "won't"],
  ["would not", "wouldn't"],
  ["should not", "shouldn't"],
  ["could not", "couldn't"],
  ["cannot", "can't"],
  ["is not", "isn't"],
  ["are not", "aren't"],
  ["was not", "wasn't"],
  ["were not", "weren't"],
  ["have not", "haven't"],
  ["has not", "hasn't"],
  ["had not", "hadn't"],
  ["i am", "i'm"],
  ["you are", "you're"],
  ["he is", "he's"],
  ["she is", "she's"],
  ["it is", "it's"],
  ["we are", "we're"],
  ["they are", "they're"],
  ["i have", "i've"],
  ["you have", "you've"],
  ["we have", "we've"],
  ["they have", "they've"],
  ["i will", "i'll"],
  ["you will", "you'll"],
  ["he will", "he'll"],
  ["she will", "she'll"],
  ["we will", "we'll"],
  ["they will", "they'll"],
  ["i would", "i'd"],
  ["you would", "you'd"],
  ["he would", "he'd"],
  ["she would", "she'd"],
  ["we would", "we'd"],
  ["they would", "they'd"],
  ["in order to", "to"],
  ["the purpose is to", "to"],
  ["the idea is to", "to"],
  ["in a way that", "so that"],
  ["is able to", "can"],
  ["in the context of", "in"],
  ["with respect to", "about"],
];

const rawAbbreviations: [string, string][] = [
  ["function", "fn"],
  ["functions", "fns"],
  ["feature", "feat"],
  ["features", "feats"],
  ["class", "cls"],
  ["interface", "iface"],
  ["interfaces", "ifaces"],
  ["property", "prop"],
  ["properties", "props"],
  ["attribute", "attr"],
  ["attributes", "attrs"],
  ["configuration", "config"],
  ["configurations", "configs"],
  ["application", "app"],
  ["applications", "apps"],
  ["system", "sys"],
  ["service", "svc"],
  ["services", "svcs"],
  ["document", "doc"],
  ["documents", "docs"],
  ["documentation", "docs"],
  ["reference", "ref"],
  ["references", "refs"],
  ["development", "dev"],
  ["production", "prod"],
  ["staging", "stage"],
  ["implementation", "impl"],
  ["implementations", "impls"],
  ["specification", "spec"],
  ["specifications", "specs"],
  ["requirement", "req"],
  ["requirements", "reqs"],
  ["administrator", "admin"],
  ["administrators", "admins"],
  ["user", "usr"],
  ["users", "usrs"],
  ["database", "db"],
  ["column", "col"],
  ["columns", "cols"],
  ["authentication", "auth"],
  ["permission", "perm"],
  ["permissions", "perms"],
  ["connection", "conn"],
  ["connections", "conns"],
  ["information", "info"],
  ["example", "ex"],
  ["examples", "exs"],
  ["demonstration", "demo"],
  ["demonstrations", "demos"],
  ["parameter", "param"],
  ["parameters", "params"],
  ["argument", "arg"],
  ["arguments", "args"],
  ["request", "req"],
  ["requests", "reqs"],
  ["message", "msg"],
  ["messages", "msgs"],
  ["notification", "notif"],
  ["notifications", "notifs"],
  ["variable", "var"],
  ["variables", "vars"],
  ["constant", "const"],
  ["constants", "consts"],
  ["object", "obj"],
  ["objects", "objs"],
  ["instance", "inst"],
  ["instances", "insts"],
  ["number", "num"],
  ["numbers", "nums"],
  ["quantity", "qty"],
  ["minimum", "min"],
  ["maximum", "max"],
  ["average", "avg"],
  ["value", "val"],
  ["values", "vals"],
  ["return", "ret"],
  ["returns", "rets"],
  ["directory", "dir"],
  ["directories", "dirs"],
  ["address", "addr"],
  ["addresses", "addrs"],
  ["location", "loc"],
  ["locations", "locs"],
  ["error", "err"],
  ["errors", "errs"],
  ["exception", "exc"],
  ["exceptions", "excs"],
  ["calculate", "calc"],
  ["calculated", "calc"],
  ["generate", "gen"],
  ["generated", "gen"],
  ["dependency", "dep"],
  ["dependencies", "deps"],
];

export const getCompoundContractions = (): [string, string][] => {
  return rawContractions.filter(([pattern]) => pattern.includes(" "));
};

export const getSingleWordContractions = (): [string, string][] => {
  return rawContractions.filter(([pattern]) => !pattern.includes(" "));
};

export const getCompoundAbbreviations = (): [string, string][] => {
  return rawAbbreviations.filter(([pattern]) => pattern.includes(" "));
};

export const getSingleWordAbbreviations = (): [string, string][] => {
  return rawAbbreviations.filter(([pattern]) => !pattern.includes(" "));
};

export const CONTRACTIONS = new Map<string, string>(
  rawContractions.map(([full, short]) => [normalizeText(full), short]),
);

export const ABBREVIATIONS = new Map<string, string>(
  rawAbbreviations.map(([full, short]) => [normalizeText(full), short]),
);

export const lookupContraction = (phrase: string): string | undefined => {
  return CONTRACTIONS.get(normalizeText(phrase));
};

export const lookupAbbreviation = (word: string): string | undefined => {
  return ABBREVIATIONS.get(normalizeText(word));
};
