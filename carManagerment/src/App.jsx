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
import './App.css';

const PAGES = {
  HOME: 'Home',
  CARS: 'Cars',
  CART: 'Cart',
  RENTALS: 'Rentals',
  DETAIL: 'CarDetail',
};

function AppContent() {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(PAGES.HOME);
  const [authPage, setAuthPage] = useState('login');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCar, setSelectedCar] = useState(null);

  useEffect(() => {
    initializeDemoUser();
    const user = getCurrentUser();
    if (user) setCurrentUser(user);
    setIsLoading(false);
  }, []);

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentPage(PAGES.HOME);
    setAuthPage('login');
  };

  const handleSelectCar = (car) => {
    setSelectedCar(car);
    setCurrentPage(PAGES.DETAIL);
  };

  const renderPage = () => {
    const pages = {
      [PAGES.HOME]: (
        <Home 
          onNavigateToCars={() => setCurrentPage(PAGES.CARS)} 
          onSelectCar={handleSelectCar}
        />
      ),

      [PAGES.CARS]: (
        <Cars onCardClick={handleSelectCar} />
      ),

      [PAGES.DETAIL]: (
        <CarDetailPage 
          car={selectedCar} 
          onBack={() => setCurrentPage(PAGES.CARS)} 
        />
      ),

      [PAGES.CART]: (
        <Cart 
          onNavigateToCars={() => setCurrentPage(PAGES.CARS)} 
          onNavigateToHome={() => setCurrentPage(PAGES.HOME)} 
        />
      ),

      [PAGES.RENTALS]: (
        <Rentals 
          onNavigateToCars={() => setCurrentPage(PAGES.CARS)} 
          onNavigateToHome={() => setCurrentPage(PAGES.HOME)} 
        />
      ),
    };

    return pages[currentPage] || pages[PAGES.HOME];
  };

  if (isLoading) return <div className="app-loading">Loading...</div>;

  if (!currentUser) {
    return authPage === 'login' 
      ? (
        <Login 
          onLoginSuccess={() => setCurrentUser(getCurrentUser())} 
          onSwitchToRegister={() => setAuthPage('register')} 
        />
      )
      : (
        <Register 
          onRegisterSuccess={() => setAuthPage('login')} 
          onSwitchToLogin={() => setAuthPage('login')} 
        />
      );
  }

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