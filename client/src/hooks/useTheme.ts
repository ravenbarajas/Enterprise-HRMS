import { useContext } from 'react';
import { ThemeContext } from '@/context/ThemeContext';

type Theme = 'light' | 'dark';

/**
 * Custom hook for using the theme context
 * @returns ThemeContext values and methods
 */
export const useTheme = () => {
  const context = useContext(ThemeContext);
  
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  
  return {
    theme: context.theme,
    toggleTheme: context.toggleTheme,
    setTheme: context.setTheme
  };
};

export type { Theme };
