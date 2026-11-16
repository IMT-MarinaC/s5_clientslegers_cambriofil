import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();
    const isDark = theme === 'dark';
    const label = isDark ? 'Passer en voleur diurne' : 'Passer en voleur nocturne';
    const Icon = isDark ? Sun : Moon;

    return (
        <button type="button" className="btn theme-toggle" onClick={toggleTheme} aria-label={label} title={label}>
            <Icon aria-hidden="true" size={22} />
            <span className="theme-toggle__text">{isDark ? 'Voleur diurne' : 'Voleur nocturne'}</span>
        </button>
    );
}