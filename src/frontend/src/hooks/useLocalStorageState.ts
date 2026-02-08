import { useState, useEffect } from 'react';

/**
 * Custom hook for persisting state to localStorage.
 * Safely handles initialization, updates, and storage errors.
 */
export function useLocalStorageState(key: string, initialValue: string = ''): [string, (value: string) => void] {
  // Initialize state from localStorage or use initial value
  const [storedValue, setStoredValue] = useState<string>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item !== null ? item : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Update localStorage whenever the state changes
  useEffect(() => {
    try {
      window.localStorage.setItem(key, storedValue);
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}
