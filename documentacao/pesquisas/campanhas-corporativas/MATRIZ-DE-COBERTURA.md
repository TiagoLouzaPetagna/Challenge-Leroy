# Matriz de cobertura dos 24 casos

## Fundamental

| ID | Área | Caso | Técnica dominante | Canais |
|---|---|---|---|---|
| F01 | Diretoria e assistentes | Cartões-presente em nome da diretoria | BEC por autoridade | e-mail |
| F02 | RH e folha | Alteração urgente do depósito salarial | desvio de pagamento | e-mail |
| F03 | Financeiro e compras | Fornecedor pede nova conta bancária | personificação de fornecedor | e-mail |
| F04 | Operações e logística | Documento com linguagem industrial | pretexto industrial e anexo | e-mail |
| F05 | Geral | Cobrança que manda ligar para cancelar | phishing por retorno telefônico | e-mail + telefone |
| F06 | RH e folha | Bônus e benefícios entregues por QR | quishing | e-mail + documento + celular |
| F07 | Geral | Nome conhecido, endereço parecido | display name e typosquatting | e-mail |
| F08 | TI e suporte | Solicitação de MFA não iniciada | abuso de MFA | notificação |

## Intermediário

| ID | Área | Caso | Técnica dominante | Canais |
|---|---|---|---|---|
| I01 | Geral | QR fiscal leva a página SSO personalizada | quishing e AiTM | e-mail + PDF + navegador |
| I02 | RH e recrutamento | Recrutador transfere vaga para WhatsApp | falso recrutador | e-mail + WhatsApp + arquivo |
| I03 | TI e suporte | Bombardeio de e-mails seguido por Quick Assist | falso help desk e acesso remoto | e-mail + Teams/telefone |
| I04 | RH e folha | Benefícios usam autorização por device code | device code phishing | e-mail + navegador + autenticação |
| I05 | TI e nuvem | Aplicativo pede consentimento excessivo | OAuth consent phishing | e-mail + provedor legítimo |
| I06 | Operações e atendimento | Reclamação de hóspede termina em ClickFix | ClickFix | e-mail + página falsa |
| I07 | TI e suporte | Suporte externo pelo Teams pede código | spearphishing via service | Teams + autenticador |
| I08 | Varejo e operações | Conta e portal de cartões-presente abusados | typosquatting e conta comprometida | e-mail + nuvem |

## Avançado

| ID | Área | Caso | Técnica dominante | Canais |
|---|---|---|---|---|
| A01 | Financeiro e compras | Thread de pagamento sequestrada após AiTM | thread hijacking | e-mail + página de login |
| A02 | Financeiro e compras | Fornecedor confiável inicia cadeia entre empresas | trusted relationship e AiTM | e-mail + nuvem |
| A03 | Vendas e CRM | Falso suporte conduz aprovação de app Salesforce | vishing e connected app | telefone + SaaS |
| A04 | TI e suporte | SMS e personificação obtêm redefinição de identidade | smishing e help desk | SMS + telefone + identidade |
| A05 | Diretoria e financeiro | Reunião virtual simula executivo | deepfake e BEC | e-mail + reunião + chat |
| A06 | TI e SaaS | Vishing conduz SSO personalizado e novo fator | vishing e credential harvesting | telefone + página + MFA |
| A07 | Geral | Erro ou CAPTCHA orienta execução manual | ClickFix multietapa | e-mail/site + sistema operacional |
| A08 | Jurídico e compliance | Código de conduta abre cadeia AiTM | pretexto de compliance e AiTM | e-mail + serviço legítimo + login |

## Cobertura por área

| Área agregada | Quantidade |
|---|---:|
| Geral | 6 |
| Financeiro e compras | 4 |
| TI, suporte, nuvem e SaaS | 7 |
| RH, folha e recrutamento | 4 |
| Diretoria e financeiro | 2 |
| Operações, logística, atendimento e varejo | 3 |
| Vendas e CRM | 1 |
| Jurídico e compliance | 1 |

As áreas podem se sobrepor. A soma desta última visão é superior a 24 quando um caso possui mais de um público relevante; a pasta utiliza somente a área primária.
