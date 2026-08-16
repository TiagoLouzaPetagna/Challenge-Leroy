export type ActivityAnswerReviewItem = {
  id: string;
  title: string;
  status: "correct" | "review";
  userAnswer?: string;
  expectedAnswer?: string;
  explanation: string;
};

type ActivityAnswerReviewProps = {
  items: readonly ActivityAnswerReviewItem[];
  title?: string;
  description?: string;
  className?: string;
};

export function ActivityAnswerReview({
  items,
  title = "O que você acertou e o que precisa revisar",
  description =
    "Confira cada parte da sua resposta. Errar aqui serve para indicar o que vale praticar novamente.",
  className = "",
}: ActivityAnswerReviewProps) {
  const correctCount = items.filter((item) => item.status === "correct").length;

  return (
    <section
      className={`activity-answer-review ${className}`.trim()}
      aria-labelledby="activity-answer-review-title"
    >
      <header>
        <div>
          <span className="section-kicker">Revisão das respostas</span>
          <h2 id="activity-answer-review-title">{title}</h2>
          <p>{description}</p>
        </div>
        <strong aria-label={`${correctCount} de ${items.length} critérios atendidos`}>
          {correctCount}/{items.length}
        </strong>
      </header>

      <div className="activity-answer-review__list">
        {items.map((item) => (
          <article
            key={item.id}
            className={`activity-answer-review__item ${item.status}`}
          >
            <span className="activity-answer-review__status">
              {item.status === "correct" ? "Acertou" : "Precisa revisar"}
            </span>
            <h3>{item.title}</h3>
            {item.userAnswer ? (
              <p>
                <span>Sua resposta</span>
                <strong>{item.userAnswer}</strong>
              </p>
            ) : null}
            {item.expectedAnswer ? (
              <p>
                <span>Resposta esperada</span>
                <strong>{item.expectedAnswer}</strong>
              </p>
            ) : null}
            <p className="activity-answer-review__explanation">
              {item.explanation}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
