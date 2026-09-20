"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { evaluatePhishingFoundationV2 } from "@/lib/domain/rules";
import { PhishingFoundationMission } from "./PhishingFoundationMission";
import styles from "./CurrentMissionPreview.module.css";

// Independent snapshot: edits here do not change the published mission.
export function CurrentMissionPreview() {
  const router = useRouter();

  return <main className={styles.page}>
    <nav className={styles.toolbar} aria-label="Página de teste">
      <span>Teste da missão atual · progresso não será salvo</span>
      <Link href="/missoes/aviso-de-bloqueio">Voltar à missão original</Link>
    </nav>
    <PhishingFoundationMission
      existingResult={null}
      existingCasePackageId={null}
      rewardAlreadyClaimed={false}
      claimedPoints={0}
      onComplete={async answer => evaluatePhishingFoundationV2({ ...answer, attemptId: crypto.randomUUID(), completedAt: new Date().toISOString() })}
      onBackToMissions={() => router.push("/missoes")}
      onOpenSenderLab={() => router.push("/phishlab/quem-enviou-de-verdade")}
      onOpenProfile={() => router.push("/perfil")}
    />
  </main>;
}
