# Projeto Tela de Login

Tela de login responsiva com imagem que alterna sozinha e cores que se adaptam a cada imagem. Feita para treinar responsividade e formulários.

## O que tem

- Layout responsivo em três faixas: celular (imagem no topo), tablet e desktop (imagem ao lado do formulário)
- Imagens com troca suave (fade) a cada 6 segundos, com um conjunto para celular e outro para tablet e desktop
- Fundo da página, campos e botões mudam de cor para combinar com a imagem exibida
- Formulário com validação nativa do HTML (e-mail obrigatório e senha de 8 a 20 caracteres)

## Tecnologias

HTML5, CSS3 (media queries, variáveis CSS e `@property`) e JavaScript puro. Ícones do Material Icons.

## Estrutura

```
projeto-login/
├── index.html
├── estilos/
│   ├── style.css
│   └── media-query.css
├── scripts/
│   └── login.js
└── imagens/
```

## Como usar

Abra o `index.html` no navegador ou use a extensão Live Server do VS Code.

Para trocar as imagens ou as cores, edite a lista `SLIDES` no início do arquivo `scripts/login.js`.

## Observação

Projeto apenas de front-end: o envio do formulário ainda não está ligado a um back-end.

## Licença

Veja o arquivo [LICENSE](LICENSE).
