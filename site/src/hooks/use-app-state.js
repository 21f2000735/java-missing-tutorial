import { useEffect, useState } from 'react';
import {
  applyTheme,
  currentHash,
  readStorageJson,
  readStorageValue,
  subscribeToHashRoute,
  writeStorageJson,
  writeStorageValue
} from '../lib/browser-runtime.js';
import { HOME_ROUTE, parseHashRoute } from '../lib/hash-route.js';
import { normalizeJavaVersion } from '../lib/content-helpers.js';

export function useHashRoute() {
  const [route, setRoute] = useState(() => HOME_ROUTE);

  useEffect(() => {
    setRoute(parseHashRoute(currentHash()));
    return subscribeToHashRoute(setRoute);
  }, []);

  return route;
}

export function useReadingState() {
  const [bookmarks, setBookmarks] = useState(() => readStorageJson('java-book-bookmarks', []));
  const [completed, setCompleted] = useState(() => readStorageJson('java-book-completed', []));
  const [completedChapters, setCompletedChapters] = useState(() => readStorageJson('java-book-completed-chapters', []));
  const [quizScores, setQuizScores] = useState(() => readStorageJson('java-book-quiz-scores', {}));

  useEffect(() => { writeStorageJson('java-book-bookmarks', bookmarks); }, [bookmarks]);
  useEffect(() => { writeStorageJson('java-book-completed', completed); }, [completed]);
  useEffect(() => { writeStorageJson('java-book-completed-chapters', completedChapters); }, [completedChapters]);
  useEffect(() => { writeStorageJson('java-book-quiz-scores', quizScores); }, [quizScores]);

  function toggleBookmark(route) {
    setBookmarks((current) => current.includes(route) ? current.filter((item) => item !== route) : [...current, route]);
  }

  function toggleCompleted(route) {
    setCompleted((current) => current.includes(route) ? current.filter((item) => item !== route) : [...current, route]);
  }

  function toggleChapterCompleted(route) {
    setCompletedChapters((current) => current.includes(route) ? current.filter((item) => item !== route) : [...current, route]);
  }

  function saveQuizScore(route, score) {
    setQuizScores((current) => ({ ...current, [route]: score }));
  }

  return {
    bookmarks,
    completed,
    completedChapters,
    quizScores,
    toggleBookmark,
    toggleCompleted,
    toggleChapterCompleted,
    saveQuizScore
  };
}

export function useFeedbackState() {
  const [votes, setVotes] = useState(() => readStorageJson('java-book-feedback', {}));

  useEffect(() => {
    writeStorageJson('java-book-feedback', votes);
  }, [votes]);

  function setVote(routeKey, vote) {
    setVotes((current) => ({ ...current, [routeKey]: vote }));
  }

  return { votes, setVote };
}

export function useUiPreferences() {
  const [readingMode, setReadingMode] = useState(() => readStorageValue('java-book-reading-mode', 'off') === 'on');
  const [theme, setTheme] = useState(() => readStorageValue('java-book-theme', 'light'));
  const [versionFilter, setVersionFilter] = useState(() => normalizeJavaVersion(readStorageValue('java-book-version-filter', 'All')) || 'All');

  useEffect(() => {
    writeStorageValue('java-book-reading-mode', readingMode ? 'on' : 'off');
  }, [readingMode]);

  useEffect(() => {
    writeStorageValue('java-book-theme', theme);
    applyTheme(theme);
  }, [theme]);

  useEffect(() => {
    writeStorageValue('java-book-version-filter', versionFilter);
  }, [versionFilter]);

  function toggleReadingMode() {
    setReadingMode((current) => !current);
  }

  function toggleTheme() {
    setTheme((current) => current === 'dark' ? 'light' : 'dark');
  }

  return {
    readingMode,
    toggleReadingMode,
    theme,
    toggleTheme,
    isDark: theme === 'dark',
    versionFilter,
    setVersionFilter
  };
}
