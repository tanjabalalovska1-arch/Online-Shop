import { createContext, useContext, useState } from "react";

// Kreirame Context za temata
const ThemeContext = createContext(null);

// Provider ja pravi temata dostapna do komponentite
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");

  function toggleTheme() {
    setTheme((prevTheme) =>
      prevTheme === "light" ? "dark" : "light",
    );
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook za pristap do temata
export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme mora da se koristi vo ThemeProvider.");
  }

  return context;
}