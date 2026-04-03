import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../services/LanguageContext';

const MENU = [
  { key: 'Home',    labelKey: 'nav_home' },
  { key: 'Cars',    labelKey: 'nav_cars' },
  { key: 'Cart',    labelKey: 'nav_cart' },
  { key: 'Rentals', labelKey: 'nav_rentals' },
  { key: 'Contact', labelKey: 'nav_contact' },
];

function Navbar({ currentPage, onNavigate, currentUser }) {
  const { language, switchLanguage, t } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen]     = useState(false);
  const langRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (langRef.current && !langRef.current.contains(e.target)) setLangOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavigate = (page) => {
    onNavigate(page);
    setMobileOpen(false);
  };

  // Lấy 1-2 chữ cái đầu để hiển thị trong avatar
  const getInitials = () => {
    const name = currentUser?.fullName || currentUser?.username || '';
    return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase() || '?';
  };

  return (
    <nav className="navbar">

      {/* LOGO */}
      <div className="navbar-logo" onClick={() => handleNavigate('Home')}>
        DreamCar
      </div>

      {/* DESKTOP MENU */}
      <div className="navbar-links desktop-menu">
        {MENU.map((item) => (
          <div
            key={item.key}
            className={`navbar-link ${currentPage === item.key ? 'active' : ''}`}
            onClick={() => handleNavigate(item.key)}
          >
            {t[item.labelKey]}
          </div>
        ))}
      </div>

      {/* RIGHT */}
      <div className="navbar-right">

        {/* LANGUAGE */}
        <div className="lang-dropdown" ref={langRef}>
          <button className="lang-btn" onClick={() => setLangOpen(prev => !prev)}>
            🌐 {language.toUpperCase()}
          </button>
          {langOpen && (
            <div className="lang-menu">
              <div
                className={`lang-item ${language === 'en' ? 'active' : ''}`}
                onClick={() => { switchLanguage('en'); setLangOpen(false); }}
              >
                {t.lang_english}
              </div>
              <div
                className={`lang-item ${language === 'vi' ? 'active' : ''}`}
                onClick={() => { switchLanguage('vi'); setLangOpen(false); }}
              >
                {t.lang_vietnamese}
              </div>
            </div>
          )}
        </div>

        {/* ✅ Avatar button → Profile page */}
        {currentUser && (
          <button
            className={`navbar-avatar ${currentPage === 'Profile' ? 'active' : ''}`}
            onClick={() => handleNavigate('Profile')}
            title={currentUser.fullName || currentUser.username}
          >
            {getInitials()}
          </button>
        )}

        {/* HAMBURGER */}
        <button className="hamburger-btn" onClick={() => setMobileOpen(prev => !prev)}>
          ☰
        </button>
      </div>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div className="mobile-menu">
          {MENU.map((item) => (
            <div
              key={item.key}
              className={`mobile-item ${currentPage === item.key ? 'active' : ''}`}
              onClick={() => handleNavigate(item.key)}
            >
              {t[item.labelKey]}
            </div>
          ))}

          {/* ✅ Profile link trong mobile menu */}
          {currentUser && (
            <div
              className={`mobile-item ${currentPage === 'Profile' ? 'active' : ''}`}
              onClick={() => handleNavigate('Profile')}
            >
              👤 {currentUser.fullName || currentUser.username}
            </div>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;