import { useId } from "react";

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
  const titleId = useId();
  const correctCount = items.filter((item) => item.status === "correct").length;
  const reviewCount = items.length - correctCount;

  return (
    <section
      className={`activity-answer-review ${className}`.trim()}
      aria-labelledby={titleId}
    >
      <header>
        <div>
          <span className="section-kicker">Revisão das respostas</span>
          <h2 id={titleId}>{title}</h2>
          <p>{description}</p>
        </div>
        <div className="activity-answer-review__summary">
          <strong aria-label={`${correctCount} de ${items.length} critérios atendidos`}>
            {correctCount}/{items.length}
          </strong>
          <span>{reviewCount === 0 ? "Tudo certo" : `${reviewCount} para revisar`}</span>
        </div>
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
