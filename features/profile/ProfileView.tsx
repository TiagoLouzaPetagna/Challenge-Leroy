"use client";

import { useEffect, useMemo, useState } from "react";

import type { LearnerPreferences } from "@/lib/domain/types";

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
    <label className={`profile-toggle${disabled ? " disabled" : ""}`}>
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

export function ProfileView({
  model,
  initialSection = "summary",
  preferences,
  isHydrated,
  onSavePreferences,
  onPreviewPreferences,
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

  const renderActivityList = (events: ProfileHistoryView[]) => (
    <ol className="profile-activity-list">
      {events.map((event) => (
        <li key={event.id}>
          <span aria-hidden="true" />
          <div>
            <small className="profile-activity-category">{event.categoryLabel}</small>
            <strong>{event.title}</strong>
            <p>{event.detail}</p>
            <div className="profile-activity-footer">
              <small>{event.date}</small>
              <button
                type="button"
                className="text-button"
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

  return (
    <div className="page-stack profile-page">
      <section className="profile-hero">
        <div className="profile-identity">
          <span className="section-badge">Painel privado de evolução</span>
          <p className="profile-privacy">Visível somente para você</p>
          <h1>{model.learnerName}</h1>
          <p>{model.location}</p>
          <button type="button" className="text-button light" onClick={onBackToOverview}>
            Voltar à visão geral <span aria-hidden="true">→</span>
          </button>
        </div>

        <div className="profile-level-card">
          <span>Nível geral</span>
          <strong>{model.levelLabel}</strong>
          <p>{model.totalPoints} pontos confirmados</p>
          <div
            className="profile-level-track"
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
      </section>

      <nav className="profile-section-nav" aria-label="Áreas de Meu perfil">
        {PROFILE_SECTIONS.map((item) => (
          <button
            key={item.id}
            type="button"
            className={section === item.id ? "active" : ""}
            aria-current={section === item.id ? "page" : undefined}
            onClick={() => setSection(item.id)}
          >
            {item.label}
          </button>
        ))}
      </nav>

      {section === "summary" ? (
        <>
          <section className="profile-summary-grid" aria-label="Resumo da evolução">
            <article>
              <span>Jornada principal</span>
              <strong>{model.journeyProgress}%</strong>
              <p>{model.journeyCompleted} de {model.journeyTotal} Missões concluídas</p>
            </article>
            <article>
              <span>Melhor resultado</span>
              <strong>{model.bestMissionScore === null ? "—" : `${model.bestMissionScore}/100`}</strong>
              <p>
                {model.bestMissionScore === null
                  ? "Conclua a primeira Missão"
                  : `Missão ${model.bestMissionTitle ?? "concluída"}`}
              </p>
            </article>
            <article>
              <span>Escudo da equipe</span>
              <strong>{model.teamShield}%</strong>
              <p>Sua contribuição individual permanece privada</p>
            </article>
          </section>

          <section className={model.review ? "profile-review active" : "profile-review clear"}>
            <div>
              <span className="section-kicker">Próximo desenvolvimento</span>
              <h2>{model.review ? model.review.title : "Nenhuma revisão pendente"}</h2>
              <p>{model.review ? model.review.reason : "Quando uma atividade indicar dificuldade, a plataforma recomendará uma prática sem bloquear a jornada."}</p>
            </div>
            <button type="button" className="primary-button dark" onClick={model.review ? onOpenReview : onOpenMission}>
              {model.review ? model.review.targetLabel : model.bestMissionScore === null ? "Iniciar primeira Missão" : "Ver jornada de Missões"}
            </button>
          </section>

          <section className="profile-recent-activity" aria-labelledby="profile-recent-activity-title">
            <div className="panel-heading">
              <div>
                <span className="section-kicker">Sua jornada</span>
                <h2 id="profile-recent-activity-title">Atividade recente</h2>
              </div>
              {model.history.length > 0 ? (
                <button
                  type="button"
                  className="text-button"
                  onClick={() => setSection("history")}
                >
                  Ver histórico completo <span aria-hidden="true">→</span>
                </button>
              ) : null}
            </div>
            {model.history.length > 0 ? (
              renderActivityList(model.history.slice(0, 3))
            ) : (
              <div className="profile-empty-state">
                <strong>Sua atividade aparecerá aqui</strong>
                <p>Conclua a primeira Missão para registrar resultado, pontos e competências.</p>
                <button type="button" className="text-button" onClick={onOpenMission}>
                  Iniciar primeira Missão <span aria-hidden="true">→</span>
                </button>
              </div>
            )}
          </section>

          <section className="profile-arcade-panel">
            <div>
              <span className="section-kicker">Arcade</span>
              <h2>Desempenho separado por jogo</h2>
              <p>O Arcade permanece como catálogo. Nenhuma partida ou pontuação fictícia é incorporada ao perfil.</p>
              <button type="button" className="text-button" onClick={onOpenArcade}>
                Abrir catálogo do Arcade <span aria-hidden="true">→</span>
              </button>
            </div>
            <div className="profile-arcade-metrics">
              <span><strong>{model.arcadeSummary.gamesPlayed}</strong> jogos disputados</span>
              <span><strong>{model.arcadeSummary.bestPosition ?? "—"}</strong> melhor posição</span>
              <span><strong>{model.arcadeSummary.points}</strong> pontos do Arcade</span>
              <small>{model.arcadeSummary.catalogStatus}</small>
            </div>
          </section>

          <section className="profile-team-panel">
            <div>
              <span className="section-kicker inverse">Contribuição privada</span>
              <h2>{model.teamName}</h2>
              <p>Sua participação ajuda o grupo sem publicar erros, notas ou decisões individuais.</p>
            </div>
            <div className="profile-team-metrics">
              <span><strong>{model.teamContributionStatus.label}</strong> contribuição ao placar</span>
              <small>{model.teamContributionStatus.detail}</small>
              <span><strong>{model.teamShield}%</strong> escudo coletivo</span>
            </div>
          </section>
        </>
      ) : null}

      {section === "competencies" ? (
        <section className="content-section compact profile-competencies">
          <div className="section-heading-row">
            <div><span className="section-kicker">Aprendizagem</span><h2>Mapa de competências</h2></div>
            <p>Cada nível é sustentado por evidências. Um resultado baixo recomenda revisão, mas não apaga uma habilidade demonstrada.</p>
          </div>
          <div className="profile-competency-grid">
            {model.competencies.map((competency) => (
              <article key={competency.id} className={competency.score === null ? "not-assessed" : ""}>
                <div><span>{competency.label}</span><strong>{competency.level}</strong></div>
                <div className="profile-competency-track" role="progressbar" aria-label={`Competência ${competency.label}`} aria-valuemin={0} aria-valuemax={100} aria-valuenow={competency.score ?? 0}>
                  <span style={{ width: `${competency.score ?? 0}%` }} />
                </div>
                <p>{competency.evidence}</p>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {section === "history" ? (
        <section className="profile-detail-grid">
          <article className="profile-history-panel">
            <div className="panel-heading"><div><span className="section-kicker">Atividades</span><h2>Histórico de atividades</h2></div></div>
            {model.history.length > 0 ? (
              renderActivityList(model.history)
            ) : (
              <div className="profile-empty-state"><strong>O histórico começa com sua primeira atividade</strong><p>Conclusões, recompensas e conquistas aparecerão aqui.</p><button type="button" className="text-button" onClick={onOpenMission}>Abrir Missões <span aria-hidden="true">→</span></button></div>
            )}
          </article>
          <article className="profile-points-panel">
            <div className="panel-heading"><div><span className="section-kicker">Participação</span><h2>Origem dos pontos</h2></div></div>
            {model.pointSources.length > 0 ? (
              <ul>{model.pointSources.map((source) => <li key={source.id}><div><strong>{source.label}</strong><span>{source.status === "confirmed" ? "Confirmados" : "Pendentes"}</span></div><b>{source.status === "confirmed" ? "+" : ""}{source.points}</b></li>)}</ul>
            ) : (
              <div className="profile-empty-state"><strong>Ainda não há pontos registrados</strong><p>Pontos representam participação e não substituem as competências.</p></div>
            )}
          </article>
        </section>
      ) : null}

      {section === "achievements" ? (
        <section className="content-section compact profile-achievements">
          <div className="section-heading-row">
            <div><span className="section-kicker">Marcos pessoais</span><h2>Conquistas</h2></div>
            <p>Cada conquista concede 100 pontos nesta etapa. O valor está configurado individualmente para ajustes futuros.</p>
          </div>
          <div className="profile-achievement-grid">
            {model.achievements.map((achievement) => (
              <article key={achievement.id} className={achievement.unlocked ? "unlocked" : "locked"}>
                <div className="achievement-mark" aria-hidden="true">{achievement.unlocked ? "✓" : "◇"}</div>
                <span>{achievement.unlocked ? "Conquistada" : "Em andamento"}</span>
                <h3>{achievement.title}</h3>
                <p>{achievement.description}</p>
                <small>{achievement.condition}</small>
                <div className="achievement-progress" role="progressbar" aria-label={`Progresso de ${achievement.title}`} aria-valuemin={0} aria-valuemax={achievement.target} aria-valuenow={achievement.current}>
                  <span style={{ width: `${Math.round((achievement.current / achievement.target) * 100)}%` }} />
                </div>
                <footer>
                  <strong>+{achievement.rewardPoints} pontos</strong>
                  <span>{achievement.unlockedAt ? `Em ${achievement.unlockedAt}` : `${achievement.current} de ${achievement.target}`}</span>
                </footer>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {section === "preferences" ? (
        <form className="profile-preferences" onSubmit={(event) => { event.preventDefault(); save(); }}>
          <header>
            <div><span className="section-kicker">Controle pessoal</span><h2>Preferências</h2></div>
            <div className="profile-preferences-intro">
              <p>As escolhas abaixo ficam apenas neste navegador durante a demonstração.</p>
              <button
                type="button"
                className="text-button"
                data-tour-start
                disabled={!isHydrated}
                onClick={(event) => onOpenTutorial(event.currentTarget)}
              >
                {tutorialCompleted ? "Rever tutorial do portal" : "Iniciar tutorial do portal"}
                <span aria-hidden="true"> →</span>
              </button>
            </div>
          </header>

          <fieldset>
            <legend>Acessibilidade</legend>
            <Toggle checked={draft.highContrast} label="Alto contraste" description="Reforça bordas, textos e controles da plataforma." onChange={(value) => updateDraft("highContrast", value)} />
            <label className="profile-select"><span><strong>Tamanho do texto</strong><small>Aumenta o texto sem alterar o conteúdo.</small></span><select value={draft.textSize} onChange={(event) => updateDraft("textSize", event.target.value as LearnerPreferences["textSize"])}><option value="default">Padrão</option><option value="large">Grande</option><option value="extraLarge">Muito grande</option></select></label>
            <Toggle checked={draft.reducedMotion} label="Reduzir movimentos" description="Remove rolagens e transições animadas sempre que possível." onChange={(value) => updateDraft("reducedMotion", value)} />
            <Toggle checked={draft.soundEnabled} label="Sons de interface" description="Deixa sons futuros habilitados; nenhum som é reproduzido nesta versão." onChange={(value) => updateDraft("soundEnabled", value)} />
            <Toggle checked={draft.captionsEnabled} label="Legendas em mídias" description="Mantém legendas futuras ativadas. Textos alternativos continuam obrigatórios." onChange={(value) => updateDraft("captionsEnabled", value)} />
          </fieldset>

          <fieldset>
            <legend>Privacidade</legend>
            <Toggle checked={draft.leaderboardParticipation} label="Participar de rankings individuais" description="Desativado por padrão. Rankings coletivos continuam usando somente dados agregados." onChange={(value) => updateDraft("leaderboardParticipation", value)} />
            <label className={`profile-select${!draft.leaderboardParticipation ? " disabled" : ""}`}><span><strong>Identidade no ranking</strong><small>A escolha é mantida mesmo quando a participação está desligada.</small></span><select disabled={!draft.leaderboardParticipation} value={draft.leaderboardIdentity} onChange={(event) => updateDraft("leaderboardIdentity", event.target.value as LearnerPreferences["leaderboardIdentity"])}><option value="initials">Iniciais</option><option value="displayName">Nome de exibição</option><option value="anonymous">Anônimo</option></select></label>
            <div className="profile-privacy-matrix" role="note"><strong>O que fica visível</strong><p><span>Somente você:</span> tentativas, erros, notas, preferências e conquistas.</p><p><span>Equipe:</span> apenas indicadores e contribuições agregadas.</p><p><span>Demonstração local:</span> dados permanecem neste navegador até reiniciar a demo ou limpar o armazenamento.</p></div>
          </fieldset>

          <fieldset>
            <legend>Notificações e lembretes</legend>
            <Toggle checked={draft.notificationsEnabled} label="Ativar notificações" description="Controla preferências futuras; não solicita permissão do navegador nem envia mensagens." onChange={(value) => updateDraft("notificationsEnabled", value)} />
            <div className="profile-notification-grid">
              <Toggle disabled={!draft.notificationsEnabled} checked={draft.notificationMission} label="Novas Missões" description="Avisos sobre conteúdos da jornada." onChange={(value) => updateDraft("notificationMission", value)} />
              <Toggle disabled={!draft.notificationsEnabled} checked={draft.notificationReview} label="Revisões recomendadas" description="Lembretes de práticas adaptativas." onChange={(value) => updateDraft("notificationReview", value)} />
              <Toggle disabled={!draft.notificationsEnabled} checked={draft.notificationArcade} label="Novidades do Arcade" description="Avisos quando jogos forem integrados." onChange={(value) => updateDraft("notificationArcade", value)} />
              <Toggle disabled={!draft.notificationsEnabled} checked={draft.notificationTeam} label="Metas da equipe" description="Atualizações coletivas, nunca resultados individuais." onChange={(value) => updateDraft("notificationTeam", value)} />
              <Toggle disabled={!draft.notificationsEnabled} checked={draft.notificationRadar} label="Radar de Segurança" description="Novos conteúdos curtos do Radar." onChange={(value) => updateDraft("notificationRadar", value)} />
            </div>
            <label className={`profile-select${!draft.notificationsEnabled ? " disabled" : ""}`}><span><strong>Frequência dos lembretes</strong><small>Preferência preparada para a integração futura.</small></span><select disabled={!draft.notificationsEnabled} value={draft.reminderFrequency} onChange={(event) => updateDraft("reminderFrequency", event.target.value as LearnerPreferences["reminderFrequency"])}><option value="important">Somente importantes</option><option value="weekly">Resumo semanal</option><option value="off">Sem lembretes</option></select></label>
          </fieldset>

          <div className="profile-save-bar">
            <p aria-live="polite">{saveMessage || (isDirty ? "Existem alterações ainda não salvas." : "Preferências atualizadas.")}</p>
            <button type="submit" className="primary-button dark" disabled={!isHydrated || !isDirty}>Salvar preferências</button>
          </div>
        </form>
      ) : null}
    </div>
  );
}
