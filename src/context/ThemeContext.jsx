
import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

// Create a Context to share the selected theme across the application
const ThemeContext = createContext(null);

// ThemeProvider manages the theme and makes it available to all child components
export function ThemeProvider({ children }) {
  // Get the saved theme from localStorage
  // If there is no saved theme, use "light"
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  // Switch between light mode and dark mode
  function toggleTheme() {
    setTheme((prevTheme) =>
      prevTheme === "light" ? "dark" : "light",
    );
  }

  // Save the selected theme and update the body's data-theme attribute
  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  // Share the theme and toggle function with all components inside the provider
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook that allows components to access the theme context
export function useTheme() {
  const context = useContext(ThemeContext);

  // Prevent using the hook outside ThemeProvider
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider.");
  }

  return context;
}
