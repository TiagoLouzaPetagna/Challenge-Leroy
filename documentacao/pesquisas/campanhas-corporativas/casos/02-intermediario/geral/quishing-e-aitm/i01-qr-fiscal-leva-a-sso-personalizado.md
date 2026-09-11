# I01 — QR fiscal leva a SSO personalizado

```yaml
id: real-case:i01-tax-qr-sso
dificuldade: intermediario
area_corporativa: geral
industrias: [engenharia, tecnologia, consultoria, aplicavel-a-todos]
papeis_alvo: [todos-os-funcionarios, rh, financeiro]
canais: [email, pdf, qr, navegador]
tecnica_dominante: quishing-e-aitm
tecnicas_secundarias: [tema-fiscal, display-name, pagina-m365, url-individualizada]
objetivo_do_atacante: roubar credenciais ou sessao corporativa
fonte_principal: Microsoft Tax-Themed Phishing Campaigns
data_da_fonte: 2025-04-03
nivel_de_confianca: confirmado-pela-fonte
estado: pesquisa-documental
```

## Resumo factual

A Microsoft observou, em fevereiro de 2025, mensagens fiscais com PDFs contendo QR enviados a mais de 2.300 organizações, principalmente em engenharia, TI e consultoria. Os assuntos e nomes exibidos variavam entre restituição, orçamento, seguros, contratos, compensação e manuais de RH. O destino imitava Microsoft 365 e podia receber o e-mail do alvo na URL.

## Sequência observada

1. chega um e-mail com corpo mínimo e PDF administrativo;
2. o documento pede leitura do QR para assinar ou consultar;
3. o destino é personalizado para o usuário ou organização;
4. a página solicita autenticação corporativa.

## Texto usado na campanha

- **Natureza:** rótulo curto publicado e reconstrução segura.
- **Rótulo observado:** “EMPLOYEE TAX REFUND REPORT”.
- **Exemplo reconstruído:**

> O relatório fiscal do funcionário requer revisão. Use o código do PDF para abrir o documento seguro e confirmar o recebimento.

- **Nota:** o corpo é reconstruído; nenhum QR ou domínio operacional é preservado.

## Por que funcionava no contexto

- documentos fiscais e contratos podem exigir assinatura;
- o PDF parece separar mensagem e destino;
- o QR esconde o endereço no computador;
- personalização com marca e e-mail parece confirmar identidade;
- a página de login imita um processo habitual.

## Indícios e limites

O usuário pode observar expectativa, origem, função do documento e destino textual, quando a interface o revelar. Não pode diagnosticar AiTM apenas pela aparência da página.

A ação segura continua sendo recuperar o portal fiscal, de RH ou de documentos por rota conhecida e verificar se o item existe ali.

## Comportamento seguro ensinável

Não transferir confiança do PDF para o QR; recuperar o documento pelo serviço aberto independentemente e confirmar o contexto.

## Possibilidade de atividade

- **Formato candidato:** cadeia PDF → prévia textual do QR → comparação de SSO.
- **Decisão principal:** qual rota pode confirmar o documento.
- **Variação legítima necessária:** assinatura realmente esperada no portal conhecido.
- **Transferência curta:** QR aparece diretamente no corpo do e-mail.
- **Risco pedagógico:** avaliar detecção de AiTM invisível em vez da escolha da rota.

## Justificativa da dificuldade

O tema combina com processos corporativos, o QR desloca o dispositivo e a página pode ser personalizada. Ainda existem etapas observáveis e uma rota independente recuperável, mantendo o caso no nível Intermediário.

## Relação com o currículo atual

Combina **O destino atrás do QR**, **Espelho de Página** e debrief sobre AiTM. O fenômeno técnico não deve receber nota de detecção humana.

## Fonte

- [Microsoft — Tax-themed phishing campaigns](https://www.microsoft.com/en-us/security/blog/2025/04/03/threat-actors-leverage-tax-season-to-deploy-tax-themed-phishing-campaigns/)
