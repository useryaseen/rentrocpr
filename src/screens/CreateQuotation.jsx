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

const purchasePurposes = [
  { label: "Store", value: "store" },
  { label: "Supermarket", value: "supermarket" },
  { label: "Warehouse", value: "warehouse" },
  { label: "Office", value: "office" },
  { label: "Restaurant", value: "restaurant" },
  { label: "Hotel", value: "hotel" },
  { label: "Residential", value: "residential" },
  { label: "Other", value: "other" },
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
  const storedProduct = useMemo(() => {
    try {
      const raw = sessionStorage.getItem("selectedProduct");
      return raw ? JSON.parse(raw) : null;
    } catch (error) {
      console.error("Failed to read stored product", error);
      return null;
    }
  }, []);
  const [selectedProduct, setSelectedProduct] = useState(storedProduct);
  const [clientName, setClientName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [serviceDays, setServiceDays] = useState("3");
  const [installationPeriod, setInstallationPeriod] = useState("immediate");
  const [purchasePurpose, setPurchasePurpose] = useState("store");
  const [countryCode, setCountryCode] = useState("AE");
  const [quotationRefNo, setQuotationRefNo] = useState("");
  const [productId, setProductId] = useState("");
  const product = selectedProduct;
  const [customInstallationDate, setCustomInstallationDate] = useState("");
  const [customDays, setCustomDays] = useState("");
  const [customPurpose, setCustomPurpose] = useState("");
  const [quotationAmount, setQuotationAmount] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const pageTitle = editId ? "Edit Quotation" : "Create Quotation";

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
    if (!location.state?.product) return;
    try {
      sessionStorage.setItem(
        "selectedProduct",
        JSON.stringify(location.state.product)
      );
      setSelectedProduct(location.state.product);
    } catch (error) {
      console.error("Failed to store product", error);
    }
  }, [location.key]);

  useEffect(() => {
    if (!editId) return;
    let isActive = true;

    databaseService
      .getQuotationById(editId)
      .then((data) => {
        if (!isActive || !data) return;
        setClientName(data.clientName || "");
        setQuantity(Number(data.quantity || 1));
        setServiceDays(data.serviceDays || "3");
        setInstallationPeriod(data.installationPeriod || "immediate");
        setPurchasePurpose(data.purchasePurpose || "store");
        setQuotationAmount(
          data.quotationAmount !== undefined ? String(data.quotationAmount) : ""
        );
        setCountryCode(data.countryCode || "AE");
        setQuotationRefNo(data.quotationRefNo || "");
        setProductId(data.productId ? String(data.productId) : "");
        setSelectedProduct(data.productDetails || null);
      })
      .catch((error) => {
        console.error("Failed to load quotation:", error);
      });

    return () => {
      isActive = false;
    };
  }, [editId]);

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

  const handlePurchasePurposeChange = (value) => {
    setPurchasePurpose(value);
    if (value !== "other") {
      setCustomPurpose("");
    }
  };

  const handleCreateQuotation = async () => {
    // Validate required fields
    if (!clientName) {
      setSubmitError("Please enter client name");
      return;
    }
    
    if (!quotationAmount || parseFloat(quotationAmount) <= 0) {
      setSubmitError("Please enter a valid quotation amount");
      return;
    }
    
    if (!productId) {
      setSubmitError("Product information is missing. Please select a product.");
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const now = new Date();
      const yy = String(now.getFullYear()).slice(-2);
      const mm = String(now.getMonth() + 1).padStart(2, "0");

      const existing = await databaseService.getAllQuotations();
      const sequence = existing.length + 1;
      const serial = String(sequence).padStart(5, "0");
      const generatedRefNo = `RRO/${countryCode}/${yy}/${mm}/${serial}`;
      const refNoToUse = quotationRefNo || generatedRefNo;

      // Prepare quotation data with all required fields
      const quotationId = editId || uuidv4();
      const nowIso = new Date().toISOString();

      const productDetails = product
        ? {
            id: productId,
            name: product.name,
            description: product.description || "",
            images: product.images || [],
          }
        : undefined;
      
      const quotationData = {
        id: quotationId,
        clientName,
        quantity,
        serviceDays: serviceDays === "custom" ? customDays : serviceDays,
        installationPeriod: installationPeriod === "custom_date" 
          ? customInstallationDate 
          : installationPeriod,
        purchasePurpose: purchasePurpose === "other" ? customPurpose : purchasePurpose,
        quotationAmount: parseFloat(quotationAmount),
        totalAmount: parseFloat(calculateTotal),
        productId,
        quotationRefNo: refNoToUse,
        countryCode,
        productDetails,
        status: "draft",
        createdAt: nowIso,
        updatedAt: nowIso,
        _deleted: false,
        _attachments: {},
        _meta: {
          lwt: Date.now()
        }
      };

      console.log("Creating quotation with data:", quotationData);
      
      const result = editId
        ? await databaseService.updateQuotation(editId, quotationData)
        : await databaseService.createQuotation(quotationData);
      
      setSubmitSuccess(true);
      
      // Reset form
      if (!editId) {
        setClientName("");
        setQuantity(1);
        setServiceDays("3");
        setInstallationPeriod("immediate");
        setPurchasePurpose("store");
        setCustomInstallationDate("");
        setCustomDays("");
        setCustomPurpose("");
        setQuotationAmount("");
        setQuotationRefNo("");
        setCountryCode("AE");
      }
      
      // Auto-hide success message
      setTimeout(() => setSubmitSuccess(false), 3000);
      
      console.log("Quotation created successfully:", result);

      if (editId) {
        navigate("/quotation-history");
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
    <section className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{pageTitle}</h2>
          <p className="text-gray-600 mt-2">Fill in client details and confirm the selected product.</p>
        </div>

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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" onKeyPress={handleKeyPress}>
            {/* Selected Product Card */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Selected Product</h3>
              <div className="flex flex-col sm:flex-row gap-4 p-4 border border-gray-200 rounded-lg">
                <div className="w-full sm:w-32 h-32 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                  {product.images?.[0]?.imageUrl ? (
                    <img 
                      src={product.images[0].imageUrl} 
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      No Image
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">{product.name}</h4>
                  <p className="text-gray-600 mb-3 line-clamp-2">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-green-600 font-bold text-lg">{priceLabel}</span>
                    <span className="text-sm text-gray-500">ID: {productId}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quotation Form */}
            <div className="bg-white rounded-xl shadow-md p-6">
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div className="mb-6">
                <label htmlFor="country-code" className="block text-sm font-medium text-gray-900 mb-2">
                  Country <span className="text-red-500">*</span>
                </label>
                <select
                  id="country-code"
                  value={countryCode}
                  onChange={(event) => setCountryCode(event.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors appearance-none bg-white"
                  disabled={isSubmitting}
                >
                  {countryOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Quantity and Amount */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label htmlFor="quantity" className="block text-sm font-medium text-gray-900 mb-2">
                    Quantity <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="quantity"
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(event) => setQuantity(Number(event.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    required
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <label htmlFor="quotation-amount" className="block text-sm font-medium text-gray-900 mb-2">
                    Quotation Amount (AED) <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="quotation-amount"
                    type="number"
                    step="0.01"
                    min="0.01"
                    placeholder="0.00"
                    value={quotationAmount}
                    onChange={(event) => setQuotationAmount(event.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    required
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              {/* Total Amount Display */}
              <div className="mb-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-gray-900">Total Amount</span>
                  <span className="text-2xl font-bold text-green-600">AED {calculateTotal}</span>
                </div>
                <p className="text-xs text-gray-500">
                  Quantity: {quantity} × AED {quotationAmount || "0.00"}
                </p>
              </div>

              {/* Service Timeline */}
              <div className="mb-6">
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
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      disabled={isSubmitting}
                    />
                    <span className="text-gray-600 font-medium">days</span>
                  </div>
                )}
              </div>

              {/* Installation Period */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Installation Period <span className="text-red-500">*</span>
                </label>
                <select 
                  value={installationPeriod} 
                  onChange={(event) => handleInstallationPeriodChange(event.target.value)}
                  className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors appearance-none bg-white ${
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      disabled={isSubmitting}
                    />
                  </div>
                )}
              </div>

              {/* Purchasing For */}
              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Purchasing For <span className="text-red-500">*</span>
                </label>
                <select 
                  value={purchasePurpose} 
                  onChange={(event) => handlePurchasePurposeChange(event.target.value)}
                  className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors appearance-none bg-white ${
                    isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  disabled={isSubmitting}
                >
                  {purchasePurposes.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {purchasePurpose === "other" && (
                  <div className="mt-4">
                    <input
                      type="text"
                      placeholder="Specify purpose"
                      value={customPurpose}
                      onChange={(event) => setCustomPurpose(event.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      disabled={isSubmitting}
                    />
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button 
                type="button"
                onClick={handleCreateQuotation}
                disabled={!clientName || !quotationAmount || isSubmitting}
                className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                  !clientName || !quotationAmount || isSubmitting
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
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
