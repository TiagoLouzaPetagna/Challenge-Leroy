export class ActivitySubmissionValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ActivitySubmissionValidationError";
  }
}

export type ActivityExecutionOptions<TSubmission, TResult> = {
  submission: TSubmission;
  validate: (submission: TSubmission) => boolean;
  evaluate: (submission: TSubmission) => TResult;
  persist: (submission: TSubmission, result: TResult) => void;
  invalidMessage: string;
  adaptResult?: (result: TResult) => TResult;
};

export function executeActivitySubmission<TSubmission, TResult>({
  submission,
  validate,
  evaluate,
  persist,
  invalidMessage,
  adaptResult = (result) => result,
}: ActivityExecutionOptions<TSubmission, TResult>): TResult {
  if (!validate(submission)) {
    throw new ActivitySubmissionValidationError(invalidMessage);
  }

  const result = adaptResult(evaluate(submission));
  persist(submission, result);
  return result;
}

