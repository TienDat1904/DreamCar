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

  useEffect(() => { setCartItems(getCart()); }, []);

  const formatPrice = (v) => `$${Number(v).toLocaleString()}`;

  const total = useMemo(() =>
    cartItems.reduce((sum, item) => sum + (Number(item.buyPrice) || 0) * (Number(item.quantity) || 1), 0),
  [cartItems]);

  const handleRemove = useCallback((id) => {
    setCartItems(removeFromCart(id));
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
    setTimeout(() => { clearCart(); setCartItems([]); }, 1000);
  }, [showToast, t]);

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <div className="cart-empty">
          <div className="cart-empty-icon">🛒</div>
          <h2>{t.cart_empty_message}</h2>
          <p>{t.cart_empty_subtitle}</p>
          <div className="cart-empty-actions">
            <button className="cart-btn-primary" onClick={onNavigateToCars}>{t.cart_continue_shopping}</button>
            <button className="cart-btn-ghost"   onClick={onNavigateToHome}>{t.cart_back_home}</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
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

      <div className="cart-header">
        <div className="cart-header-label">SHOPPING CART</div>
        <h1>{t.cart_title || 'Giỏ Hàng'}</h1>
        <p>{cartItems.length} {t.cart_items}</p>
      </div>

      <div className="cart-body">
        {/* List */}
        <div className="cart-list">
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <div className="cart-item-img">
                {item.image
                  ? <img src={item.image} alt={item.name} />
                  : <span className="cart-item-placeholder">🚗</span>
                }
              </div>
              <div className="cart-item-info">
                <h3>{item.name}</h3>
                <p className="cart-item-sub">{item.brand} · {item.year}</p>
                <p className="cart-item-price">{formatPrice(item.buyPrice)} × {item.quantity || 1}</p>
              </div>
              <div className="cart-item-total">
                {formatPrice((Number(item.buyPrice) || 0) * (item.quantity || 1))}
              </div>
              <button className="cart-remove-btn" onClick={() => handleRemove(item.id)} title="Remove">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="3 6 5 6 21 6"/>
                  <path d="M19 6l-1 14H6L5 6"/>
                  <path d="M10 11v6M14 11v6"/>
                  <path d="M9 6V4h6v2"/>
                </svg>
              </button>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="cart-summary">
          <div className="cart-summary-label">ORDER SUMMARY</div>
          <div className="cart-summary-row">
            <span>{t.cart_total}</span>
            <span className="cart-total-price">{formatPrice(total)}</span>
          </div>
          <div className="cart-actions">
            <button className="cart-btn-primary" onClick={handleCheckout}>{t.cart_checkout_button}</button>
            <button className="cart-btn-danger"  onClick={() => setShowConfirmModal(true)}>{t.cart_clear_button}</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;