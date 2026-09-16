'use client';

import { useCallback, useEffect, useState } from 'react';

const KEY = 'readerexpo:reading-list';

function read() {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const stored = localStorage.getItem(KEY);

    if (!stored) {
      return [];
    }

    const parsed = JSON.parse(stored);

    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function useReadingList() {
  const [list, setList] = useState(read);

  useEffect(() => {
    const onStorage = () => {
      setList(read());
    };

    window.addEventListener('storage', onStorage);

    return () => {
      window.removeEventListener('storage', onStorage);
    };
  }, []);

  const isSaved = useCallback(
    (id) => list.some((book) => book.id === id),
    [list]
  );

  const toggle = useCallback((book) => {
    setList((previous) => {
      const exists = previous.some(
        (item) => item.id === book.id
      );

      const next = exists
        ? previous.filter((item) => item.id !== book.id)
        : [book, ...previous];

      try {
        localStorage.setItem(KEY, JSON.stringify(next));
      } catch {
        // Ignore storage errors.
      }

      return next;
    });
  }, []);

  return {
    list,
    isSaved,
    toggle,
  };
}