// // import "../App.css";
// // import { useLocation, Link } from "react-router-dom";
// // import { useMemo, useState } from "react";
// // import { jsPDF } from "jspdf";
// // import { getDatabase } from "../database/rxdb";

// // const timeOptions = [
// //   { label: "1 Day", value: "1" },
// //   { label: "3 Days", value: "3" },
// //   { label: "7 Days", value: "7" },
// // ];

// // export default function CreateQuotation() {
// //   const location = useLocation();
// //   const product = location.state?.product;

// //   const [clientName, setClientName] = useState("");
// //   const [quantity, setQuantity] = useState(1);
// //   const [unitAmount, setUnitAmount] = useState("");
// //   const [serviceDays, setServiceDays] = useState("3");
// //   const [countryCode, setCountryCode] = useState("AE");
// //   const [isSaving, setIsSaving] = useState(false);
// //   const [savedQuotation, setSavedQuotation] = useState(null);

// //   const priceLabel = useMemo(() => {
// //     const price = product?.productFor?.rent?.monthlyPrice;
// //     if (!price) return "AED 0 / month";
// //     return `AED ${Number(price).toFixed(0)} / month`;
// //   }, [product]);

// //   const quotationAmount = useMemo(() => {
// //     const base = Number(unitAmount || 0);
// //     return base * Math.max(1, quantity || 1);
// //   }, [unitAmount, quantity]);

// //   const createRefNo = (sequence, country) => {
// //     const now = new Date();
// //     const yy = String(now.getFullYear()).slice(-2);
// //     const mm = String(now.getMonth() + 1).padStart(2, "0");
// //     const serial = String(sequence).padStart(5, "0");
// //     return `RRO/${country}/${yy}/${mm}/${serial}`;
// //   };

// //   const handleCreateQuotation = async () => {
// //     if (!product) return;
// //     setIsSaving(true);
// //     try {
// //       const db = await getDatabase();
// //       const existing = await db.quotations.find().exec();
// //       const sequence = existing.length + 1;
// //       const quotationRefNo = createRefNo(sequence, countryCode);
// //       const quotation = {
// //         id: quotationRefNo,
// //         createdAt: new Date().toISOString(),
// //         productName: product.name,
// //         quantity: Math.max(1, quantity || 1),
// //         quotationAmount,
// //         quotationRefNo,
// //         installationPeriod: `${serviceDays} Day(s)`,
// //         countryCode,
// //       };
// //       await db.quotations.insert(quotation);
// //       setSavedQuotation(quotation);
// //     } catch (error) {
// //       console.error("Failed to save quotation:", error);
// //     } finally {
// //       setIsSaving(false);
// //     }
// //   };

// //   const handleDownloadPdf = () => {
// //     if (!savedQuotation) return;
// //     const doc = new jsPDF();

// //     doc.setFontSize(18);
// //     doc.text("Quotation", 14, 20);

// //     doc.setFontSize(12);
// //     doc.text(`Quotation Ref No: ${savedQuotation.quotationRefNo}`, 14, 35);
// //     doc.text(`Product Name: ${savedQuotation.productName}`, 14, 45);
// //     doc.text(`Quantity: ${savedQuotation.quantity}`, 14, 55);
// //     doc.text(`Quotation Amount: AED ${savedQuotation.quotationAmount.toFixed(0)}`, 14, 65);
// //     doc.text(`Installation Period: ${savedQuotation.installationPeriod}`, 14, 75);

// //     doc.save(`${savedQuotation.quotationRefNo}.pdf`);
// //   };

// //   return (
// //     <section className="screen">
// //       <div className="screen-header">
// //         <h2>Create Quotation</h2>
// //         <p>Fill in client details and confirm the selected product.</p>
// //       </div>

// //       {!product ? (
// //         <div className="empty-state">
// //           <p>No product selected yet.</p>
// //           <Link to="/new-quotation" className="primary-btn">
// //             Choose a Product
// //           </Link>
// //         </div>
// //       ) : (
// //         <div className="quotation-layout">
// //           <div className="selected-product">
// //             <h3>Selected Product</h3>
// //             <div className="product-card">
// //               <div className="product-image">
// //                 {product.images?.[0]?.imageUrl ? (
// //                   <img src={product.images[0].imageUrl} alt={product.name} />
// //                 ) : (
// //                   <span>No Image</span>
// //                 )}
// //               </div>
// //               <div className="product-details">
// //                 <h4>{product.name}</h4>
// //                 <p>{product.description}</p>
// //                 <span className="price">{priceLabel}</span>
// //               </div>
// //             </div>
// //           </div>

// //           <form className="quotation-form" onSubmit={(event) => event.preventDefault()}>
// //             <div className="form-field">
// //               <label htmlFor="client-name">Client Name</label>
// //               <input
// //                 id="client-name"
// //                 type="text"
// //                 placeholder="Enter client name"
// //                 value={clientName}
// //                 onChange={(event) => setClientName(event.target.value)}
// //               />
// //             </div>
// //             <div className="form-field">
// //               <label htmlFor="country-code">Country</label>
// //               <select
// //                 id="country-code"
// //                 value={countryCode}
// //                 onChange={(event) => setCountryCode(event.target.value)}
// //               >
// //                 <option value="AE">AE</option>
// //                 <option value="SA">SA</option>
// //               </select>
// //             </div>
// //             <div className="form-field">
// //               <label htmlFor="quantity">Quantity</label>
// //               <input
// //                 id="quantity"
// //                 type="number"
// //                 min="1"
// //                 value={quantity}
// //                 onChange={(event) => setQuantity(Number(event.target.value))}
// //               />
// //             </div>
// //             <div className="form-field">
// //               <label htmlFor="unit-amount">Quotation Amount (per unit)</label>
// //               <input
// //                 id="unit-amount"
// //                 type="number"
// //                 min="0"
// //                 step="0.01"
// //                 placeholder="Enter amount per unit"
// //                 value={unitAmount}
// //                 onChange={(event) => setUnitAmount(event.target.value)}
// //               />
// //             </div>
// //             <div className="form-field">
// //               <label>Service Timeline</label>
// //               <div className="timeline-options">
// //                 {timeOptions.map((option) => (
// //                   <label key={option.value} className="timeline-chip">
// //                     <input
// //                       type="radio"
// //                       name="service-days"
// //                       value={option.value}
// //                       checked={serviceDays === option.value}
// //                       onChange={(event) => setServiceDays(event.target.value)}
// //                     />
// //                     {option.label}
// //                   </label>
// //                 ))}
// //               </div>
// //             </div>
// //             <div className="quotation-summary">
// //               <span>Quotation Amount</span>
// //               <strong>AED {quotationAmount.toFixed(2)}</strong>
// //             </div>
// //             <div className="quotation-actions">
// //               <button
// //                 className="primary-btn"
// //                 type="button"
// //                 onClick={handleCreateQuotation}
// //                 disabled={isSaving}
// //               >
// //                 {isSaving ? "Saving..." : "Create Quotation"}
// //               </button>
// //               <button
// //                 className="ghost-btn"
// //                 type="button"
// //                 onClick={handleDownloadPdf}
// //                 disabled={!savedQuotation}
// //               >
// //                 Download PDF
// //               </button>
// //             </div>
// //           </form>
// //         </div>
// //       )}
// //     </section>
// //   );
// // }





// // src/components/CreateQuotation.jsx
// import { useLocation, Link } from "react-router-dom";
// import { useMemo, useState, useEffect } from "react";
// import { databaseService } from "../database/databaseService";
// import { v4 as uuidv4 } from 'uuid';

// const timeOptions = [
//   { label: "1 Day", value: "1" },
//   { label: "3 Days", value: "3" },
//   { label: "7 Days", value: "7" },
//   { label: "14 Days", value: "14" },
//   { label: "30 Days", value: "30" },
//   { label: "Custom", value: "custom" },
// ];

// const installationPeriods = [
//   { label: "Immediate", value: "immediate" },
//   { label: "Within 7 days", value: "7_days" },
//   { label: "Within 14 days", value: "14_days" },
//   { label: "Within 30 days", value: "30_days" },
//   { label: "Custom date", value: "custom_date" },
// ];

// const purchasePurposes = [
//   { label: "Store", value: "store" },
//   { label: "Supermarket", value: "supermarket" },
//   { label: "Warehouse", value: "warehouse" },
//   { label: "Office", value: "office" },
//   { label: "Restaurant", value: "restaurant" },
//   { label: "Hotel", value: "hotel" },
//   { label: "Residential", value: "residential" },
//   { label: "Other", value: "other" },
// ];

// export default function CreateQuotation() {
//   const location = useLocation();
//   const product = location.state?.product;

//   const [clientName, setClientName] = useState("");
//   const [quantity, setQuantity] = useState(1);
//   const [serviceDays, setServiceDays] = useState("3");
//   const [installationPeriod, setInstallationPeriod] = useState("immediate");
//   const [purchasePurpose, setPurchasePurpose] = useState("store");
//   const [customInstallationDate, setCustomInstallationDate] = useState("");
//   const [customDays, setCustomDays] = useState("");
//   const [customPurpose, setCustomPurpose] = useState("");
//   const [quotationAmount, setQuotationAmount] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [submitError, setSubmitError] = useState(null);
//   const [submitSuccess, setSubmitSuccess] = useState(false);

//   // Initialize database
//   useEffect(() => {
//     databaseService.initialize().catch(console.error);
//   }, []);

//   const priceLabel = useMemo(() => {
//     const price = product?.productFor?.rent?.monthlyPrice;
//     if (!price) return "AED 0 / month";
//     return `AED ${Number(price).toFixed(0)} / month`;
//   }, [product]);

//   // Calculate total amount based on quantity and price
//   const calculateTotal = useMemo(() => {
//     if (!product || !quotationAmount) return "0.00";
//     const unitPrice = parseFloat(quotationAmount) || 0;
//     const qty = quantity || 1;
//     const total = unitPrice * qty;
//     return total.toFixed(2);
//   }, [quantity, quotationAmount, product]);

//   const handleServiceDaysChange = (value) => {
//     setServiceDays(value);
//     if (value !== "custom") {
//       setCustomDays("");
//     }
//   };

//   const handleInstallationPeriodChange = (value) => {
//     setInstallationPeriod(value);
//     if (value !== "custom_date") {
//       setCustomInstallationDate("");
//     }
//   };

//   const handlePurchasePurposeChange = (value) => {
//     setPurchasePurpose(value);
//     if (value !== "other") {
//       setCustomPurpose("");
//     }
//   };

//   const handleCreateQuotation = async () => {
//     if (!clientName || !quotationAmount || !product) {
//       setSubmitError("Please fill all required fields");
//       return;
//     }

//     setIsSubmitting(true);
//     setSubmitError(null);

//     try {
//       const quotationData = {
//         clientName,
//         quantity,
//         serviceDays: serviceDays === "custom" ? customDays : serviceDays,
//         installationPeriod: installationPeriod === "custom_date" 
//           ? customInstallationDate 
//           : installationPeriod,
//         purchasePurpose: purchasePurpose === "other" ? customPurpose : purchasePurpose,
//         quotationAmount: parseFloat(quotationAmount),
//         totalAmount: parseFloat(calculateTotal),
//         productId: product.id,
//         productDetails: {
//           id: product.id,
//           name: product.name,
//           description: product.description,
//           images: product.images || []
//         }
//       };

//       const result = await databaseService.createQuotation(quotationData);
      
//       setSubmitSuccess(true);
      
//       // Reset form
//       setClientName("");
//       setQuantity(1);
//       setServiceDays("3");
//       setInstallationPeriod("immediate");
//       setPurchasePurpose("store");
//       setCustomInstallationDate("");
//       setCustomDays("");
//       setCustomPurpose("");
//       setQuotationAmount("");
      
//       // Auto-hide success message
//       setTimeout(() => setSubmitSuccess(false), 3000);
      
//       console.log("Quotation created:", result);
      
//     } catch (error) {
//       console.error("Failed to create quotation:", error);
//       setSubmitError(error.message || "Failed to create quotation");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // Handle form submission with Enter key
//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter' && !isSubmitting) {
//       handleCreateQuotation();
//     }
//   };

//   return (
//     <section className="min-h-screen bg-gray-50 p-4 md:p-6">
//       <div className="max-w-6xl mx-auto">
//         <div className="mb-8">
//           <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Create Quotation</h2>
//           <p className="text-gray-600 mt-2">Fill in client details and confirm the selected product.</p>
//         </div>

//         {/* Success Message */}
//         {submitSuccess && (
//           <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
//             <p className="text-green-700 font-medium">✓ Quotation created successfully!</p>
//           </div>
//         )}

//         {/* Error Message */}
//         {submitError && (
//           <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
//             <p className="text-red-700 font-medium">{submitError}</p>
//           </div>
//         )}

//         {!product ? (
//           <div className="bg-white rounded-xl shadow-md p-8 text-center">
//             <p className="text-gray-600 mb-4">No product selected yet.</p>
//             <Link 
//               to="/new-quotation" 
//               className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
//             >
//               Choose a Product
//             </Link>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" onKeyPress={handleKeyPress}>
//             {/* Selected Product Card */}
//             <div className="bg-white rounded-xl shadow-md p-6">
//               <h3 className="text-lg font-semibold text-gray-900 mb-4">Selected Product</h3>
//               <div className="flex flex-col sm:flex-row gap-4 p-4 border border-gray-200 rounded-lg">
//                 <div className="w-full sm:w-32 h-32 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
//                   {product.images?.[0]?.imageUrl ? (
//                     <img 
//                       src={product.images[0].imageUrl} 
//                       alt={product.name}
//                       className="w-full h-full object-cover"
//                     />
//                   ) : (
//                     <div className="w-full h-full flex items-center justify-center text-gray-400">
//                       No Image
//                     </div>
//                   )}
//                 </div>
//                 <div className="flex-1">
//                   <h4 className="text-xl font-semibold text-gray-900 mb-2">{product.name}</h4>
//                   <p className="text-gray-600 mb-3 line-clamp-2">{product.description}</p>
//                   <span className="text-green-600 font-bold text-lg">{priceLabel}</span>
//                 </div>
//               </div>
//             </div>

//             {/* Quotation Form */}
//             <div className="bg-white rounded-xl shadow-md p-6">
//               {/* Client Name */}
//               <div className="mb-6">
//                 <label htmlFor="client-name" className="block text-sm font-medium text-gray-900 mb-2">
//                   Client Name <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   id="client-name"
//                   type="text"
//                   placeholder="Enter client name"
//                   value={clientName}
//                   onChange={(event) => setClientName(event.target.value)}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
//                   required
//                   disabled={isSubmitting}
//                 />
//               </div>

//               {/* Quantity and Amount */}
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
//                 <div>
//                   <label htmlFor="quantity" className="block text-sm font-medium text-gray-900 mb-2">
//                     Quantity <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     id="quantity"
//                     type="number"
//                     min="1"
//                     value={quantity}
//                     onChange={(event) => setQuantity(Number(event.target.value))}
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
//                     required
//                     disabled={isSubmitting}
//                   />
//                 </div>
//                 <div>
//                   <label htmlFor="quotation-amount" className="block text-sm font-medium text-gray-900 mb-2">
//                     Quotation Amount (AED) <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     id="quotation-amount"
//                     type="number"
//                     step="0.01"
//                     min="0"
//                     placeholder="0.00"
//                     value={quotationAmount}
//                     onChange={(event) => setQuotationAmount(event.target.value)}
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
//                     required
//                     disabled={isSubmitting}
//                   />
//                 </div>
//               </div>

//               {/* Total Amount Display */}
//               <div className="mb-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
//                 <div className="flex justify-between items-center mb-1">
//                   <span className="text-sm font-medium text-gray-900">Total Amount</span>
//                   <span className="text-2xl font-bold text-green-600">AED {calculateTotal}</span>
//                 </div>
//                 <p className="text-xs text-gray-500">
//                   Quantity: {quantity} × AED {quotationAmount || "0.00"}
//                 </p>
//               </div>

//               {/* Service Timeline */}
//               <div className="mb-6">
//                 <label className="block text-sm font-medium text-gray-900 mb-3">
//                   Service Timeline <span className="text-red-500">*</span>
//                 </label>
//                 <div className="flex flex-wrap gap-2">
//                   {timeOptions.map((option) => (
//                     <label 
//                       key={option.value} 
//                       className={`inline-flex items-center px-4 py-2 rounded-full border cursor-pointer transition-colors ${
//                         serviceDays === option.value 
//                           ? 'bg-blue-50 border-blue-500 text-blue-700' 
//                           : 'bg-gray-50 border-gray-300 text-gray-700 hover:bg-gray-100'
//                       } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
//                     >
//                       <input
//                         type="radio"
//                         name="service-days"
//                         value={option.value}
//                         checked={serviceDays === option.value}
//                         onChange={(event) => handleServiceDaysChange(event.target.value)}
//                         className="sr-only"
//                         disabled={isSubmitting}
//                       />
//                       <span className="text-sm font-medium">{option.label}</span>
//                     </label>
//                   ))}
//                 </div>
//                 {serviceDays === "custom" && (
//                   <div className="mt-4 flex items-center gap-2">
//                     <input
//                       type="number"
//                       min="1"
//                       placeholder="Enter number of days"
//                       value={customDays}
//                       onChange={(event) => setCustomDays(event.target.value)}
//                       className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
//                       disabled={isSubmitting}
//                     />
//                     <span className="text-gray-600 font-medium">days</span>
//                   </div>
//                 )}
//               </div>

//               {/* Installation Period */}
//               <div className="mb-6">
//                 <label className="block text-sm font-medium text-gray-900 mb-2">
//                   Installation Period <span className="text-red-500">*</span>
//                 </label>
//                 <select 
//                   value={installationPeriod} 
//                   onChange={(event) => handleInstallationPeriodChange(event.target.value)}
//                   className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors appearance-none bg-white ${
//                     isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
//                   }`}
//                   disabled={isSubmitting}
//                 >
//                   {installationPeriods.map((option) => (
//                     <option key={option.value} value={option.value}>
//                       {option.label}
//                     </option>
//                   ))}
//                 </select>
//                 {installationPeriod === "custom_date" && (
//                   <div className="mt-4">
//                     <input
//                       type="date"
//                       value={customInstallationDate}
//                       onChange={(event) => setCustomInstallationDate(event.target.value)}
//                       min={new Date().toISOString().split('T')[0]}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
//                       disabled={isSubmitting}
//                     />
//                   </div>
//                 )}
//               </div>

//               {/* Purchasing For */}
//               <div className="mb-8">
//                 <label className="block text-sm font-medium text-gray-900 mb-2">
//                   Purchasing For <span className="text-red-500">*</span>
//                 </label>
//                 <select 
//                   value={purchasePurpose} 
//                   onChange={(event) => handlePurchasePurposeChange(event.target.value)}
//                   className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors appearance-none bg-white ${
//                     isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
//                   }`}
//                   disabled={isSubmitting}
//                 >
//                   {purchasePurposes.map((option) => (
//                     <option key={option.value} value={option.value}>
//                       {option.label}
//                     </option>
//                   ))}
//                 </select>
//                 {purchasePurpose === "other" && (
//                   <div className="mt-4">
//                     <input
//                       type="text"
//                       placeholder="Specify purpose"
//                       value={customPurpose}
//                       onChange={(event) => setCustomPurpose(event.target.value)}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
//                       disabled={isSubmitting}
//                     />
//                   </div>
//                 )}
//               </div>

//               {/* Submit Button */}
//               <button 
//                 type="button"
//                 onClick={handleCreateQuotation}
//                 disabled={!clientName || !quotationAmount || isSubmitting}
//                 className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
//                   !clientName || !quotationAmount || isSubmitting
//                     ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
//                     : 'bg-blue-600 text-white hover:bg-blue-700'
//                 }`}
//               >
//                 {isSubmitting ? (
//                   <span className="flex items-center justify-center">
//                     <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                     </svg>
//                     Creating...
//                   </span>
//                 ) : (
//                   'Create Quotation'
//                 )}
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </section>
//   );
// }



// src/components/CreateQuotation.jsx
import { useLocation, Link, useParams, useNavigate } from "react-router-dom";
import { useMemo, useState, useEffect } from "react";
import { databaseService } from "../database/databaseService";
import QuotationPdf from "./QuotationPdf";
import { v4 as uuidv4 } from 'uuid';

const timeOptions = [
  { label: "1 Day", value: "1" },
  { label: "3 Days", value: "3" },
  { label: "7 Days", value: "7" },
  { label: "14 Days", value: "14" },
  { label: "30 Days", value: "30" },
  { label: "Custom", value: "custom" },
];

const installationPeriods = [
  { label: "Immediate", value: "immediate" },
  { label: "Within 7 days", value: "7_days" },
  { label: "Within 14 days", value: "14_days" },
  { label: "Within 30 days", value: "30_days" },
  { label: "Custom date", value: "custom_date" },
];

const DEFAULT_PURPOSE = "Store";

const createEmptyPurchaseLocation = () => ({
  city: "",
  area: "",
  purpose: DEFAULT_PURPOSE,
  customPurpose: "",
});

const normalizePurposeValue = (value) => {
  const raw = String(value || "").trim();
  return raw || DEFAULT_PURPOSE;
};

const resolvePurposeLabel = (entry) => {
  if (!entry) return DEFAULT_PURPOSE;
  const purpose = String(entry.purpose || "").trim();
  if (purpose.toLowerCase() === "other") {
    return String(entry.customPurpose || "").trim() || DEFAULT_PURPOSE;
  }
  return purpose || String(entry.customPurpose || "").trim() || DEFAULT_PURPOSE;
};

const sanitizePurchaseLocations = (locations) => {
  const list = Array.isArray(locations) ? locations : [];
  if (list.length === 0) return [createEmptyPurchaseLocation()];
  return list.map((entry) => ({
    city: String(entry?.city || "").trim(),
    area: String(entry?.area || "").trim(),
    purpose: normalizePurposeValue(entry?.purpose),
    customPurpose: String(entry?.customPurpose || "").trim()
  }));
};

const formatPurchaseLocation = (entry) => {
  if (!entry) return "";
  const purpose = resolvePurposeLabel(entry);
  const city = String(entry.city || "").trim();
  const area = String(entry.area || "").trim();
  const place = [city, area].filter(Boolean).join(", ");
  return [purpose, place ? `at ${place}` : ""].filter(Boolean).join(" ");
};

const quotationTypeOptions = [
  { label: "Rental Quotation", value: "Rental Quotation" },
  { label: "Sales Quotation", value: "Sales Quotation" },
  { label: "Service Quotation", value: "Service Quotation" },
  { label: "AMC Quotation", value: "AMC Quotation" },
  { label: "RENT 2 OWN Quotation", value: "RENT 2 OWN Quotation" },
];

const countryOptions = [
  { label: "United Arab Emirates", value: "AE" },
  { label: "Saudi Arabia", value: "SA" },
  { label: "India", value: "IN" },
  { label: "Qatar", value: "QA" },
  { label: "Oman", value: "OM" },
];

export default function CreateQuotation() {
  const location = useLocation();
  const { id: editId } = useParams();
  const navigate = useNavigate();
  const incomingQuotationType = location.state?.quotationType;
  const storedProduct = useMemo(() => {
    try {
      const raw = sessionStorage.getItem("selectedProduct");
      return raw ? JSON.parse(raw) : null;
    } catch (error) {
      console.error("Failed to read stored product", error);
      return null;
    }
  }, []);
  const storedProducts = useMemo(() => {
    try {
      const raw = sessionStorage.getItem("selectedProducts");
      return raw ? JSON.parse(raw) : null;
    } catch (error) {
      console.error("Failed to read stored products", error);
      return null;
    }
  }, []);
  const storedQuotationType = useMemo(() => {
    try {
      return sessionStorage.getItem("selectedQuotationType");
    } catch (error) {
      console.error("Failed to read stored quotation type", error);
      return null;
    }
  }, []);
  const [selectedProduct, setSelectedProduct] = useState(storedProduct);
  const [products, setProducts] = useState(
    location.state?.products ??
      storedProducts ??
      (storedProduct ? [storedProduct] : [])
  );
  const [clientName, setClientName] = useState("");
  const [clientAttendant, setClientAttendant] = useState("");
  const [clientCity, setClientCity] = useState("");
  const [clientArea, setClientArea] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [serviceDays, setServiceDays] = useState("3");
  const [installationPeriod, setInstallationPeriod] = useState("immediate");
  const [purchasePurpose, setPurchasePurpose] = useState(DEFAULT_PURPOSE);
  const [quotationType, setQuotationType] = useState(
    incomingQuotationType || storedQuotationType || "Rental Quotation"
  );
    const [countryCode, setCountryCode] = useState("AE");
  const [quotationRefNo, setQuotationRefNo] = useState("");
  const [isLoadingQuotation, setIsLoadingQuotation] = useState(false);
  const [showPdfPreview, setShowPdfPreview] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [showQuotationTypeSelector, setShowQuotationTypeSelector] = useState(false);
  const [productId, setProductId] = useState("");
  const [formCacheLoaded, setFormCacheLoaded] = useState(false);
  const product = selectedProduct;
  const [customInstallationDate, setCustomInstallationDate] = useState("");
  const [customDays, setCustomDays] = useState("");
  const [customPurpose, setCustomPurpose] = useState("");
  const [purchaseLocations, setPurchaseLocations] = useState([
    createEmptyPurchaseLocation(),
  ]);
  const [quotationAmount, setQuotationAmount] = useState("");
  const [services, setServices] = useState([""]);
  const [paymentTerms, setPaymentTerms] = useState([
    "Installation charges & first month rent payable upon installation.",
    "Monthly rent prepaid at beginning of every month.",
    "Online Transfer / Cheque accepted.",
  ]);
  const [termsConditions, setTermsConditions] = useState([
    "Quotation validity: 30 days from the date of issue.",
  ]);
  const [warrantyItems, setWarrantyItems] = useState([
    { title: "Warranty", value: "Lifetime" },
    { title: "RO Unit Replacement", value: "36 Months" },
  ]);
  const [serviceMaintenance, setServiceMaintenance] = useState([
    { item: "PPM (Periodical Service)", rentro: "Every 60 Days", others: "120 or 180 Days" },
    { item: "Teardown Services", rentro: "6 Services", others: "1 or 2" },
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const pageTitle = editId ? "Edit Quotation" : "Create Quotation";
  const inputClass =
    "w-full px-4 py-3 border border-slate-300 rounded-xl bg-white shadow-sm focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-colors";
  const sectionClass =
    "mb-6 rounded-2xl border border-slate-200 bg-slate-50/70 p-4 md:p-5";
  const addButtonClass =
    "rounded-lg bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed";
  const removeButtonClass =
    "rounded-lg border border-rose-200 bg-white px-3 py-1.5 text-xs font-semibold text-rose-600 shadow-sm transition hover:border-rose-300 hover:bg-rose-50";

  // This useEffect was causing an infinite loop and has been removed.
  // The logic has been moved to the useEffect that handles location state changes.

  const updateProductField = (index, key, value) => {
    setProducts((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [key]: value };
      return next;
    });
  };

  const handleRemoveProduct = (productIdToRemove) => {
    setProducts(prevProducts => {
      const updatedProducts = prevProducts.filter(p => (p.productId ?? p.id) !== productIdToRemove);
      
      sessionStorage.setItem("selectedProducts", JSON.stringify(updatedProducts));

      if (selectedProduct && (selectedProduct.productId ?? selectedProduct.id) === productIdToRemove) {
        setSelectedProduct(updatedProducts.length > 0 ? updatedProducts[0] : null);
      }

      return updatedProducts;
    });
  };

  const productTotals = useMemo(() => {
    return products.map((item) => {
      const qty = Number(item.qty || 0);
      const deliveryInstall = Number(item.installationCharge || 0);
      const deliveryDiscount = Number(item.discount || 0);
      const monthlyRent = Number(item.monthlyRent || 0);
      const monthlyDiscount = Number(item.monthlyDiscount || 0);
      const monthsQty = Number(item.monthsQty || 0);
      const salesUnit = Number(item.salesUnitAmount || item.salesAmount || 0);
      const salesDiscount = Number(item.salesDiscount || 0);
      const rentToOwnUpfrontUnit = Number(item.rentToOwnUpfrontUnit || 0);
      const rentToOwnUpfrontDiscount = Number(item.rentToOwnUpfrontDiscount || 0);
      const rentToOwnMonthlyUnit = Number(item.rentToOwnMonthlyUnit || 0);
      const rentToOwnMonthlyDiscount = Number(item.rentToOwnMonthlyDiscount || 0);
      const rentToOwnMonthsQty = Number(item.rentToOwnMonthsQty || 0);
      const rentalSelected = quotationType === "Rental Quotation";
      const salesSelected = quotationType === "Sales Quotation";
      const serviceSelected = quotationType === "Service Quotation";
      const amcSelected = quotationType === "AMC Quotation";
      const rentToOwnSelected = quotationType === "RENT 2 OWN Quotation";

      const deliveryTotal = qty * Math.max(0, deliveryInstall - deliveryDiscount);
      const rentalTotal = rentalSelected
        ? qty * Math.max(0, monthlyRent - monthlyDiscount) * Math.max(1, monthsQty)
        : 0;
      const salesTotal =
        salesSelected || serviceSelected || amcSelected
          ? qty * Math.max(0, salesUnit - salesDiscount)
          : 0;
      const rentToOwnUpfrontTotal = rentToOwnSelected
        ? qty * Math.max(0, rentToOwnUpfrontUnit - rentToOwnUpfrontDiscount)
        : 0;
      const rentToOwnMonthlyTotal = rentToOwnSelected
        ? qty *
          Math.max(0, rentToOwnMonthlyUnit - rentToOwnMonthlyDiscount) *
          Math.max(1, rentToOwnMonthsQty)
        : 0;

      const total =
        deliveryTotal +
        rentalTotal +
        salesTotal +
        rentToOwnUpfrontTotal +
        rentToOwnMonthlyTotal;
      return Math.max(0, total);
    });
  }, [products, quotationType]);

  const grandTotal = useMemo(() => {
    return productTotals.reduce((sum, value) => sum + value, 0);
  }, [productTotals]);

  // Initialize database
  useEffect(() => {
    databaseService.initialize().catch(console.error);
  }, []);

  useEffect(() => {
    const raw = product?.productId ?? product?.id;
    if (raw !== undefined && raw !== null) {
      setProductId(String(raw));
    }
  }, [product]);

  const priceLabel = useMemo(() => {
    const price = product?.productFor?.rent?.monthlyPrice;
    if (!price) return "AED 0 / month";
    return `AED ${Number(price).toFixed(0)} / month`;
  }, [product]);

  useEffect(() => {
    const incomingProducts = location.state?.products;
    const nextQuotationType = location.state?.quotationType;

    if (!editId && nextQuotationType) {
      setQuotationType(nextQuotationType);
      try {
        sessionStorage.setItem("selectedQuotationType", nextQuotationType);
      } catch (error) {
        console.error("Failed to cache quotation type", error);
      }
    }

    if (incomingProducts) {
      const extractCapacity = (name) => {
        if (!name) return "";
        const match = String(name).match(/(\d+\s*(?:GPD|TPD|LPH|L\/H|LPM))/i);
        return match ? match[0].toUpperCase() : "";
      };

      setProducts(prevProducts => {
        const newProductList = [...prevProducts];

        incomingProducts.forEach(p => {
          const pid = p.productId ?? p.id;
          if (!newProductList.find(m => (m.productId ?? m.id) === pid)) {
            const productWithDefaults = {
              ...p,
              qty: p.qty ?? 1,
              discount: p.discount ?? 0,
              capacity: p.capacity || extractCapacity(p.name),
              installationCharge: p.installationCharge ?? 0,
              monthlyRent: p.monthlyRent ?? 0,
              monthsQty: p.monthsQty ?? 0,
              monthlyDiscount: p.monthlyDiscount ?? 0,
              salesUnitAmount: p.salesUnitAmount ?? 0,
              salesDiscount: p.salesDiscount ?? 0,
              rentToOwnUpfrontUnit: p.rentToOwnUpfrontUnit ?? 0,
              rentToOwnUpfrontDiscount: p.rentToOwnUpfrontDiscount ?? 0,
              rentToOwnMonthlyUnit: p.rentToOwnMonthlyUnit ?? 0,
              rentToOwnMonthlyDiscount: p.rentToOwnMonthlyDiscount ?? 0,
              rentToOwnMonthsQty: p.rentToOwnMonthsQty ?? 0
            };
            newProductList.push(productWithDefaults);
          }
        });
        
        if (newProductList.length > 0 && !selectedProduct) {
          setSelectedProduct(newProductList[0]);
        } else if (newProductList.length === 0) {
          setSelectedProduct(null);
        }
        
        sessionStorage.setItem("selectedProducts", JSON.stringify(newProductList));
        return newProductList;
      });
    }
  }, [editId, location.state, location.key]);

  useEffect(() => {
    // If we have products coming from the navigation state, we should not load from cache,
    // as the navigation state is more up-to-date.
    if (location.state?.products?.length > 0) {
      setFormCacheLoaded(true);
      return;
    }

    if (editId || formCacheLoaded) return;
    try {
      const raw = sessionStorage.getItem("quotationFormCache");
      if (!raw) {
        setFormCacheLoaded(true);
        return;
      }
      const cached = JSON.parse(raw);
      const cachedLocations = sanitizePurchaseLocations(
        cached.purchaseLocations?.length
          ? cached.purchaseLocations
          : [
              {
                city: cached.clientCity || "",
                area: cached.clientArea || "",
                purpose: cached.purchasePurpose || DEFAULT_PURPOSE,
                customPurpose: cached.customPurpose || "",
              },
            ]
      );
      const primaryCachedLocation = cachedLocations[0] || createEmptyPurchaseLocation();
      setClientName(cached.clientName || "");
      setClientAttendant(cached.clientAttendant || "");
      setClientCity(primaryCachedLocation.city || "");
      setClientArea(primaryCachedLocation.area || "");
      setCountryCode(cached.countryCode || "AE");
      setQuotationRefNo(cached.quotationRefNo || "");
      setServiceDays(cached.serviceDays || "3");
      setInstallationPeriod(cached.installationPeriod || "immediate");
      setPurchasePurpose(primaryCachedLocation.purpose || DEFAULT_PURPOSE);
      setQuotationType(cached.quotationType || "Rental Quotation");
      setCustomInstallationDate(cached.customInstallationDate || "");
      setCustomDays(cached.customDays || "");
      setCustomPurpose(primaryCachedLocation.customPurpose || "");
      setPurchaseLocations(cachedLocations);
      setProducts(cached.products || []);
      setServices(cached.services || [""]);
      setPaymentTerms(cached.paymentTerms || []);
      setTermsConditions(cached.termsConditions || []);
      setWarrantyItems(cached.warrantyItems || []);
      setServiceMaintenance(cached.serviceMaintenance || []);
    } catch (error) {
      console.error("Failed to load form cache", error);
    } finally {
      setFormCacheLoaded(true);
    }
  }, [editId, formCacheLoaded, location.state]);

  useEffect(() => {
    if (editId) return;
    if (!formCacheLoaded) return;
    const payload = {
      clientName,
      clientAttendant,
      clientCity,
      clientArea,
      countryCode,
      quotationRefNo,
      serviceDays,
      installationPeriod,
      purchasePurpose,
      quotationType,
      customInstallationDate,
      customDays,
      customPurpose,
      purchaseLocations,
      products,
      services,
      paymentTerms,
      termsConditions,
      warrantyItems,
      serviceMaintenance
    };
    try {
      sessionStorage.setItem("quotationFormCache", JSON.stringify(payload));
    } catch (error) {
      console.error("Failed to cache form", error);
    }
  }, [
    editId,
    formCacheLoaded,
    clientName,
    clientAttendant,
    clientCity,
    clientArea,
    countryCode,
    quotationRefNo,
    serviceDays,
    installationPeriod,
    purchasePurpose,
    quotationType,
    customInstallationDate,
    customDays,
    customPurpose,
    purchaseLocations,
    products,
    services,
    paymentTerms,
    termsConditions,
    warrantyItems,
    serviceMaintenance
  ]);

  useEffect(() => {
    if (editId) return;
    try {
      sessionStorage.setItem("selectedQuotationType", quotationType);
    } catch (error) {
      console.error("Failed to persist selected quotation type", error);
    }
  }, [editId, quotationType]);

  useEffect(() => {
    if (!editId) return;
    let isActive = true;
    setIsLoadingQuotation(true);

    databaseService
      .getQuotationById(editId)
      .then((data) => {
        if (!isActive || !data) return;
        setClientName(data.clientName || "");
        setClientAttendant(data.clientAttendant || "");
        const loadedLocations = sanitizePurchaseLocations(
          data.purchaseLocations?.length
            ? data.purchaseLocations
            : [
                {
                  city: data.clientCity || "",
                  area: data.clientArea || "",
                  purpose: data.purchasePurpose || DEFAULT_PURPOSE,
                  customPurpose: "",
                },
              ]
        );
        const primaryLoadedLocation = loadedLocations[0] || createEmptyPurchaseLocation();
        setPurchaseLocations(loadedLocations);
        setClientCity(primaryLoadedLocation.city || "");
        setClientArea(primaryLoadedLocation.area || "");
        setQuantity(Number(data.quantity || 1));
        setServiceDays(data.serviceDays || "3");
        setInstallationPeriod(data.installationPeriod || "immediate");
        setPurchasePurpose(primaryLoadedLocation.purpose || DEFAULT_PURPOSE);
        setCustomPurpose(primaryLoadedLocation.customPurpose || "");
        setQuotationAmount(
          data.quotationAmount !== undefined ? String(data.quotationAmount) : ""
        );
        setCountryCode(data.countryCode || "AE");
        setQuotationRefNo(data.quotationRefNo || "");
        setQuotationType(data.quotationType || "Rental Quotation");
        setProductId(data.productId ? String(data.productId) : "");
        setSelectedProduct(data.productDetails || null);
        setProducts(data.products?.length ? data.products : []);
        setPaymentTerms(data.paymentTerms || []);
        setTermsConditions(data.termsConditions || []);
        setWarrantyItems(
          (data.warrantyParts || []).map((item) => ({
            title: item.description || "",
            value: item.value || ""
          }))
        );
        setServiceMaintenance(data.serviceMaintenance || []);
        setServices(data.services || data.maintenanceService || []);
      })
      .catch((error) => {
        console.error("Failed to load quotation:", error);
      })
      .finally(() => {
        if (isActive) setIsLoadingQuotation(false);
      });

      return () => {
        isActive = false;
      };
  }, [editId]);

  useEffect(() => {
    const normalizedLocations = sanitizePurchaseLocations(purchaseLocations);
    const primary = normalizedLocations[0] || createEmptyPurchaseLocation();
    const nextPurpose = String(primary.purpose || DEFAULT_PURPOSE).trim() || DEFAULT_PURPOSE;
    const nextCustomPurpose = String(primary.customPurpose || "");
    if (clientCity !== primary.city) setClientCity(primary.city);
    if (clientArea !== primary.area) setClientArea(primary.area);
    if (purchasePurpose !== nextPurpose) setPurchasePurpose(nextPurpose);
    if (customPurpose !== nextCustomPurpose) setCustomPurpose(nextCustomPurpose);
  }, [purchaseLocations, clientCity, clientArea, purchasePurpose, customPurpose]);

  // Calculate total amount based on quantity and price
  const calculateTotal = useMemo(() => {
    if (!product || !quotationAmount) return "0.00";
    const unitPrice = parseFloat(quotationAmount) || 0;
    const qty = quantity || 1;
    const total = unitPrice * qty;
    return total.toFixed(2);
  }, [quantity, quotationAmount, product]);

  const handleServiceDaysChange = (value) => {
    setServiceDays(value);
    if (value !== "custom") {
      setCustomDays("");
    }
  };

  const handleInstallationPeriodChange = (value) => {
    setInstallationPeriod(value);
    if (value !== "custom_date") {
      setCustomInstallationDate("");
    }
  };

  const updatePurchaseLocation = (index, key, value) => {
    setPurchaseLocations((prev) =>
      prev.map((entry, entryIndex) =>
        entryIndex === index ? { ...entry, [key]: value } : entry
      )
    );
  };

  const handlePurchasePurposeChange = (index, value) => {
    setPurchaseLocations((prev) =>
      prev.map((entry, entryIndex) =>
        entryIndex === index
          ? {
              ...entry,
              purpose: String(value || ""),
              customPurpose: "",
            }
          : entry
      )
    );
  };

  const addPurchaseLocation = () => {
    setPurchaseLocations((prev) => {
      const base = prev[prev.length - 1] || createEmptyPurchaseLocation();
      return [
        ...prev,
        {
          city: base.city || "",
          area: base.area || "",
          purpose: base.purpose || DEFAULT_PURPOSE,
          customPurpose: base.customPurpose || "",
        },
      ];
    });
  };

  const removePurchaseLocation = (index) => {
    setPurchaseLocations((prev) => {
      if (prev.length <= 1) return prev;
      return prev.filter((_, entryIndex) => entryIndex !== index);
    });
  };

  const updateListItem = (setter) => (index, value) => {
    setter((prev) => {
      const list = [...prev];
      list[index] = value;
      return list;
    });
  };

  const addListItem = (setter, value = "") => {
    setter((prev) => [...prev, value]);
  };

  const removeListItem = (setter, index) => {
    setter((prev) => prev.filter((_, idx) => idx !== index));
  };

  const updateWarrantyItem = (index, key, value) => {
    setWarrantyItems((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [key]: value };
      return next;
    });
  };

  const addWarrantyItem = () => {
    setWarrantyItems((prev) => [...prev, { title: "", value: "" }]);
  };

  const removeWarrantyItem = (index) => {
    setWarrantyItems((prev) => prev.filter((_, idx) => idx !== index));
  };

  const updateServiceMaintenance = (index, key, value) => {
    setServiceMaintenance((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [key]: value };
      return next;
    });
  };

  const addServiceMaintenance = () => {
    setServiceMaintenance((prev) => [
      ...prev,
      { item: "", rentro: "", others: "" },
    ]);
  };

    const removeServiceMaintenance = (index) => {
      setServiceMaintenance((prev) => prev.filter((_, idx) => idx !== index));
    };

    const buildPdfPayload = (refNoToUse) => {
      const attendantName = clientAttendant.trim() || clientName.trim();
      const normalizedLocations = sanitizePurchaseLocations(purchaseLocations);
      const primaryLocation = normalizedLocations[0] || createEmptyPurchaseLocation();
      const primaryPurpose = resolvePurposeLabel(primaryLocation) || DEFAULT_PURPOSE;
        return {
          date: new Date().toLocaleDateString(),
          ref: refNoToUse || quotationRefNo || "",
          companyName: clientName,
          companyAddress: primaryLocation.city || clientCity || "",
          countryCode,
          attentionTo: attendantName,
          subject: "",
          intro: "",
          installationUnit: "",
          monthlyRent: "",
          quotationType,
        products: products.map((item, index) => ({
          name: item.name || "",
          capacity: item.capacity || "",
          qty: Number(item.qty || 0),
          discount: Number(item.discount || 0),
          installationCharge: Number(item.installationCharge || 0),
          monthlyRent: Number(item.monthlyRent || 0),
          monthlyDiscount: Number(item.monthlyDiscount || 0),
          monthsQty: Number(item.monthsQty || 0),
          salesUnitAmount: Number(item.salesUnitAmount || 0),
          salesDiscount: Number(item.salesDiscount || 0),
          rentToOwnUpfrontUnit: Number(item.rentToOwnUpfrontUnit || 0),
          rentToOwnUpfrontDiscount: Number(item.rentToOwnUpfrontDiscount || 0),
          rentToOwnMonthlyUnit: Number(item.rentToOwnMonthlyUnit || 0),
          rentToOwnMonthlyDiscount: Number(item.rentToOwnMonthlyDiscount || 0),
          rentToOwnMonthsQty: Number(item.rentToOwnMonthsQty || 0),
          total: productTotals[index] || 0,
        })),
          monthlyRentProducts: products.map((item, index) => ({
            product: item.name || "",
            monthlyRent: Number(item.monthlyRent || 0),
            qtyMonths: Number(item.monthsQty || 0),
            totalAmount: Number(item.monthlyRent || 0) * Number(item.monthsQty || 0),
          })),
          paymentTerms,
          maintenanceService: services,
          serviceMaintenance,
          otherTerms: termsConditions,
          warrantyParts: warrantyItems.map((item) => ({
            description: item.title,
            value: item.value,
          })),
        clientCity: primaryLocation.city || clientCity || "",
        clientArea: primaryLocation.area || clientArea || "",
        clientAttendant: attendantName,
        purchasePurpose: primaryPurpose,
        purchaseLocations: normalizedLocations.map((entry) => ({
          city: entry.city,
          area: entry.area,
          purpose: entry.purpose,
          customPurpose: entry.customPurpose,
          purposeLabel: resolvePurposeLabel(entry),
          label: formatPurchaseLocation(entry),
        })),
        purchaseSummary: normalizedLocations
          .map((entry) => formatPurchaseLocation(entry))
          .filter(Boolean)
          .join(" | "),
      };
    };

    const handleCreateQuotation = async ({ navigateToPdf = false } = {}) => {
    // Validate required fields
    if (!clientName) {
      setSubmitError("Please enter client name");
      return;
    }
    
    if (grandTotal <= 0) {
      setSubmitError("Please enter product amounts to calculate total");
      return;
    }
    
    if (products.length === 0) {
      setSubmitError("Product information is missing. Please select a product.");
      return;
    }

    const normalizedLocations = sanitizePurchaseLocations(purchaseLocations);
    const hasInvalidLocation = normalizedLocations.some((entry) => {
      const purpose = resolvePurposeLabel(entry);
      return !entry.city || !purpose;
    });
    if (hasInvalidLocation) {
      setSubmitError("Please complete City and Purchasing For in all purchase entries.");
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const now = new Date();
      const yy = String(now.getFullYear()).slice(-2);
      const mm = String(now.getMonth() + 1).padStart(2, "0");
      const nowIso = new Date().toISOString();

      const existing = await databaseService.getAllQuotations();
      const sequence = existing.length + 1;
      const primaryLocation = normalizedLocations[0] || createEmptyPurchaseLocation();

      const primaryProduct = products[0];
      const primaryId =
        primaryProduct?.productId ?? primaryProduct?.id ?? productId;
      const productDetails = primaryProduct
        ? {
            id: String(primaryId ?? ""),
            name: primaryProduct.name || "",
            description: primaryProduct.description || "",
            images: primaryProduct.images || [],
          }
        : undefined;

      const allLocationPayload = normalizedLocations.map((entry) => ({
        city: entry.city,
        area: entry.area,
        purpose: entry.purpose,
        customPurpose: entry.customPurpose,
        purposeLabel: resolvePurposeLabel(entry),
        label: formatPurchaseLocation(entry),
      }));

      const buildRefNoBySerial = (serialNumber) =>
        `RRO/${countryCode}/${yy}/${mm}/${String(serialNumber).padStart(5, "0")}`;

      const buildQuotationDataForLocation = (locationEntry, locationIndex) => {
        const normalizedPurpose =
          resolvePurposeLabel(locationEntry) || DEFAULT_PURPOSE;
        const fallbackRefNo = buildRefNoBySerial(sequence + locationIndex);
        const refNoToUse = editId
          ? quotationRefNo || fallbackRefNo
          : normalizedLocations.length === 1 && quotationRefNo
          ? quotationRefNo
          : fallbackRefNo;

        return {
          id: editId || uuidv4(),
          clientName,
          clientAttendant: clientAttendant.trim() || clientName.trim(),
          clientCity: (locationEntry.city || "").trim(),
          clientArea: (locationEntry.area || "").trim(),
          quantity: products.reduce((sum, item) => sum + Number(item.qty || 0), 0),
          serviceDays: serviceDays === "custom" ? customDays : serviceDays,
          installationPeriod:
            installationPeriod === "custom_date"
              ? customInstallationDate
              : installationPeriod,
          purchasePurpose: normalizedPurpose,
          purchaseLocations: editId ? allLocationPayload : [allLocationPayload[locationIndex]],
          quotationType,
          quotationAmount: Number(grandTotal || 0),
          totalAmount: Number(grandTotal || 0),
          productId: String(primaryId ?? ""),
          quotationRefNo: refNoToUse,
          countryCode,
          productDetails,
          products: products.map((item, index) => ({
            id: String(item.productId ?? item.id ?? ""),
            name: item.name || "",
            capacity: item.capacity || "",
            qty: Number(item.qty || 0),
            discount: Number(item.discount || 0),
            installationCharge: Number(item.installationCharge || 0),
            monthlyRent: Number(item.monthlyRent || 0),
            monthlyDiscount: Number(item.monthlyDiscount || 0),
            monthsQty: Number(item.monthsQty || 0),
            salesUnitAmount: Number(item.salesUnitAmount || 0),
            salesDiscount: Number(item.salesDiscount || 0),
            rentToOwnUpfrontUnit: Number(item.rentToOwnUpfrontUnit || 0),
            rentToOwnUpfrontDiscount: Number(item.rentToOwnUpfrontDiscount || 0),
            rentToOwnMonthlyUnit: Number(item.rentToOwnMonthlyUnit || 0),
            rentToOwnMonthlyDiscount: Number(item.rentToOwnMonthlyDiscount || 0),
            rentToOwnMonthsQty: Number(item.rentToOwnMonthsQty || 0),
            total: productTotals[index] || 0,
            productDetails: item.productDetails || {}
          })),
          services,
          paymentTerms,
          termsConditions,
          warrantyParts: warrantyItems.map((item) => ({
            description: item.title,
            value: item.value
          })),
          serviceMaintenance,
          maintenanceService: services,
          status: "draft",
          createdAt: nowIso,
          updatedAt: nowIso,
          _deleted: false,
          _attachments: {},
          _meta: {
            lwt: Date.now()
          }
        };
      };

      const firstRefNoForPdf = editId
        ? quotationRefNo || buildRefNoBySerial(sequence)
        : normalizedLocations.length === 1 && quotationRefNo
        ? quotationRefNo
        : buildRefNoBySerial(sequence);
      const pdfPayload = buildPdfPayload(firstRefNoForPdf);
        if (navigateToPdf) {
          try {
            sessionStorage.setItem("quotationPdfData", JSON.stringify(pdfPayload));
          } catch (error) {
            console.error("Failed to store PDF data", error);
          }
        }

      let result;
      if (editId) {
        const editPayload = buildQuotationDataForLocation(primaryLocation, 0);
        result = await databaseService.updateQuotation(editId, editPayload);
      } else {
        const created = [];
        for (let i = 0; i < normalizedLocations.length; i += 1) {
          const payload = buildQuotationDataForLocation(normalizedLocations[i], i);
          const createdDoc = await databaseService.createQuotation(payload);
          created.push(createdDoc);
        }
        result = created;
      }
      
        setSubmitSuccess(true);
        if (!navigateToPdf) {
          setShowSuccessDialog(true);
        }
      
        // Reset form
        if (!editId && !navigateToPdf) {
          setClientName("");
          setClientAttendant("");
          setQuantity(1);
          setServiceDays("3");
          setInstallationPeriod("immediate");
          setClientCity("");
          setClientArea("");
          setPurchasePurpose(DEFAULT_PURPOSE);
          setQuotationType("Rental Quotation");
          setCustomInstallationDate("");
          setCustomDays("");
          setCustomPurpose("");
          setPurchaseLocations([createEmptyPurchaseLocation()]);
          setQuotationAmount("");
          setQuotationRefNo("");
          setCountryCode("AE");
          setServices([""]);
          setPaymentTerms([
            "Installation charges & first month rent payable upon installation.",
            "Monthly rent prepaid at beginning of every month.",
            "Online Transfer / Cheque accepted."
          ]);
          setTermsConditions(["Quotation validity: 30 days from the date of issue."]);
          setWarrantyItems([
            { title: "Warranty", value: "Lifetime" },
            { title: "RO Unit Replacement", value: "36 Months" }
          ]);
          sessionStorage.removeItem("quotationFormCache");
          sessionStorage.removeItem("selectedProducts"); // Clear selected products cache for NewQuotation
          sessionStorage.removeItem("selectedQuotationType");
        }
      
        // Auto-hide success message
        setTimeout(() => setSubmitSuccess(false), 3000);
      
        console.log("Quotation created successfully:", result);
        if (navigateToPdf) {
          setShowPdfPreview(true);
        }

        if (editId) {
          navigate("/quotation-history");
        } else if (!navigateToPdf) {
          setTimeout(() => {
            setShowSuccessDialog(false);
            navigate("/quotation-history");
          }, 1200);
        }
      
    } catch (error) {
      console.error("Failed to create quotation:", error);
      setSubmitError(error.message || "Failed to create quotation. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle form submission with Enter key
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !isSubmitting) {
      handleCreateQuotation();
    }
  };

  return (
      <section className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/50 to-cyan-50/40 p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 rounded-2xl border border-blue-100 bg-white/90 px-5 py-5 shadow-sm backdrop-blur">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{pageTitle}</h2>
            <p className="text-gray-600 mt-2">Fill in client details and confirm the selected product.</p>
          </div>
          {isLoadingQuotation && (
            <div className="mb-4 rounded border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-700">
              Loading quotation...
            </div>
          )}

        {/* Success Message */}
        {submitSuccess && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-700 font-medium">✓ Quotation created successfully!</p>
          </div>
        )}

        {/* Error Message */}
        {submitError && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700 font-medium">{submitError}</p>
          </div>
        )}

        {!product ? (
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <p className="text-gray-600 mb-4">No product selected yet.</p>
            <Link 
              to="/new-quotation" 
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Choose a Product
            </Link>
          </div>
        ) : (
          <div className=" gap-6" onKeyPress={handleKeyPress}>
            {/* Selected Products */}
            <div className="mb-6 rounded-2xl border border-white bg-white/95 p-6 shadow-lg shadow-blue-100/40">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Selected Products
              </h3>
              {products.length === 0 ? (
                <div className="text-sm text-gray-500">
                  No products selected.
                </div>
              ) : (
                <div className="space-y-4">
                  {products.map((item, index) => {
                    const itemId = item.productId ?? item.id ?? index;
                    const itemPrice = item?.productFor?.rent?.monthlyPrice;
                    const itemPriceLabel = itemPrice
                      ? `AED ${Number(itemPrice).toFixed(0)} / month`
                      : "AED 0 / month";
                    return (
                      <div
                        key={itemId}
                        className="flex flex-col sm:flex-row gap-4 rounded-xl border border-gray-200/80 bg-slate-50/70 p-4"
                      >
                        <div className="w-full sm:w-32 h-32 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                          {item.images?.[0]?.imageUrl ? (
                            <img
                              src={item.images[0].imageUrl}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                              No Image
                            </div>
                          )}
                        </div>
                        <div className="flex-1 relative">
                          <h4 className="text-xl font-semibold text-gray-900 mb-2 pr-8">
                            {item.name}
                          </h4>
                          <p className="text-gray-600 mb-3 line-clamp-2">
                            {item.description}
                          </p>
                          <button
                            type="button"
                            onClick={() => handleRemoveProduct(item.productId ?? item.id)}
                            className="absolute top-0 right-0 p-1 text-red-500 hover:text-red-700"
                            aria-label="Remove Product"
                          >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Quotation Form */}
            <div className="rounded-2xl border border-white bg-white/95 p-6 shadow-lg shadow-blue-100/40 col-span-2">
              <div className="mb-6 rounded-xl border border-blue-100 bg-gradient-to-r from-blue-50 to-cyan-50 p-4">
                <h3 className="text-lg font-semibold text-slate-900">Quotation Details</h3>
                <p className="mt-1 text-sm text-slate-600">Complete the form below to create a clean and professional quotation.</p>
              </div>
              {/* Client Name */}
              <div className="mb-6">
                <label htmlFor="client-name" className="block text-sm font-medium text-gray-900 mb-2">
                  Client Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="client-name"
                  type="text"
                  placeholder="Enter client name"
                  value={clientName}
                  onChange={(event) => setClientName(event.target.value)}
                  className={inputClass}
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div className="mb-6">
                <label htmlFor="client-attendant" className="block text-sm font-medium text-gray-900 mb-2">
                  Client Attendant
                </label>
                <input
                  id="client-attendant"
                  type="text"
                  placeholder="Enter attendant name (optional)"
                  value={clientAttendant}
                  onChange={(event) => setClientAttendant(event.target.value)}
                  className={inputClass}
                  disabled={isSubmitting}
                />
              </div>

              <div className="mb-6 rounded-xl border border-blue-100 bg-blue-50/70 p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-blue-700">
                      Quotation Type
                    </p>
                    <p className="text-base font-semibold text-blue-900">{quotationType}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setShowQuotationTypeSelector((prev) => !prev)
                    }
                    className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-blue-700 shadow-sm hover:bg-blue-100"
                  >
                    {showQuotationTypeSelector ? "Hide Options" : "Change Type"}
                  </button>
                </div>
              </div>

              {showQuotationTypeSelector && (
              <div className={sectionClass}>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Select Quotation Type <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {quotationTypeOptions.map((option) => (
                    <label
                      key={option.value}
                      className={`inline-flex items-center gap-2 rounded-xl border px-3 py-2.5 text-sm font-medium transition-all ${
                        quotationType === option.value
                          ? "border-blue-500 bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-800 shadow-sm"
                          : "border-gray-300 bg-white text-gray-700 hover:border-blue-300 hover:bg-blue-50/40"
                      } ${isSubmitting ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                    >
                      <input
                        type="radio"
                        name="quotation-type"
                        value={option.value}
                        checked={quotationType === option.value}
                        onChange={(event) => {
                          setQuotationType(event.target.value);
                        }}
                        className="h-4 w-4 text-blue-600"
                        disabled={isSubmitting}
                      />
                      <span>{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>
              )}

              <div className={sectionClass}>
                <div className="mb-2 flex items-center justify-between">
                  <label className="block text-sm font-medium text-gray-900">
                    Purchase Locations <span className="text-red-500">*</span>
                  </label>
                  <button
                    type="button"
                    onClick={addPurchaseLocation}
                    className={addButtonClass}
                    disabled={isSubmitting}
                  >
                    Add
                  </button>
                </div>
                <div className="space-y-3">
                  {purchaseLocations.map((entry, index) => (
                    <div
                      key={`purchase-location-${index}`}
                      className="rounded-xl border border-slate-200 bg-white p-3"
                    >
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-xs font-semibold text-gray-500">
                          Purchase For #{index + 1}
                        </span>
                        {purchaseLocations.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removePurchaseLocation(index)}
                            className={removeButtonClass}
                            disabled={isSubmitting}
                          >
                            Remove
                          </button>
                        )}
                      </div>
                      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                        <label className="text-xs text-gray-500">
                          City
                          <input
                            type="text"
                            placeholder="Enter city"
                            value={entry.city}
                            onChange={(event) =>
                              updatePurchaseLocation(index, "city", event.target.value)
                            }
                            className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                            disabled={isSubmitting}
                          />
                        </label>
                        <label className="text-xs text-gray-500">
                          Area
                          <input
                            type="text"
                            placeholder="Enter area"
                            value={entry.area}
                            onChange={(event) =>
                              updatePurchaseLocation(index, "area", event.target.value)
                            }
                            className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                            disabled={isSubmitting}
                          />
                        </label>
                        <label className="text-xs text-gray-500">
                          Purchasing For
                          <input
                            type="text"
                            placeholder="Store / Supermarket / Office ..."
                            value={entry.purpose}
                            onChange={(event) =>
                              handlePurchasePurposeChange(index, event.target.value)
                            }
                            className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                            disabled={isSubmitting}
                          />
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className={sectionClass}>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Selected Products
                </label>
                {products.length === 0 ? (
                  <div className="text-sm text-gray-500">
                    No products selected. Go back and select products.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {products.map((item, index) => (
                      <div
                        key={`${item.productId || item.id || index}`}
                        className="grid grid-cols-1 gap-2 rounded-xl border border-slate-200 bg-white p-3 md:grid-cols-7"
                      >
                        <div className="md:col-span-2">
                          <div className="text-xs text-gray-500">Product</div>
                          <div className="text-sm font-semibold">
                            {item.name || "Product"}
                          </div>
                        </div>
                        <label className="text-xs text-gray-500">
                          Capacity
                          <input
                            className="mt-1 w-full rounded border px-2 py-1 text-sm"
                            type="text"
                            value={item.capacity || ""}
                            onChange={(event) =>
                              updateProductField(index, "capacity", event.target.value)
                            }
                          />
                        </label>
                        <label className="text-xs text-gray-500">
                          Qty
                          <input
                            className="mt-1 w-full rounded border px-2 py-1 text-sm"
                            type="number"
                            min="1"
                            value={item.qty}
                            onChange={(event) =>
                              updateProductField(index, "qty", event.target.value)
                            }
                          />
                        </label>
                        <label className="text-xs text-gray-500">
                          Installation Charge (per unit)
                          <input
                            className="mt-1 w-full rounded border px-2 py-1 text-sm"
                            type="number"
                            min="0"
                            value={item.installationCharge}
                            onChange={(event) =>
                              updateProductField(index, "installationCharge", event.target.value)
                            }
                          />
                        </label>
                        <label className="text-xs text-gray-500">
                          Discount/Installation
                          <input
                            className="mt-1 w-full rounded border px-2 py-1 text-sm"
                            type="number"
                            min="0"
                            value={item.discount}
                            onChange={(event) =>
                              updateProductField(index, "discount", event.target.value)
                            }
                          />
                        </label>
                        {quotationType === "Rental Quotation" && (
                            <>
                              <label className="text-xs text-gray-500">
                                Monthly Rent/Unit
                                <input
                                  className="mt-1 w-full rounded border px-2 py-1 text-sm"
                                  type="number"
                                  min="0"
                                  value={item.monthlyRent}
                                  onChange={(event) =>
                                    updateProductField(index, "monthlyRent", event.target.value)
                                  }
                                />
                              </label>
                              <label className="text-xs text-gray-500">
                                Discount/Unit
                                <input
                                  className="mt-1 w-full rounded border px-2 py-1 text-sm"
                                  type="number"
                                  min="0"
                                  value={item.monthlyDiscount}
                                  onChange={(event) =>
                                    updateProductField(index, "monthlyDiscount", event.target.value)
                                  }
                                />
                              </label>
                              <label className="text-xs text-gray-500">
                                Months Qty
                                <input
                                  className="mt-1 w-full rounded border px-2 py-1 text-sm"
                                  type="number"
                                  min="0"
                                  value={item.monthsQty}
                                  onChange={(event) =>
                                    updateProductField(index, "monthsQty", event.target.value)
                                  }
                                />
                              </label>
                            </>
                          )}
                        {quotationType === "Service Quotation" && (
                            <>
                              <label className="text-xs text-gray-500">
                                Price/Unit
                                <input
                                  className="mt-1 w-full rounded border px-2 py-1 text-sm"
                                  type="number"
                                  min="0"
                                  value={item.salesUnitAmount}
                                  onChange={(event) =>
                                    updateProductField(index, "salesUnitAmount", event.target.value)
                                  }
                                />
                              </label>
                              <label className="text-xs text-gray-500">
                                Discount/Unit
                                <input
                                  className="mt-1 w-full rounded border px-2 py-1 text-sm"
                                  type="number"
                                  min="0"
                                  value={item.salesDiscount}
                                  onChange={(event) =>
                                    updateProductField(index, "salesDiscount", event.target.value)
                                  }
                                />
                              </label>
                            </>
                          )}
                        {quotationType === "Sales Quotation" && (
                            <>
                              <label className="text-xs text-gray-500">
                                Price/Unit
                                <input
                                  className="mt-1 w-full rounded border px-2 py-1 text-sm"
                                  type="number"
                                  min="0"
                                  value={item.salesUnitAmount}
                                  onChange={(event) =>
                                    updateProductField(index, "salesUnitAmount", event.target.value)
                                  }
                                />
                              </label>
                              <label className="text-xs text-gray-500">
                                Discount/Unit
                                <input
                                  className="mt-1 w-full rounded border px-2 py-1 text-sm"
                                  type="number"
                                  min="0"
                                  value={item.salesDiscount}
                                  onChange={(event) =>
                                    updateProductField(index, "salesDiscount", event.target.value)
                                  }
                                />
                              </label>
                            </>
                          )}
                        {quotationType === "AMC Quotation" && (
                            <>
                              <label className="text-xs text-gray-500">
                                Price/Unit
                                <input
                                  className="mt-1 w-full rounded border px-2 py-1 text-sm"
                                  type="number"
                                  min="0"
                                  value={item.salesUnitAmount}
                                  onChange={(event) =>
                                    updateProductField(index, "salesUnitAmount", event.target.value)
                                  }
                                />
                              </label>
                              <label className="text-xs text-gray-500">
                                Discount/Unit
                                <input
                                  className="mt-1 w-full rounded border px-2 py-1 text-sm"
                                  type="number"
                                  min="0"
                                  value={item.salesDiscount}
                                  onChange={(event) =>
                                    updateProductField(index, "salesDiscount", event.target.value)
                                  }
                                />
                              </label>
                            </>
                          )}
                        {quotationType === "RENT 2 OWN Quotation" && (
                            <>
                              <label className="text-xs text-gray-500">
                                Upfront/Unit
                                <input
                                  className="mt-1 w-full rounded border px-2 py-1 text-sm"
                                  type="number"
                                  min="0"
                                  value={item.rentToOwnUpfrontUnit}
                                  onChange={(event) =>
                                    updateProductField(index, "rentToOwnUpfrontUnit", event.target.value)
                                  }
                                />
                              </label>
                              <label className="text-xs text-gray-500">
                                Discount/Unit
                                <input
                                  className="mt-1 w-full rounded border px-2 py-1 text-sm"
                                  type="number"
                                  min="0"
                                  value={item.rentToOwnUpfrontDiscount}
                                  onChange={(event) =>
                                    updateProductField(index, "rentToOwnUpfrontDiscount", event.target.value)
                                  }
                                />
                              </label>
                              <label className="text-xs text-gray-500">
                                Monthly/Unit
                                <input
                                  className="mt-1 w-full rounded border px-2 py-1 text-sm"
                                  type="number"
                                  min="0"
                                  value={item.rentToOwnMonthlyUnit}
                                  onChange={(event) =>
                                    updateProductField(index, "rentToOwnMonthlyUnit", event.target.value)
                                  }
                                />
                              </label>
                              <label className="text-xs text-gray-500">
                                Discount/Unit
                                <input
                                  className="mt-1 w-full rounded border px-2 py-1 text-sm"
                                  type="number"
                                  min="0"
                                  value={item.rentToOwnMonthlyDiscount}
                                  onChange={(event) =>
                                    updateProductField(index, "rentToOwnMonthlyDiscount", event.target.value)
                                  }
                                />
                              </label>
                              <label className="text-xs text-gray-500">
                                No. of Months
                                <input
                                  className="mt-1 w-full rounded border px-2 py-1 text-sm"
                                  type="number"
                                  min="0"
                                  value={item.rentToOwnMonthsQty}
                                  onChange={(event) =>
                                    updateProductField(index, "rentToOwnMonthsQty", event.target.value)
                                  }
                                />
                              </label>
                            </>
                          )}
                        
                      </div>
                    ))}
                      <div className="mt-3 grid gap-2 text-sm">
                        <div className="flex items-center justify-between font-semibold">
                          <span>Grand Total (One-time)</span>
                          <span>AED {grandTotal.toFixed(2)}</span>
                        </div>
                        <div className="flex items-center justify-between text-gray-600">
                          <span>Monthly Charge Total</span>
                          <span>
                            AED{" "}
                            {products
                              .reduce(
                                (sum, item) =>
                                  sum +
                                  (quotationType === "Rental Quotation"
                                    ? Number(item.monthlyRent || 0) *
                                      Number(item.monthsQty || 0)
                                    : 0),
                                0
                              )
                              .toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

              <div className={sectionClass}>
                <label htmlFor="country-code" className="block text-sm font-medium text-gray-900 mb-2">
                  Country <span className="text-red-500">*</span>
                </label>
                <select
                  id="country-code"
                  value={countryCode}
                  onChange={(event) => {
                    const nextCode = event.target.value;
                    setCountryCode(nextCode);
                    if (quotationRefNo) {
                      const parts = quotationRefNo.split("/");
                      if (parts.length >= 5 && parts[0] === "RRO") {
                        const nextRef = [
                          parts[0],
                          nextCode,
                          parts[2],
                          parts[3],
                          parts[4],
                        ].join("/");
                        setQuotationRefNo(nextRef);
                      }
                    }
                  }}
                  className={`${inputClass} appearance-none`}
                  disabled={isSubmitting}
                >
                  {countryOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Product totals are handled in the Selected Products section */}

              {/* Service Timeline */}
              <div className={sectionClass}>
                <label className="block text-sm font-medium text-gray-900 mb-3">
                  Service Timeline <span className="text-red-500">*</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {timeOptions.map((option) => (
                    <label 
                      key={option.value} 
                      className={`inline-flex items-center px-4 py-2 rounded-full border cursor-pointer transition-colors ${
                        serviceDays === option.value 
                          ? 'bg-blue-50 border-blue-500 text-blue-700' 
                          : 'bg-gray-50 border-gray-300 text-gray-700 hover:bg-gray-100'
                      } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      <input
                        type="radio"
                        name="service-days"
                        value={option.value}
                        checked={serviceDays === option.value}
                        onChange={(event) => handleServiceDaysChange(event.target.value)}
                        className="sr-only"
                        disabled={isSubmitting}
                      />
                      <span className="text-sm font-medium">{option.label}</span>
                    </label>
                  ))}
                </div>
                {serviceDays === "custom" && (
                  <div className="mt-4 flex items-center gap-2">
                    <input
                      type="number"
                      min="1"
                      placeholder="Enter number of days"
                      value={customDays}
                      onChange={(event) => setCustomDays(event.target.value)}
                      className={inputClass}
                      disabled={isSubmitting}
                    />
                    <span className="text-gray-600 font-medium">days</span>
                  </div>
                )}
              </div>

              {/* Installation Period */}
              <div className={sectionClass}>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Installation Period <span className="text-red-500">*</span>
                </label>
                <select 
                  value={installationPeriod} 
                  onChange={(event) => handleInstallationPeriodChange(event.target.value)}
                  className={`${inputClass} appearance-none ${
                    isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  disabled={isSubmitting}
                >
                  {installationPeriods.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {installationPeriod === "custom_date" && (
                  <div className="mt-4">
                    <input
                      type="date"
                      value={customInstallationDate}
                      onChange={(event) => setCustomInstallationDate(event.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className={inputClass}
                      disabled={isSubmitting}
                    />
                  </div>
                )}
              </div>

              {/* Purchasing For is configured in Purchase Locations section */}


              <div className={sectionClass}>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-900">
                    Payment Terms
                  </label>
                  <button
                    type="button"
                    onClick={() => addListItem(setPaymentTerms)}
                    className={addButtonClass}
                  >
                    Add
                  </button>
                </div>
                {paymentTerms.map((term, index) => (
                  <div key={index} className="flex items-center gap-2 mb-2">
                    <input
                      type="text"
                      value={term}
                      onChange={(event) =>
                        updateListItem(setPaymentTerms)(index, event.target.value)
                      }
                      className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    />
                    <button
                      type="button"
                      onClick={() => removeListItem(setPaymentTerms, index)}
                      className={removeButtonClass}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>

              <div className={sectionClass}>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-900">
                    Terms & Conditions
                  </label>
                  <button
                    type="button"
                    onClick={() => addListItem(setTermsConditions)}
                    className={addButtonClass}
                  >
                    Add
                  </button>
                </div>
                {termsConditions.map((term, index) => (
                  <div key={index} className="flex items-center gap-2 mb-2">
                    <input
                      type="text"
                      value={term}
                      onChange={(event) =>
                        updateListItem(setTermsConditions)(index, event.target.value)
                      }
                      className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    />
                    <button
                      type="button"
                      onClick={() => removeListItem(setTermsConditions, index)}
                      className={removeButtonClass}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>

              <div className={sectionClass}>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-900">
                    Warranty & Parts
                  </label>
                  <button
                    type="button"
                    onClick={addWarrantyItem}
                    className={addButtonClass}
                  >
                    Add
                  </button>
                </div>
                {warrantyItems.map((item, index) => (
                  <div key={index} className="grid grid-cols-1 gap-2 md:grid-cols-3 mb-2">
                    <input
                      type="text"
                      placeholder="Description"
                      value={item.title}
                      onChange={(event) =>
                        updateWarrantyItem(index, "title", event.target.value)
                      }
                      className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    />
                    <input
                      type="text"
                      placeholder="Value"
                      value={item.value}
                      onChange={(event) =>
                        updateWarrantyItem(index, "value", event.target.value)
                      }
                      className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    />
                    <button
                      type="button"
                      onClick={() => removeWarrantyItem(index)}
                      className={removeButtonClass}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>

              <div className={sectionClass}>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-900">
                    Service & Maintenance (Rentro vs Others)
                  </label>
                  <button
                    type="button"
                    onClick={addServiceMaintenance}
                    className={addButtonClass}
                  >
                    Add
                  </button>
                </div>
                {serviceMaintenance.map((row, index) => (
                  <div key={index} className="grid grid-cols-1 gap-2 md:grid-cols-4 mb-2">
                    <input
                      type="text"
                      placeholder="Item"
                      value={row.item}
                      onChange={(event) =>
                        updateServiceMaintenance(index, "item", event.target.value)
                      }
                      className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    />
                    <input
                      type="text"
                      placeholder="Rentro"
                      value={row.rentro}
                      onChange={(event) =>
                        updateServiceMaintenance(index, "rentro", event.target.value)
                      }
                      className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    />
                    <input
                      type="text"
                      placeholder="Others"
                      value={row.others}
                      onChange={(event) =>
                        updateServiceMaintenance(index, "others", event.target.value)
                      }
                      className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    />
                    <button
                      type="button"
                      onClick={() => removeServiceMaintenance(index)}
                      className={removeButtonClass}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>

              {/* Submit Button */}
              <div className="mt-3 rounded-2xl border border-blue-100 bg-white p-3 shadow-sm">
                <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                  <button 
                    type="button"
                    onClick={handleCreateQuotation}
                    disabled={!clientName || grandTotal <= 0 || isSubmitting}
                    className={`w-full py-3 px-4 rounded-xl font-semibold transition-colors ${
                      !clientName || grandTotal <= 0 || isSubmitting
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Creating...
                      </span>
                    ) : (
                      editId ? 'Update Quotation' : 'Create Quotation'
                    )}
                  </button>
                  <button
                type="button"
                onClick={() => {
                  setClientName("");
                  setClientAttendant("");
                  setClientCity("");
                  setClientArea("");
                  setQuantity(1);
                  setServiceDays("3");
                  setInstallationPeriod("immediate");
                  setPurchasePurpose(DEFAULT_PURPOSE);
                  setQuotationType("Rental Quotation");
                  setCustomInstallationDate("");
                  setCustomDays("");
                  setCustomPurpose("");
                  setPurchaseLocations([createEmptyPurchaseLocation()]);
                  setQuotationAmount("");
                  setQuotationRefNo("");
                  setCountryCode("AE");
                  setServices([""]);
                  setPaymentTerms([
                    "Installation charges & first month rent payable upon installation.",
                    "Monthly rent prepaid at beginning of every month.",
                    "Online Transfer / Cheque accepted."
                  ]);
                  setTermsConditions(["Quotation validity: 30 days from the date of issue."]);
                  setWarrantyItems([
                    { title: "Warranty", value: "Lifetime" },
                    { title: "RO Unit Replacement", value: "36 Months" }
                  ]);
                  setServiceMaintenance([
                    { item: "PPM (Periodical Service)", rentro: "Every 60 Days", others: "120 or 180 Days" },
                    { item: "Teardown Services", rentro: "6 Services", others: "1 or 2" }
                  ]);
                  sessionStorage.removeItem("quotationFormCache");
                }}
                className="w-full py-3 px-4 rounded-xl font-medium transition-colors bg-gray-200 text-gray-700 hover:bg-gray-300"
              >
                Reset Form
              </button>
                  <button
                type="button"
                onClick={() => {
                  try {
                    sessionStorage.setItem("selectedProducts", JSON.stringify(products));
                    sessionStorage.setItem("selectedQuotationType", quotationType);
                  } catch (error) {
                    console.error("Failed to store selected products", error);
                  }
                  navigate("/new-quotation", {
                    state: {
                      selectedProducts: products,
                      quotationType,
                      fromAddMoreProducts: true,
                    },
                  });
                }}
                className="w-full py-3 px-4 rounded-xl font-medium transition-colors bg-blue-100 text-blue-700 hover:bg-blue-200"
              >
                Add More Products
              </button>
                </div>
              </div>
              {/* <button
                type="button"
                onClick={() => handleCreateQuotation({ navigateToPdf: true })}
                className="mt-3 w-full py-3 px-4 rounded-lg font-medium transition-colors bg-green-600 text-white hover:bg-green-700"
              >
                Generate PDF
              </button> */}
            </div>
          </div>
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
        {showSuccessDialog && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
            <div className="w-full max-w-md rounded-lg bg-white p-6 text-center shadow-xl">
              <h3 className="text-lg font-semibold text-blue-700">Quotation Created</h3>
              <p className="mt-2 text-sm text-gray-600">
                Your quotation was created successfully. Redirecting to history...
              </p>
              <button
                type="button"
                onClick={() => {
                  setShowSuccessDialog(false);
                  navigate("/quotation-history");
                }}
                className="mt-4 rounded bg-blue-600 px-4 py-2 text-white"
              >
                Go to History
              </button>
            </div>
          </div>
        )}
      </section>
  );
}
