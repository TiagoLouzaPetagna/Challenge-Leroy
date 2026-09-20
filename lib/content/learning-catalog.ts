import { PILOT_MISSION_ID } from "../domain/rules";
import type {
  CompetencyId,
  JourneyMissionDefinition,
} from "../domain/types";

export const MAIN_MISSION_JOURNEY: readonly JourneyMissionDefinition[] = [
  {
    id: PILOT_MISSION_ID,
    slug: "aviso-de-bloqueio",
    order: 1,
    title: "O aviso que não podia esperar",
    subtitle: "Aviso de bloqueio de conta",
    summary:
      "Aprenda PARE: identifique o pedido e a consequência, confirme fora da mensagem e responda pelo processo seguro.",
    competencyFocus: [
      "observar",
      "investigar",
      "verificar",
      "decidir",
      "reportar",
    ],
    estimatedMinutes: 9,
    playableInMvp: true,
  },
  {
    id: "mission:delivery-qr",
    slug: "entrega-por-qr-code",
    order: 2,
    title: "Entrega por QR Code",
    subtitle: "Reagendamento de entrega",
    summary:
      "Avalie um pedido de reagendamento que tenta levar você a um QR Code suspeito.",
    competencyFocus: ["observar", "verificar", "decidir"],
    estimatedMinutes: 9,
    prerequisiteMissionId: PILOT_MISSION_ID,
    playableInMvp: false,
  },
  {
    id: "mission:urgent-manager-request",
    slug: "pedido-urgente-do-gestor",
    order: 3,
    title: "Pedido urgente de um gestor",
    subtitle: "Pressão e falsa autoridade",
    summary:
      "Reconheça sinais de personificação antes de atender a um pedido fora do processo.",
    competencyFocus: ["investigar", "verificar", "decidir", "reportar"],
    estimatedMinutes: 10,
    prerequisiteMissionId: "mission:delivery-qr",
    playableInMvp: false,
  },
  {
    id: "mission:unexpected-document",
    slug: "documento-inesperado",
    order: 4,
    title: "Documento inesperado",
    subtitle: "Anexo fora de contexto",
    summary:
      "Decida como tratar um arquivo inesperado sem expor a conta ou o dispositivo.",
    competencyFocus: ["observar", "investigar", "recuperar"],
    estimatedMinutes: 10,
    prerequisiteMissionId: "mission:urgent-manager-request",
    playableInMvp: false,
  },
  {
    id: "mission:clicked-now-what",
    slug: "cliquei-e-agora",
    order: 5,
    title: "Cliquei. E agora?",
    subtitle: "Resposta depois do incidente",
    summary:
      "Pratique os primeiros passos de contenção, reporte e orientação após um clique.",
    competencyFocus: ["reportar", "recuperar", "orientar"],
    estimatedMinutes: 11,
    prerequisiteMissionId: "mission:unexpected-document",
    playableInMvp: false,
  },
] as const;

export const COMPETENCY_CATALOG: ReadonlyArray<{
  id: CompetencyId;
  label: string;
  summary: string;
}> = [
  {
    id: "observar",
    label: "Observar",
    summary: "Perceber detalhes e sinais que merecem atenção.",
  },
  {
    id: "investigar",
    label: "Investigar",
    summary: "Reunir evidências antes de agir.",
  },
  {
    id: "verificar",
    label: "Verificar",
    summary: "Confirmar identidade, origem e destino por um canal confiável.",
  },
  {
    id: "decidir",
    label: "Decidir",
    summary: "Escolher uma resposta segura diante do risco.",
  },
  {
    id: "reportar",
    label: "Reportar",
    summary: "Encaminhar a suspeita pelo procedimento correto.",
  },
  {
    id: "recuperar",
    label: "Recuperar",
    summary: "Agir rapidamente para conter um possível incidente.",
  },
  {
    id: "orientar",
    label: "Orientar",
    summary: "Ajudar colegas a reconhecer e responder ao risco.",
  },
];

export const ACTIVITY_LABELS: Readonly<Record<string, string>> = {
  [PILOT_MISSION_ID]: "O aviso que não podia esperar",
  "mission:compromised-conversation": "A conversa já estava acontecendo",
  "mission:mfa-fatigue": "Você iniciou este acesso?",
  "mission:clicked-now-what": "Cliquei. E agora?",
  "phishlab:true-sender": "Quem enviou de verdade?",
  "phishlab:link-analyzer": "Domínio sob a lupa",
  "simulation:workday": "Uma manhã comum",
  "radar:quishing": "Radar: Quishing",
  "radar:unexpected-attachments": "Radar: Anexos inesperados",
  "radar:manager-impersonation": "Radar: Falso gestor",
  "radar:mfa-fatigue": "Radar: Fadiga de MFA",
  "radar:message-scams": "Radar: Golpes por mensagem",
  "radar:after-click": "Radar: Depois do clique",
  "team:secure-inbox": "Equipes: Caixa de Entrada Segura",
  "team:bank-change": "Equipes: Mudança bancária sem atalho",
  "arcade:overlooked": "Office Defenders",
};
