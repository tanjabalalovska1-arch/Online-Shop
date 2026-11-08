import { FavoritesProvider } from "./context/FavoritesContext.jsx";
import { SearchProvider } from "./context/SearchContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { LanguageProvider } from "./context/LanguageContext.jsx";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LanguageProvider>
      <AuthProvider>
        <HashRouter>
          <CartProvider>
            <ThemeProvider>
              <SearchProvider>
                <FavoritesProvider>
                  <App />
                </FavoritesProvider>
              </SearchProvider>
            </ThemeProvider>
          </CartProvider>
        </HashRouter>
      </AuthProvider>
    </LanguageProvider>
  </StrictMode>,
);
