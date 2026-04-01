import { useState, useEffect, useCallback } from 'react';
import { useLanguage } from '../services/LanguageContext';
import { useToast } from '../services/ToastContext';
import { addToCart } from '../services/localStorageService';
import RentalBooking from '../components/RentalBooking';

function CarDetailPage({ car, onBack }) {
  const { t } = useLanguage();
  const { showToast } = useToast();

  const [showRentalBooking, setShowRentalBooking] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => setVisible(true), 50);
  }, []);

  const handleBuyClick = useCallback(() => {
    addToCart(car);
    showToast(`${car.name} ${t.cars_add_to_cart}`, 'success');
  }, [car, showToast, t]);

  const specs = [
    { label: t.detail_engine, value: car.engine },
    { label: t.detail_seats, value: car.seats },
    { label: t.detail_fuel, value: car.fuel },
    { label: t.detail_year, value: car.year },
  ];

  if (!car) return null;

  return (
    <div className={`detail-page ${visible ? 'show' : ''}`}>
      
      {/* BACK */}
      <div className="detail-top">
        <button className="back-btn" onClick={onBack}>
          ← {t.detail_back || 'Back'}
        </button>
      </div>

      {/* MAIN */}
      <div className="detail-grid">

        {/* IMAGE */}
        <div className="detail-image">
          <img src={car.image} alt={car.name} />
        </div>

        {/* INFO */}
        <div className="detail-info">

          <span className="detail-type">{car.type}</span>

          <h1 className="detail-name">{car.name}</h1>

          <div className="detail-price">
            ${car.buyPrice.toLocaleString()}
          </div>

          <div className="detail-rent">
            ${car.rentPricePerDay}/day
          </div>

          {/* SPECS */}
          <div className="detail-specs">
            {specs.map((s) => (
              <div key={s.label} className="spec-item">
                <span>{s.label} </span>
                <strong>{s.value}</strong>
              </div>
            ))}
          </div>

          {/* DESC */}
          <div className="detail-desc">
            <h3>{t.detail_description}</h3>
            <p>{car.description}</p>
          </div>

          {/* ACTION */}
          <div className="detail-actions">
            <button className="btn btn-primary" onClick={handleBuyClick}>
              {t.detail_choose_buy}
            </button>

            <button
              className="btn btn-secondary"
              onClick={() => setShowRentalBooking(true)}
            >
              {t.detail_choose_rent}
            </button>
          </div>
        </div>
      </div>

      {/* MODAL */}
      {showRentalBooking && (
        <RentalBooking
          car={car}
          onClose={() => setShowRentalBooking(false)}
          onBookingComplete={() => setShowRentalBooking(false)}
        />
      )}
    </div>
  );
}

export default CarDetailPage;