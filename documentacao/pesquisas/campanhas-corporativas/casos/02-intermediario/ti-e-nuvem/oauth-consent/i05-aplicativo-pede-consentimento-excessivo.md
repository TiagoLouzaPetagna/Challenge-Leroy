# I05 — Aplicativo pede consentimento excessivo

```yaml
id: real-case:i05-oauth-consent
dificuldade: intermediario
area_corporativa: ti-e-nuvem
industrias: [aplicavel-a-todos, tecnologia, servicos]
papeis_alvo: [todos-os-funcionarios, administradores-de-nuvem]
canais: [email, navegador, provedor-de-identidade]
tecnica_dominante: oauth-consent-phishing
tecnicas_secundarias: [aplicativo-multitenant, pagina-legitima, permissao-excessiva, persistencia]
objetivo_do_atacante: obter acesso persistente a email e dados por aplicativo
fonte_principal: Microsoft Threat Actors Misuse OAuth Applications
data_da_fonte: 2023-12-12
nivel_de_confianca: confirmado-pela-fonte
estado: pesquisa-documental
```

## Resumo factual

A Microsoft observou atores usarem aplicações OAuth em ataques financeiramente motivados, inclusive depois de comprometimento e AiTM. Aplicativos maliciosos podiam solicitar acesso de leitura e escrita de e-mail e envio de mensagens para manter acesso e ampliar phishing.

## Sequência observada

1. a pessoa recebe link para documento, ferramenta ou integração;
2. o provedor legítimo mostra a tela de consentimento;
3. o aplicativo solicita permissões incompatíveis com a tarefa;
4. a autorização permite leitura, modificação ou envio de e-mail;
5. a conta passa a apoiar novas campanhas.

## Texto usado na campanha

- **Natureza:** reconstrução segura; a fonte publica nomes e permissões técnicas, não um único texto de convite.
- **Exemplo reconstruído:**

> Conecte o aplicativo para abrir o documento compartilhado. A integração precisa acessar seu perfil, arquivos e caixa de correio.

- **Nota:** nenhuma aplicação, consentimento ou login real é usado.

## Por que funcionava no contexto

- a tela de autorização pertence ao provedor verdadeiro;
- usuários estão acostumados a integrar ferramentas;
- o nome do aplicativo pode ser genérico ou familiar;
- permissões aparecem em linguagem técnica;
- concluir o consentimento parece requisito do documento.

## Indícios e limites

O usuário pode comparar aplicativo, editor, finalidade, escopos e ação que iniciou. Não deve ser responsabilizado por avaliar reputação técnica que exige catálogo e controles administrativos.

Uma senha não é necessariamente solicitada pelo atacante; ainda assim, a permissão pode conceder acesso relevante.

## Comportamento seguro ensinável

Autorizar somente aplicativos esperados, publicados ou aprovados para a finalidade, com permissões proporcionais à tarefa iniciada.

## Possibilidade de atividade

- **Formato candidato:** tela abstrata de consentimento e catálogo fictício.
- **Decisão principal:** consentir, interromper ou encaminhar para validação.
- **Variação legítima necessária:** app aprovado com escopos mínimos.
- **Transferência curta:** aplicativo conectado durante chamada de suporte.
- **Risco pedagógico:** exigir que o funcionário interprete cada escopo técnico sem apoio.

## Justificativa da dificuldade

O provedor é legítimo e o dano não depende de página falsa. Escopos e catálogo fornecem evidências suficientes para uma prática assistida intermediária.

## Relação com o currículo atual

É núcleo de **Login verdadeiro, permissão errada** e pode aparecer em **Ataque multicanal**. O Radar pode explicar OAuth, mas a decisão indispensável deve existir na atividade.

## Fonte

- [Microsoft — Threat actors misuse OAuth applications](https://www.microsoft.com/en-us/security/blog/2023/12/12/threat-actors-misuse-oauth-applications-to-automate-financially-driven-attacks/)
