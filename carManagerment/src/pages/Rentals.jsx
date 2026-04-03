import { useState, useEffect } from 'react';
import { getRentals, removeFromRentals, clearRentals } from '../services/localStorageService';
import { useLanguage } from '../services/LanguageContext';
import { useToast } from '../services/ToastContext';
import ConfirmModal from '../components/ConfirmModal';

function Rentals({ onNavigateToCars, onNavigateToHome }) {
  const { t } = useLanguage();
  const { showToast } = useToast();

  const [rentalItems, setRentalItems] = useState([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  useEffect(() => { setRentalItems(getRentals()); }, []);

  const handleRemove = (id) => {
    removeFromRentals(id);
    setRentalItems(getRentals());
    showToast(t.rentals_remove_success, 'success');
  };

  const handleClear = () => {
    clearRentals();
    setRentalItems([]);
    setShowConfirmModal(false);
    showToast(t.rentals_clear_success, 'success');
  };

  const handleBook = () => {
    showToast(t.rentals_book_success, 'success');
    setTimeout(() => { clearRentals(); setRentalItems([]); }, 1500);
  };

  const total = rentalItems.reduce((sum, item) => sum + (item.bookingDetails?.totalCost || 0), 0);

  if (rentalItems.length === 0) {
    return (
      <div className="rentals-page">
        <div className="rentals-empty">
          <div className="rentals-empty-icon">🚗</div>
          <h2>{t.rentals_empty_message}</h2>
          <p>{t.rentals_empty_subtitle}</p>
          <div className="rentals-empty-actions">
            <button className="rentals-btn-primary" onClick={onNavigateToCars}>{t.rentals_continue_rental}</button>
            <button className="rentals-btn-ghost"   onClick={onNavigateToHome}>{t.rentals_back_home}</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rentals-page">
      {showConfirmModal && (
        <ConfirmModal
          title={t.rentals_confirm_title}
          message={t.rentals_confirm_message}
          onConfirm={handleClear}
          onCancel={() => setShowConfirmModal(false)}
          confirmText={t.rentals_confirm_delete}
          cancelText={t.rentals_confirm_cancel}
          isDanger
        />
      )}

      <div className="rentals-header">
        <div className="rentals-header-label">MY RENTALS</div>
        <h1>{t.rentals_title}</h1>
        <p>{rentalItems.length} {t.rentals_items}</p>
      </div>

      <div className="rentals-body">
        <div className="rentals-list">
          {rentalItems.map((item) => (
            <div key={item.id} className="rental-item">
              <div className="rental-item-img">
                {item.image
                  ? <img src={item.image} alt={item.name} />
                  : <span className="rental-item-placeholder">🚗</span>
                }
              </div>
              <div className="rental-item-info">
                <h3>{item.name}</h3>
                <p className="rental-item-sub">{item.brand} · {item.year}</p>
                {item.bookingDetails ? (
                  <div className="rental-booking-meta">
                    <span>📅 {item.bookingDetails.pickupDate} → {item.bookingDetails.returnDate}</span>
                    <span className="rental-item-price">${item.bookingDetails.totalCost?.toFixed(2)}</span>
                  </div>
                ) : (
                  <p className="rental-item-price">${item.rentPricePerDay}/day</p>
                )}
              </div>
              <button className="rental-remove-btn" onClick={() => handleRemove(item.id)} title="Remove">
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

        <div className="rentals-summary">
          <div className="rentals-summary-label">SUMMARY</div>
          <div className="rentals-summary-row">
            <span>{t.rentals_total}</span>
            <span className="rentals-total-price">${total.toFixed(2)}</span>
          </div>
          <div className="rentals-actions">
            <button className="rentals-btn-primary" onClick={handleBook}>{t.rentals_book_button}</button>
            <button className="rentals-btn-danger" onClick={() => setShowConfirmModal(true)}>{t.rentals_clear_button}</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Rentals;