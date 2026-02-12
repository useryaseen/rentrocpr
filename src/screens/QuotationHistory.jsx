import "../App.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import QuotationPdf from "./QuotationPdf";
import { databaseService } from "../database/databaseService";

const COUNTRY_CURRENCY_MAP = {
  AE: "AED",
  SA: "SAR",
  IN: "INR",
  QA: "QAR",
  OM: "OMR",
};

const resolveCurrencyCode = (countryCode) =>
  COUNTRY_CURRENCY_MAP[String(countryCode || "").toUpperCase()] || "AED";

const resolvePurchaseFor = (entry) => {
  const purpose = String(entry?.purpose || "").trim();
  if (purpose.toLowerCase() === "other") {
    return String(entry?.customPurpose || "").trim();
  }
  return purpose;
};

const buildPurchaseSummary = (data) => {
  const locations =
    Array.isArray(data?.purchaseLocations) && data.purchaseLocations.length > 0
      ? data.purchaseLocations
      : [
          {
            city: data?.clientCity || "",
            area: data?.clientArea || "",
            purpose: data?.purchasePurpose || "",
            customPurpose: "",
          },
        ];

  return locations
    .map((entry) => {
      const purchaseFor = resolvePurchaseFor(entry);
      const place = [entry.city, entry.area].filter(Boolean).join(", ");
      return [place, purchaseFor].filter(Boolean).join(" - ");
    })
    .filter(Boolean)
    .join(" | ");
};

export default function QuotationHistory() {
  const [rows, setRows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showPdfPreview, setShowPdfPreview] = useState(false);
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
              purchaseSummary: buildPurchaseSummary(data),
              raw: data,
            };
          });
          setRows(mapped);
          setIsLoading(false);
        });
    };

    load();

    return () => {
      isMounted = false;
      if (sub) sub.unsubscribe();
    };
  }, []);

  const buildPdfPayload = (row) => {
    const data = row.raw || {};
    const purchaseLocations =
      Array.isArray(data.purchaseLocations) && data.purchaseLocations.length > 0
        ? data.purchaseLocations
        : [
            {
              city: data.clientCity || "",
              area: data.clientArea || "",
              purpose: data.purchasePurpose || "Store",
              customPurpose: "",
              label: "",
            },
          ];
    const primaryLocation = purchaseLocations[0] || {};
    const products = data.products || [
      {
        name: row.productName || "",
        capacity: "",
        qty: row.quantity || 1,
        unitAmount: row.amount || 0,
        discount: 0,
        installationCharge: 0,
        monthlyRent: 0,
        monthsQty: 0,
        total: row.totalAmount || row.amount || 0,
      },
    ];
    return {
      date: data.createdAt ? new Date(data.createdAt).toLocaleDateString() : "",
      ref: data.quotationRefNo || row.quotationRefNo || row.id,
      companyName: data.clientName || row.clientName || "",
      companyAddress: primaryLocation.city || data.clientCity || "",
      countryCode: data.countryCode || row.countryCode || "",
      quotationType: data.quotationType || "Rental Quotation",
      attentionTo: data.clientAttendant || data.clientName || "",
      subject: "",
      intro: "",
      installationUnit: "",
      monthlyRent: "",
      products,
      monthlyRentProducts: products.map((item) => ({
        product: item.name || "",
        monthlyRent: Number(item.monthlyRent || 0),
        qtyMonths: Number(item.monthsQty || 0),
        totalAmount: Number(item.monthlyRent || 0) * Number(item.monthsQty || 0),
      })),
      paymentTerms: data.paymentTerms || [],
      maintenanceService: data.services || data.maintenanceService || [],
      serviceMaintenance: data.serviceMaintenance || [],
      otherTerms: data.termsConditions || [],
      warrantyParts: data.warrantyParts || [],
      clientCity: primaryLocation.city || data.clientCity || "",
      clientArea: primaryLocation.area || data.clientArea || "",
      clientAttendant: data.clientAttendant || "",
      purchasePurpose:
        primaryLocation.purpose === "other"
          ? primaryLocation.customPurpose || data.purchasePurpose || ""
          : primaryLocation.purpose || data.purchasePurpose || "",
      purchaseLocations,
    };
  };

  return (
    <section className="screen">
      <div className="screen-header">
        <h2>Quotation History</h2>
        <p>Track recent quotations and their current status.</p>
      </div>
      <div className="table-card w-[100%] hidden md:block">
        {isLoading && (
          <div className="table-row">
            <span>Loading quotations...</span>
          </div>
        )}
        <div className="table-row table-head">
          <span>Quote Ref</span>
          <span>Country</span>
          <span>Client</span>
          <span>Product</span>
          <span>City/Area/Purchase For</span>
          <span>Qty</span>
          <span>Total</span>
          <span>Action</span>
        </div>
        {!isLoading && rows.length === 0 ? (
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
              <span className="text-xs">{row.purchaseSummary || "-"}</span>
              <span>{row.quantity}</span>
              <span>
                {resolveCurrencyCode(row.countryCode)}{" "}
                {Number(row.totalAmount || row.amount || 0).toFixed(2)}
              </span>
             
              <span className=" flex justify-center items-center gap-2 w-full ">
                <button
                  className="bg-blue-600 p-2 text-white rounded-md"
                  type="button"
                  onClick={() => {
                    const payload = buildPdfPayload(row);
                    sessionStorage.setItem("quotationPdfData", JSON.stringify(payload));
                    setShowPdfPreview(true);
                  }}
                >
                  Open PDF
                </button>
               
                <Link className="bg-blue-600 p-2 text-white rounded-md" to={`/create-quotation/${row.id}`}>
                  Edit
                </Link>
              </span>
            </div>
          ))
        )}
      </div>
      <div className="md:hidden mt-4 space-y-3">
        {isLoading && (
          <div className="rounded border border-blue-100 bg-blue-50 p-3 text-sm text-blue-700">
            Loading quotations...
          </div>
        )}
        {!isLoading && rows.length === 0 ? (
          <div className="rounded border border-blue-100 bg-blue-50 p-3 text-sm text-blue-700">
            No quotations yet.
          </div>
        ) : (
          rows.map((row) => (
            <div key={row.id} className="rounded-lg border border-blue-100 bg-white p-4 shadow-sm">
              <div className="text-xs font-semibold text-blue-600">Quote Ref</div>
              <div className="mb-2 text-sm font-medium">{row.quotationRefNo || row.id}</div>

              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <div className="text-xs text-blue-600">Country</div>
                  <div>{row.countryCode || "-"}</div>
                </div>
                <div>
                  <div className="text-xs text-blue-600">Client</div>
                  <div>{row.clientName || "-"}</div>
                </div>
                <div className="col-span-2">
                  <div className="text-xs text-blue-600">Product</div>
                  <div>{row.productName}</div>
                </div>
                <div>
                  <div className="text-xs text-blue-600">Qty</div>
                  <div>{row.quantity}</div>
                </div>
                <div>
                  <div className="text-xs text-blue-600">Total</div>
                  <div>
                    {resolveCurrencyCode(row.countryCode)}{" "}
                    {Number(row.totalAmount || row.amount || 0).toFixed(2)}
                  </div>
                </div>
                <div className="col-span-2">
                  <div className="text-xs text-blue-600">Project</div>
                  <div>{row.purchaseSummary || "-"}</div>
                </div>
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  className="bg-blue-600 px-3 py-2 text-sm text-white rounded-md"
                  type="button"
                  onClick={() => {
                    const payload = buildPdfPayload(row);
                    sessionStorage.setItem("quotationPdfData", JSON.stringify(payload));
                    setShowPdfPreview(true);
                  }}
                >
                  Open PDF
                </button>
                <Link className="bg-blue-600 px-3 py-2 text-sm text-white rounded-md" to={`/create-quotation/${row.id}`}>
                  Edit
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
      {showPdfPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="relative md:h-[30vh] md:w-[50vw] h-[40vh] w-[80vw] overflow-hidden rounded-lg bg-white shadow-xl">
            <button
              type="button"
              onClick={() => setShowPdfPreview(false)}
              className="absolute right-4 top-4 z-10 rounded bg-red-600 px-3 py-1 text-sm text-white"
            >
              Close
            </button>
            <QuotationPdf />
          </div>
        </div>
      )}
    </section>
  );
}
