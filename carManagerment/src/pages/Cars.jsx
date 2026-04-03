import { useState } from 'react';
import { cars } from '../data/cars';
import CarCard from '../components/CarCard';
import FilterBar from '../components/FilterBar';
import { useLanguage } from '../services/LanguageContext';

function Cars({ onCardClick }) {
  const { t } = useLanguage();
  const [filteredCars, setFilteredCars] = useState(cars);

  return (
    <div className="cars-page">
      <div className="cars-header">
        <div className="cars-header-label">SHOWROOM</div>
        <h1>{t.cars_title}</h1>
        <p>{t.cars_subtitle}</p>
      </div>

      <div className="cars-filter">
        <FilterBar cars={cars} onFilterChange={setFilteredCars} />
      </div>

      <div className="cars-count">
        <span>{filteredCars.length}</span> {t.filter_results}
      </div>

      {filteredCars.length > 0 ? (
        <div className="cars-grid">
          {filteredCars.map((car, i) => (
            <div key={car.id} className="car-card-wrapper" style={{ '--i': i }}>
              <CarCard car={car} onCardClick={() => onCardClick(car)} />
            </div>
          ))}
        </div>
      ) : (
        <div className="cars-empty">
          <div className="cars-empty-icon">🔍</div>
          <h3>{t.filter_no_results}</h3>
          <p>{t.cars_try_adjust || 'Try adjusting your filters'}</p>
        </div>
      )}
    </div>
  );
}

export default Cars;