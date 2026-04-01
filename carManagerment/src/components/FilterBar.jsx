import { useState, useEffect, useMemo, useCallback } from 'react';
import { useLanguage } from '../services/LanguageContext';

function FilterBar({ cars, onFilterChange }) {
  const { t } = useLanguage();

  // ===== State =====
  const [filters, setFilters] = useState({
    search: '',
    brand: '',
    price: '',
    sort: 'default',
  });

  // ===== Derived data =====
  const brands = useMemo(() => {
    return [...new Set(cars.map((c) => c.brand))].sort();
  }, [cars]);

  const priceRanges = useMemo(() => {
    return [
      { id: 'low', label: t.filter_price_low, min: 0, max: 20000 },
      { id: 'mid', label: t.filter_price_mid, min: 20000, max: 40000 },
      { id: 'high', label: t.filter_price_high, min: 40000, max: 50000 },
      { id: 'premium', label: t.filter_price_premium, min: 50000, max: Infinity },
    ];
  }, [t]);

  const sortOptions = useMemo(() => {
    return [
      { id: 'default', label: t.filter_sort_default },
      { id: 'price_asc', label: t.filter_sort_price_asc },
      { id: 'price_desc', label: t.filter_sort_price_desc },
      { id: 'year_newest', label: t.filter_sort_year_newest },
      { id: 'name_asc', label: t.filter_sort_name_asc },
    ];
  }, [t]);

  // ===== Filter + Sort logic =====
  const applyFilters = useCallback(() => {
    let result = [...cars];

    // search
    if (filters.search.trim()) {
      result = result.filter((c) =>
        c.name.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    // brand
    if (filters.brand) {
      result = result.filter((c) => c.brand === filters.brand);
    }

    // price
    if (filters.price) {
      const range = priceRanges.find((r) => r.id === filters.price);
      if (range) {
        result = result.filter(
          (c) => c.buyPrice >= range.min && c.buyPrice <= range.max
        );
      }
    }

    // sort
    switch (filters.sort) {
      case 'price_asc':
        result.sort((a, b) => a.buyPrice - b.buyPrice);
        break;
      case 'price_desc':
        result.sort((a, b) => b.buyPrice - a.buyPrice);
        break;
      case 'year_newest':
        result.sort((a, b) => b.year - a.year);
        break;
      case 'name_asc':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }

    return result;
  }, [filters, cars, priceRanges]);

  useEffect(() => {
    onFilterChange(applyFilters());
  }, [applyFilters, onFilterChange]);

  // ===== Handlers =====
  const updateFilter = (key) => (e) => {
    const value = e.target.value;
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters({
      search: '',
      brand: '',
      price: '',
      sort: 'default',
    });
  };

  const hasActiveFilters =
    filters.search ||
    filters.brand ||
    filters.price ||
    filters.sort !== 'default';

  // ===== UI =====
  return (
    <div className="filter-bar">
      <h3 className="filter-title">🔍 {t.cars_title || 'Filters'}</h3>

      <div className="filter-grid">
        {/* Search */}
        <input
          className="filter-input"
          placeholder={t.filter_search_placeholder}
          value={filters.search}
          onChange={updateFilter('search')}
        />

        {/* Brand */}
        <select
          className="filter-select"
          value={filters.brand}
          onChange={updateFilter('brand')}
        >
          <option value="">{t.filter_brand_all}</option>
          {brands.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>

        {/* Price */}
        <select
          className="filter-select"
          value={filters.price}
          onChange={updateFilter('price')}
        >
          <option value="">{t.filter_price_all}</option>
          {priceRanges.map((r) => (
            <option key={r.id} value={r.id}>
              {r.label}
            </option>
          ))}
        </select>

        {/* Sort */}
        <select
          className="filter-select"
          value={filters.sort}
          onChange={updateFilter('sort')}
        >
          {sortOptions.map((s) => (
            <option key={s.id} value={s.id}>
              {s.label}
            </option>
          ))}
        </select>
      </div>

      {/* Reset */}
      {hasActiveFilters && (
        <div className="filter-actions">
          <button className="reset-btn" onClick={resetFilters}>
            ✕ {t.filter_brand_all || 'Reset'}
          </button>
        </div>
      )}
    </div>
  );
}

export default FilterBar;