import React from 'react';
import { useLanguage } from '../services/LanguageContext';
import { cars } from '../data/cars';
import CarCard from '../components/CarCard';

function Home({ onNavigateToCars, onSelectCar }) {
  const { t } = useLanguage();
  const featuredCars = cars.slice(0, 3);

  return (
    <div style={{ width: '100%' }}>

      {/* ─── HERO ───────────────── */}
      <section
        style={{
          minHeight: '85vh',
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '80px 20px',
        }}
      >
        <div style={{ maxWidth: '900px' }}>
          <h1
            style={{
              fontSize: '56px',
              fontWeight: '800',
              marginBottom: '20px',
              lineHeight: '1.2',
            }}
          >
            {t.home_hero_title}
          </h1>

          <p
            style={{
              fontSize: '20px',
              color: '#cbd5f5',
              marginBottom: '40px',
            }}
          >
            {t.home_hero_subtitle}
          </p>

          <button
            onClick={onNavigateToCars}
            style={{
              padding: '16px 42px',
              borderRadius: '999px',
              border: 'none',
              fontWeight: '700',
              fontSize: '16px',
              cursor: 'pointer',
              background: '#f59e0b',
              color: '#1e293b',
              boxShadow: '0 10px 25px rgba(0,0,0,0.25)',
              transition: 'all 0.3s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            {t.home_hero_button}
          </button>
        </div>
      </section>

      {/* ─── FEATURED CARS ───────────────── */}
      <section
        style={{
          padding: '100px 10%',
          backgroundColor: '#ffffff',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 style={{ fontSize: '36px', fontWeight: '800', color: '#1e293b' }}>
            {t.home_featured_title}
          </h2>
          <p style={{ color: '#64748b', marginTop: '10px' }}>
            {t.home_featured_subtitle}
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '32px',
          }}
        >
          {featuredCars.map((car) => (
            <CarCard
              key={car.id}
              car={car}
              onCardClick={onSelectCar}
            />
          ))}
        </div>
      </section>

      {/* ─── SERVICES ───────────────── */}
      <section
        style={{
          padding: '100px 10%',
          backgroundColor: '#f8fafc',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 style={{ fontSize: '34px', fontWeight: '800', color: '#1e293b' }}>
            {t.home_services_title}
          </h2>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '30px',
          }}
        >
          {[
            { title: t.home_service_delivery, desc: t.home_service_delivery_desc, icon: '🚚' },
            { title: t.home_service_price, desc: t.home_service_price_desc, icon: '💰' },
            { title: t.home_service_support, desc: t.home_service_support_desc, icon: '🛠️' },
          ].map((s, i) => (
            <div
              key={i}
              style={{
                background: 'white',
                padding: '40px 30px',
                borderRadius: '16px',
                textAlign: 'center',
                boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                transition: 'all 0.3s',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div style={{ fontSize: '42px', marginBottom: '15px' }}>
                {s.icon}
              </div>

              <h3 style={{ fontSize: '20px', marginBottom: '10px' }}>
                {s.title}
              </h3>

              <p style={{ color: '#64748b', fontSize: '14px' }}>
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}

export default Home;