# F06 — Bônus e benefícios entregues por QR

```yaml
id: real-case:f06-hr-bonus-qr
dificuldade: fundamental
area_corporativa: rh-e-folha
industrias: [aplicavel-a-todos]
papeis_alvo: [todos-os-funcionarios, rh, folha]
canais: [email, documento, qr, celular]
tecnica_dominante: quishing
tecnicas_secundarias: [beneficio, curiosidade, aitm, pagina-de-login-personalizada]
objetivo_do_atacante: coletar credenciais ou sessao corporativa
fonte_principal: Proofpoint Holiday Lures Threat Landscape
data_da_fonte: 2024-12-19
nivel_de_confianca: confirmado-pela-fonte
estado: pesquisa-documental
```

## Resumo factual

A Proofpoint observou campanhas que se apresentavam como RH ou folha, usavam temas de bônus e compensação e inseriam QR em documentos. O destino imitava a autenticação corporativa da organização e podia empregar kit AiTM.

## Sequência observada

1. a mensagem anuncia bônus, benefício ou reconhecimento;
2. um documento aumenta a aparência administrativa;
3. o QR desloca a navegação para o celular;
4. a página usa marca da organização e solicita autenticação.

## Texto usado na campanha

- **Natureza:** descrição de assuntos e nomes de documentos publicados; reconstrução segura do corpo.
- **Exemplo reconstruído:**

> Seu demonstrativo de reconhecimento anual está disponível. Leia o código no documento para revisar os detalhes antes do encerramento.

- **Nota:** o QR do futuro exercício deve ser deliberadamente não escaneável. O texto não é transcrição original.

## Por que funcionava no contexto

- bônus e benefícios despertam curiosidade;
- o documento parece formal;
- o QR oculta o endereço antes da leitura;
- o celular pode não exibir as mesmas proteções do computador;
- a página personalizada reduz suspeita visual.

## Indícios e limites

QR, documento e login não são maliciosos por definição. A pessoa precisa avaliar expectativa, origem, destino textual e rota oficial do benefício.

Uma página com marca correta apenas demonstra que conhece a organização. Não comprova que o RH publicou o conteúdo.

## Comportamento seguro ensinável

Abandonar o QR recebido e consultar benefícios ou folha pelo portal corporativo aberto por uma rota conhecida.

## Possibilidade de atividade

- **Formato candidato:** prévia textual inerte de QR seguida de comparação de destino.
- **Decisão principal:** seguir o QR ou recuperar a rota oficial.
- **Variação legítima necessária:** QR previsto em campanha interna confirmada.
- **Transferência curta:** benefício chega como convite de calendário.
- **Risco pedagógico:** ensinar a evitar todos os QR Codes.

## Justificativa da dificuldade

O caso pode oferecer expectativa ausente, remetente externo e divergência clara de domínio. A variante personalizada com conta real e AiTM pertence às faixas seguintes.

## Relação com o currículo atual

Relaciona **O destino atrás do QR**, **Espelho de Página** e **Uma manhã comum**. O tema de RH é uma variação, não um conceito proprietário novo.

## Fonte

- [Proofpoint — Holiday and bonus phishing lures](https://www.proofpoint.com/us/blog/threat-insight/security-brief-threat-actors-gift-holiday-lures-threat-landscape)
