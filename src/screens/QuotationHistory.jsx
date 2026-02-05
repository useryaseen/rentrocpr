import "../App.css";

const historyRows = [
  { id: "Q-10021", customer: "Ayman Ali", vehicle: "Sedan", date: "Feb 2, 2026", status: "Approved" },
  { id: "Q-10018", customer: "Nora Khan", vehicle: "SUV", date: "Jan 30, 2026", status: "Pending" },
  { id: "Q-10012", customer: "Sara Malik", vehicle: "Van", date: "Jan 25, 2026", status: "Declined" },
];

export default function QuotationHistory() {
  return (
    <section className="screen">
      <div className="screen-header">
        <h2>Quotation History</h2>
        <p>Track recent quotations and their current status.</p>
      </div>
      <div className="table-card">
        <div className="table-row table-head">
          <span>Quote ID</span>
          <span>Customer</span>
          <span>Vehicle</span>
          <span>Date</span>
          <span>Status</span>
        </div>
        {historyRows.map((row) => (
          <div className="table-row" key={row.id}>
            <span>{row.id}</span>
            <span>{row.customer}</span>
            <span>{row.vehicle}</span>
            <span>{row.date}</span>
            <span className={`status ${row.status.toLowerCase()}`}>{row.status}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
