import Image from "next/image";
import type { ReactNode } from "react";
import { Bell, BookOpen, Compass, Flag, FlaskConical, Mail, MessagesSquare, Route, ShieldCheck, TestTubes, Trophy, Users } from "lucide-react";
import styles from "./SectionBanner.module.css";

const themes = {
  home: { mascot: "trial", label: "Uma escolha de cada vez", caption: "Observe. Questione. Proteja.", Icon: ShieldCheck, ObjectIcon: Compass, DetailIcon: Flag },
  lab: { mascot: "labs", label: "Bancada de investigação", caption: "Evidências antes de conclusões", Icon: FlaskConical, ObjectIcon: TestTubes, DetailIcon: FlaskConical },
  simulations: { mascot: "simulations-loop", label: "Espaço de prática", caption: "Pratique hoje. Reconheça amanhã.", Icon: Mail, ObjectIcon: BookOpen, DetailIcon: Bell },
  teams: { mascot: "teams-loop", label: "Prática em equipe", caption: "Cada decisão fortalece a área.", Icon: Users, ObjectIcon: ShieldCheck, DetailIcon: Trophy },
  missions: { mascot: "checklist-loop", label: "Seu próximo passo importa", caption: "Aprender · praticar · evoluir", Icon: Route, ObjectIcon: Flag, DetailIcon: Route },
  management: { mascot: "support", label: "Cuidado que conecta", caption: "Pessoas · setores · conhecimento", Icon: ShieldCheck, ObjectIcon: MessagesSquare, DetailIcon: Users },
};

/** Small decorative scenes share a palette and line weight, with a subject for each area. */
function BannerDrawing({ variant }: { variant: keyof typeof themes }) {
  return <svg className={styles.drawing} viewBox="0 0 300 130" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    {variant === "home" ? <>
      <path d="m12 22 63-12 66 17 65-12v95l-65 13-66-17-63 12Z" fill="#e8eed5" />
      <path d="M75 10v96m66-79v96" opacity=".2" />
      <path d="M32 90c0-52 90 16 87-35s54 5 63-20" strokeDasharray="5 8" />
      <circle cx="32" cy="90" r="7" fill="#b9ed32" /><path d="M182 42V15l27 8-27 8" fill="#ffd567" />
    </> : variant === "lab" ? <>
      <path d="M34 12h29m-22 0v35L17 89q-9 16 9 16h46q18 0 9-16L57 47V12" fill="#e7f7ed" />
      <path d="m29 72-12 22q-3 9 9 9h46q12 0 9-9L68 72Z" fill="#75cebf" stroke="none" />
      <circle cx="40" cy="84" r="3" fill="currentColor" stroke="none" /><circle cx="56" cy="94" r="3" fill="currentColor" stroke="none" />
      <path d="m118 49 31-25 37 23-7 43-42 7-19-48Zm68-2 31-20m-38 63 37 21" opacity=".5" />
      <circle cx="118" cy="49" r="9" fill="#a8ded6" /><circle cx="149" cy="24" r="7" fill="#ffd567" /><circle cx="186" cy="47" r="11" fill="#a8ded6" /><circle cx="137" cy="97" r="8" fill="#a8ded6" /><circle cx="217" cy="27" r="6" fill="#fffdf2" />
    </> : variant === "simulations" ? <>
      <rect x="14" y="16" width="118" height="91" rx="9" fill="#fffdf2" />
      <path d="M35 16v91M22 34h-15m15 20h-15m15 20h-15m15 20h-15" stroke="#dc947f" />
      <path d="M49 40h60M49 55h44M49 71h54M49 87h31" opacity=".35" />
      <g transform="rotate(8 197 65)"><rect x="154" y="32" width="96" height="66" rx="10" fill="#f9c4b7" /><path d="m157 39 45 32 45-32m-90 53 29-28m61 28-29-28" /><circle cx="249" cy="30" r="13" fill="#fffdf2" /><path d="m244 30 4 4 7-8" /></g>
    </> : variant === "missions" ? <>
      <rect x="18" y="14" width="112" height="104" rx="12" fill="#fffdf2" /><rect x="47" y="6" width="54" height="18" rx="6" fill="#d6e6af" />
      <path d="m32 44 5 5 9-11m-14 30 5 5 9-11m-14 30 5 5 9-11" stroke="#2b7956" />
      <path d="M60 45h50M60 69h40M60 93h47" opacity=".3" />
      <path d="M159 105c-13-40 64-16 49-63" strokeDasharray="5 7" /><circle cx="159" cy="105" r="6" fill="#b9ed32" /><path d="M208 49V12l35 10-35 11" fill="#ffd567" />
    </> : <>
      <path d="M127 39v23M47 85V62h160v23" opacity=".5" />
      {[ [105, 5], [25, 80], [105, 80], [185, 80] ].map(([x,y]) => <g key={`${x}-${y}`} transform={`translate(${x} ${y})`}><rect width="44" height="38" rx="10" fill={y === 5 ? "#d6e6af" : "#e0eee4"} /><circle cx="22" cy="12" r="5" /><path d="M12 29c0-12 20-12 20 0" /></g>)}
    </>}
  </svg>;
}

export function SectionBanner({ variant, children, footer, labelledBy, tour }: {
  variant: keyof typeof themes;
  children: ReactNode;
  footer?: ReactNode;
  labelledBy: string;
  tour?: string;
}) {
  const { mascot, label, caption, Icon, ObjectIcon, DetailIcon } = themes[variant];
  const animatedMascot = variant === "home" || variant === "lab" || variant === "simulations" || variant === "teams" || variant === "missions";
  const stillFrame = variant === "simulations" || variant === "teams" || variant === "missions";
  const stillImage = variant === "missions" ? "checklist.png" : `${mascot}-still.png`;
  return (
    <section className={`${styles.banner} ${styles[variant]}`} aria-labelledby={labelledBy} data-tour={tour}>
      <div className={styles.copy}>{children}</div>
      <div className={styles.scene} aria-hidden="true">
        <div className={styles.orbit} />
        <div className={styles.board}>
          <span className={styles.boardLabel}><Icon size={18} />{label}</span>
          <BannerDrawing variant={variant} />
        </div>
        <span className={styles.detail}><DetailIcon strokeWidth={1.6} /></span>
        <span className={styles.seal}><ObjectIcon strokeWidth={1.7} /></span>
        {animatedMascot ? (
          <video className={styles.mascot} autoPlay loop muted playsInline preload="auto" poster={variant === "missions" ? `/mascot/leroyzin/${mascot}.webp` : stillFrame ? `/mascot/leroyzin/${stillImage}` : undefined}>
            <source src={`/mascot/leroyzin/${mascot}.webm`} type="video/webm" />
            {stillFrame ? <Image src={`/mascot/leroyzin/${mascot}.webp`} alt="" width={768} height={variant === "teams" || variant === "missions" ? 768 : 512} unoptimized /> : null}
          </video>
        ) : (
          <Image className={styles.mascot} src={`/mascot/leroyzin/${mascot}.png`} alt="" width={480} height={480} priority unoptimized sizes="(max-width: 700px) 300px, 440px" />
        )}
        {stillFrame ? <Image className={`${styles.mascot} ${styles.reducedMotionMascot}`} src={`/mascot/leroyzin/${stillImage}`} alt="" width={768} height={variant === "teams" || variant === "missions" ? 768 : 512} unoptimized /> : null}
        <span className={styles.caption}>{caption}</span>
      </div>
      {footer ? <div className={styles.footer}>{footer}</div> : null}
    </section>
  );
}
