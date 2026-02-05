import "../App.css";

export default function InfoCard({ title, description, actionLabel, variant = "primary" }) {
  const buttonClass = variant === "ghost" ? "ghost-btn" : "primary-btn";

  return (
    <div className="card">
      <h3>{title}</h3>
      <p>{description}</p>
      <button className={buttonClass}>{actionLabel}</button>
    </div>
  );
}
