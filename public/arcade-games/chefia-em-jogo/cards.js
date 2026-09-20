export const CARDS = {
  "AUT-01": {
    "id": "AUT-01",
    "title": "Uma demonstração muito convincente",
    "actor": "Consultora",
    "text": "Sua equipe copia a mesma informação em três lugares. Minha ferramenta faz isso sozinha. Posso organizar um teste?",
    "choices": [
      "Deixar para depois",
      "Testar em uma equipe"
    ]
  },
  "AUT-02": {
    "id": "AUT-02",
    "title": "Uma tarde sobrando",
    "actor": "Equipe",
    "text": "A ferramenta nos ajudou a terminar o relatório antes do almoço. Podemos colocar o trabalho em dia ou pedir um orçamento para levar a ferramenta a outras equipes.",
    "choices": [
      "Colocar o trabalho em dia",
      "Pedir orçamento para outras equipes"
    ]
  },
  "AUT-03": {
    "id": "AUT-03",
    "title": "Automação assistida",
    "actor": "TI e Segurança",
    "text": "A ferramenta transfere os dados, mas ainda precisamos conferir tudo à mão. Por enquanto, ela só mudou a parte trabalhosa de lugar.",
    "choices": [
      "Encerrar o teste",
      "Ajustar o processo"
    ]
  },
  "AUT-04": {
    "id": "AUT-04",
    "title": "A parte depois da demonstração",
    "actor": "Financeiro",
    "text": "A economia de horas de trabalho pode compensar o custo da licença. Isso depende de a equipe conseguir usar a ferramenta no dia a dia. Vamos contratar?",
    "choices": [
      "Encerrar a avaliação",
      "Contratar a licença proposta"
    ],
    "variants": {
      "adequada ou suporte": "A economia de horas de trabalho pode compensar o custo da licença. Isso depende de a equipe conseguir usar a ferramenta no dia a dia. Vamos contratar?",
      "preço temporário": "O desconto dura três meses, mas o contrato dura um ano. Depois, a mensalidade dobra. Podemos reduzir as licenças ao fim da promoção. Ainda vale contratar?"
    }
  },
  "AUT-05": {
    "id": "AUT-05",
    "title": "Menos promessas, menos campos",
    "actor": "Consultora",
    "text": "Fizemos funcionar para o relatório principal. Para os outros dois, ainda recomendo pessoas. Continuam bastante versáteis.",
    "choices": [
      "Ficar com o processo anterior",
      "Cotar só o relatório principal"
    ]
  },
  "AUT-06": {
    "id": "AUT-06",
    "title": "O que fizemos com o tempo",
    "actor": "Equipe",
    "text": "Sobrou tempo para revisar as entregas. Já encontramos um erro antes de o cliente encontrar.",
    "choices": [
      "Proteger tempo de revisão",
      "Priorizar novas entregas"
    ],
    "variants": {
      "capacidade disponível": "Sobrou tempo para revisar as entregas. Já encontramos um erro antes de o cliente encontrar.",
      "trabalho adicional": "A ferramenta poupou duas horas, mas recebemos três horas de trabalho novo. Estamos trabalhando mais do que antes."
    }
  },
  "AUT-07": {
    "id": "AUT-07",
    "title": "O sucesso já tem dono",
    "actor": "Comercial",
    "text": "Ouvi dizer que a equipe está mais rápida. Coincidência: tenho um cliente que precisa de alguém mais rápido.",
    "choices": [
      "Guardar tempo para a equipe",
      "Ouvir a proposta"
    ]
  },
  "AUT-08": {
    "id": "AUT-08",
    "title": "O fim da promoção",
    "actor": "Financeiro",
    "text": "O desconto da ferramenta termina agora e a mensalidade vai dobrar. Podemos reduzir o número de licenças ou pagar mais para manter todas.",
    "choices": [
      "Reduzir o número de licenças",
      "Manter todas as licenças"
    ]
  },
  "CON-01": {
    "id": "CON-01",
    "title": "Cabe em quatro semanas",
    "actor": "Comercial",
    "text": "Consegui um contrato ótimo. O cliente quer tudo em quatro semanas. Eu disse que temos uma equipe excepcional. Agora falta consultar a equipe.",
    "choices": [
      "Propor uma entrega menor",
      "Aceitar o escopo e o prazo"
    ]
  },
  "CON-02": {
    "id": "CON-02",
    "title": "A proposta da proposta",
    "actor": "Cliente recorrente",
    "text": "Podemos começar pelo essencial. Prefiro receber uma parte funcionando a uma explicação completa.",
    "choices": [
      "Recusar essas condições",
      "Aceitar o escopo menor"
    ],
    "variants": {
      "organizado": "Podemos começar pelo essencial. Prefiro receber uma parte funcionando a uma explicação completa.",
      "expansivo ou pagamento lento": "Consigo reduzir a primeira entrega. O desconto precisa acompanhar a redução."
    }
  },
  "CON-03": {
    "id": "CON-03",
    "title": "O trabalho que já estava aqui",
    "actor": "Equipe",
    "text": "Fechamos o contrato com a Aurora, mas a equipe já está ocupada com outros clientes. Vamos reorganizar as entregas ou contratar ajuda para dar conta do novo trabalho?",
    "choices": [
      "Reorganizar as entregas da equipe",
      "Contratar ajuda temporária"
    ]
  },
  "CON-04": {
    "id": "CON-04",
    "title": "Um ajuste pequeno",
    "actor": "Cliente recorrente",
    "text": "A diretoria gostou. Quer só mais um painel, duas integrações e uma versão para celular. Podemos chamar de ajuste?",
    "choices": [
      "Manter o combinado",
      "Negociar uma segunda etapa"
    ]
  },
  "CON-05": {
    "id": "CON-05",
    "title": "A semana da entrega",
    "actor": "Cliente recorrente",
    "text": "Recebemos a entrega. A equipe daqui já está usando. Também já tem sugestões, mas uma coisa de cada vez.",
    "choices": [
      "Concentrar a equipe na conclusão",
      "Negociar o encerramento por etapas"
    ],
    "variants": {
      "pronta": "Recebemos a entrega. A equipe daqui já está usando. Também já tem sugestões, mas uma coisa de cada vez.",
      "atraso": "Combinamos esta semana. Eu reservei a equipe para começar. Preciso de uma data em que possa confiar."
    }
  },
  "CON-06": {
    "id": "CON-06",
    "title": "O dinheiro está a caminho",
    "actor": "Financeiro",
    "text": "A Aurora recebeu a cobrança, mas o prazo venceu e o pagamento não entrou. Podemos negociar parcelas ou suspender novos pedidos até resolver a dívida.",
    "choices": [
      "Negociar parcelas",
      "Suspender novas demandas"
    ]
  },
  "CON-07": {
    "id": "CON-07",
    "title": "A conta e a relação",
    "actor": "Financeiro",
    "text": "A Aurora pagou pelo serviço. Podemos encerrar esse contrato sem oferecer novos trabalhos ou continuar a conversa sobre outros projetos.",
    "choices": [
      "Priorizar o encerramento financeiro",
      "Preservar a negociação comercial"
    ],
    "variants": {
      "pago": "A Aurora pagou pelo serviço. Podemos encerrar esse contrato sem oferecer novos trabalhos ou continuar a conversa sobre outros projetos.",
      "acordo parcelado": "A primeira parcela entrou. As próximas têm data. Por enquanto, temos uma melhora no Caixa e um lembrete na agenda.",
      "recuperação parcial oferecida": "A Aurora oferece pagar metade da dívida agora, desde que a gente abra mão do restante. Aceitamos ou continuamos cobrando o valor completo?"
    }
  },
  "CON-08": {
    "id": "CON-08",
    "title": "A boa notícia ocupa agenda",
    "actor": "Comercial",
    "text": "A Aurora nos indicou para duas empresas. Podemos conversar com uma de cada vez ou abrir as duas negociações agora.",
    "choices": [
      "Escolher uma oportunidade",
      "Abrir todas as negociações"
    ]
  },
  "ARQ-01": {
    "id": "ARQ-01",
    "title": "Ainda tem o seu lugar na gaveta",
    "actor": "Veterano",
    "text": "Encontrei uma pasta com pendências da gestão anterior. Seu antecessor guardava tudo na gaveta de baixo. Quer um resumo ou prefere examinar os registros?",
    "choices": [
      "Pedir um resumo",
      "Examinar os registros"
    ]
  },
  "ARQ-02": {
    "id": "ARQ-02",
    "title": "Dinheiro com sobrenome antigo",
    "actor": "Financeiro",
    "text": "A empresa tem um saldo a receber da Cedro Serviços. Podemos pedir a devolução ou usar o valor em um serviço futuro. Antes, precisamos atualizar o contato cadastrado.",
    "choices": [
      "Solicitar devolução pelo canal cadastrado",
      "Usar no próximo serviço necessário"
    ]
  },
  "ARQ-03": {
    "id": "ARQ-03",
    "title": "Uma promessa sem calendário",
    "actor": "Cliente recorrente",
    "text": "Seu antecessor prometeu uma revisão gratuita. Depois escreveu ‘em breve’. Trouxe a mensagem, porque já passou algum tempo.",
    "choices": [
      "Cumprir a revisão documentada",
      "Renegociar o escopo e a data"
    ]
  },
  "ARQ-04": {
    "id": "ARQ-04",
    "title": "Uma conta ainda na empresa",
    "actor": "TI e Segurança",
    "text": "Um prestador deixou a empresa, mas sua conta continua ativa. Ainda não sabemos se algum sistema depende dela. Vamos limitar o acesso enquanto investigamos ou desativar a conta agora?",
    "choices": [
      "Restringir e identificar o responsável",
      "Revogar e acompanhar os sistemas"
    ]
  },
  "ARQ-05": {
    "id": "ARQ-05",
    "title": "O crédito saiu da gaveta",
    "actor": "Financeiro",
    "text": "A Cedro devolveu o valor que devia à empresa. Podemos guardar o dinheiro para imprevistos ou usar parte dele na manutenção que já estava prevista.",
    "choices": [
      "Reservar para contingências",
      "Aplicar em manutenção prevista"
    ],
    "variants": {
      "restituição": "A Cedro devolveu o valor que devia à empresa. Podemos guardar o dinheiro para imprevistos ou usar parte dele na manutenção que já estava prevista.",
      "crédito mantido": "A Cedro atualizou nosso cadastro e confirmou o crédito. O valor pode pagar um serviço do fornecedor, mas não entrou como dinheiro no Caixa."
    }
  },
  "ARQ-06": {
    "id": "ARQ-06",
    "title": "Uma promessa a menos",
    "actor": "Equipe",
    "text": "Terminamos a revisão prometida. O cliente agradeceu. Pediu também uma coisa que nunca foi prometida.",
    "choices": [
      "Limitar ao compromisso registrado",
      "Apresentar um novo orçamento"
    ],
    "variants": {
      "concluída": "Terminamos a revisão prometida. O cliente agradeceu. Pediu também uma coisa que nunca foi prometida.",
      "impedida": "As urgências adiaram a revisão prometida ao cliente. Precisamos reservar tempo para concluí-la antes de aceitar qualquer pedido extra."
    }
  },
  "ARQ-07": {
    "id": "ARQ-07",
    "title": "O responsável pelo robô",
    "actor": "TI e Segurança",
    "text": "A conta não era usada. Desligamos e ninguém sentiu falta. É um bom resultado, mesmo sem uma história emocionante.",
    "choices": [
      "Encerrar o que não é necessário",
      "Migrar o que ainda é necessário"
    ],
    "variants": {
      "sem dependência": "A conta não era usada. Desligamos e ninguém sentiu falta. É um bom resultado, mesmo sem uma história emocionante.",
      "integração existente": "Encontramos um sistema que troca dados usando a conta do antigo prestador. Precisamos conferir se esse processo ainda é necessário e dar a ele uma conta própria."
    }
  },
  "ARQ-08": {
    "id": "ARQ-08",
    "title": "O nome no rodapé",
    "actor": "Veterano",
    "text": "Se esse caso entrar no relatório, pode dizer que fui eu quem encontrou. Se não entrar, também sei guardar documentos.",
    "choices": [
      "Reconhecer o trabalho da equipe",
      "Destacar a contribuição dele"
    ]
  },
  "VIT-01": {
    "id": "VIT-01",
    "title": "Finalmente uma apresentação com resultado",
    "actor": "Direção",
    "text": "Recebemos um convite para apresentar um caso da empresa. Desta vez, temos um resultado para colocar nos slides.",
    "choices": [
      "Priorizar as entregas",
      "Avaliar o convite"
    ]
  },
  "VIT-02": {
    "id": "VIT-02",
    "title": "A parte que pode ser contada",
    "actor": "Comercial",
    "text": "O resultado fica ótimo no slide. Com o nome do cliente fica melhor. Com autorização, fica melhor ainda.",
    "choices": [
      "Apresentar o processo sem identificar o cliente",
      "Pedir autorização para um caso identificado"
    ]
  },
  "VIT-03": {
    "id": "VIT-03",
    "title": "O lugar na programação",
    "actor": "Financeiro",
    "text": "A apresentação não tem taxa. A preparação, a viagem e o tempo da equipe continuam tendo custo.",
    "choices": [
      "Participar no formato básico",
      "Pagar por mais divulgação"
    ],
    "variants": {
      "mérito ou exposição": "A apresentação não tem taxa. A preparação, a viagem e o tempo da equipe continuam tendo custo.",
      "patrocínio": "Podemos apresentar nosso trabalho de graça, mas aparecer em destaque no evento exige pagar por divulgação. O convite não deixava essa diferença muito clara."
    }
  },
  "VIT-04": {
    "id": "VIT-04",
    "title": "Quem atende a boa notícia",
    "actor": "Equipe",
    "text": "A apresentação trouxe contatos. Precisamos separar quem quer contratar de quem só pediu o material.",
    "choices": [
      "Organizar uma fila de atendimento",
      "Atender todos imediatamente"
    ],
    "variants": {
      "mérito ou patrocínio": "A apresentação trouxe contatos. Precisamos separar quem quer contratar de quem só pediu o material.",
      "exposição": "O evento trouxe mais interessados do que a equipe consegue atender de uma vez. Vamos organizar uma fila ou tirar pessoas das entregas para atender todo mundo agora?"
    }
  },
  "VIT-05": {
    "id": "VIT-05",
    "title": "A promessa que cabe na faixa",
    "actor": "Direção",
    "text": "Podemos anunciar atendimento em qualquer horário. Seria uma demonstração de confiança na operação.",
    "choices": [
      "Divulgar a capacidade real",
      "Prometer atendimento permanente"
    ]
  },
  "VIT-06": {
    "id": "VIT-06",
    "title": "Alguém leu o anúncio",
    "actor": "Cliente recorrente",
    "text": "O anúncio diz qualquer horário. Liguei ontem à noite. Preciso entender qual horário ficou de fora.",
    "choices": [
      "Corrigir o anúncio e a expectativa",
      "Contratar equipe para cumprir o anúncio"
    ],
    "variants": {
      "promessa de horário": "O anúncio diz qualquer horário. Liguei ontem à noite. Preciso entender qual horário ficou de fora.",
      "promessa de prazo": "A proposta diz vinte e quatro horas. Já passou esse prazo. Preciso de uma previsão que a equipe consiga cumprir."
    }
  },
  "VIT-07": {
    "id": "VIT-07",
    "title": "Depois dos aplausos",
    "actor": "Financeiro",
    "text": "Vieram menos contratos do que contatos. Os que vieram cabem na operação. Posso trabalhar com esse tipo de sucesso.",
    "choices": [
      "Consolidar os contratos viáveis",
      "Financiar uma expansão planejada"
    ],
    "variants": {
      "capacidade preservada": "Vieram menos contratos do que contatos. Os que vieram cabem na operação. Posso trabalhar com esse tipo de sucesso.",
      "operação pressionada": "Os novos pedidos aumentaram o trabalho e os gastos antes de trazer receita. Precisamos limitar os projetos ao que conseguimos atender ou investir em uma equipe maior."
    }
  },
  "VIT-08": {
    "id": "VIT-08",
    "title": "A apresentação circulou",
    "actor": "TI e Segurança",
    "text": "O material circulou. Chegam convites, propostas e gente se apresentando como organizadora do evento. Vamos combinar como conferir esses contatos?",
    "choices": [
      "Registrar contatos e canais conhecidos",
      "Fazer uma orientação breve com a equipe"
    ]
  },
  "EML-01": {
    "id": "EML-01",
    "title": "Condições da licença",
    "actor": "NexoFluxo",
    "text": "Olá. Encaminhamos a proposta para o escopo testado. A contratação depende do aceite da empresa; o teste não será convertido automaticamente em licença. As condições e a duração estão no resumo abaixo. Equipe NexoFluxo.",
    "choices": [
      "Encaminhar ao Financeiro",
      "Confirmar as condições com a consultora"
    ],
    "sender": "Projetos NexoFluxo <projetos@nexofluxo.com.br>",
    "subject": "Proposta após a avaliação da ferramenta",
    "link": "https://propostas.nexofluxo.com.br/empresa/avaliacao"
  },
  "EML-02": {
    "id": "EML-02",
    "title": "O combinado por escrito",
    "actor": "Aurora",
    "text": "Olá. Segue a documentação com o escopo e o prazo que combinamos com o Comercial. O portal solicita autenticação corporativa. Se houver diferença em relação à proposta aprovada, me avisem antes de encaminhar a versão final. Obrigada, Marina.",
    "choices": [
      "Acessar os documentos no portal",
      "Confirmar com o Comercial"
    ],
    "sender": "Marina Costa · Aurora <marina.costa@aurora.com.br>",
    "subject": "Documentação do contrato de serviços",
    "link": "https://documentos.aurora.com.br/contratos/184"
  },
  "EML-03": {
    "id": "EML-03",
    "title": "Pode citar, mas revise o material",
    "actor": "Cliente recorrente",
    "text": "Podem citar o projeto e o nome da empresa. Antes de publicar, retirem os dados operacionais da última página. A autorização cobre esta apresentação, não o uso irrestrito do nosso material.",
    "choices": [
      "Aplicar as alterações",
      "Usar uma versão genérica"
    ],
    "sender": "Marina Costa · Aurora <marina.costa@aurora.com.br>",
    "subject": "Uso do nosso caso na apresentação",
    "link": null
  },
  "EML-04": {
    "id": "EML-04",
    "title": "Revalidação do acesso",
    "actor": "Mensagem atribuída à NexoFluxo",
    "text": "Estamos concluindo a atualização dos acessos corporativos. Para manter os usuários atuais, entre com sua conta de trabalho e confirme o código solicitado na página. O procedimento leva poucos minutos.",
    "choices": [
      "Consultar o suporte cadastrado",
      "Autenticar pela página enviada"
    ],
    "sender": "atendimento@nexofluxo-central.com.br",
    "subject": "Continuidade do acesso da sua equipe",
    "link": "https://conta.nexofluxo-central.com.br/revalidar"
  },
  "EML-05": {
    "id": "EML-05",
    "title": "Confirmação de crédito",
    "actor": "Cedro Serviços",
    "text": "Confirmamos o saldo informado pela sua equipe financeira. Podemos devolver pela conta da empresa já cadastrada ou manter o crédito para um serviço futuro. Não é necessário antecipar taxa para receber o valor.",
    "choices": [
      "Encaminhar ao Financeiro",
      "Conferir com o contato cadastrado"
    ],
    "sender": "Financeiro Cedro <financeiro@cedroservicos.com.br>",
    "subject": "Crédito referente ao contrato anterior",
    "link": null
  },
  "EML-06": {
    "id": "EML-06",
    "title": "Informações do evento",
    "actor": "Organização do encontro",
    "text": "A participação na programação básica não exige patrocínio. As cotas de divulgação são opcionais e devem ser identificadas como conteúdo patrocinado. Enviem apenas o material autorizado para publicação.",
    "choices": [
      "Solicitar a modalidade básica",
      "Pedir orçamento de divulgação"
    ],
    "sender": "Programação do Encontro <programacao@encontrogiro.com.br>",
    "subject": "Condições para apresentação do caso",
    "link": "https://encontrogiro.com.br/programacao"
  },
  "EML-07": {
    "id": "EML-07",
    "title": "Pedido atribuído à direção",
    "actor": "Mensagem externa",
    "text": "Estou em reunião e preciso liberar um adiantamento para um parceiro. O Financeiro recebe a documentação depois. Faça a transferência pelo dado abaixo e me responda somente por este e-mail.",
    "choices": [
      "Autorizar o adiantamento solicitado",
      "Confirmar pelo canal da direção"
    ],
    "sender": "diretoria@pontonorte-pagamentos.com.br",
    "subject": "Adiantamento de uma negociação",
    "link": null
  },
  "EML-08": {
    "id": "EML-08",
    "title": "A versão final do documento",
    "actor": "Mensagem atribuída à Aurora",
    "text": "Olá. Organizei os documentos em uma pasta para facilitar a revisão. A visualização pede sua conta corporativa antes de liberar os arquivos. Depois me avisem se podemos concluir. Marina.",
    "choices": [
      "Acessar os documentos no portal",
      "Conferir pelo contato conhecido"
    ],
    "sender": "marina.costa@aurora-documentos.com.br",
    "subject": "Versão final para conferência",
    "link": "https://acesso.aurora-documentos.com.br/documentos/184"
  },
  "ROT-01": {
    "id": "ROT-01",
    "title": "O relatório do relatório",
    "actor": "Equipe",
    "text": "Preenchemos três relatórios para a direção. Dois explicam o primeiro. Podemos mandar um só?",
    "choices": [
      "Enviar um único relatório resumido",
      "Manter os três por enquanto"
    ]
  },
  "ROT-02": {
    "id": "ROT-02",
    "title": "O contrato que se renova sozinho",
    "actor": "Financeiro",
    "text": "A renovação chegou. Pagamos por vinte usuários. Dez entraram no sistema. Um deles só entrou para cancelar.",
    "choices": [
      "Ajustar as licenças utilizadas",
      "Manter capacidade para crescer"
    ]
  },
  "ROT-03": {
    "id": "ROT-03",
    "title": "Uma manutenção sem aplausos",
    "actor": "TI e Segurança",
    "text": "Podemos revisar os acessos esta semana. Se der tudo certo, ninguém vai perceber por que foi importante.",
    "choices": [
      "Reservar uma janela de revisão",
      "Agendar após a entrega atual"
    ]
  },
  "ROT-04": {
    "id": "ROT-04",
    "title": "Um cliente bastante parecido",
    "actor": "Comercial",
    "text": "Um possível cliente pediu uma apresentação. Podemos adaptar o material de outro projeto, retirando os dados do cliente anterior, ou pedir autorização para citá-lo.",
    "choices": [
      "Preparar um caso genérico",
      "Pedir autorização para citar o caso"
    ]
  },
  "ROT-05": {
    "id": "ROT-05",
    "title": "Economia adiada",
    "actor": "Financeiro",
    "text": "O computador ainda funciona, mas está tão lento que atrasa o trabalho da equipe. Podemos comprar outro agora ou adiar a troca para poupar dinheiro.",
    "choices": [
      "Substituir o equipamento",
      "Manter até a próxima revisão"
    ]
  },
  "ROT-06": {
    "id": "ROT-06",
    "title": "Uma vaga sem trabalho definido",
    "actor": "Direção",
    "text": "Se abrirmos mais duas posições de coordenação, estaremos preparados para crescer. O crescimento ainda está em análise.",
    "choices": [
      "Esperar uma necessidade de contratação",
      "Contratar dois coordenadores agora"
    ]
  },
  "ROT-07": {
    "id": "ROT-07",
    "title": "Uma promessa na proposta",
    "actor": "Comercial",
    "text": "Escrevi que resolvemos qualquer problema em vinte e quatro horas. É uma frase curta. Ficou ótima na capa.",
    "choices": [
      "Prometer o que conseguimos cumprir",
      "Publicar a promessa ampla"
    ]
  },
  "ROT-08": {
    "id": "ROT-08",
    "title": "Segurança por autorização prévia",
    "actor": "Direção",
    "text": "Podemos exigir aprovação da direção para abrir qualquer link. Assim teremos certeza de que nada passa sem a nossa atenção.",
    "choices": [
      "Aplicar controles proporcionais",
      "Exigir aprovação de todos os links"
    ]
  },
  "RET-01": {
    "id": "RET-01",
    "title": "A conta entrou em outro lugar",
    "actor": "TI e Segurança",
    "text": "Identificamos uso indevido da conta depois daquela autenticação. Precisamos encerrar as sessões e revisar o que foi acessado.",
    "choices": [
      "Parar as tarefas para proteger a conta",
      "Contratar ajuda para proteger a conta"
    ]
  },
  "RET-02": {
    "id": "RET-02",
    "title": "O adiantamento não era da direção",
    "actor": "Financeiro",
    "text": "A direção não pediu aquele adiantamento. Já acionamos o banco para tentar recuperar o valor. Precisamos manter os pagamentos verdadeiros em dia.",
    "choices": [
      "Usar a reserva para os compromissos",
      "Renegociar despesas adiáveis"
    ]
  },
  "FIM-CAIXA-0": {
    "id": "FIM-CAIXA-0",
    "title": "Sem fôlego financeiro",
    "actor": "Direção",
    "text": "Os pagamentos venceram. As soluções ainda são promessas. A empresa precisa continuar, e você não continuará à frente dela.",
    "choices": []
  },
  "FIM-EQUIPE-0": {
    "id": "FIM-EQUIPE-0",
    "title": "Ninguém segura mais",
    "actor": "Direção",
    "text": "A operação depende de pessoas que já não conseguem sustentar o trabalho. A primeira mudança será na chefia.",
    "choices": []
  },
  "FIM-REPUTACAO-0": {
    "id": "FIM-REPUTACAO-0",
    "title": "Uma resposta que ninguém aceita",
    "actor": "Direção",
    "text": "Os clientes deixaram de confiar nas nossas respostas. A próxima explicação será dada por outra pessoa.",
    "choices": []
  },
  "FIM-SEGURANCA-0": {
    "id": "FIM-SEGURANCA-0",
    "title": "Perda de controle",
    "actor": "Direção",
    "text": "Já não conseguimos proteger a operação nem responder às falhas acumuladas. Sua gestão termina aqui.",
    "choices": []
  },
  "FIM-CAIXA-100": {
    "id": "FIM-CAIXA-100",
    "title": "O futuro ficou sem orçamento",
    "actor": "Direção",
    "text": "O saldo está excelente. Os equipamentos, os projetos e o futuro da empresa, nem tanto. Vamos trocar a gestão.",
    "choices": []
  },
  "FIM-EQUIPE-100": {
    "id": "FIM-EQUIPE-100",
    "title": "Estrutura demais",
    "actor": "Direção",
    "text": "Sua equipe cresceu mais que o negócio. A reestruturação começa pelo seu cargo.",
    "choices": []
  },
  "FIM-REPUTACAO-100": {
    "id": "FIM-REPUTACAO-100",
    "title": "A empresa do anúncio",
    "actor": "Direção",
    "text": "Você vendeu uma empresa que ainda não existe. Agora precisamos explicar isso aos clientes.",
    "choices": []
  },
  "FIM-SEGURANCA-100": {
    "id": "FIM-SEGURANCA-100",
    "title": "Ninguém consegue trabalhar",
    "actor": "Direção",
    "text": "Os sistemas estão protegidos. Ninguém consegue trabalhar neles. A direção decidiu substituir você.",
    "choices": []
  }
};
