import { createContext, useContext, useCallback, useMemo } from "react";

import useLocalStorage from "../hooks/useLocalStorage";
import { useAuth } from "./AuthContext.jsx";

const FavoritesContext = createContext(null);

function UserFavoritesProvider({ children, userId }) {
  const storageKey = userId
    ? `urban-nest-favorites-${userId}`
    : "urban-nest-favorites-guest";

  const [favorites, setFavorites] = useLocalStorage(storageKey, []);

  // Dodava ili otstranuva proizvod od omileni
  const toggleFavorite = useCallback(
    (product) => {
      if (!userId) {
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
    [userId, setFavorites],
  );

  const isFavorite = useCallback(
    (productId) => favorites.some((item) => item.id === productId),
    [favorites],
  );

  const value = useMemo(
    () => ({
      favorites,
      toggleFavorite,
      isFavorite,
    }),
    [favorites, toggleFavorite, isFavorite],
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function FavoritesProvider({ children }) {
  const { user } = useAuth();

  return (
    <UserFavoritesProvider key={user?.id ?? "guest"} userId={user?.id ?? null}>
      {children}
    </UserFavoritesProvider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error("useFavorites mora da se koristi vo FavoritesProvider.");
  }

  return context;
}
