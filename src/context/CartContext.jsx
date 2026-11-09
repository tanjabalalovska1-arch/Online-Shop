import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
  useMemo,
} from "react";

import useLocalStorage from "../hooks/useLocalStorage";
import { useAuth } from "./AuthContext.jsx";

const CartContext = createContext(null);

// Reducer odlucuva kako se menuva kosnickata
function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingProduct = state.find(
        (item) => item.id === action.payload.id,
      );

      if (existingProduct) {
        return state.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [...state, { ...action.payload, quantity: 1 }];
    }

    case "REMOVE_ITEM": {
      const existingProduct = state.find((item) => item.id === action.payload);

      if (!existingProduct) return state;

      if (existingProduct.quantity > 1) {
        return state.map((item) =>
          item.id === action.payload
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        );
      }

      return state.filter((item) => item.id !== action.payload);
    }

    case "DELETE_ITEM":
      return state.filter((item) => item.id !== action.payload);

    case "CLEAR_CART":
      return [];

    default:
      return state;
  }
}

// Provider za kosnickata na eden konkreten korisnik
function UserCartProvider({ children, userId }) {
  const storageKey = userId ? `shopping-cart-${userId}` : "shopping-cart-guest";

  const [savedCart, setSavedCart] = useLocalStorage(storageKey, []);

  const [items, dispatch] = useReducer(cartReducer, savedCart);

  // Gi zacuvuvame promenite vo kosnickata
  useEffect(() => {
    setSavedCart(items);
  }, [items, setSavedCart]);

  const addToCart = useCallback(
    (product) => {
      if (!userId) {
        return false;
      }

      dispatch({ type: "ADD_ITEM", payload: product });

      return true;
    },
    [userId],
  );

  const removeFromCart = useCallback((productId) => {
    dispatch({ type: "REMOVE_ITEM", payload: productId });
  }, []);

  const deleteCartItem = useCallback((productId) => {
    dispatch({ type: "DELETE_ITEM", payload: productId });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: "CLEAR_CART" });
  }, []);

  const value = useMemo(
    () => ({
      items,
      addToCart,
      removeFromCart,
      deleteCartItem,
      clearCart,
    }),
    [items, addToCart, removeFromCart, deleteCartItem, clearCart],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// Glaven Provider
export function CartProvider({ children }) {
  const { user } = useAuth();

  return (
    <UserCartProvider key={user?.id ?? "guest"} userId={user?.id ?? null}>
      {children}
    </UserCartProvider>
  );
}

// Custom hook
export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart mora da se koristi vo CartProvider.");
  }

  return context;
}
