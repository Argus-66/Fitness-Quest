import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { themes, Theme } from '@/config/themes';
import { FaPalette, FaCheck, FaSpinner } from 'react-icons/fa';
import { useTheme } from '@/contexts/ThemeContext';

interface ThemeSelectorProps {
  currentTheme: string;
  onThemeChange: (themeId: string) => Promise<void>;
}

export default function ThemeSelector({ currentTheme, onThemeChange }: ThemeSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const { setTheme } = useTheme();

  const handleThemeSelect = async (themeId: string) => {
    if (currentTheme === themeId) {
      setIsOpen(false);
      return;
    }
    
    try {
      setError(null);
      setSuccess(null);
      setIsLoading(true);
      
      // Apply the theme immediately via the context
      await setTheme(themeId);
      
      try {
        // Then update in the database
        await onThemeChange(themeId);
        setSuccess("Theme updated successfully!");
      } catch (dbError) {
        // If database update fails, show warning but don't block the theme change
        console.warn("Theme applied locally but failed to save to database");
        setError("Theme applied locally but may not persist after refresh");
      }
      
      // Don't close the modal yet - let the user see the success/error message
      setTimeout(() => {
        setIsOpen(false);
        setSuccess(null);
        setError(null);
      }, 1500);
      
    } catch (err) {
      console.error('Error updating theme:', err);
      setError(err instanceof Error ? err.message : 'Failed to update theme. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={isLoading}
        className={`flex items-center space-x-2 px-6 py-3 bg-theme-dark/40 backdrop-blur-lg rounded-xl border border-theme-accent/30 hover:bg-theme-accent/20 shadow-theme-sm transition-all duration-300 ${
          isLoading ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {isLoading ? (
          <FaSpinner className="w-5 h-5 text-theme-light animate-spin" />
        ) : (
          <FaPalette className="w-5 h-5 text-theme-light" />
        )}
        <span className="text-theme-light">
          {isLoading ? 'Updating...' : 'Change Theme'}
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-full left-0 mt-2 w-[600px] bg-theme-dark/95 backdrop-blur-lg rounded-xl border border-theme-accent/30 p-6 shadow-theme z-50"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-theme-light">Select Theme</h3>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-theme-light/60 hover:text-theme-light"
              >
                ✕
              </button>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400">
                {error}
              </div>
            )}
            
            {success && (
              <div className="mb-4 p-3 bg-green-500/10 border border-green-500/20 rounded-lg text-green-400">
                {success}
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              {themes.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => handleThemeSelect(theme.id)}
                  disabled={isLoading || currentTheme === theme.id}
                  className={`relative group p-4 rounded-lg border-2 transition-all duration-300 ${
                    currentTheme === theme.id
                      ? 'border-theme-accent cursor-default'
                      : 'border-transparent hover:border-theme-accent/30'
                  } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  style={{
                    background: `linear-gradient(135deg, ${theme.colors.dark}, ${theme.colors.accent})`
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-theme-light font-medium">{theme.name}</span>
                    {currentTheme === theme.id && (
                      <FaCheck className="text-theme-accent" />
                    )}
                  </div>
                  <div className="flex gap-2 mt-3">
                    {Object.values(theme.colors).map((color, index) => (
                      <div
                        key={index}
                        className="w-6 h-6 rounded-full shadow-theme-sm"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 