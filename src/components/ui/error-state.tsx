
type ErrorStateProps = {
  title?: string;
  message: string;
  onRetry?: () => void;
};

export default function ErrorState({
  title = "Something went wrong",
  message,
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="error-state" role="alert">
      <div className="error-state-icon">⚠️</div>
      <h2>{title}</h2>
      <p>{message}</p>

      {onRetry && (
        <button onClick={onRetry}>
          Try again
        </button>
      )}
    </div>
  );
}
