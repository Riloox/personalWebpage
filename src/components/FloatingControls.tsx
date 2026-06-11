import type { LanguageKey } from '../data/profile';
import type { Theme } from '../hooks/useTheme';

interface FloatingControlsProps {
  language: LanguageKey;
  onLanguageChange: (next: LanguageKey) => void;
  theme: Theme;
  onThemeChange: (next: Theme) => void;
}

const FloatingControls = ({
  language,
  onLanguageChange,
  theme,
  onThemeChange,
}: FloatingControlsProps) => {
  return (
    <div className="floating-controls" aria-label="Site controls">
      <div className="float-pill" role="group" aria-label="Language">
        <button
          type="button"
          className="float-seg"
          aria-pressed={language === 'en'}
          onClick={() => onLanguageChange('en')}
        >
          EN
        </button>
        <button
          type="button"
          className="float-seg"
          aria-pressed={language === 'es'}
          onClick={() => onLanguageChange('es')}
        >
          ES
        </button>
      </div>
      <div className="float-pill" role="group" aria-label="Theme">
        <button
          type="button"
          className="float-seg"
          aria-pressed={theme === 'light'}
          aria-label="Light theme"
          onClick={() => onThemeChange('light')}
        >
          ☀
        </button>
        <button
          type="button"
          className="float-seg"
          aria-pressed={theme === 'dark'}
          aria-label="Dark theme"
          onClick={() => onThemeChange('dark')}
        >
          ☾
        </button>
      </div>
    </div>
  );
};

export default FloatingControls;
