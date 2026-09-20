# Assets da esteira

Produzidos pela ferramenta integrada de imagens a partir de `design/esteira-mouths-v5-passagens.png`. A cena-mestra não é usada como imagem única durante o jogo.

- `scenery.png`: cenário vazio, placa sem tipos e estrutura da esteira. Regiões da própria imagem compõem a correia móvel, os roletes e as bordas dianteiras das paredes.
- `files-source.png`: atlas de seis arquivos em três colunas e duas linhas, com fundo magenta para máscara técnica. As regiões de letras também são reutilizadas na placa.
- `clerk-source.png`: três poses completas alinhadas pelo corpo e pela fenda: neutra, satisfeita e indignada. Fundo magenta para máscara técnica.

O renderer remove o fundo de recorte uma vez durante o carregamento e preserva os pixels do desenho. Os retângulos e pontos de encaixe ficam em `conveyor-art.js`. A borda do triturador é uma região do mesmo sprite, desenhada à frente do arquivo entrando. Nenhum membro solto ou desenho de cenário é criado por HTML/CSS.

Prancha de estudo: arquivos gerados com fundo magenta não são entregáveis de transparência; a máscara em memória é a versão usada no Canvas. As imagens originais são mantidas para permitir revisar os recortes.
