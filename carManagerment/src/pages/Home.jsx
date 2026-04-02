import React from 'react';
import { useLanguage } from '../services/LanguageContext';
import { cars } from '../data/cars';
import CarCard from '../components/CarCard';

function Home({ onNavigateToCars, onSelectCar }) {
  const { t } = useLanguage();

  const featuredCars = cars.slice(0, 3);

  const services = [
    { title: t.home_service_delivery, desc: t.home_service_delivery_desc, icon: '🚚' },
    { title: t.home_service_price,    desc: t.home_service_price_desc,    icon: '💰' },
    { title: t.home_service_support,  desc: t.home_service_support_desc,  icon: '🛠️' },
  ];

  return (
    <div className="home">

      {/* ===== HERO ===== */}
      <section className="hero">
        {/* Decorative grain overlay */}
        <div className="hero-grain" />
        <div className="hero-overlay">
          <div className="hero-content">
            <span className="hero-eyebrow">New Collection 2026</span>
            <h1>{t.home_hero_title}</h1>
            <p>{t.home_hero_subtitle}</p>
            <div className="hero-actions">
              <button className="btn-primary" onClick={onNavigateToCars}>
                {t.home_hero_button}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M5 12h14M13 6l6 6-6 6"/>
                </svg>
              </button>
              <button className="btn-ghost" onClick={onNavigateToCars}>
                View Lookbook
              </button>
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="hero-scroll-hint">
          <span>Scroll</span>
          <div className="scroll-line" />
        </div>
      </section>

      {/* ===== MARQUEE STRIP ===== */}
      <div className="marquee-strip">
        <div className="marquee-track">
          {['Free Shipping', 'New Arrivals', 'Premium Quality', 'Exclusive Designs', 'Easy Returns',
            'Free Shipping', 'New Arrivals', 'Premium Quality', 'Exclusive Designs', 'Easy Returns'].map((txt, i) => (
            <span key={i} className="marquee-item">
              <svg width="6" height="6" viewBox="0 0 6 6"><circle cx="3" cy="3" r="3" fill="currentColor"/></svg>
              {txt}
            </span>
          ))}
        </div>
      </div>

      {/* ===== FEATURED ===== */}
      <section className="featured">
        <div className="section-header">
          <div className="section-label">CURATED FOR YOU</div>
          <h2>{t.home_featured_title}</h2>
          <p>{t.home_featured_subtitle}</p>
        </div>

        <div className="featured-grid">
          {featuredCars.map((car, i) => (
            <div key={car.id} className="card-wrapper" style={{ '--delay': `${i * 0.1}s` }}>
              <CarCard car={car} onCardClick={onSelectCar} />
            </div>
          ))}
        </div>

        <div className="featured-cta">
          <button className="btn-outline" onClick={onNavigateToCars}>
            View All Products
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M13 6l6 6-6 6"/>
            </svg>
          </button>
        </div>
      </section>

      {/* ===== BRAND BANNER ===== */}
      <section className="brand-banner">
        <div className="brand-banner-inner">
          <div className="brand-text">
            <div className="section-label light">OUR PROMISE</div>
            <h2>Crafted for those who move with purpose.</h2>
            <p>Every sole tells a story. Every stitch, intentional. We don't just make shoes — we design confidence.</p>
          </div>
          <div className="brand-stats">
            {[['10K+', 'Happy Customers'], ['500+', 'Shoe Styles'], ['4.9★', 'Average Rating']].map(([num, label]) => (
              <div key={label} className="stat-block">
                <span className="stat-num">{num}</span>
                <span className="stat-label">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SERVICES ===== */}
      <section className="services">
        <div className="section-header">
          <div className="section-label">WHY CHOOSE US</div>
          <h2>{t.home_services_title}</h2>
        </div>

        <div className="services-grid">
          {services.map((s, i) => (
            <div key={i} className="service-card" style={{ '--delay': `${i * 0.12}s` }}>
              <div className="service-icon-wrap">
                <span className="service-icon">{s.icon}</span>
              </div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="footer">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="footer-logo">
              <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
                <path d="M4 22 C8 10, 24 10, 28 22" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
                <ellipse cx="16" cy="23" rx="13" ry="3.5" fill="#f59e0b" opacity="0.2"/>
                <circle cx="16" cy="13" r="5" fill="#f59e0b" opacity="0.6"/>
              </svg>
              CarStore
            </div>
            <p>A reputable platform for buying, selling, and renting cars. Experience the best service for you.</p>
            <div className="footer-social">
              {['Instagram', 'TikTok', 'Facebook'].map(s => (
                <span key={s} className="social-chip">{s}</span>
              ))}
            </div>
          </div>

          <div className="footer-links">
            <div className="footer-col">
              <h4>Navigate</h4>
              <ul>
                <li onClick={onNavigateToCars}>Shop</li>
                <li>New Arrivals</li>
                <li>Sale</li>
                <li>Lookbook</li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Support</h4>
              <ul>
                <li>Sizing Guide</li>
                <li>Returns</li>
                <li>Shipping</li>
                <li>FAQ</li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Contact</h4>
              <ul>
                <li>nguyentiendat19042006@gmail.com</li>
                <li>0383834006</li>
                <li>Ho Chi Minh City, VN</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 CarStore. All rights reserved.</span>
          <span>Privacy · Terms · Cookies</span>
        </div>
      </footer>

    </div>
  );
}

export default Home;