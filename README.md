# Tokenless

A prompt optimization tool for Large Language Models that achieves 30-60% token reduction while preserving semantic meaning.

## How It Works

Tokenless uses a translation-first architecture to maximize token efficiency. Portuguese words typically consume 2-4 tokens compared to just 1 token for English words. The application leverages this fundamental difference in tokenization.

The compression pipeline operates in three phases. First, Portuguese text is translated to English using Google Translate API. This translation alone provides 30-40% token reduction due to English's superior tokenization efficiency. Second, the English text undergoes pattern detection to identify compound phrases that can be contracted. Third, safe compression strategies remove only words that carry no semantic weight.

## Compression Strategies

The application applies multiple compression techniques while guaranteeing zero semantic loss. Stopword removal eliminates 46 safe words including articles (a, an, the), weak adjectives (simple, basic, clear), and ornamental adverbs (really, very, actually). All critical words are preserved: logical operators (if, and, or, because), temporal markers (before, after, when, while), and relative pronouns (that, what, which).

Phrase substitution converts verbose expressions into concise equivalents. Examples include "in order to" becoming "to", "is able to" becoming "can", and "with respect to" becoming "about". The system recognizes 45 such patterns.

Technical abbreviation replaces common programming terms with standard short forms. Function becomes fn, database becomes db, parameter becomes param. The dictionary contains 91 safe technical abbreviations.

English contractions are applied where appropriate, converting "do not" to "don't", "cannot" to "can't", and similar patterns. All 38 standard English contractions are supported.

## Performance Comparison

The previous approach compressed Portuguese text directly, achieving approximately 20% token reduction but risking semantic loss. Large conversion libraries were required, and maintaining context was difficult.

The current translation-first approach achieves 30-60% total reduction with zero semantic loss. English translation provides inherent efficiency gains, and safe compression strategies ensure no critical information is removed. The result is more objective and clearer prompts for AI comprehension.

## Technologies

React 19 with TypeScript provides the user interface. Vite handles build tooling and development server. Tailwind CSS manages styling. TikToken counts tokens with OpenAI-compatible encoding. Google Translate API Browser enables client-side translation.

## Local Development

Clone the repository and install dependencies using yarn or npm. Start the development server with `yarn dev` and access the application at localhost:5173.

```bash
git clone https://github.com/Muriel-Gasparini/tokenless.git
cd tokenless
yarn install
yarn dev
```

## Production Build

Generate optimized production files with `yarn build`. Compiled assets will be output to the dist directory.

```bash
yarn build
```

## Architecture

The orchestrator coordinates the compression pipeline. The translation service handles Portuguese to English conversion using CORS proxy for browser compatibility. Pattern detector identifies compound phrases before tokenization. Strategy implementations apply specific compression rules in priority order. Token factory creates and manages token representations.

The UI displays three panels showing original Portuguese input, English translation with initial token count, and final compressed output. Metrics cards show token counts at each stage and total reduction percentage.

## License

MIT
