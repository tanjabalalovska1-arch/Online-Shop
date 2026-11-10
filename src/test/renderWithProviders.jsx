import { render } from "@testing-library/react";

import { LanguageProvider } from "../context/LanguageContext.jsx";
import { AuthProvider } from "../context/AuthContext.jsx";
import { CartProvider } from "../context/CartContext.jsx";
import { FavoritesProvider } from "../context/FavoritesContext.jsx";

export function renderWithProviders(ui, options) {
  return render(
    <LanguageProvider>
      <AuthProvider>
        <CartProvider>
          <FavoritesProvider>{ui}</FavoritesProvider>
        </CartProvider>
      </AuthProvider>
    </LanguageProvider>,
    options,
  );
}
