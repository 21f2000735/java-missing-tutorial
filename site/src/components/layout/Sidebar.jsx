import { useEffect, useMemo, useRef, useState } from 'react';
import { JAVA_VERSION_FILTERS, SECTION_PROFILES } from '../../lib/site-data.js';

function SearchBox({ entries }) {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);
  const inputRef = useRef(null);

  const matches = useMemo(() => {
    if (!query.trim()) {
      return [];
    }
    const normalized = query.trim().toLowerCase();
    return entries
      .filter((entry) => (
        entry.label.toLowerCase().includes(normalized)
        || entry.meta.toLowerCase().includes(normalized)
        || entry.snippet.toLowerCase().includes(normalized)
      ))
      .slice(0, 12);
  }, [entries, query]);

  useEffect(() => {
    function onDocumentClick(event) {
      if (wrapRef.current && !wrapRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('click', onDocumentClick);
    return () => document.removeEventListener('click', onDocumentClick);
  }, []);

  useEffect(() => {
    function onOverlayClose() {
      setOpen(false);
    }

    function onSearchFocus() {
      inputRef.current?.focus();
      setOpen(true);
    }

    document.addEventListener('reader:close-overlays', onOverlayClose);
    document.addEventListener('reader:focus-search', onSearchFocus);
    return () => {
      document.removeEventListener('reader:close-overlays', onOverlayClose);
      document.removeEventListener('reader:focus-search', onSearchFocus);
    };
  }, []);

  return (
    <div ref={wrapRef} className="position-relative search-wrap flex-grow-1">
      <i className="bi bi-search search-icon" />
      <input
        id="site-search"
        ref={inputRef}
        className="form-control search-input"
        type="search"
        placeholder="Search a problem, chapter, topic, or section"
        value={query}
        onFocus={() => setOpen(true)}
        onChange={(event) => {
          setQuery(event.target.value);
          setOpen(true);
        }}
        onKeyDown={(event) => {
          if (event.key === 'Escape') {
            setOpen(false);
            inputRef.current?.blur();
          }
        }}
      />
      {open && query.trim() ? (
        <div className="list-group search-results">
          {matches.length ? matches.map((entry) => (
            <a
              key={`${entry.meta}-${entry.label}-${entry.route}`}
              href={entry.route}
              className="list-group-item list-group-item-action"
              onClick={() => setOpen(false)}
            >
              <div className="fw-semibold">{entry.label}</div>
              <small className="text-muted d-block">{entry.meta}</small>
              <small className="search-snippet">{entry.snippet}</small>
            </a>
          )) : (
            <div className="list-group-item text-muted">No matches found.</div>
          )}
        </div>
      ) : null}
    </div>
  );
}

function CompletionMeter({ completedCount, chapterCount }) {
  const percent = chapterCount ? Math.round((completedCount / chapterCount) * 100) : 0;
  return (
    <div className="sidebar-progress">
      <div className="d-flex justify-content-between align-items-center gap-2 mb-2">
        <div>
          <div className="eyebrow mb-1">Overall Progress</div>
          <div className="sidebar-progress-copy">{completedCount} / {chapterCount} chapters</div>
        </div>
        <a className="btn btn-outline-dark btn-sm rounded-pill" href="#progress">My Progress</a>
      </div>
      <div className="progress" role="progressbar" aria-valuenow={percent} aria-valuemin="0" aria-valuemax="100">
        <div className="progress-bar bg-primary" style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}

function VersionFilterBar({ value, onChange }) {
  return (
    <div className="version-filter-bar">
      {JAVA_VERSION_FILTERS.map((filter) => (
        <button
          key={filter}
          type="button"
          className={`btn btn-sm rounded-pill ${value === filter ? 'btn-primary' : 'btn-outline-primary'}`}
          onClick={() => onChange(filter)}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}

export default function Sidebar({
  sections,
  activeRoute,
  completedChapters,
  quizScores,
  versionFilter,
  onVersionChange,
  chapterCount,
  scoreLabel,
  matchesVersionFilter
}) {
  const completedCount = completedChapters.length;

  return (
    <aside className="sidebar-panel">
      <div className="sidebar-panel">
        <div className="sidebar-intro">
          <p className="eyebrow mb-2">Learning Book</p>
          <h1 className="sidebar-title mb-2">Start with a problem, not a file tree.</h1>
          <p className="sidebar-text mb-0">
            Each section groups related ideas. Each chapter should answer what problem the concept solves,
            how to code it, and what to expect when you run it.
          </p>
        </div>
        <CompletionMeter completedCount={completedCount} chapterCount={chapterCount} />
        <div className="sidebar-filter-block">
          <div className="eyebrow mb-2">Java Version</div>
          <VersionFilterBar value={versionFilter} onChange={onVersionChange} />
        </div>
        <div className="sidebar-tree">
          {sections.map((section, index) => {
            const profile = SECTION_PROFILES[section.slug] || {};
            const visibleChapters = section.chapters.filter((chapter) => {
              const route = `#chapter/${section.slug}/${chapter.slug}`;
              return activeRoute === route || matchesVersionFilter(chapter.javaVersion, versionFilter);
            });
            if (!visibleChapters.length) {
              return null;
            }
            const sectionRoute = `#section/${section.slug}`;
            const isOpen = activeRoute === sectionRoute || visibleChapters.some((chapter) => activeRoute === `#chapter/${section.slug}/${chapter.slug}`) || index === 0;
            return (
              <details className="sidebar-tree-section" key={section.slug} defaultOpen={isOpen}>
                <summary>
                  <span className="d-flex align-items-center gap-2">
                    {profile.icon ? <i className={`${profile.icon} section-icon`} /> : null}
                    <span>{section.title}</span>
                  </span>
                  <span className="badge rounded-pill badge-soft">{visibleChapters.length}</span>
                </summary>
                <div className="sidebar-tree-body">
                  <a className={`nav-link-card nav-link-section mb-3 ${activeRoute === sectionRoute ? 'active' : ''}`} href={sectionRoute}>
                    <div className="fw-semibold mb-1">{section.title}</div>
                    <small>{profile.hook || 'Open the section guide and chapter roadmap.'}</small>
                  </a>
                  <div className="nav-link-list">
                    {visibleChapters.map((chapter) => {
                      const route = `#chapter/${section.slug}/${chapter.slug}`;
                      const isDone = completedChapters.includes(route);
                      const score = quizScores[route];
                      return (
                        <a className={`nav-link-card ${activeRoute === route ? 'active' : ''}`} href={route} key={chapter.slug}>
                          <div className="d-flex justify-content-between align-items-start gap-3">
                            <div className="sidebar-chapter-copy">
                              <div className="fw-semibold d-flex align-items-center gap-2">
                                {isDone ? <i className="bi bi-check-circle-fill text-success" /> : <i className="bi bi-circle text-muted" />}
                                <span>{chapter.title}</span>
                              </div>
                              <small>{chapter.topics.length} topic{chapter.topics.length === 1 ? '' : 's'}</small>
                            </div>
                            <div className="sidebar-chapter-badges">
                              {scoreLabel(score) ? <span className="badge rounded-pill text-bg-warning">{scoreLabel(score)}</span> : null}
                              {chapter.javaVersion ? <span className="badge rounded-pill badge-soft">{chapter.javaVersion}</span> : null}
                            </div>
                          </div>
                        </a>
                      );
                    })}
                  </div>
                </div>
              </details>
            );
          })}
        </div>
      </div>
    </aside>
  );
}

export { SearchBox };
