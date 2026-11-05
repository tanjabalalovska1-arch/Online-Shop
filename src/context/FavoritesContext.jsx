import { createContext, useContext, useCallback } from "react";

import useLocalStorage from "../hooks/useLocalStorage";
import { useAuth } from "./AuthContext.jsx";

const FavoritesContext = createContext(null);

export function FavoritesProvider({ children }) {
  const { user } = useAuth();
  const [favorites, setFavorites] = useLocalStorage("urban-nest-favorites", []);

  // Dodava ili otstranuva proizvod od omileni
  const toggleFavorite = useCallback(
    (product) => {
      if (!user) {
        return false;
      }

      setFavorites((currentFavorites) => {
        const alreadyFavorite = currentFavorites.some(
          (item) => item.id === product.id,
        );

        if (alreadyFavorite) {
          return currentFavorites.filter((item) => item.id !== product.id);
        }

        return [...currentFavorites, product];
      });

      return true;
    },
    [user, setFavorites],
  );

  const isFavorite = useCallback(
    (productId) => favorites.some((item) => item.id === productId),
    [favorites],
  );

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        toggleFavorite,
        isFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error("useFavorites mora da se koristi vo FavoritesProvider.");
  }

  return context;
}
