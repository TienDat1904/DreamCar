import { useState, useEffect } from 'react';
import { getCurrentUser, initializeDemoUser } from './services/localStorageService';
import { LanguageProvider } from './services/LanguageContext';
import { SearchProvider } from './services/SearchContext';
import { ToastProvider } from './services/ToastContext';

import Toast from './components/Toast';
import Navbar from './components/Navbar';

import Home from './pages/Home';
import Cars from './pages/Cars';
import Cart from './pages/Cart';
import Rentals from './pages/Rentals';
import Login from './pages/Login';
import Register from './pages/Register';
import CarDetailPage from './pages/CarDetailPage';
import Contact from './pages/Contact';

import './App.css';

// ✅ Centralized pages (clean + dễ maintain)
const PAGES = {
  HOME: 'Home',
  CARS: 'Cars',
  CART: 'Cart',
  RENTALS: 'Rentals',
  DETAIL: 'CarDetail',
  CONTACT: 'Contact',
};

function AppContent() {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(PAGES.HOME);
  const [authPage, setAuthPage] = useState('login');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCar, setSelectedCar] = useState(null);

  // ✅ Init user
  useEffect(() => {
    initializeDemoUser();
    const user = getCurrentUser();
    if (user) setCurrentUser(user);
    setIsLoading(false);
  }, []);

  // ✅ Logout
  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentPage(PAGES.HOME);
    setAuthPage('login');
  };

  // ✅ Select car → detail page
  const handleSelectCar = (car) => {
    setSelectedCar(car);
    setCurrentPage(PAGES.DETAIL);
  };

  // ✅ Render page (core logic)
  const renderPage = () => {
    switch (currentPage) {
      case PAGES.HOME:
        return (
          <Home
            onNavigateToCars={() => setCurrentPage(PAGES.CARS)}
            onSelectCar={handleSelectCar}
          />
        );

      case PAGES.CARS:
        return (
          <Cars onCardClick={handleSelectCar} />
        );

      case PAGES.DETAIL:
        return (
          <CarDetailPage
            car={selectedCar}
            onBack={() => setCurrentPage(PAGES.CARS)}
          />
        );

      case PAGES.CART:
        return (
          <Cart
            onNavigateToCars={() => setCurrentPage(PAGES.CARS)}
            onNavigateToHome={() => setCurrentPage(PAGES.HOME)}
          />
        );

      case PAGES.RENTALS:
        return (
          <Rentals
            onNavigateToCars={() => setCurrentPage(PAGES.CARS)}
            onNavigateToHome={() => setCurrentPage(PAGES.HOME)}
          />
        );

      case PAGES.CONTACT: // ✅ NEW
        return <Contact />;

      default:
        return <Home />;
    }
  };

  // ✅ Loading
  if (isLoading) {
    return <div className="app-loading">Loading...</div>;
  }

  // ✅ Auth
  if (!currentUser) {
    return authPage === 'login' ? (
      <Login
        onLoginSuccess={() => setCurrentUser(getCurrentUser())}
        onSwitchToRegister={() => setAuthPage('register')}
      />
    ) : (
      <Register
        onRegisterSuccess={() => setAuthPage('login')}
        onSwitchToLogin={() => setAuthPage('login')}
      />
    );
  }

  // ✅ Main app
  return (
    <>
      <Navbar
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        currentUser={currentUser}
        onLogout={handleLogout}
      />

      <main className="app-content">
        {renderPage()}
      </main>
    </>
  );
}

// ✅ Providers (giữ nguyên)
function App() {
  return (
    <LanguageProvider>
      <SearchProvider>
        <ToastProvider>
          <Toast />
          <AppContent />
        </ToastProvider>
      </SearchProvider>
    </LanguageProvider>
  );
}

export default App;