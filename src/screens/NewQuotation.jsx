// import "../App.css";
// import { useMemo, useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";

// const products = [
//   {
//     productId: 101,
//     name: "Compact Generator",
//     description: "Portable power for job sites and events.",
//     productFor: {
//       rent: { monthlyPrice: 180 },
//     },
//     images: [
//       {
//         imageUrl: "https://images.unsplash.com/photo-1509395062183-67c5ad6faff9?q=80&w=800&auto=format&fit=crop",
//       },
//     ],
//   },
//   {
//     productId: 102,
//     name: "Industrial Fan",
//     description: "High airflow fan for ventilation and drying.",
//     productFor: {
//       rent: { monthlyPrice: 120 },
//     },
//     images: [
//       {
//         imageUrl: "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?q=80&w=800&auto=format&fit=crop",
//       },
//     ],
//   },
//   {
//     productId: 103,
//     name: "Scissor Lift",
//     description: "Stable lift for maintenance and installations.",
//     productFor: {
//       rent: { monthlyPrice: 950 },
//     },
//     images: [
//       {
//         imageUrl: "https://images.unsplash.com/photo-1493238792000-8113da705763?q=80&w=800&auto=format&fit=crop",
//       },
//     ],
//   },
// ];

// export default function NewQuotation() {

//   const [products, setProducts] = useState([]);
//   const [search, setSearch] = useState("");

//   const getProducts = async () => {
//     try {
//       const response = await axios.get("https://api.rentro.ae/api/v1/products");
//       setProducts(response?.data[0]);
//       console.log(response?.data[0]);
//     } catch (error) {
//       console.error(error);
//     }
//   } 

//   useEffect(() => {
//     getProducts();
//   }, []);

//   const filteredProducts = useMemo(() => {
//     const term = search.trim().toLowerCase();
//     if (!term) return products;
//     return products.filter((product) => product.name.toLowerCase().includes(term));
//   }, [search]);

//   return (
//     <section className="screen">
//       <div className="screen-header">
//         <h2>New Quotation</h2>
//         <p>Select a product to start a new quotation.</p>
//       </div>

//       <div className="products-toolbar">
//         <div className="search-field">
//           <label htmlFor="product-search">Search Products</label>
//           <input
//             id="product-search"
//             type="text"
//             placeholder="Search by product name"
//             value={search}
//             onChange={(event) => setSearch(event.target.value)}
//           />
//         </div>
//         <Link to="/create-quotation" className="ghost-btn">
//           Create Quotation
//         </Link>
//       </div>

//       <div className="products-section">
//         <h3>Our Products</h3>
//         <div className="products-grid">
//           {filteredProducts.map((product) => {
//             const imageUrl = product.images?.[0]?.imageUrl;
//             const price = product.productFor?.rent?.monthlyPrice ?? 0;
//             return (
//               <div className="product-card" key={product.productId}>
//                 <div className="product-image">
//                   {imageUrl ? (
//                     <img src={imageUrl} alt={product.name} />
//                   ) : (
//                     <span>No Image</span>
//                   )}
//                 </div>
//                 <div className="product-details">
//                   <h4>{product.name}</h4>
//                   <p>{product.description}</p>
//                   <div className="product-meta">
//                     <span className="price">AED {price.toFixed(0)} / month</span>
//                     <Link
//                       to="/create-quotation"
//                       state={{ product }}
//                       className="primary-btn"
//                     >
//                       Create Quotation
//                     </Link>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// }



import { useMemo, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const quotationTypeOptions = [
  "Rental Quotation",
  "Sales Quotation",
  "Service Quotation",
  "AMC Quotation",
  "RENT 2 OWN Quotation",
];

export default function NewQuotation() {
  const navigate = useNavigate();
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [lockedProductIds, setLockedProductIds] = useState([]);
  const [selectedQuotationType, setSelectedQuotationType] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const canSelectProducts = Boolean(selectedQuotationType) && currentStep === 2;

  const getProducts = async () => {
    try {
      setLoading(true);
      setError("");
      const cached = sessionStorage.getItem("cachedProducts");
      if (cached) {
        const parsed = JSON.parse(cached);
        setProducts(parsed || []);
        return;
      }
      const response = await axios.get("https://api.rentro.sa/api/v1/products");
      const list = response?.data || [];
      setProducts(list);
      sessionStorage.setItem("cachedProducts", JSON.stringify(list));
    } catch (error) {
      console.error("Failed to fetch products", error);
      setError("Failed to load products. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return products;

    return products.filter((product) =>
      product?.name?.toLowerCase().includes(term)
    );
  }, [search, products]);

  const toggleProduct = (product) => {
    if (!selectedQuotationType) return;
    if (lockedProductIds.includes(product.productId)) return;
    setSelectedProducts((prev) => {
      const exists = prev.find((item) => item.productId === product.productId);
      if (exists) {
        return prev.filter((item) => item.productId !== product.productId);
      }
      return [...prev, product];
    });
  };

  const handleProceed = () => {
    if (!selectedQuotationType || selectedProducts.length === 0) return;
    try {
      sessionStorage.setItem(
        "selectedProducts",
        JSON.stringify(selectedProducts)
      );
      sessionStorage.setItem("selectedQuotationType", selectedQuotationType);
    } catch (error) {
      console.error("Failed to store quotation data", error);
    }
    navigate("/create-quotation", {
      state: {
        products: selectedProducts,
        quotationType: selectedQuotationType,
        fromNewQuotation: true,
      },
    });
  };

  const handleStartProductSelection = () => {
    if (!selectedQuotationType) return;
    setCurrentStep(2);
    try {
      sessionStorage.setItem("selectedQuotationType", selectedQuotationType);
    } catch (error) {
      console.error("Failed to store selected quotation type", error);
    }
  };

  useEffect(() => {
    const incomingProductsFromState = location.state?.selectedProducts;
    const incomingQuotationTypeFromState = location.state?.quotationType;
    const fromAddMoreProducts = Boolean(location.state?.fromAddMoreProducts);
    if (!fromAddMoreProducts) {
      setSelectedProducts([]);
      setSelectedQuotationType("");
      setCurrentStep(1);
      setLockedProductIds([]);
      try {
        sessionStorage.removeItem("selectedProducts");
        sessionStorage.removeItem("selectedQuotationType");
      } catch (error) {
        console.error("Failed to clear quotation selection state", error);
      }
      return;
    }

    let initialSelectedProducts = [];
    if (incomingProductsFromState && incomingProductsFromState.length > 0) {
      initialSelectedProducts = incomingProductsFromState;
    } else {
      try {
        const stored = sessionStorage.getItem("selectedProducts");
        initialSelectedProducts = stored ? JSON.parse(stored) : [];
      } catch (error) {
        console.error("Failed to read stored selected products", error);
        initialSelectedProducts = [];
      }
    }

    const nextQuotationType =
      incomingQuotationTypeFromState || sessionStorage.getItem("selectedQuotationType") || "";

    setSelectedProducts(initialSelectedProducts);
    setSelectedQuotationType(nextQuotationType);
    setCurrentStep(nextQuotationType ? 2 : 1);
    setLockedProductIds([]);

    try {
      sessionStorage.setItem("selectedProducts", JSON.stringify(initialSelectedProducts));
      if (nextQuotationType) {
        sessionStorage.setItem("selectedQuotationType", nextQuotationType);
      }
    } catch (error) {
      console.error("Failed to save selected quotation details to session storage", error);
    }
  }, [location.state]);

  // Simple SVG icons to avoid external dependencies
  const Icons = {
    Search: () => (
      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
    Spinner: () => (
      <svg className="animate-spin h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    ),
    Box: () => (
      <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
    Plus: () => (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
      </svg>
    )
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/40 to-cyan-50/30 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 rounded-2xl border border-blue-100 bg-white/90 p-5 shadow-sm backdrop-blur">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">New Quotation</h1>
          <p className="text-gray-600">Step-by-step flow: type selection, products, then quotation form.</p>
          <div className="mt-4 flex flex-wrap gap-2 text-sm">
            <span
              className={`rounded-full px-3 py-1 font-medium ${
                currentStep === 1
                  ? "bg-blue-600 text-white"
                  : "bg-blue-100 text-blue-700"
              }`}
            >
              1. Quotation Type
            </span>
            <span
              className={`rounded-full px-3 py-1 font-medium ${
                currentStep === 2
                  ? "bg-blue-600 text-white"
                  : "bg-blue-100 text-blue-700"
              }`}
            >
              2. Product Selection
            </span>
            <span className="rounded-full bg-gray-100 px-3 py-1 font-medium text-gray-600">
              3. Create Form
            </span>
          </div>
        </div>

        {currentStep === 1 ? (
          <div className="mb-8 rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50 via-sky-50 to-cyan-50 p-5 md:p-6 shadow-sm">
            <p className="text-sm font-semibold text-blue-900 mb-3">Step 1: Select Quotation Type</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {quotationTypeOptions.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => {
                    setSelectedQuotationType(type);
                    if (currentStep === 2) {
                      setCurrentStep(1);
                    }
                  }}
                  className={`rounded-xl border px-4 py-3 text-left text-sm font-medium transition-all ${
                    selectedQuotationType === type
                      ? "border-blue-600 bg-white text-blue-700 shadow"
                      : "border-blue-200 bg-white/70 text-gray-700 hover:border-blue-400"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-blue-800">
                {selectedQuotationType
                  ? `Selected: ${selectedQuotationType}`
                  : "Select quotation type to continue"}
              </p>
              <button
                type="button"
                onClick={handleStartProductSelection}
                disabled={!selectedQuotationType}
                className={`rounded-lg px-5 py-2.5 text-sm font-semibold transition-colors ${
                  selectedQuotationType
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-gray-300 text-gray-600 cursor-not-allowed"
                }`}
              >
                Create Quotation
              </button>
            </div>
          </div>
        ) : (
          <div className="mb-5 rounded-xl border border-blue-100 bg-white p-4 shadow-sm">
            <p className="text-sm text-blue-800">
              Quotation Type: <strong>{selectedQuotationType || "-"}</strong>
            </p>
          </div>
        )}

        {currentStep === 2 && (
        <>
        {/* Search Bar */}
        <div className="bg-white rounded-xl shadow p-4 md:p-6 mb-8 border border-blue-100/70">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex-1">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Icons.Search />
                </div>
                <input
                  type="text"
                  placeholder="Search products..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none ${
                    !canSelectProducts ? "bg-gray-100 cursor-not-allowed" : ""
                  }`}
                  disabled={!canSelectProducts}
                />
              </div>
            </div>
            <button
              type="button"
              onClick={handleProceed}
              disabled={!selectedQuotationType || selectedProducts.length === 0}
              className={`inline-flex items-center justify-center px-6 py-3 font-medium rounded-lg transition-colors ${
                !selectedQuotationType || selectedProducts.length === 0
                  ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              <Icons.Plus />
              <span className="ml-2">
                Next ({selectedProducts.length})
              </span>
            </button>
          </div>
          <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-sm">
            <span className="text-blue-800">
              Quotation Type: <strong>{selectedQuotationType || "-"}</strong>
            </span>
            <button
              type="button"
              onClick={() => setCurrentStep(1)}
              className="text-blue-700 hover:text-blue-900 underline underline-offset-2"
            >
              Change quotation type
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="bg-white rounded-xl shadow border border-blue-100/70">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Available Products</h2>
            {!canSelectProducts && (
              <p className="text-sm text-amber-700 mt-1">
                Select quotation type first to enable product selection.
              </p>
            )}
          </div>

          <div className="p-6">
            {loading && (
              <div className="flex items-center justify-center py-12">
                <Icons.Spinner />
                <span className="ml-3 text-gray-600">Loading products...</span>
              </div>
            )}

            {error && (
              <div className="text-center py-12">
                <div className="text-red-500 mb-4">{error}</div>
                <button
                  onClick={getProducts}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Retry
                </button>
              </div>
            )}

            {!loading && !error && filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <Icons.Box />
                <p className="mt-4 text-gray-600">
                  {search ? "No products found" : "No products available"}
                </p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => {
                const imageUrl =
                  product?.images?.[0]?.imageUrl ||
                  "https://via.placeholder.com/300x200?text=No+Image";

                const price =
                  product?.productFor?.rent?.monthlyPrice ??
                  product?.productFor?.sell?.price ??
                  0;

                return (
                  <div
                    key={product.productId}
                    className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center justify-between px-4 py-2 border-b border-gray-100">
                      <label className="flex items-center gap-2 text-sm text-gray-700">
                        <input
                          type="checkbox"
                          checked={selectedProducts.some(
                            (item) => item.productId === product.productId
                          )}
                          onChange={() => toggleProduct(product)}
                          disabled={!canSelectProducts}
                        />
                        Select
                      </label>
                    </div>
                    <div className="h-48 bg-gray-100 overflow-hidden">
                      <img
                        src={imageUrl}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-2 truncate">
                        {product.name}
                      </h3>
                      <div className="flex items-center justify-between">
                        {price > 0 && (
                          <span className="text-lg font-bold text-blue-600">
                            AED {price}
                          </span>
                        )}
                        <button
                          type="button"
                          onClick={() => toggleProduct(product)}
                          disabled={!canSelectProducts || lockedProductIds.includes(product.productId)}
                          
                          className={`px-4 py-2 w-full text-white text-sm font-medium rounded ${
                            !canSelectProducts || lockedProductIds.includes(product.productId)
                              ? "bg-blue-200 cursor-not-allowed"
                              : "bg-blue-500 hover:bg-blue-600"
                          }`}
                        >
                          {selectedProducts.some(
                            (item) => item.productId === product.productId
                          )
                            ? "Selected"
                            : "Select"}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        </>
        )}
      </div>
    </div>
  );
}
