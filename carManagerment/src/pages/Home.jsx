import React from 'react';
import { useLanguage } from '../services/LanguageContext';
import { cars } from '../data/cars';
import CarCard from '../components/CarCard';

function Home({ onNavigateToCars, onSelectCar }) {
  const { t } = useLanguage();

  const featuredCars = cars.slice(0, 3);

  const services = [
    {
      title: t.home_service_delivery,
      desc: t.home_service_delivery_desc,
      icon: '🚚',
    },
    {
      title: t.home_service_price,
      desc: t.home_service_price_desc,
      icon: '💰',
    },
    {
      title: t.home_service_support,
      desc: t.home_service_support_desc,
      icon: '🛠️',
    },
  ];

  return (
    <div className="home">

      {/* ===== HERO ===== */}
      <section className="hero">
        <div className="hero-overlay">
          <div className="hero-content">
            <h1>{t.home_hero_title}</h1>
            <p>{t.home_hero_subtitle}</p>

            <button onClick={onNavigateToCars}>
              {t.home_hero_button}
            </button>
          </div>
        </div>
      </section>

      {/* ===== FEATURED CARS ===== */}
      <section className="featured">
        <div className="section-header">
          <h2>{t.home_featured_title}</h2>
          <p>{t.home_featured_subtitle}</p>
        </div>

        <div className="featured-grid">
          {featuredCars.map((car) => (
            <CarCard
              key={car.id}
              car={car}
              onCardClick={onSelectCar}
            />
          ))}
        </div>
      </section>

      {/* ===== SERVICES ===== */}
      <section className="services">
        <div className="section-header">
          <h2>{t.home_services_title}</h2>
        </div>

        <div className="services-grid">
          {services.map((s, index) => (
            <div key={index} className="service-card">
              <div className="service-icon">{s.icon}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="footer">
        <div className="footer-container">

          <div className="footer-col">
            <h3>CarStore</h3>
            <p>Your trusted platform for buying and renting cars.</p>
          </div>

          <div className="footer-col">
            <h4>Navigation</h4>
            <ul>
              <li onClick={onNavigateToCars}>Cars</li>
              <li>Rentals</li>
              <li>Contact</li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Contact</h4>
            <p>Email: support@carstore.com</p>
            <p>Phone: +84 123 456 789</p>
          </div>

        </div>

        <div className="footer-bottom">
          © 2026 CarStore. All rights reserved.
        </div>
      </footer>

    </div>
  );
}

export default Home;