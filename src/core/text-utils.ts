export const normalizeText = (text: string): string => {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
};

export const splitWords = (text: string): string[] => {
  return text.split(/\s+/).filter(w => w.length > 0);
};

export const normalizeWhitespace = (text: string): string => {
  return text.replace(/\s+/g, ' ').trim();
};

export const joinWords = (words: string[]): string => {
  return words.join(' ');
};
