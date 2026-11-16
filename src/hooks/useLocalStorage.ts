import { useEffect, useState } from 'react';

function readStorage<T>(key: string, fallback: T): T {
    try {
        const stored = localStorage.getItem(key);
        return stored !== null ? (JSON.parse(stored) as T) : fallback;
    } catch {
        return fallback;
    }
}

export function useLocalStorage<T>(key: string, initialValue: T) {
    const [value, setValue] = useState<T>(() => readStorage(key, initialValue));

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue] as const;
}