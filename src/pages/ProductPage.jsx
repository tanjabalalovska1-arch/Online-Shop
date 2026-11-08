import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import ProductDetails from "../ProductDetails/ProductDetails";
import Breadcrumbs from "../components/Breadcrumbs";
import { useCart } from "../context/CartContext.jsx";
import { useLanguage } from "../context/LanguageContext.jsx";
import { getProductById } from "../api/products";

function ProductPage() {
  const { addToCart } = useCart();
  const { t } = useLanguage();
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true);
        setProduct(null);

        const data = await getProductById(id);

        if (!data.id) {
          throw new Error("Product not found");
        }

        setProduct(data);
      } catch (error) {
        console.error(error.message);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <p role="status" aria-live="polite">
        {t("product.loading")}
      </p>
    );
  }

  if (!product) {
    return <p role="alert">{t("product.notFound")}</p>;
  }

  return (
    <>
      <Breadcrumbs productName={product.title} />

      

      <ProductDetails
        product={product}
        onBack={() =>
          navigate(location.state?.from || "/", {
            state: { scrollY: location.state?.scrollY },
          })
        }
        onAddToCart={addToCart}
      />
    </>
  );
}

export default ProductPage;
