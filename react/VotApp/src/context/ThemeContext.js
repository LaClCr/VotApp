import React, { createContext, useState } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const customBackgroundColor = !isDarkMode ? "#ede5c8" : null;

    const toggleDarkMode = () => {
        setIsDarkMode((prevMode) => !prevMode);
    };

    return (
        <ThemeContext.Provider
            value={{ isDarkMode, toggleDarkMode, customBackgroundColor }}
        >
            {children}
        </ThemeContext.Provider>
    );
};
