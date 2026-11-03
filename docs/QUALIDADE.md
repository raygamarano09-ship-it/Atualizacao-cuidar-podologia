# Relatório de qualidade — Cuidar Podologia ATU

Gerado pelo tutor em 03/11/2026.

| Categoria | Nota |
|---|---|
| HTML | 100 (antes: 86) |
| CSS | 100 (antes: 84) |
| Responsivo | 100 (antes: 84) |
| Acessibilidade | 86 (antes: 73) |
| SEO | 100 (antes: 90) |
| JavaScript | 100 (antes: 84) |
| Desempenho | 100 (antes: 96) |
| Publicação | 68 (antes: 86) |
| **Geral** | **94** (antes: 85) |

Erros: 4 · Avisos: 2 · Dicas: 2

## [C14] Contraste insuficiente entre texto e fundo (erro)

**Por quê:** Texto com contraste baixo é ilegível ao sol, em telas ruins e para quem tem baixa visão. A WCAG exige pelo menos 4,5:1 para texto normal.

**Como corrigir:** Escureça o texto ou clareie o fundo (o tutor mostra a razão calculada). Teste em webaim.org/resources/contrastchecker.

Onde: css/style.css:1063 (.estrelas .estrela.selecionada, .estrelas-avaliacao .estrela-nota.selecionada: #f5b800 sobre #ffffff = 1.79:1)

## [S02] Link ou arquivo interno que não existe (erro)

**Por quê:** O visitante vê imagem quebrada, CSS que não carrega ou 404.

**Como corrigir:** Confira o caminho (e a pasta). Dica: abra o F12 > Network e procure itens em vermelho.

Onde: index.html:18 (favicon.svg); index.html:122 (img/card-img-renata.jpeg); index.html:139 (img/img-renata2.jpeg)

## [S08] Falta README.md (aviso)

**Por quê:** É a vitrine do repositório: o que é o projeto, como rodar e o link do site publicado.

**Como corrigir:** O tutor gera um modelo para você completar.

Onde: 

## [S09] Falta .gitignore (aviso)

**Por quê:** Sem ele você acaba enviando lixo (node_modules, arquivos do sistema, .env).

**Como corrigir:** O tutor gera um .gitignore adequado a sites.

Onde: 

## [S13] Imagem na pasta que nenhuma página usa (dica)

**Por quê:** Peso inútil no repositório.

**Como corrigir:** Apague ou mova para uma pasta de rascunhos fora do projeto.

Onde: img/card-img-renata.webp; img/img-renata2.webp

