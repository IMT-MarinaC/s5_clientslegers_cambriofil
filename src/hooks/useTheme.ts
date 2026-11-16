import { useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';

export type Theme = 'light' | 'dark';

const systemTheme = (): Theme =>
    window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

export function useTheme() {
    const [theme, setTheme] = useLocalStorage<Theme>('theme', systemTheme());

    useEffect(() => {
        document.documentElement.dataset.theme = theme;
    }, [theme]);

    const toggleTheme = () => setTheme((current) => (current === 'light' ? 'dark' : 'light'));

    return { theme, toggleTheme };
}