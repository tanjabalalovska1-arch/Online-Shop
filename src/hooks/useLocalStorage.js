import { useState, useEffect, useCallback, useRef } from "react";

function useLocalStorage(key, initialValue) {
  const initialValueRef = useRef(initialValue);

  const [storedData, setStoredData] = useState(() => {
    try {
      const savedValue = localStorage.getItem(key);

      return {
        key,
        value:
          savedValue !== null
            ? JSON.parse(savedValue)
            : initialValueRef.current,
      };
    } catch (error) {
      console.error("Грешка при читање на localStorage:", error);
      return { key, value: initialValueRef.current };
    }
  });

  // Gi vcituvame podatocite za tekovniot key
  useEffect(() => {
    try {
      const savedValue = localStorage.getItem(key);

      setStoredData({
        key,
        value:
          savedValue !== null
            ? JSON.parse(savedValue)
            : initialValueRef.current,
      });
    } catch (error) {
      console.error("Грешка при читање на localStorage:", error);
      setStoredData({
        key,
        value: initialValueRef.current,
      });
    }
  }, [key]);

  // Zacuvuvame samo ako podatocite odgovaraat na key
  useEffect(() => {
    if (storedData.key !== key) return;

    try {
      localStorage.setItem(key, JSON.stringify(storedData.value));
    } catch (error) {
      console.error("Грешка при зачувување во localStorage:", error);
    }
  }, [key, storedData]);

  const setValue = useCallback(
    (newValue) => {
      setStoredData((previousData) => {
        const currentValue =
          previousData.key === key
            ? previousData.value
            : initialValueRef.current;

        const updatedValue =
          typeof newValue === "function" ? newValue(currentValue) : newValue;

        return {
          key,
          value: updatedValue,
        };
      });
    },
    [key],
  );

  const value =
    storedData.key === key ? storedData.value : initialValueRef.current;

  return [value, setValue];
}

export default useLocalStorage;
