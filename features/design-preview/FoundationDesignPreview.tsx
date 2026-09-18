"use client";

import { useRef, useState, type ReactNode, type PointerEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowDown, ArrowLeft, ArrowRight, Check, ChevronDown, CircleHelp, FileText, FolderOpen, Globe, GripVertical, Inbox, KeyRound, Link2, Mail, MessageSquare, Plus, Search, ShieldCheck, ShieldQuestion, Sparkles, Trash2, X, type LucideIcon } from "lucide-react";
import { PHISHING_FOUNDATION_V2_PACKAGE } from "@/lib/content/activities/account-lock/v2";
import s from "./FoundationDesignPreview.module.css";

const content = PHISHING_FOUNDATION_V2_PACKAGE.content;
const stages = ["O aviso", "O risco", "A verificação", "Sua resposta", "Um novo aviso", "Caso concluído"];
const headings = ["Um aviso. Trinta minutos.\nO que você faz?", "O que está em jogo?", "O aviso confere?", "Hora de agir.", "Parece igual.\nSerá que é?", "Uma pausa fez\na diferença."];
const instructions = ["Leia o e-mail e observe o que ele pede.", "Ligue o que pode ser afetado à consequência do pedido.", "Escolha onde verificar se sua conta será bloqueada.", "Escolha uma ação e prepare as informações para a equipe.", "Confira o novo aviso antes de decidir o que fazer.", "Veja o que suas decisões mostraram."];
const packets = [
  { id: "email", label: "E-mail recebido", detail: "Mensagem original, remetente e link", icon: Mail },
  { id: "check", label: "Verificação de bloqueio da conta", detail: "No portal da empresa, a conta estava ativa e sem aviso de bloqueio.", icon: FileText },
  { id: "secret", label: "Senha da conta", detail: "Senha usada para acessar os sistemas", icon: KeyRound },
  { id: "personal", label: "Dados pessoais", detail: "CPF e endereço residencial", icon: FileText },
];

function Icon({ icon: Component, size = 20 }: { icon: LucideIcon; size?: number }) { return <Component size={size} strokeWidth={1.8} aria-hidden="true" />; }

function MissionScene({ stage, verified, attachmentCount }: { stage: number; verified: boolean; attachmentCount: number }) {
  const labels = ["Novo e-mail", "Pedido em análise", verified ? "Conta verificada" : "Verificar conta", attachmentCount ? `${attachmentCount} informações reunidas` : "Preparar resposta", "Outro e-mail chegou", "Investigação concluída"];
  const icons = [Mail, Link2, verified ? ShieldCheck : Search, FolderOpen, Mail, ShieldCheck];
  return <div className={s.illustration} aria-hidden="true">
    <Image className={s.workstationArt} src="/design-preview/workstation-green-v1.png" alt="" width={1536} height={1024} priority unoptimized />
    <span key={`${stage}-${verified}-${attachmentCount}`} className={s.sceneNotification}><span><Icon icon={icons[stage]} size={17} /></span>{labels[stage]}</span>
  </div>;
}

function DragCard({ label, detail, icon, target, selected = false, onSelect }: { label: string; detail?: string; icon: LucideIcon; target: string; selected?: boolean; onSelect: () => void }) {
  const origin = useRef<{ x: number; y: number } | null>(null);
  const suppress = useRef(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const dragging = Math.abs(offset.x) + Math.abs(offset.y) > 7;
  function end(e: PointerEvent<HTMLButtonElement>) {
    if (!origin.current) return;
    if (dragging) {
      suppress.current = true;
      if (document.elementFromPoint(e.clientX, e.clientY)?.closest("[data-preview-drop]")?.getAttribute("data-preview-drop") === target) onSelect();
    }
    origin.current = null; setOffset({ x: 0, y: 0 });
  }
  return <button type="button" className={`${s.dragCard} ${dragging ? s.dragging : ""}`} aria-pressed={selected}
    style={dragging ? { transform: `translate(${offset.x}px, ${offset.y}px) rotate(-2deg)` } : undefined}
    onPointerDown={e => { if (e.button !== 0) return; suppress.current = false; origin.current = { x: e.clientX, y: e.clientY }; e.currentTarget.setPointerCapture(e.pointerId); }}
    onPointerMove={e => { if (origin.current) setOffset({ x: e.clientX - origin.current.x, y: e.clientY - origin.current.y }); }}
    onPointerUp={end} onPointerCancel={() => { origin.current = null; setOffset({ x: 0, y: 0 }); }}
    onClick={() => { if (suppress.current) { suppress.current = false; return; } onSelect(); }}>
    <Icon icon={icon} /><span><strong>{label}</strong>{detail && <small>{detail}</small>}</span><Icon icon={selected ? Check : GripVertical} size={16} />
  </button>;
}

function Email({ transfer = false }: { transfer?: boolean }) {
  const message = transfer ? content.transfer : content.message;
  return <article className={s.email} aria-label={transfer ? "Novo e-mail" : "E-mail recebido"}>
    <div className={s.mailToolbar}><span><Icon icon={Inbox} size={17} /> Caixa de entrada</span><span>1 mensagem</span></div>
    <div className={s.mailContent}>
      <div className={s.subjectRow}><span className={s.mailTag}>RECEBIDO AGORA</span><time>{transfer ? "09:04" : "08:12"}</time></div>
      <h3>{message.subject}</h3>
      <div className={s.sender}><span className={s.senderAvatar}><Icon icon={Mail} size={23} /></span><div><strong>{message.senderName}</strong><details><summary>para você <Icon icon={ChevronDown} size={13} /></summary><p><b>De:</b> {message.senderAddress}</p></details></div></div>
      <div className={s.mailBody}>{transfer ? <p>{content.transfer.body}</p> : <><p>{content.message.body[0]}</p><p>Para evitar o bloqueio nos próximos <strong>30 minutos</strong>, use o botão abaixo e confirme seus dados.</p><span className={s.emailCta}>{content.message.buttonLabel}<Icon icon={ArrowRight} size={16} /></span><span className={s.linkPreview}><Icon icon={Link2} size={13} />{content.message.destinationPreview}</span></>}</div>
      <p className={s.signature}>Equipe de {transfer ? "Identidade Corporativa" : "Acessos"}</p>
    </div>
  </article>;
}

function Feedback({ children, good = false }: { children: ReactNode; good?: boolean }) {
  return <div className={`${s.feedback} ${good ? s.good : ""}`} role="status"><Icon icon={good ? ShieldCheck : CircleHelp} /><div>{children}</div></div>;
}

export function FoundationDesignPreview() {
  const [stage, setStage] = useState(0);
  const [help, setHelp] = useState(false);
  const [asset, setAsset] = useState("");
  const [risk, setRisk] = useState("");
  const [tested, setTested] = useState(false);
  const [route, setRoute] = useState("");
  const [verified, setVerified] = useState(false);
  const [action, setAction] = useState("");
  const [attachments, setAttachments] = useState<string[]>([]);
  const [transferChecked, setTransferChecked] = useState(false);
  const [transferAction, setTransferAction] = useState("");
  const titleRef = useRef<HTMLHeadingElement>(null);
  const correctRisk = asset === "Conta corporativa" && risk === "Senha exposta";
  const correctReport = action === "report" && attachments.length === 2 && attachments.includes("email") && attachments.includes("check");
  const ready = [true, tested, verified, !!action && (action !== "report" || attachments.length > 0), !!transferAction, true][stage];
  function move(next: number) { setStage(next); setHelp(false); requestAnimationFrame(() => { titleRef.current?.focus({ preventScroll: true }); window.scrollTo({ top: 0, behavior: "instant" }); }); }
  function toggle(id: string) { setAttachments(current => current.includes(id) ? current.filter(item => item !== id) : [...current, id]); }
  function restart() { setAsset(""); setRisk(""); setTested(false); setRoute(""); setVerified(false); setAction(""); setAttachments([]); setTransferChecked(false); setTransferAction(""); move(0); }
  const discoveries = [stage > 0 ? "Aviso de bloqueio em 30 minutos" : "", tested && correctRisk ? "Dados da conta podem ficar expostos" : "", verified ? "Portal: conta ativa, sem bloqueio" : ""].filter(Boolean);

  return <div className={s.page}>
    <header className={s.topbar}><Link className={s.brand} href="/"><span><Icon icon={ShieldCheck} size={23} /></span>fortifica<span className={s.brandDot}>.</span></Link><span className={s.testLabel}>ESTÚDIO DE DESIGN <span>/</span> PROPOSTA 01</span><Link className={s.close} href="/missoes/aviso-de-bloqueio"><span>Ver versão atual</span><Icon icon={ArrowRight} size={17} /></Link></header>
    <div className={s.layout}>
      <aside className={s.sidebar}>
        <div className={s.caseLabel}><span /> MISSÃO 01</div><h1>O aviso que não podia esperar</h1><p className={s.caseDescription}>Uma mensagem urgente no início do expediente.</p>
        <ol className={s.steps} aria-label="Etapas da missão">{stages.map((name, index) => <li key={name} className={index === stage ? s.current : index < stage ? s.done : ""} aria-current={index === stage ? "step" : undefined}><span>{index < stage ? <Icon icon={Check} size={14} /> : String(index + 1).padStart(2, "0")}</span><strong>{name}</strong></li>)}</ol>
        <div className={s.notebook}><Icon icon={FolderOpen} size={19} /><h2>Seu registro do caso</h2>{discoveries.length ? <ul>{discoveries.map(item => <li key={item}><Icon icon={Check} size={13} />{item}</li>)}</ul> : <p>Suas descobertas aparecem aqui durante a investigação.</p>}</div>
        <p className={s.previewNote}>Prévia interativa · não salva progresso</p>
      </aside>
      <main className={s.main}>
        <div className={s.stageMeta}><span>INVESTIGAÇÃO <b>/ {String(stage + 1).padStart(2, "0")}</b></span><button type="button" onClick={() => setHelp(!help)} aria-expanded={help}><Icon icon={CircleHelp} size={18} />Ajuda</button></div>
        <div className={s.heading}><h2 ref={titleRef} tabIndex={-1}>{stage === 5 && (!correctRisk || !correctReport || transferAction !== "portal") ? "Caso encerrado.\nVamos rever as decisões?" : headings[stage]}</h2><MissionScene stage={stage} verified={verified} attachmentCount={attachments.length} /></div>
        <div className={s.instruction}><span><Icon icon={ArrowDown} size={17} /></span><p>{instructions[stage]}</p></div>
        {help && <div className={s.help}><strong>Uma etapa de cada vez.</strong><p>{stage === 0 ? "Não é preciso clicar no botão da mensagem. Leia o pedido e avance quando terminar." : stage === 1 ? "Arraste os cartões para os espaços indicados ou clique neles. Depois, teste a ligação." : stage === 3 ? "Os cartões podem ser arrastados ou selecionados com um clique. Clique no X para remover um anexo." : "Escolha uma das opções e leia o resultado antes de avançar."}</p></div>}
        <div className={s.scene} key={stage}>
          {stage === 0 && <><Email /><p className={s.sceneCaption}><span /> Você está no início do expediente. Não havia manutenção anunciada.</p></>}
          {stage === 1 && <div className={s.riskScene}><div className={s.request}><Icon icon={Mail} /><p>O pedido era: <strong>confirmar seus dados pelo botão do e-mail.</strong></p></div><div className={s.riskGrid}>{[{ title: "O que pode ser afetado", target: "asset", value: asset, options: [{ label: "Conta corporativa", icon: KeyRound }, { label: "Agenda de reuniões", icon: FileText }, { label: "Cadastro de entrega", icon: Inbox }] }, { title: "O que pode acontecer", target: "risk", value: risk, options: [{ label: "Trabalho atrasado", icon: FileText }, { label: "Senha exposta", icon: KeyRound }, { label: "E-mail apagado", icon: Trash2 }] }].map((column, index) => <section key={column.target}><h3><span>0{index + 1}</span>{column.title}</h3><div className={`${s.dropZone} ${column.value ? s.filledZone : ""}`} data-preview-drop={column.target}><span className={s.placedCard} key={column.value || "empty"}><Icon icon={column.value ? Check : Plus} /><strong>{column.value || "Arraste um cartão para cá"}</strong></span></div><div className={s.cardStack}>{column.options.map(option => <DragCard key={option.label} {...option} target={column.target} selected={column.value === option.label} onSelect={() => { if (index === 0) setAsset(option.label); else setRisk(option.label); setTested(false); }} />)}</div></section>)}</div>{asset && risk && <div className={`${s.connection} ${tested && correctRisk ? s.connectionComplete : ""}`} aria-hidden="true"><span>{asset}</span><i /><Icon icon={tested && correctRisk ? ShieldQuestion : Link2} size={21} /><i /><span>{risk}</span></div>}<div className={s.testRow}><span>Você também pode clicar nos cartões.</span><button type="button" className={s.secondary} disabled={!asset || !risk} onClick={() => setTested(true)}><Icon icon={Link2} size={17} />Testar ligação</button></div>{tested && <Feedback good={correctRisk}><strong>{correctRisk ? "Essa é a ligação." : "Pense nos dados que o botão pede."}</strong><p>{correctRisk ? "Se você informar sua senha em uma página desconhecida, outra pessoa poderá acessar sua conta." : "O pedido envolve os dados da sua conta. O que pode acontecer se outra pessoa receber esses dados? Você pode trocar os cartões."}</p></Feedback>}</div>}
          {stage === 2 && <div className={s.browser}><div className={s.browserBar}><Icon icon={Globe} size={17} /><span>Navegador de trabalho</span><span className={s.browserDots}>•••</span></div><div className={s.browserBody}><h3>Por onde você começa?</h3><p>O e-mail diz que sua conta será bloqueada.</p><div className={s.routeList}>{[{ id: "portal", icon: Globe, title: "Portal da empresa", detail: "Endereço que você já usa no trabalho" }, { id: "search", icon: Search, title: "Pesquisar na internet", detail: "Buscar uma página de acesso" }, { id: "reply", icon: MessageSquare, title: "Responder ao remetente", detail: "Perguntar se o aviso é verdadeiro" }].map(item => <button type="button" aria-pressed={route === item.id} key={item.id} onClick={() => { setRoute(item.id); if (item.id === "portal") setVerified(true); }}><span className={s.routeIcon}><Icon icon={item.icon} /></span><span><strong>{item.title}</strong><small>{item.detail}</small></span><Icon icon={ArrowRight} size={17} /></button>)}</div>{route === "portal" ? <div className={s.portal} role="status"><span className={s.portalAddress}><Icon icon={Globe} size={14} />{content.officialReference.address}</span><Icon icon={ShieldCheck} size={36} /><h3>Sua conta está ativa.</h3><p>Não há bloqueio, divergência ou manutenção registrada.</p><span className={s.statusPill}><span /> Acesso normal</span></div> : route && <Feedback><strong>{route === "search" ? "A busca ainda não confirma o aviso." : "O remetente não é uma confirmação independente."}</strong><p>{route === "search" ? "Você encontrou páginas de acesso, mas ainda não sabe qual pertence à empresa. Escolha outro caminho." : "Quem enviou um e-mail falso também pode mentir na resposta. Verifique por outro caminho."}</p></Feedback>}</div></div>}
          {stage === 3 && <div className={s.response}><div className={s.finding}><Icon icon={ShieldQuestion} size={24} /><p>O e-mail ameaça um bloqueio.<br /><strong>O portal da empresa não mostra esse bloqueio.</strong></p></div><h3>O que você faz com a mensagem?</h3><div className={s.actions}>{[{ id: "report", label: "Avisar a equipe de segurança", icon: MessageSquare }, { id: "delete", label: "Apenas excluir", icon: Trash2 }, { id: "follow", label: "Seguir o pedido do e-mail", icon: Link2 }].map(item => <button type="button" aria-pressed={action === item.id} key={item.id} onClick={() => setAction(item.id)}><Icon icon={item.icon} /><span>{item.label}</span><span className={s.radio}>{action === item.id && <Icon icon={Check} size={12} />}</span></button>)}</div>{action === "report" && <section className={s.reportSection}><h3>O que você enviaria à equipe?</h3><p>Arraste os cartões para o reporte ou clique para adicionar.</p><div className={s.reportGrid}><div className={s.cardStack}>{packets.filter(item => !attachments.includes(item.id)).map(item => <DragCard key={item.id} {...item} target="report" onSelect={() => toggle(item.id)} />)}</div><div className={`${s.reportFolder} ${attachments.length ? s.folderFilled : ""}`} data-preview-drop="report"><header><Icon icon={FolderOpen} /><strong>Reporte à segurança</strong><span>{attachments.length}</span></header>{attachments.length ? packets.filter(item => attachments.includes(item.id)).map(item => <div className={s.attachment} key={item.id}><Icon icon={item.icon} size={17} /><span><strong>{item.label}</strong><small>{item.detail}</small></span><button type="button" aria-label={`Remover ${item.label}`} onClick={() => toggle(item.id)}><Icon icon={X} size={16} /></button></div>) : <div className={s.emptyFolder}><Icon icon={Plus} size={25} /><span>Adicione as informações<br />que ajudam a investigar.</span></div>}</div></div></section>}</div>}
          {stage === 4 && <><Email transfer /><section className={s.transfer}><button type="button" className={s.portalButton} onClick={() => setTransferChecked(true)}><Icon icon={Globe} /><span><strong>Conferir no portal da empresa</strong><small>Ver a situação da sua senha</small></span><Icon icon={ArrowRight} size={18} /></button>{transferChecked && <Feedback good><strong>O portal confirma: sua senha expira amanhã.</strong><p>A alteração está disponível na área da sua conta.</p></Feedback>}<h3>Como você resolve este aviso?</h3><div className={s.actions}>{[{ id: "portal", label: "Alterar a senha no portal", icon: KeyRound }, { id: "report", label: "Reportar como ataque", icon: ShieldQuestion }, { id: "ignore", label: "Descartar o aviso", icon: Trash2 }].map(item => <button key={item.id} type="button" disabled={item.id === "portal" && !transferChecked} aria-pressed={transferAction === item.id} onClick={() => setTransferAction(item.id)}><Icon icon={item.icon} /><span>{item.label}</span><span className={s.radio}>{transferAction === item.id && <Icon icon={Check} size={12} />}</span></button>)}</div>{!transferChecked && <p className={s.smallHint}>Confira a situação no portal para poder alterar a senha.</p>}</section></>}
          {stage === 5 && <div className={s.result}><span className={s.resultSeal}><Icon icon={ShieldCheck} size={46} /></span><span className={s.resultLabel}>INVESTIGAÇÃO CONCLUÍDA</span><h3>Urgência pede atenção.<br />Confiança pede verificação.</h3><p>O primeiro e-mail precisava ser investigado. O segundo tinha uma informação confirmada no portal.</p><div className={s.resultRows}>{[{ title: "Entender o risco", correct: correctRisk, detail: "O pedido de dados pode expor sua senha e sua conta." }, { title: "Verificar fora da mensagem", correct: verified, detail: "Você consultou o portal da empresa antes de agir." }, { title: "Preparar o reporte", correct: correctReport, detail: "Envie o e-mail original e a verificação do bloqueio. Senhas e dados pessoais ficam de fora." }, { title: "Reconhecer o aviso verdadeiro", correct: transferAction === "portal", detail: "Se o portal confirma a expiração, altere a senha no próprio portal." }].map(item => <div key={item.title}><span className={item.correct ? s.resultCorrect : s.resultReview}><Icon icon={item.correct ? Check : CircleHelp} size={17} /></span><div><strong>{item.title}</strong><p>{item.detail}</p></div></div>)}</div><button type="button" className={s.secondary} onClick={restart}>Experimentar novamente <Icon icon={ArrowRight} size={17} /></button></div>}
        </div>
        <footer className={s.footer}>{stage > 0 && stage < 5 ? <button type="button" className={s.back} onClick={() => move(stage - 1)}><Icon icon={ArrowLeft} size={17} />Voltar</button> : <span className={s.footerNote}><Icon icon={stage === 5 ? Sparkles : ShieldCheck} size={16} />{stage === 5 ? "O aprendizado fica. A prática continua." : "Seu tempo. Sua decisão."}</span>}{stage < 5 && <button type="button" className={s.primary} disabled={!ready} onClick={() => move(stage + 1)}>{stage === 0 ? "Investigar este aviso" : stage === 4 ? "Concluir investigação" : "Continuar"}<Icon icon={ArrowRight} size={18} /></button>}</footer>
      </main>
    </div>
  </div>;
}
