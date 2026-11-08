
import { useCart } from "../context/CartContext.jsx";
import { useLanguage } from "../context/LanguageContext.jsx";

function Cart() {
  const {
    items,
    clearCart,
    removeFromCart,
    addToCart,
    deleteCartItem,
  } = useCart();
  const { t } = useLanguage();

  const formatPrice = (price) => Number(price).toFixed(2);

  const totalItems = items.reduce(
    (sum, item) => sum + item.quantity,
    0,
  );

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <div>
      <h2>{t("cart.title", { count: totalItems })}</h2>

      {items.length === 0 && <p>{t("cart.empty")}</p>}

      <ul className="cart-list">
        {items.map((item) => (
          <li key={item.id} className="cart-item">
            <div className="cart-item-info">
              <strong>{item.title}</strong>
              <span>${formatPrice(item.price)}</span>
            </div>

            <div className="quantity-controls">
              <button
                type="button"
                onClick={() => removeFromCart(item.id)}
              >
                −
              </button>

              <span>{item.quantity}</span>

              <button
                type="button"
                onClick={() => addToCart(item)}
              >
                +
              </button>
            </div>

            <strong>
              ${formatPrice(item.price * item.quantity)}
            </strong>

            <button
              type="button"
              className="remove-item-button"
              onClick={() => deleteCartItem(item.id)}
              aria-label={t("cart.removeAria", { title: item.title })}
            >
              ✕
            </button>
          </li>
        ))}
      </ul>

      <div className="cart-total">
        <span>{t("cart.total")}</span>
        <strong>${formatPrice(total)}</strong>
      </div>

      {items.length > 0 && (
        <button
          type="button"
          className="clear-cart-button"
          onClick={() => {
            if (window.confirm(t("cart.clearConfirm"))) {
              clearCart();
            }
          }}
        >
          {t("cart.clear")}
        </button>
      )}
    </div>
  );
}

export default Cart;
