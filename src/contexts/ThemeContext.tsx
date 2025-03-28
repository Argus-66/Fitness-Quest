"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { themes } from '@/config/themes';
import { getUser } from '@/lib/auth.js';
import { usePathname } from 'next/navigation';

// Define theme types
interface ThemeColors {
  dark: string;
  accent: string;
  primary: string;
  secondary: string;
  light: string;
  highlight: string;
}

interface Theme {
  id: string;
  name: string;
  colors: ThemeColors;
}

// Available themes
const themes: Theme[] = [
  {
    id: 'solo-leveling',
    name: 'Solo Leveling',
    colors: {
      dark: '#120011',
      accent: '#854F6C',
      primary: '#522B5B',
      secondary: '#382039',
      light: '#F6F6F6',
      highlight: '#E6BCCD'
    }
  },
  {
    id: 'naruto',
    name: 'Naruto',
    colors: {
      dark: '#0B0C10',
      accent: '#FF4136',
      primary: '#2980B9',
      secondary: '#FF851B',
      light: '#FFDC00',
      highlight: '#FDFEFE'
    }
  },
  {
    id: 'dragon-ball',
    name: 'Dragon Ball',
    colors: {
      dark: '#0A0A23',
      accent: '#FF8C00',
      primary: '#E63946',
      secondary: '#FFC300',
      light: '#F1FAEE',
      highlight: '#457B9D'
    }
  }
];

// Context type
interface ThemeContextType {
  theme: Theme;
  setTheme: (themeId: string) => void;
  themes: Theme[];
}

// Create context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Provider component
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(themes[0]);
  
  // Initialize theme from localStorage or default
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme') || 'solo-leveling';
      const foundTheme = themes.find(t => t.id === savedTheme) || themes[0];
      setThemeState(foundTheme);
    }
  }, []);
  
  // Apply theme to CSS variables
  useEffect(() => {
    if (theme) {
      const root = document.documentElement;
      
      // Convert hex to rgb
      const hexToRgb = (hex: string) => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result 
          ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
          : null;
      };
      
      // Set CSS variables from theme
      root.style.setProperty('--theme-dark-rgb', hexToRgb(theme.colors.dark));
      root.style.setProperty('--theme-accent-rgb', hexToRgb(theme.colors.accent));
      root.style.setProperty('--theme-primary-rgb', hexToRgb(theme.colors.primary));
      root.style.setProperty('--theme-secondary-rgb', hexToRgb(theme.colors.secondary));
      root.style.setProperty('--theme-light-rgb', hexToRgb(theme.colors.light));
      root.style.setProperty('--theme-highlight-rgb', hexToRgb(theme.colors.highlight));
    }
  }, [theme]);
  
  // Set theme function
  const setTheme = (themeId: string) => {
    const newTheme = themes.find(t => t.id === themeId) || themes[0];
    setThemeState(newTheme);
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', themeId);
    }
  };
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme, themes }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Hook for using the theme context
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

export function ThemeProviderOld({ children }: { children: React.ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState(themes[0].id);
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();

  // Function to apply theme CSS variables
  const applyTheme = (themeId: string) => {
    const theme = themes.find(t => t.id === themeId);
    if (!theme) {
      console.error(`Theme ${themeId} not found`);
      return;
    }

    try {
      const root = document.documentElement;
      
      // Clear existing theme variables
      root.style.removeProperty('--dark');
      root.style.removeProperty('--accent');
      root.style.removeProperty('--primary');
      root.style.removeProperty('--secondary');
      root.style.removeProperty('--light');
      root.style.removeProperty('--highlight');
      root.style.removeProperty('--theme-accent-rgb');
      root.style.removeProperty('--theme-primary-rgb');
      root.style.removeProperty('--theme-secondary-rgb');
      root.style.removeProperty('--theme-highlight-rgb');

      // Set new theme variables
      Object.entries(theme.colors).forEach(([key, value]) => {
        root.style.setProperty(`--${key}`, value);
        
        // Set RGB values for shadows
        const rgb = hexToRgb(value);
        if (rgb) {
          switch (key) {
            case 'accent':
              root.style.setProperty('--theme-accent-rgb', `${rgb.r}, ${rgb.g}, ${rgb.b}`);
              break;
            case 'primary':
              root.style.setProperty('--theme-primary-rgb', `${rgb.r}, ${rgb.g}, ${rgb.b}`);
              break;
            case 'secondary':
              root.style.setProperty('--theme-secondary-rgb', `${rgb.r}, ${rgb.g}, ${rgb.b}`);
              break;
            case 'highlight':
              root.style.setProperty('--theme-highlight-rgb', `${rgb.r}, ${rgb.g}, ${rgb.b}`);
              break;
          }
        }
      });

      // Update body class
      document.body.className = `theme-${themeId}`;
      
      console.log(`Theme ${themeId} applied successfully`);
    } catch (error) {
      console.error('Error applying theme:', error);
      throw new Error('Failed to apply theme');
    }
  };

  // Helper function to convert hex to RGB
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  // Function to get profile username from path
  const getProfileUsername = (path: string) => {
    const parts = path.split('/');
    if (parts.length === 2 && !['login', 'register', 'dashboard'].includes(parts[1])) {
      return parts[1];
    }
    return null;
  };

  // Load theme based on current context (profile view or logged-in user)
  useEffect(() => {
    const loadTheme = async () => {
      setIsLoading(true);
      try {
        const profileUsername = getProfileUsername(pathname);
        
        if (profileUsername) {
          // If viewing someone's profile, fetch their theme
          const response = await fetch(`/api/users/${profileUsername}`, {
            credentials: 'include'
          });
          if (!response.ok) {
            throw new Error('Failed to fetch user theme');
          }
          const data = await response.json();
          if (data.theme) {
            setCurrentTheme(data.theme);
            applyTheme(data.theme);
          } else {
            // If no theme set, use default
            setCurrentTheme(themes[0].id);
            applyTheme(themes[0].id);
          }
        } else {
          // For other pages, use logged-in user's theme
          const user = getUser();
          if (user?.theme) {
            setCurrentTheme(user.theme);
            applyTheme(user.theme);
          } else {
            // If no theme set, use default
            setCurrentTheme(themes[0].id);
            applyTheme(themes[0].id);
          }
        }
      } catch (error) {
        console.error('Error loading theme:', error);
        // Fallback to default theme
        setCurrentTheme(themes[0].id);
        applyTheme(themes[0].id);
      } finally {
        setIsLoading(false);
      }
    };

    loadTheme();
  }, [pathname]);

  // Function to update theme
  const setTheme = async (themeId: string) => {
    try {
      const user = getUser();
      if (!user) {
        throw new Error('User not logged in');
      }

      // Apply theme immediately for better UX
      setCurrentTheme(themeId);
      applyTheme(themeId);

      // Update local user data with new theme
      const updatedUser = { ...user, theme: themeId };
      localStorage.setItem('user', JSON.stringify(updatedUser));

      // Update theme in database
      try {
        const response = await fetch(`/api/users/${user.username}/theme`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ theme: themeId }),
        });

        if (!response.ok) {
          const data = await response.json();
          console.warn('Theme updated locally but failed to update in database:', data.error);
          // Continue without throwing - the theme is already updated locally
        } else {
          console.log(`Theme ${themeId} set successfully in database`);
        }
      } catch (dbError) {
        // If database update fails, log but don't throw error
        // This ensures the theme still works locally even if the database update fails
        console.warn('Failed to update theme in database:', dbError);
      }
    } catch (error) {
      console.error('Error setting theme:', error);
      throw error;
    }
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, setTheme, isLoading }}>
      {children}
    </ThemeContext.Provider>
  );
} 