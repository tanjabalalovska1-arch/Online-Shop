import { useState, useEffect, lazy, Suspense } from "react";
import { useAuth } from "./context/AuthContext.jsx";
import {
  Routes,
  Route,
  NavLink,
  useNavigate,
  useSearchParams,
  useLocation,
} from "react-router-dom";
const About = lazy(() => import("./pages/About"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Home = lazy(() => import("./pages/Home.jsx"));
const ProductPage = lazy(() => import("./pages/ProductPage"));
const SearchPage = lazy(() => import("./pages/SearchPage"));
const Favorites = lazy(() => import("./pages/Favorites.jsx"));
const DashboardLayout = lazy(() => import("./pages/DashboardLayout.jsx"));
const Register = lazy(() => import("./pages/Register.jsx"));
const Login = lazy(() => import("./pages/Login.jsx"));

import ProductCard from "./components/ProductCard";
import Cart from "./components/Cart";
import Footer from "./components/Footer.jsx";
import "./App.css";

import useFetch from "./hooks/useFetch";
// import useLocalStorage from "./hooks/useLocalStorage";

// import ProductDetails from "./ProductDetails/ProductDetails";

import MainLayout from "./layouts/MainLayout";
import { useCart } from "./context/CartContext.jsx";
import { useTheme } from "./context/ThemeContext.jsx";
import { useSearch } from "./context/SearchContext.jsx";
import { useFavorites } from "./context/FavoritesContext.jsx";

// function MultiStepForm() {
//   const [step, setStep] = useState(1);
//   const [name, setName] = useLocalStorage("form-name", "");
//   const [email, setEmail] = useLocalStorage("form-email", "");
//   const [address, setAddress] = useLocalStorage("form-address", "");

//   return (
//     <div>
//       <h2>Multi-step Form</h2>
//       <p>Step {step} of 3</p>

//       {step === 1 && (
//         <div>
//           <input
//             placeholder="Name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//           />
//           <button
//             onClick={() => {
//               if (name.trim()) setStep(2);
//             }}
//           >
//             Next
//           </button>
//         </div>
//       )}

//       {step === 2 && (
//         <div>
//           <input
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           <button onClick={() => setStep(1)}>Back</button>
//           <button
//             onClick={() => {
//               if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
//                 setStep(3);
//               }
//             }}
//           >
//             Next
//           </button>
//         </div>
//       )}

//       {step === 3 && (
//         <div>
//           <input
//             placeholder="Address"
//             value={address}
//             onChange={(e) => setAddress(e.target.value)}
//           />
//           <button onClick={() => setStep(2)}>Back</button>
//           <button
//             onClick={() => {
//               if (address.trim()) alert("Form completed!");
//             }}
//           >
//             Finish
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

// function PostsDemo() {
//   const { data, loading, error } = useFetch(
//     "https://jsonplaceholder.typicode.com/posts",
//   );

//   if (loading) return <p>Loading posts...</p>;
//   if (error) return <p>Error: {error.message}</p>;

//   return (
//     <div>
//       <h2>Posts Demo</h2>
//       <ul>
//         {(data ?? []).slice(0, 10).map((post) => (
//           <li key={post.id}>{post.title}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// function FormPreview({ name, setName }) {
//   return (
//     <div>
//       <h3>Form</h3>
//       <input
//         type="text"
//         placeholder="Enter your name"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//       />

//       <h3>Preview</h3>
//       <p>Your name is: {name || "Not entered yet"}</p>
//     </div>
//   );
// }

// function Shop() {
//   const { addToCart } = useCart();

//   const {
//     products: searchResults,
//     loading: searchLoading,
//     error: searchError,
//     search,
//   } = useSearch();

//   const navigate = useNavigate();
//   const [searchParams, setSearchParams] = useSearchParams();

//   const location = useLocation();

//   const [searchTerm, setSearchTerm] = useState(
//     () => searchParams.get("search") || "",
//   );
//   useEffect(() => {
//     const timeoutId = setTimeout(() => {
//       search(searchTerm);
//     }, 500);

//     return () => {
//       clearTimeout(timeoutId);
//     };
//   }, [searchTerm, search]);

//   const [selectedCategory, setSelectedCategory] = useState(
//     () => searchParams.get("category") || "",
//   );
//   const [categories, setCategories] = useState([]);
//   const [currentPage, setCurrentPage] = useState(
//     Number(searchParams.get("page")) || 1,
//   );

//   useEffect(() => {
//     const page = Number(searchParams.get("page"));
//     setCurrentPage(page > 0 ? page : 1);
//   }, [searchParams]);

//   const productsPerPage = 16;

//   // URL za site proizvodi ili za izbranata kategorija
//   const productsUrl = searchTerm
//     ? null
//     : selectedCategory
//       ? `https://dummyjson.com/products/category/${selectedCategory}`
//       : "https://dummyjson.com/products?limit=0";

//   // Custom hook gi prezema proizvodite
//   const {
//     data: productsData,
//     loading: productsLoading,
//     error: productsError,
//   } = useFetch(productsUrl);

//   useEffect(() => {
//     const savedScrollY = location.state?.scrollY;

//     if (productsLoading || savedScrollY == null) return;

//     const timeoutId = setTimeout(() => {
//       window.scrollTo(0, savedScrollY);
//     }, 100);

//     return () => clearTimeout(timeoutId);
//   }, [productsLoading, location.state]);

//   // Gi zemame proizvodite od odgovorot na API
//   const products = productsData?.products ?? [];

//   // Ja prezemame listata na kategorii
//   useEffect(() => {
//     async function fetchCategories() {
//       try {
//         const response = await fetch(
//           "https://dummyjson.com/products/categories",
//         );

//         if (!response.ok) {
//           throw new Error("Failed to fetch categories");
//         }

//         const data = await response.json();
//         setCategories(data);
//       } catch (err) {
//         console.error(err.message);
//       }
//     }

//     fetchCategories();
//   }, []);

//   // Loading i error sostojbi za proizvodite
//   if (productsLoading) {
//     return <p>Loading products...</p>;
//   }

//   if (productsError) {
//     return <p>Error: {productsError.message}</p>;
//   }

//   // Prebaruvanje po ime na proizvod
//   const filteredProducts = searchTerm
//     ? searchResults.filter(
//         (product) => !selectedCategory || product.category === selectedCategory,
//       )
//     : products;

//   // Paginacija
//   const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

//   const startIndex = (currentPage - 1) * productsPerPage;

//   const currentProducts = filteredProducts.slice(
//     startIndex,
//     startIndex + productsPerPage,
//   );

//   return (
//     <div>
//       <div className="shop">
//         <div className="products-section">
//           <div className="shop-controls">
//             <input
//               type="text"
//               placeholder="Search products..."
//               value={searchTerm}
//               onChange={(e) => {
//                 const value = e.target.value;
//                 setSearchTerm(value);
//                 setCurrentPage(1);

//                 setSearchParams((prev) => {
//                   const params = new URLSearchParams(prev);

//                   if (value) {
//                     params.set("search", value);
//                   } else {
//                     params.delete("search");
//                   }

//                   params.set("page", "1");
//                   return params;
//                 });
//               }}
//             />

//             <select
//               value={selectedCategory}
//               onChange={(e) => {
//                 const value = e.target.value;
//                 setSelectedCategory(value);
//                 setCurrentPage(1);

//                 setSearchParams((prev) => {
//                   const params = new URLSearchParams(prev);

//                   if (value) {
//                     params.set("category", value);
//                   } else {
//                     params.delete("category");
//                   }

//                   params.set("page", "1");
//                   return params;
//                 });
//               }}
//             >
//               <option value="">All categories</option>

//               {categories.map((category) => (
//                 <option key={category.slug} value={category.slug}>
//                   {category.name}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {searchLoading && <p>Searching products...</p>}

//           {searchError && <p>Error: {searchError}</p>}

//           <div className="products">
//             {currentProducts.map((product) => (
//               <ProductCard
//                 key={product.id}
//                 product={product}
//                 onAddToCart={addToCart}
//                 onSelectProduct={() =>
//                   navigate(`/products/${product.id}`, {
//                     state: {
//                       from: `/shop?${searchParams.toString()}`,
//                       scrollY: window.scrollY,
//                     },
//                   })
//                 }
//               />
//             ))}
//           </div>

//           <div className="pagination">
//             <button
//               onClick={() => {
//                 const nextPage = currentPage - 1;
//                 setCurrentPage(nextPage);

//                 setSearchParams((prev) => {
//                   const params = new URLSearchParams(prev);
//                   params.set("page", String(nextPage));
//                   return params;
//                 });
//               }}
//               disabled={currentPage === 1}
//             >
//               Previous
//             </button>

//             <span>
//               Page {currentPage} of {totalPages}
//             </span>

//             <button
//               onClick={() => {
//                 const nextPage = currentPage + 1;
//                 setCurrentPage(nextPage);

//                 setSearchParams((prev) => {
//                   const params = new URLSearchParams(prev);
//                   params.set("page", String(nextPage));
//                   return params;
//                 });
//               }}
//               disabled={currentPage === totalPages || totalPages === 0}
//             >
//               Next
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

function Shop() {
  const { addToCart } = useCart();

  const {
    products: searchResults,
    loading: searchLoading,
    error: searchError,
    search,
  } = useSearch();

  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const location = useLocation();

  const [searchTerm, setSearchTerm] = useState(
    () => searchParams.get("search") || "",
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      search(searchTerm);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchTerm, search]);

  const [selectedCategory, setSelectedCategory] = useState(
    () => searchParams.get("category") || "",
  );

  const [categories, setCategories] = useState([]);

  const [currentPage, setCurrentPage] = useState(
    Number(searchParams.get("page")) || 1,
  );

  useEffect(() => {
    const page = Number(searchParams.get("page"));
    setCurrentPage(page > 0 ? page : 1);
  }, [searchParams]);

  const productsPerPage = 16;

  // URL za site proizvodi ili za izbranata kategorija
  const productsUrl = searchTerm
    ? null
    : selectedCategory
      ? `https://dummyjson.com/products/category/${selectedCategory}`
      : "https://dummyjson.com/products?limit=0";

  // Custom hook gi prezema proizvodite
  const {
    data: productsData,
    loading: productsLoading,
    error: productsError,
  } = useFetch(productsUrl);

  useEffect(() => {
    const savedScrollY = location.state?.scrollY;

    if (productsLoading || savedScrollY == null) return;

    const timeoutId = setTimeout(() => {
      window.scrollTo(0, savedScrollY);
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [productsLoading, location.state]);

  // Gi zemame proizvodite od odgovorot na API
  const products = productsData?.products ?? [];

  // Ja prezemame listata na kategorii
  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch(
          "https://dummyjson.com/products/categories",
        );

        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }

        const data = await response.json();
        setCategories(data);
      } catch (err) {
        console.error(err.message);
      }
    }

    fetchCategories();
  }, []);

  // Funkcija za izbor na kategorija
  function handleCategoryChange(slug) {
    setSelectedCategory(slug);
    setCurrentPage(1);

    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);

      if (slug) {
        params.set("category", slug);
      } else {
        params.delete("category");
      }

      params.set("page", "1");
      return params;
    });
  }

  // Loading i error sostojbi za proizvodite
  // if (productsLoading) {
  //   return <p>Loading products...</p>;
  // }

  // if (productsError) {
  //   return <p>Error: {productsError.message}</p>;
  // }

  // Prebaruvanje po ime na proizvod
  const filteredProducts = searchTerm
    ? searchResults.filter(
        (product) => !selectedCategory || product.category === selectedCategory,
      )
    : products;

  // Paginacija
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const startIndex = (currentPage - 1) * productsPerPage;

  const currentProducts = filteredProducts.slice(
    startIndex,
    startIndex + productsPerPage,
  );

  return (
    <div>
      <div className="shop">
        {/* LEFT SIDEBAR */}
        <aside className="un-sidebar">
          <p className="un-sidebar-label">EXPLORE</p>

          <h2>Categories</h2>

          <nav className="un-category-list" aria-label="Product categories">
            <button
              className={`un-category-row ${!selectedCategory ? "active" : ""}`}
              type="button"
              onClick={() => handleCategoryChange("")}
            >
              <span className="un-category-index">00</span>
              <span className="un-category-name">All Products</span>
              <span className="un-category-arrow">↗</span>
            </button>

            {categories.map((category, index) => (
              <button
                className={`un-category-row ${
                  selectedCategory === category.slug ? "active" : ""
                }`}
                type="button"
                key={category.slug}
                onClick={() => handleCategoryChange(category.slug)}
              >
                <span className="un-category-index">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className="un-category-name">{category.name}</span>

                <span className="un-category-arrow">↗</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* RIGHT MAIN CONTENT */}
        <div className="products-section">
          <div className="shop-controls">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => {
                const value = e.target.value;
                setSearchTerm(value);
                setCurrentPage(1);

                setSearchParams((prev) => {
                  const params = new URLSearchParams(prev);

                  if (value) {
                    params.set("search", value);
                  } else {
                    params.delete("search");
                  }

                  params.set("page", "1");
                  return params;
                });
              }}
            />

            <button
              type="button"
              className="clear-filter-btn"
              onClick={() => {
                setSearchTerm("");
                setCurrentPage(1);
                search("");

                setSearchParams((prev) => {
                  const params = new URLSearchParams(prev);
                  params.delete("search");
                  params.set("page", "1");
                  return params;
                });
              }}
            >
              Clear Filter
            </button>
          </div>

          {searchLoading && <p>Searching products...</p>}

          {searchError && <p>Error: {searchError}</p>}

          {productsLoading ? (
            <p className="shop-message">Loading products...</p>
          ) : productsError ? (
            <p className="shop-message">Error: {productsError.message}</p>
          ) : currentProducts.length === 0 ? (
            <p className="shop-message">No products found in this category.</p>
          ) : (
            <div className="products">
              {currentProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={addToCart}
                  onSelectProduct={() =>
                    navigate(`/products/${product.id}`, {
                      state: {
                        from: `/shop?${searchParams.toString()}`,
                        scrollY: window.scrollY,
                      },
                    })
                  }
                />
              ))}
            </div>
          )}

          <div className="pagination">
            <button
              onClick={() => {
                const nextPage = currentPage - 1;
                setCurrentPage(nextPage);

                setSearchParams((prev) => {
                  const params = new URLSearchParams(prev);
                  params.set("page", String(nextPage));
                  return params;
                });
              }}
              disabled={currentPage === 1}
            >
              Previous
            </button>

            <span>
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={() => {
                const nextPage = currentPage + 1;
                setCurrentPage(nextPage);

                setSearchParams((prev) => {
                  const params = new URLSearchParams(prev);
                  params.set("page", String(nextPage));
                  return params;
                });
              }}
              disabled={currentPage === totalPages || totalPages === 0}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  const { items: cart } = useCart();
  const { favorites } = useFavorites();

  const favoritesCount = favorites.length;
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const [isCartOpen, setIsCartOpen] = useState(false);

  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();

  return (
    <div className={`app ${theme}`}>
      <header className="header">
        <NavLink to="/" className="brand">
          <span className="brand-icon">✦</span>
          <span className="brand-name">NEXORA</span>
        </NavLink>

        


        <div className="header-actions">
  {/* USER GREETING */}
  {user && (
    <span className="user-greeting">
      Hi, {user.name}
    </span>
  )}

  {/* THEME TOGGLE */}
  <button
    className="theme-toggle"
    onClick={toggleTheme}
    aria-label={
      theme === "light" ? "Enable dark mode" : "Enable light mode"
    }
    title={theme === "light" ? "Dark mode" : "Light mode"}
  >
    {theme === "light" ? "🌙" : "☀️"}
  </button>

  {/* FAVORITES */}
  <NavLink
    to="/favorites"
    className="favorites-toggle"
    aria-label={`Open favorites, ${favoritesCount} items`}
    title="Favorites"
  >
    <span className="favorites-icon-wrapper">
      <span aria-hidden="true">♡</span>

      {favoritesCount > 0 && (
        <span className="favorites-badge">{favoritesCount}</span>
      )}
    </span>
  </NavLink>

  {/* SHOPPING CART */}
          <button
            className="cart-toggle"
            onClick={() => setIsCartOpen(true)}
            aria-label={`Open shopping cart, ${cartCount} items`}
            title="Shopping cart"
          >
            <span className="cart-icon-wrapper">
              <svg
                viewBox="0 0 24 24"
                width="27"
                height="27"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1H5L7.7 14.4A2 2 0 0 0 9.7 16H19a2 2 0 0 0 2-1.6L23 7H6" />
              </svg>

              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </span>
          </button>

  {/* LOGOUT */}
  {user && (
    <button
      className="auth-toggle"
      type="button"
      onClick={logout}
    >
      Logout
    </button>
  )}
</div>
      </header>

      <div className="app-main">
        <Suspense fallback={<p className="loading-message">Loading page...</p>}>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route path="shop" element={<Shop />} />
              <Route path="register" element={<Register />} />
              <Route path="login" element={<Login />} />
              <Route path="favorites" element={<Favorites />} />
              <Route path="products/:id" element={<ProductPage />} />
              <Route path="about" element={<About />} />

              <Route path="dashboard" element={<DashboardLayout />}>
                <Route index element={<h2>Dashboard Home</h2>} />
                <Route path="settings" element={<h2>Dashboard Settings</h2>} />
              </Route>

              <Route path="search" element={<SearchPage />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Suspense>
      </div>

      <Footer />

      <div className={`cart cart-drawer ${isCartOpen ? "open" : ""}`}>
        <button
          className="cart-close"
          onClick={() => setIsCartOpen(false)}
          aria-label="Close cart"
        >
          ✕
        </button>

        <Cart />
      </div>
    </div>
  );
}

export default App;
