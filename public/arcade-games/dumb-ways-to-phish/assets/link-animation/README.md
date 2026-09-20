# Link torto — estudo de animação

Abrir `/link-animation.html` no servidor local (`npm run dev`). Esta página não contém lógica de jogo.

Os botões Esquerda, Centro e Direita selecionam o personagem. Todos os três possuem as reações de acerto e erro, sem associação fixa entre identidade e domínio correto. As placas ainda são as da imagem base: esta prévia testa poses, não valida os endereços. O clipe selecionado reinicia ao trocar de pombo.

`delivery-sides.png` acrescenta as poses de entrega laterais; `reactions-others.png` acrescenta as cabeças sem chapéu da esquerda e do centro. Os três chapéus usam recortes individuais da arte original. Prompts adicionais em `prompts-all-birds.md`.

- `base.png`: cena aprovada, sempre usada como fundo fixo.
- `blink.png`: fonte de três recortes de olhos fechados.
- `reactions.png`: expressão orgulhosa central e pombo da direita assustado, sem boné.
- `delivery.png`: pose central com uma asa levantada segurando envelope e a outra apoiada na placa. A pose substitui a região da asa original para não duplicá-la.
- O sprite do boné é recortado do próprio `base.png`, com contorno explícito no canvas.

As fontes foram geradas com a ferramenta integrada de imagens. Os prompts estão em `prompts.md`. Nenhum cenário, personagem ou adereço é desenhado em HTML/CSS.

A sequência tem 12 segundos: 4 de repouso, 3,6 de acerto, 3,6 de erro e 0,8 de repouso. As poses trocam sem fusão de rostos. O boné sobe um pouco, gira e cai. Ao repetir o clipe, a cena volta ao estado inicial. Placas não se movem; o texto central aprovado é preservado também na pose de entrega.

Botões selecionam os clipes; o controle de tempo pausa e permite inspecionar qualquer instante. Loop pode ser desativado. A página respeita a preferência de movimento reduzido iniciando pausada, e pausa ao ficar oculta.

Validação: poses de entrega, piscadas e etapas da queda inspecionadas no navegador; geração do site conferida com `npm run build`.
