"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";

import {
  calculatePerformanceBonus,
  COMPROMISED_CONVERSATION_MISSION_ID,
  MFA_FATIGUE_MISSION_ID,
  PHISHLAB_ACTIVITY_ID,
  PILOT_MISSION_ID,
  PILOT_MISSION_VERSION,
  POINT_RULES,
  RECOVERY_MISSION_ID,
  SENDER_INSPECTOR_ACTIVITY_ID,
  SIMULATION_ACTIVITY_ID,
  RADAR_ACTIVITY_ID,
  TEAM_CHALLENGE_ACTIVITY_ID,
} from "@/lib/domain/rules";
import { findRadarArticleBySlug } from "@/lib/content/radar-catalog";
import { findArcadeGameBySlug } from "@/lib/content/arcade-catalog";
import { BANK_CHANGE_ACTIVITY_ID } from "@/lib/content/bank-change-catalog";
import {
  FIRST_LEARNING_PATH,
  getCurriculumPresentation,
} from "@/lib/content/curriculum-catalog";
import type {
  ActivityTimelineItem,
  DecisionKey,
  EvidenceKey,
  MissionAnswer,
  MissionResult,
  LearnerPreferences,
  NextStepRecommendation,
  ReasonKey,
  SectorMetrics,
} from "@/lib/domain/types";
import { selectAchievements } from "@/lib/domain/achievements";
import {
  selectActiveReview,
  selectBestMissionSummary,
  selectCompetencyOverview,
  selectCompletedRadarIds,
  selectCurrentLevel,
  selectLatestMissionRewardBreakdown,
  selectLatestMissionResult,
  selectLatestMfaConsolePackageId,
  selectLatestMfaConsoleResult,
  selectLatestMfaConsoleSubmission,
  selectLatestPhishingFoundationPackageId,
  selectLatestPhishingFoundationResult,
  selectLatestConversationReconstructionPackageId,
  selectLatestConversationReconstructionResult,
  selectLatestDomainAnalyzerResult,
  selectLatestDomainAnalyzerPackageId,
  selectLatestTrueSenderPackageId,
  selectLatestTrueSenderResult,
  selectLatestRecoveryBuilderPackageId,
  selectLatestRecoveryBuilderSubmission,
  selectLatestRecoveryMissionResult,
  selectLatestSimulationResult,
  selectLatestWorkdayTriageV2Attempt,
  selectActivityTimeline,
  selectRecentActivity,
  selectLevelProgress,
  selectLearnerSector,
  selectMainJourney,
  selectNextStep,
  selectPointOrigins,
  selectTeamShield,
  selectTotalPoints,
  selectLatestTeamChallengeAttempt,
  selectLatestTeamChallengeResult,
  selectSectorMetrics,
  selectSectorRanking,
  selectTeamChallengeContribution,
  selectBankChangeContribution,
  selectLatestBankChangeAttempt,
  selectLatestBankChangeResult,
  selectLatestBankProcessV2Attempt,
  selectLatestBankProcessV2Result,
} from "@/lib/state/selectors";
import {
  MissionsHub,
  type MainMissionItem,
  type LearningPathStepStatus,
  type LearningPathView,
  type MissionJourneyStatus,
  type SecondaryMissionItem,
} from "@/features/missions/MissionsHub";
import { ConversationReconstructionMission } from "@/features/missions/ConversationReconstructionMission";
import { PhishingFoundationMission } from "@/features/missions/PhishingFoundationMission";
import { MfaFatigueMission } from "@/features/missions/MfaFatigueMission";
import { RecoveryMission } from "@/features/missions/RecoveryMission";
import {
  ProfileView,
  type ProfileHistoryView,
  type ProfileViewModel,
} from "@/features/profile/ProfileView";
import { PhishLabHub } from "@/features/phishlab/PhishLabExperience";
import { DomainUnderMagnifierLab } from "@/features/phishlab/DomainUnderMagnifierLab";
import { SenderInspectorLab } from "@/features/phishlab/SenderInspectorLab";
import {
  SimulationsHub,
} from "@/features/simulations/SimulationExperience";
import { WorkdayTriageSimulation } from "@/features/simulations/WorkdayTriageSimulation";
import { RadarArticle, RadarHub } from "@/features/radar/RadarExperience";
import { TeamChallenge, TeamsHub } from "@/features/teams/TeamsExperience";
import { BankChangeChallenge } from "@/features/teams/BankChangeChallenge";
import { ArcadeGameDetail, ArcadeHub } from "@/features/arcade/ArcadeExperience";
import {
  ManagementAccessDenied,
  ManagementExperience,
} from "@/features/management/ManagementExperience";
import { GuidedTutorial } from "@/features/onboarding/GuidedTutorial";
import {
  ActivityFocusBar,
  PortalSidebar,
  PortalTopbar,
} from "@/features/ui/PortalChrome";
import {
  PortalIcon,
  type PortalIconName,
} from "@/features/ui/PortalIcons";
import {
  IllustratedMessage,
  LearningButton,
  Mascot,
  ProgressJourney,
} from "@/features/ui/LearningUI";
import { ActivityRouteState } from "@/features/activities/ActivityRouteState";
import { ActivityShell } from "@/features/activities/ActivityShell";
import { isActivityPlayerReady } from "@/features/activities/player-registry";
import { ActivityError } from "@/features/activities/primitives/ActivityError";
import { ActivityProgress } from "@/features/activities/primitives/ActivityProgress";
import { useActivityStageFocus } from "@/features/activities/useActivityStageFocus";
import {
  PORTAL_VIEW_ROUTES,
  resolvePortalRoute,
} from "@/lib/activities/registry";
import type { PortalViewKey } from "@/lib/activities/types";
import { useAppState } from "./providers";

type ViewKey = PortalViewKey;

type SectionBlock = {
  eyebrow: string;
  title: string;
  summary: string;
  marker: string;
};

type SectionContent = {
  badge: string;
  title: string;
  summary: string;
  purpose: string;
  blocks: SectionBlock[];
  flow: string[];
};

const viewLabels: Partial<Record<ViewKey, string>> = {
  inicio: "Visão geral",
  missoes: "Missões",
  simulacoes: "Simulações",
  laboratorio: "PhishLab",
  arcade: "Arcade",
  radar: "Radar",
  equipes: "Equipes",
  perfil: "Meu perfil",
  gestao: "Painel de gestão",
};

const sectionContent: Record<Exclude<ViewKey, "inicio" | "missao">, SectionContent> = {
  missoes: {
    badge: "Jornada contínua",
    title: "Missões que conectam aprendizagem e decisão",
    summary:
      "Aqui entram capítulos de uma jornada contínua. Cada missão apresenta uma situação, pede uma ação segura e mostra suas consequências.",
    purpose:
      "Transformar conceitos de phishing em decisões próximas da rotina, sem depender de aulas longas ou atividades isoladas.",
    blocks: [
      {
        eyebrow: "01 · Briefing",
        title: "Contexto da missão",
        summary:
          "Mostra o cenário, os personagens, o canal usado e o objetivo. Deve ser curto e deixar espaço para investigação.",
        marker: "B",
      },
      {
        eyebrow: "02 · Investigação",
        title: "Evidências disponíveis",
        summary:
          "Reúne remetente, links, histórico, anexos e pistas. O funcionário escolhe o que analisar antes de decidir.",
        marker: "I",
      },
      {
        eyebrow: "03 · Decisão",
        title: "Ação e justificativa",
        summary:
          "Permite verificar, reportar, excluir ou pedir apoio. A pontuação considera a justificativa, não só o acerto.",
        marker: "D",
      },
      {
        eyebrow: "04 · Debrief",
        title: "Consequência e revisão",
        summary:
          "Explica os sinais, mostra o efeito da escolha e agenda uma revisão futura em outro contexto.",
        marker: "R",
      },
    ],
    flow: ["Receber contexto", "Investigar", "Decidir", "Ver consequência"],
  },
  simulacoes: {
    badge: "Prática segura",
    title: "Uma caixa de entrada feita para aprender",
    summary:
      "Este módulo simula e-mail, mensagem, QR Code e outros contatos. Mensagens legítimas e fraudulentas aparecem misturadas para treinar decisões equilibradas.",
    purpose:
      "Praticar reconhecimento, verificação, reporte e recuperação em um ambiente controlado, sem links ou credenciais reais.",
    blocks: [
      {
        eyebrow: "Ambiente",
        title: "Caixa de entrada simulada",
        summary:
          "Lista mensagens, conversas e alertas fictícios com aparência próxima dos canais usados no dia a dia.",
        marker: "CX",
      },
      {
        eyebrow: "Ferramentas",
        title: "Inspeção antes do clique",
        summary:
          "Mostra remetente completo, destino do link, histórico e contexto para que o usuário reúna evidências.",
        marker: "FE",
      },
      {
        eyebrow: "Resposta",
        title: "Ações seguras",
        summary:
          "Inclui verificar por canal confiável, reportar, bloquear, excluir, liberar ou solicitar uma segunda análise.",
        marker: "AS",
      },
      {
        eyebrow: "Recuperação",
        title: "O aprendizado continua após o erro",
        summary:
          "Se houver um clique, abre uma sequência educativa de contenção, comunicação e recuperação da conta simulada.",
        marker: "RE",
      },
    ],
    flow: ["Abrir mensagem", "Inspecionar", "Agir", "Reportar ou recuperar"],
  },
  laboratorio: {
    badge: "Análise guiada",
    title: "PhishLab: uma bancada de investigação digital",
    summary:
      "Aqui ficam ferramentas e exercícios de análise mais detalhada. O foco é ensinar como encontrar evidências e não apenas memorizar sinais visuais.",
    purpose:
      "Aprofundar habilidades técnicas de forma acessível, com níveis que vão da comparação visual à reconstrução de incidentes.",
    blocks: [
      {
        eyebrow: "Domínios",
        title: "Analisador de endereços",
        summary:
          "Destaca domínio principal, subdomínio, caracteres semelhantes e destino de links em exemplos totalmente fictícios.",
        marker: "URL",
      },
      {
        eyebrow: "Interfaces",
        title: "Página espelho",
        summary:
          "Compara páginas legítimas e imitações, indicando o que deve ser verificado além do logotipo e das cores.",
        marker: "UI",
      },
      {
        eyebrow: "Arquivos",
        title: "QR Codes e anexos",
        summary:
          "Apresenta objetos inertes em uma área isolada para praticar inspeção e escolha do procedimento seguro.",
        marker: "QR",
      },
      {
        eyebrow: "Forense",
        title: "Linha do incidente",
        summary:
          "O funcionário organiza eventos, identifica o que foi exposto e define a ordem correta das ações de resposta.",
        marker: "LI",
      },
    ],
    flow: ["Selecionar ferramenta", "Examinar evidências", "Formar hipótese", "Concluir análise"],
  },
  arcade: {
    badge: "Catálogo independente",
    title: "Jogos organizados sem misturar projetos",
    summary:
      "O Arcade reúne jogos externos, leaderboards próprios e faixas permanentes de recompensa.",
    purpose:
      "Adicionar variedade e competição sem transformar velocidade ou repetição no principal indicador de aprendizagem.",
    blocks: [
      {
        eyebrow: "Catálogo",
        title: "Jogos por habilidade",
        summary:
          "Aqui aparecem Caça ao Domínio, Página Espelho, Linha do Incidente, QR Seguro e outros jogos futuros.",
        marker: "JG",
      },
      {
        eyebrow: "Competição",
        title: "Classificações por jogo",
        summary:
          "Classificações de melhor análise, maior evolução, colaboração e equipes. Nunca um ranking público de erros.",
        marker: "RK",
      },
      {
        eyebrow: "Integridade",
        title: "Regras contra repetição artificial",
        summary:
          "Primeira tentativa com valor integral, limite de pontos por jogo e multiplicador de dificuldade evitam farming.",
        marker: "RG",
      },
      {
        eyebrow: "Reconhecimento",
        title: "Conquistas com significado",
        summary:
          "Insígnias, títulos e personalizações devem representar competências demonstradas e contribuição coletiva.",
        marker: "CO",
      },
    ],
    flow: ["Escolher habilidade", "Jogar", "Receber feedback", "Evoluir domínio"],
  },
  radar: {
    badge: "Conteúdo vivo",
    title: "Radar de ameaças e biblioteca de referência",
    summary:
      "Esta área reúne alertas, fichas de técnicas e orientações rápidas. Todo exemplo deve ser higienizado e validado antes da publicação.",
    purpose:
      "Manter a plataforma atualizada e oferecer uma consulta confiável quando o funcionário encontrar algo suspeito.",
    blocks: [
      {
        eyebrow: "Destaque",
        title: "Alerta atual",
        summary:
          "Espaço para uma campanha relevante, seus principais sinais e o procedimento oficial de reporte.",
        marker: "AL",
      },
      {
        eyebrow: "Biblioteca",
        title: "Fichas de ameaças",
        summary:
          "Coleção pesquisável por canal, técnica de persuasão, objetivo do ataque e competência relacionada.",
        marker: "FI",
      },
      {
        eyebrow: "Contexto",
        title: "Casos gerais e corporativos",
        summary:
          "Combina exemplos comuns com uma parcela de situações adequadas às áreas de loja, logística, matriz e tecnologia.",
        marker: "CT",
      },
      {
        eyebrow: "Ação",
        title: "Como verificar e reportar",
        summary:
          "Cada ficha termina com uma ação clara e um atalho para o canal oficial de segurança da empresa.",
        marker: "AC",
      },
    ],
    flow: ["Receber alerta", "Entender técnica", "Consultar sinais", "Aplicar orientação"],
  },
  equipes: {
    badge: "Defesa coletiva",
    title: "Segurança se constrói em equipe",
    summary:
      "As atividades individuais contribuem para um escudo coletivo. Setores podem cumprir objetivos comuns e acompanhar sua própria evolução.",
    purpose:
      "Reforçar colaboração, comunicação e reporte, evitando que a gamificação dependa somente de competição individual.",
    blocks: [
      {
        eyebrow: "Objetivo",
        title: "Escudo coletivo",
        summary:
          "Indicador construído com participação, competências dominadas, colaboração e reportes corretos da equipe.",
        marker: "EC",
      },
      {
        eyebrow: "Operação",
        title: "Missões cooperativas",
        summary:
          "Distribuem papéis como triagem, investigação, verificação, comunicação e resposta ao incidente.",
        marker: "MC",
      },
      {
        eyebrow: "Comparação",
        title: "Ranking normalizado",
        summary:
          "Compara evolução proporcional e média por participante para não favorecer automaticamente equipes maiores.",
        marker: "RN",
      },
      {
        eyebrow: "Partilha",
        title: "Reconhecimento do grupo",
        summary:
          "Troféus coletivos, destaque por colaboração e escolha de temas futuros valorizam a ajuda entre colegas.",
        marker: "PT",
      },
    ],
    flow: ["Formar equipe", "Dividir papéis", "Resolver operação", "Fortalecer escudo"],
  },
  perfil: {
    badge: "Progresso individual",
    title: "Um perfil que mostra o que foi aprendido",
    summary:
      "Em vez de exibir apenas um nível genérico, o perfil apresenta domínio por competência, histórico, conquistas e revisões recomendadas.",
    purpose:
      "Dar visibilidade ao desenvolvimento real do funcionário e orientar a próxima atividade sem expor seus erros a outras pessoas.",
    blocks: [
      {
        eyebrow: "Mapa",
        title: "Árvore de competências",
        summary:
          "Mostra progresso em observar, investigar, verificar, decidir, reportar, recuperar e orientar.",
        marker: "AR",
      },
      {
        eyebrow: "Histórico",
        title: "Jornada de aprendizagem",
        summary:
          "Registra temporadas, trilhas concluídas e evolução ao longo do tempo, com resultados individuais privados.",
        marker: "HI",
      },
      {
        eyebrow: "Reconhecimento",
        title: "Insígnias e certificados",
        summary:
          "Representam capacidades demonstradas, como análise de links, reporte ou resposta a ataques multicanal.",
        marker: "CE",
      },
      {
        eyebrow: "Preferências",
        title: "Acessibilidade e privacidade",
        summary:
          "Concentra opções de contraste, ritmo, avisos, participação em rankings e informações sobre os dados utilizados.",
        marker: "PR",
      },
    ],
    flow: ["Ver domínio", "Identificar lacunas", "Receber revisão", "Comprovar evolução"],
  },
  gestao: {
    badge: "Segurança + Educação Corporativa",
    title: "Conteúdo, campanhas e indicadores em um só lugar",
    summary:
      "Esta visão representa o painel reservado a Segurança, Educação Corporativa e administradores. Ela não aparece para o funcionário comum.",
    purpose:
      "Permitir criação, revisão, publicação e avaliação contínua do programa, mantendo privacidade e governança.",
    blocks: [
      {
        eyebrow: "Autoria",
        title: "Estúdio de casos",
        summary:
          "Combina canal, contexto, manipulação, evidências, decisões e dificuldade para criar versões variadas de uma atividade.",
        marker: "AU",
      },
      {
        eyebrow: "Programação",
        title: "Temporadas e públicos",
        summary:
          "Agenda missões e direciona trilhas por competência ou área, com revisão antes de qualquer publicação.",
        marker: "TP",
      },
      {
        eyebrow: "Indicadores",
        title: "Painel agregado",
        summary:
          "Acompanha domínio, falsos positivos, reporte, recuperação e retenção sem criar listas públicas de falhas.",
        marker: "IN",
      },
      {
        eyebrow: "Governança",
        title: "Aprovação e auditoria",
        summary:
          "Fluxo entre Segurança, área pedagógica e Privacidade, com versões, permissões e prazo de retenção dos dados.",
        marker: "GO",
      },
    ],
    flow: ["Criar rascunho", "Revisar segurança", "Validar privacidade", "Publicar e medir"],
  },
};

const homeModules: Array<{
  key: "simulacoes" | "laboratorio" | "arcade" | "radar";
  label: string;
  title: string;
  summary: string;
  tone: string;
  icon: PortalIconName;
}> = [
  {
    key: "simulacoes",
    label: "Prática",
    title: "Simulações",
    summary: "Treine decisões em uma rotina segura e realista.",
    tone: "mint",
    icon: "simulations",
  },
  {
    key: "laboratorio",
    label: "Análise",
    title: "PhishLab",
    summary: "Investigue remetentes, links e outros sinais.",
    tone: "blue",
    icon: "laboratory",
  },
  {
    key: "arcade",
    label: "Jogos",
    title: "Arcade",
    summary: "Pratique rapidamente em desafios independentes.",
    tone: "yellow",
    icon: "arcade",
  },
  {
    key: "radar",
    label: "Referência",
    title: "Radar",
    summary: "Consulte explicações curtas sobre ameaças atuais.",
    tone: "coral",
    icon: "radar",
  },
];

const missionSteps = ["Briefing", "Investigar", "Decidir", "Resultado"];

const inboxMessages = [
  {
    id: "team",
    sender: "Equipe da loja",
    address: "equipe.loja@intranet.example",
    subject: "Agenda da reunião semanal",
    preview: "Confira os assuntos que serão tratados amanhã.",
  },
  {
    id: "security",
    sender: "Central de Acessos",
    address: "suporte@seguranca-contas.example",
    subject: "Ação necessária: sua conta será bloqueada hoje",
    preview: "Confirme seus dados nos próximos 30 minutos.",
  },
  {
    id: "learning",
    sender: "Universidade Corporativa",
    address: "universidade@aprendizagem.example",
    subject: "Inscrição confirmada",
    preview: "Sua participação no treinamento foi registrada.",
  },
];

const evidenceDetails: Record<
  EvidenceKey,
  { label: string; title: string; detail: string }
> = {
  sender: {
    label: "Ver remetente",
    title: "Domínio inesperado",
    detail:
      "O nome exibido parece corporativo, mas o endereço completo usa seguranca-contas.example, um domínio fictício externo ao portal esperado.",
  },
  link: {
    label: "Inspecionar botão",
    title: "Destino diferente",
    detail:
      "O botão aponta para login-colaborador.example/validar. A aparência do botão não comprova que o destino seja confiável.",
  },
  context: {
    label: "Checar contexto",
    title: "Solicitação sem confirmação",
    detail:
      "No cenário simulado, não existe manutenção agendada nem outro aviso sobre bloqueio de contas.",
  },
};

const decisionOptions: Array<{
  id: DecisionKey;
  title: string;
  detail: string;
}> = [
  {
    id: "reportar",
    title: "Reportar como suspeita",
    detail: "Encaminhar pelo canal oficial e aguardar a orientação de Segurança.",
  },
  {
    id: "verificar",
    title: "Verificar por um canal conhecido",
    detail: "Abrir o portal por um favorito ou contatar o suporte por um contato confiável.",
  },
  {
    id: "excluir",
    title: "Excluir sem reportar",
    detail: "Evitar a interação, mas não avisar a equipe de Segurança.",
  },
  {
    id: "abrir",
    title: "Abrir o link para conferir",
    detail: "Acessar o endereço recebido antes de decidir se a mensagem é confiável.",
  },
];

const reasonOptions: Array<{ id: ReasonKey; label: string }> = [
  {
    id: "domain",
    label: "O domínio do remetente não corresponde ao canal esperado.",
  },
  {
    id: "urgency",
    label: "A mensagem cria urgência para reduzir o tempo de análise.",
  },
  {
    id: "visual",
    label: "A presença de logotipo e assinatura comprova que a mensagem é legítima.",
  },
  {
    id: "destination",
    label: "O destino do botão é diferente do portal conhecido.",
  },
];

function HomeView({
  learnerName,
  onNavigate,
  onOpenRecommendation,
  sectorMetrics,
  teamContributionCounted,
  nextStep,
  recommendationMeta,
  learningPath,
  recentActivity,
  onOpenActivity,
  showTutorialInvitation,
  onOpenTutorial,
}: {
  learnerName: string;
  onNavigate: (view: ViewKey) => void;
  onOpenRecommendation: () => void;
  sectorMetrics: SectorMetrics;
  teamContributionCounted: boolean;
  nextStep: NextStepRecommendation;
  recommendationMeta: {
    estimatedMinutes: number;
    basePoints: number;
    statusLabel: string;
    areaLabel: string;
  };
  learningPath: LearningPathView;
  recentActivity: ProfileHistoryView[];
  onOpenActivity: (href: string) => void;
  showTutorialInvitation: boolean;
  onOpenTutorial: (opener: HTMLButtonElement) => void;
}) {
  const journeyProgress =
    learningPath.progressMax === 0
      ? 0
      : Math.round((learningPath.progressValue / learningPath.progressMax) * 100);
  const firstOpenStepIndex = learningPath.steps.findIndex(
    (step) => step.status !== "completed",
  );
  const pathWindowStart = Math.min(
    Math.max((firstOpenStepIndex < 0 ? learningPath.steps.length - 1 : firstOpenStepIndex) - 1, 0),
    Math.max(learningPath.steps.length - 4, 0),
  );
  const visiblePathSteps = learningPath.steps.slice(
    pathWindowStart,
    pathWindowStart + 4,
  );

  return (
    <div className="page-stack home-dashboard">
      {showTutorialInvitation ? (
        <aside className="tutorial-invitation" aria-labelledby="tutorial-invitation-title">
          <div>
            <span className="section-kicker">Conheça o portal</span>
            <h2 id="tutorial-invitation-title">Faça uma visita guiada de dois minutos</h2>
            <p>
              Veja onde começar, como acompanhar sua evolução e onde consultar as
              orientações de reporte. Você pode continuar usando o portal sem abrir
              o tutorial agora.
            </p>
          </div>
          <button
            type="button"
            className="primary-button dark"
            data-tour-start
            onClick={(event) => onOpenTutorial(event.currentTarget)}
          >
            Conhecer o portal
          </button>
        </aside>
      ) : null}

      <header className="home-overview-header">
        <p>Olá, {learnerName}.</p>
        <button type="button" className="text-button" onClick={() => onNavigate("missoes")}>
          Ver toda a jornada <span aria-hidden="true">→</span>
        </button>
      </header>

      <section className="home-learning-hero" data-tour="next-step" aria-labelledby="home-next-title">
        <div className="home-learning-hero__copy">
          <span className="home-learning-hero__meta">
            {recommendationMeta.areaLabel} · {recommendationMeta.estimatedMinutes} min
          </span>
          <h1 id="home-next-title">Tem algo estranho<br />nesta mensagem.</h1>
          <p className="home-learning-hero__title">{nextStep.title}</p>
          <p>Leia o aviso, descubra o que ele pede e escolha um caminho seguro.</p>
          <div className="home-learning-hero__actions">
            <LearningButton onClick={onOpenRecommendation}>
              {nextStep.actionLabel}
              <span aria-hidden="true">→</span>
            </LearningButton>
            {nextStep.journeyAlternative ? (
              <button
                type="button"
                className="text-button home-learning-hero__secondary"
                onClick={() => onNavigate("missoes")}
              >
                {nextStep.journeyAlternative.label}
              </button>
            ) : null}
          </div>
          <small>{recommendationMeta.basePoints} pontos · {recommendationMeta.statusLabel}</small>
        </div>
        <IllustratedMessage>
          <Mascot pose="thinking" size="medium" />
        </IllustratedMessage>
      </section>

      <section className="home-learning-status" aria-label="Seu progresso">
        <div className="home-learning-status__journey">
          <span>Jornada</span>
          <ProgressJourney
            current={learningPath.progressValue}
            total={learningPath.progressMax}
            label={learningPath.progressAssistiveLabel}
          />
        </div>
        <dl className="home-learning-status__facts">
          <div data-tour="team-summary">
            <dt>Escudo coletivo</dt>
            <dd>{sectorMetrics.score}</dd>
            <small>{sectorMetrics.shieldLevel}</small>
          </div>
          <div>
            <dt>Revisão</dt>
            <dd>{nextStep.kind === "adaptiveReview" ? "Praticar" : "Em dia"}</dd>
            <small>{teamContributionCounted ? "Contribuição computada" : "Privacidade preservada"}</small>
          </div>
          <div>
            <dt>Avanço</dt>
            <dd>{journeyProgress}%</dd>
            <small>{learningPath.completedLabel}</small>
          </div>
        </dl>
      </section>

      <section className="home-path-panel" aria-labelledby="home-path-title">
        <div className="panel-heading">
          <div>
            <span className="section-kicker">Seu caminho</span>
            <h2 id="home-path-title">{learningPath.title}</h2>
          </div>
          <span className="home-path-progress">{learningPath.completedLabel}</span>
        </div>
        <ol className="home-path-list">
          {visiblePathSteps.map((step) => (
            <li className={`home-path-step is-${step.status}`} key={step.id}>
              <span className="home-path-sequence" aria-hidden="true">
                {step.sequenceLabel}
              </span>
              <div>
                <small>{step.areaLabel}</small>
                <strong>{step.title}</strong>
                <span>{step.statusLabel}</span>
              </div>
              {!step.isActionDisabled ? (
                <button
                  type="button"
                  className="text-button"
                  onClick={() => onOpenActivity(step.href)}
                  aria-label={`${step.actionLabel}: ${step.title}`}
                >
                  Abrir <span aria-hidden="true">→</span>
                </button>
              ) : null}
            </li>
          ))}
        </ol>
      </section>

      <section className="home-activity-panel home-recent-panel" aria-labelledby="home-activity-title">
        <div className="panel-heading">
          <div>
            <span className="section-kicker">Retome rapidamente</span>
            <h2 id="home-activity-title">Atividade recente</h2>
          </div>
          {recentActivity.length > 0 ? (
            <button
              type="button"
              className="text-button"
              onClick={() => onOpenActivity("/perfil/historico")}
            >
              Ver histórico completo <span aria-hidden="true">→</span>
            </button>
          ) : null}
        </div>
        {recentActivity.length > 0 ? (
          <ol className="home-activity-list">
            {recentActivity.slice(0, 3).map((event) => (
              <li key={event.id}>
                <div className="home-activity-marker" aria-hidden="true" />
                <div className="home-activity-copy">
                  <span>{event.categoryLabel}</span>
                  <strong>{event.title}</strong>
                  <p>{event.detail}</p>
                  <small>{event.date}</small>
                </div>
                <button
                  type="button"
                  className="text-button"
                  onClick={() => onOpenActivity(event.href)}
                >
                  {event.actionLabel} <span aria-hidden="true">→</span>
                </button>
              </li>
            ))}
          </ol>
        ) : (
          <div className="home-activity-empty">
            <div aria-hidden="true">01</div>
            <div>
              <strong>Sua atividade aparecerá aqui</strong>
              <p>
                Conclua a primeira Missão para registrar seu progresso.
              </p>
            </div>
            <button
              type="button"
              className="primary-button dark"
              onClick={() => onNavigate("missoes")}
            >
              Iniciar primeira Missão
            </button>
          </div>
        )}
      </section>

      <section className="content-section">
        <div className="section-heading-row">
          <div>
            <span className="section-kicker">Explore</span>
            <h2>Pratique do seu jeito</h2>
          </div>
          <p>Quatro atalhos para praticar, investigar ou consultar.</p>
        </div>

        <div className="module-grid home-shortcut-grid">
          {homeModules.map((module) => (
            <button
              type="button"
              className={`module-card home-shortcut-card tone-${module.tone}`}
              key={module.key}
              onClick={() => onNavigate(module.key)}
            >
              <span className="home-shortcut-icon" aria-hidden="true">
                <PortalIcon name={module.icon} size={22} />
              </span>
              <span className="module-label">{module.label}</span>
              <span className="module-title">{module.title}</span>
              <span className="module-summary">{module.summary}</span>
              <span className="module-link">
                Abrir área <span aria-hidden="true">↗</span>
              </span>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}

function MissionView({
  existingResult,
  rewardAlreadyClaimed,
  claimedMissionPoints,
  onComplete,
  onNavigate,
}: {
  existingResult: MissionResult | null;
  rewardAlreadyClaimed: boolean;
  claimedMissionPoints: number;
  onComplete: (answer: MissionAnswer) => Promise<MissionResult>;
  onNavigate: (view: ViewKey) => void;
}) {
  const [stage, setStage] = useState(existingResult ? 3 : 0);
  const [selectedMessage, setSelectedMessage] = useState("security");
  const [inspectedEvidence, setInspectedEvidence] = useState<EvidenceKey[]>([]);
  const [decision, setDecision] = useState<DecisionKey | null>(null);
  const [selectedReasons, setSelectedReasons] = useState<ReasonKey[]>([]);
  const [displayResult, setDisplayResult] = useState<MissionResult | null>(existingResult);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState("");
  const [rewardGrantedInAttempt, setRewardGrantedInAttempt] = useState(false);
  const stageTitleRef = useActivityStageFocus(stage);

  const currentMessage =
    inboxMessages.find((message) => message.id === selectedMessage) ?? inboxMessages[1];

  const inspectEvidence = (key: EvidenceKey) => {
    setInspectedEvidence((current) =>
      current.includes(key) ? current : [...current, key],
    );
  };

  const toggleReason = (id: ReasonKey) => {
    setSelectedReasons((current) =>
      current.includes(id)
        ? current.filter((reason) => reason !== id)
        : [...current, id],
    );
  };

  const finishMission = async () => {
    if (!decision || selectedReasons.length === 0 || isSubmitting) return;

    setIsSubmitting(true);
    setSubmissionError("");
    const grantsFirstReward = !rewardAlreadyClaimed;

    try {
      const result = await onComplete({
        activityId: PILOT_MISSION_ID,
        activityVersion: PILOT_MISSION_VERSION,
        decision,
        inspectedEvidence,
        selectedReasonIds: selectedReasons,
      });

      setDisplayResult(result);
      setRewardGrantedInAttempt(grantsFirstReward);
      setStage(3);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setSubmissionError(
        "Não foi possível registrar a tentativa. Tente novamente.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetMission = () => {
    setStage(0);
    setSelectedMessage("security");
    setInspectedEvidence([]);
    setDecision(null);
    setSelectedReasons([]);
    setDisplayResult(null);
    setSubmissionError("");
    setIsSubmitting(false);
    setRewardGrantedInAttempt(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const displayedBonusPercentage = displayResult
    ? Math.round(calculatePerformanceBonus(displayResult.score) * 100)
    : 0;
  const displayedBonusPoints = displayResult
    ? displayResult.potentialReward - POINT_RULES.mainMission
    : 0;

  return (
    <ActivityShell
      className="page-stack mission-page"
      activityId={PILOT_MISSION_ID}
    >
      <section className="mission-shell">
        <header className="mission-header">
          <div>
            <span className="section-badge">Missão principal 01 · Jornada contínua</span>
            <h1>O aviso que não podia esperar</h1>
            <p>
              Uma solicitação urgente chegou à sua caixa de entrada. Investigue antes
              de escolher o que fazer.
            </p>
          </div>
          <div className="mission-meta" aria-label="Informações da missão">
            <span>Tempo estimado</span>
            <strong>6 minutos</strong>
            <small>Até 100 pontos de domínio</small>
          </div>
        </header>

        <ActivityProgress
          className="mission-stepper"
          steps={missionSteps}
          currentStep={stage}
          ariaLabel="Etapas da missão"
        />

        <div className="mission-content" aria-live="polite">
          {stage === 0 ? (
            <div className="mission-briefing">
              <div className="briefing-copy">
                <span className="section-kicker">Seu papel</span>
                <h2 ref={stageTitleRef} tabIndex={-1}>Proteja sua conta sem interromper o trabalho</h2>
                <p>
                  Você está iniciando o expediente quando recebe um aviso de bloqueio
                  da conta corporativa. Não há informação prévia sobre manutenção.
                  Sua tarefa é reunir evidências e definir uma resposta segura.
                </p>
                <div className="briefing-callout">
                  <span aria-hidden="true">!</span>
                  <p>
                    Tudo nesta missão é fictício. Nenhum link, endereço ou dado real
                    será utilizado.
                  </p>
                </div>
              </div>
              <div className="briefing-objectives">
                <span className="section-kicker">Objetivos avaliados</span>
                <ul>
                  <li><span>01</span> Inspecionar antes de agir</li>
                  <li><span>02</span> Reconhecer pressão e inconsistências</li>
                  <li><span>03</span> Escolher um canal seguro de resposta</li>
                </ul>
                <button type="button" className="primary-button dark" onClick={() => setStage(1)}>
                  Abrir caixa simulada
                </button>
              </div>
            </div>
          ) : null}

          {stage === 1 ? (
            <div className="simulation-workspace">
              <aside className="simulated-inbox" aria-label="Caixa de entrada simulada">
                <div className="inbox-heading">
                  <span>Caixa de entrada</span>
                  <strong>3 mensagens</strong>
                </div>
                {inboxMessages.map((message) => (
                  <button
                    type="button"
                    key={message.id}
                    className={selectedMessage === message.id ? "mail-row active" : "mail-row"}
                    onClick={() => setSelectedMessage(message.id)}
                    aria-pressed={selectedMessage === message.id}
                  >
                    <span className="mail-avatar" aria-hidden="true">
                      {message.sender.slice(0, 2).toUpperCase()}
                    </span>
                    <span>
                      <strong>{message.sender}</strong>
                      <b>{message.subject}</b>
                      <small>{message.preview}</small>
                    </span>
                  </button>
                ))}
              </aside>

              <article className="email-reader">
                <header>
                  <span className="simulation-label">Ambiente seguro · dados fictícios</span>
                  <h2 ref={stageTitleRef} tabIndex={-1}>{currentMessage.subject}</h2>
                  <p>
                    De: <strong>{currentMessage.sender}</strong>{" "}
                    <span>&lt;{currentMessage.address}&gt;</span>
                  </p>
                </header>

                {currentMessage.id === "security" ? (
                  <>
                    <div className="email-body">
                      <p>Olá, colaborador.</p>
                      <p>
                        Identificamos uma divergência em sua conta. Para evitar o
                        bloqueio ao final dos próximos <strong>30 minutos</strong>,
                        confirme seus dados no botão abaixo.
                      </p>
                      <button
                        type="button"
                        className="fake-email-link"
                        onClick={() => inspectEvidence("link")}
                      >
                        Confirmar conta
                      </button>
                      <p>Atenciosamente,<br />Central de Acessos</p>
                    </div>

                    <div className="evidence-tools">
                      <div>
                        <span className="section-kicker">Ferramentas de investigação</span>
                        <strong>{inspectedEvidence.length}/3 verificações realizadas</strong>
                      </div>
                      <div className="evidence-buttons">
                        {(Object.keys(evidenceDetails) as EvidenceKey[]).map((key) => (
                          <button
                            type="button"
                            key={key}
                            className={inspectedEvidence.includes(key) ? "inspected" : ""}
                            onClick={() => inspectEvidence(key)}
                            aria-pressed={inspectedEvidence.includes(key)}
                          >
                            {inspectedEvidence.includes(key) ? "✓ " : ""}
                            {evidenceDetails[key].label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {inspectedEvidence.length > 0 ? (
                      <div className="evidence-findings">
                        {inspectedEvidence.map((key) => (
                          <div key={key}>
                            <strong>{evidenceDetails[key].title}</strong>
                            <p>{evidenceDetails[key].detail}</p>
                          </div>
                        ))}
                      </div>
                    ) : null}
                  </>
                ) : (
                  <div className="email-body contextual-email">
                    <p>{currentMessage.preview}</p>
                    <p>
                      Esta mensagem faz parte do contexto da caixa simulada. Compare
                      diferentes mensagens e volte ao aviso urgente para concluir a
                      investigação principal.
                    </p>
                  </div>
                )}

                <div className="mission-navigation">
                  <button type="button" className="text-button" onClick={() => setStage(0)}>
                    ← Voltar ao briefing
                  </button>
                  <button
                    type="button"
                    className="primary-button dark"
                    onClick={() => setStage(2)}
                    disabled={inspectedEvidence.length < 2}
                  >
                    Tomar uma decisão
                  </button>
                </div>
                {inspectedEvidence.length < 2 ? (
                  <p className="mission-hint">Faça pelo menos duas verificações para avançar.</p>
                ) : null}
              </article>
            </div>
          ) : null}

          {stage === 2 ? (
            <div className="decision-stage">
              <div className="decision-heading">
                <span className="section-kicker">Sua resposta</span>
                <h2 ref={stageTitleRef} tabIndex={-1}>O que você faria com essa mensagem?</h2>
                <p>
                  Escolha a ação principal e depois indique quais evidências sustentam
                  sua decisão. A justificativa também faz parte da pontuação.
                </p>
              </div>

              <fieldset className="decision-options">
                <legend>Ação principal</legend>
                {decisionOptions.map((option) => (
                  <label key={option.id} className={decision === option.id ? "selected" : ""}>
                    <input
                      type="radio"
                      name="mission-decision"
                      value={option.id}
                      checked={decision === option.id}
                      onChange={() => setDecision(option.id)}
                    />
                    <span>
                      <strong>{option.title}</strong>
                      <small>{option.detail}</small>
                    </span>
                  </label>
                ))}
              </fieldset>

              <fieldset className="reason-options">
                <legend>Quais evidências influenciaram sua decisão?</legend>
                {reasonOptions.map((reason) => (
                  <label key={reason.id}>
                    <input
                      type="checkbox"
                      checked={selectedReasons.includes(reason.id)}
                      onChange={() => toggleReason(reason.id)}
                    />
                    <span>{reason.label}</span>
                  </label>
                ))}
              </fieldset>

              <div className="mission-navigation">
                <button type="button" className="text-button" onClick={() => setStage(1)}>
                  ← Rever evidências
                </button>
                <button
                  type="button"
                  className="primary-button dark"
                  onClick={finishMission}
                  disabled={!decision || selectedReasons.length === 0 || isSubmitting}
                >
                  {isSubmitting ? "Registrando tentativa..." : "Confirmar decisão"}
                </button>
              </div>
              <ActivityError
                className="mission-hint"
                message={submissionError}
              />
            </div>
          ) : null}

          {stage === 3 && displayResult ? (
            <div className="result-stage">
              <div className={displayResult.needsReview ? "result-summary review" : "result-summary success"}>
                <div className="result-score">
                  <span>Resultado</span>
                  <strong>{displayResult.score}</strong>
                  <small>de 100 pontos</small>
                </div>
                <div>
                  <span className="section-kicker">
                    {displayResult.needsReview ? "Reforço recomendado" : "Defesa concluída"}
                  </span>
                  <h2 ref={stageTitleRef} tabIndex={-1}>
                    {displayResult.needsReview
                      ? "Você avançou e já tem um próximo passo"
                      : "Boa análise: sua decisão protegeu mais pessoas"}
                  </h2>
                  <p>
                    {displayResult.needsReview
                      ? "A plataforma identificou pontos que podem ser treinados novamente com uma investigação guiada, sem expor o resultado a outros funcionários."
                      : "Você reuniu evidências suficientes e escolheu uma resposta segura. O aprendizado foi registrado no seu perfil."}
                  </p>
                </div>
              </div>

              <div className="result-grid">
                <article>
                  <span>Decisão</span>
                  <strong>
                    {decisionOptions.find((option) => option.id === displayResult.decision)?.title}
                  </strong>
                  <p>Reportar ou verificar por um canal conhecido reduz o risco e ajuda a proteger outras pessoas.</p>
                </article>
                <article>
                  <span>Investigação</span>
                  <strong>{displayResult.inspected}/3 verificações</strong>
                  <p>Remetente, destino do link e contexto formam uma análise mais confiável quando usados em conjunto.</p>
                </article>
                <article>
                  <span>Escudo da equipe</span>
                    <strong>
                      {displayResult.teamPoints > 0
                        ? `+${displayResult.teamPoints} pontos`
                        : "Contribuição já registrada"}
                    </strong>
                  <p>A contribuição coletiva valoriza comportamento seguro, aprendizagem e reporte — nunca a exposição de erros.</p>
                </article>
                <article className="reward-result-card">
                  <span>Pontos gerais</span>
                  <strong>
                    {rewardGrantedInAttempt
                      ? `+${displayResult.potentialReward} pontos`
                      : `${claimedMissionPoints} pontos registrados`}
                  </strong>
                  <p>
                    {rewardGrantedInAttempt
                      ? `Base de ${POINT_RULES.mainMission} + bônus de ${displayedBonusPercentage}% (${displayedBonusPoints} pontos).`
                      : "A recompensa da primeira conclusão já foi concedida; repetições não duplicam pontos."}
                  </p>
                </article>
              </div>

              <div className="learning-debrief">
                <span className="section-kicker">Por que era suspeita?</span>
                <h2>Evidências são mais importantes do que aparência</h2>
                <p>
                  O domínio inesperado, o destino diferente e a urgência artificial
                  eram os sinais decisivos. Logotipo, assinatura e tom corporativo
                  podem ser copiados e, sozinhos, não comprovam legitimidade.
                </p>
              </div>

              <div className="result-unlock-panel">
                <div>
                  <span className="section-kicker">Jornada atualizada</span>
                  <h2>Missão 02 desbloqueada</h2>
                  <p>
                    A conclusão liberou Entrega por QR Code. A nota define apenas
                    a recomendação de reforço e nunca bloqueia a próxima Missão.
                  </p>
                </div>
                <button
                  type="button"
                  className="primary-button dark"
                  onClick={() => onNavigate("missoes")}
                >
                  Ver jornada de Missões
                </button>
              </div>

              <div className="result-actions">
                <button
                  type="button"
                  className="primary-button dark"
                  onClick={() => onNavigate(displayResult.needsReview ? "laboratorio" : "missoes")}
                >
                  {displayResult.needsReview ? "Reforçar no PhishLab" : "Ver próxima Missão"}
                </button>
                <button type="button" className="text-button" onClick={() => onNavigate("perfil")}>
                  Ver meu perfil <span aria-hidden="true">→</span>
                </button>
                <button type="button" className="text-button" onClick={resetMission}>
                  Refazer missão
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </section>

      <section className="mission-connection">
        <span className="section-kicker">Jornada conectada</span>
        <p>
          A missão apresenta o contexto; a simulação mede a decisão; o resultado
          define a próxima prática e atualiza o perfil e o escudo da equipe.
        </p>
      </section>
    </ActivityShell>
  );
}

function SectionView({
  content,
  onNavigate,
  extra,
}: {
  content: SectionContent;
  onNavigate: (view: ViewKey) => void;
  extra?: ReactNode;
}) {
  return (
    <div className="page-stack section-view">
      <section className="section-hero">
        <div>
          <span className="section-badge">{content.badge}</span>
          <h1>{content.title}</h1>
          <p>{content.summary}</p>
        </div>
        <div className="purpose-card">
          <span>Objetivo desta área</span>
          <p>{content.purpose}</p>
        </div>
      </section>

      {extra}

      <section className="content-section compact">
        <div className="section-heading-row">
          <div>
            <span className="section-kicker">Conteúdo previsto</span>
            <h2>O que deverá existir aqui</h2>
          </div>
          <p>
            Cada bloco descreve a função da área. O conteúdo educativo definitivo
            será produzido e validado posteriormente.
          </p>
        </div>
        <div className="blueprint-grid">
          {content.blocks.map((block) => (
            <article className="blueprint-card" key={block.title}>
              <div className="blueprint-marker" aria-hidden="true">
                {block.marker}
              </div>
              <span>{block.eyebrow}</span>
              <h3>{block.title}</h3>
              <p>{block.summary}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="flow-panel">
        <div className="flow-heading">
          <span className="section-kicker">Fluxo principal</span>
          <h2>Como o funcionário percorrerá esta área</h2>
        </div>
        <ol className="flow-steps">
          {content.flow.map((step, index) => (
            <li key={step}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{step}</strong>
            </li>
          ))}
        </ol>
      </section>

      <section className="next-panel">
        <div>
          <span className="section-kicker">Integração da jornada</span>
          <h2>Nenhum módulo funciona isoladamente</h2>
          <p>
            Os resultados alimentam o perfil de competências, a proteção da equipe
            e a próxima revisão sugerida pela plataforma.
          </p>
        </div>
        <div className="next-actions">
          <button
            type="button"
            className="primary-button dark"
            onClick={() => onNavigate("inicio")}
          >
            Voltar à visão geral
          </button>
        </div>
      </section>
    </div>
  );
}

function formatProfileDate(value: string): string {
  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
    timeZone: "America/Sao_Paulo",
  }).format(new Date(value));
}

function toActivityView(item: ActivityTimelineItem): ProfileHistoryView {
  return {
    id: item.id,
    kind: item.kind,
    categoryLabel: item.categoryLabel,
    title: item.title,
    detail: item.detail,
    date: formatProfileDate(item.createdAt),
    href: item.href,
    actionLabel: item.actionLabel,
  };
}

export default function Home() {
  const router = useRouter();
  const pathname = usePathname();
  const {
    state,
    isHydrated,
    account,
    isAuthLoading,
    authenticationError,
    localSecurityNotice,
    persistenceError,
    logout,
    submitMission,
    submitPhishingFoundationV2,
    submitConversationReconstructionV2,
    submitMfaConsoleV2,
    submitRecoveryBuilderV2,
    submitDomainAnalyzerV2,
    submitTrueSenderV2,
    submitWorkdayTriageV2,
    submitRadar,
    submitTeamChallenge,
    submitBankProcessV2,
    savePreferences,
    startTutorial,
    setTutorialStep,
    completeTutorial,
    resetDemo,
  } = useAppState();
  const [notice, setNotice] = useState("");
  const [tutorialReplayOpen, setTutorialReplayOpen] = useState(false);
  const [preferencePreview, setPreferencePreview] =
    useState<LearnerPreferences | null>(null);
  const tutorialOpenerRef = useRef<HTMLButtonElement | null>(null);
  const mainContentRef = useRef<HTMLElement | null>(null);
  const previousPathnameRef = useRef(pathname);
  const routeResolution = useMemo(
    () => resolvePortalRoute(pathname ?? "/"),
    [pathname],
  );
  const activeView = routeResolution.view;
  const playerKey = routeResolution.playerKey;
  const isPhishingFoundationMission =
    playerKey === "phishing-foundation-mission";
  const isCompromisedConversationMission =
    playerKey === "compromised-conversation-mission";
  const isMfaFatigueMission = playerKey === "mfa-fatigue-mission";
  const isRecoveryMission = playerKey === "recovery-mission";
  const isLinkAnalyzer = playerKey === "link-analyzer";
  const isSenderInspector = playerKey === "sender-inspector";
  const isWorkdaySimulation = playerKey === "workday-simulation";
  const isTeamChallenge = playerKey === "secure-inbox-team-challenge";
  const isBankChangeChallenge =
    playerKey === "bank-change-team-challenge";
  const arcadeGame = useMemo(() => {
    if (!pathname?.startsWith("/arcade/")) return null;
    return findArcadeGameBySlug(pathname.split("/").filter(Boolean)[1] ?? "");
  }, [pathname]);
  const radarArticle = useMemo(() => {
    if (!pathname?.startsWith("/radar/")) return null;
    const article = findRadarArticleBySlug(
      pathname.split("/").filter(Boolean)[1] ?? "",
    );
    return article?.status === "available" ? article : null;
  }, [pathname]);
  const routeNeedsExplicitState =
    routeResolution.kind === "planned" ||
    routeResolution.kind === "unknown" ||
    (routeResolution.kind === "activity" &&
      !isActivityPlayerReady(routeResolution.playerKey));
  const tutorial = state.onboarding.tutorial;
  const requiredTutorialActive =
    isHydrated &&
    (tutorial.status === "required" || tutorial.status === "inProgress");
  const requiredTutorialOpen = requiredTutorialActive && pathname === "/";
  const guidedTutorialOpen = requiredTutorialOpen || tutorialReplayOpen;
  const modalOpen = guidedTutorialOpen;
  const authenticationPending = isAuthLoading || !account;

  useEffect(() => {
    if (isAuthLoading || account || pathname === "/login") return;
    const returnTo = pathname && pathname !== "/" ? pathname : "/";
    router.replace(`/login?returnTo=${encodeURIComponent(returnTo)}`);
  }, [account, isAuthLoading, pathname, router]);

  useEffect(() => {
    if (requiredTutorialActive && pathname !== "/") {
      router.replace("/");
    }
  }, [pathname, requiredTutorialActive, router]);

  useEffect(() => {
    if (previousPathnameRef.current === pathname) return;
    previousPathnameRef.current = pathname;
    const frame = window.requestAnimationFrame(() => {
      mainContentRef.current?.focus({ preventScroll: true });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [pathname]);
  const missionResult = useMemo(
    () => selectLatestMissionResult(state),
    [state],
  );
  const phishingFoundationResult = useMemo(
    () => selectLatestPhishingFoundationResult(state),
    [state],
  );
  const phishingFoundationPackageId = useMemo(
    () => selectLatestPhishingFoundationPackageId(state),
    [state],
  );
  const journeyMissionResult = phishingFoundationResult ?? missionResult;
  const compromisedConversationResult = useMemo(
    () => selectLatestConversationReconstructionResult(state),
    [state],
  );
  const compromisedConversationPackageId = useMemo(
    () => selectLatestConversationReconstructionPackageId(state),
    [state],
  );
  const mfaFatigueResult = useMemo(
    () => selectLatestMfaConsoleResult(state),
    [state],
  );
  const mfaConsolePackageId = useMemo(
    () => selectLatestMfaConsolePackageId(state),
    [state],
  );
  const mfaConsoleSubmission = useMemo(
    () => selectLatestMfaConsoleSubmission(state),
    [state],
  );
  const recoveryMissionResult = useMemo(
    () => selectLatestRecoveryMissionResult(state),
    [state],
  );
  const recoveryBuilderPackageId = useMemo(
    () => selectLatestRecoveryBuilderPackageId(state),
    [state],
  );
  const recoveryBuilderSubmission = useMemo(
    () => selectLatestRecoveryBuilderSubmission(state),
    [state],
  );
  const phishLabResult = useMemo(
    () => selectLatestDomainAnalyzerResult(state),
    [state],
  );
  const domainAnalyzerPackageId = useMemo(
    () => selectLatestDomainAnalyzerPackageId(state),
    [state],
  );
  const senderInspectorResult = useMemo(
    () => selectLatestTrueSenderResult(state),
    [state],
  );
  const senderInspectorPackageId = useMemo(
    () => selectLatestTrueSenderPackageId(state),
    [state],
  );
  const simulationResult = useMemo(
    () => selectLatestSimulationResult(state),
    [state],
  );
  const workdayTriageAttempt = useMemo(
    () => selectLatestWorkdayTriageV2Attempt(state),
    [state],
  );
  const completedRadarIds = useMemo(
    () => selectCompletedRadarIds(state),
    [state],
  );
  const teamChallengeAttempt = useMemo(
    () => selectLatestTeamChallengeAttempt(state),
    [state],
  );
  const teamChallengeResult = useMemo(
    () => selectLatestTeamChallengeResult(state),
    [state],
  );
  const sectorMetrics = useMemo(() => selectSectorMetrics(state), [state]);
  const sectorRanking = useMemo(() => selectSectorRanking(state), [state]);
  const teamChallengeContribution = useMemo(
    () => selectTeamChallengeContribution(state),
    [state],
  );
  const bankChangeAttempt = useMemo(
    () => selectLatestBankChangeAttempt(state),
    [state],
  );
  const bankChangeResult = useMemo(
    () => selectLatestBankChangeResult(state),
    [state],
  );
  const bankChangeContribution = useMemo(
    () => selectBankChangeContribution(state),
    [state],
  );
  const bankProcessAttempt = useMemo(
    () => selectLatestBankProcessV2Attempt(state),
    [state],
  );
  const bankProcessResult = useMemo(
    () => selectLatestBankProcessV2Result(state),
    [state],
  );
  const totalPoints = useMemo(() => selectTotalPoints(state), [state]);
  const learnerSector = useMemo(() => selectLearnerSector(state), [state]);
  const currentLevel = useMemo(() => selectCurrentLevel(state), [state]);
  const teamShield = useMemo(() => selectTeamShield(state), [state]);
  const mainJourney = useMemo(() => selectMainJourney(state), [state]);
  const nextStep = useMemo(() => selectNextStep(state), [state]);
  const levelProgress = useMemo(() => selectLevelProgress(state), [state]);
  const competencyOverview = useMemo(
    () => selectCompetencyOverview(state),
    [state],
  );
  const activeReview = useMemo(() => selectActiveReview(state), [state]);
  const missionRewardBreakdown = useMemo(
    () => selectLatestMissionRewardBreakdown(state),
    [state],
  );
  const activityTimeline = useMemo(
    () => selectActivityTimeline(state),
    [state],
  );
  const recentActivity = useMemo(
    () => selectRecentActivity(state).map(toActivityView),
    [state],
  );
  const pointOrigins = useMemo(() => selectPointOrigins(state), [state]);
  const achievements = useMemo(() => selectAchievements(state), [state]);
  const bestMission = useMemo(() => selectBestMissionSummary(state), [state]);
  const senderLabCompleted =
    state.learning.activityProgress[SENDER_INSPECTOR_ACTIVITY_ID]?.status ===
    "completed";
  const domainLabCompleted =
    state.learning.activityProgress[PHISHLAB_ACTIVITY_ID]?.status ===
    "completed";
  const missionRewardClaim = useMemo(
    () =>
      Object.values(state.learning.rewardClaims).find(
        (claim) => claim.sourceId === PILOT_MISSION_ID,
      ) ?? null,
    [state.learning.rewardClaims],
  );
  const compromisedConversationRewardClaim = useMemo(
    () =>
      Object.values(state.learning.rewardClaims).find(
        (claim) => claim.sourceId === COMPROMISED_CONVERSATION_MISSION_ID,
      ) ?? null,
    [state.learning.rewardClaims],
  );
  const mfaFatigueRewardClaim = useMemo(
    () =>
      Object.values(state.learning.rewardClaims).find(
        (claim) => claim.sourceId === MFA_FATIGUE_MISSION_ID,
      ) ?? null,
    [state.learning.rewardClaims],
  );
  const recoveryMissionRewardClaim = useMemo(
    () =>
      Object.values(state.learning.rewardClaims).find(
        (claim) => claim.sourceId === RECOVERY_MISSION_ID,
      ) ?? null,
    [state.learning.rewardClaims],
  );
  const phishLabRewardClaim = useMemo(
    () =>
      Object.values(state.learning.rewardClaims).find(
        (claim) => claim.sourceId === PHISHLAB_ACTIVITY_ID,
      ) ?? null,
    [state.learning.rewardClaims],
  );
  const senderInspectorRewardClaim = useMemo(
    () =>
      Object.values(state.learning.rewardClaims).find(
        (claim) => claim.sourceId === SENDER_INSPECTOR_ACTIVITY_ID,
      ) ?? null,
    [state.learning.rewardClaims],
  );
  const simulationRewardClaim = useMemo(
    () =>
      Object.values(state.learning.rewardClaims).find(
        (claim) => claim.sourceId === SIMULATION_ACTIVITY_ID,
      ) ?? null,
    [state.learning.rewardClaims],
  );
  const radarRewardClaim = useMemo(
    () =>
      Object.values(state.learning.rewardClaims).find(
        (claim) => claim.sourceId === RADAR_ACTIVITY_ID,
      ) ?? null,
    [state.learning.rewardClaims],
  );
  const teamChallengeRewardClaim = useMemo(
    () =>
      Object.values(state.learning.rewardClaims).find(
        (claim) => claim.sourceId === TEAM_CHALLENGE_ACTIVITY_ID,
      ) ?? null,
    [state.learning.rewardClaims],
  );
  const bankChangeRewardClaim = useMemo(
    () =>
      Object.values(state.learning.rewardClaims).find(
        (claim) => claim.sourceId === BANK_CHANGE_ACTIVITY_ID,
      ) ?? null,
    [state.learning.rewardClaims],
  );
  const radarPoints = useMemo(
    () =>
      state.learning.pointLedger.reduce(
        (total, entry) =>
          entry.category === "radar" && entry.status === "confirmed"
            ? total + entry.points
            : total,
        0,
      ),
    [state.learning.pointLedger],
  );

  const learningPath = useMemo<LearningPathView>(() => {
    const completedActivityIds = new Set<string>();
    const inProgressActivityIds = new Set<string>();

    Object.values(state.learning.activityProgress).forEach((activity) => {
      if (activity.status === "completed") {
        completedActivityIds.add(activity.activityId);
      } else if (activity.status === "inProgress") {
        inProgressActivityIds.add(activity.activityId);
      }
    });

    const competencyLabels = new Map(
      competencyOverview.map((competency) => [competency.id, competency.label]),
    );
    const presentationStatusLabels: Record<
      ReturnType<typeof getCurriculumPresentation>[number]["presentationStatus"],
      string
    > = {
      available: "Disponível",
      inProgress: "Em andamento",
      completed: "Concluída",
      locked: "Aguardando pré-requisitos",
      planned: "Em produção",
    };
    const areaLabels = {
      mission: "Missão",
      phishlab: "PhishLab",
      simulation: "Simulação",
      team: "Equipes",
    } as const;

    const steps = getCurriculumPresentation(
      completedActivityIds,
      inProgressActivityIds,
    ).map((step) => {
      const status: LearningPathStepStatus =
        step.presentationStatus === "inProgress"
          ? "in_progress"
          : step.presentationStatus;
      const radarTitles = FIRST_LEARNING_PATH.optionalRadar
        .filter((article) =>
          step.relatedRadarActivityIds.includes(article.activityId),
        )
        .map((article) => article.title);
      const competencyLabel = step.competencyFocus
        .slice(0, 2)
        .map((competencyId) => competencyLabels.get(competencyId) ?? competencyId)
        .join(" · ");

      return {
        id: step.id,
        sequenceLabel: String(step.order).padStart(2, "0"),
        areaLabel: areaLabels[step.area],
        title: step.title,
        summary: step.summary,
        status,
        statusLabel: presentationStatusLabels[step.presentationStatus],
        metaLabel: `${step.estimatedMinutes} min · ${step.basePoints} pontos-base · ${competencyLabel}`,
        actionLabel:
          status === "planned"
            ? "Conteúdo em produção"
            : status === "locked"
              ? "Conclua os PhishLabs"
              : status === "completed"
                ? "Ver ou refazer"
                : status === "in_progress"
                  ? "Continuar atividade"
                  : "Abrir atividade",
        href: step.route,
        relatedRadarLabel:
          radarTitles.length > 0
            ? `Radar opcional: ${radarTitles.join(" · ")}`
            : undefined,
        isActionDisabled: status === "planned" || status === "locked",
      };
    });
    const completedSteps = steps.filter((step) => step.status === "completed").length;

    return {
      title: FIRST_LEARNING_PATH.title,
      summary:
        `${FIRST_LEARNING_PATH.summary} A ordem é recomendada; itens em produção não registram progresso nem pontos.`,
      completedLabel: `${completedSteps}/${steps.length} concluídas`,
      progressValue: completedSteps,
      progressMax: steps.length,
      progressAssistiveLabel: `${completedSteps} de ${steps.length} atividades do percurso concluídas`,
      principleSteps: ["Pare", "Avalie", "Reconfirme", "Escale e responda"],
      steps,
      radarTitle: "Radar opcional, com pontos",
      radarSummary:
        "Os conteúdos do Radar ajudam a aprofundar os temas, mas nunca liberam nem bloqueiam uma etapa. Cada atividade prática traz o conhecimento indispensável dentro do próprio fluxo.",
      radarRewardLabel: `+${POINT_RULES.radar} pontos na primeira conclusão correta de cada conteúdo`,
      radarActionLabel: "Explorar Radar",
    };
  }, [competencyOverview, state.learning.activityProgress]);

  const missionItems = useMemo<MainMissionItem[]>(() => {
    const competencyLabels = new Map(
      competencyOverview.map((competency) => [competency.id, competency.label]),
    );
    const statusLabels: Record<MissionJourneyStatus, string> = {
      available: "Disponível",
      in_progress: "Em andamento",
      completed: "Concluída",
      locked: "Bloqueada",
    };

    return mainJourney.map((mission) => {
      const status: MissionJourneyStatus =
        mission.status === "inProgress" ? "in_progress" : mission.status;
      const focus = mission.competencyFocus
        .map((competency) => competencyLabels.get(competency) ?? competency)
        .slice(0, 2)
        .join(" · ");

      return {
        id: mission.id,
        sequenceLabel: String(mission.order).padStart(2, "0"),
        title: mission.title,
        summary: mission.summary,
        status,
        statusLabel: statusLabels[status],
        metaLabel: `${mission.estimatedMinutes} min · ${focus}`,
        actionLabel:
          mission.id === PILOT_MISSION_ID
            ? status === "completed"
              ? "Ver resultado ou refazer"
              : "Iniciar Missão"
            : status === "locked"
              ? "Conclua a etapa anterior"
              : "Conteúdo em produção",
        isPilot: mission.id === PILOT_MISSION_ID,
        isActionDisabled: !mission.playableInMvp,
      };
    });
  }, [competencyOverview, mainJourney]);

  const secondaryMissionItems = useMemo<SecondaryMissionItem[]>(
    () => [
      {
        id: SENDER_INSPECTOR_ACTIVITY_ID,
        categoryLabel: "PhishLab",
        title: "Quem enviou de verdade?",
        summary:
          "Prática guiada para separar nome exibido, endereço, Reply-To e contexto.",
        rewardLabel: senderInspectorRewardClaim
          ? `${senderInspectorRewardClaim.points} pontos confirmados`
          : "60 pontos-base",
        statusLabel:
          activeReview?.targetActivityId === SENDER_INSPECTOR_ACTIVITY_ID
            ? "Recomendado"
            : senderInspectorResult
              ? "Concluído"
              : "Opcional",
        actionLabel: senderInspectorResult ? "Ver ou refazer" : "Ver atividade",
        isAvailable: true,
      },
      {
        id: "phishlab:link-analyzer",
        categoryLabel: "PhishLab",
        title: "Domínio sob a lupa",
        summary:
          "Prática guiada para separar domínio, subdomínio e destino real.",
        rewardLabel: phishLabRewardClaim
          ? `${phishLabRewardClaim.points} pontos confirmados`
          : "60 pontos-base",
        statusLabel:
          activeReview?.targetActivityId === PHISHLAB_ACTIVITY_ID
            ? "Recomendado"
            : phishLabResult
              ? "Concluído"
              : "Opcional",
        actionLabel: phishLabResult ? "Ver ou refazer" : "Ver atividade",
        isAvailable: true,
      },
      {
        id: "arcade:overlooked",
        categoryLabel: "Arcade",
        title: "Overlooked",
        summary:
          "Jogo cooperativo para reconhecer phishing e processar solicitações legítimas.",
        rewardLabel: "Ranking próprio · até 155 pontos",
        statusLabel: journeyMissionResult ? "Disponível" : "Após a Missão 01",
        actionLabel: journeyMissionResult ? "Jogar" : "Ainda bloqueada",
        isAvailable: Boolean(journeyMissionResult),
      },
    ],
    [
      activeReview,
      journeyMissionResult,
      phishLabResult,
      phishLabRewardClaim,
      senderInspectorResult,
      senderInspectorRewardClaim,
    ],
  );

  const profileModel = useMemo<ProfileViewModel>(
    () => ({
      learnerName: account?.name ?? state.demo.learner.name,
      location: account?.sectorName ?? learnerSector.name,
      totalPoints,
      levelLabel: levelProgress.currentLevel.label,
      levelProgress: levelProgress.progressPercentage,
      pointsToNextLevel: levelProgress.pointsToNextLevel,
      journeyCompleted: learningPath.progressValue,
      journeyTotal: learningPath.progressMax,
      journeyProgress: Math.round(
        (learningPath.progressValue / Math.max(learningPath.progressMax, 1)) * 100,
      ),
      bestMissionScore: bestMission?.score ?? null,
      bestMissionTitle: bestMission?.title ?? null,
      arcadeSummary: {
        gamesPlayed: 0,
        points: 0,
        bestPosition: null,
        catalogStatus: "1 jogo pronto para integração",
      },
      competencies: competencyOverview.map((competency) => ({
        id: competency.id,
        label: competency.label,
        score: competency.score,
        level: competency.levelLabel,
        evidence:
          competency.score === null
            ? `${competency.summary} Nenhuma evidência registrada ainda.`
            : `${competency.evidenceCount} ${competency.evidenceCount === 1 ? "evidência registrada" : "evidências registradas"}. Melhor resultado: ${competency.score}/100.`,
      })),
      achievements: achievements.map((achievement) => ({
        ...achievement,
        unlockedAt: achievement.unlockedAt
          ? formatProfileDate(achievement.unlockedAt)
          : null,
      })),
      review: activeReview
        ? {
            title:
              activeReview.targetActivityId === SIMULATION_ACTIVITY_ID
                ? "Aplicar a análise em contexto"
                : activeReview.targetActivityId === RECOVERY_MISSION_ID
                  ? "Revisar resposta ao incidente"
                : activeReview.targetActivityId === BANK_CHANGE_ACTIVITY_ID
                  ? "Revisar alteração bancária"
                : activeReview.targetActivityId ===
                    SENDER_INSPECTOR_ACTIVITY_ID
                  ? "Confirmar a identidade fora da aparência"
                  : "Reforçar análise de links",
            reason: activeReview.reason,
            targetLabel:
              activeReview.targetActivityId === SIMULATION_ACTIVITY_ID
                ? "Abrir Simulação"
                : activeReview.targetActivityId === RECOVERY_MISSION_ID
                  ? "Rever Missão"
                : activeReview.targetActivityId === BANK_CHANGE_ACTIVITY_ID
                  ? "Rever desafio"
                : "Abrir PhishLab",
          }
        : null,
      history: activityTimeline.map(toActivityView),
      pointSources: pointOrigins.map((origin) => ({
        id: origin.id,
        label: `${origin.sourceLabel} · ${origin.categoryLabel}`,
        points: origin.points,
        status: origin.status,
      })),
      teamName: learnerSector.name,
      teamShield,
      teamContributionStatus: bankChangeContribution ?? teamChallengeContribution
        ? {
            label: "Registrada",
            detail: `${(bankChangeContribution ?? teamChallengeContribution)!.correctDecisions} de ${(bankChangeContribution ?? teamChallengeContribution)!.totalDecisions} decisões entraram somente nos agregados do setor.`,
          }
        : {
            label: "Pendente",
            detail:
              "Conclua Mudança bancária sem atalho para registrar sua primeira contribuição agregada.",
          },
    }),
    [
      activeReview,
      account?.name,
      account?.sectorName,
      achievements,
      bestMission,
      competencyOverview,
      learningPath,
      activityTimeline,
      levelProgress,
      learnerSector.name,
      pointOrigins,
      bankChangeContribution,
      teamChallengeContribution,
      state.demo.learner,
      teamShield,
      totalPoints,
    ],
  );

  const currentLabel = useMemo(
    () =>
      activeView === "missao"
        ? isCompromisedConversationMission
          ? "Missão · A conversa já estava acontecendo"
          : isMfaFatigueMission
            ? "Missão · Você iniciou este acesso?"
            : isRecoveryMission
              ? "Missão · Cliquei. E agora?"
          : "Missão · O aviso que não podia esperar"
        : isSenderInspector
          ? "PhishLab · Quem enviou de verdade?"
        : isLinkAnalyzer
          ? "PhishLab · Domínio sob a lupa"
          : isWorkdaySimulation
            ? "Simulação · Uma manhã comum"
          : arcadeGame
            ? `Arcade · ${arcadeGame.title}`
          : radarArticle
            ? `Radar · ${radarArticle.title}`
          : isBankChangeChallenge
            ? "Equipes · Mudança bancária sem atalho"
          : isTeamChallenge
            ? "Equipes · Caixa de Entrada Segura"
        : viewLabels[activeView] ?? "Visão geral",
    [
      activeView,
      arcadeGame,
      isCompromisedConversationMission,
      isMfaFatigueMission,
      isRecoveryMission,
      isLinkAnalyzer,
      isSenderInspector,
      isBankChangeChallenge,
      isTeamChallenge,
      isWorkdaySimulation,
      radarArticle,
    ],
  );

  const effectivePreferences =
    activeView === "perfil" && preferencePreview
      ? preferencePreview
      : state.preferences;
  const isFocusMode = routeResolution.kind === "activity";
  const recommendationDefinition = FIRST_LEARNING_PATH.steps.find(
    (step) => step.activityId === nextStep.targetId,
  );
  const recommendationAreaLabels = {
    mission: "Missão",
    phishlab: "PhishLab",
    simulation: "Simulação",
    team: "Equipe",
  } as const;
  const recommendationStatusLabels: Record<NextStepRecommendation["kind"], string> = {
    startMission: "Disponível",
    continueMission: "Em andamento",
    adaptiveReview: "Recomendado",
    nextMission: "Disponível",
    journeyComplete: "Opcional",
  };
  const recommendationMeta = {
    estimatedMinutes: recommendationDefinition?.estimatedMinutes ?? 5,
    basePoints: recommendationDefinition?.basePoints ?? POINT_RULES.radar,
    statusLabel: recommendationStatusLabels[nextStep.kind],
    areaLabel: recommendationDefinition
      ? recommendationAreaLabels[recommendationDefinition.area]
      : "Radar",
  };

  const navigate = (view: ViewKey) => {
    setNotice("");
    setPreferencePreview(null);
    router.push(PORTAL_VIEW_ROUTES[view]);
    window.scrollTo({
      top: 0,
      behavior: effectivePreferences.reducedMotion ? "auto" : "smooth",
    });
  };

  const restoreTutorialOpenerFocus = () => {
    window.requestAnimationFrame(() => tutorialOpenerRef.current?.focus());
  };

  const openTutorial = (opener: HTMLButtonElement) => {
    tutorialOpenerRef.current = opener;

    if (tutorial.status === "completed") {
      setTutorialReplayOpen(true);
      return;
    }

    startTutorial();
    router.push("/");
  };

  const closeTutorialReplay = () => {
    setTutorialReplayOpen(false);
    restoreTutorialOpenerFocus();
  };

  const finishGuidedTutorial = () => {
    if (tutorialReplayOpen) {
      closeTutorialReplay();
      return;
    }

    completeTutorial();
    router.push(PORTAL_VIEW_ROUTES.missao);
  };

  const restartDemo = () => {
    const confirmed = window.confirm(
      "Reiniciar seu progresso? As atividades e recompensas desta conta serão apagadas.",
    );
    if (!confirmed) return;

    resetDemo();
    setTutorialReplayOpen(false);
    router.push(PORTAL_VIEW_ROUTES.inicio);
    setNotice("O progresso desta conta foi reiniciado.");
    window.scrollTo({
      top: 0,
      behavior: effectivePreferences.reducedMotion ? "auto" : "smooth",
    });
  };

  return (
    <>
      {authenticationPending ? (
        <div className="auth-session-gate" role="status" aria-live="polite">
          <div className="auth-session-gate-card">
            <span>Casa Digital</span>
            <strong>
              {authenticationError ? "Acesso indisponível" : "Validando seu acesso"}
            </strong>
            <p>
              {authenticationError
                ? authenticationError
                : "Aguarde enquanto associamos esta sessão à sua conta."}
            </p>
          </div>
        </div>
      ) : null}
    <div
      className="app-shell"
      inert={authenticationPending ? true : undefined}
      aria-hidden={authenticationPending ? "true" : undefined}
      data-high-contrast={effectivePreferences.highContrast ? "true" : "false"}
      data-text-size={effectivePreferences.textSize}
      data-reduced-motion={effectivePreferences.reducedMotion ? "true" : "false"}
    >
      <div
        className="portal-shell-boundary"
        inert={modalOpen ? true : undefined}
        aria-hidden={modalOpen ? "true" : undefined}
      >
        <a className="skip-link" href="#main-content">
          Pular para o conteúdo principal
        </a>
        <div className={isFocusMode ? "activity-focus-shell" : "app-shell-layout"}>
        {isFocusMode ? (
          <ActivityFocusBar
            contextLabel={currentLabel}
            areaLabel={routeResolution.areaLabel}
            points={totalPoints}
            levelLabel={currentLevel.label}
            onBack={() => router.push(routeResolution.hubRoute)}
          />
        ) : (
          <PortalSidebar
            activeView={activeView}
            onNavigate={navigate}
            canAccessManagement={account?.role === "administrator"}
            data-learning-tour="learning-navigation"
            data-profile-tour="profile-navigation"
          />
        )}
        <main
          ref={mainContentRef}
          id="main-content"
          tabIndex={-1}
          className={isFocusMode ? "main-area activity-focus-main" : "main-area"}
        >
        {!isFocusMode ? (
          <>
            <PortalTopbar
              learnerName={account?.name ?? state.demo.learner.name}
              points={totalPoints}
              levelLabel={currentLevel.label}
              isHydrated={isHydrated}
              mode={account?.role === "administrator" ? "management" : "learning"}
              onLogout={logout}
              data-tour="progress-summary"
            />
            <div className="mobile-view-label" aria-live="polite">
              {currentLabel}
            </div>
          </>
        ) : null}
        {notice ? (
          <div className="notice" role="status">
            <span aria-hidden="true">i</span>
            <p>{notice}</p>
            <button type="button" onClick={() => setNotice("")} aria-label="Fechar aviso">
              ×
            </button>
          </div>
        ) : null}
        <div className="main-content">
          {routeNeedsExplicitState ? (
            <ActivityRouteState
              resolution={routeResolution}
              onBack={() => router.push(routeResolution.hubRoute)}
            />
          ) : activeView === "inicio" ? (
            <HomeView
              learnerName={account?.name ?? state.demo.learner.name}
              onNavigate={navigate}
              onOpenRecommendation={() => router.push(nextStep.href)}
              sectorMetrics={sectorMetrics}
              teamContributionCounted={Boolean(
                bankChangeContribution ?? teamChallengeContribution,
              )}
              nextStep={nextStep}
              recommendationMeta={recommendationMeta}
              learningPath={learningPath}
              recentActivity={recentActivity}
              onOpenActivity={(href) => router.push(href)}
              showTutorialInvitation={tutorial.status === "available"}
              onOpenTutorial={openTutorial}
            />
          ) : activeView === "missoes" ? (
            <MissionsHub
              progress={{
                completedLabel: learningPath.completedLabel,
                progressValue: learningPath.progressValue,
                progressMax: learningPath.progressMax,
                progressAssistiveLabel: learningPath.progressAssistiveLabel,
                pointsLabel: `${totalPoints} confirmados`,
                levelLabel: currentLevel.label,
              }}
              learningPath={learningPath}
              missions={missionItems}
              secondaryMissions={secondaryMissionItems}
              latestResult={
                journeyMissionResult
                  ? {
                      missionTitle: "O aviso que não podia esperar",
                      scoreLabel: `${journeyMissionResult.score}/100`,
                      pointsLabel: missionRewardClaim
                        ? `${missionRewardClaim.points} confirmados`
                        : "Sem recompensa registrada",
                      summary: journeyMissionResult.needsReview
                        ? `A jornada avançou e uma revisão opcional de links foi recomendada. Bônus calculado: ${missionRewardBreakdown?.bonusPercentage ?? 0}%.`
                        : `A primeira Missão foi concluída e a próxima etapa está disponível. Bônus calculado: ${missionRewardBreakdown?.bonusPercentage ?? 0}%.`,
                      actionLabel: "Abrir resultado",
                    }
                  : undefined
              }
              review={
                activeReview
                  ? {
                      eyebrow: "Revisão adaptativa",
                      title:
                        activeReview.targetActivityId === SIMULATION_ACTIVITY_ID
                          ? "Uma manhã comum"
                          : activeReview.targetActivityId === RECOVERY_MISSION_ID
                            ? "Cliquei. E agora?"
                          : activeReview.targetActivityId ===
                              SENDER_INSPECTOR_ACTIVITY_ID
                            ? "Quem enviou de verdade?"
                            : "Domínio sob a lupa",
                      summary: activeReview.reason,
                      statusLabel: "Recomendada",
                      actionLabel:
                        activeReview.targetActivityId === SIMULATION_ACTIVITY_ID
                          ? "Abrir Simulação"
                          : activeReview.targetActivityId === RECOVERY_MISSION_ID
                            ? "Rever Missão"
                          : "Abrir PhishLab",
                    }
                  : undefined
              }
              reinforcementExplanation="Um resultado baixo pode recomendar prática adicional, mas a Missão seguinte é desbloqueada pela conclusão — nunca por uma nota mínima."
              onOpenLearningPathStep={(href) => router.push(href)}
              onOpenLearningPathRadar={() => router.push("/radar")}
              onOpenMission={(missionId) => {
                if (missionId === PILOT_MISSION_ID) navigate("missao");
              }}
              onOpenSecondaryMission={(missionId) => {
                if (missionId === SENDER_INSPECTOR_ACTIVITY_ID) {
                  router.push("/phishlab/quem-enviou-de-verdade");
                  return;
                }
                if (missionId === PHISHLAB_ACTIVITY_ID) {
                  router.push("/phishlab/analisador-de-links");
                  return;
                }
                router.push("/arcade/overlooked");
              }}
              onOpenLatestResult={() => navigate("missao")}
              onOpenReview={() => router.push(nextStep.href)}
            />
          ) : activeView === "missao" ? (
            isPhishingFoundationMission ? (
              <PhishingFoundationMission
                key={
                  isHydrated
                    ? "mission:foundation:new"
                    : "mission:foundation:hydrating"
                }
                existingResult={phishingFoundationResult}
                existingCasePackageId={phishingFoundationPackageId}
                rewardAlreadyClaimed={Boolean(missionRewardClaim)}
                claimedPoints={missionRewardClaim?.points ?? 0}
                onComplete={submitPhishingFoundationV2}
                onBackToMissions={() => router.push("/missoes")}
                onOpenSenderLab={() =>
                  router.push("/phishlab/quem-enviou-de-verdade")
                }
                onOpenProfile={() => navigate("perfil")}
              />
            ) : isCompromisedConversationMission ? (
              <ConversationReconstructionMission
                key="mission:compromised"
                existingResult={compromisedConversationResult}
                existingCasePackageId={compromisedConversationPackageId}
                rewardAlreadyClaimed={Boolean(
                  compromisedConversationRewardClaim,
                )}
                claimedPoints={
                  compromisedConversationRewardClaim?.points ?? 0
                }
                onComplete={submitConversationReconstructionV2}
                onBackToMissions={() => router.push("/missoes")}
                onOpenNextActivity={() =>
                  router.push("/missoes/voce-iniciou-este-acesso")
                }
                onOpenProfile={() => navigate("perfil")}
              />
            ) : isMfaFatigueMission ? (
              <MfaFatigueMission
                key={
                  state.learning.activityProgress[MFA_FATIGUE_MISSION_ID]
                    ?.lastAttemptId ??
                  (isHydrated
                    ? "mission:mfa-fatigue:new"
                    : "mission:mfa-fatigue:hydrating")
                }
                prerequisitesCompleted={
                  senderLabCompleted && domainLabCompleted
                }
                senderLabCompleted={senderLabCompleted}
                domainLabCompleted={domainLabCompleted}
                existingResult={mfaFatigueResult}
                existingSubmission={mfaConsoleSubmission}
                existingCasePackageId={mfaConsolePackageId}
                rewardAlreadyClaimed={Boolean(mfaFatigueRewardClaim)}
                claimedPoints={mfaFatigueRewardClaim?.points ?? 0}
                onComplete={submitMfaConsoleV2}
                onBackToMissions={() => router.push("/missoes")}
                onOpenSenderLab={() =>
                  router.push("/phishlab/quem-enviou-de-verdade")
                }
                onOpenDomainLab={() =>
                  router.push("/phishlab/analisador-de-links")
                }
                onOpenRecovery={() =>
                  router.push("/missoes/cliquei-e-agora")
                }
                onOpenProfile={() => navigate("perfil")}
              />
            ) : isRecoveryMission ? (
              <RecoveryMission
                key={
                  state.learning.activityProgress[RECOVERY_MISSION_ID]
                    ?.lastAttemptId ??
                  (isHydrated
                    ? "mission:recovery:new"
                    : "mission:recovery:hydrating")
                }
                existingResult={recoveryMissionResult}
                existingSubmission={recoveryBuilderSubmission}
                existingCasePackageId={recoveryBuilderPackageId}
                rewardAlreadyClaimed={Boolean(recoveryMissionRewardClaim)}
                claimedPoints={recoveryMissionRewardClaim?.points ?? 0}
                onComplete={submitRecoveryBuilderV2}
                onBackToMissions={() => router.push("/missoes")}
                onOpenSimulation={() =>
                  router.push("/simulacoes/dia-de-trabalho")
                }
                onOpenProfile={() => navigate("perfil")}
              />
            ) : (
              <MissionView
                key={isHydrated ? "mission:hydrated" : "mission:hydrating"}
                existingResult={missionResult}
                rewardAlreadyClaimed={Boolean(missionRewardClaim)}
                claimedMissionPoints={missionRewardClaim?.points ?? 0}
                onComplete={submitMission}
                onNavigate={navigate}
              />
            )
          ) : activeView === "laboratorio" ? (
            isSenderInspector ? (
              <SenderInspectorLab
                key={
                  state.learning.activityProgress[SENDER_INSPECTOR_ACTIVITY_ID]
                    ?.lastAttemptId ??
                  (isHydrated ? "lab:sender:new" : "lab:sender:hydrating")
                }
                existingResult={senderInspectorResult}
                existingCasePackageId={senderInspectorPackageId}
                rewardAlreadyClaimed={Boolean(senderInspectorRewardClaim)}
                claimedPoints={senderInspectorRewardClaim?.points ?? 0}
                onComplete={submitTrueSenderV2}
                onBackToHub={() => router.push("/phishlab")}
                onOpenDomainLab={() =>
                  router.push("/phishlab/analisador-de-links")
                }
                onOpenProfile={() => navigate("perfil")}
              />
            ) : isLinkAnalyzer ? (
              <DomainUnderMagnifierLab
                key={isHydrated ? "lab:hydrated" : "lab:hydrating"}
                existingResult={phishLabResult}
                existingCasePackageId={domainAnalyzerPackageId}
                rewardAlreadyClaimed={Boolean(phishLabRewardClaim)}
                claimedPoints={phishLabRewardClaim?.points ?? 0}
                onComplete={submitDomainAnalyzerV2}
                onBackToHub={() => router.push("/phishlab")}
                onOpenSimulation={() =>
                  router.push("/simulacoes/dia-de-trabalho")
                }
                onOpenProfile={() => navigate("perfil")}
              />
            ) : (
              <PhishLabHub
                recommendedActivityId={
                  activeReview?.targetActivityId.startsWith("phishlab:")
                    ? activeReview.targetActivityId
                    : null
                }
                domainResult={phishLabResult}
                domainRewardPoints={phishLabRewardClaim?.points ?? 0}
                senderResult={senderInspectorResult}
                senderRewardPoints={senderInspectorRewardClaim?.points ?? 0}
                onOpenAnalyzer={() =>
                  router.push("/phishlab/analisador-de-links")
                }
                onOpenSenderInspector={() =>
                  router.push("/phishlab/quem-enviou-de-verdade")
                }
                onBackToOverview={() => navigate("inicio")}
              />
            )
          ) : activeView === "simulacoes" ? (
            isWorkdaySimulation ? (
              <WorkdayTriageSimulation
                key={isHydrated ? "simulation:hydrated" : "simulation:hydrating"}
                existingResult={simulationResult}
                existingAttempt={workdayTriageAttempt}
                rewardAlreadyClaimed={Boolean(simulationRewardClaim)}
                claimedPoints={simulationRewardClaim?.points ?? 0}
                onComplete={submitWorkdayTriageV2}
                onBackToHub={() => router.push("/simulacoes")}
                onOpenProfile={() => navigate("perfil")}
                onOpenPhishLab={() =>
                  router.push("/phishlab/analisador-de-links")
                }
                onOpenTeamChallenge={() =>
                  router.push("/equipes/mudanca-bancaria-sem-atalho")
                }
              />
            ) : (
              <SimulationsHub
                isRecommended={
                  activeReview?.targetActivityId === SIMULATION_ACTIVITY_ID
                }
                latestResult={simulationResult}
                rewardPoints={simulationRewardClaim?.points ?? 0}
                onOpenWorkday={() =>
                  router.push("/simulacoes/dia-de-trabalho")
                }
                onBackToOverview={() => navigate("inicio")}
              />
            )
          ) : activeView === "arcade" ? (
            arcadeGame ? (
              <ArcadeGameDetail
                game={arcadeGame}
                onBackToArcade={() => router.push("/arcade")}
              />
            ) : (
              <ArcadeHub
                onOpenGame={(slug) => router.push(`/arcade/${slug}`)}
                onBackToOverview={() => navigate("inicio")}
              />
            )
          ) : activeView === "perfil" ? (
            <ProfileView
              key={`profile:${pathname}`}
              model={profileModel}
              initialSection={
                pathname === "/perfil/historico"
                  ? "history"
                  : pathname === "/perfil/conquistas"
                    ? "achievements"
                    : "summary"
              }
              preferences={state.preferences}
              isHydrated={isHydrated}
              onSavePreferences={savePreferences}
              onPreviewPreferences={setPreferencePreview}
              onLogout={logout}
              onBackToOverview={() => navigate("inicio")}
              onOpenMission={() => navigate("missoes")}
              onOpenReview={() => router.push(nextStep.href)}
              onOpenArcade={() => navigate("arcade")}
              onOpenAvatar={() => router.push("/avatar-lab")}
              onOpenActivity={(href) => router.push(href)}
              tutorialCompleted={tutorial.status === "completed"}
              onOpenTutorial={openTutorial}
            />
          ) : activeView === "radar" ? (
            radarArticle ? (
              <RadarArticle
                key={`${radarArticle.id}:${isHydrated ? "hydrated" : "hydrating"}`}
                article={radarArticle}
                isCompleted={completedRadarIds.includes(radarArticle.id)}
                claimedPoints={radarRewardClaim?.points ?? 0}
                onComplete={submitRadar}
                onBackToRadar={() => router.push("/radar")}
                onOpenPhishLab={() =>
                  router.push("/phishlab/analisador-de-links")
                }
                onOpenMission={() => navigate("missoes")}
              />
            ) : (
              <RadarHub
                completedArticleIds={completedRadarIds}
                radarPoints={radarPoints}
                onOpenArticle={(slug) => router.push(`/radar/${slug}`)}
                onBackToOverview={() => navigate("inicio")}
              />
            )
          ) : activeView === "equipes" ? (
            isBankChangeChallenge ? (
              <BankChangeChallenge
                key={isHydrated ? "bank-change:hydrated" : "bank-change:hydrating"}
                existingAttempt={bankProcessAttempt}
                existingResult={bankProcessResult}
                hasLegacyCompletion={Boolean(bankChangeAttempt || bankChangeResult)}
                rewardAlreadyClaimed={Boolean(bankChangeRewardClaim)}
                aggregateAlreadyCounted={Boolean(bankChangeContribution)}
                claimedPoints={bankChangeRewardClaim?.points ?? 0}
                reducedMotion={effectivePreferences.reducedMotion}
                onComplete={submitBankProcessV2}
                onBackToTeams={() => router.push("/equipes")}
                onOpenProfile={() => navigate("perfil")}
              />
            ) : isTeamChallenge ? (
              <TeamChallenge
                key={isHydrated ? "team-challenge:hydrated" : "team-challenge:hydrating"}
                existingResult={teamChallengeResult}
                existingDecisions={teamChallengeAttempt?.caseDecisions ?? []}
                rewardAlreadyClaimed={Boolean(teamChallengeRewardClaim)}
                aggregateAlreadyCounted={Boolean(teamChallengeContribution)}
                claimedPoints={teamChallengeRewardClaim?.points ?? 0}
                onComplete={submitTeamChallenge}
                onBackToTeams={() => router.push("/equipes")}
                onOpenProfile={() => navigate("perfil")}
              />
            ) : (
              <TeamsHub
                teamName={learnerSector.name}
                metrics={sectorMetrics}
                aggregate={state.teams.sectorAggregate}
                ranking={sectorRanking}
                goal={state.teams.activeGoal}
                history={state.teams.history}
                contribution={bankChangeContribution}
                latestResult={bankChangeResult}
                legacyCompleted={Boolean(teamChallengeResult)}
                rewardPoints={bankChangeRewardClaim?.points ?? 0}
                onOpenChallenge={() =>
                  router.push("/equipes/mudanca-bancaria-sem-atalho")
                }
                onOpenLegacyChallenge={() =>
                  router.push("/equipes/caixa-de-entrada-segura")
                }
                onOpenProfile={() => navigate("perfil")}
                onBackToOverview={() => navigate("inicio")}
              />
            )
          ) : activeView === "gestao" ? (
            account?.role === "administrator" ? (
              <ManagementExperience />
            ) : (
              <ManagementAccessDenied onBack={() => navigate("inicio")} />
            )
          ) : (
            <SectionView
              content={sectionContent[activeView]}
              onNavigate={navigate}
            />
          )}
        </div>
        {!isFocusMode ? <footer>
          <div className="footer-copy">
            <p>Casa Digital Segura · Protótipo funcional para LEROY MERLIN</p>
            <span title={localSecurityNotice}>
              Conta conectada · progresso associado à sua sessão.
            </span>
            {persistenceError ? <span role="alert">{persistenceError}</span> : null}
          </div>
          <button
            type="button"
            className="demo-reset-button"
            onClick={restartDemo}
            disabled={!isHydrated}
          >
            Reiniciar meu progresso
          </button>
        </footer> : null}
        </main>
        </div>
      </div>

      {guidedTutorialOpen ? (
        <GuidedTutorial
          mode={tutorialReplayOpen ? "replay" : "required"}
          persistedStep={tutorial.currentStep}
          reducedMotion={effectivePreferences.reducedMotion}
          onStepChange={setTutorialStep}
          onComplete={finishGuidedTutorial}
          onCloseReplay={closeTutorialReplay}
        />
      ) : null}
    </div>
    </>
  );
}
