import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../services/LanguageContext';
import { useTheme } from '../services/ThemeContext';

const MENU = [
  { key: 'Home',    labelKey: 'nav_home' },
  { key: 'Cars',    labelKey: 'nav_cars' },
  { key: 'Cart',    labelKey: 'nav_cart' },
  { key: 'Rentals', labelKey: 'nav_rentals' },
  { key: 'Contact', labelKey: 'nav_contact' },
];

/* ── Animated sun/moon SVG icons ── */
const SunIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5"/>
    <line x1="12" y1="1"  x2="12" y2="3"/>
    <line x1="12" y1="21" x2="12" y2="23"/>
    <line x1="4.22" y1="4.22"  x2="5.64" y2="5.64"/>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="1" y1="12" x2="3" y2="12"/>
    <line x1="21" y1="12" x2="23" y2="12"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>
);

const MoonIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
);

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';
  const [spinning, setSpinning] = useState(false);

  const handleClick = () => {
    setSpinning(true);
    toggleTheme();
    setTimeout(() => setSpinning(false), 500);
  };

  return (
    <button
      className={`theme-toggle ${isDark ? 'theme-toggle--dark' : 'theme-toggle--light'} ${spinning ? 'theme-toggle--spin' : ''}`}
      onClick={handleClick}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <span className="theme-toggle__track">
        <span className="theme-toggle__thumb">
          <span className="theme-toggle__icon">
            {isDark ? <MoonIcon /> : <SunIcon />}
          </span>
        </span>
      </span>
    </button>
  );
}

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

        {/* THEME TOGGLE */}
        <ThemeToggle />

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

        {/* AVATAR → Profile */}
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