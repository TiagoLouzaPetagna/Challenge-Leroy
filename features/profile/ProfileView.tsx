"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
} from "react";

import type { LearnerPreferences } from "@/lib/domain/types";
import { Mascot } from "@/features/ui/LearningUI";

import styles from "./ProfileView.module.css";

export type ProfileCompetencyView = {
  id: string;
  label: string;
  score: number | null;
  level: string;
  evidence: string;
};

export type ProfileHistoryView = {
  id: string;
  kind: "learningActivity" | "achievement";
  categoryLabel: string;
  title: string;
  detail: string;
  date: string;
  href: string;
  actionLabel: string;
};

export type ProfilePointSourceView = {
  id: string;
  label: string;
  points: number;
  status: "confirmed" | "pending";
};

export type ProfileAchievementView = {
  id: string;
  title: string;
  description: string;
  condition: string;
  rewardPoints: number;
  current: number;
  target: number;
  unlocked: boolean;
  unlockedAt: string | null;
};

export type ProfileViewModel = {
  learnerName: string;
  location: string;
  totalPoints: number;
  levelLabel: string;
  levelProgress: number;
  pointsToNextLevel: number | null;
  journeyCompleted: number;
  journeyTotal: number;
  journeyProgress: number;
  bestMissionScore: number | null;
  bestMissionTitle: string | null;
  arcadeSummary: {
    gamesPlayed: number;
    points: number;
    bestPosition: number | null;
    catalogStatus: string;
  };
  competencies: ProfileCompetencyView[];
  achievements: ProfileAchievementView[];
  review: { title: string; reason: string; targetLabel: string } | null;
  history: ProfileHistoryView[];
  pointSources: ProfilePointSourceView[];
  teamName: string;
  teamShield: number;
  teamContributionStatus: { label: string; detail: string };
};

type ProfileSection =
  | "summary"
  | "competencies"
  | "history"
  | "achievements"
  | "preferences";

type ProfileViewProps = {
  model: ProfileViewModel;
  initialSection?: ProfileSection;
  preferences: LearnerPreferences;
  isHydrated: boolean;
  onSavePreferences: (preferences: LearnerPreferences) => void;
  onPreviewPreferences: (preferences: LearnerPreferences) => void;
  onLogout: () => void | Promise<void>;
  onBackToOverview: () => void;
  onOpenMission: () => void;
  onOpenReview: () => void;
  onOpenArcade: () => void;
  onOpenActivity: (href: string) => void;
  tutorialCompleted: boolean;
  onOpenTutorial: (opener: HTMLButtonElement) => void;
};

const PROFILE_SECTIONS: Array<{ id: ProfileSection; label: string }> = [
  { id: "summary", label: "Resumo" },
  { id: "competencies", label: "Competências" },
  { id: "history", label: "Histórico e pontos" },
  { id: "achievements", label: "Conquistas" },
  { id: "preferences", label: "Preferências" },
];

function Toggle({
  checked,
  disabled = false,
  label,
  description,
  onChange,
}: {
  checked: boolean;
  disabled?: boolean;
  label: string;
  description: string;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className={`${styles.toggle}${disabled ? ` ${styles.disabled}` : ""}`}>
      <span>
        <strong>{label}</strong>
        <small>{description}</small>
      </span>
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(event) => onChange(event.target.checked)}
      />
    </label>
  );
}

function getProgressPercentage(current: number, target: number) {
  if (target <= 0) {
    return 0;
  }

  return Math.min(100, Math.max(0, Math.round((current / target) * 100)));
}

export function ProfileView({
  model,
  initialSection = "summary",
  preferences,
  isHydrated,
  onSavePreferences,
  onPreviewPreferences,
  onLogout,
  onBackToOverview,
  onOpenMission,
  onOpenReview,
  onOpenArcade,
  onOpenActivity,
  tutorialCompleted,
  onOpenTutorial,
}: ProfileViewProps) {
  const [section, setSection] = useState<ProfileSection>(initialSection);
  const [draftState, setDraftState] = useState({
    base: preferences,
    value: preferences,
  });
  const [saveMessage, setSaveMessage] = useState("");
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  useEffect(() => {
    onPreviewPreferences(preferences);
    return () => onPreviewPreferences(preferences);
  }, [onPreviewPreferences, preferences]);

  const draft =
    draftState.base === preferences ? draftState.value : preferences;

  const isDirty = useMemo(
    () => JSON.stringify(draft) !== JSON.stringify(preferences),
    [draft, preferences],
  );

  const updateDraft = <Key extends keyof LearnerPreferences>(
    key: Key,
    value: LearnerPreferences[Key],
  ) => {
    const next = { ...draft, [key]: value };
    setDraftState({ base: preferences, value: next });
    setSaveMessage("");
    onPreviewPreferences(next);
  };

  const save = () => {
    onSavePreferences(draft);
    setSaveMessage(
      "Preferências salvas neste navegador. Nenhuma notificação externa foi enviada.",
    );
  };

  const openActivity = (event: ProfileHistoryView) => {
    if (event.kind === "achievement") {
      setSection("achievements");
      return;
    }
    onOpenActivity(event.href);
  };

  const handleTabKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    currentIndex: number,
  ) => {
    let nextIndex: number | null = null;

    if (event.key === "ArrowRight") {
      nextIndex = (currentIndex + 1) % PROFILE_SECTIONS.length;
    } else if (event.key === "ArrowLeft") {
      nextIndex =
        (currentIndex - 1 + PROFILE_SECTIONS.length) % PROFILE_SECTIONS.length;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = PROFILE_SECTIONS.length - 1;
    }

    if (nextIndex === null) {
      return;
    }

    event.preventDefault();
    setSection(PROFILE_SECTIONS[nextIndex].id);
    tabRefs.current[nextIndex]?.focus();
  };

  const renderActivityList = (events: ProfileHistoryView[]) => (
    <ol className={styles.activityList}>
      {events.map((event) => (
        <li key={event.id}>
          <span className={styles.timelineMark} aria-hidden="true" />
          <div className={styles.activityCopy}>
            <small className={styles.activityCategory}>{event.categoryLabel}</small>
            <strong>{event.title}</strong>
            <p>{event.detail}</p>
            <div className={styles.activityFooter}>
              <small>{event.date}</small>
              <button
                type="button"
                className={`text-button ${styles.inlineAction}`}
                onClick={() => openActivity(event)}
              >
                {event.actionLabel} <span aria-hidden="true">→</span>
              </button>
            </div>
          </div>
        </li>
      ))}
    </ol>
  );

  const journeyStyle = {
    "--profile-progress": `${model.journeyProgress}%`,
  } as CSSProperties;

  return (
    <div className="page-stack profile-page">
      <div className={styles.page}>
        <header className={styles.hero} aria-labelledby="profile-title">
          <div className={styles.heroCopy}>
            <div className={styles.heroTopline}>
              <span className={styles.eyebrow}>Sua evolução na Casa Digital</span>
              <span className={styles.privacyNote}>
                <svg viewBox="0 0 20 20" aria-hidden="true">
                  <path d="M6.5 8V6.5a3.5 3.5 0 0 1 7 0V8m-8 0h9v7.5h-9z" />
                </svg>
                Visível somente para você
              </span>
            </div>
            <h1 id="profile-title">{model.learnerName}</h1>
            <p className={styles.location}>{model.location}</p>

            <div className={styles.levelJourney}>
              <div className={styles.levelIdentity}>
                <span>Nível atual</span>
                <strong>{model.levelLabel}</strong>
              </div>
              <div className={styles.pointsIdentity}>
                <strong>{model.totalPoints}</strong>
                <span>pontos confirmados</span>
              </div>
              <div
                className={styles.levelTrack}
                role="progressbar"
                aria-label="Progresso para o próximo nível"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={model.levelProgress}
              >
                <span style={{ width: `${model.levelProgress}%` }} />
              </div>
              <small>
                {model.pointsToNextLevel === null
                  ? "Nível máximo da demonstração alcançado"
                  : `${model.pointsToNextLevel} pontos para o próximo nível`}
              </small>
            </div>

            <button
              type="button"
              className={`text-button ${styles.backButton}`}
              onClick={onBackToOverview}
            >
              Voltar à visão geral <span aria-hidden="true">→</span>
            </button>
          </div>

          <div className={styles.heroVisual}>
            <svg
              className={styles.identityPath}
              viewBox="0 0 520 380"
              aria-hidden="true"
            >
              <path d="M28 320C119 275 104 163 207 190c93 24 95-95 195-85 43 5 68 31 92 64" />
              <circle cx="31" cy="319" r="9" />
              <circle cx="207" cy="190" r="9" />
              <circle cx="401" cy="105" r="9" />
            </svg>
            <span className={styles.pathLabel}>trajetória em construção</span>
            <span className={styles.levelSeal} aria-hidden="true">
              <svg viewBox="0 0 64 72">
                <path d="M32 3 58 13v20c0 17-10 29-26 36C16 62 6 50 6 33V13z" />
                <path d="m21 35 7 7 15-17" />
              </svg>
            </span>
            <Mascot
              pose="profile"
              size="large"
              className={styles.profileMascot}
              alt="Leroyzin acompanha sua trajetória de evolução"
            />
          </div>
        </header>

        <nav
          className={styles.sectionNav}
          aria-label="Áreas de Meu perfil"
          role="tablist"
        >
          {PROFILE_SECTIONS.map((item, index) => (
            <button
              key={item.id}
              ref={(element) => {
                tabRefs.current[index] = element;
              }}
              type="button"
              id={`profile-tab-${item.id}`}
              role="tab"
              className={section === item.id ? styles.activeTab : undefined}
              aria-selected={section === item.id}
              aria-controls={`profile-panel-${item.id}`}
              tabIndex={section === item.id ? 0 : -1}
              onClick={() => setSection(item.id)}
              onKeyDown={(event) => handleTabKeyDown(event, index)}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {PROFILE_SECTIONS.filter((item) => item.id !== section).map((item) => (
          <div
            key={item.id}
            id={`profile-panel-${item.id}`}
            role="tabpanel"
            aria-labelledby={`profile-tab-${item.id}`}
            hidden
          />
        ))}

        {section === "summary" ? (
          <div
            id="profile-panel-summary"
            className={styles.panelStack}
            role="tabpanel"
            aria-labelledby="profile-tab-summary"
            tabIndex={0}
          >
            <section className={styles.summaryStory} aria-labelledby="profile-summary-title">
              <div className={styles.summaryHeading}>
                <span className={styles.eyebrow}>Seu caminho até aqui</span>
                <h2 id="profile-summary-title">Progresso que conta uma história.</h2>
              </div>

              <article className={styles.journeyFeature}>
                <div
                  className={styles.journeyDial}
                  style={journeyStyle}
                  role="progressbar"
                  aria-label="Jornada principal"
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={model.journeyProgress}
                >
                  <div>
                    <strong>{model.journeyProgress}%</strong>
                    <span>da jornada</span>
                  </div>
                </div>
                <div className={styles.journeyCopy}>
                  <span>Jornada principal</span>
                  <h3>{`${model.journeyCompleted} de ${model.journeyTotal} etapas concluídas`}</h3>
                  <ol className={styles.milestonePath} aria-label="Etapas da jornada principal">
                    {Array.from({ length: model.journeyTotal }, (_, index) => (
                      <li
                        key={index}
                        className={index < model.journeyCompleted ? styles.milestoneComplete : undefined}
                        aria-label={`Etapa ${index + 1}: ${index < model.journeyCompleted ? "concluída" : "a concluir"}`}
                      >
                        <span aria-hidden="true">{index + 1}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </article>

              <div className={styles.storyNotes}>
                <article className={styles.bestResult}>
                  <div className={styles.medal} aria-hidden="true"><span>★</span></div>
                  <div>
                    <span>Melhor resultado</span>
                    <strong>{model.bestMissionScore === null ? "—" : `${model.bestMissionScore}/100`}</strong>
                    <p>{model.bestMissionScore === null ? "Conclua a primeira Missão" : `Missão ${model.bestMissionTitle ?? "concluída"}`}</p>
                  </div>
                </article>

                <article className={styles.teamSnapshot}>
                  <svg viewBox="0 0 56 64" aria-hidden="true">
                    <path d="M28 3 52 12v18c0 16-9 26-24 32C13 56 4 46 4 30V12z" />
                    <path d="M17 31h22M28 20v22" />
                  </svg>
                  <div>
                    <span>Proteção coletiva</span>
                    <strong>Seu setor está protegido em {model.teamShield}/100</strong>
                    <p>Sua contribuição individual permanece privada.</p>
                  </div>
                </article>
              </div>
            </section>

            <section className={`${styles.recommendation}${model.review ? ` ${styles.recommendationActive}` : ""}`} aria-labelledby="profile-recommendation-title">
              <span className={styles.recommendationIndex} aria-hidden="true">Próximo</span>
              <div>
                <span className={styles.eyebrow}>Próximo desenvolvimento</span>
                <h2 id="profile-recommendation-title">{model.review ? model.review.title : "Nenhuma revisão pendente"}</h2>
                <p>{model.review ? model.review.reason : "Quando uma atividade indicar dificuldade, você receberá uma prática recomendada sem bloquear a jornada."}</p>
              </div>
              <button type="button" className="primary-button dark" onClick={model.review ? onOpenReview : onOpenMission}>
                {model.review ? model.review.targetLabel : model.bestMissionScore === null ? "Iniciar primeira Missão" : "Ver jornada de Missões"}
              </button>
            </section>

            <section className={styles.recentActivity} aria-labelledby="profile-recent-activity-title">
              <div className={styles.sectionHeading}>
                <div><span className={styles.eyebrow}>Sua jornada</span><h2 id="profile-recent-activity-title">Atividade recente</h2></div>
                {model.history.length > 0 ? <button type="button" className="text-button" onClick={() => setSection("history")}>Ver histórico completo <span aria-hidden="true">→</span></button> : null}
              </div>
              {model.history.length > 0 ? renderActivityList(model.history.slice(0, 3)) : (
                <div className={styles.emptyState}>
                  <span className={styles.emptyMark} aria-hidden="true">01</span>
                  <div><strong>Sua atividade aparecerá aqui</strong><p>Conclua a primeira Missão para registrar resultado, pontos e competências.</p><button type="button" className="text-button" onClick={onOpenMission}>Iniciar primeira Missão <span aria-hidden="true">→</span></button></div>
                </div>
              )}
            </section>

            <section className={styles.contextRail} aria-label="Contexto da sua evolução">
              <article className={styles.arcadeContext}>
                <div>
                  <span className={styles.eyebrow}>Arcade</span><h2>Desempenho separado por jogo</h2>
                  <p>Nenhuma partida ou pontuação fictícia é incorporada ao perfil.</p>
                  <button type="button" className="text-button" onClick={onOpenArcade}>Abrir catálogo do Arcade <span aria-hidden="true">→</span></button>
                </div>
                <dl className={styles.arcadeFacts}>
                  <div><dt>Jogos</dt><dd>{model.arcadeSummary.gamesPlayed}</dd></div>
                  <div><dt>Melhor posição</dt><dd>{model.arcadeSummary.bestPosition ?? "—"}</dd></div>
                  <div><dt>Pontos</dt><dd>{model.arcadeSummary.points}</dd></div>
                </dl>
                <small>{model.arcadeSummary.catalogStatus}</small>
              </article>

              <article className={styles.teamContext}>
                <div className={styles.teamContextCopy}>
                  <span className={styles.inverseEyebrow}>Contribuição privada</span><h2>{model.teamName}</h2>
                  <p>Sua participação ajuda o grupo sem publicar erros, notas ou decisões individuais.</p>
                </div>
                <div className={styles.teamContribution}>
                  <strong>{model.teamContributionStatus.label}</strong><span>contribuição ao placar</span><small>{model.teamContributionStatus.detail}</small>
                </div>
              </article>
            </section>
          </div>
        ) : null}

        {section === "competencies" ? (
          <section id="profile-panel-competencies" className={styles.contentPanel} role="tabpanel" aria-labelledby="profile-tab-competencies" tabIndex={0}>
            <div className={styles.editorialHeading}>
              <div><span className={styles.eyebrow}>Aprendizagem</span><h2>Competências em construção</h2></div>
              <p>Cada nível nasce de evidências reais. Uma revisão recomenda prática, mas não apaga o que você já demonstrou.</p>
            </div>
            <div className={styles.competencyList}>
              {model.competencies.map((competency, index) => (
                <article key={competency.id} className={`${styles.competencyRow}${competency.score === null ? ` ${styles.notAssessed}` : ""}`}>
                  <span className={styles.competencyIndex} aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                  <div className={styles.competencyIdentity}><h3>{competency.label}</h3><p>{competency.evidence}</p></div>
                  <div className={styles.competencyMeasure}>
                    <div><strong>{competency.score === null ? "—" : competency.score}</strong><span>{competency.score === null ? "Não avaliada" : competency.level}</span></div>
                    <div className={styles.competencyTrack} role="progressbar" aria-label={`Competência ${competency.label}`} aria-valuemin={0} aria-valuemax={100} aria-valuenow={competency.score ?? undefined} aria-valuetext={competency.score === null ? "Ainda não avaliada" : `${competency.score} de 100, nível ${competency.level}`}>
                      <span style={{ width: `${competency.score ?? 0}%` }} />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ) : null}

        {section === "history" ? (
          <section id="profile-panel-history" className={styles.historyLayout} role="tabpanel" aria-labelledby="profile-tab-history" tabIndex={0}>
            <article className={styles.historyPanel}>
              <div className={styles.editorialHeading}><div><span className={styles.eyebrow}>Atividades</span><h2>Histórico de atividades</h2></div><p>Uma linha do tempo do que você praticou e conquistou.</p></div>
              {model.history.length > 0 ? renderActivityList(model.history) : (
                <div className={styles.emptyState}><span className={styles.emptyMark} aria-hidden="true">01</span><div><strong>O histórico começa com sua primeira atividade</strong><p>Conclusões, recompensas e conquistas aparecerão aqui.</p><button type="button" className="text-button" onClick={onOpenMission}>Abrir Missões <span aria-hidden="true">→</span></button></div></div>
              )}
            </article>
            <aside className={styles.pointsPanel} aria-labelledby="profile-points-title">
              <span className={styles.eyebrow}>Participação</span><h2 id="profile-points-title">Origem dos pontos</h2><p>Pontos registram participação; competências continuam sendo avaliadas à parte.</p>
              {model.pointSources.length > 0 ? (
                <ul>{model.pointSources.map((source) => <li key={source.id}><div><strong>{source.label}</strong><span>{source.status === "confirmed" ? "Confirmados" : "Pendentes"}</span></div><b>{source.status === "confirmed" ? "+" : ""}{source.points}</b></li>)}</ul>
              ) : <div className={styles.compactEmpty}><strong>Ainda não há pontos registrados</strong><p>Pontos representam participação e não substituem as competências.</p></div>}
            </aside>
          </section>
        ) : null}

        {section === "achievements" ? (
          <section id="profile-panel-achievements" className={styles.contentPanel} role="tabpanel" aria-labelledby="profile-tab-achievements" tabIndex={0}>
            <div className={styles.editorialHeading}>
              <div><span className={styles.eyebrow}>Marcos pessoais</span><h2>Conquistas que marcam o caminho</h2></div>
              <p>Cada conquista concede 100 pontos nesta etapa. O valor está configurado individualmente para ajustes futuros.</p>
            </div>
            {model.achievements.length > 0 ? (
              <div className={styles.achievementCollection}>
                {model.achievements.map((achievement, index) => (
                  <article key={achievement.id} className={`${styles.achievement}${achievement.unlocked ? ` ${styles.unlocked}` : ` ${styles.locked}`}`} aria-label={`${achievement.title}: ${achievement.unlocked ? "Conquistada" : "Em andamento"}`}>
                    <div className={styles.achievementMark} aria-hidden="true"><svg viewBox="0 0 68 76"><path d="M34 3 62 14v22c0 18-11 30-28 37C17 66 6 54 6 36V14z" /></svg><span>{String(index + 1).padStart(2, "0")}</span></div>
                    <div className={styles.achievementCopy}><span>{achievement.unlocked ? "Conquistada" : "Em andamento"}</span><h3>{achievement.title}</h3><p>{achievement.description}</p><small>{achievement.condition}</small></div>
                    <div className={styles.achievementStatus}>
                      <div className={styles.achievementProgress} role="progressbar" aria-label={`Progresso de ${achievement.title}`} aria-valuemin={0} aria-valuemax={achievement.target} aria-valuenow={achievement.current} aria-valuetext={achievement.unlocked ? "Conquista concluída" : `${achievement.current} de ${achievement.target}`}><span style={{ width: `${getProgressPercentage(achievement.current, achievement.target)}%` }} /></div>
                      <div><strong>+{achievement.rewardPoints} pontos</strong><span>{achievement.unlockedAt ? `Em ${achievement.unlockedAt}` : `${achievement.current} de ${achievement.target}`}</span></div>
                    </div>
                  </article>
                ))}
              </div>
            ) : <div className={styles.emptyState}><span className={styles.emptyMark} aria-hidden="true">★</span><div><strong>Seus próximos marcos aparecerão aqui</strong><p>Continue a jornada para descobrir conquistas reais.</p></div></div>}
          </section>
        ) : null}

        {section === "preferences" ? (
          <section id="profile-panel-preferences" className={styles.preferencesPanel} role="tabpanel" aria-labelledby="profile-tab-preferences" tabIndex={0}>
            <form className={styles.preferences} onSubmit={(event) => { event.preventDefault(); save(); }}>
              <header className={styles.preferencesHeader}>
                <div><span className={styles.eyebrow}>Controle pessoal</span><h2>Preferências</h2><p>Estas escolhas ficam associadas à sua conta.</p></div>
                <div>
                  <button type="button" className="text-button" onClick={onLogout}>Sair desta conta <span aria-hidden="true">→</span></button>
                  <button type="button" className="text-button" data-tour-start disabled={!isHydrated} onClick={(event) => onOpenTutorial(event.currentTarget)}>{tutorialCompleted ? "Rever tutorial do portal" : "Iniciar tutorial do portal"}<span aria-hidden="true"> →</span></button>
                </div>
              </header>

              <fieldset>
                <legend>Acessibilidade</legend>
                <Toggle checked={draft.highContrast} label="Alto contraste" description="Reforça bordas, textos e controles da plataforma." onChange={(value) => updateDraft("highContrast", value)} />
                <label className={styles.selectRow}><span><strong>Tamanho do texto</strong><small>Aumenta o texto sem alterar o conteúdo.</small></span><select value={draft.textSize} onChange={(event) => updateDraft("textSize", event.target.value as LearnerPreferences["textSize"])}><option value="default">Padrão</option><option value="large">Grande</option><option value="extraLarge">Muito grande</option></select></label>
                <Toggle checked={draft.reducedMotion} label="Reduzir movimentos" description="Remove rolagens e transições animadas sempre que possível." onChange={(value) => updateDraft("reducedMotion", value)} />
                <Toggle checked={draft.soundEnabled} label="Sons de interface" description="Deixa sons futuros habilitados; nenhum som é reproduzido nesta versão." onChange={(value) => updateDraft("soundEnabled", value)} />
                <Toggle checked={draft.captionsEnabled} label="Legendas em mídias" description="Mantém legendas futuras ativadas. Textos alternativos continuam obrigatórios." onChange={(value) => updateDraft("captionsEnabled", value)} />
              </fieldset>

              <fieldset>
                <legend>Privacidade</legend>
                <Toggle checked={draft.leaderboardParticipation} label="Participar de rankings individuais" description="Desativado por padrão. Rankings coletivos continuam usando somente dados agregados." onChange={(value) => updateDraft("leaderboardParticipation", value)} />
                <label className={`${styles.selectRow}${!draft.leaderboardParticipation ? ` ${styles.disabled}` : ""}`}><span><strong>Identidade no ranking</strong><small>A escolha é mantida mesmo quando a participação está desligada.</small></span><select disabled={!draft.leaderboardParticipation} value={draft.leaderboardIdentity} onChange={(event) => updateDraft("leaderboardIdentity", event.target.value as LearnerPreferences["leaderboardIdentity"])}><option value="initials">Iniciais</option><option value="displayName">Nome de exibição</option><option value="anonymous">Anônimo</option></select></label>
                <div className={styles.privacyMatrix} role="note"><strong>O que fica visível</strong><p><span>Somente você:</span> tentativas, erros, notas, preferências e conquistas.</p><p><span>Equipe:</span> apenas indicadores e contribuições agregadas.</p><p><span>Demonstração local:</span> dados permanecem neste navegador até reiniciar a demo ou limpar o armazenamento.</p></div>
              </fieldset>

              <fieldset>
                <legend>Notificações e lembretes</legend>
                <Toggle checked={draft.notificationsEnabled} label="Ativar notificações" description="Controla preferências futuras; não solicita permissão do navegador nem envia mensagens." onChange={(value) => updateDraft("notificationsEnabled", value)} />
                <div className={styles.notificationGrid}>
                  <Toggle disabled={!draft.notificationsEnabled} checked={draft.notificationMission} label="Novas Missões" description="Avisos sobre conteúdos da jornada." onChange={(value) => updateDraft("notificationMission", value)} />
                  <Toggle disabled={!draft.notificationsEnabled} checked={draft.notificationReview} label="Revisões recomendadas" description="Lembretes de práticas adaptativas." onChange={(value) => updateDraft("notificationReview", value)} />
                  <Toggle disabled={!draft.notificationsEnabled} checked={draft.notificationArcade} label="Novidades do Arcade" description="Avisos quando jogos forem integrados." onChange={(value) => updateDraft("notificationArcade", value)} />
                  <Toggle disabled={!draft.notificationsEnabled} checked={draft.notificationTeam} label="Metas da equipe" description="Atualizações coletivas, nunca resultados individuais." onChange={(value) => updateDraft("notificationTeam", value)} />
                  <Toggle disabled={!draft.notificationsEnabled} checked={draft.notificationRadar} label="Radar de Segurança" description="Novos conteúdos curtos do Radar." onChange={(value) => updateDraft("notificationRadar", value)} />
                </div>
                <label className={`${styles.selectRow}${!draft.notificationsEnabled ? ` ${styles.disabled}` : ""}`}><span><strong>Frequência dos lembretes</strong><small>Preferência preparada para a integração futura.</small></span><select disabled={!draft.notificationsEnabled} value={draft.reminderFrequency} onChange={(event) => updateDraft("reminderFrequency", event.target.value as LearnerPreferences["reminderFrequency"])}><option value="important">Somente importantes</option><option value="weekly">Resumo semanal</option><option value="off">Sem lembretes</option></select></label>
              </fieldset>

              <div className={styles.saveBar}><p aria-live="polite">{saveMessage || (isDirty ? "Existem alterações ainda não salvas." : "Preferências atualizadas.")}</p><button type="submit" className="primary-button dark" disabled={!isHydrated || !isDirty}>Salvar preferências</button></div>
            </form>
          </section>
        ) : null}
      </div>
    </div>
  );
}
