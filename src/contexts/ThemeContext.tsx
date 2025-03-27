"use client"

import { createContext, useContext, useState, useEffect } from 'react';
import { themes } from '@/config/themes';
import { getUser } from '@/lib/auth';
import { usePathname } from 'next/navigation';

interface ThemeContextType {
  currentTheme: string;
  setTheme: (theme: string) => Promise<void>;
  isLoading: boolean;
}

const ThemeContext = createContext<ThemeContextType>({
  currentTheme: themes[0].id,
  setTheme: async () => {},
  isLoading: true,
});

export const useTheme = () => useContext(ThemeContext);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
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