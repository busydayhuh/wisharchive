import { useCallback, useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  // перечитываем localStorage при изменении ключа
  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item !== null) {
        setStoredValue(JSON.parse(item));
      } else {
        // только если ключа нет, берём initialValue
        setStoredValue(initialValue);
      }
    } catch {
      setStoredValue(initialValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      setStoredValue((prev) => {
        const valueToStore = value instanceof Function ? value(prev) : value;
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
        return valueToStore;
      });
    },
    [key]
  );

  return [storedValue, setValue] as const;
}

export function clearLocalFilters() {
  const keysToClear = Object.keys(window.localStorage).filter(
    (k) => k !== "vite-ui-theme"
  );
  keysToClear.forEach((k) => window.localStorage.removeItem(k));
}
