import { useEffect, useState } from 'react';
import { readStorageJson, writeStorageJson } from '../lib/browser-runtime.js';
import { DAY_MS } from '../lib/study-tools.js';

export function useFlashcardState() {
  const [progress, setProgress] = useState(() => readStorageJson('java-book-flashcards', {}));

  useEffect(() => {
    writeStorageJson('java-book-flashcards', progress);
  }, [progress]);

  function markGotIt(cardId) {
    const now = Date.now();
    setProgress((current) => {
      const existing = current[cardId] || {};
      const nextInterval = existing.intervalDays ? existing.intervalDays * 2 : 1;
      return {
        ...current,
        [cardId]: {
          intervalDays: nextInterval,
          streak: (existing.streak || 0) + 1,
          lastReviewedAt: now,
          nextReviewAt: now + (nextInterval * DAY_MS),
          lastResult: 'got_it'
        }
      };
    });
  }

  function markReviewAgain(cardId) {
    const now = Date.now();
    setProgress((current) => ({
      ...current,
      [cardId]: {
        intervalDays: 1,
        streak: 0,
        lastReviewedAt: now,
        nextReviewAt: now + DAY_MS,
        lastResult: 'review_again'
      }
    }));
  }

  function resetAll() {
    setProgress({});
  }

  return {
    progress,
    markGotIt,
    markReviewAgain,
    resetAll
  };
}
