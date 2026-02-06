import React, { useRef } from "react";
import html2pdf from "html2pdf.js";
import bgImage from "../assets/pdf-bg.jpeg"; 

const QuotationPdf = () => {
  const pdfRef = useRef();

  const generatePdf = () => {
    const element = pdfRef.current;

    const opt = {
      margin: 0,
      filename: "quotation.pdf",
      image: { type: "jpeg", quality: 1 },
      html2canvas: {
        scale: 2,
        useCORS: true,
      },
      jsPDF: {
        unit: "mm",
        format: "a4",
        orientation: "portrait",
      },
      pagebreak: { mode: ["css"] },
    };

    html2pdf().set(opt).from(element).save();
  };

  return (
    <div className="p-6">
      <button
        onClick={generatePdf}
        className="mb-4 px-6 py-2 bg-green-600 text-white rounded"
      >
        Download PDF
      </button>

      {/* PDF CONTENT */}
      <div ref={pdfRef} className="w-[210mm]">

        {/* ================= PAGE 1 ================= */}
        <section
          className="relative min-h-[297mm] p-10 text-sm"
          style={{
            backgroundImage: `url(${bgImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Dynamic header */}
          <div className="flex justify-between mb-6">
            <div>
              <p><strong>Date:</strong> 17/11/2025</p>
              <p><strong>Ref:</strong> RO/QTN/25/11/10044</p>
            </div>
          </div>

          <div className="mb-6">
            <p><strong>M/s:</strong> ABC Company</p>
            <p>City, Country</p>
            <p className="mt-2"><strong>Kind Attention:</strong> Mr. XYZ</p>
          </div>

          <h2 className="font-bold mb-4">
            Subject: Water Purification Systems – Monthly Rental Plan – 400 GPD
          </h2>

          <p className="mb-4">
            With reference to your enquiry, regarding the supply of Water
            Purification Systems on Rental Plan for your well-known organization.
          </p>

          {/* Table */}
          <table className="w-full border border-black text-xs mb-6">
            <thead>
              <tr className="border">
                <th className="border p-2">#</th>
                <th className="border p-2">Product</th>
                <th className="border p-2">Capacity</th>
                <th className="border p-2">Qty</th>
                <th className="border p-2">Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border p-2">1</td>
                <td className="border p-2">
                  RRO-Premium-4 RO Water Purifier
                </td>
                <td className="border p-2">400 GPD</td>
                <td className="border p-2">1</td>
                <td className="border p-2">000.00</td>
              </tr>
            </tbody>
          </table>

          <p className="font-semibold">Installation/Unit: SAR 000.00</p>
          <p className="font-semibold">Monthly Rent: SAR 000.00</p>
        </section>

        {/* PAGE BREAK */}
        <div className="page-break"></div>

        {/* ================= PAGE 2 ================= */}
        <section
          className="relative min-h-[297mm] p-10 text-sm"
          style={{
            backgroundImage: `url(${bgImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <h2 className="font-bold mb-4">Payment Terms</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Installation charges & first month rent payable upon installation.</li>
            <li>Monthly rent prepaid at beginning of every month.</li>
            <li>Online Transfer / Cheque accepted.</li>
          </ul>

          <h2 className="font-bold mt-6 mb-4">Maintenance & Service</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>24x7 service availability</li>
            <li>Periodic service every 60 days</li>
            <li>Free consumables replacement</li>
          </ul>

          <p className="mt-10">
            <strong>Best Regards</strong><br />
            RENT RO COMPANY<br />
            Muzammil Ahmed<br />
            COO & Co-Founder
          </p>
        </section>

        <div className="page-break"></div>

        {/* ================= PAGE 3 ================= */}
        <section
          className="relative min-h-[297mm] p-10 text-sm"
          style={{
            backgroundImage: `url(${bgImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <h2 className="font-bold mb-4">Warranty & Parts</h2>

          <table className="w-full border border-black text-xs">
            <thead>
              <tr>
                <th className="border p-2">S.No</th>
                <th className="border p-2">Description</th>
                <th className="border p-2">RENT RO</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border p-2">1</td>
                <td className="border p-2">Warranty</td>
                <td className="border p-2">Lifetime</td>
              </tr>
              <tr>
                <td className="border p-2">2</td>
                <td className="border p-2">RO Unit Replacement</td>
                <td className="border p-2">36 Months</td>
              </tr>
            </tbody>
          </table>

          <p className="mt-10 italic text-center">
            “Let’s be first towards Change – Make our planet green again”
          </p>
        </section>
      </div>
    </div>
  );
};

export default QuotationPdf;
