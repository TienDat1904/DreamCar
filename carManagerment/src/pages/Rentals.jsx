import { useState, useEffect } from 'react';
import {
  getRentals,
  removeFromRentals,
  clearRentals,
} from '../services/localStorageService';
import { useLanguage } from '../services/LanguageContext';
import { useToast } from '../services/ToastContext';
import ConfirmModal from '../components/ConfirmModal';

function Rentals({ onNavigateToCars, onNavigateToHome }) {
  const { t } = useLanguage();
  const { showToast } = useToast();

  const [rentalItems, setRentalItems] = useState([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  useEffect(() => {
    setRentalItems(getRentals());
  }, []);

  const handleRemove = (id) => {
    removeFromRentals(id);
    setRentalItems(getRentals());
    showToast(t.rentals_remove_success, 'success');
  };

  const handleClearRentalsConfirm = () => {
    clearRentals();
    setRentalItems([]);
    setShowConfirmModal(false);
    showToast(t.rentals_clear_success, 'success');
  };

  const handleBook = () => {
    showToast(t.rentals_book_success, 'success');

    setTimeout(() => {
      clearRentals();
      setRentalItems([]);
    }, 1500);
  };

  const total = rentalItems.reduce((sum, item) => {
    return sum + (item.bookingDetails?.totalCost || 0);
  }, 0);

  // ===== EMPTY =====
  if (rentalItems.length === 0) {
    return (
      <div className="rentals-container">
        <h1 className="rentals-title">{t.rentals_title}</h1>

        <div className="rentals-empty">
          <h3>{t.rentals_empty_message}</h3>
          <p>{t.rentals_empty_subtitle}</p>

          <div className="rentals-empty-actions">
            <button className="btn btn-primary" onClick={onNavigateToCars}>
              {t.rentals_continue_rental}
            </button>

            <button className="btn btn-secondary" onClick={onNavigateToHome}>
              {t.rentals_back_home}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ===== MAIN =====
  return (
    <>
      {showConfirmModal && (
        <ConfirmModal
          title={t.rentals_confirm_title}
          message={t.rentals_confirm_message}
          onConfirm={handleClearRentalsConfirm}
          onCancel={() => setShowConfirmModal(false)}
          confirmText={t.rentals_confirm_delete}
          cancelText={t.rentals_confirm_cancel}
          isDanger
        />
      )}

      <div className="rentals-container">
        <div className="rentals-header">
          <h1>{t.rentals_title}</h1>
          <p>{rentalItems.length} {t.rentals_items}</p>
        </div>

        <div className="rentals-list">
          {rentalItems.map((item) => (
            <div key={item.id} className="rental-item">
              <div className="rental-info">
                <h3>{item.name}</h3>
                <p>{item.price} / day</p>
              </div>

              <button
                className="rental-remove"
                onClick={() => handleRemove(item.id)}
              >
                {t.rentals_remove_button}
              </button>
            </div>
          ))}
        </div>

        <div className="rentals-total">
          <p>{t.rentals_total}</p>
          <h2>${total.toFixed(2)}</h2>
        </div>

        <div className="rentals-actions">
          <button className="btn btn-primary" onClick={handleBook}>
            {t.rentals_book_button}
          </button>

          <button
            className="btn btn-danger"
            onClick={() => setShowConfirmModal(true)}
          >
            {t.rentals_clear_button}
          </button>
        </div>
      </div>
    </>
  );
}

export default Rentals;