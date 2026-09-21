# Plano de simplificação das próximas Missões e PhishLabs

**Estado:** proposta de experiência. **Pedido urgente de um gestor**, **Uma letra fora do lugar**, **Documento inesperado** e **Para onde esse link realmente vai?** estão disponíveis em versão curta de quatro decisões; os demais continuam planejados.

## Recorte

O recorte original cobre **5 Missões** e **6 PhishLabs** que constavam como `planned` em `lib/activities/registry.ts`. Quatro agora estão disponíveis. A trilha de oito encontros continua como está. As novas Missões aparecem **em uma seção própria logo abaixo da trilha**, dentro de Jornada; os novos PhishLabs completam as bancadas do laboratório. Simulações, Radar e jogos não entram neste recorte.

Os blueprints em `documentacao/atividades/blueprints` continuam sendo a fonte dos cenários e do comportamento seguro que cada atividade precisa ensinar. Este plano propõe simplificar a **forma de jogar**. Antes de publicar cada atividade, sua ficha e seu blueprint devem refletir a mecânica final, a versão, a avaliação e a recompensa efetivamente implementadas.

## O que manter das duas referências

| Referência | O que funciona | O que simplificar nas novas atividades |
| --- | --- | --- |
| **O aviso que não podia esperar** | Um e-mail concreto ocupa o centro da tela; a instrução se destaca; escolher/arrastar liga a informação a uma consequência; a resposta segura termina com um resultado e uma próxima atividade clara. A cor verde, o fundo claro e o botão com profundidade pertencem à identidade do site. | Há várias etapas e algumas decisões dependem de leitura ou de um clique intermediário. Nas novas atividades, entrar diretamente no caso, pedir **quatro decisões avaliadas** e mostrar o resultado. Não exigir clique em elemento apenas decorativo. |
| **Domínio sob a lupa** | O endereço é o objeto de investigação; separar suas partes torna a ação visível e ensina algo que o usuário pode repetir fora do jogo. O arrastar também tem alternativa por toque/clique e teclado. | A sequência de nove etapas e muitos textos tornam a atividade longa. Nas novas bancadas, uma única comparação ou um único encaixe visual deve bastar, seguido da decisão prática. |

A imagem atual da bancada “Linha do Incidente” ilustra outro problema: uma linha com números e etiquetas parece uma interface para manipular, embora seja apenas uma capa. As novas capas devem ser **ilustrações de cenário**, separadas dos controles reais. Não colocar nelas botões, caixas de resposta ou números de etapa que sugiram interação inexistente.

## Regra comum para as 11 atividades

- **Entrada direta:** título, uma frase de situação e uma instrução em destaque, em linguagem de trabalho. O artefato do caso — mensagem, ligação, documento, página ou tela — já aparece sem “clique para ler”.
- **Quatro decisões avaliadas:** escolha entre até três opções e, quando fizer sentido, arraste um cartão para um destino. Cada decisão deve acrescentar uma observação ou consequência; não repetir a mesma pergunta para completar a contagem.
- **Uma decisão por tela, mais resultado:** o caso permanece visível e uma consequência curta pode aparecer entre decisões. Nada de aba para cada parágrafo.
- **Uma ação evidente por vez:** instrução acima da área de interação; cartões parecem arrastáveis somente quando forem; destino tem nome, contorno e estado visual; o botão principal usa o estilo verde do site e só fica disponível depois de uma decisão real.
- **Texto curto:** situação com cerca de 35–50 palavras; instruções de ação com uma frase; alternativas diretas; explicação no resultado com duas ou três frases. A maior duração deve vir das decisões, não de parágrafos adicionais.
- **Feedback que ensina:** mostrar o que a evidência permite concluir, o que ela **não** prova e qual seria a próxima ação segura. Avaliar o processo, não adivinhação de “é golpe” em toda pergunta. Incluir um caso legítimo ou inconclusivo para “Praticar com outro caso”, sem ampliar a primeira tentativa.
- **Movimento com propósito:** cartão encaixa no alvo, alvo reage e a consequência aparece. Animações curtas (150–250 ms), sem objetos flutuando continuamente; respeitar preferência por movimento reduzido.
- **Acessibilidade:** qualquer arrastar também funciona selecionando o cartão e depois o alvo, por toque, mouse e teclado. Nunca depender só de cor, imagem ou arrastar. Os artefatos simulados não abrem links, QR, anexos ou autenticação reais.

## Missões: cinco casos curtos

Cada Missão apresenta **uma situação de trabalho e uma escolha de conduta**. A imagem de capa cria a cena, mas o texto da atividade contém toda a informação necessária.

### 1. Pedido urgente de um gestor

- **Rota prevista:** `/missoes/pedido-urgente-do-gestor`.
- **Aprendizado:** um pedido atribuído a um gestor não dispensa a confirmação nem a segunda aprovação prevista no processo.
- **Cena:** mensagem pede incluir um fornecedor hoje e “deixar a segunda aprovação para depois”.
- **Interação:** escolha qual trecho exige pausa (“pular a aprovação”); arraste **“Confirmar com o gestor pelo contato já conhecido”** para **“Antes de mudar o cadastro”**; decida se a confirmação da urgência dispensa a segunda aprovação; encaminhe o pedido quando o segundo aprovador está ausente.
- **Resultado:** urgência e cargo alegado não são autorização; manter o fluxo e registrar a divergência se ela persistir. Em outra tentativa, um pedido urgente legítimo permite avançar *depois* da confirmação e da alçada correta.
- **Capa:** mesa vista em ângulo, pasta de fornecedor aberta, calendário marcando “hoje” e uma pequena ficha de aprovação ainda vazia. Verde profundo e toque âmbar; sem texto legível ou logomarca.

### 2. Documento inesperado

- **Rota prevista:** `/missoes/documento-inesperado`.
- **Aprendizado:** confirmar se o arquivo era esperado antes de abri-lo; nunca baixar a proteção porque o próprio arquivo pediu.
- **Cena:** uma área sem vaga aberta recebe um currículo anexado, apresentado como cartão inerte de arquivo.
- **Interação:** escolha o que falta confirmar (“havia uma seleção aberta?”); encaixe a consulta ao RH antes de abrir; interprete a ausência de seleção sem afirmar o conteúdo do arquivo; encaixe **“Encaminhar pelo procedimento interno sem abrir”**. Não pedir diagnóstico técnico do conteúdo nem usar a extensão como única resposta.
- **Resultado:** a incoerência do contexto justifica a pausa, mas não prova o que há dentro do arquivo. Em outra tentativa, usar a planilha que pede “habilitar conteúdo”.
- **Capa:** envelope físico aberto com uma folha parcialmente saída e um clipe solto sobre a mesa. O foco é o arquivo inesperado, sem botão de download desenhado.

### 3. A central que não podia esperar

- **Rota prevista:** `/missoes/a-central-que-nao-podia-esperar`.
- **Aprendizado:** não instalar ferramenta remota nem desligar proteção por ordem de uma ligação recebida; iniciar novo contato pelo suporte oficial.
- **Cena:** transcrição curta de chamada: “suporte” pede instalação imediata para corrigir uma falha.
- **Interação:** escolha a resposta à chamada; arraste **“Abrir o suporte pelo portal da empresa”** para **“Minha próxima ação”**. O número exibido na chamada não vira fonte confiável.
- **Resultado:** a chamada pode relatar um problema real, mas só um canal iniciado pelo funcionário permite verificar chamado, ferramenta e escopo. Outra tentativa usa o pretexto de “conta segura”.
- **Capa:** telefone de mesa com fone pousado ao lado de uma ficha de chamado ainda sem identificação. Composição editorial simples, verde e cobre discreto.

### 4. Ele já sabia meus dados

- **Rota prevista:** `/missoes/ele-ja-sabia-meus-dados`.
- **Aprendizado:** dados corretos tornam a mensagem convincente, mas não autenticam quem está falando.
- **Cena:** contato cita número de pedido, produto e responsável antes de pedir uma alteração sensível.
- **Interação:** escolha o que esses dados comprovam (“o pedido pode existir, mas a identidade não está confirmada”); arraste **“Conferir com o responsável cadastrado”** para **“Antes de alterar”**.
- **Resultado:** não concluir de onde vieram os dados nem acusar automaticamente o contato; pausar e confirmar por rota independente. Outra tentativa usa dados de agenda e organograma.
- **Capa:** ficha de pedido com três pequenos dados destacados por tiras de papel sobrepostas; uma silhueta de remetente fica fora de foco. A cena sugere personalização sem expor dados reais.

### 5. O pedido não tinha link

- **Rota prevista:** `/missoes/o-pedido-nao-tinha-link`.
- **Aprendizado:** a ausência de link não torna o pedido seguro; conferir identidade, necessidade e autorização antes de ligar ou enviar dados.
- **Cena:** aviso de cobrança informa uma pendência e oferece um telefone para “regularizar hoje”.
- **Interação:** escolha se o telefone do próprio aviso serve como confirmação; arraste **“Consultar o contrato e o contato oficial”** para **“Rota de verificação”**.
- **Resultado:** a rota indicada pelo pedido é controlada pelo próprio pedido. Outra tentativa apresenta alguém que ajudou antes, mas agora solicita uma lista fora de seu escopo.
- **Capa:** folha de cobrança com um telefone destacado visualmente, ao lado de um catálogo de contatos fechado. Não desenhar telefone clicável na imagem.

## PhishLabs: seis investigações de um objeto

Cada bancada faz o funcionário **olhar um detalhe observável** e decidir o que esse detalhe muda na ação. Não transformar os PhishLabs em questionários de jargão técnico.

### 3. Uma letra fora do lugar

- **Rota prevista:** `/phishlab/uma-letra-fora-do-lugar`.
- **Aprendizado:** comparar o identificador recebido com uma referência confiável; semelhança não basta.
- **Cena:** endereço do aviso e endereço já registrado lado a lado, com diferença de um caractere comum.
- **Interação:** arraste o endereço que coincide com a referência; identifique a letra diferente; conclua apenas o que a comparação permite; escolha a rota de acesso cadastrada, sem abrir o endereço do aviso.
- **Resultado:** a diferença justifica abandonar aquele endereço, sem afirmar quem o criou. Outra tentativa inclui dois serviços legítimos de nomes parecidos.
- **Capa:** dois cartões de endereço sob uma lupa realista, uma letra desalinhada em destaque; contraste verde escuro e lima, sem texto legível na arte.

### 4. Para onde esse link realmente vai?

- **Rota prevista:** `/phishlab/para-onde-esse-link-realmente-vai`.
- **Aprendizado:** o texto do botão é uma promessa; o destino final observado é outra informação.
- **Cena:** mensagem oferece um documento. Uma prévia **inerte** mostra “botão → endereço intermediário → destino”, com no máximo dois saltos visíveis.
- **Interação:** reconheça que o texto do botão é uma promessa; arraste o último endereço para **“Destino final”**; interprete a divergência sem atribuir autoria; escolha a rota cadastrada para consultar o documento.
- **Resultado:** abandonar essa rota e abrir o serviço independentemente. Um intermediário conhecido não valida a cadeia inteira; outra tentativa usa um redirecionamento legítimo para evitar regra simplista.
- **Capa:** cartão de mensagem com uma trilha de papel que se curva e termina em outra janela, como mapa de percurso. Não usar uma seta de interface que pareça clicável.

### 5. O destino atrás do QR

- **Rota prevista:** `/phishlab/o-destino-atras-do-qr`.
- **Aprendizado:** conferir se a ação com QR foi iniciada ou esperada e inspecionar uma prévia segura do destino.
- **Cena:** falso suporte manda escanear um QR para “validar a conta”. A prévia do conteúdo já vem na tela; não usar câmera nem QR com endereço ativo.
- **Interação:** escolha se esse pareamento foi iniciado pelo funcionário; selecione **“Não usar o QR; abrir a conta pelo caminho habitual”**.
- **Resultado:** a aparência impressa do código não herda confiança do documento. Outra tentativa mostra um QR gerado dentro de um pareamento iniciado pelo próprio funcionário.
- **Capa:** cartão com QR cenográfico e uma pequena janela de prévia ao lado, tratados como objetos de bancada, não como campo para escanear no site.

### 6. Espelho de Página

- **Rota prevista:** `/phishlab/espelho-de-pagina`.
- **Aprendizado:** aparência e HTTPS, sozinhos, não confirmam que a página veio do processo legítimo.
- **Cena:** página de redefinição visualmente convincente aparece depois de uma mensagem inesperada. Uma segunda vista representa a entrada independente no serviço.
- **Interação:** escolha qual informação resolve a dúvida (“origem e processo”, não “layout”); escolha **“Não preencher; abrir o serviço por conta própria”**.
- **Resultado:** a página pode copiar a marca com perfeição; a verificação precisa sair do caminho entregue na mensagem. Outra tentativa mostra uma janela de login desenhada dentro do conteúdo de uma página.
- **Capa:** duas fachadas de navegador quase idênticas sobrepostas, com bases/endereço de origem diferentes. Não embutir logo real nem URL funcional.

### 7. Login verdadeiro, permissão errada

- **Rota prevista:** `/phishlab/login-verdadeiro-permissao-errada`.
- **Aprendizado:** um login autêntico não torna correto todo acesso solicitado por um aplicativo.
- **Cena:** ferramenta de agenda pede acesso à agenda **e** leitura de arquivos e envio de mensagens.
- **Interação:** arraste a permissão que excede a finalidade para **“Não combina com agendar reuniões”**; escolha negar a autorização e conferir o pedido.
- **Resultado:** comparar finalidade, aplicativo e alcance. Outra tentativa usa integração aprovada com permissão mínima coerente.
- **Capa:** folha de consentimento em uma prancheta, um calendário pequeno de um lado e uma pilha de arquivos do outro; desequilíbrio visual, sem botões falsos.

### 8. De qual dispositivo veio este código?

- **Rota prevista:** `/phishlab/de-qual-dispositivo-veio-este-codigo`.
- **Aprendizado:** um código de vinculação pode autorizar **outro dispositivo**, mesmo digitado em página oficial.
- **Cena:** falso suporte fornece um código e pede que o funcionário o insira para “validar” a conta; nenhum código real é mostrado ou aceito.
- **Interação:** escolha quem iniciou o pareamento (“outra pessoa”); arraste **“Não inserir o código”** para **“Minha decisão”**.
- **Resultado:** conferir dispositivo, sessão e finalidade antes de vincular. Outra tentativa mostra pareamento iniciado pelo próprio funcionário em dispositivo conhecido.
- **Capa:** duas telas físicas separadas, com uma etiqueta de código entre elas; uma está fora do espaço de trabalho do personagem. Arte clara, sem código que pareça utilizável.

## Como inserir sem refazer a página onze vezes

1. **Registrar conteúdo, não duplicar telas.** Cada atividade ganha um pacote com `activityId`, rota, título, resumo, arte da capa, artefato do caso, quatro decisões, alternativas, explicação, caso de repetição e próximo passo. Definir esquema tipado e validação dos pacotes. Casos e gabaritos ficam separados dos componentes de apresentação.
2. **Construir um player pequeno com duas peças reutilizáveis:** `Escolha` e `Cartão → alvo`. Reusar `ActivityShell`, foco por etapa, revisão de respostas e indicação da próxima atividade já presentes no projeto. O player aceita cenários diferentes sem inventar novas abas, mas permite um componente específico quando o objeto investigado exigir (por exemplo, a comparação de dois endereços).
3. **Manter avaliação no contrato da atividade.** O cliente mostra a escolha; a pontuação e a conclusão seguem o fluxo autoritativo do projeto. Publicar uma versão própria por atividade, com tentativa/caso identificados, recompensa de primeira conclusão sem duplicação e repetição sem ganho indevido. Não ativar uma rota apenas porque ela já aparece como `planned` no registro.
4. **Criar um único cartão de capa responsivo.** Arte em `public/activities/covers/<slug>.webp` (com variante ou corte móvel quando necessário), área visual de proporção consistente, título/descrição/status como HTML fora da imagem. A arte é decorativa (`alt=""`) quando o texto adjacente já identifica o caso. Usar um arquivo de imagem real; evitar reproduzir a capa com blocos CSS ou SVG improvisado.
5. **Jornada:** após o `</ol>` da trilha atual em `MissionsHub`, acrescentar a seção **“Outras missões”**, com cinco cartões em grade de 2–3 colunas no desktop e uma no celular. Não numerá-los como etapas 9–13 nem alterar o progresso `x/8`. Enquanto planejados, mostrar “Em preparação” como texto, sem botão que não faz nada. Ao publicar, trocar o estado pelo acesso à rota do registro.
6. **PhishLab:** fazer a grade de bancadas ler o mesmo catálogo, preservando as duas bancadas já disponíveis e acrescentando as seis acima. **“Espelho de Página”** deixa de ser apenas o placeholder atual quando for publicado. **“Linha do Incidente”** não é uma das oito bancadas canônicas; retirar esse placeholder da grade ao substituí-la, pois a resposta a incidente já tem Missão própria (“Cliquei. E agora?”). Não deixar cartão antigo levando a tela vazia.
7. **Arte consistente, assuntos distintos.** Direção visual comum: mesa/ambiente de trabalho, materiais físicos e telas fictícias, luz suave, verde da marca e fundo claro; um acento próprio por assunto. Nada de texto gerado dentro da imagem, logos reais ou interface falsa. Produzir ou selecionar as 11 imagens, verificar o enquadramento em desktop e celular e otimizar o peso antes de integrar. Usar os ícones já existentes apenas em controles pequenos.

**Pontos concretos de integração:** manter os pacotes de caso em `lib/content/activities`, montar as duas interações compartilhadas em `features/activities`, completar `ActivityPlayerKey` e `ACTIVITY_PLAYER_REGISTRY` em `lib/activities/types.ts` e `features/activities/player-registry.tsx`, e ativar cada entrada de `lib/activities/registry.ts` apenas após conectar a renderização em `app/page.tsx` e a submissão em `app/providers.tsx`. As listas visuais ficam em `features/missions/MissionsHub.tsx` e `features/phishlab/PhishLabExperience.tsx`. Isso evita manter listas de títulos, status, rotas e imagens separadas que podem divergir.

## Ordem de execução e critério de pronto

Primeiro criar o cartão de capa e o player comum; depois publicar **uma Missão** e **um PhishLab** como pilotos das duas modalidades. Se a instrução, o arrastar por toque/teclado e o resultado funcionarem bem, completar os demais por caso, mantendo as mesmas peças de interface. Revisar cada atividade separadamente com alguém que não leu o blueprint.

Uma atividade só passa de “Em preparação” para “Disponível” quando: o cenário é compreendido sem explicação oral; todas as escolhas e o arrastar alternativo funcionam; as respostas ensinam a decisão correta sem afirmar mais do que as evidências permitem; conclusão, pontuação, repetição e próximo passo persistem corretamente; a capa carrega e se ajusta aos tamanhos de tela; não há controles decorativos que parecem obrigatórios. O conjunto deve parecer parte do mesmo site, mas os **objetos de cada caso** precisam impedir a sensação de onze quizzes iguais.
