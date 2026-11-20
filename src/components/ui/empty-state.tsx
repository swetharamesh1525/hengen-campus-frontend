
type EmptyStateProps = {
  title?: string;
  message: string;
};

export default function EmptyState({
  title = "No data found",
  message,
}: EmptyStateProps) {
  return (
    <div className="empty-state">
      <div className="empty-state-icon">📭</div>
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  );
}
