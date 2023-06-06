import { createContext, useState, useContext } from "react";

const ThemeContext = createContext();
const ThemeUpdateContext = createContext();

export const useTheme = () => useContext(ThemeContext);
export const useThemeUpdate = () => useContext(ThemeUpdateContext);

export default function ThemeProvider({ children }) {
  let [isDarkMode, setDarkMode] = useState(false);

  let toggleTheme = () => {
    setDarkMode(!isDarkMode);
  };

  return (
    <ThemeContext.Provider value={isDarkMode}>
      <ThemeUpdateContext.Provider value={toggleTheme}>
        {children}
      </ThemeUpdateContext.Provider>
    </ThemeContext.Provider>
  );
}
