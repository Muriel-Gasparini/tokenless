# Tokenless

Tokenless é uma ferramenta de otimização de prompts para Large Language Models (LLMs). O projeto implementa estratégias de compressão de texto que reduzem a quantidade de tokens mantendo o significado semântico do conteúdo original.

## Sobre

A aplicação processa textos em português brasileiro aplicando técnicas como remoção de stopwords, abreviação de termos técnicos, eliminação de expressões de cortesia e otimização de conectivos. Todo o processamento é feito localmente no navegador usando WebAssembly através da biblioteca tiktoken.

O objetivo principal é reduzir custos de API e melhorar a eficiência no uso de modelos de linguagem, especialmente em contextos onde a contagem de tokens impacta diretamente no custo ou na performance.

## Tecnologias

React 19 com TypeScript para a interface, Vite como build tool, Tailwind CSS para estilização e tiktoken para contagem precisa de tokens compatível com os encodings da OpenAI.

## Execução Local

Clone o repositório e instale as dependências com yarn ou npm. Execute o servidor de desenvolvimento com `yarn dev` e acesse a aplicação em localhost:5173.

```bash
git clone https://github.com/Muriel-Gasparini/tokenless.git
cd tokenless
yarn install
yarn dev
```

## Build

Para gerar a versão de produção, execute `yarn build`. Os arquivos otimizados serão gerados no diretório dist.

```bash
yarn build
```

## Contribuições

O projeto aceita contribuições. Abra issues para reportar bugs ou sugerir melhorias. Pull requests são bem-vindos.

## Licença

MIT
