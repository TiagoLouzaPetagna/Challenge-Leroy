type ActivityErrorProps = {
  message: string;
  className?: string;
};

export function ActivityError({ message, className }: ActivityErrorProps) {
  if (!message) return null;

  return (
    <p className={className} role="alert">
      {message}
    </p>
  );
}

