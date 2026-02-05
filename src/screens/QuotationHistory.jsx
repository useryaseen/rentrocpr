import "../App.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { databaseService } from "../database/databaseService";

export default function QuotationHistory() {
  const [rows, setRows] = useState([]);
  console.log(databaseService, "databaseService");

  useEffect(() => {
    let isMounted = true;
    let sub;

    const load = async () => {
      const collection = await databaseService.getQuotationsCollection();
      sub = collection
        .find()
        .sort({ createdAt: "desc" })
        .$
        .subscribe((docs) => {
          if (!isMounted) return;
          const mapped = docs.map((doc) => {
            const data = doc.toJSON();
            return {
              id: data.id,
              quotationRefNo: data.quotationRefNo,
              countryCode: data.countryCode,
              clientName: data.clientName,
              productName: data.productDetails?.name || data.productId,
              quantity: data.quantity,
              amount: data.quotationAmount,
              totalAmount: data.totalAmount,
              date: new Date(data.createdAt).toLocaleDateString(),
              installationPeriod: data.installationPeriod,
              status: data.status,
            };
          });
          setRows(mapped);
        });
    };

    load();

    return () => {
      isMounted = false;
      if (sub) sub.unsubscribe();
    };
  }, []);

  const buildPrintHtml = (row) => `
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8" />
        <title>${row.quotationRefNo || row.id}</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 32px; color: #111; }
          h1 { margin: 0 0 12px; font-size: 22px; }
          .meta { margin-bottom: 20px; font-size: 14px; color: #444; }
          .grid { display: grid; grid-template-columns: 180px 1fr; gap: 8px 16px; }
          .label { font-weight: 600; }
          .divider { height: 1px; background: #e5e7eb; margin: 20px 0; }
        </style>
      </head>
      <body>
        <h1>Quotation</h1>
        <div class="meta">Reference: ${row.quotationRefNo || row.id}</div>
        <div class="grid">
          <div class="label">Country</div><div>${row.countryCode || "-"}</div>
          <div class="label">Client Name</div><div>${row.clientName || "-"}</div>
          <div class="label">Product</div><div>${row.productName || "-"}</div>
          <div class="label">Quantity</div><div>${row.quantity}</div>
          <div class="label">Quotation Amount</div><div>AED ${Number(row.amount || 0).toFixed(2)}</div>
          <div class="label">Total Amount</div><div>AED ${Number(row.totalAmount || row.amount || 0).toFixed(2)}</div>
          <div class="label">Service Timeline</div><div>${row.installationPeriod || "-"}</div>
          <div class="label">Status</div><div>${row.status || "draft"}</div>
        </div>
        <div class="divider"></div>
        <div>Generated on ${new Date().toLocaleString()}</div>
      </body>
    </html>
  `;

  const handleDownloadPdf = (row) => {
    const printWindow = window.open("", "_blank", "width=900,height=700");
    if (!printWindow) return;
    printWindow.document.open();
    printWindow.document.write(buildPrintHtml(row));
    printWindow.document.close();
    printWindow.focus();
    printWindow.onload = () => {
      printWindow.print();
    };
  };

  return (
    <section className="screen">
      <div className="screen-header">
        <h2>Quotation History</h2>
        <p>Track recent quotations and their current status.</p>
      </div>
      <div className="table-card w-[100%] ">
        <div className="table-row table-head">
          <span>Quote Ref</span>
          <span>Country</span>
          <span>Client</span>
          <span>Product</span>
          <span>Qty</span>
          <span>Total</span>
          <span>Action</span>
        </div>
        {rows.length === 0 ? (
          <div className="table-row">
            <span>No quotations yet.</span>
          </div>
        ) : (
          rows.map((row) => (
            <div className="table-row" key={row.id}>
              <span>{row.quotationRefNo || row.id}</span>
              <span>{row.countryCode || "-"}</span>
              <span>{row.clientName || "-"}</span>
              <span>{row.productName}</span>
              <span>{row.quantity}</span>
              <span>
                AED {Number(row.totalAmount || row.amount || 0).toFixed(2)}
              </span>
             
              <span className=" flex justify-center items-center gap-2 w-full ">
                <button
                  className="bg-blue-600 p-2 text-white rounded-md"
                  type="button"
                  onClick={() => handleDownloadPdf(row)}
                >
                  Print PDF
                </button>
                <Link className="bg-blue-600 p-2 text-white rounded-md" to={`/create-quotation/${row.id}`}>
                  Edit
                </Link>
              </span>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
