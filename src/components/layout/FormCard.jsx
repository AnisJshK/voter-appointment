export default function FormCard({ title, children }) {
  return (
    <div className="card form-card">
      {title && <h3>{title}</h3>}
      {children}
    </div>
  );
}
