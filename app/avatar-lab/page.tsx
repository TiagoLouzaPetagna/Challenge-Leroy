type EyeVariant = {
  description: string;
  face: string;
  label: string;
};

const BASE_PATH = "/avatar/review/master-approved-v1";

const EYE_VARIANTS: EyeVariant[] = [
  {
    label: "Olhos arredondados",
    description: "Formato compacto, simétrico e mais aberto.",
    face: `${BASE_PATH}/face-eyes-rounded.png`,
  },
  {
    label: "Olhos amendoados",
    description: "Formato horizontal com os cantos levemente ascendentes.",
    face: `${BASE_PATH}/face-eyes-almond-upturned.png`,
  },
];

function ApprovedAvatar({ face, title }: { face: string; title: string }) {
  const layers = [
    `${BASE_PATH}/body-base.png`,
    `${BASE_PATH}/underwear-default.png`,
    face,
  ];

  return (
    <span className="approved-avatar" role="img" aria-label={title}>
      {layers.map((source) => (
        // Os PNGs preservam a mesma tela de 1024 x 1536 e são sobrepostos sem reposicionamento.
        // eslint-disable-next-line @next/next/no-img-element
        <img alt="" aria-hidden="true" draggable={false} key={source} src={source} />
      ))}
    </span>
  );
}

export default function AvatarMasterLabPage() {
  return (
    <main className="avatar-review-page">
      <header className="avatar-review-header">
        <div>
          <span className="section-kicker">Laboratório visual local</span>
          <h1>Master Avatar aprovado</h1>
          <p>
            O avatar antigo foi removido deste teste. As duas opções abaixo usam
            o mesmo corpo e a mesma roupa-base; somente a camada dos olhos muda.
          </p>
        </div>
        <a className="secondary-button" href="/perfil">
          Voltar ao perfil
        </a>
      </header>

      <section className="avatar-review-grid" aria-label="Comparação dos olhos do avatar">
        {EYE_VARIANTS.map((variant) => (
          <article className="avatar-review-card" key={variant.face}>
            <div className="avatar-review-stage">
              <ApprovedAvatar face={variant.face} title={variant.label} />
            </div>
            <div className="avatar-review-copy">
              <span>Master em camadas</span>
              <h2>{variant.label}</h2>
              <p>{variant.description}</p>
            </div>
          </article>
        ))}
      </section>

      <aside className="avatar-review-note">
        <strong>Teste de contorno</strong>
        <p>
          Os personagens estão em escala exata de 25% sobre fundo verde-escuro.
          Assim, qualquer halo claro ou falha entre as camadas fica visível.
        </p>
      </aside>
    </main>
  );
}
