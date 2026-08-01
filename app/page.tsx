"use client";

import { useMemo, useState } from "react";

type ViewKey =
  | "inicio"
  | "missoes"
  | "simulacoes"
  | "laboratorio"
  | "arcade"
  | "radar"
  | "equipes"
  | "perfil"
  | "gestao";

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

const navItems: Array<{
  key: ViewKey;
  label: string;
  short: string;
  group: "jornada" | "comunidade" | "projeto";
}> = [
  { key: "inicio", label: "Visão geral", short: "IN", group: "jornada" },
  { key: "missoes", label: "Missões", short: "MI", group: "jornada" },
  {
    key: "simulacoes",
    label: "Simulações",
    short: "SI",
    group: "jornada",
  },
  {
    key: "laboratorio",
    label: "PhishLab",
    short: "PL",
    group: "jornada",
  },
  { key: "arcade", label: "Arcade", short: "AR", group: "jornada" },
  { key: "radar", label: "Radar", short: "RA", group: "comunidade" },
  { key: "equipes", label: "Equipes", short: "EQ", group: "comunidade" },
  { key: "perfil", label: "Meu perfil", short: "PF", group: "comunidade" },
  { key: "gestao", label: "Painel de gestão", short: "GE", group: "projeto" },
];

const sectionContent: Record<Exclude<ViewKey, "inicio">, SectionContent> = {
  missoes: {
    badge: "Jornada contínua",
    title: "Missões que conectam aprendizagem e decisão",
    summary:
      "Aqui entram histórias semanais e temporadas de longo prazo. Cada missão apresenta uma situação, pede uma ação segura e mostra suas consequências.",
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
    badge: "Jogos e competição",
    title: "Minigames que desenvolvem competências reais",
    summary:
      "O Arcade concentra jogos rápidos, torneios e rankings. Cada jogo deve estar ligado a uma competência e alimentar a progressão geral da plataforma.",
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
        title: "Rankings sazonais",
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
      "As atividades individuais contribuem para um escudo coletivo. Lojas e áreas podem cumprir objetivos comuns e acompanhar sua própria evolução.",
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
  key: Exclude<ViewKey, "inicio" | "gestao">;
  label: string;
  title: string;
  summary: string;
  tone: string;
}> = [
  {
    key: "missoes",
    label: "Jornada",
    title: "Missões e temporadas",
    summary:
      "Histórias recorrentes, decisões ramificadas e revisão ao longo do ano.",
    tone: "lime",
  },
  {
    key: "simulacoes",
    label: "Prática",
    title: "Caixa simulada",
    summary:
      "Mensagens legítimas e falsas para investigar, decidir e reportar.",
    tone: "mint",
  },
  {
    key: "laboratorio",
    label: "Análise",
    title: "PhishLab",
    summary:
      "Ferramentas guiadas para links, páginas, QR Codes e incidentes.",
    tone: "blue",
  },
  {
    key: "arcade",
    label: "Gamificação",
    title: "Arcade e rankings",
    summary:
      "Minigames vinculados a competências, torneios e regras equilibradas.",
    tone: "yellow",
  },
  {
    key: "radar",
    label: "Referência",
    title: "Radar de ameaças",
    summary:
      "Alertas atuais, fichas de consulta e acesso ao canal de reporte.",
    tone: "coral",
  },
  {
    key: "equipes",
    label: "Cooperação",
    title: "Escudo coletivo",
    summary:
      "Metas compartilhadas, operações em equipe e reconhecimento da evolução.",
    tone: "forest",
  },
];

const skillBars = [
  { label: "Observar", value: 78 },
  { label: "Investigar", value: 62 },
  { label: "Reportar", value: 54 },
];

function BrandMark() {
  return (
    <span className="brand-mark" aria-hidden="true">
      <span />
    </span>
  );
}

function Sidebar({
  activeView,
  onNavigate,
}: {
  activeView: ViewKey;
  onNavigate: (view: ViewKey) => void;
}) {
  const groups: Array<{
    id: "jornada" | "comunidade" | "projeto";
    label: string;
  }> = [
    { id: "jornada", label: "Minha jornada" },
    { id: "comunidade", label: "Comunidade" },
    { id: "projeto", label: "Visão do projeto" },
  ];

  return (
    <aside className="sidebar">
      <div className="brand-lockup">
        <BrandMark />
        <div>
          <strong>Casa Digital</strong>
          <span>Segura</span>
        </div>
      </div>

      <div className="prototype-tag">Protótipo conceitual</div>

      <nav aria-label="Navegação principal">
        {groups.map((group) => (
          <div className="nav-group" key={group.id}>
            <p>{group.label}</p>
            {navItems
              .filter((item) => item.group === group.id)
              .map((item) => (
                <button
                  type="button"
                  key={item.key}
                  className={activeView === item.key ? "nav-item active" : "nav-item"}
                  onClick={() => onNavigate(item.key)}
                  aria-current={activeView === item.key ? "page" : undefined}
                >
                  <span className="nav-icon" aria-hidden="true">
                    {item.short}
                  </span>
                  <span>{item.label}</span>
                </button>
              ))}
          </div>
        ))}
      </nav>

      <div className="sidebar-note">
        <span className="sidebar-note-kicker">Conceito para</span>
        <strong>LEROY MERLIN</strong>
        <p>Uma experiência contínua de conscientização sobre phishing.</p>
      </div>
    </aside>
  );
}

function Topbar({ onReport }: { onReport: () => void }) {
  return (
    <header className="topbar">
      <div>
        <span className="topbar-kicker">Portal interno de aprendizagem</span>
        <strong>Olá, colaborador</strong>
      </div>
      <div className="topbar-actions">
        <button type="button" className="report-button" onClick={onReport}>
          <span aria-hidden="true">!</span>
          Como reportar
        </button>
        <div className="avatar" aria-label="Perfil demonstrativo do funcionário">
          CO
        </div>
      </div>
    </header>
  );
}

function HomeView({ onNavigate }: { onNavigate: (view: ViewKey) => void }) {
  return (
    <div className="page-stack">
      <section className="hero-panel">
        <div className="hero-copy">
          <div className="hero-label">
            <span /> Missão recomendada
          </div>
          <h1>O próximo passo da sua construção digital</h1>
          <p>
            Aqui aparecerá a atividade mais relevante para o funcionário, escolhida
            conforme sua trilha, função e competências que precisam de revisão.
          </p>
          <div className="hero-actions">
            <button
              type="button"
              className="primary-button"
              onClick={() => onNavigate("missoes")}
            >
              Ver como funcionará
            </button>
            <button
              type="button"
              className="text-button light"
              onClick={() => onNavigate("perfil")}
            >
              Explorar competências <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>
        <div className="hero-house" aria-label="Ilustração abstrata de uma casa protegida">
          <div className="house-roof" />
          <div className="house-body">
            <div className="house-shield">
              <span />
            </div>
            <div className="house-door" />
          </div>
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
        </div>
      </section>

      <section className="status-grid" aria-label="Exemplos de indicadores da plataforma">
        <article className="status-card progress-status">
          <div className="status-heading">
            <span>Exemplo de progresso</span>
            <strong>62%</strong>
          </div>
          <div className="progress-track">
            <span style={{ width: "62%" }} />
          </div>
          <p>Representará a evolução na jornada base, não apenas pontos acumulados.</p>
        </article>
        <article className="status-card shield-status">
          <div className="shield-mini" aria-hidden="true">
            <span />
          </div>
          <div>
            <span>Escudo da equipe</span>
            <strong>Meta coletiva da temporada</strong>
            <p>Somará participação, domínio, reporte e colaboração.</p>
          </div>
        </article>
        <article className="status-card review-status">
          <div className="review-date" aria-hidden="true">
            <strong>↻</strong>
          </div>
          <div>
            <span>Revisão adaptativa</span>
            <strong>Próximo conteúdo sugerido</strong>
            <p>Retomará dificuldades antigas em um novo contexto.</p>
          </div>
        </article>
      </section>

      <section className="content-section">
        <div className="section-heading-row">
          <div>
            <span className="section-kicker">Estrutura da plataforma</span>
            <h2>Mais do que minigames</h2>
          </div>
          <p>
            Cada módulo abaixo mostra o que deverá existir na versão completa e
            como contribuirá para uma experiência contínua.
          </p>
        </div>

        <div className="module-grid">
          {homeModules.map((module) => (
            <button
              type="button"
              className={`module-card tone-${module.tone}`}
              key={module.key}
              onClick={() => onNavigate(module.key)}
            >
              <span className="module-label">{module.label}</span>
              <span className="module-title">{module.title}</span>
              <span className="module-summary">{module.summary}</span>
              <span className="module-link">
                Ver estrutura <span aria-hidden="true">↗</span>
              </span>
            </button>
          ))}
        </div>
      </section>

      <section className="lower-grid">
        <article className="competency-panel">
          <div className="panel-heading">
            <div>
              <span className="section-kicker">Perfil individual</span>
              <h2>Mapa de competências</h2>
            </div>
            <button
              type="button"
              className="text-button"
              onClick={() => onNavigate("perfil")}
            >
              Ver perfil <span aria-hidden="true">→</span>
            </button>
          </div>
          <p className="panel-intro">
            Esta área mostrará domínio real em habilidades específicas. Os dados
            abaixo são apenas uma demonstração visual.
          </p>
          <div className="skill-list">
            {skillBars.map((skill) => (
              <div className="skill-row" key={skill.label}>
                <div>
                  <span>{skill.label}</span>
                  <strong>{skill.value}%</strong>
                </div>
                <div className="skill-track">
                  <span style={{ width: `${skill.value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="season-panel">
          <span className="section-kicker inverse">Temporada trimestral</span>
          <h2>Uma narrativa que evolui</h2>
          <p>
            Aqui aparecerá a campanha ativa, seus capítulos e o impacto das decisões
            individuais na defesa coletiva.
          </p>
          <ol>
            <li><span>01</span> Contexto inicial</li>
            <li><span>02</span> Ataque multicanal</li>
            <li><span>03</span> Operação cooperativa</li>
          </ol>
          <button type="button" onClick={() => onNavigate("missoes")}>
            Conhecer as temporadas <span aria-hidden="true">→</span>
          </button>
        </article>
      </section>
    </div>
  );
}

function SectionView({
  content,
  onNavigate,
}: {
  content: SectionContent;
  onNavigate: (view: ViewKey) => void;
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
          <button
            type="button"
            className="text-button"
            onClick={() => onNavigate("gestao")}
          >
            Ver painel de gestão <span aria-hidden="true">→</span>
          </button>
        </div>
      </section>
    </div>
  );
}

export default function Home() {
  const [activeView, setActiveView] = useState<ViewKey>("inicio");
  const [notice, setNotice] = useState("");

  const currentLabel = useMemo(
    () => navItems.find((item) => item.key === activeView)?.label ?? "Visão geral",
    [activeView],
  );

  const navigate = (view: ViewKey) => {
    setActiveView(view);
    setNotice("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const showReportNotice = () => {
    setNotice(
      "Neste espaço ficará o atalho permanente para o canal oficial de reporte da Leroy Merlin.",
    );
  };

  return (
    <div className="app-shell">
      <Sidebar activeView={activeView} onNavigate={navigate} />
      <main className="main-area">
        <Topbar onReport={showReportNotice} />
        <div className="mobile-view-label" aria-live="polite">
          {currentLabel}
        </div>
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
          {activeView === "inicio" ? (
            <HomeView onNavigate={navigate} />
          ) : (
            <SectionView content={sectionContent[activeView]} onNavigate={navigate} />
          )}
        </div>
        <footer>
          <p>
            Casa Digital Segura · Protótipo conceitual para LEROY MERLIN
          </p>
          <span>Conteúdo definitivo sujeito à validação de Segurança e Educação Corporativa.</span>
        </footer>
      </main>
    </div>
  );
}
