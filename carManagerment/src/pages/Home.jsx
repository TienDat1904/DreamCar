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

  const marqueeItems = [
    t.home_service_delivery,
    t.home_featured_title,
    t.home_service_price,
    t.home_service_support,
    t.home_hero_lookbook,
    // duplicate for seamless loop
    t.home_service_delivery,
    t.home_featured_title,
    t.home_service_price,
    t.home_service_support,
    t.home_hero_lookbook,
  ];

  return (
    <div className="home">

      {/* ===== HERO ===== */}
      <section className="hero">
        <div className="hero-grain" />
        <div className="hero-overlay">
          <div className="hero-content">
            <span className="hero-eyebrow">{t.home_hero_eyebrow}</span>
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
                {t.home_hero_lookbook}
              </button>
            </div>
          </div>
        </div>
        <div className="hero-scroll-hint">
          <span>{t.home_scroll_hint}</span>
          <div className="scroll-line" />
        </div>
      </section>

      {/* ===== MARQUEE STRIP ===== */}
      <div className="marquee-strip">
        <div className="marquee-track">
          {marqueeItems.map((txt, i) => (
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
          <div className="section-label">{t.home_featured_label}</div>
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
            {t.home_view_all}
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
            <div className="section-label light">{t.home_promise_label}</div>
            <h2>{t.home_promise_title}</h2>
            <p>{t.home_promise_desc}</p>
          </div>
          <div className="brand-stats">
            {[
              ['10K+', t.home_stat_customers],
              ['500+', t.home_stat_models],
              ['4.9★', t.home_stat_rating],
            ].map(([num, label]) => (
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
          <div className="section-label">{t.home_why_label}</div>
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
                <path d="M4 24 Q10 10 16 12 Q22 14 28 8" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
                <ellipse cx="16" cy="25" rx="13" ry="3" fill="#f59e0b" opacity="0.15"/>
                <circle cx="9" cy="20" r="3" fill="#f59e0b" opacity="0.5"/>
                <circle cx="20" cy="15" r="4" fill="#f59e0b" opacity="0.35"/>
              </svg>
              DreamCar
            </div>
            <p>{t.home_footer_desc}</p>
            <div className="footer-social">
              {/* Instagram */}
              <span className="social-chip" data-label="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <circle cx="12" cy="12" r="4"/>
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
                </svg>
              </span>
              {/* TikTok */}
              <span className="social-chip" data-label="TikTok">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z"/>
                </svg>
              </span>
              {/* Facebook */}
              <span className="social-chip" data-label="Facebook">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </span>
            </div>
          </div>

          <div className="footer-links">
            <div className="footer-col">
              <h4>{t.home_footer_nav_title}</h4>
              <ul>
                <li onClick={onNavigateToCars}>{t.home_footer_nav_shop}</li>
                <li>{t.home_footer_nav_arrivals}</li>
                <li>{t.home_footer_nav_sale}</li>
                <li>{t.home_footer_nav_catalog}</li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>{t.home_footer_support_title}</h4>
              <ul>
                <li>{t.home_footer_support_guide}</li>
                <li>{t.home_footer_support_return}</li>
                <li>{t.home_footer_support_ship}</li>
                <li>{t.home_footer_support_faq}</li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>{t.home_footer_contact_title}</h4>
              <ul>
                <li>nguyentiendat19042006@gmail.com</li>
                <li>0383 834 006</li>
                <li>TP. Hồ Chí Minh, VN</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 DreamCar. {t.home_footer_rights}</span>
          <span>{t.home_footer_privacy}</span>
        </div>
      </footer>

    </div>
  );
}

export default Home;