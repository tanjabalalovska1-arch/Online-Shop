
import { useAuth } from "./context/AuthContext.jsx";
import {
  Routes,
  Route,
  NavLink,
  useNavigate,
  useSearchParams,
  useLocation,
} from "react-router-dom";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home.jsx";
import ProductPage from "./pages/ProductPage";
import SearchPage from "./pages/SearchPage";
import { useState, useEffect } from "react";
import ProductCard from "./components/ProductCard";
import Cart from "./components/Cart";
import "./App.css";

import useFetch from "./hooks/useFetch";
// import useLocalStorage from "./hooks/useLocalStorage";

// import ProductDetails from "./ProductDetails/ProductDetails";

import MainLayout from "./layouts/MainLayout";
import { useCart } from "./context/CartContext.jsx";
import { useTheme } from "./context/ThemeContext.jsx";

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

function Shop() {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const location = useLocation();

  const [searchTerm, setSearchTerm] = useState(
    () => searchParams.get("search") || "",
  );
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
  const productsUrl = selectedCategory
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

  // Loading i error sostojbi za proizvodite
  if (productsLoading) {
    return <p>Loading products...</p>;
  }

  if (productsError) {
    return <p>Error: {productsError.message}</p>;
  }

  // Prebaruvanje po ime na proizvod
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

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

            <select
              value={selectedCategory}
              onChange={(e) => {
                const value = e.target.value;
                setSelectedCategory(value);
                setCurrentPage(1);

                setSearchParams((prev) => {
                  const params = new URLSearchParams(prev);

                  if (value) {
                    params.set("category", value);
                  } else {
                    params.delete("category");
                  }

                  params.set("page", "1");
                  return params;
                });
              }}
            >
              <option value="">All categories</option>

              {categories.map((category) => (
                <option key={category.slug} value={category.slug}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

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
  const { items: cart, addToCart } = useCart();

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { user, login, logout } = useAuth();

  return (
    <div className={`app ${theme}`}>
      <header className="header">
        <NavLink to="/" className="brand">
          <span className="brand-logo" aria-hidden="true">
            <svg viewBox="0 0 48 48" width="42" height="42" fill="none">
              <path
                d="M6 23L24 7L42 23"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 21V40H36V21"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinejoin="round"
              />
              <path
                d="M20 40V28H28V40"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinejoin="round"
              />
            </svg>
          </span>

          <span className="brand-name">Urban Nest</span>
        </NavLink>

        <div className="header-actions">
          {user ? (
            <button className="auth-toggle" type="button" onClick={logout}>
              Logout
            </button>
          ) : (
            <button className="auth-toggle" type="button" onClick={login}>
              Login
            </button>
          )}

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
        </div>
      </header>

      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />

          <Route path="shop" element={<Shop />} />

          <Route path="products/:id" element={<ProductPage />} />

          <Route path="about" element={<About />} />

          <Route path="search" element={<SearchPage />} />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>

      <div className={`cart cart-drawer ${isCartOpen ? "open" : ""}`}>
        <button className="cart-close" onClick={() => setIsCartOpen(false)}>
          ✕
        </button>

        <Cart />
      </div>
    </div>
  );
}

export default App;
