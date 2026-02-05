import "../App.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { databaseService } from "../database/databaseService";

export default function Home() {
  const [stats, setStats] = useState({
    total: 0,
    draft: 0,
    sent: 0,
    accepted: 0,
    rejected: 0,
    totalRevenue: 0,
  });
  const [recent, setRecent] = useState([]);

  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      try {
        const dbStats = await databaseService.getQuotationStats();
        const all = await databaseService.getAllQuotations();
        const recentFive = all.slice(0, 5);
        if (!isMounted) return;
        setStats(dbStats);
        setRecent(recentFive);
      } catch (error) {
        console.error("Failed to load home data:", error);
      }
    };

    load();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="screen">
      <div className="screen-header">
        <h2>Home</h2>
        <p>Welcome back. Start a new quotation or review recent activity.</p>
      </div>
      <div className="card-grid">
        <div className="card">
          <h3>Total Quotations</h3>
          <p>{stats.total}</p>
          <Link className="primary-btn" to="/quotation-history">
            View History
          </Link>
        </div>
        <div className="card">
          <h3>Draft</h3>
          <p>{stats.draft}</p>
          <Link className="ghost-btn" to="/quotation-history">
            Review Drafts
          </Link>
        </div>
        <div className="card">
          <h3>Accepted</h3>
          <p>{stats.accepted}</p>
          <Link className="ghost-btn" to="/quotation-history">
            View Accepted
          </Link>
        </div>
        <div className="card">
          <h3>Total Revenue</h3>
          <p>AED {Number(stats.totalRevenue || 0).toFixed(2)}</p>
          <Link className="primary-btn" to="/new-quotation">
            New Quotation
          </Link>
        </div>
      </div>

      <div className="products-section">
        <h3>Recent Quotations</h3>
        {recent.length === 0 ? (
          <div className="card">
            <p>No quotations yet. Create your first one.</p>
            <Link className="primary-btn" to="/new-quotation">
              Create Quotation
            </Link>
          </div>
        ) : (
          <div className="table-card">
            <div className="table-row table-head">
              <span>Quote Ref</span>
              <span>Client</span>
              <span>Product</span>
              <span>Total</span>
              <span>Status</span>
            </div>
            {recent.map((row) => (
              <div className="table-row" key={row.id}>
                <span>{row.quotationRefNo || row.id}</span>
                <span>{row.clientName || "-"}</span>
                <span>{row.productDetails?.name || row.productId}</span>
                <span>AED {Number(row.totalAmount || 0).toFixed(2)}</span>
                <span className={`status ${row.status || "draft"}`}>
                  {row.status || "draft"}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
