# Resumo dos casos, textos e domínios

Este índice apresenta uma leitura curta dos 24 dossiês. Os textos usam estas marcações:

- **Observado:** trecho, assunto, rótulo ou nome de arquivo publicado pela fonte;
- **Reconstruído:** exemplo seguro criado para representar o pretexto, sem alegar que são palavras originais do atacante;
- **Padrão:** formato de domínio recorrente publicado pela fonte, não um endereço único confirmado no caso;
- **Legítimo abusado:** serviço verdadeiro que participou da cadeia, mas não pertence ao atacante.

Todos os domínios históricos estão desativados com `[.]`. `Não publicado` significa que a fonte selecionada não revelou um domínio atribuível ao caso. Isso não permite concluir que a campanha não usou infraestrutura web.

## Fundamental

### F01 — Cartões-presente em nome da diretoria

- **Resumo:** o atacante personifica uma liderança e pede compra urgente de cartões e envio dos códigos.
- **Texto reconstruído:** “Estou em uma reunião e preciso reconhecer a equipe ainda hoje. Você consegue comprar os cartões e me enviar os códigos assim que finalizar?”
- **Domínio:** não publicado; o caso de referência é BEC baseado em personificação e pode funcionar sem link.
- **Dossiê:** [F01](casos/01-fundamental/diretoria-e-assistentes/bec-por-autoridade/f01-cartoes-presente-em-nome-da-diretoria.md)

### F02 — Alteração urgente do depósito salarial

- **Resumo:** mensagens em nome de funcionários tentam trocar a conta que recebe o salário antes do fechamento da folha.
- **Texto reconstruído:** “Preciso atualizar minha conta de depósito antes do fechamento desta folha. Pode confirmar quais dados devo enviar por aqui?”
- **Domínio:** não publicado; a Proofpoint relata uso frequente de contas gratuitas, sem atribuir um endereço específico ao exemplo.
- **Dossiê:** [F02](casos/01-fundamental/rh-e-folha/desvio-de-pagamento/f02-alteracao-urgente-do-deposito-salarial.md)

### F03 — Fornecedor pede nova conta bancária

- **Resumo:** um fornecedor é personificado para substituir dados bancários de uma fatura ou pagamento esperado.
- **Texto reconstruído:** “Para os próximos pagamentos, nossa conta de recebimento foi atualizada. A fatura permanece a mesma; use os novos dados anexos neste fechamento.”
- **Domínio:** não publicado no alerta geral do FBI usado como referência.
- **Dossiê:** [F03](casos/01-fundamental/financeiro-e-compras/personificacao-de-fornecedor/f03-fornecedor-pede-nova-conta-bancaria.md)

### F04 — Documento com linguagem industrial

- **Resumo:** campanhas usam vocabulário de logística e engenharia para fazer um anexo parecer parte do trabalho cotidiano.
- **Texto observado:** assuntos “bill of lading” e “bill of materials (BOM)”, equivalentes a conhecimento de embarque e lista de materiais.
- **Domínio:** não publicado para os exemplos selecionados.
- **Dossiê:** [F04](casos/01-fundamental/operacoes-e-logistica/pretexto-industrial/f04-documento-com-linguagem-industrial.md)

### F05 — Cobrança que manda ligar para cancelar

- **Resumo:** uma fatura ou renovação falsa instrui a própria vítima a ligar para uma central controlada pelo atacante.
- **Texto reconstruído:** “Sua renovação foi confirmada. Caso não reconheça a cobrança, ligue hoje para a central indicada nesta fatura e solicite o cancelamento.”
- **Domínio:** não publicado; o telefone, e não um site, era a principal rota de contato.
- **Dossiê:** [F05](casos/01-fundamental/geral/phishing-por-retorno-telefonico/f05-cobranca-que-manda-ligar-para-cancelar.md)

### F06 — Bônus e benefícios entregues por QR

- **Resumo:** mensagens de RH ou folha usam bônus de fim de ano e documentos com QR para conduzir a páginas falsas de autenticação.
- **Texto observado:** assunto “Xmas Employee Payroll”; um dos anexos foi chamado `annual_loyalty_compensation_award.docx`.
- **Texto reconstruído:** “Seu demonstrativo de reconhecimento anual está disponível. Leia o código no documento para revisar os detalhes antes do encerramento.”
- **Domínios publicados:** `quantumdhub[.]ru` como receptor de credenciais; `9a8ed03d.f2cb57a2c2a430507599d2aa[.]workers[.]dev` e `orients-pk[.]com` na cadeia SakaiPages.
- **Dossiê:** [F06](casos/01-fundamental/rh-e-folha/quishing/f06-bonus-e-beneficios-entregues-por-qr.md)

### F07 — Nome conhecido, endereço parecido

- **Resumo:** o nome exibido parece conhecido, mas o endereço pertence a outra conta ou a um domínio semelhante.
- **Texto reconstruído:** “Segue a versão atualizada do documento que conversamos. Preciso da sua confirmação ainda hoje para manter o cronograma.”
- **Domínio:** não publicado no caso de referência; o laboratório futuro deve usar somente `.example`.
- **Dossiê:** [F07](casos/01-fundamental/geral/dominio-e-remetente-semelhantes/f07-nome-conhecido-endereco-parecido.md)

### F08 — Solicitação de MFA não iniciada

- **Resumo:** o atacante já possui parte do acesso e tenta induzir a vítima a aprovar uma autenticação que ela não iniciou.
- **Texto reconstruído:** “Solicitação de entrada recebida. Serviço corporativo · dispositivo não reconhecido. Você está tentando acessar agora?”
- **Domínio:** não publicado; o principal artefato é a notificação do autenticador.
- **Dossiê:** [F08](casos/01-fundamental/ti-e-suporte/mfa-nao-iniciada/f08-solicitacao-de-mfa-nao-iniciada.md)

## Intermediário

### I01 — QR fiscal leva a SSO personalizado

- **Resumo:** PDF fiscal com QR conduz a uma página que imita a identidade Microsoft 365 da organização e pode capturar a sessão.
- **Texto observado:** “EMPLOYEE TAX REFUND REPORT”.
- **Texto reconstruído:** “O relatório fiscal do funcionário requer revisão. Use o código do PDF para abrir o documento seguro e confirmar o recebimento.”
- **Domínio:** o domínio da cadeia de QR selecionada não foi publicado; outros domínios do artigo pertencem a campanhas fiscais diferentes e não foram atribuídos a este caso.
- **Dossiê:** [I01](casos/02-intermediario/geral/quishing-e-aitm/i01-qr-fiscal-leva-a-sso-personalizado.md)

### I02 — Recrutador transfere vaga para WhatsApp

- **Resumo:** um falso recrutador cria relação por e-mail e WhatsApp e entrega uma vaga em arquivo protegido acompanhado de leitor adulterado.
- **Texto reconstruído:** “Seu perfil combina com uma posição confidencial. A descrição está no arquivo protegido; use o leitor incluído para visualizar corretamente.”
- **Domínio:** não publicado no artigo aberto; a fonte informa que indicadores adicionais ficam numa coleção de inteligência com acesso controlado.
- **Dossiê:** [I02](casos/02-intermediario/rh-e-recrutamento/falso-recrutador/i02-recrutador-transfere-vaga-para-whatsapp.md)

### I03 — Bombardeio de e-mails seguido por Quick Assist

- **Resumo:** depois de inundar a caixa da vítima, o atacante liga ou chama pelo Teams como falso suporte e oferece corrigir o problema por acesso remoto.
- **Texto reconstruído:** “Identificamos o volume anormal na sua caixa. Sou do suporte e vou corrigir agora; abra a assistência rápida e informe o código exibido.”
- **Domínio:** não publicado para a abordagem social; a cadeia dependia de contato e do aplicativo legítimo Quick Assist.
- **Dossiê:** [I03](casos/02-intermediario/ti-e-suporte/bombardeio-e-acesso-remoto/i03-bombardeio-de-emails-seguido-por-quick-assist.md)

### I04 — Benefícios usam autorização por device code

- **Resumo:** um benefício fictício leva a vítima a autorizar a sessão do atacante usando o fluxo legítimo de código de dispositivo.
- **Texto observado:** título “Salary Bonus + Employer Benefits Reports 25”.
- **Texto reconstruído:** “Para concluir a autenticação segura, copie o código apresentado e confirme no portal oficial da Microsoft.”
- **Domínio:** o site intermediário do atacante não foi publicado. **Legítimo abusado:** `microsoft[.]com/devicelogin`, onde a vítima inseria o código fornecido pelo atacante.
- **Dossiê:** [I04](casos/02-intermediario/rh-e-folha/device-code/i04-beneficios-usam-autorizacao-por-device-code.md)

### I05 — Aplicativo pede consentimento excessivo

- **Resumo:** phishing e contas comprometidas levam à criação ou ao abuso de aplicativos OAuth capazes de ler ou enviar e-mails.
- **Texto observado:** assunto “OneDrive: You have received a new document today”.
- **Texto reconstruído:** “Conecte o aplicativo para abrir o documento compartilhado. A integração precisa acessar seu perfil, arquivos e caixa de correio.”
- **Domínio:** não publicado; contas e domínios de organizações comprometidas também foram usados para distribuir mensagens.
- **Dossiê:** [I05](casos/02-intermediario/ti-e-nuvem/oauth-consent/i05-aplicativo-pede-consentimento-excessivo.md)

### I06 — Reclamação de hóspede termina em ClickFix

- **Resumo:** falso contato da Booking.com apresenta reclamação ou verificação e termina com instrução para executar manualmente conteúdo malicioso.
- **Texto reconstruído:** “Um hóspede registrou feedback negativo e solicita resposta da propriedade. Verifique sua conta para abrir os detalhes da ocorrência.”
- **Domínio:** a Microsoft não publicou os domínios de phishing nessa página; publicou apenas endereços IP da infraestrutura posterior de malware.
- **Dossiê:** [I06](casos/02-intermediario/operacoes-e-atendimento/clickfix/i06-reclamacao-de-hospede-termina-em-clickfix.md)

### I07 — Suporte externo pelo Teams pede código

- **Resumo:** uma conta externa no Teams se apresenta como suporte e tenta fazer a vítima concluir uma autenticação iniciada pelo atacante.
- **Texto observado:** “We detected a recent change to your preferred Multi-Factor Authentication (MFA)”.
- **Texto reconstruído:** “A equipe de proteção precisa concluir uma verificação da sua conta. Abra o autenticador e confirme o código apresentado nesta conversa.”
- **Domínios publicados:** `mlcrosoftaccounts[.]onmicrosoft[.]com`, `teamsprotection[.]onmicrosoft[.]com` e `identityverification[.]onmicrosoft[.]com`, entre outros subdomínios maliciosos listados pela Microsoft.
- **Dossiê:** [I07](casos/02-intermediario/ti-e-suporte/teams-externo/i07-suporte-externo-pelo-teams-pede-codigo.md)

### I08 — Portal de cartões-presente e conta comprometida

- **Resumo:** o grupo Storm-0539 usa contas, nuvem e domínios semelhantes para alcançar portais corporativos de emissão de cartões-presente.
- **Texto reconstruído:** “Revisão operacional do portal: confirme o acesso da sua equipe antes do próximo ciclo de emissão e valide o dispositivo cadastrado.”
- **Domínio:** a fonte confirma typosquatting, mas não publica os domínios exatos desse caso.
- **Dossiê:** [I08](casos/02-intermediario/varejo-e-operacoes/abuso-de-conta-e-typosquatting/i08-portal-de-cartoes-presente-e-conta-comprometida.md)

## Avançado

### A01 — Thread de pagamento sequestrada após AiTM

- **Resumo:** uma página AiTM rouba a sessão; o atacante entra na caixa e responde a conversas reais de fatura para desviar pagamentos.
- **Texto observado no acesso inicial:** “Please Wait while we fetch your voice message.”
- **Texto reconstruído para a fraude financeira:** “Confirmando o fechamento da fatura já discutida: nosso banco mudou. Use os dados atualizados abaixo para que o crédito seja identificado hoje.”
- **Domínio publicado:** `login[.]nmmnvvx[.]xyz`, hospedando uma página Evilginx2 da campanha observada.
- **Dossiê:** [A01](casos/03-avancado/financeiro-e-compras/thread-hijacking-e-aitm/a01-thread-de-pagamento-sequestrada-apos-aitm.md)

### A02 — Fornecedor confiável inicia cadeia entre empresas

- **Resumo:** a conta de um fornecedor real envia a primeira mensagem, uma rota de compartilhamento leva ao AiTM e novas contas comprometidas ampliam a campanha.
- **Texto reconstruído:** “Disponibilizamos a documentação atualizada da operação compartilhada. Acesse com sua conta corporativa para revisar antes da próxima etapa.”
- **Domínio:** o domínio final não foi publicado. **Legítimo abusado:** uma URL do Canva foi modificada e usada como parte da cadeia de redirecionamento.
- **Dossiê:** [A02](casos/03-avancado/financeiro-e-compras/fornecedor-confiavel-comprometido/a02-fornecedor-confiavel-inicia-cadeia-entre-empresas.md)

### A03 — Falso suporte conduz aprovação de aplicativo Salesforce

- **Resumo:** por telefone, o falso suporte orienta a vítima a autorizar um aplicativo conectado semelhante ao Data Loader e obtém acesso ao CRM.
- **Texto reconstruído:** “Sou do suporte do CRM. Para concluir a correção, abra Aplicativos conectados e autorize o carregador de dados que aparece na tela.”
- **Domínio:** não publicado; o fluxo acontece no ambiente Salesforce legítimo da vítima e por voz.
- **Dossiê:** [A03](casos/03-avancado/vendas-e-crm/vishing-e-aplicativo-conectado/a03-falso-suporte-conduz-aprovacao-de-app-salesforce.md)

### A04 — SMS e personificação obtêm redefinição de identidade

- **Resumo:** SMS personalizado captura credenciais; depois o atacante personifica o funcionário perante o help desk para redefinir senha ou MFA.
- **Texto reconstruído:** “A sincronização do seu acesso corporativo expirou. Confirme sua conta no portal móvel antes do encerramento do turno.”
- **Domínio:** nenhum domínio exato foi publicado. **Padrões observados:** `{empresa}-sso[.]com`, `sso-{empresa}[.]com`, `{empresa}-servicenow[.]com` e `servicenow-{empresa}[.]com`.
- **Dossiê:** [A04](casos/03-avancado/ti-e-suporte/smishing-e-reset-de-identidade/a04-sms-e-personificacao-obtem-reset-de-identidade.md)

### A05 — Reunião virtual simula executivo

- **Resumo:** contas comprometidas, chat, reunião virtual e voz ou vídeo sintéticos sustentam um pedido financeiro em nome de uma liderança.
- **Texto reconstruído:** “A aquisição ainda é confidencial. Meu áudio está instável; siga os dados enviados no chat e conclua a transferência antes da reunião do conselho.”
- **Domínio:** não publicado no alerta do FBI; a interação acontece por e-mail, reunião e chat.
- **Dossiê:** [A05](casos/03-avancado/diretoria-e-financeiro/deepfake-e-reuniao-virtual/a05-reuniao-virtual-simula-executivo.md)

### A06 — Vishing conduz SSO personalizado e novo fator

- **Resumo:** falso TI leva o funcionário a uma página SSO com a identidade da própria empresa, captura credenciais e MFA e registra outro dispositivo.
- **Texto reconstruído:** “Estamos atualizando seu acesso único. Abra a página de verificação com a identidade da empresa e confirme o novo dispositivo para evitar interrupção.”
- **Domínio:** os nomes exatos, dependentes das vítimas, não foram publicados. **Padrões observados:** `<empresa>sso[.]com`, `my-<empresa>sso[.]com`, `<empresa>internal[.]com` e `support-<empresa>[.]com`.
- **Dossiê:** [A06](casos/03-avancado/ti-e-saas/vishing-e-sso-personalizado/a06-vishing-conduz-sso-personalizado-e-novo-fator.md)

### A07 — Erro ou CAPTCHA orienta execução manual

- **Resumo:** falso erro, CAPTCHA ou correção convence o usuário a executar no próprio sistema uma instrução fornecida pela página.
- **Texto observado:** rótulo “How to fix”.
- **Texto reconstruído:** “Não foi possível carregar o documento. Conclua a verificação manual para corrigir o acesso e continuar.”
- **Domínio publicado em um dos exemplos ClickFix da Microsoft:** `access-ssa-gov[.]es`.
- **Dossiê:** [A07](casos/03-avancado/geral/clickfix-multietapa/a07-erro-ou-captcha-orienta-execucao-manual.md)

### A08 — Código de conduta abre cadeia AiTM

- **Resumo:** uma acusação de compliance usa e-mail autenticado, PDF, CAPTCHA e várias páginas até chegar a uma sessão AiTM.
- **Textos observados:** “issued through an authorized internal channel” e botão “Review Case Materials”.
- **Texto reconstruído:** “A atualização anual do Código de Conduta exige ciência até o fim do expediente. Entre com sua conta corporativa para revisar e confirmar.”
- **Domínios publicados:** `acceptable-use-policy-calendly[.]de`, `compliance-protectionoutlook[.]de`, `cocinternal[.]com`, `gadellinet[.]com` e `harteprn[.]com`.
- **Dossiê:** [A08](casos/03-avancado/juridico-e-compliance/aitm-multietapa/a08-codigo-de-conduta-abre-cadeia-aitm.md)

## Limites de uso

- Os domínios são indicadores históricos e podem ter sido desativados, apreendidos, expirado ou mudado de finalidade.
- Um domínio isolado não comprova nem exclui phishing; o comportamento, o contexto e a telemetria continuam necessários.
- Os domínios não devem virar links clicáveis, ser visitados para teste nem ser usados como infraestrutura de atividade.
- As atividades futuras devem substituir toda identidade e infraestrutura por organizações fictícias e domínios `.example`.
