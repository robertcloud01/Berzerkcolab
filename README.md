# Roberto Pereira — Seleção Berzerk

Site editorial personalizado a partir da apresentação de referência, com nove páginas, retratos de Roberto com óculos, monograma RP, assinatura animada e camisetas reais da Berzerk.

Os arquivos em `dist/roberto/editorial/` são a primeira seleção de nove imagens aprovada pelo usuário. A tentativa posterior de identidade foi descartada e não foi incorporada ao site. O retrato adicional `viking-profile.png` é a imagem lateral de guerreiro viking solicitada para o rodapé. As imagens dos produtos em `dist/roberto/products/` vêm do catálogo público da Berzerk; os botões levam às páginas reais da loja. Não há checkout próprio neste site.

`dist/roberto/products.json` contém a seleção editorial. `dist/roberto/site.css` e a extensão de `dist/_replica/runtime.js` adaptam os cards e o catálogo à apresentação. As páginas mantêm os módulos de navegação e animação da referência e usam dados de navegação estáticos em `_replica/flight/`.

A assinatura usa SVG com animação CSS; os vetores de identidade ficam em `dist/roberto/brand/`. O JSON em `dist/signature/` é mantido como arquivo de referência. Os textos das páginas e seus dados React devem ser alterados em conjunto. O conteúdo é uma curadoria pessoal; preços, tamanhos e disponibilidade são apresentados pela loja Berzerk.

Não há etapa de build. Sirva a pasta `dist/` com suporte a páginas `index.html`.

A correção final preserva um único parágrafo por coluna, redesenha o nome superior em SVG e usa NuMono nos nomes laterais, como na referência. A assinatura renderiza em SVG com animação de traço, incluindo uma apresentação estática durante o carregamento. Os arquivos recebem a versão de cache `rp5`. Os chunks dinâmicos usam arquivos físicos com sufixo `.rp5.js`, pois o codificador de caminhos do Next.js escapa parâmetros de consulta colocados no resolvedor de chunks. Os descritores React Flight também usam esses nomes de arquivo, sem parâmetros.

A recuperação preserva os sentinelas internos do React, como `$undefined`, durante as trocas editoriais. Nunca faça uma substituição global desses valores. Execute `node scripts/check-chunk-loading.cjs` para verificar o carregamento das dependências pelo codificador real do Next.js e os sentinelas das nove rotas.
