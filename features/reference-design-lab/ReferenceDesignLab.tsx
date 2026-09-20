"use client";

import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  AtSign,
  CircleCheck,
  Clock3,
  Flame,
  Layers3,
  Lightbulb,
  LockKeyhole,
  Mail,
  MailWarning,
  Play,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  Trophy,
  type LucideIcon,
} from "lucide-react";
import { useState, type DragEvent } from "react";

import styles from "./ReferenceDesignLab.module.css";

type ScreenId = "home" | "missions" | "mission";
type SignalId = "" | "sender" | "deadline" | "code";

const SCREEN_OPTIONS: readonly { id: ScreenId; label: string }[] = [
  { id: "home", label: "Início" },
  { id: "missions", label: "Missões" },
  { id: "mission", label: "Missão 01" },
];

function Icon({ icon: Component, size = 20 }: { icon: LucideIcon; size?: number }) {
  return <Component size={size} strokeWidth={2} aria-hidden="true" />;
}

function FlatLeroyzin({ pose, alt, className = "" }: { pose: "investigating" | "celebrating"; alt: string; className?: string }) {
  const source = pose === "investigating"
    ? "/reference-brilliant/leroyzin-investigando-2d.png"
    : "/reference-brilliant/leroyzin-comemorando-2d.png";

  return (
    <span className={`${styles.flatLeroyzin} ${className}`}>
      <Image src={source} alt={alt} fill unoptimized sizes="(max-width: 720px) 260px, 420px" />
    </span>
  );
}

function LabControls({ screen, onScreen }: { screen: ScreenId; onScreen: (screen: ScreenId) => void }) {
  return (
    <header className={styles.labControls}>
      <div className={styles.labTitle}>
        <span>Campo de teste · páginas originais preservadas</span>
        <strong>Direção Brilliant</strong>
        <p>Pensar manipulando o problema</p>
      </div>
      <div className={styles.screenTabs} aria-label="Páginas do teste">
        {SCREEN_OPTIONS.map((item) => (
          <button key={item.id} type="button" aria-pressed={screen === item.id} onClick={() => onScreen(item.id)}>{item.label}</button>
        ))}
      </div>
    </header>
  );
}

function CasaMark({ compact = false }: { compact?: boolean }) {
  return (
    <span className={styles.casaMark}>
      <span><Icon icon={ShieldCheck} size={compact ? 18 : 21} /></span>
      <strong>{compact ? "Casa Digital" : "Casa Digital Segura"}</strong>
    </span>
  );
}

function BrilliantNav({ screen, onNavigate }: { screen: Exclude<ScreenId, "mission">; onNavigate: (screen: ScreenId) => void }) {
  return (
    <header className={styles.brilliantNav}>
      <CasaMark />
      <nav aria-label="Navegação principal do protótipo">
        <button type="button" className={screen === "home" ? styles.brilliantNavActive : undefined} onClick={() => onNavigate("home")}>Hoje</button>
        <button type="button" className={screen === "missions" ? styles.brilliantNavActive : undefined} onClick={() => onNavigate("missions")}>Cursos</button>
        <span>Prática</span>
      </nav>
      <div className={styles.brilliantStats}>
        <span><Icon icon={Flame} size={18} />3 dias</span>
        <span><Icon icon={Star} size={18} />320 XP</span>
      </div>
    </header>
  );
}

function MissionEmail({ compact = false }: { compact?: boolean }) {
  return (
    <article className={`${styles.missionEmail} ${compact ? styles.missionEmailCompact : ""}`}>
      <header><span className={styles.senderAvatar}>AS</span><div><strong>André Silva</strong><small>Suporte de Identidade</small></div><time>08:12</time></header>
      <h3>Falha no acesso — validação necessária</h3>
      <p>Responda com o código de seis dígitos para evitar o bloqueio em 10 minutos.</p>
      <span className={styles.codeChip}>••• •••</span>
    </article>
  );
}

function BrilliantHome({ onNavigate }: { onNavigate: (screen: ScreenId) => void }) {
  const [signal, setSignal] = useState<SignalId>("");
  const signals = [
    { id: "sender", label: "Nome do remetente", icon: AtSign },
    { id: "deadline", label: "Prazo de 10 minutos", icon: Clock3 },
    { id: "code", label: "Código temporário", icon: LockKeyhole },
  ] as const;

  function receiveSignal(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    const id = event.dataTransfer.getData("text/plain") as SignalId;
    if (signals.some((item) => item.id === id)) setSignal(id);
  }

  return (
    <main className={styles.brilliantHome}>
      <section className={styles.brilliantHomeHero}>
        <div className={styles.brilliantHomeCopy}>
          <span>TREINO DE HOJE</span>
          <h1>Aprenda a pensar antes de responder.</h1>
          <p>Descubra o que uma mensagem tenta obter e pratique uma decisão segura em poucos minutos.</p>
          <button type="button" onClick={() => onNavigate("mission")}><Icon icon={Play} />Começar a lição</button>
        </div>
        <div className={styles.brilliantHeroArt}>
          <Image className={styles.editorialScene} src="/reference-brilliant/estudio-investigacao-2d.png" alt="Leroyzin compara uma mensagem suspeita com o portal oficial" fill unoptimized sizes="(max-width: 1000px) 90vw, 560px" />
          <div className={styles.artCaption}><small>NO ESTÚDIO</small><strong>Compare a mensagem com uma fonte oficial.</strong></div>
        </div>
      </section>

      <section className={styles.brilliantQuickTry}>
        <header><div><span>EXPERIMENTE</span><h2>O que realmente entrega acesso?</h2></div><p>Arraste uma opção para a área ao lado. Você também pode tocar.</p></header>
        <div className={styles.brilliantQuickWorkspace}>
          <div className={styles.brilliantSignalPieces}>
            {signals.map((item) => <button key={item.id} type="button" draggable onDragStart={(event) => event.dataTransfer.setData("text/plain", item.id)} onClick={() => setSignal(item.id)} aria-pressed={signal === item.id}><Icon icon={item.icon} /><span>{item.label}</span></button>)}
          </div>
          <div className={`${styles.brilliantDropTarget} ${signal ? styles.brilliantDropTargetFilled : ""} ${signal === "code" ? styles.brilliantDropTargetCorrect : ""}`} onDragOver={(event) => event.preventDefault()} onDrop={receiveSignal} aria-live="polite">
            <span><Icon icon={signal === "code" ? ShieldCheck : Target} size={27} /></span>
            <div><small>CONSEQUÊNCIA</small><strong>{signal ? (signal === "code" ? "O código funciona como uma chave temporária." : "Isso influencia a decisão, mas não abre a conta.") : "Solte aqui o pedido mais perigoso"}</strong></div>
          </div>
        </div>
      </section>

      <section className={styles.brilliantHomeCourse}>
        <div className={styles.courseIdentity}><span><Icon icon={Layers3} /></span><div><small>ARQUIVO ATUAL</small><h2>Confiança sob pressão</h2><p>O primeiro caso está aberto</p></div></div>
        <div className={styles.brilliantHomeProgress}><span><i /></span><strong>1 de 5</strong></div>
        <button type="button" onClick={() => onNavigate("missions")}>Abrir arquivo <Icon icon={ArrowRight} /></button>
      </section>
    </main>
  );
}

type CaseState = "current" | "next" | "locked" | "review";

function BrilliantMissions({ onNavigate }: { onNavigate: (screen: ScreenId) => void }) {
  const cases: readonly { number: string; skill: string; title: string; meta: string; description: string; objective: string; image: string; icon: LucideIcon; state: CaseState }[] = [
    { number: "CASO 01", skill: "PEDIDO", title: "O aviso que não podia esperar", meta: "9 min · 3 atividades", description: "Uma mensagem usa urgência para pedir um código temporário.", objective: "Descobrir qual pedido produz o risco e confirmar a situação por uma fonte oficial.", image: "/reference-brilliant/caso-aviso-urgente-2d.png", icon: MailWarning, state: "current" },
    { number: "CASO 02", skill: "ORIGEM", title: "Quem enviou de verdade?", meta: "7 min · PhishLab", description: "Nome, endereço e identidade parecem combinar — até você comparar os detalhes.", objective: "Separar a identidade exibida da origem real da mensagem.", image: "/reference-brilliant/caso-identidade-remetente-2d.png", icon: AtSign, state: "next" },
    { number: "CASO 03", skill: "ENDEREÇO", title: "Domínio sob a lupa", meta: "8 min · PhishLab", description: "Dois endereços quase iguais levam a lugares completamente diferentes.", objective: "Ler um domínio por partes antes de confiar na página.", image: "/reference-brilliant/caso-dominio-2d.png", icon: Search, state: "locked" },
    { number: "CASO 04", skill: "CONTEXTO", title: "A conversa já estava acontecendo", meta: "11 min · Missão", description: "Uma mensagem verdadeira pode ser usada como cenário para uma fraude.", objective: "Conferir o contexto sem confiar apenas no histórico da conversa.", image: "/reference-brilliant/estudio-investigacao-2d.png", icon: Mail, state: "locked" },
    { number: "CASO 05", skill: "DECISÃO", title: "Feche o arquivo", meta: "Desafio do nível", description: "Reúna todas as pistas e explique sua decisão antes de agir.", objective: "Aplicar pedido, origem, endereço e contexto em um caso completo.", image: "/reference-brilliant/estudio-investigacao-2d.png", icon: Trophy, state: "review" },
  ];
  const [selectedCase, setSelectedCase] = useState(0);
  const activeCase = cases[selectedCase];
  const ActiveIcon = activeCase.icon;
  const stateLabels: Record<CaseState, string> = { current: "Aberto", next: "Em seguida", locked: "Lacrado", review: "Fechamento" };

  return (
    <main className={styles.brilliantCourses}>
      <section className={styles.brilliantCourseHero}>
        <div className={styles.brilliantCourseIntro}>
          <span>ARQUIVO DE INVESTIGAÇÃO 01</span><h1>Confiança sob pressão</h1><p>Cada caso acrescenta uma peça ao seu método de decisão. Abra, investigue e registre o que aprendeu.</p>
          <div className={styles.courseMeta}><span><Icon icon={Layers3} />5 casos</span><span><Icon icon={Sparkles} />13 atividades</span></div>
          <div className={styles.courseProgressLabel}><strong>Casos disponíveis</strong><span>1 de 5</span></div>
          <div className={styles.courseProgress}><span /></div>
        </div>
        <div className={styles.brilliantCourseArt}><Image src="/reference-brilliant/estudio-investigacao-2d.png" alt="Estúdio de investigação do Leroyzin" fill unoptimized sizes="(max-width: 1000px) 90vw, 390px" /><span>OBSERVE · COMPARE · CONFIRME</span></div>
      </section>

      <section className={styles.caseArchive}>
        <header>
          <div><span>NÍVEL 1 · ARQUIVO DE CASOS</span><h2>Pare, avalie e confirme</h2><p>Escolha um caso no índice. O dossiê mostra o objetivo e o que será treinado.</p></div>
          <div className={styles.archiveProgress}><strong>1 caso aberto</strong><div><span /></div><small>Os demais abrem em sequência</small></div>
        </header>

        <div className={styles.caseWorkspace}>
          <article className={styles.caseDossier}>
            <div className={styles.caseDossierImage}>
              <Image src={activeCase.image} alt="Ilustração do caso selecionado" fill unoptimized sizes="(max-width: 820px) 90vw, 620px" />
              <span className={styles.caseState}><ActiveIcon />{stateLabels[activeCase.state]}</span>
              <span className={styles.caseNumber}>{activeCase.number}</span>
            </div>
            <div className={styles.caseDossierBody}>
              <span className={styles.caseSkill}>HABILIDADE · {activeCase.skill}</span>
              <h3>{activeCase.title}</h3>
              <p>{activeCase.description}</p>
              <div className={styles.caseObjective}><Icon icon={Target} /><div><small>OBJETIVO DO CASO</small><strong>{activeCase.objective}</strong></div></div>
              <footer>
                <span><Icon icon={Clock3} />{activeCase.meta}</span>
                {activeCase.state === "current" ? <button type="button" onClick={() => onNavigate("mission")}>Começar investigação <Icon icon={ArrowRight} /></button> : <span className={styles.caseLocked}><Icon icon={LockKeyhole} />Disponível após o caso anterior</span>}
              </footer>
            </div>
          </article>

          <aside className={styles.caseIndex}>
            <header><span>ÍNDICE DO ARQUIVO</span><strong>5 casos, 5 habilidades</strong><p>Selecione um caso para ver seu dossiê.</p></header>
            <div className={styles.caseIndexList}>
              {cases.map((item, index) => {
                const CaseIcon = item.icon;
                return <button key={item.title} type="button" aria-pressed={selectedCase === index} onClick={() => setSelectedCase(index)}>
                  <span className={styles.caseThumb}><Image src={item.image} alt="" fill unoptimized sizes="82px" /></span>
                  <span className={styles.caseIndexCopy}><small>{item.number} · {item.skill}</small><strong>{item.title}</strong><span>{stateLabels[item.state]}</span></span>
                  <span className={styles.caseIndexState}>{item.state === "current" ? <CircleCheck /> : <CaseIcon />}</span>
                </button>;
              })}
            </div>
          </aside>
        </div>

        <div className={styles.skillLedger}>
          <span>SEU MÉTODO</span>
          {cases.map((item, index) => <button key={item.skill} type="button" aria-pressed={selectedCase === index} onClick={() => setSelectedCase(index)}><small>{String(index + 1).padStart(2, "0")}</small><strong>{item.skill}</strong>{item.state === "current" ? <CircleCheck /> : <LockKeyhole />}</button>)}
        </div>
      </section>
    </main>
  );
}

function BrilliantLessonHeader({ step, onBack }: { step: number; onBack: () => void }) {
  return (
    <header className={styles.brilliantLessonHeader}>
      <button type="button" onClick={onBack} aria-label="Voltar ao curso"><Icon icon={ArrowLeft} /></button>
      <div className={styles.brilliantLessonSteps} aria-label={`Etapa ${step + 1} de 4`}>{[0, 1, 2, 3].map((item) => <span key={item} className={item <= step ? styles.brilliantLessonStepActive : undefined} />)}</div>
      <span>{step + 1}/4</span>
    </header>
  );
}

function BrilliantMission({ onBack }: { onBack: () => void }) {
  const [step, setStep] = useState(0);
  const [evidence, setEvidence] = useState<SignalId>("");
  const [route, setRoute] = useState<"" | "portal" | "email">("");
  const pieces = [
    { id: "sender", label: "André Silva · Suporte", icon: AtSign },
    { id: "deadline", label: "Bloqueio em 10 minutos", icon: Clock3 },
    { id: "code", label: "Responda com o código", icon: LockKeyhole },
  ] as const;

  function receiveEvidence(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    const id = event.dataTransfer.getData("text/plain") as SignalId;
    if (pieces.some((item) => item.id === id)) setEvidence(id);
  }

  return (
    <div className={styles.brilliantLesson}>
      <BrilliantLessonHeader step={step} onBack={onBack} />
      <main>
        {step === 0 ? <section className={styles.brilliantLessonOpening}><div className={styles.lessonOpeningArt}><Image src="/reference-brilliant/caso-aviso-urgente-2d.png" alt="Leroyzin investiga uma mensagem urgente" fill unoptimized sizes="(max-width: 820px) 90vw, 560px" /><span>CASO 01 · PEDIDO</span></div><div className={styles.lessonOpeningCopy}><span>LIÇÃO 1 DE 5</span><h1>O aviso que não podia esperar</h1><p>Descubra o que a mensagem tenta obter e confirme a situação por uma fonte segura.</p><div className={styles.lessonBrief}><Icon icon={Target} /><div><small>SUA TAREFA</small><strong>Encontre o pedido perigoso e escolha onde verificar o aviso.</strong></div></div><button type="button" onClick={() => setStep(1)}>Abrir o caso <Icon icon={ArrowRight} /></button></div></section> : null}

        {step === 1 ? <section className={styles.brilliantExercise}>
          <header><span>ENCONTRE A RELAÇÃO</span><h1>Qual trecho pode entregar acesso à conta?</h1><p>Arraste uma opção até a área indicada ou toque para selecionar.</p></header>
          <div className={styles.brilliantEvidenceWorkspace}>
            <MissionEmail compact />
            <div className={styles.brilliantEvidencePieces}>{pieces.map((item) => <button key={item.id} type="button" draggable aria-pressed={evidence === item.id} onDragStart={(event) => event.dataTransfer.setData("text/plain", item.id)} onClick={() => setEvidence(item.id)}><Icon icon={item.icon} /><span>{item.label}</span></button>)}</div>
            <div className={`${styles.brilliantEvidenceDrop} ${evidence ? styles.brilliantEvidenceDropFilled : ""} ${evidence === "code" ? styles.brilliantEvidenceDropCorrect : ""}`} onDragOver={(event) => event.preventDefault()} onDrop={receiveEvidence} aria-live="polite"><Icon icon={evidence === "code" ? ShieldCheck : Target} /><div><small>COLOQUE AQUI</small><strong>{evidence ? (evidence === "code" ? "O código funciona como uma chave temporária." : "Isso cria confiança ou pressão, mas não concede acesso.") : "O pedido que produz o risco"}</strong></div></div>
          </div>
          <footer><button type="button" disabled={evidence !== "code"} onClick={() => setStep(2)}>Continuar <Icon icon={ArrowRight} /></button></footer>
        </section> : null}

        {step === 2 ? <section className={styles.brilliantRouteExercise}>
          <header><span>CONFIRME O FATO</span><h1>Onde você verifica se existe um bloqueio?</h1><p>Escolha uma fonte que possa ser acessada sem depender do e-mail.</p></header>
          <div className={styles.brilliantRouteContext}><Icon icon={MailWarning} /><div><small>PONTO DE PARTIDA</small><strong>A mensagem diz que sua conta será bloqueada.</strong></div></div>
          <div className={styles.brilliantRouteChoices}>
            <button type="button" aria-pressed={route === "portal"} onClick={() => setRoute("portal")}><span><Icon icon={ShieldCheck} /></span><strong>Portal oficial da empresa</strong><small>Você consulta o status da conta diretamente.</small>{route === "portal" ? <Icon icon={CircleCheck} /> : null}</button>
            <button type="button" aria-pressed={route === "email"} onClick={() => setRoute("email")}><span><Icon icon={Mail} /></span><strong>Link ou resposta do e-mail</strong><small>A confirmação ainda depende da mensagem.</small>{route === "email" ? <Icon icon={CircleCheck} /> : null}</button>
          </div>
          {route ? <div className={`${styles.brilliantRouteFeedback} ${route === "portal" ? styles.brilliantRouteFeedbackCorrect : ""}`} aria-live="polite"><Icon icon={route === "portal" ? CircleCheck : Lightbulb} /><p><strong>{route === "portal" ? "Você verificou pela fonte certa." : "Esse caminho ainda depende do remetente."}</strong><span>{route === "portal" ? "No portal, você confere se a conta está ativa e se existe algum aviso de bloqueio." : "Procure uma fonte oficial acessada fora do e-mail."}</span></p></div> : null}
          <footer><button type="button" disabled={route !== "portal"} onClick={() => setStep(3)}>Ver conclusão <Icon icon={ArrowRight} /></button></footer>
        </section> : null}

        {step === 3 ? <section className={styles.brilliantLessonFinish}><FlatLeroyzin pose="celebrating" alt="Leroyzin comemora a conclusão" /><span>LIÇÃO CONCLUÍDA</span><h1>Você transformou urgência em uma decisão segura.</h1><div className={styles.brilliantIdeaChain}><span>Pedido</span><Icon icon={ArrowRight} /><span>Consequência</span><Icon icon={ArrowRight} /><span>Fonte oficial</span></div><p>O código entrega acesso. O portal mostra se a conta está ativa e se existe um aviso de bloqueio.</p><strong>+80 XP</strong><button type="button" onClick={onBack}>Voltar ao curso</button></section> : null}
      </main>
    </div>
  );
}

function BrilliantShell({ screen, onNavigate }: { screen: Exclude<ScreenId, "mission">; onNavigate: (screen: ScreenId) => void }) {
  return <div className={`${styles.brilliantApp} ${screen === "missions" ? styles.brilliantAppDark : ""}`}><BrilliantNav screen={screen} onNavigate={onNavigate} />{screen === "home" ? <BrilliantHome onNavigate={onNavigate} /> : <BrilliantMissions onNavigate={onNavigate} />}</div>;
}

export function ReferenceDesignLab() {
  const [screen, setScreen] = useState<ScreenId>("home");

  function navigate(next: ScreenId) {
    setScreen(next);
    window.scrollTo({ top: 0, behavior: "auto" });
  }

  return (
    <div className={styles.page}>
      <LabControls screen={screen} onScreen={navigate} />
      <section className={styles.prototypeFrame} aria-label="Proposta visual inspirada no Brilliant">
        {screen !== "mission" ? <BrilliantShell screen={screen} onNavigate={navigate} /> : <BrilliantMission onBack={() => navigate("missions")} />}
      </section>
    </div>
  );
}
