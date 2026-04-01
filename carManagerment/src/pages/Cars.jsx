import { useState } from 'react';
import { cars } from '../data/cars';
import CarCard from '../components/CarCard';
import FilterBar from '../components/FilterBar';
import { useLanguage } from '../services/LanguageContext';

function Cars({ onCardClick }) {
  const { t } = useLanguage();

  // chỉ cần 1 state
  const [filteredCars, setFilteredCars] = useState(cars);

  return (
    <div className="cars-page">
      {/* HEADER */}
      <div className="cars-header">
        <h1>{t.cars_title}</h1>
        <p>{t.cars_subtitle}</p>
      </div>

      {/* FILTER */}
      <div className="cars-filter">
        <FilterBar cars={cars} onFilterChange={setFilteredCars} />
      </div>

      {/* RESULT COUNT */}
      <div className="cars-count">
        {filteredCars.length} {t.filter_results}
      </div>

      {/* GRID */}
      {filteredCars.length > 0 ? (
        <div className="cars-grid">
          {filteredCars.map((car) => (
            <CarCard
              key={car.id}
              car={car}
              onCardClick={() => onCardClick(car)}
            />
          ))}
        </div>
      ) : (
        <div className="cars-empty">
          <h3>{t.filter_no_results}</h3>
          <p>{t.filter_search_placeholder || 'Try adjusting your filters'}</p>
        </div>
      )}
    </div>
  );
}

export default Cars;