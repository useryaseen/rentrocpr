// import React, { useEffect, useMemo, useRef, useState } from "react";
// import bgImage from "../assets/pdf-bg.jpeg";

// const QuotationPdf = () => {
//   const pdfRef = useRef();
//   const [form, setForm] = useState({
//     date: "17/11/2025",
//     ref: "RO/QTN/25/11/10044",
//     companyName: "ABC Company",
//     companyAddress: "City, Country",
//     attentionTo: "Mr. XYZ",
//     subject: "Water Purification Systems - Monthly Rental Plan - 400 GPD",
//     intro:
//       "With reference to your enquiry, regarding the supply of Water Purification Systems on Rental Plan for your well-known organization.",
//     installationUnit: "SAR 000.00",
//     monthlyRent: "SAR 000.00",
//     products: [
//       {
//         name: "RRO-Premium-4 RO Water Purifier",
//         capacity: "400 GPD",
//         qty: 1,
//         unitAmount: 0,
//         discount: 0,
//       },
//     ],
//     paymentTerms: [
//       "Installation charges & first month rent payable upon installation.",
//       "Monthly rent prepaid at beginning of every month.",
//       "Online Transfer / Cheque accepted.",
//     ],
//     services: [
//       "24x7 service availability",
//       "Periodic service every 60 days",
//       "Free consumables replacement",
//     ],
//     termsConditions: ["Quotation validity: 30 days from the date of issue."],
//     warranty: [
//       { title: "Warranty", value: "Lifetime" },
//       { title: "RO Unit Replacement", value: "36 Months" },
//     ],
//     serviceMaintenance: [
//       { item: "PP/UV/UDF Maintenance", every90Days: "Yes", others: "Yes (30 Days)" },
//       { item: "Weekly Services", every90Days: "6 Services", others: "12" },
//       { item: "Service Certifications", every90Days: "On every service", others: "Yes" },
//       { item: "Service Reports", every90Days: "On every service", others: "Yes" },
//       { item: "Technical Team Availability", every90Days: "24 hrs / 365 days", others: "24 hrs / 365 days" },
//       { item: "Routine Availability", every90Days: "48 Hours", others: "48 Hours" },
//       { item: "Compatibility", every90Days: "Within 48 Hours", others: "Within 48 Hours" },
//       { item: "Emergency Call Out", every90Days: "Unlimited Free", others: "Unlimited Free" },
//       { item: "Holiday (Eid/National Day)", every90Days: "Support Team Available", others: "Support Team Available" },
//     ],
//     closingCompany: "RENT RO COMPANY",
//     closingName: "Muzammil Ahmed",
//     closingRole: "COO & Co-Founder",
//     footerQuote:
//       "Lets be first towards Change - Make our planet green again",
//   });

//   useEffect(() => {
//     try {
//       const raw = sessionStorage.getItem("quotationPdfData");
//       if (!raw) return;
//       const parsed = JSON.parse(raw);
//       setForm((prev) => ({
//         ...prev,
//         ...parsed,
//         products: parsed.products?.length ? parsed.products : prev.products,
//         paymentTerms:
//           parsed.paymentTerms?.length ? parsed.paymentTerms : prev.paymentTerms,
//         services: parsed.services?.length ? parsed.services : prev.services,
//         termsConditions:
//           parsed.termsConditions?.length
//             ? parsed.termsConditions
//             : prev.termsConditions,
//         warranty: parsed.warranty?.length ? parsed.warranty : prev.warranty,
//       }));
//     } catch (error) {
//       console.error("Failed to load PDF data", error);
//     }
//   }, []);

//   const updateField = (key, value) => {
//     setForm((prev) => ({ ...prev, [key]: value }));
//   };

//   const updateProduct = (index, key, value) => {
//     setForm((prev) => {
//       const products = [...prev.products];
//       products[index] = { ...products[index], [key]: value };
//       return { ...prev, products };
//     });
//   };

//   const addProduct = () => {
//     setForm((prev) => ({
//       ...prev,
//       products: [
//         ...prev.products,
//         { name: "", capacity: "", qty: 1, unitAmount: 0, discount: 0 },
//       ],
//     }));
//   };

//   const removeProduct = (index) => {
//     setForm((prev) => ({
//       ...prev,
//       products: prev.products.filter((_, idx) => idx !== index),
//     }));
//   };

//   const updateListItem = (key, index, value) => {
//     setForm((prev) => {
//       const list = [...prev[key]];
//       list[index] = value;
//       return { ...prev, [key]: list };
//     });
//   };

//   const addListItem = (key) => {
//     setForm((prev) => ({ ...prev, [key]: [...prev[key], ""] }));
//   };

//   const removeListItem = (key, index) => {
//     setForm((prev) => ({
//       ...prev,
//       [key]: prev[key].filter((_, idx) => idx !== index),
//     }));
//   };

//   const updateWarranty = (index, key, value) => {
//     setForm((prev) => {
//       const warranty = [...prev.warranty];
//       warranty[index] = { ...warranty[index], [key]: value };
//       return { ...prev, warranty };
//     });
//   };

//   const addWarranty = () => {
//     setForm((prev) => ({
//       ...prev,
//       warranty: [...prev.warranty, { title: "", value: "" }],
//     }));
//   };

//   const removeWarranty = (index) => {
//     setForm((prev) => ({
//       ...prev,
//       warranty: prev.warranty.filter((_, idx) => idx !== index),
//     }));
//   };

//   const productTotals = useMemo(() => {
//     return form.products.map((product) => {
//       const qty = Number(product.qty || 0);
//       const unit = Number(product.unitAmount || 0);
//       const discount = Number(product.discount || 0);
//       return Math.max(0, qty * unit - discount);
//     });
//   }, [form.products]);

//   const grandTotal = useMemo(() => {
//     return productTotals.reduce((sum, value) => sum + value, 0);
//   }, [productTotals]);

//   const generatePdf = () => {
//     const element = pdfRef.current;
//     if (!element) return;
//     const printWindow = window.open("", "_blank", "width=900,height=700");
//     if (!printWindow) return;
//     printWindow.document.open();
//     printWindow.document.write(`
//       <!doctype html>
//       <html>
//         <head>
//           <meta charset="utf-8" />
//           <title>Quotation</title>
//           <style>
//             @page { size: A4; margin: 0; }
//             * { box-sizing: border-box; }
//             body { margin: 0; font-family: Arial, sans-serif; }
//             .page-break { page-break-before: always; }
//             .pdf-page {
//               width: 210mm;
//               min-height: 297mm;
//               margin: 0 auto;
//               background-size: cover;
//               background-position: center;
//               -webkit-print-color-adjust: exact;
//               print-color-adjust: exact;
//             }
//             @media print {
//               body { margin: 0; }
//               .pdf-page { box-shadow: none; }
//             }
//           </style>
//         </head>
//         <body>${element.outerHTML}</body>
//       </html>
//     `);
//     printWindow.document.close();
//     printWindow.focus();
//     printWindow.onload = () => {
//       printWindow.print();
//     };
//   };

//   return (
//     <div className="p-6">
//       <button
//         onClick={generatePdf}
//         className="mb-4 px-6 py-2 bg-green-600 text-white rounded"
//       >
//         Download PDF
//       </button>

//       <div className="mb-6 grid grid-cols-1 gap-4 rounded border border-gray-200 bg-white p-4">
//         <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
//           <label className="text-sm">
//             Date
//             <input
//               className="mt-1 w-full rounded border px-3 py-2"
//               value={form.date}
//               onChange={(event) => updateField("date", event.target.value)}
//             />
//           </label>
//           <label className="text-sm">
//             Reference
//             <input
//               className="mt-1 w-full rounded border px-3 py-2"
//               value={form.ref}
//               onChange={(event) => updateField("ref", event.target.value)}
//             />
//           </label>
//           <label className="text-sm">
//             Company Name
//             <input
//               className="mt-1 w-full rounded border px-3 py-2"
//               value={form.companyName}
//               onChange={(event) => updateField("companyName", event.target.value)}
//             />
//           </label>
//           <label className="text-sm">
//             Company Address
//             <input
//               className="mt-1 w-full rounded border px-3 py-2"
//               value={form.companyAddress}
//               onChange={(event) =>
//                 updateField("companyAddress", event.target.value)
//               }
//             />
//           </label>
//           <label className="text-sm">
//             Kind Attention
//             <input
//               className="mt-1 w-full rounded border px-3 py-2"
//               value={form.attentionTo}
//               onChange={(event) => updateField("attentionTo", event.target.value)}
//             />
//           </label>
//           <label className="text-sm">
//             Subject
//             <input
//               className="mt-1 w-full rounded border px-3 py-2"
//               value={form.subject}
//               onChange={(event) => updateField("subject", event.target.value)}
//             />
//           </label>
//         </div>
//         <label className="text-sm">
//           Intro Text
//           <textarea
//             className="mt-1 w-full rounded border px-3 py-2"
//             rows={2}
//             value={form.intro}
//             onChange={(event) => updateField("intro", event.target.value)}
//           />
//         </label>

//         <div>
//           <div className="mb-2 flex items-center justify-between">
//             <h3 className="font-semibold">Products</h3>
//             <button
//               className="rounded bg-blue-600 px-3 py-1 text-sm text-white"
//               type="button"
//               onClick={addProduct}
//             >
//               Add Product
//             </button>
//           </div>
//           <div className="space-y-3">
//             {form.products.map((product, index) => (
//               <div key={index} className="grid grid-cols-1 gap-2 md:grid-cols-6">
//                 <input
//                   className="rounded border px-2 py-2"
//                   placeholder="Product"
//                   value={product.name}
//                   onChange={(event) =>
//                     updateProduct(index, "name", event.target.value)
//                   }
//                 />
//                 <input
//                   className="rounded border px-2 py-2"
//                   placeholder="Capacity"
//                   value={product.capacity}
//                   onChange={(event) =>
//                     updateProduct(index, "capacity", event.target.value)
//                   }
//                 />
//                 <input
//                   className="rounded border px-2 py-2"
//                   placeholder="Qty"
//                   type="number"
//                   min="1"
//                   value={product.qty}
//                   onChange={(event) =>
//                     updateProduct(index, "qty", event.target.value)
//                   }
//                 />
//                 <input
//                   className="rounded border px-2 py-2"
//                   placeholder="Unit Amount"
//                   type="number"
//                   min="0"
//                   value={product.unitAmount}
//                   onChange={(event) =>
//                     updateProduct(index, "unitAmount", event.target.value)
//                   }
//                 />
//                 <input
//                   className="rounded border px-2 py-2"
//                   placeholder="Discount"
//                   type="number"
//                   min="0"
//                   value={product.discount}
//                   onChange={(event) =>
//                     updateProduct(index, "discount", event.target.value)
//                   }
//                 />
//                 <div className="flex items-center gap-2">
//                   <span className="text-sm font-semibold">
//                     {productTotals[index]?.toFixed(2)}
//                   </span>
//                   <button
//                     className="rounded bg-red-500 px-2 py-1 text-xs text-white"
//                     type="button"
//                     onClick={() => removeProduct(index)}
//                   >
//                     Remove
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//           <div className="mt-3 text-right text-sm font-semibold">
//             Grand Total: {grandTotal.toFixed(2)}
//           </div>
//         </div>

//         <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
//           <label className="text-sm">
//             Installation/Unit
//             <input
//               className="mt-1 w-full rounded border px-3 py-2"
//               value={form.installationUnit}
//               onChange={(event) =>
//                 updateField("installationUnit", event.target.value)
//               }
//             />
//           </label>
//           <label className="text-sm">
//             Monthly Rent
//             <input
//               className="mt-1 w-full rounded border px-3 py-2"
//               value={form.monthlyRent}
//               onChange={(event) =>
//                 updateField("monthlyRent", event.target.value)
//               }
//             />
//           </label>
//         </div>

//         <div>
//           <div className="mb-2 flex items-center justify-between">
//             <h3 className="font-semibold">Payment Terms</h3>
//             <button
//               className="rounded bg-blue-600 px-3 py-1 text-sm text-white"
//               type="button"
//               onClick={() => addListItem("paymentTerms")}
//             >
//               Add
//             </button>
//           </div>
//           {form.paymentTerms.map((term, index) => (
//             <div key={index} className="mb-2 flex items-center gap-2">
//               <input
//                 className="w-full rounded border px-3 py-2"
//                 value={term}
//                 onChange={(event) =>
//                   updateListItem("paymentTerms", index, event.target.value)
//                 }
//               />
//               <button
//                 className="rounded bg-red-500 px-2 py-1 text-xs text-white"
//                 type="button"
//                 onClick={() => removeListItem("paymentTerms", index)}
//               >
//                 Remove
//               </button>
//             </div>
//           ))}
//         </div>

//         <div>
//           <div className="mb-2 flex items-center justify-between">
//             <h3 className="font-semibold">Services</h3>
//             <button
//               className="rounded bg-blue-600 px-3 py-1 text-sm text-white"
//               type="button"
//               onClick={() => addListItem("services")}
//             >
//               Add
//             </button>
//           </div>
//           {form.services.map((service, index) => (
//             <div key={index} className="mb-2 flex items-center gap-2">
//               <input
//                 className="w-full rounded border px-3 py-2"
//                 value={service}
//                 onChange={(event) =>
//                   updateListItem("services", index, event.target.value)
//                 }
//               />
//               <button
//                 className="rounded bg-red-500 px-2 py-1 text-xs text-white"
//                 type="button"
//                 onClick={() => removeListItem("services", index)}
//               >
//                 Remove
//               </button>
//             </div>
//           ))}
//         </div>

//         <div>
//           <div className="mb-2 flex items-center justify-between">
//             <h3 className="font-semibold">Warranty & Parts</h3>
//             <button
//               className="rounded bg-blue-600 px-3 py-1 text-sm text-white"
//               type="button"
//               onClick={addWarranty}
//             >
//               Add
//             </button>
//           </div>
//           {form.warranty.map((item, index) => (
//             <div key={index} className="mb-2 grid grid-cols-1 gap-2 md:grid-cols-3">
//               <input
//                 className="rounded border px-3 py-2"
//                 placeholder="Description"
//                 value={item.title}
//                 onChange={(event) =>
//                   updateWarranty(index, "title", event.target.value)
//                 }
//               />
//               <input
//                 className="rounded border px-3 py-2"
//                 placeholder="Value"
//                 value={item.value}
//                 onChange={(event) =>
//                   updateWarranty(index, "value", event.target.value)
//                 }
//               />
//               <button
//                 className="rounded bg-red-500 px-2 py-1 text-xs text-white"
//                 type="button"
//                 onClick={() => removeWarranty(index)}
//               >
//                 Remove
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* PDF CONTENT */}
//       <div ref={pdfRef} className="w-[210mm] mx-auto">
//         {/* ================= PAGE 1 ================= */}
//         <section
//           className="pdf-page relative min-h-[297mm] p-10 text-sm"
//           style={{
//             backgroundImage: `url(${bgImage})`,
//             backgroundSize: "cover",
//             backgroundPosition: "center",
//           }}
//         >
//           <div className="flex justify-between items-start mb-6">
//             <div className="font-bold text-lg text-red-600">RENT RO</div>
//             <div className="text-right">
//               <div className="font-semibold text-sm">RENT RO COMPANY</div>
//               <div className="text-xs">United Arab Emirates | Kingdom of Saudi Arabia</div>
//             </div>
//           </div>

//           {/* Dynamic header */}
//           <div className="flex justify-between mb-6">
//             <div>
//               <p><strong>Date:</strong> {form.date}</p>
//               <p><strong>Ref:</strong> {form.ref}</p>
//             </div>
//           </div>

//           <div className="mb-6">
//             <p><strong>M/s:</strong> {form.companyName}</p>
//             <p>{form.companyAddress}</p>
//             <p className="mt-2"><strong>Kind Attention:</strong> {form.attentionTo}</p>
//           </div>

//           <h2 className="font-bold mb-4">Subject: {form.subject}</h2>

//           <p className="mb-4">{form.intro}</p>

//           {/* Table */}
//           <table className="w-full border border-black text-[11px] mb-6">
//             <thead>
//               <tr className="border">
//                 <th className="border p-2">#</th>
//                 <th className="border p-2">Product</th>
//                 <th className="border p-2">Capacity</th>
//                 <th className="border p-2">Qty</th>
//                 <th className="border p-2">Unit</th>
//                 <th className="border p-2">Discount</th>
//                 <th className="border p-2">Total</th>
//               </tr>
//             </thead>
//             <tbody>
//               {form.products.map((product, index) => (
//                 <tr key={index}>
//                   <td className="border p-2">{index + 1}</td>
//                   <td className="border p-2">{product.name}</td>
//                   <td className="border p-2">{product.capacity}</td>
//                   <td className="border p-2">{product.qty}</td>
//                   <td className="border p-2">
//                     {Number(product.unitAmount || 0).toFixed(2)}
//                   </td>
//                   <td className="border p-2">
//                     {Number(product.discount || 0).toFixed(2)}
//                   </td>
//                   <td className="border p-2">
//                     {productTotals[index]?.toFixed(2)}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//           <p className="font-semibold">Installation/Unit: {form.installationUnit}</p>
//           <p className="font-semibold">Monthly Rent: {form.monthlyRent}</p>
//           <p className="font-semibold mt-2">Grand Total: {grandTotal.toFixed(2)}</p>

//           <div className="absolute bottom-6 left-10 right-10 text-[10px] text-white bg-sky-500 rounded-full px-4 py-2">
//             CR: 7051513526 - VAT: 314172652400003 - BLDG 6996, AL OLAYA DIST, RIYADH, KINGDOM OF SAUDI ARABIA |
//             +971 50 670 9963 | INFO@RENTRO.AE | WWW.RENTRO.AE
//           </div>
//         </section>

//         {/* PAGE BREAK */}
//         <div className="page-break"></div>

//         {/* ================= PAGE 2 ================= */}
//         <section
//           className="pdf-page relative min-h-[297mm] p-10 text-sm"
//           style={{
//             backgroundImage: `url(${bgImage})`,
//             backgroundSize: "cover",
//             backgroundPosition: "center",
//           }}
//         >
//           <div className="flex justify-between items-start mb-6">
//             <div className="font-bold text-lg text-red-600">RENT RO</div>
//             <div className="text-right">
//               <div className="font-semibold text-sm">RENT RO COMPANY</div>
//             </div>
//           </div>

//           <h2 className="font-bold mb-4">Payment Terms</h2>
//           <ul className="list-disc pl-6 space-y-2">
//             {form.paymentTerms.map((term, index) => (
//               <li key={index}>{term}</li>
//             ))}
//           </ul>

//           <h2 className="font-bold mt-6 mb-4 text-red-500">Maintenance & Service</h2>
//           <ul className="list-disc pl-6 space-y-2">
//             {form.services.map((service, index) => (
//               <li key={index}>{service}</li>
//             ))}
//           </ul>

//           <h2 className="font-bold mt-6 mb-4">Terms & Conditions</h2>
//           <ul className="list-disc pl-6 space-y-2">
//             {form.termsConditions.map((term, index) => (
//               <li key={index}>{term}</li>
//             ))}
//           </ul>

//           <p className="mt-10">
//             <strong>Best Regards</strong><br />
//             {form.closingCompany}<br />
//             {form.closingName}<br />
//             {form.closingRole}
//           </p>

//           <div className="absolute bottom-6 left-10 right-10 text-[10px] text-white bg-sky-500 rounded-full px-4 py-2">
//             CR: 7051513526 - VAT: 314172652400003 - BLDG 6996, AL OLAYA DIST, RIYADH, KINGDOM OF SAUDI ARABIA |
//             +971 50 670 9963 | INFO@RENTRO.AE | WWW.RENTRO.AE
//           </div>
//         </section>

//         <div className="page-break"></div>

//         {/* ================= PAGE 3 ================= */}
//         <section
//           className="pdf-page relative min-h-[297mm] p-10 text-sm"
//           style={{
//             backgroundImage: `url(${bgImage})`,
//             backgroundSize: "cover",
//             backgroundPosition: "center",
//           }}
//         >
//           <div className="flex justify-between items-start mb-6">
//             <div className="font-bold text-lg text-red-600">RENT RO</div>
//             <div className="text-right">
//               <div className="font-semibold text-sm">RENT RO COMPANY</div>
//             </div>
//           </div>
//           <h2 className="font-bold mb-4">Warranty & Parts</h2>

//           <table className="w-full border border-black text-[11px]">
//             <thead>
//               <tr>
//                 <th className="border p-2">S.No</th>
//                 <th className="border p-2">Description</th>
//                 <th className="border p-2">RENT RO</th>
//               </tr>
//             </thead>
//             <tbody>
//               {form.warranty.map((item, index) => (
//                 <tr key={index}>
//                   <td className="border p-2">{index + 1}</td>
//                   <td className="border p-2">{item.title}</td>
//                   <td className="border p-2">{item.value}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//           <p className="mt-10 italic text-center">{form.footerQuote}</p>

//           <div className="absolute bottom-6 left-10 right-10 text-[10px] text-white bg-sky-500 rounded-full px-4 py-2">
//             CR: 7051513526 - VAT: 314172652400003 - BLDG 6996, AL OLAYA DIST, RIYADH, KINGDOM OF SAUDI ARABIA |
//             +971 50 670 9963 | INFO@RENTRO.AE | WWW.RENTRO.AE
//           </div>
//         </section>

//         <div className="page-break"></div>

//         {/* ================= PAGE 4 ================= */}
//         <section
//           className="pdf-page relative min-h-[297mm] p-10 text-sm"
//           style={{
//             backgroundImage: `url(${bgImage})`,
//             backgroundSize: "cover",
//             backgroundPosition: "center",
//           }}
//         >
//           <div className="flex justify-between items-start mb-6">
//             <div className="font-bold text-lg text-red-600">RENT RO</div>
//             <div className="text-right">
//               <div className="font-semibold text-sm">RENT RO COMPANY</div>
//             </div>
//           </div>
//           <h2 className="font-bold mb-4 text-center">Service & Maintenance</h2>
//           <table className="w-full border border-black text-[11px]">
//             <thead>
//               <tr>
//                 <th className="border p-2">Item</th>
//                 <th className="border p-2">Every 90 Days</th>
//                 <th className="border p-2">Others</th>
//               </tr>
//             </thead>
//             <tbody>
//               {form.serviceMaintenance.map((row, index) => (
//                 <tr key={index}>
//                   <td className="border p-2">{row.item}</td>
//                   <td className="border p-2">{row.every90Days}</td>
//                   <td className="border p-2">{row.others}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//           <div className="absolute bottom-6 left-10 right-10 text-[10px] text-white bg-sky-500 rounded-full px-4 py-2">
//             CR: 7051513526 - VAT: 314172652400003 - BLDG 6996, AL OLAYA DIST, RIYADH, KINGDOM OF SAUDI ARABIA |
//             +971 50 670 9963 | INFO@RENTRO.AE | WWW.RENTRO.AE
//           </div>
//         </section>

//         <div className="page-break"></div>

//         {/* ================= PAGE 5 ================= */}
//         <section
//           className="pdf-page relative min-h-[297mm] p-10 text-sm flex flex-col justify-center items-center text-center"
//           style={{
//             backgroundImage: `url(${bgImage})`,
//             backgroundSize: "cover",
//             backgroundPosition: "center",
//           }}
//         >
//           <h2 className="font-bold text-xl mb-2">Now or Later "Change is Confined"</h2>
//           <p className="mb-4">Let’s be first towards Change</p>
//           <p className="mb-4">Be the Role model for Society & Upcoming Generations</p>
//           <p className="font-semibold">Let’s make our planet Green again</p>

//           <div className="absolute bottom-6 left-10 right-10 text-[10px] text-white bg-sky-500 rounded-full px-4 py-2">
//             CR: 7051513526 - VAT: 314172652400003 - BLDG 6996, AL OLAYA DIST, RIYADH, KINGDOM OF SAUDI ARABIA |
//             +971 50 670 9963 | INFO@RENTRO.AE | WWW.RENTRO.AE
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// };

// export default QuotationPdf;


import React, { useEffect, useMemo, useRef, useState } from "react";
import bgImage from "../assets/pdf-bg.jpeg";

const QuotationPdf = () => {
  const pdfRef = useRef();
  const [form, setForm] = useState({
    date: "17/11/2025",
    ref: "RO/QTN/25/11/10044",
    companyName: "ABC Company",
    companyAddress: "City, Country",
    attentionTo: "Mr. XYZ",
    clientCity: "",
    clientAttendant: "",
    subject: "Water Purification Systems - Monthly Rental Plan - 400 GPD",
    
    // Delivery & Installation
    products: [
      {
        name: "RO Water Purifier with (Multiple dispense points)",
        capacity: "400 GPD",
        qty: 1,
        installationUnit: "SAR: 000.00",
        totalAmount: "000.00"
      },
    ],
    
    // Monthly Rent
    monthlyRentProducts: [
      {
        product: "RO Water Purifier with (Multiple dispense points)",
        monthlyRent: "SAR: 00.00",
        qtyMonths: 12,
        totalAmount: "000.00"
      },
    ],
    
    notes: [
      "The above Installation charges includes plumbing material, fittings, Electrical Material, Fittings & Manpower Charges",
      "Rent starts along with Store opening for new stores.",
      "Subscription can be cancelled anytime by giving 1 month notice."
    ],
    
    paymentTerms: [
      "Installation charges & First Month Rent has to pay upon completion of installation.",
      "First Month rental is charged Pro-Rata basis.",
      "Every Month prepaid rent to be paid at the beginning of the month.",
      "LPO has to issue before installation with the payment terms of CDC / TT upon installation.",
      "Online Transfers/Cheque Payment."
    ],
    
    maintenanceService: [
      "Service availability 24x7 - 365 Days",
      "Services and maintenance are free of charge.",
      "Periodic service for every 60 days by RENTRO in order to maintain water quality and machine durability.",
      "Service includes consumables and parts. (Consumables will be replaced as per the manufacturer standard)",
      "Any breakdown complaints shall attend within 24 - 6 hours of reporting. Complaints has to raise by email / WhatsApp. (support@rentro.ae / 050-6709963)"
    ],
    
    otherTerms: [
      "If the rented items have been tampered or damaged, an equivalent amount of the new product shall be imposed and may lead to forfeit of the deposit.",
      "Penalty of SAR 20 per month for each delay in monthly rental payment.",
      "If the payment is not made for consecutive 2 months, the contract shall be deemed as terminated and the final settlement will be made after receiving the rented item in good condition. The final settlement shall include charges towards delay in rental payment and breach of contract policy.",
      "Water connection point and electrical point to be provided by client."
    ],
    
    warrantyParts: [
      { description: "Warranty", value: "Lifetime" },
      { description: "Replacement of RO unit", value: "36 Months (Free of Cost)" },
      { description: "Pump", value: "Lifetime - Free Replacement" },
      { description: "Membrane", value: "Lifetime - Free Replacement" },
      { description: "Solenoid", value: "Lifetime - Free Replacement" },
      { description: "High Pressure Switch", value: "Lifetime - Free Replacement" },
      { description: "Low Pressure Switch", value: "Lifetime - Free Replacement" },
      { description: "Adapters", value: "Lifetime - Free Replacement" },
      { description: "Pressure Gauges", value: "Lifetime - Free Replacement" },
      { description: "Leakages", value: "Lifetime - Free Replacement" },
      { description: "Connections & Fittings", value: "Lifetime - Free Replacement" },
      { description: "Pre-Filter Stages", value: "Lifetime - Free Replacement" },
      { description: "Pressure Tanks", value: "Lifetime - Free Replacement" }
    ],
    
    serviceMaintenance: [
      { item: "PPM (Periodical Service)", rentro: "Every 60 Days", others: "120 or 180 Days" },
      { item: "Teardown Services", rentro: "6 Services", others: "1 or 2" },
      { item: "Service Certifications", rentro: "On every service", others: "Yes" },
      { item: "Service Reports", rentro: "On every service", others: "Yes" },
      { item: "Technical Team Availability", rentro: "24 Hrs./365 Days", others: "9 AM to 5 PM (restrictions with them)" },
      { item: "Hilltop Readability", rentro: "24 Hours", others: "77" },
      { item: "Complaints", rentro: "within 8 to 45 Hours (Any radius in UAE)", others: "77" },
      { item: "Emergency Call calls", rentro: "Unlimited Free", others: "77" },
      { item: "Holdings (Eid, National Day etc.)", rentro: "Support Teams Available", others: "77" },
      { item: "Change of required parts", rentro: "onsite [everything is pre-approved - Technicians allowed to use all parts to create the issue]", others: "need approvals from both parties which can lead to a compromise on quality of water" }
    ]
  });

  useEffect(() => {
    const load = () => {
      try {
        const raw = sessionStorage.getItem("quotationPdfData");
        if (!raw) return;
        const parsed = JSON.parse(raw);
        setForm((prev) => ({
          ...prev,
          ...parsed,
          products: parsed.products?.length ? parsed.products : prev.products,
          monthlyRentProducts: parsed.monthlyRentProducts?.length
            ? parsed.monthlyRentProducts
            : prev.monthlyRentProducts,
          paymentTerms: parsed.paymentTerms?.length ? parsed.paymentTerms : prev.paymentTerms,
          purchasePurpose: parsed.purchasePurpose || prev.purchasePurpose,
          maintenanceService: parsed.maintenanceService?.length
            ? parsed.maintenanceService
            : prev.maintenanceService,
          otherTerms: parsed.otherTerms?.length ? parsed.otherTerms : prev.otherTerms,
          warrantyParts: parsed.warrantyParts?.length ? parsed.warrantyParts : prev.warrantyParts,
          attentionTo:
            parsed.attentionTo ||
            parsed.clientAttendant ||
            parsed.companyName ||
            prev.attentionTo,
          companyAddress: parsed.clientCity || parsed.companyAddress || prev?.countryCode,
        }));
      } catch (error) {
        console.error("Failed to load PDF data", error);
      }
    };
    load();
    window.addEventListener("focus", load);
    return () => window.removeEventListener("focus", load);
  }, []);

  const updateField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const generatePdf = () => {
    const element = pdfRef.current;
    if (!element) return;
    
    const printWindow = window.open("", "_blank", "width=900,height=700");
    if (!printWindow) return;
    
    printWindow.document.open();
    printWindow.document.write(`
      <!doctype html>
      <html>
        <head>
          <meta charset="utf-8" />
          <title>Quotation - RENTRO COMPANY</title>
          <style>
            @page { 
              size: A4; 
              margin: 0;
            }
            * { 
              box-sizing: border-box; 
              margin: 0; 
              padding: 0; 
            }
            body { 
              margin: 0; 
              font-family: Arial, sans-serif;
              font-size: 12px;
              line-height: 1.4;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            .pdf-page {
              width: 210mm;
              min-height: 297mm;
              position: relative;
              background-image: url('${bgImage}');
              background-size: cover;
              background-position: center;
              background-repeat: no-repeat;
            }
            .page-content {
              padding: 40mm 20mm 30mm 20mm;
              min-height: 297mm;
            }
            .page-break {
              page-break-before: always;
            }
            .letter-head {
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              padding: 15mm 20mm;
              background: transparent;
              border-bottom: 2px solid #1e40af;
            }
            .company-header {
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin-bottom: 10px;
            }
            .company-name-main {
              font-size: 28px;
              font-weight: bold;
              color: #1e40af;
              text-transform: uppercase;
            }
            .company-name-arabic {
              font-size: 16px;
              color: #666;
              text-align: right;
              margin-top: 5px;
            }
            .company-contact {
              text-align: right;
              font-size: 10px;
              color: #444;
            }
            .footer {
              position: absolute;
              bottom: 15mm;
              left: 20mm;
              right: 20mm;
              background: rgba(30, 64, 175, 0.9);
              color: white;
              padding: 8px 15px;
              border-radius: 4px;
              font-size: 9px;
              text-align: center;
              font-weight: 500;
              display: flex;
              justify-content: space-between;
              align-items: center;
            }
            .footer-contacts {
              display: flex;
              gap: 15px;
              align-items: center;
            }
            .footer-contacts span {
              display: flex;
              align-items: center;
              gap: 5px;
            }
            .client-info {
              background: rgba(248, 250, 252, 0.95);
              padding: 12px 15px;
              border-radius: 4px;
              border-left: 4px solid #1e40af;
              margin-bottom: 15px;
              border: 1px solid #e2e8f0;
            }
            .date-ref {
              display: flex;
              justify-content: space-between;
              margin-bottom: 15px;
              font-size: 11px;
            }
            .subject {
              font-size: 14px;
              font-weight: bold;
              color: #1e293b;
              margin: 0px 0;
              padding: 4px 0;
              
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin: 15px 0;
              font-size: 11px;
              background: white;
            }
            table th {
              background-color: white;
              color: black;
              font-weight: bold;
              padding: 8px 6px;
              text-align: left;
              border: 1px solid black;
            }
            table td {
              padding: 8px 6px;
              border: 1px solid #cbd5e1;
            }
            table tr:nth-child(even) {
              background-color: rgba(248, 250, 252, 0.8);
            }
            .notes {
              margin: 15px 0;
              padding: 12px;
              background: rgba(254, 252, 232, 0.9);
              border-left: 4px solid #eab308;
              font-size: 11px;
            }
            .section-title {
              font-size: 14px;
              font-weight: bold;
              color: red;
              margin: 20px 0 10px 0;
              text-align: center;
              padding-bottom: 5px;
              text-decoration: underline;
            }
            .terms-list {
              margin: 10px 0 20px 0;
              padding-left: 20px;
              list-style-type: lower-alpha;
            }
            .terms-list li {
              margin-bottom: 2px;
              font-size: 11px;
            }
            .signature {
              margin-top: 30px;
              padding-top: 20px;
              border-top: 1px solid #cbd5e1;
            }
            .signature-name {
              font-size: 14px;
              font-weight: bold;
              color: black;
              font-style: italic;
            }
            .warranty-title {
              text-align: center;
              font-size: 18px;
              font-weight: bold;
              color: red;
              text-decoration: underline;
              margin: 20px 0;
            }
            .service-table {
              width: 100%;
              border-collapse: collapse;
              margin: 15px 0;
              font-size: 10px;
            }
            .service-table th {
              background-color: lightgray;
              color: black;
              padding: 8px;
              text-align: center;
              border: 1px solid black;
            }
            .service-table td {
              padding: 8px;
              border: 1px solid #cbd5e1;
              vertical-align: top;
            }
            .final-page-content {
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              text-align: center;
              height: 200mm;
              padding: 0 20mm;
            }
            .quote-main {
              font-size: 24px;
              font-weight: bold;
              color: red;
              margin: 20px 0;
              text-transform: uppercase;
            }
            .quote-sub {
              font-size: 18px;
              color: #1e293b;
              margin: 15px 0;
              font-style: italic;
            }
            .quote-text {
              font-size: 16px;
              color: #374151;
              margin: 10px 0;
            }
            .quote-green {
              font-size: 20px;
              font-weight: bold;
              color: #059669;
              margin: 20px 0;
              font-style: italic;
            }
            .country-tags {
              display: flex;
              justify-content: center;
              gap: 30px;
              margin-top: 20px;
              font-size: 12px;
              font-weight: bold;
              color: red;
            }
            @media print {
              body {
                margin: 0;
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
              }
              .pdf-page {
                box-shadow: none;
                margin: 0;
              }
            }
          </style>
        </head>
        <body>${element.outerHTML}</body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.onload = () => {
      printWindow.print();
    };
  };

  return (
    <div className="p-6 bg-gray-100 flex justify-center items-center mt-16">
      <button
        onClick={generatePdf}
        className="mb-6 px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white font-semibold rounded-lg shadow-lg transition duration-200 flex items-center gap-2"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        Generate PDF
      </button>

      {/* PDF Preview */}
      <div className="bg-white hidden rounded-lg shadow-xl p-2 mb-6 overflow-hidden border border-gray-300">
        <div ref={pdfRef} className="scale-75 origin-top">
          {/* ================= PAGE 1 ================= */}
          <section className="pdf-page">
            
            
            <div className="page-content">
              <div className="date-ref">
                <div><strong>Date:</strong> {form.date}</div>
                <div><strong>Ref:</strong> {form.ref}</div>
              </div>

              <div className="client-info">
                <div><strong>M/s:</strong> {form.companyName}</div>
                <div>
                  {form.clientCity || form?.companyAddress}
                  {form.countryCode ? `, ${form.countryCode}` : ""}
                </div>
                <div className="mt-1">
                  <strong>Kind Attention:</strong>{" "}
                  {form.attentionTo || form.clientAttendant || form.companyName}
                </div>
              </div>

              <div className="subject">Subject: Water Purification System - Monthly Rent- {form?.products.map((product) => product.name).join(", ")}</div>
              <div className="subject" >Project / {form?.purchasePurpose} : <span class="text-red-500">{form?.clientCity|| "N/A"}</span></div>

              <p className="mb-1 text-sm">
                Dear Sir/Madam,<br />
With reference to your enquiry, regarding the supply of Water Purification Systems on Rental
              </p>
              <p className="mb-6 text-lg">Plan for your well-known organization. We hereby submitting our quote for {form?.purchasePurpose}  at 
<span class="text-red-500 subject">{" "+form?.clientCity}</span> as follows:
</p>

              <div className="section-title">DELIVERY & INSTALLATION</div>
              <table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Product</th>
                    <th>Capacity</th>
                    <th>Qty</th>
                    <th>Installation/Unit</th>
                    <th>Total Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {form.products.map((product, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{product.name}</td>
                      <td>{product.capacity}</td>
                      <td>{product.qty}</td>
                      <td>SAR: {product.installationCharge ?? form.installationUnit}</td>
                      <td>SAR: {product.total}</td>
                    </tr>
                  ))}
                  <tr>
                    <td colSpan="5" className="text-right font-bold">Total</td>
                    <td className="font-bold">
                      {form.products.reduce((sum, p) => sum + Number(p.total || 0), 0).toFixed(2)}
                    </td>
                  </tr>
                </tbody>
              </table>

              <div className="section-title">Monthly Rent</div>
              <table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Product</th>
                    <th>Monthly Rent</th>
                    <th>Qty/Months</th>
                    <th>Total Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {form.monthlyRentProducts.map((product, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{product.product}</td>
                      <td>SAR: {product.monthlyRent || form.monthlyRent}</td>
                      <td>{product.qtyMonths}</td>
                      <td> SAR {product.totalAmount}</td>
                    </tr>
                  ))}
                  <tr>
                    <td colSpan="4" className="text-right font-bold">Total</td>
                    <td className="font-bold">
                      {form.monthlyRentProducts
                        .reduce((sum, p) => sum + Number(p.totalAmount || 0), 0)
                        .toFixed(2)}
                    </td>
                  </tr>
                </tbody>
              </table>

              <div className="notes">
                <div className="font-bold mb-2">Note:</div>
                <ol className="list-decimal pl-5 space-y-1">
                  {form.notes.map((note, index) => (
                    <li key={index} className="text-sm">{note}</li>
                  ))}
                </ol>
              </div>
            </div>

           
          </section>

          {/* ================= PAGE 2 ================= */}
          <div className="page-break"></div>
          <section className="pdf-page">
           
            
            <div className="page-content">
              <div className="section-title">1. Payment Terms:</div>
              <ol className="list-decimal pl-5 space-y-1 terms-list">
                {form.paymentTerms.map((term, index) => (
                  <li key={index} className="text-sm">{term}</li>
                ))}
              </ol>

              <div className="section-title">2. Maintenance and Service:</div>
              <h4>Maintenance and Service In Rentro</h4>

              <ul className="list-[lower-alpha] pl-5 terms-list">
                {form.serviceMaintenance.map((term, index) => (
                  <li key={index} className="text-sm">{term?.item}-{term?.rentro}</li>
                ))}
              </ul>

              <h4>Maintenance and Service In Other Company</h4>

              <ul className="list-[lower-alpha] pl-5  terms-list">
                {form.serviceMaintenance.map((term, index) => (
                  <li key={index} className="text-sm">{term?.item} - {term?.others}</li>
                ))}
              </ul>

              <div className="section-title">3. Other Terms & Conditions:</div>
              <ol className="list-decimal pl-5 space-y-1 terms-list">
                {form.otherTerms.map((term, index) => (
                  <li key={index} className="text-sm">{term}</li>
                ))}
              </ol>

              <div className="signature">
                <div className="font-bold text-lg mb-1">Best Regards</div>
                <div className="signature-name">M/S RENTRO COMPANY</div>
                <div class="font-semibold text-sm mt-1">Muzammil Ahmed</div>
                <div className="text-gray-600 text-sm">C.O.O. & Co-Founder</div>
                <div className="mt-1 text-sm">050-670 9963</div>
              </div>
            </div>


          </section>

          {/* ================= PAGE 3 ================= */}
          <div className="page-break"></div>
          <section className="pdf-page">
          
            <div className="page-content">
              <div className="warranty-title">Warranty & Parts</div>
              
              <table className="service-table">
                <thead>
                  <tr>
                    <th>No.</th>
                    <th>Description</th>
                    <th>RENTRO</th>
                  </tr>
                </thead>
                <tbody>
                  {form.warrantyParts.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.description}</td>
                      <td>{item.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

         
          </section>

          {/* ================= PAGE 4 ================= */}
          <div className="page-break"></div>
          <section className="pdf-page">
          
            
            <div className="page-content">
              <div className="warranty-title">Service & Maintenance</div>
              
              <table className="service-table">
                <thead>
                  <tr>
                    <th>S.No</th>
                    <th>Description</th>
                    <th>RENTRO</th>
                    <th>Others</th>
                  </tr>
                </thead>
                <tbody>
                  {form.serviceMaintenance.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.item}</td>
                      <td>{item.rentro}</td>
                      <td>{item.others}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

         
          </section>

          {/* ================= PAGE 5 ================= */}
          <div className="page-break"></div>
          <section className="pdf-page">
        
            
            <div className="final-page-content">
              <div className="quote-main">Now or Later "Change is Confined"</div>
              <div className="quote-sub">"Let's be first towards Change"</div>
              <div className="quote-text">Be the Role model for Society & Upcoming Generations</div>
              <img className="w-full h-[60vh]" src="https://png.pngtree.com/thumb_back/fh260/background/20240810/pngtree-d-dry-and-cracked-soil-due-to-lack-of-water-with-image_16152570.jpg" alt="" />
              <div className="quote-green">"Let's make our planet Green again"</div>
            </div>

            
          </section>
        </div>
      </div>

 
    </div>
  );
};

export default QuotationPdf;
