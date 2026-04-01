import { useState, useEffect, useMemo, useCallback } from 'react';
import { getCart, removeFromCart, clearCart } from '../services/localStorageService';
import { useLanguage } from '../services/LanguageContext';
import { useToast } from '../services/ToastContext';
import ConfirmModal from '../components/ConfirmModal';

function Cart({ onNavigateToCars, onNavigateToHome }) {
  const { t } = useLanguage();
  const { showToast } = useToast();

  const [cartItems, setCartItems] = useState([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // ================= LOAD =================
  useEffect(() => {
    setCartItems(getCart());
  }, []);

  // ================= HELPERS =================
  const formatPrice = (value) => {
    return `$${value.toLocaleString()}`;
  };

  const total = useMemo(() => {
    return cartItems.reduce((sum, item) => {
      const price = Number(item.buyPrice) || 0;
      const qty = Number(item.quantity) || 1;
      return sum + price * qty;
    }, 0);
  }, [cartItems]);

  // ================= ACTIONS =================
  const handleRemove = useCallback((id) => {
    const updated = removeFromCart(id);
    setCartItems(updated);
    showToast(t.cart_remove_success, 'success');
  }, [showToast, t]);

  const handleClear = useCallback(() => {
    clearCart();
    setCartItems([]);
    setShowConfirmModal(false);
    showToast(t.cart_clear_success, 'success');
  }, [showToast, t]);

  const handleCheckout = useCallback(() => {
    showToast(t.cart_checkout_success, 'success');

    setTimeout(() => {
      clearCart();
      setCartItems([]);
    }, 1000);
  }, [showToast, t]);

  // ================= EMPTY =================
  if (cartItems.length === 0) {
    return (
      <div className="cart">
        <h1 className="cart-title">{t.cart_title}</h1>

        <div className="cart-empty">
          <h3>{t.cart_empty_message}</h3>
          <p>{t.cart_empty_subtitle}</p>

          <div className="cart-empty-actions">
            <button className="btn-primary" onClick={onNavigateToCars}>
              {t.cart_continue_shopping}
            </button>

            <button className="btn-secondary" onClick={onNavigateToHome}>
              {t.cart_back_home}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ================= MAIN =================
  return (
    <div className="cart">

      {showConfirmModal && (
        <ConfirmModal
          title={t.cart_confirm_title}
          message={t.cart_confirm_message}
          onConfirm={handleClear}
          onCancel={() => setShowConfirmModal(false)}
          confirmText={t.cart_confirm_delete}
          cancelText={t.cart_confirm_cancel}
          isDanger
        />
      )}

      {/* Header */}
      <div className="cart-header">
        <h1>{t.cart_title}</h1>
        <p>{cartItems.length} {t.cart_items}</p>
      </div>

      {/* List */}
      <div className="cart-list">
        {cartItems.map((item) => (
          <div key={item.id} className="cart-item">

            <div className="cart-item-info">
              <h3>{item.name}</h3>
              <p className="cart-item-price">
                {formatPrice(item.buyPrice)} × {item.quantity || 1}
              </p>
            </div>

            <button
              className="cart-remove"
              onClick={() => handleRemove(item.id)}
            >
              {t.cart_remove_button}
            </button>
          </div>
        ))}
      </div>

      {/* Total */}
      <div className="cart-summary">
        <div className="cart-summary-row">
          <span>{t.cart_total}</span>
          <span className="cart-total-price">{formatPrice(total)}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="cart-actions">
        <button className="btn-success" onClick={handleCheckout}>
          {t.cart_checkout_button}
        </button>

        <button className="btn-danger" onClick={() => setShowConfirmModal(true)}>
          {t.cart_clear_button}
        </button>
      </div>

    </div>
  );
}

export default Cart;