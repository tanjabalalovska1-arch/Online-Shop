import { useEffect, useState } from "react";
import { searchProducts } from "../api/products";

function useProducts(query) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query.trim()) {
      setProducts([]);
      setLoading(false);
      setError(null);
      return;
    }

    const controller = new AbortController();

    setLoading(true);
    setError(null);

    searchProducts(query, controller.signal)
      .then((data) => {
        if (!controller.signal.aborted) {
          setProducts(data);
        }
      })
      .catch((err) => {
        if (!controller.signal.aborted) {
          setError(err.message);
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      });

    return () => {
      controller.abort();
    };
  }, [query]);

  return { products, loading, error };
}

export default useProducts;
