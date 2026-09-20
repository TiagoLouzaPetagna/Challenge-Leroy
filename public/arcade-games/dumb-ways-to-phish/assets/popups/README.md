# Fecha essa janela! — peças da fase

Direção aprovada: `design/popups-approved.png` na raiz do projeto. Janelas cinza com relevo, barra azul, caricaturas com traço irregular e blog desbotado ao fundo.

- `background.png`: cenário independente, sem anúncios (1672 × 941).
- `windows-source.png`: atlas de três janelas completas, em três colunas, com margem magenta para máscara técnica (2172 × 724).
- `prompts.md`: prompts finais usados na geração integrada `image_gen`.

`popups-art.js` remove somente o magenta externo, recorta cada janela pelos pixels visíveis e separa a barra/moldura superior do conteúdo ilustrado em canvases próprios. Os controles X usam a arte desses sprites, com áreas de clique correspondentes em `popups-engine.js`. Nenhuma ilustração é substituída por desenho de HTML/CSS.

Animações atuais: abertura com escala curta e fechamento com redução e transparência. Os botões ficam imóveis após 180 ms e o modo de movimento reduzido elimina a escala. Fundo, sprites, textos de estado e áreas de interação são camadas independentes. Personagens continuam como poses únicas nas ilustrações; não há animação facial nesta versão.

## Regras implementadas

X do anúncio pontua; conteúdo da propaganda ou prazo esgotado custa um escudo. O X do navegador do blog também custa um escudo. Cliques no restante do fundo não penalizam. Botões de minimizar são decorativos e não resolvem o anúncio. Cada anúncio se resolve uma única vez.

Rodadas infinitas, três escudos, recorde separado da esteira, aceleração com piso de 2,3 segundos por anúncio e intervalos de até 750 ms. Novas posições não escondem os X de janelas ativas. O navegador da ilustração não acessa sites nem abre anúncios reais.

## Validação

Testes de lógica em `tests/popups-engine.test.mjs`: pontuação, penalidades, proteção do blog, pausa, acessibilidade dos alvos, progressão e fim de jogo. Verificação no navegador: arte sem fundo magenta, clique no X (+177 pontos), clique na isca (perda de um escudo), pausa sólida azul e console sem erros.
