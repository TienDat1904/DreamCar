import React, { createContext, useState, useEffect } from 'react';
import { translations } from '../data/translations';

export const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    // Get language from localStorage or default to 'en'
    const savedLanguage = localStorage.getItem('appLanguage');
    return savedLanguage || 'en';
  });

  // Update localStorage whenever language changes
  useEffect(() => {
    localStorage.setItem('appLanguage', language);
  }, [language]);

  // Get current translation object
  const t = translations[language] || translations.en;

  // Switch language function
  const switchLanguage = (lang) => {
    if (translations[lang]) {
      setLanguage(lang);
    }
  };

  const value = {
    language,
    switchLanguage,
    t,
    availableLanguages: ['en', 'vi'],
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

// Custom hook for using language context
export function useLanguage() {
  const context = React.useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}
