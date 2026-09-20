# F07 — Nome conhecido, endereço parecido

```yaml
id: real-case:f07-lookalike-address
dificuldade: fundamental
area_corporativa: geral
industrias: [aplicavel-a-todos]
papeis_alvo: [todos-os-funcionarios]
canais: [email]
tecnica_dominante: dominio-e-remetente-semelhantes
tecnicas_secundarias: [nome-exibido, typosquatting, bec, personificacao]
objetivo_do_atacante: fazer a mensagem parecer enviada por contato conhecido
fonte_principal: FBI Business Email Compromise
data_da_fonte: pagina-atualizada-continuamente
nivel_de_confianca: confirmado-pela-fonte
estado: pesquisa-documental
```

## Resumo factual

O FBI alerta que pequenas variações em endereços legítimos podem induzir a pessoa a tratar uma conta falsa como autêntica. O nome exibido pode continuar igual, escondendo a diferença na visualização compacta.

## Sequência observada

1. o atacante seleciona uma pessoa ou empresa conhecida;
2. registra ou usa endereço visualmente próximo;
3. copia nome, assinatura e contexto público;
4. solicita informação, pagamento ou acesso.

## Texto usado na campanha

- **Natureza:** reconstrução segura.
- **Disponibilidade:** a técnica admite inúmeros pretextos; não existe um texto único.
- **Exemplo reconstruído:**

> Segue a versão atualizada do documento que conversamos. Preciso da sua confirmação ainda hoje para manter o cronograma.

- **Nota:** o laboratório deve mostrar endereços `.example`, sem imitar domínio real.

## Por que funcionava no contexto

- a caixa de entrada destaca o nome, não o endereço completo;
- leitura rápida ignora uma letra;
- assinatura e vocabulário podem ser copiados;
- o pedido se apoia em contexto público ou previsível.

## Indícios e limites

Uma diferença de domínio é evidência relevante, mas sem referência conhecida o usuário pode comparar incorretamente. Um endereço correto também não garante controle humano atual.

O objetivo não é memorizar todas as grafias. É abrir os campos completos, comparar com referência e verificar o processo quando o impacto justificar.

## Comportamento seguro ensinável

Inspecionar o endereço completo e comparar o domínio com uma referência conhecida antes de confiar no nome exibido.

## Possibilidade de atividade

- **Formato candidato:** mapa de identidade seguido de comparação assistida.
- **Decisão principal:** o que cada campo comprova ou não comprova.
- **Variação legítima necessária:** domínio externo autorizado e esperado.
- **Transferência curta:** nome semelhante em convite de chat.
- **Risco pedagógico:** transformar erro de grafia em única forma de phishing.

## Justificativa da dificuldade

O caso Fundamental exibe a diferença depois da inspeção e ensina o uso da referência. Homógrafos, conta comprometida e contexto real devem aparecer somente após essa base.

## Relação com o currículo atual

Relaciona **Quem enviou de verdade?**, **Uma letra fora do lugar** e **Domínio sob a lupa**. Pode funcionar como calibração anterior a casos de conta legítima comprometida.

## Fonte

- [FBI — Business Email Compromise](https://www.fbi.gov/how-we-can-help-you/common-frauds-and-scams/business-email-compromise)
