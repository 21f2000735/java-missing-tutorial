import { HOME_HASH, parseHashRoute } from './hash-route.js';
import { SITE_BASE_PATH } from './site-config.js';

function safeWindow() {
  return typeof window === 'undefined' ? null : window;
}

function safeDocument() {
  return typeof document === 'undefined' ? null : document;
}

export function currentHash() {
  const windowRef = safeWindow();
  return windowRef?.location.hash || HOME_HASH;
}

export function navigateToHash(hash) {
  const windowRef = safeWindow();
  if (windowRef) {
    windowRef.location.hash = hash || HOME_HASH;
  }
}

export function subscribeToHashRoute(callback) {
  const windowRef = safeWindow();
  if (!windowRef) {
    return () => {};
  }

  const onHashChange = () => callback(parseHashRoute(windowRef.location.hash));
  windowRef.addEventListener('hashchange', onHashChange);
  return () => windowRef.removeEventListener('hashchange', onHashChange);
}

export function readStorageJson(key, fallback) {
  const windowRef = safeWindow();
  if (!windowRef) {
    return fallback;
  }

  try {
    return JSON.parse(windowRef.localStorage.getItem(key) || JSON.stringify(fallback));
  } catch {
    return fallback;
  }
}

export function writeStorageJson(key, value) {
  const windowRef = safeWindow();
  if (windowRef) {
    windowRef.localStorage.setItem(key, JSON.stringify(value));
  }
}

export function readStorageValue(key, fallback) {
  const windowRef = safeWindow();
  if (!windowRef) {
    return fallback;
  }

  try {
    return windowRef.localStorage.getItem(key) ?? fallback;
  } catch {
    return fallback;
  }
}

export function writeStorageValue(key, value) {
  const windowRef = safeWindow();
  if (windowRef) {
    windowRef.localStorage.setItem(key, value);
  }
}

export function markAppReady() {
  const documentRef = safeDocument();
  if (documentRef) {
    documentRef.documentElement.classList.add('app-ready');
  }
}

export async function loadBootstrapBundle() {
  await import('bootstrap/dist/js/bootstrap.bundle.min.js');
}

function resolveRuntimePath(path) {
  if (/^(?:[a-z]+:)?\/\//i.test(path) || path.startsWith('data:')) {
    return path;
  }

  const normalizedPath = path.replace(/^\/+/, '');
  const base = typeof window === 'undefined'
    ? `https://21f2000735.github.io${SITE_BASE_PATH}`
    : `${window.location.origin}${SITE_BASE_PATH}`;
  return new URL(normalizedPath, base).toString();
}

export function applyTheme(theme) {
  const documentRef = safeDocument();
  if (!documentRef) {
    return;
  }

  documentRef.documentElement.dataset.theme = theme;
  documentRef.body.dataset.theme = theme;
  const meta = documentRef.querySelector('meta[name="theme-color"]');
  if (meta) {
    meta.setAttribute('content', theme === 'dark' ? '#161311' : '#af5b0c');
  }
}

export function applyDocumentMetadata({ title, description }) {
  const documentRef = safeDocument();
  if (!documentRef) {
    return;
  }

  if (title) {
    documentRef.title = title;
  }

  if (description) {
    const meta = documentRef.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute('content', description);
    }
  }
}

export async function fetchJson(path) {
  const resolvedPath = resolveRuntimePath(path);
  const response = await fetch(resolvedPath);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${resolvedPath}`);
  }
  return response.json();
}

export async function fetchText(path) {
  const resolvedPath = resolveRuntimePath(path);
  const response = await fetch(resolvedPath);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${resolvedPath}`);
  }
  return response.text();
}
