'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { marked } from 'marked';
import {
  applyDocumentMetadata,
  currentHash,
  fetchJson,
  fetchText as fetchTextFromRuntime,
  loadBootstrapBundle,
  markAppReady,
  navigateToHash
} from './lib/browser-runtime.js';
import { GITHUB_URL, SITE_DESCRIPTION, SITE_TITLE } from './lib/site-config.js';
import {
  buildSearchEntries,
  collectChapterRoutes,
  collectTopicRoutes,
  normalizeManifest,
  resolveRouteMetadata
} from './lib/site-manifest.js';
import {
  inferChapterJavaVersion,
  matchesVersionFilter,
  scoreLabel
} from './lib/content-helpers.js';
import {
  SECTION_PROFILES,
  resourceSummaryFromSlug
} from './lib/site-data.js';
import Sidebar, { SearchBox } from './components/layout/Sidebar.jsx';
import {
  QuickLinkRail,
  RandomTopicButton
} from './components/common/AppChrome.jsx';
import RouteRenderer from './components/router/RouteRenderer.jsx';
import { useLearningPathState } from './hooks/use-learning-path-state.js';
import { useFlashcardState } from './hooks/use-flashcard-state.js';
import {
  useFeedbackState,
  useHashRoute,
  useReadingState,
  useUiPreferences
} from './hooks/use-app-state.js';

marked.setOptions({
  gfm: true,
  breaks: false,
  mangle: false,
  headerIds: false
});

function sidebarRouteFromHashRoute(route) {
  if (route.type === 'section') {
    return `#section/${route.sectionSlug}`;
  }
  if (route.type === 'chapter' || route.type === 'topic') {
    return `#chapter/${route.sectionSlug}/${route.chapterSlug}`;
  }
  if (route.type === 'progress') {
    return '#progress';
  }
  return '';
}

function chapterRouteFromHashRoute(route) {
  if (route.type === 'chapter' || route.type === 'topic') {
    return `#chapter/${route.sectionSlug}/${route.chapterSlug}`;
  }
  return '';
}

export default function App() {
  const route = useHashRoute();
  const [manifest, setManifest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const contentCache = useRef(new Map());
  const readingState = useReadingState();
  const learningPathState = useLearningPathState();
  const feedbackState = useFeedbackState();
  const flashcardState = useFlashcardState();
  const uiPreferences = useUiPreferences();

  useEffect(() => {
    markAppReady();
    loadBootstrapBundle().catch(() => {});
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function loadManifest() {
      try {
        const data = await fetchJson('data/site.json');
        const normalizedManifest = normalizeManifest(data);
        const chapterOrder = [];
        const routeToChapter = new Map();
        const sections = normalizedManifest.sections.map((section) => ({
          ...section,
          chapters: section.chapters.map((chapter) => {
            const nextChapter = {
              ...chapter,
              javaVersion: inferChapterJavaVersion(section.slug, chapter)
            };
            chapterOrder.push(nextChapter);
            routeToChapter.set(nextChapter.route, nextChapter);
            return nextChapter;
          })
        }));

        if (!cancelled) {
          setManifest({
            ...normalizedManifest,
            sections,
            chapterOrder,
            routeToChapter
          });
        }
      } catch (loadError) {
        if (!cancelled) {
          setError(loadError.message);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadManifest();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    applyDocumentMetadata(resolveRouteMetadata({
      manifest,
      route,
      sectionProfiles: SECTION_PROFILES,
      siteTitle: SITE_TITLE,
      siteDescription: SITE_DESCRIPTION,
      resourceSummaryFromSlug
    }));
  }, [manifest, route]);

  const searchEntries = useMemo(() => buildSearchEntries(manifest), [manifest]);
  const allTopicRoutes = useMemo(() => collectTopicRoutes(manifest), [manifest]);
  const allChapterRoutes = useMemo(() => collectChapterRoutes(manifest), [manifest]);

  const fetchText = useCallback(async (path) => {
    if (contentCache.current.has(path)) {
      return contentCache.current.get(path);
    }

    const text = await fetchTextFromRuntime(path);
    contentCache.current.set(path, text);
    return text;
  }, []);

  function goToRandomTopic() {
    if (!allTopicRoutes.length) {
      navigateToHash('#home');
      return;
    }

    const activeHash = currentHash();
    const candidates = allTopicRoutes.filter((item) => item !== activeHash);
    const pool = candidates.length ? candidates : allTopicRoutes;
    const index = Math.floor(Math.random() * pool.length);
    navigateToHash(pool[index]);
  }

  const activeRoute = sidebarRouteFromHashRoute(route);
  const activeChapterRoute = chapterRouteFromHashRoute(route);
  const chapterIndex = activeChapterRoute ? allChapterRoutes.indexOf(activeChapterRoute) : -1;
  const previousChapterRoute = chapterIndex > 0 ? allChapterRoutes[chapterIndex - 1] : '';
  const nextChapterRoute = chapterIndex >= 0 && chapterIndex < allChapterRoutes.length - 1 ? allChapterRoutes[chapterIndex + 1] : '';

  useEffect(() => {
    function onKeyDown(event) {
      const activeTag = document.activeElement?.tagName;
      const isTypingContext = document.activeElement?.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(activeTag);

      if (event.key === 'Escape') {
        document.dispatchEvent(new CustomEvent('reader:close-overlays'));
        return;
      }

      if (event.key === '/' && !isTypingContext) {
        event.preventDefault();
        document.dispatchEvent(new CustomEvent('reader:focus-search'));
        return;
      }

      if (isTypingContext) {
        return;
      }

      if ((event.key === 'ArrowRight' || event.key === ']') && nextChapterRoute) {
        event.preventDefault();
        navigateToHash(nextChapterRoute);
      }

      if ((event.key === 'ArrowLeft' || event.key === '[') && previousChapterRoute) {
        event.preventDefault();
        navigateToHash(previousChapterRoute);
      }
    }

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [nextChapterRoute, previousChapterRoute]);

  if (loading) {
    return <div className="content-card empty-state m-4">Loading content…</div>;
  }

  if (error || !manifest) {
    return <div className="content-card empty-state m-4">{error || 'Unknown error'}</div>;
  }

  return (
    <div className={`site-shell ${uiPreferences.readingMode ? 'reading-mode' : ''} ${uiPreferences.isDark ? 'theme-dark' : ''}`}>
      <header className="site-header border-bottom">
        <nav className="navbar navbar-expand-lg px-3 px-lg-4 py-3">
          <div className="container-fluid px-0">
            <div className="d-flex align-items-center gap-2">
              <button className="btn btn-outline-dark btn-sm d-lg-none" type="button" data-bs-toggle="offcanvas" data-bs-target="#reader-sidebar-mobile" aria-controls="reader-sidebar-mobile">
                <i className="bi bi-list" />
              </button>
              <a className="navbar-brand fw-semibold" href="#home">{SITE_TITLE}</a>
            </div>

            <div className="ms-lg-4 flex-grow-1 d-flex flex-wrap flex-lg-nowrap align-items-center gap-3 header-actions">
              <SearchBox entries={searchEntries} />
              <div className="d-none d-lg-flex align-items-center gap-2">
                <button className={`btn btn-sm rounded-pill ${uiPreferences.isDark ? 'btn-dark' : 'btn-outline-dark'}`} type="button" onClick={uiPreferences.toggleTheme}>
                  <i className={`bi ${uiPreferences.isDark ? 'bi-sun-fill' : 'bi-moon-stars-fill'} me-1`} />
                  {uiPreferences.isDark ? 'Light Mode' : 'Dark Mode'}
                </button>
                <button className={`btn btn-sm rounded-pill ${uiPreferences.readingMode ? 'btn-dark' : 'btn-outline-dark'}`} type="button" onClick={uiPreferences.toggleReadingMode}>
                  {uiPreferences.readingMode ? 'Exit Reading Mode' : 'Reading Mode'}
                </button>
                <RandomTopicButton manifest={manifest} currentRoute={currentHash()} />
                <a className="btn btn-outline-dark btn-sm rounded-pill" href="#resource/INTERVIEW_TRACK">Interview Track</a>
                <a className="btn btn-outline-dark btn-sm rounded-pill" href="#resource/INTERVIEW_INDEX">Interview Index</a>
                <a className="btn btn-outline-dark btn-sm rounded-pill" href="#resource/INTERVIEW_PROBLEM_APPROACH">Problem Approach</a>
                <a className="btn btn-outline-dark btn-sm rounded-pill" href="#resource/OCJP_TRACK">Certification</a>
                <a className="btn btn-outline-dark btn-sm rounded-pill" href="#progress">My Progress</a>
              </div>
            </div>
          </div>
        </nav>

        <div className="px-3 px-lg-4 pb-3 app-quick-links">
          <QuickLinkRail
            onRandomTopic={goToRandomTopic}
            onToggleTheme={uiPreferences.toggleTheme}
            themeLabel={uiPreferences.isDark ? 'Light Mode' : 'Dark Mode'}
            onToggleReadingMode={uiPreferences.toggleReadingMode}
            readingLabel={uiPreferences.readingMode ? 'Exit Reading' : 'Reading Mode'}
          />
        </div>
      </header>

      <main className="reader-shell">
        <div className="offcanvas offcanvas-start reader-offcanvas d-lg-none" tabIndex="-1" id="reader-sidebar-mobile" aria-labelledby="reader-sidebar-mobile-label">
          <div className="offcanvas-header">
            <h2 className="offcanvas-title h5 mb-0" id="reader-sidebar-mobile-label">Chapter Navigation</h2>
            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close" />
          </div>
          <div className="offcanvas-body">
            <Sidebar
              sections={manifest.sections}
              activeRoute={activeRoute}
              completedChapters={readingState.completedChapters}
              quizScores={readingState.quizScores}
              versionFilter={uiPreferences.versionFilter}
              onVersionChange={uiPreferences.setVersionFilter}
              chapterCount={manifest.chapterOrder.length}
              scoreLabel={scoreLabel}
              matchesVersionFilter={matchesVersionFilter}
            />
          </div>
        </div>

        <aside className={`reader-sidebar d-none d-lg-block ${uiPreferences.readingMode ? 'reader-sidebar-reading' : ''}`}>
          <Sidebar
            sections={manifest.sections}
            activeRoute={activeRoute}
            completedChapters={readingState.completedChapters}
            quizScores={readingState.quizScores}
            versionFilter={uiPreferences.versionFilter}
            onVersionChange={uiPreferences.setVersionFilter}
            chapterCount={manifest.chapterOrder.length}
            scoreLabel={scoreLabel}
            matchesVersionFilter={matchesVersionFilter}
          />
        </aside>

        <section className="content-column">
          <div className="content-wrap">
            <RouteRenderer
              route={route}
              manifest={manifest}
              fetchText={fetchText}
              readingState={readingState}
              learningPathState={learningPathState}
              feedbackState={feedbackState}
              flashcardState={flashcardState}
              uiPreferences={uiPreferences}
            />
          </div>

          <footer className="site-footer content-card">
            <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">
              <div>
                <div className="eyebrow mb-1">Trust And Updates</div>
                <div className="muted-copy mb-1">
                  Built from the repo content. Last generated: {manifest.generatedAt ? new Date(manifest.generatedAt).toLocaleString() : 'Unknown'}.
                </div>
                <div className="footer-shortcuts">Shortcuts: `[` prev, `]` next, `/` search, `Esc` close.</div>
              </div>
              <div className="d-flex flex-wrap gap-2">
                <a className="btn btn-outline-dark btn-sm rounded-pill" href={GITHUB_URL} target="_blank" rel="noreferrer">GitHub Repo</a>
                <a className="btn btn-outline-dark btn-sm rounded-pill" href="#resource/BOOK">Book Order</a>
                <a className="btn btn-outline-dark btn-sm rounded-pill" href="#resource/ROADMAP_099">Roadmap</a>
              </div>
            </div>
          </footer>
        </section>
      </main>
    </div>
  );
}
