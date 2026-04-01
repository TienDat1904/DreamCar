import { useState, useMemo, useCallback } from 'react';
import { useLanguage } from '../services/LanguageContext';
import { useToast } from '../services/ToastContext';
import { addToRentals } from '../services/localStorageService';
import { calculateRentalDays, calculateTotalCost } from '../utils/rentalUtils';

function RentalBooking({ car, onClose, onBookingComplete }) {
  const { t } = useLanguage();
  const { showToast } = useToast();

  const [pickupDate, setPickupDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // ✅ derived state
  const rentalDays = useMemo(() => {
    return calculateRentalDays(pickupDate, returnDate);
  }, [pickupDate, returnDate]);

  const totalCost = useMemo(() => {
    if (!rentalDays) return 0;
    return calculateTotalCost(car.rentPricePerDay, rentalDays);
  }, [car.rentPricePerDay, rentalDays]);

  // ✅ validation
  const validate = useCallback(() => {
    if (!pickupDate || !returnDate) {
      return t.rental_error_missing_dates;
    }

    if (rentalDays <= 0) {
      return t.rental_error_date;
    }

    return '';
  }, [pickupDate, returnDate, rentalDays, t]);

  const handleBooking = useCallback(() => {
    const err = validate();
    if (err) {
      setError(err);
      return;
    }

    setError('');
    setIsLoading(true);

    setTimeout(() => {
      const bookingDetails = {
        pickupDate,
        returnDate,
        rentalDays,
        totalCost,
        bookingDate: new Date().toISOString(),
      };

      const rental = addToRentals({
        ...car,
        bookingDetails,
      });

      showToast(t.rental_success_message, 'success');
      setIsLoading(false);

      onBookingComplete?.(rental);
      onClose();
    }, 800);
  }, [validate, car, pickupDate, returnDate, rentalDays, totalCost, showToast, t, onClose, onBookingComplete]);

  if (!car) return null;

  const today = new Date().toISOString().split('T')[0];
  return (
    <div className="rental-overlay" onClick={onClose}>
      <div className="rental-modal" onClick={(e) => e.stopPropagation()}>

        <div className="rental-header">
          <h2>{t.rental_booking_title}</h2>
          <button onClick={onClose}>✕</button>
        </div>

        <div className="rental-content">

          <div className="rental-car">
            <h3>{car.name}</h3>
            <p>{car.type} • {car.engine}</p>
          </div>

          {error && <div className="rental-error">{error}</div>}

          <input
            type="date"
            value={pickupDate}
            min={today}
            onChange={(e) => setPickupDate(e.target.value)}
          />

          <input
            type="date"
            value={returnDate}
            min={pickupDate || today}
            onChange={(e) => setReturnDate(e.target.value)}
          />

          {rentalDays > 0 && !error && (
            <div className="rental-summary">
              <p>{t.rental_days}: {rentalDays}</p>
              <p>
                {t.rental_price_per_day}: ${car.rentPricePerDay}
              </p>

              <p>
                {t.rental_total_cost}: ${totalCost.toLocaleString()}
              </p>
            </div>
          )}

          <div className="rental-actions">
            <button
              className="rental-confirm"
              onClick={handleBooking}
              disabled={isLoading || rentalDays === 0}
            >
              {isLoading ? '...' : t.rental_confirm_button}
            </button>

            <button
              className="rental-cancel"
              onClick={onClose}
            >
              {t.rental_cancel_button}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default RentalBooking;