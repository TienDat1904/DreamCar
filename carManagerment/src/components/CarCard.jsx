import React from 'react';
import { useLanguage } from '../services/LanguageContext';

function CarCard({ car, onCardClick }) {
  const { t } = useLanguage();

  return (
    <div
      className="car-card"
      onClick={() => onCardClick && onCardClick(car)}
    >
      {/* IMAGE */}
      <div className="car-card__image">
        <img src={car.image} alt={car.name} />

        {/* Overlay CTA */}
        <div className="car-card__overlay">
          <span>{t.detail_view || 'View Details'}</span>
        </div>
      </div>

      {/* CONTENT */}
      <div className="car-card__content">
        <span className="car-card__type">{car.type}</span>

        <h3 className="car-card__name">{car.name}</h3>

        <div className="car-card__price">${car.buyPrice.toLocaleString()}</div>

        <div className="car-card__meta">
          <span>{car.engine}</span>
          <span>{car.fuel}</span>
        </div>
      </div>
    </div>
  );
}

export default CarCard;