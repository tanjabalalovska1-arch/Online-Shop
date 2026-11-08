import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  DEFAULT_LANGUAGE,
  SUPPORTED_LANGUAGES,
  getCategoryTranslation,
  getTranslation,
} from "../translations/translations.js";

export const LANGUAGE_STORAGE_KEY = "olive-language";

const LanguageContext = createContext(null);

function getInitialLanguage() {
  try {
    const savedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY);

    if (SUPPORTED_LANGUAGES.includes(savedLanguage)) {
      return savedLanguage;
    }
  } catch (error) {
    console.error("Could not read the saved language:", error);
  }

  return DEFAULT_LANGUAGE;
}

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(getInitialLanguage);

  useEffect(() => {
    try {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    } catch (error) {
      console.error("Could not save the selected language:", error);
    }

    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = useCallback((nextLanguage) => {
    if (SUPPORTED_LANGUAGES.includes(nextLanguage)) {
      setLanguageState(nextLanguage);
    }
  }, []);

  const toggleLanguage = useCallback(() => {
    setLanguageState((currentLanguage) =>
      currentLanguage === "en" ? "mk" : "en",
    );
  }, []);

  const t = useCallback(
    (key, variables) => getTranslation(language, key, variables),
    [language],
  );

  const tCategory = useCallback(
    (slug, fallbackName) =>
      getCategoryTranslation(language, slug, fallbackName),
    [language],
  );

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      toggleLanguage,
      t,
      tCategory,
    }),
    [language, setLanguage, toggleLanguage, t, tCategory],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider.");
  }

  return context;
}
