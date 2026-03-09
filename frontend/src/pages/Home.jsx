// import { useState, useEffect, useCallback, useRef } from "react";
// import ProductCard from "../components/ProductCard";
// import { getProducts } from "../services/api";
// import { useNotification } from "../context/NotificationContext";

// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay, Pagination, Navigation } from "swiper/modules";

// import "swiper/css";
// import "swiper/css/pagination";
// import "swiper/css/navigation";

// import banner1 from "../assets/banner1.png";
// import banner2 from "../assets/banner2.png";
// import banner3 from "../assets/banner3.png";

// function Home() {
//   const [search, setSearch] = useState("");
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [totalProducts, setTotalProducts] = useState(0);
//   const { addNotification } = useNotification();
//   const searchTimeoutRef = useRef(null);
//   const productsPerPage = 10;

//   const fetchProducts = useCallback(async (page = 1) => {
//     try {
//       setLoading(true);
//       const response = await getProducts(search, page, productsPerPage);
//       let filteredProducts = response.data.products || [];
      
//       if (selectedCategory && selectedCategory !== "All") {
//         filteredProducts = filteredProducts.filter(product => product.category === selectedCategory);
//       }
      
//       setProducts(filteredProducts);
//       setTotalProducts(response.data.total || filteredProducts.length);
//       setTotalPages(Math.ceil((response.data.total || filteredProducts.length) / productsPerPage));
//       setError(null);
      
//       if (search && filteredProducts.length === 0) {
//         addNotification(`No products found for "${search}"`, "info");
//       } else if (search && filteredProducts.length > 0) {
//         addNotification(`Found ${response.data.total || filteredProducts.length} product${(response.data.total || filteredProducts.length) > 1 ? 's' : ''} for "${search}"`, "success");
//       }
//     } catch (err) {
//       setError("Failed to fetch products");
//       console.error("Error fetching products:", err);
//       addNotification("Failed to fetch products. Please try again.", "error");
//     } finally {
//       setLoading(false);
//     }
//   }, [search, selectedCategory, addNotification]);

//   useEffect(() => {
//     if (searchTimeoutRef.current) {
//       clearTimeout(searchTimeoutRef.current);
//     }

//     const timeout = setTimeout(() => {
//       setCurrentPage(1);
//       fetchProducts(1);
//     }, 500);

//     searchTimeoutRef.current = timeout;

//     return () => {
//       if (timeout) {
//         clearTimeout(timeout);
//       }
//     };
//   }, [fetchProducts]);

//   useEffect(() => {
//     fetchProducts(currentPage);
//   }, [currentPage]);

//   const handleSearchChange = (e) => {
//     setSearch(e.target.value);
//   };

//   const clearSearch = () => {
//     setSearch("");
//   };

//   const handleCategoryClick = (category) => {
//     setSelectedCategory(category);
//     setSearch("");
//     setCurrentPage(1);
//   };

//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   const categories = [
//     { name: "All", color: "from-black to-gray-800" },
//     { name: "Electronics", color: "from-gray-900 to-black" },
//     { name: "Fashion", color: "from-gray-800 to-gray-900" },
//     { name: "Home & Living", color: "from-black to-gray-800" },
//     { name: "Sports", color: "from-gray-900 to-black" },
//     { name: "Books", color: "from-gray-800 to-gray-900" },
//     { name: "Toys", color: "from-black to-gray-800" }
//   ];

//   if (loading && products.length === 0) {
//     return (
//       <div className="min-h-screen bg-white">
//         <div className="animate-pulse">
//           <div className="bg-black py-20 px-8">
//             <div className="max-w-7xl mx-auto">
//               <div className="h-12 bg-gray-800 rounded-lg mb-4 mx-auto w-96"></div>
//               <div className="h-6 bg-gray-800 rounded-lg mb-8 mx-auto w-64"></div>
//               <div className="h-12 bg-gray-800 rounded-lg mx-auto w-48"></div>
//             </div>
//           </div>
//           <div className="px-8 py-16 bg-gray-50">
//             <div className="max-w-7xl mx-auto">
//               <div className="h-8 bg-gray-200 rounded-lg mb-4 mx-auto w-48"></div>
//               <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
//                 {[...Array(8)].map((_, i) => (
//                   <div key={i} className="bg-white rounded-lg p-4 shadow-lg">
//                     <div className="h-40 bg-gray-200 rounded-lg mb-4"></div>
//                     <div className="h-4 bg-gray-200 rounded mb-2"></div>
//                     <div className="h-4 bg-gray-200 rounded w-3/4"></div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-white flex justify-center items-center">
//         <div className="text-xl font-semibold text-red-500">{error}</div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-white">
//       {/* Hero Slider Section */}
// <section className="relative overflow-hidden bg-black text-white">
//   <Swiper
//     modules={[Autoplay, Pagination, Navigation]}
//     spaceBetween={0}
//     slidesPerView={1}
//     autoplay={{ delay: 4000 }}
//     pagination={{ clickable: true }}
//     navigation
//     loop
//     className="h-[600px]"
//   >

//     {/* Slide 1 */}
//     <SwiperSlide>
//       <div className="relative h-[600px]">
//         <img
//           src={banner1}
//           alt="banner"
//           className="absolute w-full h-full object-cover"
//         />

//         <div className="relative z-10 max-w-7xl mx-auto h-full flex items-center px-8">
//           <div>
//             {/* <h1 className="text-5xl md:text-6xl font-bold mb-6 uppercase tracking-wider">
//               Just Do It
//             </h1> */}

//             <p className="text-xl md:text-2xl mb-8 text-gray-200">
//               {/* The latest drops. Exclusive styles. New arrivals every week. */}
//             </p>

//             <div className="flex flex-col sm:flex-row gap-4">
//               {/* <button className="bg-orange-500 hover:bg-orange-400 text-black px-8 py-4 rounded font-bold text-sm uppercase tracking-wide">
//                 Shop Now
//               </button> */}

//               {/* <button className="border-2 border-white px-8 py-4 rounded font-bold text-sm uppercase tracking-wide hover:bg-white hover:text-black">
//                 Explore
//               </button> */}
//             </div>
//           </div>
//         </div>

//         <div className="absolute inset-0 bg-black/40"></div>
//       </div>
//     </SwiperSlide>


//     {/* Slide 2 */}
//     <SwiperSlide>
//       <div className="relative h-[600px]">
//         <img
//           src={banner2}
//           alt="banner"
//           className="absolute w-full h-full object-cover"
//         />

//         <div className="relative z-10 max-w-7xl mx-auto h-full flex items-center px-8">
//           <div>
//             {/* <h1 className="text-5xl md:text-6xl font-bold mb-6 uppercase tracking-wider">
//               New Collection
//             </h1> */}

//             {/* <p className="text-xl md:text-2xl mb-8 text-gray-200">
//               Fresh styles designed for comfort and performance.
//             </p> */}

//             <div className="flex flex-col sm:flex-row gap-4">
//               {/* <button className="bg-orange-500 hover:bg-orange-400 text-black px-8 py-4 rounded font-bold text-sm uppercase tracking-wide">
//                 Shop Now
//               </button> */}
// {/* 
//               <button className="border-2 border-white px-8 py-4 rounded font-bold text-sm uppercase tracking-wide hover:bg-white hover:text-black">
//                 Explore
//               </button> */}
//             </div>
//           </div>
//         </div>

//         <div className="absolute inset-0 bg-black/40"></div>
//       </div>
//     </SwiperSlide>


//     {/* Slide 3 */}
//     <SwiperSlide>
//       <div className="relative h-[600px]">
//         <img
//           src={banner3}
//           alt="banner"
//           className="absolute w-full h-full object-cover"
//         />

//         <div className="relative z-10 max-w-7xl mx-auto h-full flex items-center px-8">
//           <div>
//             {/* <h1 className="text-5xl md:text-6xl font-bold mb-6 uppercase tracking-wider">
//               Performance Gear
//             </h1> */}

//             {/* <p className="text-xl md:text-2xl mb-8 text-gray-200">
//               Built for athletes. Designed for everyday comfort.
//             </p> */}

//             <div className="flex flex-col sm:flex-row gap-4">
//               {/* <button className="bg-orange-500 hover:bg-orange-400 text-black px-8 py-4 rounded font-bold text-sm uppercase tracking-wide">
//                 Shop Now
//               </button> */}

//               {/* <button className="border-2 border-white px-8 py-4 rounded font-bold text-sm uppercase tracking-wide hover:bg-white hover:text-black">
//                 Explore
//               </button> */}
//             </div>
//           </div>
//         </div>

//         <div className="absolute inset-0 bg-black/40"></div>
//       </div>
//     </SwiperSlide>

//   </Swiper>

// </section>
//       {/* Hero Section */}
//       {/* <section className="relative overflow-hidden bg-black text-white py-20 px-8">
//         <div className="relative max-w-7xl mx-auto">
//           <div className="grid md:grid-cols-2 gap-12 items-center">
//             <div>
//               <h1 className="text-5xl md:text-6xl font-bold mb-6 uppercase tracking-wider">
//                 Just Do It
//               </h1>
//               <p className="text-xl md:text-2xl mb-8 text-gray-300">
//                 The latest drops. Exclusive styles. New arrivals every week.
//               </p>
//               <div className="flex flex-col sm:flex-row gap-4">
//                 <button className="bg-orange-500 hover:bg-orange-400 text-black px-8 py-4 rounded font-bold text-sm uppercase tracking-wide transition-all">
//                   Shop Now
//                 </button>
//                 <button className="border-2 border-white text-white px-8 py-4 rounded font-bold text-sm uppercase tracking-wide hover:bg-white hover:text-black transition-all">
//                   Explore
//                 </button>
//               </div>
//             </div>
//             <div className="relative">
//               <div className="w-full h-96 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg"></div>
//               <div className="absolute inset-0 flex items-center justify-center">
//                 <svg className="w-32 h-32 text-white" viewBox="0 0 24 24" fill="currentColor">
//                   <path d="M19.55 12.02c0 .95-.38 1.81-.99 2.44-.61.63-1.46 1.02-2.39 1.02-.93 0-1.78-.39-2.39-1.02-.61-.63-.99-1.49-.99-2.44 0-.95.38-1.81.99-2.44.61-.63 1.46-1.02 2.39-1.02.93 0 1.78.39 2.39 1.02.61.63.99 1.49.99 2.44z"/>
//                 </svg>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section> */}

//       {/* Categories Section */}
//       <section className="px-8 py-16 bg-gray-50">
//         <div className="max-w-7xl mx-auto">
//           <div className="text-center mb-12">
//             <h2 className="text-3xl font-bold text-black mb-4 uppercase tracking-wide">Shop by Category</h2>
//             <div className="w-24 h-1 bg-orange-500 mx-auto rounded-full"></div>
//           </div>
//           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4">
//             {categories.map((category, index) => (
//               <div
//                 key={index}
//                 onClick={() => handleCategoryClick(category.name)}
//                 className={`group cursor-pointer transform transition-all hover:scale-105 ${
//                   selectedCategory === category.name ? 'ring-2 ring-orange-500 scale-105' : ''
//                 }`}
//               >
//                 <div className={`bg-gradient-to-br ${category.color} rounded-lg p-6 text-center shadow-lg hover:shadow-2xl transition-all h-full flex flex-col items-center justify-center`}>
//                   <h3 className="text-white font-semibold text-sm uppercase tracking-wide">{category.name}</h3>
//                   {selectedCategory === category.name && (
//                     <div className="mt-2">
//                       <svg className="w-4 h-4 text-orange-500 mx-auto" fill="currentColor" viewBox="0 0 20 20">
//                         <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
//                       </svg>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Search Section */}
//       <div className="max-w-4xl mx-auto px-8 mb-12">
//         <div className="relative">
//           <input
//             type="text"
//             placeholder="Search products, brands, and more..."
//             className="w-full p-4 pl-14 pr-14 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all text-lg bg-white text-black"
//             value={search}
//             onChange={handleSearchChange}
//           />
//           <div className="absolute left-5 top-1/2 transform -translate-y-1/2">
//             <svg className="h-6 w-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//             </svg>
//           </div>
//           {search && (
//             <button
//               onClick={clearSearch}
//               className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
//             >
//               <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//               </svg>
//             </button>
//           )}
//         </div>
//         {search && (
//           <div className="mt-3 text-center text-gray-600 font-medium">
//             Searching for: <span className="font-bold text-black">"{search}"</span>
//           </div>
//         )}
//         {selectedCategory && selectedCategory !== "All" && (
//           <div className="mt-3 text-center text-gray-600 font-medium">
//             Category: <span className="font-bold text-black">{selectedCategory}</span>
//           </div>
//         )}
//       </div>

//       {/* Products Section */}
//       <section className="px-8 pb-16">
//         <div className="max-w-7xl mx-auto">
//           <div className="text-center mb-12">
//             <h2 className="text-4xl font-bold text-black mb-4">
//               {search ? `Search Results for "${search}"` : 
//                selectedCategory && selectedCategory !== "All" ? `${selectedCategory} Products` :
//                "Featured Products"}
//             </h2>
//             <div className="w-24 h-1 bg-orange-500 mx-auto rounded-full"></div>
//             <p className="text-gray-600 mt-4">
//               {products.length} product{products.length !== 1 ? 's' : ''} available
//             </p>
//           </div>

//           {products.length === 0 && !loading ? (
//             <div className="text-center py-16">
//               <svg className="mx-auto h-16 w-16 text-gray-300 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//               </svg>
//               <h3 className="text-2xl font-semibold text-gray-600 mb-3">
//                 {search ? `No products found for "${search}"` : 
//                  selectedCategory && selectedCategory !== "All" ? `No products in ${selectedCategory}` :
//                  "No products available"}
//               </h3>
//               <p className="text-gray-500 mb-6 text-lg">
//                 {search ? "Try searching with different keywords" : 
//                  selectedCategory && selectedCategory !== "All" ? "This category is currently empty" :
//                  "Check back later for amazing products"}
//               </p>
//               {(search || selectedCategory) && (
//                 <button
//                   onClick={() => {
//                     clearSearch();
//                     setSelectedCategory(null);
//                   }}
//                   className="bg-orange-500 hover:bg-orange-400 text-black px-8 py-3 rounded font-bold text-sm uppercase tracking-wide transition-all"
//                 >
//                   Clear Filters
//                 </button>
//               )}
//             </div>
//           ) : (
//             <>
//               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
//                 {products.map((product) => (
//                   <ProductCard key={product._id} product={product} />
//                 ))}
//               </div>
//               {/* Pagination */}
//               {totalPages > 1 && (
//                 <div className="mt-12 flex justify-center">
//                   <div className="flex items-center space-x-2">
//                     <button
//                       onClick={() => handlePageChange(currentPage - 1)}
//                       disabled={currentPage === 1}
//                       className="px-3 py-2 rounded-lg border border-gray-300 text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
//                     >
//                       <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//                       </svg>
//                     </button>
                    
//                     {[...Array(totalPages)].map((_, index) => {
//                       const page = index + 1;
//                       return (
//                         <button
//                           key={page}
//                           onClick={() => handlePageChange(page)}
//                           className={`px-4 py-2 rounded-lg font-medium transition-colors ${
//                             currentPage === page
//                               ? 'bg-orange-500 text-black'
//                               : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
//                           }`}
//                         >
//                           {page}
//                         </button>
//                       );
//                     })}
                    
//                     <button
//                       onClick={() => handlePageChange(currentPage + 1)}
//                       disabled={currentPage === totalPages}
//                       className="px-3 py-2 rounded-lg border border-gray-300 text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
//                     >
//                       <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                       </svg>
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </>
//           )}
//         </div>
//       </section>

//       {/* Promotional Banner */}
//       <section className="bg-black text-white py-16 px-8">
//         <div className="max-w-7xl mx-auto text-center">
//           <h2 className="text-3xl md:text-4xl font-bold mb-4 uppercase tracking-wide">
//             Member Exclusive
//           </h2>
//           <p className="text-xl mb-8 text-gray-300">
//             Free shipping on orders over ₹2000
//           </p>
//           <div className="flex justify-center gap-8 text-gray-300">
//             <div className="flex items-center">
//               <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
//                 <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/>
//               </svg>
//               Free Returns
//             </div>
//             <div className="flex items-center">
//               <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
//                 <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/>
//               </svg>
//               Member Rewards
//             </div>
//             <div className="flex items-center">
//               <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
//                 <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/>
//               </svg>
//               24/7 Support
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }

// export default Home;
import { useState, useEffect, useCallback, useRef } from "react";
import ProductCard from "../components/ProductCard";
import { getProducts } from "../services/api";
import { useNotification } from "../context/NotificationContext";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import banner1 from "../assets/banner1.png";
import banner2 from "../assets/banner2.png";
import banner3 from "../assets/banner3.png";

function Home() {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);

  const { addNotification } = useNotification();
  const searchTimeoutRef = useRef(null);

  const productsPerPage = 10;

  const fetchProducts = useCallback(async (page = 1) => {
    try {
      setLoading(true);

      const response = await getProducts(search, page, productsPerPage);
      let allProducts = response.data.products || [];
      
      console.log("API Response:", response.data);
      console.log("All Products:", allProducts);
      console.log("Selected Category:", selectedCategory);

      // Filter by category if selected
      if (selectedCategory && selectedCategory !== "All") {
        // Debug: Show all category names in products
        const categoryNames = allProducts.map(p => p.category);
        console.log("Available Categories:", [...new Set(categoryNames)]);
        
        const filteredProducts = allProducts.filter(
          (product) => product.category === selectedCategory
        );
        console.log("Filtered Products:", filteredProducts);
        setProducts(filteredProducts);
        setTotalProducts(filteredProducts.length);
      } else {
        console.log("No category filter, showing all products");
        setProducts(allProducts);
        setTotalProducts(response.data.total || allProducts.length);
      }
      
      setTotalPages(
        Math.ceil(
          (response.data.total || allProducts.length) / productsPerPage
        )
      );

      setError(null);

      if (search && allProducts.length === 0) {
        addNotification(`No products found for "${search}"`, "info");
      } else if (search && allProducts.length > 0) {
        addNotification(
          `Found ${
            response.data.total || allProducts.length
          } product(s) for "${search}"`,
          "success"
        );
      }
    } catch (err) {
      setError("Failed to fetch products");
      console.error(err);
      addNotification("Failed to fetch products. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  }, [search, selectedCategory, addNotification]);

  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    const timeout = setTimeout(() => {
      setCurrentPage(1);
      fetchProducts(1);
    }, 500);

    searchTimeoutRef.current = timeout;

    return () => clearTimeout(timeout);
  }, [fetchProducts]);

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const clearSearch = () => {
    setSearch("");
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setSearch("");
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const categories = [
    { name: "All", color: "from-black to-gray-800" },
    { name: "Electronics", color: "from-gray-900 to-black" },
    { name: "Fashion", color: "from-gray-800 to-gray-900" },
    { name: "Home & Living", color: "from-black to-gray-800" },
    { name: "Sports", color: "from-gray-900 to-black" },
    { name: "Books", color: "from-gray-800 to-gray-900" },
    { name: "Toys", color: "from-black to-gray-800" }
  ];

  if (loading && products.length === 0) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">

      {/* HERO SLIDER */}
      <section className="relative overflow-hidden mt-4">
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          slidesPerView={1}
          autoplay={{ delay: 4000 }}
          pagination={{ clickable: true }}
          navigation
          loop
          className="h-[300px] md:h-[450px] lg:h-[550px]"
        >
          <SwiperSlide>
            <img
              src={banner1}
              alt="banner1"
              className="w-full h-full object-cover"
            />
          </SwiperSlide>

          <SwiperSlide>
            <img
              src={banner2}
              alt="banner2"
              className="w-full h-full object-cover"
            />
          </SwiperSlide>

          <SwiperSlide>
            <img
              src={banner3}
              alt="banner3"
              className="w-full h-full object-cover"
            />
          </SwiperSlide>
        </Swiper>
      </section>


      {/* Categories */}
      <section className="px-8 py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Shop by Category
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4">
            {categories.map((category, index) => (
              <div
                key={index}
                onClick={() => handleCategoryClick(category.name)}
                className={`cursor-pointer transform transition-all hover:scale-105 ${
                  selectedCategory === category.name ? 'ring-2 ring-orange-500 scale-105' : ''
                }`}
              >
                <div
                  className={`bg-gradient-to-br ${category.color} text-white p-6 text-center rounded-lg shadow-lg hover:shadow-2xl transition-all h-full flex flex-col items-center justify-center`}
                >
                  <h3 className="font-semibold text-sm uppercase tracking-wide">{category.name}</h3>
                  {selectedCategory === category.name && (
                    <div className="mt-2">
                      <svg className="w-4 h-4 text-orange-500 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* SEARCH */}
      <div className="max-w-4xl mx-auto px-8 mb-12">
        <input
          type="text"
          placeholder="Search products..."
          className="w-full p-4 border rounded-lg"
          value={search}
          onChange={handleSearchChange}
        />

        {search && (
          <button
            onClick={clearSearch}
            className="mt-3 text-orange-500"
          >
            Clear Search
          </button>
        )}
      </div>

      {/* PRODUCTS */}
      <section className="px-8 pb-16">
        <div className="max-w-7xl mx-auto">
          {/* Products Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-black mb-4">
              {search ? `Search Results for "${search}"` : 
               selectedCategory && selectedCategory !== "All" ? `${selectedCategory} Products` :
               "Featured Products"}
            </h2>
            <div className="w-24 h-1 bg-orange-500 mx-auto rounded-full"></div>
            <p className="text-gray-600 mt-4">
              {products.length} product{products.length !== 1 ? 's' : ''} available
            </p>
            
            {/* Show selected category info and clear button */}
            {selectedCategory && selectedCategory !== "All" && (
              <div className="mt-6 flex items-center justify-center gap-3">
                <span className="text-gray-600">
                  Category: <span className="font-bold text-black">{selectedCategory}</span>
                </span>
                <button
                  onClick={() => {
                    setSelectedCategory(null);
                    setCurrentPage(1);
                  }}
                  className="text-orange-500 hover:text-orange-400 font-medium"
                >
                  Clear Category
                </button>
              </div>
            )}
          </div>

          {/* No products message */}
          {products.length === 0 && !loading ? (
            <div className="text-center py-16">
              <h3 className="text-2xl font-semibold text-gray-600 mb-3">
                {search ? `No products found for "${search}"` : 
                 selectedCategory && selectedCategory !== "All" ? `No products in ${selectedCategory}` :
                 "No products available"}
              </h3>
              <p className="text-gray-500 mb-6 text-lg">
                {search ? "Try searching with different keywords" : 
                 selectedCategory && selectedCategory !== "All" ? "This category is currently empty" :
                 "Check back later for amazing products"}
              </p>
              {(search || selectedCategory) && (
                <button
                  onClick={() => {
                    clearSearch();
                    setSelectedCategory(null);
                  }}
                  className="bg-orange-500 hover:bg-orange-400 text-black px-8 py-3 rounded font-bold text-sm uppercase tracking-wide transition-all"
                >
                  Clear Filters
                </button>
              )}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>

              {/* PAGINATION */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-12 gap-2">
                  {[...Array(totalPages)].map((_, index) => {
                    const page = index + 1;

                    return (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`px-4 py-2 rounded ${
                          currentPage === page
                            ? "bg-orange-500 text-white"
                            : "border"
                        }`}
                      >
                        {page}
                      </button>
                    );
                  })}
                </div>
              )}
            </>
          )}

        </div>
      </section>

      {/* PROMO */}
      <section className="bg-black text-white py-16 text-center">
        <h2 className="text-3xl font-bold">Member Exclusive</h2>
        <p className="mt-3">Free shipping on orders over ₹2000</p>
      </section>

    </div>
  );
}

export default Home;