import {
  createContext,
  useContext,
  useReducer,
  useCallback,
  useRef,
  useEffect,
} from "react";

import { getProducts } from "../api/products";
import { getCategoryTranslation } from "../translations/translations.js";

const SearchContext = createContext(null);

const initialState = {
  products: [],
  query: "",
  loading: false,
  error: null,
};

// Gi pretvorame zborovite vo mala bukva
function normalizeText(value) {
  return String(value || "")
    .toLowerCase()
    .trim();
}

// Proveruvame dali proizvodot odgovara na baranjeto
function matchesSearch(product, query) {
  const searchFields = [
    product.title,
    product.description,
    product.brand,
    product.category,
    product.category?.replaceAll("-", " "),
    getCategoryTranslation("en", product.category),
    getCategoryTranslation("mk", product.category),
  ];

  return searchFields.some((field) =>
    normalizeText(field).includes(normalizeText(query)),
  );
}

function searchReducer(state, action) {
  switch (action.type) {
    case "SEARCH_START":
      return {
        ...state,
        query: action.payload,
        loading: true,
        error: null,
      };

    case "SEARCH_SUCCESS":
      return {
        ...state,
        products: action.payload,
        loading: false,
        error: null,
      };

    case "SEARCH_ERROR":
      return {
        ...state,
        products: [],
        loading: false,
        error: action.payload,
      };

    case "CLEAR_SEARCH":
      return initialState;

    default:
      return state;
  }
}

export function SearchProvider({ children }) {
  const [state, dispatch] = useReducer(searchReducer, initialState);

  const abortControllerRef = useRef(null);

  const search = useCallback(async (query) => {
    const trimmedQuery = query.trim();

    // Go otkazuvame prethodnoto prebaruvanje
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    if (!trimmedQuery) {
      abortControllerRef.current = null;
      dispatch({ type: "CLEAR_SEARCH" });
      return;
    }

    // Kreirame kontroler za novoto prebaruvanje
    const controller = new AbortController();
    abortControllerRef.current = controller;

    dispatch({
      type: "SEARCH_START",
      payload: trimmedQuery,
    });

    try {
      // Gi prezemame site proizvodi
      const allProducts = await getProducts(0, controller.signal);

      // Ne prodolzuvame ako baranjeto e otkazano
      if (controller.signal.aborted) return;

      // Lokalno gi filtrirame proizvodite
      const filteredProducts = allProducts.filter((product) =>
        matchesSearch(product, trimmedQuery),
      );

      dispatch({
        type: "SEARCH_SUCCESS",
        payload: filteredProducts,
      });
    } catch (error) {
      // Otkazuvanjeto ne e vistinska greska
      if (controller.signal.aborted) return;

      dispatch({
        type: "SEARCH_ERROR",
        payload: error.message || "Search failed",
      });
    }
  }, []);

  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  const clearSearch = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }

    dispatch({ type: "CLEAR_SEARCH" });
  }, []);

  return (
    <SearchContext.Provider
      value={{
        ...state,
        search,
        clearSearch,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);

  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider.");
  }

  return context;
}
