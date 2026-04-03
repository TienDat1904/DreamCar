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
    { label: t.detail_engine, value: car.engine, icon: '⚙️' },
    { label: t.detail_seats,  value: car.seats,  icon: '💺' },
    { label: t.detail_fuel,   value: car.fuel,   icon: '⛽' },
    { label: t.detail_year,   value: car.year,   icon: '📅' },
  ];

  if (!car) return null;

  return (
    <div className={`detail-page ${visible ? 'show' : ''}`}>

      {/* Back */}
      <div className="detail-top">
        <button className="detail-back-btn" onClick={onBack}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          {t.detail_back || 'Back'}
        </button>
      </div>

      {/* Grid */}
      <div className="detail-grid">

        {/* Image */}
        <div className="detail-image-wrap">
          <img src={car.image} alt={car.name} className="detail-image" />
          <div className="detail-type-badge">{car.type}</div>
        </div>

        {/* Info */}
        <div className="detail-info">
          <h1 className="detail-name">{car.name}</h1>

          <div className="detail-pricing">
            <div className="detail-buy-price">
              ${car.buyPrice.toLocaleString()}
            </div>
            <div className="detail-rent-price">
              ${car.rentPricePerDay}
              <span>/{t.rental_day_unit || 'day'}</span>
            </div>
          </div>

          {/* Specs */}
          <div className="detail-specs-grid">
            {specs.map((s) => (
              <div key={s.label} className="spec-card">
                <span className="spec-icon">{s.icon}</span>
                <div>
                  <div className="spec-label">{s.label}</div>
                  <div className="spec-value">{s.value}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Description */}
          <div className="detail-desc">
            <div className="detail-desc-label">{t.detail_description}</div>
            <p>{car.description}</p>
          </div>

          {/* Actions */}
          <div className="detail-actions">
            <button className="detail-btn-primary" onClick={handleBuyClick}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
              {t.detail_choose_buy}
            </button>
            <button className="detail-btn-secondary" onClick={() => setShowRentalBooking(true)}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
              {t.detail_choose_rent}
            </button>
          </div>
        </div>
      </div>

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