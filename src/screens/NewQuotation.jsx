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
import { Link } from "react-router-dom";
import axios from "axios";

export default function NewQuotation() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getProducts = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await axios.get(
        "http://192.168.1.100:8081/api/v1/products"
      );
      setProducts(response?.data || []);
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
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">New Quotation</h1>
          <p className="text-gray-600">Select a product to start a new quotation</p>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-lg shadow p-4 md:p-6 mb-8">
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
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>
            </div>
            <Link
              to="/create-quotation"
              className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Icons.Plus />
              <span className="ml-2">Create Quotation</span>
            </Link>
          </div>
        </div>

        {/* Products Grid */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Available Products</h2>
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
                        <Link
                          to="/create-quotation"
                          state={{ product }}
                          onClick={() => {
                            try {
                              sessionStorage.setItem(
                                "selectedProduct",
                                JSON.stringify(product)
                              );
                            } catch (error) {
                              console.error("Failed to store product", error);
                            }
                          }}
                          className="px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded hover:bg-blue-600"
                        >
                          Create Quote
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
