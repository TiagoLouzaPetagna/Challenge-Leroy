# Áudio V7

Cada MP3 pertence a uma fase específica; não existe seleção de música em runtime.

- `passo-a-passo.mp3` — Fase 01 / Digital Original
- `contratempo.mp3` — Fase 02 / Break Digital
- `para-e-vai.mp3` — Fase 03 / Stop & Go
- `swing-remetente--groove.mp3` — Fase 04 / Baixo & Teclas
- `trinca-332-madeira.mp3` — Fase 05 / Madeira & Pele
- `chamada-resposta-office.mp3` — Fase 06 / Escritório Mix

Os WAVs sem prefixo atendem as fases com banco `original`. Os prefixos `groove__`, `madeira__` e `office__` são os passos, pousos e feedbacks das respectivas fases.

As três primeiras trilhas foram preservadas byte a byte. As duas trilhas V7 novas são geradas por `tools/build_v7_music.py`, usando os mesmos timestamps de `data/rhythms.js` que controlam os pousos visuais.
