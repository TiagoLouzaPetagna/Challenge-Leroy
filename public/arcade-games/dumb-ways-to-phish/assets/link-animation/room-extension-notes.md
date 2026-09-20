# Link torto — cenário ocupando a janela

Alteração restrita a `link.html`, `link.css`, `link.js` e novo `link-room.js`. Os outros minijogos e a prévia de animação não mudaram.

O cenário adicional é um canvas de fundo que cobre a janela inteira. O plano jogável mantém a proporção 1672:941, abaixo de uma margem de 76px para os controles. Áreas adicionais recebem madeira da sala, tampo alinhado ao balcão e textura de tábuas abaixo. Pontos, escudos e pausa ficam sobre a madeira. Menus e pausa conservam o azul aprovado.

O recorte lateral usa só painéis de madeira do fundo, evitando duplicar lâmpadas, pôsteres e pacotes. A textura inferior mantém a proporção da imagem e se repete apenas quando necessário. As áreas de clique acompanham o plano jogável.

Validação: inspeção no navegador em janela alta e tela larga, redimensionamento, pausa e acerto por clique (175 pontos). Build estático verificado.

Assets gerados com a ferramenta integrada e copiados para esta pasta:
- `room-extension.png`: sala sem personagens; fonte dos painéis e balcão.
- `counter-extension.png`: tábuas adicionais para janelas altas e madeira superior.

## Prompt da sala

Create an empty background clean plate from this EXACT post office scene, identical 1672x941 dimensions, camera, perspective and horizontal levels. Remove all three pigeons, their hats and uniforms and all three handheld signs, and remove the big central hanging ENTREGAR PARA sign and its nail. Reconstruct the wooden post office shelving behind these objects naturally, with pigeonholes and a few simple parcels, subdued shading. KEEP the foreground wooden counter exactly in its original place: top near y792, front fascia starts near y860, wood grain extends continuously from left edge to right edge. Preserve walls at both edges and ceiling beam heights. No people, animals, lettering or signs anywhere. This will extend the scene at the sides and above/below, so wood hues, room geometry and counter levels must match the source. Same painterly muted brown background with hand drawn outlines, no new focal objects. Empty room only.

## Prompt da madeira

Reference image style and palette only. Generate a seamless-looking wide close-up texture of the FRONT VERTICAL WOODEN PANEL of this post office counter, no tabletop. Rectangular texture 1672x600, fills entire canvas edge to edge. Muted medium-dark warm brown matching the bottom counter fascia of reference, soft hand-painted shading, thin imperfect dark horizontal plank seams spaced about 100 pixels vertically, very subtle long horizontal wood grain. Small sparse knots, not large or decorative. Flat straight-on orthographic surface, no perspective, no objects, no text, no frame, no lighting spotlight. This extends the counter downward in taller browser windows; understated wood panels, not a focal illustration.
