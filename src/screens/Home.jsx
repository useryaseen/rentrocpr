import "../App.css";
import InfoCard from "../components/InfoCard";

export default function Home() {
  return (
    <section className="screen">
      <div className="screen-header">
        <h2>Home</h2>
        <p>Welcome back. Start a new quotation or review recent activity.</p>
      </div>
      <div className="card-grid">
        <InfoCard
          title="Create Quotation"
          description="Start a new rental quotation in just a few steps."
          actionLabel="New Quotation"
        />
        <InfoCard
          title="Quick Actions"
          description="Manage customers, vehicles, and pricing rules."
          actionLabel="Open Dashboard"
          variant="ghost"
        />
      </div>
    </section>
  );
}
