import { useEffect, useMemo, useRef, useState } from 'react';
import { marked } from 'marked';

marked.setOptions({
  gfm: true,
  breaks: false,
  mangle: false,
  headerIds: false
});

let prismLoader;
let mermaidLoader;

async function loadPrism() {
  if (!prismLoader) {
    prismLoader = import('prismjs').then(async (module) => {
      await import('prismjs/components/prism-java');
      return module.default || module;
    });
  }
  return prismLoader;
}

async function loadMermaid() {
  if (!mermaidLoader) {
    mermaidLoader = import('mermaid').then((module) => {
      const mermaid = module.default || module;
      mermaid.initialize({
        startOnLoad: false,
        securityLevel: 'loose'
      });
      return mermaid;
    });
  }
  return mermaidLoader;
}

const RESOURCE_DESCRIPTIONS = {
  README: 'What this learning repo is trying to become and how to use it without getting lost.',
  BOOK: 'A book-style reading order for people who want narrative flow instead of random browsing.',
  CURRICULUM: 'Section-by-section map so similar concepts stay together and the learning path feels intentional.',
  ROADMAP_099: 'The longer curriculum direction and how this content can expand over time.',
  TOP_20_BOOKS: 'The books and references shaping the code examples, tradeoffs, and deeper explanations.',
  BOOK_MANUSCRIPT: 'A combined manuscript view when you want to read the material like one long book.',
  JAVA_7_TO_25: 'A release-by-release learning track so users can understand what changed from Java 7 through Java 25.',
  JAVA_MIGRATION_GUIDES: 'Upgrade guides for the biggest Java jumps, with what to learn, what to watch, and what to modernize.'
};

const SECTION_PROFILES = {
  sec01_fundamentals: {
    icon: 'bi bi-flag',
    hook: 'Start here if Java syntax, classes, and small methods still feel slippery.',
    problems: [
      'You can read code but still struggle to write small clear methods.',
      'Class, object, variable, and method ideas are mixing together.',
      'You want stable mental models before collections and streams.'
    ]
  },
  sec02_collections: {
    icon: 'bi bi-boxes',
    hook: 'Choose the right collection when business data starts to grow.',
    problems: [
      'You are not sure when to use List, Set, or Map.',
      'You need fast lookup but also care about ordering and duplicates.',
      'You want tradeoffs, not memorized API lists.'
    ]
  },
  sec03_generics: {
    icon: 'bi bi-diagram-3',
    hook: 'Understand why generics exist instead of only memorizing angle brackets.',
    problems: [
      'Wildcards and bounds still feel magical.',
      'You want to know what the compiler checks and what erasure removes.',
      'You need safer reusable APIs.'
    ]
  },
  sec04_streams_and_functional_style: {
    icon: 'bi bi-water',
    hook: 'Use streams when the work is really data transformation, not because the syntax looks modern.',
    problems: [
      'You want to filter, map, group, and count real business data clearly.',
      'Collectors and pipelines still feel abstract.',
      'Parallel streams look tempting but you need judgment, not hype.'
    ]
  },
  sec05_multithreading_and_concurrency: {
    icon: 'bi bi-lightning-charge',
    hook: 'Make concurrency feel owned and explainable instead of scary and invisible.',
    problems: [
      'You need tasks to finish together, fail together, or stop together.',
      'Threads, executors, virtual threads, and scopes sound related but blurry.',
      'You want real request-flow examples, not toy thread demos.'
    ]
  },
  sec06_design_patterns: {
    icon: 'bi bi-grid-3x3-gap',
    hook: 'See patterns as reusable problem shapes, not interview flashcards.',
    problems: [
      'You know the names but not when they actually help.',
      'Patterns feel overused or academic.',
      'You want small examples tied to real design pressure.'
    ]
  },
  sec07_principles_and_solid: {
    icon: 'bi bi-layers',
    hook: 'Use principles to make classes easier to change, test, and reason about.',
    problems: [
      'SOLID sounds important but still feels fuzzy in code review.',
      'Responsibilities are mixing together in one class.',
      'You want cleaner designs without ceremony.'
    ]
  },
  sec08_internal_of_jvm: {
    icon: 'bi bi-cpu',
    hook: 'Learn what the JVM is doing when Java code stops being just syntax.',
    problems: [
      'You want to understand memory, class loading, and runtime behavior.',
      'JVM terms come up in interviews but feel disconnected from daily coding.',
      'Performance and debugging start to matter.'
    ]
  },
  sec09_hidden_java_features: {
    icon: 'bi bi-stars',
    hook: 'Find the features strong Java developers use without making noise about them.',
    problems: [
      'You know the mainstream APIs but miss the small useful features.',
      'You want cleaner code with less boilerplate.',
      'You like practical upgrades that improve everyday work.'
    ]
  },
  sec10_reflection_and_metadata: {
    icon: 'bi bi-binoculars',
    hook: 'Look inside classes and metadata when frameworks stop feeling magical.',
    problems: [
      'Annotations and reflection are visible in Spring and test frameworks.',
      'You want to inspect types and metadata safely.',
      'You need to understand what happens at runtime.'
    ]
  },
  sec11_exception_handling: {
    icon: 'bi bi-shield-exclamation',
    hook: 'Handle failure in a way users, logs, and future maintainers can trust.',
    problems: [
      'You catch too much, too little, or the wrong thing.',
      'Errors lose context as they travel upward.',
      'You want failure paths to read as clearly as success paths.'
    ]
  },
  sec12_networking: {
    icon: 'bi bi-globe',
    hook: 'Connect Java code to remote systems without treating HTTP as magic.',
    problems: [
      'You need to send requests, parse responses, and reason about failures.',
      'Latency, timeout, and retries are starting to matter.',
      'You want network examples grounded in real service calls.'
    ]
  },
  sec13_io_and_data_access: {
    icon: 'bi bi-hdd-network',
    hook: 'Move data through files and databases with fewer surprises.',
    problems: [
      'You need to read, write, and persist data safely.',
      'I/O code feels boilerplate-heavy and error-prone.',
      'You want simple mental models for resource handling.'
    ]
  },
  sec14_famous_design_problems: {
    icon: 'bi bi-puzzle',
    hook: 'Practice the classic design problems that reveal how you model change.',
    problems: [
      'You want stronger system-design instincts in small codebases first.',
      'Real-world problems need tradeoffs, not textbook answers.',
      'You want design discussion grounded in Java code.'
    ]
  },
  sec15_clean_code_and_refactoring: {
    icon: 'bi bi-brush',
    hook: 'Make code easier to read under time pressure, not only in perfect examples.',
    problems: [
      'Naming and method extraction still feel subjective.',
      'You want code that ages well under change.',
      'You need refactoring habits that teams actually use.'
    ]
  },
  sec16_core_data_time_and_text: {
    icon: 'bi bi-calendar4-week',
    hook: 'Handle dates, time zones, optional values, and formatting without silent bugs.',
    problems: [
      'Text, time, and missing values keep leaking bugs into business code.',
      'You want safe examples around formatting and scheduling.',
      'The APIs are wide and easy to misuse.'
    ]
  },
  sec17_language_modeling_and_modern_types: {
    icon: 'bi bi-bezier2',
    hook: 'Model data with records, sealed types, and pattern matching in a way that clarifies intent.',
    problems: [
      'You want to express domain ideas more directly.',
      'Modern Java features feel disconnected unless seen together.',
      'You need to know when these features simplify real models.'
    ]
  },
  sec18_architecture_and_integration: {
    icon: 'bi bi-building',
    hook: 'Keep boundaries visible as your code starts to interact with modules, locales, and external systems.',
    problems: [
      'Packages and boundaries grow messy as codebases expand.',
      'Integration details leak everywhere.',
      'You want cleaner edges around modules and system behavior.'
    ]
  },
  sec19_testing_and_quality: {
    icon: 'bi bi-check2-square',
    hook: 'Use tests to protect business rules instead of writing ceremony around assertions.',
    problems: [
      'You need to test rules, not just lines of code.',
      'Some tests feel noisy and brittle.',
      'You want examples that teach design through testing.'
    ]
  },
  sec20_data_structures_and_complexity: {
    icon: 'bi bi-graph-up-arrow',
    hook: 'Learn why some code stays fast as data grows and some code collapses quietly.',
    problems: [
      'You need Big-O intuition tied to real Java collections.',
      'You want to understand resizing, collisions, and algorithm tradeoffs.',
      'Interview complexity talk should connect to production code.'
    ]
  }
};

const PLAYGROUND_LINKS = {
  jdoodle: 'https://www.jdoodle.com/online-java-compiler/',
  onecompiler: 'https://onecompiler.com/studio/java'
};

function stripMarkdown(value = '') {
  return value
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/^\s*[-*+]\s+/gm, '')
    .replace(/^\s*\d+\.\s+/gm, '')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/\|/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function truncateText(value, max = 180) {
  if (!value) {
    return '';
  }
  if (value.length <= max) {
    return value;
  }
  return `${value.slice(0, max - 1).trimEnd()}…`;
}

function sourcePathFromHref(href, repoRoot) {
  if (!href || href.startsWith('#')) {
    return null;
  }
  const decoded = decodeURIComponent(href);
  const rootMatch = repoRoot && decoded.startsWith(repoRoot)
    ? decoded.slice(repoRoot.length + 1)
    : null;
  if (rootMatch) {
    return rootMatch;
  }
  const srcIndex = decoded.indexOf('src/main/java/com/learning/javamissing/');
  if (srcIndex !== -1) {
    return decoded.slice(srcIndex);
  }
  const metaMatch = decoded.match(/(README\.md|BOOK\.md|CURRICULUM\.md|ROADMAP_099\.md|TOP_20_BOOKS\.md|BOOK_MANUSCRIPT\.md)$/);
  if (metaMatch) {
    return metaMatch[1];
  }
  return null;
}

function sourcePathToContentPath(sourcePath) {
  if (sourcePath.startsWith('src/main/java/com/learning/javamissing/')) {
    return `content/library/${sourcePath.replace('src/main/java/com/learning/javamissing/', '')}`;
  }
  if (sourcePath.endsWith('.md')) {
    return `content/meta/${sourcePath}`;
  }
  return null;
}

function parseGuide(raw) {
  const lines = raw.split('\n');
  const sections = [];
  const introLines = [];
  let title = '';
  let current = null;

  lines.forEach((line, index) => {
    const h1Match = line.match(/^#\s+(.*)/);
    if (index === 0 && h1Match) {
      title = h1Match[1].trim();
      return;
    }

    const h2Match = line.match(/^##\s+(.*)/);
    if (h2Match) {
      if (current) {
        sections.push(current);
      }
      current = { title: h2Match[1].trim(), lines: [] };
      return;
    }

    if (current) {
      current.lines.push(line);
    } else {
      introLines.push(line);
    }
  });

  if (current) {
    sections.push(current);
  }

  return {
    title,
    intro: stripMarkdown(introLines.join('\n')),
    sections: sections.map((section) => ({
      title: section.title,
      raw: section.lines.join('\n').trim(),
      plain: stripMarkdown(section.lines.join('\n'))
    }))
  };
}

function parseFrontmatter(raw = '') {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n?/);
  if (!match) {
    return { meta: {}, body: raw };
  }

  const meta = {};
  match[1].split('\n').forEach((line) => {
    const separator = line.indexOf(':');
    if (separator === -1) {
      return;
    }
    const key = line.slice(0, separator).trim();
    const value = line.slice(separator + 1).trim();
    if (key) {
      meta[key] = value;
    }
  });

  return {
    meta,
    body: raw.slice(match[0].length)
  };
}

function findGuideSection(guide, titles) {
  const normalizedTitles = titles.map((title) => title.toLowerCase());
  return guide.sections.find((section) => normalizedTitles.includes(section.title.toLowerCase()));
}

function bulletItems(raw = '') {
  return raw
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => /^[-*]\s+/.test(line))
    .map((line) => stripMarkdown(line.replace(/^[-*]\s+/, '')))
    .filter(Boolean);
}

function numberedItems(raw = '') {
  return raw
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => /^\d+\.\s+/.test(line))
    .map((line) => stripMarkdown(line.replace(/^\d+\.\s+/, '')))
    .filter(Boolean);
}

function titleFromSlug(value) {
  return value
    .replace(/^sec\d+_/, '')
    .replace(/^ch\d+_/, '')
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function parseRoute() {
  const hash = decodeURIComponent(window.location.hash.slice(1) || 'home');
  const parts = hash.split('/').filter(Boolean);
  if (!parts.length || parts[0] === 'home') {
    return { type: 'home' };
  }
  if (parts[0] === 'resource' && parts[1]) {
    return { type: 'resource', slug: parts[1] };
  }
  if (parts[0] === 'section' && parts[1]) {
    return { type: 'section', sectionSlug: parts[1] };
  }
  if (parts[0] === 'chapter' && parts[1] && parts[2]) {
    return { type: 'chapter', sectionSlug: parts[1], chapterSlug: parts[2] };
  }
  if (parts[0] === 'topic' && parts[1] && parts[2] && parts[3]) {
    return { type: 'topic', sectionSlug: parts[1], chapterSlug: parts[2], topicSlug: parts[3] };
  }
  return { type: 'home' };
}

function useHashRoute() {
  const [route, setRoute] = useState(() => parseRoute());

  useEffect(() => {
    const onHashChange = () => setRoute(parseRoute());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  return route;
}

function parseTopicMeta(code) {
  const meta = {
    concept: '',
    why: '',
    problem: '',
    realWorld: '',
    mentalModel: '',
    howToCode: '',
    expectedOutput: ''
  };

  const match = code.match(/\/\*\*?([\s\S]*?)\*\//);
  if (!match) {
    return meta;
  }

  const lines = match[1]
    .split('\n')
    .map((line) => line.replace(/^\s*\*\s?/, '').trim())
    .filter(Boolean);

  const labelMap = [
    { key: 'concept', labels: ['concept'] },
    { key: 'why', labels: ['why this concept is needed', 'why this is needed'] },
    { key: 'problem', labels: ['what problem this solves', 'real-world problem'] },
    { key: 'realWorld', labels: ['real-world setup', 'real-world example'] },
    { key: 'mentalModel', labels: ['how to think about it', 'mental model'] },
    { key: 'howToCode', labels: ['how to code it'] },
    { key: 'expectedOutput', labels: ['expected output'] }
  ];

  let currentKey = '';
  lines.forEach((line) => {
    const label = labelMap.find((entry) => entry.labels.some((candidate) => line.toLowerCase().startsWith(`${candidate}:`)));
    if (label) {
      currentKey = label.key;
      meta[currentKey] = line.slice(line.indexOf(':') + 1).trim();
      return;
    }
    if (currentKey) {
      meta[currentKey] = `${meta[currentKey]} ${line}`.trim();
    }
  });

  return meta;
}

function extractPrintedValue(code, label) {
  const inline = code.match(new RegExp(`System\\.out\\.println\\("${label}:\\s*(.*)"\\);`));
  if (inline && inline[1]) {
    return inline[1].trim();
  }

  const lines = code.split('\n');
  const startIndex = lines.findIndex((line) => line.includes(`System.out.println("${label}:`) || line.includes(`System.out.println("${label}")`));
  if (startIndex === -1) {
    return '';
  }

  const collected = [];
  for (let index = startIndex + 1; index < lines.length; index += 1) {
    const line = lines[index].trim();
    const bullet = line.match(/System\.out\.println\("-\s*(.*)"\);/);
    if (bullet) {
      collected.push(bullet[1].trim());
      continue;
    }
    if (collected.length) {
      break;
    }
    if (line.startsWith('System.out.println("')) {
      break;
    }
  }
  return collected.join(' ');
}

function extractAfterReadingTakeaways(code) {
  const lines = code.split('\n');
  const markerIndex = lines.findIndex((line) => line.includes('After reading this example, you should know:'));
  if (markerIndex === -1) {
    return [];
  }
  const takeaways = [];
  for (let index = markerIndex + 1; index < lines.length; index += 1) {
    const line = lines[index];
    const match = line.match(/System\.out\.println\("-(.*)"\);/);
    if (!match) {
      if (takeaways.length) {
        break;
      }
      continue;
    }
    takeaways.push(match[1].trim());
  }
  return takeaways;
}

function extractCodePreview(raw) {
  const meta = parseTopicMeta(raw);
  return {
    ...meta,
    takeaways: extractAfterReadingTakeaways(raw),
    storyHook: extractPrintedValue(raw, 'Story hook'),
    useWhen: extractPrintedValue(raw, 'Use this when'),
    avoidWhen: extractPrintedValue(raw, 'Avoid this when'),
    commonMistake: extractPrintedValue(raw, 'Common mistake'),
    watchOut: extractPrintedValue(raw, 'Watch out'),
    whyThisWorks: extractPrintedValue(raw, 'Why this works'),
    tryThisNext: extractPrintedValue(raw, 'Try this next'),
    previewRequired: /StructuredTaskScope|ScopedValue/.test(raw)
  };
}

function effectiveRunner(preview, lessonMeta = {}) {
  if (lessonMeta.runner) {
    return lessonMeta.runner;
  }
  return preview.previewRequired ? 'local' : 'embedded';
}

function SearchBox({ entries }) {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);

  const matches = useMemo(() => {
    if (!query.trim()) {
      return [];
    }
    const normalized = query.trim().toLowerCase();
    return entries
      .filter((entry) => entry.label.toLowerCase().includes(normalized) || entry.meta.toLowerCase().includes(normalized))
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

  return (
    <div ref={wrapRef} className="position-relative search-wrap flex-grow-1">
      <i className="bi bi-search search-icon" />
      <input
        id="site-search"
        className="form-control search-input"
        type="search"
        placeholder="Search a problem, chapter, topic, or section"
        value={query}
        onFocus={() => setOpen(true)}
        onChange={(event) => {
          setQuery(event.target.value);
          setOpen(true);
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
              <small className="text-muted">{entry.meta}</small>
            </a>
          )) : (
            <div className="list-group-item text-muted">No matches found.</div>
          )}
        </div>
      ) : null}
    </div>
  );
}

function Sidebar({ sections, activeRoute }) {
  return (
    <aside className="col-12 col-xl-3 sidebar-column border-end">
      <div className="sidebar-panel">
        <div className="sidebar-intro">
          <p className="eyebrow mb-2">Learning Book</p>
          <h1 className="sidebar-title mb-2">Start with a problem, not a file tree.</h1>
          <p className="sidebar-text mb-0">
            Each section groups related ideas. Each chapter should answer what problem the concept solves,
            how to code it, and what to expect when you run it.
          </p>
        </div>
        <div className="accordion accordion-flush sidebar-accordion" id="sidebar-nav">
          {sections.map((section, index) => {
            const profile = SECTION_PROFILES[section.slug] || {};
            return (
              <div className="accordion-item" key={section.slug}>
                <h2 className="accordion-header" id={`heading-${section.slug}`}>
                  <button
                    className={`accordion-button ${index === 0 ? '' : 'collapsed'}`}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#collapse-${section.slug}`}
                    aria-expanded={index === 0 ? 'true' : 'false'}
                  >
                    <span>{section.title}</span>
                  </button>
                </h2>
                <div
                  id={`collapse-${section.slug}`}
                  className={`accordion-collapse collapse ${index === 0 ? 'show' : ''}`}
                  data-bs-parent="#sidebar-nav"
                >
                  <div className="accordion-body">
                    <a
                      className={`nav-link-card nav-link-section mb-3 ${activeRoute === `#section/${section.slug}` ? 'active' : ''}`}
                      href={`#section/${section.slug}`}
                    >
                      <div className="d-flex align-items-center gap-2 mb-2">
                        {profile.icon ? <i className={`${profile.icon} section-icon`} /> : null}
                        <div className="fw-semibold">{section.title}</div>
                      </div>
                      <small>{profile.hook || 'Open the section guide and chapter roadmap.'}</small>
                    </a>
                    <div className="nav-link-list">
                      {section.chapters.map((chapter) => {
                        const route = `#chapter/${section.slug}/${chapter.slug}`;
                        return (
                          <a className={`nav-link-card ${activeRoute === route ? 'active' : ''}`} href={route} key={chapter.slug}>
                            <div className="d-flex justify-content-between align-items-start gap-3">
                              <div>
                                <div className="fw-semibold">{chapter.title}</div>
                                <small>{chapter.topics.length} topic{chapter.topics.length === 1 ? '' : 's'}</small>
                              </div>
                              <span className="badge rounded-pill badge-soft">{chapter.slug}</span>
                            </div>
                          </a>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </aside>
  );
}

function HeaderPanel({ title, eyebrow, summary, sourcePath, actions }) {
  return (
    <div className="hero-panel">
      <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-start gap-4">
        <div className="hero-copy">
          <div className="eyebrow mb-2">{eyebrow}</div>
          <h1 className="page-title">{title}</h1>
          {summary ? <p className="hero-summary mb-0">{summary}</p> : null}
          {sourcePath ? <div className="source-path">{sourcePath}</div> : null}
        </div>
        {actions ? <div className="d-flex flex-wrap gap-2 topic-actions">{actions}</div> : null}
      </div>
    </div>
  );
}

function MarkdownBlock({ html, manifest }) {
  const ref = useRef(null);

  useEffect(() => {
    let cancelled = false;

    async function enhanceBlock() {
      if (!ref.current) {
        return;
      }

      ref.current.querySelectorAll('a[href]').forEach((anchor) => {
        const href = anchor.getAttribute('href');
        const sourcePath = sourcePathFromHref(href, manifest.repoRoot);
        if (!sourcePath) {
          if (/^https?:\/\//.test(href)) {
            anchor.target = '_blank';
            anchor.rel = 'noreferrer';
          }
          return;
        }
        if (manifest.sourceToRoute.has(sourcePath)) {
          anchor.setAttribute('href', manifest.sourceToRoute.get(sourcePath));
        } else {
          const contentPath = sourcePathToContentPath(sourcePath);
          if (contentPath) {
            anchor.setAttribute('href', contentPath);
            anchor.setAttribute('target', '_blank');
            anchor.setAttribute('rel', 'noreferrer');
          }
        }
      });

      const mermaidBlocks = ref.current.querySelectorAll('pre > code.language-mermaid');
      if (mermaidBlocks.length) {
        mermaidBlocks.forEach((code) => {
          const wrapper = document.createElement('div');
          wrapper.className = 'mermaid';
          wrapper.textContent = code.textContent;
          code.parentElement.replaceWith(wrapper);
        });
        const mermaid = await loadMermaid();
        if (!cancelled) {
          mermaid.run({
            querySelector: '.mermaid'
          }).catch(() => {});
        }
      }

      const prism = await loadPrism();
      if (!cancelled && ref.current) {
        prism.highlightAllUnder(ref.current);
      }
    }

    enhanceBlock();

    return () => {
      cancelled = true;
    };
  }, [html, manifest]);

  return <div ref={ref} className="content-markdown" dangerouslySetInnerHTML={{ __html: html }} />;
}

function CodeBlock({ code }) {
  const ref = useRef(null);

  useEffect(() => {
    let cancelled = false;

    async function highlight() {
      const prism = await loadPrism();
      if (!cancelled && ref.current) {
        prism.highlightElement(ref.current);
      }
    }

    highlight();
    return () => {
      cancelled = true;
    };
  }, [code]);

  return <pre className="mb-0"><code ref={ref} className="language-java">{code}</code></pre>;
}

function InsightCard({ icon, title, children }) {
  return (
    <div className="insight-card">
      <div className="d-flex align-items-center gap-2 mb-2">
        {icon ? <i className={`${icon} insight-icon`} /> : null}
        <h3 className="h6 mb-0">{title}</h3>
      </div>
      <div className="muted-copy mb-0">{children}</div>
    </div>
  );
}

function CalloutCard({ tone = 'story', eyebrow, title, children }) {
  return (
    <div className={`callout-card callout-${tone}`}>
      <div className="eyebrow mb-2">{eyebrow}</div>
      <h3 className="h5 mb-2">{title}</h3>
      <div className="muted-copy mb-0">{children}</div>
    </div>
  );
}

function BulletList({ items }) {
  if (!items.length) {
    return <p className="muted-copy mb-0">Open the chapter guide for the full explanation.</p>;
  }
  return (
    <ul className="reading-list mb-0">
      {items.map((item) => <li key={item}>{item}</li>)}
    </ul>
  );
}

function HomePage({ manifest }) {
  const featuredSections = manifest.sections.slice(0, 6);
  const learningJourneys = [
    { title: 'I am starting from zero', sectionSlug: 'sec01_fundamentals' },
    { title: 'I want data handling judgment', sectionSlug: 'sec02_collections' },
    { title: 'I want stream confidence', sectionSlug: 'sec04_streams_and_functional_style' },
    { title: 'I want concurrency clarity', sectionSlug: 'sec05_multithreading_and_concurrency' },
    { title: 'I want cleaner design', sectionSlug: 'sec06_design_patterns' },
    { title: 'I want complexity + DSA intuition', sectionSlug: 'sec20_data_structures_and_complexity' }
  ]
    .map((item) => ({
      ...item,
      section: manifest.sections.find((section) => section.slug === item.sectionSlug)
    }))
    .filter((item) => item.section);

  return (
    <>
      <div className="hero-panel hero-home mb-4">
        <div className="row g-4 align-items-end">
          <div className="col-xl-7">
            <p className="eyebrow mb-2">Java Learning Site</p>
            <h1 className="display-title">Learn Java by solving real problems, not by opening random files.</h1>
            <p className="display-subtitle mb-4">
              This site should read more like a strong technical blog series or a practical book:
              start with the situation, show the pressure, explain the concept, run the code, and make the output understandable.
            </p>
            <div className="d-flex flex-wrap gap-2">
              <a className="btn btn-dark rounded-pill px-4" href="#section/sec01_fundamentals">Start With Fundamentals</a>
              <a className="btn btn-outline-dark rounded-pill px-4" href="#resource/BOOK">Read The Book Order</a>
              <a className="btn btn-outline-dark rounded-pill px-4" href="#resource/BOOK_MANUSCRIPT">Open Combined Manuscript</a>
            </div>
          </div>
          <div className="col-xl-5">
            <div className="story-strip">
              <div className="story-card story-card-strong">
                <div className="eyebrow mb-2">What makes this different</div>
                <h3 className="h5">Hook first. Problem first. Code second. Output always.</h3>
                <p className="muted-copy mb-0">
                  The site should not feel like a Javadoc shelf. Each chapter should earn attention by showing the real need before the syntax.
                </p>
              </div>
              <div className="story-card">
                <div className="stat-number">{manifest.stats.sections}</div>
                <div className="muted-copy">Sections grouped like a book</div>
              </div>
              <div className="story-card">
                <div className="stat-number">{manifest.stats.chapters}</div>
                <div className="muted-copy">Chapters with guides and revisions</div>
              </div>
              <div className="story-card">
                <div className="stat-number">{manifest.stats.topics}</div>
                <div className="muted-copy">Runnable Java topic files</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="content-card">
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
          <h2 className="page-title mb-0">Pick A Learning Journey</h2>
          <span className="badge rounded-pill badge-soft">Problem-first paths</span>
        </div>
        <div className="journey-grid">
          {learningJourneys.map(({ title, section }) => {
            const profile = SECTION_PROFILES[section.slug] || {};
            return (
              <a className="journey-card text-decoration-none text-reset" href={`#section/${section.slug}`} key={section.slug}>
                <div className="d-flex align-items-center gap-2 mb-2">
                  {profile.icon ? <i className={`${profile.icon} section-icon`} /> : null}
                  <span className="badge rounded-pill badge-soft">{section.slug}</span>
                </div>
                <h3 className="h5 mb-2">{title}</h3>
                <p className="muted-copy mb-3">{profile.hook || `Open ${section.title} as a guided starting point.`}</p>
                <BulletList items={profile.problems?.slice(0, 2) || []} />
              </a>
            );
          })}
        </div>
      </div>

      <div className="content-card">
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
          <h2 className="page-title mb-0">Browse By Section</h2>
          <span className="badge rounded-pill badge-soft">Book-style navigation</span>
        </div>
        <div className="section-grid">
          {featuredSections.map((section) => {
            const profile = SECTION_PROFILES[section.slug] || {};
            return (
              <a className="chapter-card section-spotlight text-decoration-none text-reset" href={`#section/${section.slug}`} key={section.slug}>
                <div className="d-flex justify-content-between align-items-start gap-3 mb-3">
                  <span className="badge rounded-pill badge-soft">{section.slug}</span>
                  <small className="text-muted">{section.chapters.length} chapter{section.chapters.length === 1 ? '' : 's'}</small>
                </div>
                <h3 className="h5 mb-2">{section.title}</h3>
                <p className="muted-copy mb-3">{profile.hook || 'Open the section guide and chapter roadmap.'}</p>
                <BulletList items={profile.problems?.slice(0, 3) || section.chapters.slice(0, 3).map((chapter) => chapter.title)} />
              </a>
            );
          })}
        </div>
      </div>

      <div className="content-card">
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
          <h2 className="page-title mb-0">Core Resources</h2>
          <span className="badge rounded-pill badge-soft">Book + curriculum + references</span>
        </div>
        <div className="resource-grid">
          {manifest.resources.map((resource) => (
            <a className="resource-card text-decoration-none text-reset" href={`#resource/${resource.slug}`} key={resource.slug}>
              <div className="eyebrow mb-2">Reference</div>
              <h3 className="h5 mb-2">{resource.title}</h3>
              <p className="muted-copy mb-0">{RESOURCE_DESCRIPTIONS[resource.slug] || 'Open the original markdown behind this learning site.'}</p>
            </a>
          ))}
        </div>
      </div>
    </>
  );
}

function PageLayout({ header, children }) {
  return (
    <>
      <div className="page-header">{header}</div>
      {children}
    </>
  );
}

function ChapterStoryCards({ guide }) {
  const problem = findGuideSection(guide, ['What Problem This Chapter Solves', 'The Problem', 'Mini Case Study', 'The Story']);
  const studyOrder = findGuideSection(guide, ['Study Order', 'Run This First']);
  const whenToUse = findGuideSection(guide, ['When To Use', 'Use This Chapter When', 'Use This When']);
  const compare = findGuideSection(guide, ['Compare With', 'Common Confusion', 'What To Look For']);

  return (
    <div className="insight-grid mb-4">
      <InsightCard icon="bi bi-bullseye" title="Start With The Problem">
        {truncateText(problem?.plain || guide.intro || 'Open the chapter guide for the real-world setup behind this concept.', 260)}
      </InsightCard>
      <InsightCard icon="bi bi-signpost-2" title="How To Read This Chapter">
        <BulletList items={numberedItems(studyOrder?.raw || '')} />
      </InsightCard>
      <InsightCard icon="bi bi-check2-circle" title="Use This When">
        <BulletList items={bulletItems(whenToUse?.raw || '')} />
      </InsightCard>
      <InsightCard icon="bi bi-shuffle" title="Important Tradeoffs">
        <BulletList items={bulletItems(compare?.raw || '')} />
      </InsightCard>
    </div>
  );
}

function TopicPreviewCard({ section, chapter, topic }) {
  const summary = truncateText(
    topic.preview.storyHook
      || topic.preview.problem
      || topic.preview.why
      || topic.preview.realWorld
      || topic.preview.mentalModel
      || topic.sourcePath.split('/topics/')[1],
    180
  );
  return (
    <a className="topic-card topic-teaser text-decoration-none text-reset" href={`#topic/${section.slug}/${chapter.slug}/${topic.slug}`} key={topic.slug}>
      <div className="d-flex justify-content-between align-items-start gap-3 mb-2">
        <span className="badge rounded-pill badge-soft">{topic.preview.concept || topic.concept}</span>
        {topic.lessonMeta?.introduced ? <span className="badge rounded-pill badge-soft">{topic.lessonMeta.introduced}</span> : null}
        {topic.preview.previewRequired ? <span className="badge rounded-pill badge-warning-soft">JDK 25 preview</span> : null}
      </div>
      <h3 className="h5 mb-2">{topic.title}</h3>
      <p className="muted-copy mb-3">{summary}</p>
      {topic.preview.storyHook ? <div className="topic-story-hook mb-2">{topic.preview.storyHook}</div> : null}
      <div className="topic-kicker">Real-world setup: {topic.preview.realWorld || 'Open the file to see the scenario and code walkthrough.'}</div>
    </a>
  );
}

function QuickLinkRail() {
  const links = [
    { label: 'Start Here', href: '#section/sec01_fundamentals' },
    { label: 'Java 7 to 25', href: '#resource/JAVA_7_TO_25' },
    { label: 'Streams', href: '#section/sec04_streams_and_functional_style' },
    { label: 'Concurrency', href: '#section/sec05_multithreading_and_concurrency' },
    { label: 'Design Patterns', href: '#section/sec06_design_patterns' },
    { label: 'Complexity', href: '#section/sec20_data_structures_and_complexity' }
  ];

  return (
    <div className="quick-link-rail">
      {links.map((link) => (
        <a key={link.href} className="quick-link-chip" href={link.href}>{link.label}</a>
      ))}
    </div>
  );
}

function submitToJdoodle(code) {
  const form = document.createElement('form');
  form.method = 'post';
  form.action = 'https://www.jdoodle.com/api/redirect-to-post/online-java-compiler';
  form.target = '_blank';
  form.style.display = 'none';

  const textarea = document.createElement('textarea');
  textarea.name = 'initScript';
  textarea.value = code;
  form.appendChild(textarea);

  document.body.appendChild(form);
  form.submit();
  document.body.removeChild(form);
}

function TopicActionButtons({ code, previewRequired, runner }) {
  const [copyState, setCopyState] = useState('idle');

  async function onCopy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopyState('copied');
      window.setTimeout(() => setCopyState('idle'), 1500);
    } catch {
      setCopyState('failed');
      window.setTimeout(() => setCopyState('idle'), 1500);
    }
  }

  return (
    <>
      <button className="btn btn-dark btn-sm rounded-pill" type="button" onClick={onCopy}>
        {copyState === 'copied' ? 'Copied' : copyState === 'failed' ? 'Copy failed' : 'Copy code'}
      </button>
      {runner === 'embedded' ? (
        <button className="btn btn-outline-dark btn-sm rounded-pill" type="button" onClick={() => submitToJdoodle(code)}>
          Run In JDoodle
        </button>
      ) : (
        <a className="btn btn-outline-dark btn-sm rounded-pill" href={PLAYGROUND_LINKS.jdoodle} target="_blank" rel="noreferrer">
          Open JDoodle
        </a>
      )}
      <a className="btn btn-outline-dark btn-sm rounded-pill" href={PLAYGROUND_LINKS.onecompiler} target="_blank" rel="noreferrer">
        Open OneCompiler
      </a>
      {runner === 'local' ? <span className="playground-note">This example is best run locally, usually because of newer or preview Java features.</span> : null}
    </>
  );
}

export default function App() {
  const route = useHashRoute();
  const [manifest, setManifest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const contentCache = useRef(new Map());

  useEffect(() => {
    async function loadManifest() {
      try {
        const response = await fetch('data/site.json');
        if (!response.ok) {
          throw new Error('Failed to load site manifest');
        }
        const data = await response.json();
        const sourceToRoute = new Map();
        data.resources.forEach((resource) => sourceToRoute.set(resource.sourcePath, `#resource/${resource.slug}`));
        data.sections.forEach((section) => {
          sourceToRoute.set(section.guide.sourcePath, `#section/${section.slug}`);
          section.chapters.forEach((chapter) => {
            sourceToRoute.set(chapter.guide.sourcePath, `#chapter/${section.slug}/${chapter.slug}`);
            sourceToRoute.set(chapter.revision.sourcePath, `#chapter/${section.slug}/${chapter.slug}`);
            sourceToRoute.set(chapter.runChapter.sourcePath, `#chapter/${section.slug}/${chapter.slug}`);
            sourceToRoute.set(chapter.runAllTopics.sourcePath, `#chapter/${section.slug}/${chapter.slug}`);
            chapter.topics.forEach((topic) => {
              sourceToRoute.set(topic.sourcePath, `#topic/${section.slug}/${chapter.slug}/${topic.slug}`);
              if (topic.guide) {
                sourceToRoute.set(topic.guide.sourcePath, `#topic/${section.slug}/${chapter.slug}/${topic.slug}`);
              }
            });
          });
        });
        data.sourceToRoute = sourceToRoute;
        setManifest(data);
      } catch (loadError) {
        setError(loadError.message);
      } finally {
        setLoading(false);
      }
    }
    loadManifest();
  }, []);

  const searchEntries = useMemo(() => {
    if (!manifest) {
      return [];
    }
    const entries = [];
    manifest.resources.forEach((resource) => {
      entries.push({ label: resource.title, meta: 'Resource', route: `#resource/${resource.slug}` });
    });
    manifest.sections.forEach((section) => {
      entries.push({ label: section.title, meta: 'Section', route: `#section/${section.slug}` });
      section.chapters.forEach((chapter) => {
        entries.push({ label: chapter.title, meta: `${section.title} · Chapter`, route: `#chapter/${section.slug}/${chapter.slug}` });
        chapter.topics.forEach((topic) => {
          entries.push({
            label: topic.title,
            meta: `${chapter.title} · Topic`,
            route: `#topic/${section.slug}/${chapter.slug}/${topic.slug}`
          });
        });
      });
    });
    return entries;
  }, [manifest]);

  async function fetchText(path) {
    if (contentCache.current.has(path)) {
      return contentCache.current.get(path);
    }
    const response = await fetch(path);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${path}`);
    }
    const text = await response.text();
    contentCache.current.set(path, text);
    return text;
  }

  const activeRoute = route.type === 'section'
    ? `#section/${route.sectionSlug}`
    : route.type === 'chapter'
      ? `#chapter/${route.sectionSlug}/${route.chapterSlug}`
      : route.type === 'topic'
        ? `#chapter/${route.sectionSlug}/${route.chapterSlug}`
        : '';

  if (loading) {
    return <div className="content-card empty-state m-4">Loading content…</div>;
  }

  if (error || !manifest) {
    return <div className="content-card empty-state m-4">{error || 'Unknown error'}</div>;
  }

  return (
    <div className="site-shell">
      <header className="site-header border-bottom">
        <nav className="navbar navbar-expand-lg px-3 px-lg-4 py-3">
          <div className="container-fluid px-0">
            <a className="navbar-brand fw-semibold" href="#home">Java Missing Book</a>
            <div className="ms-lg-4 flex-grow-1 d-flex align-items-center gap-3">
              <SearchBox entries={searchEntries} />
              <div className="d-none d-lg-flex align-items-center gap-2">
                <a className="btn btn-outline-dark btn-sm rounded-pill" href="#resource/BOOK">Book Order</a>
                <a className="btn btn-outline-dark btn-sm rounded-pill" href="#resource/CURRICULUM">Curriculum</a>
                <a className="btn btn-outline-dark btn-sm rounded-pill" href="#resource/TOP_20_BOOKS">Sources</a>
              </div>
            </div>
          </div>
        </nav>
        <div className="px-3 px-lg-4 pb-3">
          <QuickLinkRail />
        </div>
      </header>

      <main className="container-fluid">
        <div className="row gx-0">
          <Sidebar sections={manifest.sections} activeRoute={activeRoute} />
          <section className="col-12 col-xl-9 content-column">
            <div className="content-wrap">
              <RouteRenderer route={route} manifest={manifest} fetchText={fetchText} />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

function RouteRenderer({ route, manifest, fetchText }) {
  const [content, setContent] = useState({ status: 'loading', data: null, error: '' });

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setContent({ status: 'loading', data: null, error: '' });
      try {
        if (route.type === 'home') {
          if (!cancelled) {
            setContent({ status: 'ready', data: { type: 'home' }, error: '' });
          }
          return;
        }

        if (route.type === 'resource') {
          const resource = manifest.resources.find((item) => item.slug === route.slug);
          if (!resource) {
            throw new Error(`Unknown resource: ${route.slug}`);
          }
          const raw = await fetchText(resource.contentPath);
          if (!cancelled) {
            setContent({ status: 'ready', data: { type: 'resource', resource, raw }, error: '' });
          }
          return;
        }

        const section = manifest.sections.find((item) => item.slug === route.sectionSlug);
        if (!section) {
          throw new Error(`Unknown section: ${route.sectionSlug}`);
        }

        if (route.type === 'section') {
          const raw = await fetchText(section.guide.contentPath);
          if (!cancelled) {
            setContent({ status: 'ready', data: { type: 'section', section, raw }, error: '' });
          }
          return;
        }

        const chapter = section.chapters.find((item) => item.slug === route.chapterSlug);
        if (!chapter) {
          throw new Error(`Unknown chapter: ${route.chapterSlug}`);
        }

        if (route.type === 'chapter') {
          const topicRequests = chapter.topics.flatMap((topic) => (
            topic.guide
              ? [fetchText(topic.contentPath), fetchText(topic.guide.contentPath)]
              : [fetchText(topic.contentPath)]
          ));

          const [guideRaw, revisionRaw, ...topicPayloads] = await Promise.all([
            fetchText(chapter.guide.contentPath),
            fetchText(chapter.revision.contentPath),
            ...topicRequests
          ]);

          let pointer = 0;
          const topics = chapter.topics.map((topic) => {
            const raw = topicPayloads[pointer];
            pointer += 1;
            let lessonRaw = '';
            let lessonMeta = {};
            if (topic.guide) {
              const lesson = parseFrontmatter(topicPayloads[pointer]);
              lessonRaw = lesson.body;
              lessonMeta = lesson.meta;
              pointer += 1;
            }

            return {
              ...topic,
              raw,
              lessonRaw,
              lessonMeta,
              preview: extractCodePreview(raw)
            };
          });

          if (!cancelled) {
            setContent({
              status: 'ready',
              data: { type: 'chapter', section, chapter: { ...chapter, topics }, guideRaw, revisionRaw },
              error: ''
            });
          }
          return;
        }

        const topic = chapter.topics.find((item) => item.slug === route.topicSlug);
        if (!topic) {
          throw new Error(`Unknown topic: ${route.topicSlug}`);
        }
        const topicPayloads = [fetchText(topic.contentPath)];
        if (topic.guide) {
          topicPayloads.push(fetchText(topic.guide.contentPath));
        }
        const [raw, lessonSource = ''] = await Promise.all(topicPayloads);
        const lesson = parseFrontmatter(lessonSource);
        if (!cancelled) {
          setContent({
            status: 'ready',
            data: {
              type: 'topic',
              section,
              chapter,
              topic,
              raw,
              lessonRaw: lesson.body,
              lessonMeta: lesson.meta,
              preview: extractCodePreview(raw)
            },
            error: ''
          });
        }
      } catch (loadError) {
        if (!cancelled) {
          setContent({ status: 'error', data: null, error: loadError.message });
        }
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [route, manifest, fetchText]);

  if (content.status === 'loading') {
    return <div className="content-card empty-state">Loading content…</div>;
  }

  if (content.status === 'error') {
    return <div className="content-card empty-state">{content.error}</div>;
  }

  const data = content.data;
  if (data.type === 'home') {
    return <HomePage manifest={manifest} />;
  }

  if (data.type === 'resource') {
    return (
      <PageLayout
        header={(
          <HeaderPanel
            title={data.resource.title}
            eyebrow="Reference"
            summary={RESOURCE_DESCRIPTIONS[data.resource.slug] || 'Read the source markdown behind this part of the site.'}
            sourcePath={data.resource.sourcePath}
          />
        )}
      >
        <div className="content-card">
          <MarkdownBlock html={marked.parse(data.raw)} manifest={manifest} />
        </div>
      </PageLayout>
    );
  }

  if (data.type === 'section') {
    const guide = parseGuide(data.raw);
    const profile = SECTION_PROFILES[data.section.slug] || {};
    const why = findGuideSection(guide, ['Why This Section Matters', 'What Real Problems This Section Solves', 'The Story']);
    const beforeStart = findGuideSection(guide, ['Before You Start', 'Start Here If']);
    const howToRead = findGuideSection(guide, ['How To Read This Section', 'How To Read This Section']);

    return (
      <PageLayout
        header={(
          <HeaderPanel
            title={data.section.title}
            eyebrow="Section"
            summary={profile.hook || truncateText(why?.plain || guide.intro || 'Open this section to see the main problems and chapters collected together.', 240)}
            sourcePath={data.section.guide.sourcePath}
          />
        )}
      >
        <div className="insight-grid mb-4">
          <InsightCard icon="bi bi-lightbulb" title="Why This Section Exists">
            {truncateText(why?.plain || guide.intro || 'This section groups related ideas so the learning path feels coherent.', 240)}
          </InsightCard>
          <InsightCard icon="bi bi-play-circle" title="Start Here If">
            <BulletList items={profile.problems || bulletItems(beforeStart?.raw || '')} />
          </InsightCard>
          <InsightCard icon="bi bi-compass" title="How To Read It">
            <BulletList items={bulletItems(howToRead?.raw || '')} />
          </InsightCard>
          <InsightCard icon="bi bi-arrow-right-circle" title="Suggested Next Move">
            {truncateText(findGuideSection(guide, ['Recommended Next Step'])?.plain || 'Pick the chapter that matches the problem you are trying to solve right now.', 220)}
          </InsightCard>
        </div>
        <div className="content-card">
          <MarkdownBlock html={marked.parse(data.raw)} manifest={manifest} />
        </div>
        <div className="content-card">
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
            <h2 className="page-title mb-0">Chapters In This Section</h2>
            <span className="badge rounded-pill badge-soft">{data.section.chapters.length} total</span>
          </div>
          <div className="chapter-grid">
            {data.section.chapters.map((chapter) => (
              <a className="chapter-card text-decoration-none text-reset" href={`#chapter/${data.section.slug}/${chapter.slug}`} key={chapter.slug}>
                <div className="d-flex justify-content-between align-items-start gap-3 mb-2">
                  <span className="badge rounded-pill badge-soft">{chapter.slug}</span>
                  <small className="text-muted">{chapter.topics.length} topic{chapter.topics.length === 1 ? '' : 's'}</small>
                </div>
                <h3 className="h5 mb-2">{chapter.title}</h3>
                <p className="muted-copy mb-0">Open the guide, revision sheet, and runnable Java topics for this chapter.</p>
              </a>
            ))}
          </div>
        </div>
      </PageLayout>
    );
  }

  if (data.type === 'chapter') {
    const guide = parseGuide(data.guideRaw);
    const revision = parseGuide(data.revisionRaw);
    const problem = findGuideSection(guide, ['What Problem This Chapter Solves', 'The Problem', 'Mini Case Study', 'The Story']);
    const quickSummary = findGuideSection(guide, ['Quick Summary', 'What To Look For']);
    const avoidSection = findGuideSection(guide, ['When Not To Use', 'Avoid This Pattern When', 'Avoid This When', 'Watch Out']);
    const nextSection = findGuideSection(guide, ['Recommended Next Step', 'Try This Next']);

    return (
      <PageLayout
        header={(
          <HeaderPanel
            title={data.chapter.title}
            eyebrow={`${data.section.title} · Chapter`}
            summary={truncateText(problem?.plain || guide.intro || quickSummary?.plain || 'Use this chapter to understand the concept, then run the topic files.', 240)}
            sourcePath={data.chapter.guide.sourcePath}
            actions={(
              <>
                <a className="btn btn-outline-dark btn-sm rounded-pill" href={data.chapter.runChapter.contentPath} target="_blank" rel="noreferrer">RunChapter.java</a>
                <a className="btn btn-outline-dark btn-sm rounded-pill" href={data.chapter.runAllTopics.contentPath} target="_blank" rel="noreferrer">RunAllTopics.java</a>
                <a className="btn btn-dark btn-sm rounded-pill" href={`#section/${data.section.slug}`}>Back To Section</a>
              </>
            )}
          />
        )}
      >
        <ChapterStoryCards guide={guide} />
        <div className="callout-grid mb-4">
          <CalloutCard tone="story" eyebrow="Problem Pressure" title="The Story">
            {truncateText(problem?.plain || guide.intro || 'Start by understanding the design pressure before thinking about pattern names.', 260)}
          </CalloutCard>
          <CalloutCard tone="caution" eyebrow="Watch Out" title="Avoid Ceremony">
            {truncateText(avoidSection?.plain || 'Do not add a pattern if the simpler code is already readable and stable.', 240)}
          </CalloutCard>
          <CalloutCard tone="next" eyebrow="Next Step" title="Read Forward">
            {truncateText(nextSection?.plain || 'Run the first topic file, compare the output, then use the revision sheet to lock in the decision rule.', 220)}
          </CalloutCard>
        </div>
        <div className="content-card">
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
            <h2 className="page-title mb-0">Start With These Examples</h2>
            <span className="badge rounded-pill badge-soft">{data.chapter.topics.length} runnable topic{data.chapter.topics.length === 1 ? '' : 's'}</span>
          </div>
          <div className="topic-grid">
            {data.chapter.topics.map((topic) => (
              <TopicPreviewCard section={data.section} chapter={data.chapter} topic={topic} key={topic.slug} />
            ))}
          </div>
        </div>
        <div className="content-card">
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
            <h2 className="page-title mb-0">Chapter Guide</h2>
            <span className="badge rounded-pill badge-soft">Read this after the first example</span>
          </div>
          <MarkdownBlock html={marked.parse(data.guideRaw)} manifest={manifest} />
        </div>
        <div className="content-card">
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
            <h2 className="page-title mb-0">Revision Sheet</h2>
            <span className="badge rounded-pill badge-soft">{truncateText(revision.intro || 'Use this for quick recap after running the examples.', 100)}</span>
          </div>
          <MarkdownBlock html={marked.parse(data.revisionRaw)} manifest={manifest} />
        </div>
      </PageLayout>
    );
  }

  const topicSummary = data.preview;
  return (
    <PageLayout
      header={(
        <HeaderPanel
          title={data.topic.title}
          eyebrow={`${data.section.title} · ${data.chapter.title}`}
          summary={truncateText(topicSummary.problem || topicSummary.why || topicSummary.realWorld || topicSummary.mentalModel || 'Read the setup first, then scroll into the Java code.', 240)}
          sourcePath={data.topic.sourcePath}
          actions={(
            <>
              <a className="btn btn-outline-dark btn-sm rounded-pill" href={`#chapter/${data.section.slug}/${data.chapter.slug}`}>Back To Chapter</a>
              <TopicActionButtons code={data.raw} previewRequired={topicSummary.previewRequired} runner={effectiveRunner(topicSummary, data.lessonMeta)} />
            </>
          )}
        />
      )}
      >
      {topicSummary.storyHook || topicSummary.whyThisWorks || topicSummary.watchOut ? (
        <div className="callout-grid mb-4">
          <CalloutCard tone="story" eyebrow="Story Hook" title="Why You Would Reach For This">
            {topicSummary.storyHook || topicSummary.problem || topicSummary.realWorld || 'This example starts with a small real-world pressure before showing the Java shape.'}
          </CalloutCard>
          <CalloutCard tone="explain" eyebrow="Why This Works" title="What Java Is Doing">
            {topicSummary.whyThisWorks || topicSummary.mentalModel || topicSummary.why || 'Read the code with the mental model first, then compare it with the output.'}
          </CalloutCard>
          <CalloutCard tone="caution" eyebrow="Watch Out" title="Easy Way To Misuse It">
            {topicSummary.watchOut || topicSummary.commonMistake || 'The common mistake line in the code shows where this concept gets overused or misunderstood.'}
          </CalloutCard>
        </div>
      ) : null}

      <div className="insight-grid mb-4">
        <InsightCard icon="bi bi-bookmark-star" title="Concept">
          {topicSummary.concept || titleFromSlug(data.topic.slug)}
        </InsightCard>
        <InsightCard icon="bi bi-bullseye" title="What Problem This Solves">
          {topicSummary.problem || 'Open the code and read the explanation printed before the example runs.'}
        </InsightCard>
        <InsightCard icon="bi bi-building" title="Real-World Setup">
          {topicSummary.realWorld || 'The code file explains the business scenario before showing the implementation.'}
        </InsightCard>
        <InsightCard icon="bi bi-diagram-2" title="Mental Model">
          {topicSummary.mentalModel || topicSummary.why || 'Use the example to build the right intuition before memorizing APIs.'}
        </InsightCard>
      </div>

      {(data.lessonMeta.introduced || data.lessonMeta.status || data.lessonMeta.runner || data.lessonMeta.estimated) ? (
        <div className="content-card mb-4">
          <div className="topic-meta">
            {data.lessonMeta.introduced ? <span className="badge rounded-pill badge-soft">Introduced: {data.lessonMeta.introduced}</span> : null}
            {data.lessonMeta.status ? <span className="badge rounded-pill badge-soft">Status: {data.lessonMeta.status}</span> : null}
            <span className="badge rounded-pill badge-soft">Runner: {effectiveRunner(topicSummary, data.lessonMeta)}</span>
            {data.lessonMeta.estimated ? <span className="badge rounded-pill badge-soft">Read time: {data.lessonMeta.estimated}</span> : null}
          </div>
        </div>
      ) : null}

      {data.lessonRaw ? (
        <div className="content-card mb-4">
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
            <h2 className="page-title mb-0">Topic Lesson</h2>
            <span className="badge rounded-pill badge-soft">Site-first explanation</span>
          </div>
          <MarkdownBlock html={marked.parse(data.lessonRaw)} manifest={manifest} />
        </div>
      ) : null}

      {(topicSummary.useWhen || topicSummary.avoidWhen || topicSummary.commonMistake) ? (
        <div className="insight-grid mb-4">
          {topicSummary.useWhen ? (
            <InsightCard icon="bi bi-check2-circle" title="Use This When">
              {topicSummary.useWhen}
            </InsightCard>
          ) : null}
          {topicSummary.avoidWhen ? (
            <InsightCard icon="bi bi-slash-circle" title="Avoid This When">
              {topicSummary.avoidWhen}
            </InsightCard>
          ) : null}
          {topicSummary.commonMistake ? (
            <InsightCard icon="bi bi-exclamation-triangle" title="Common Mistake">
              {topicSummary.commonMistake}
            </InsightCard>
          ) : null}
        </div>
      ) : null}

      <div className="content-card mb-4">
        <div className="topic-brief-grid">
          <div className="topic-brief-card">
            <div className="eyebrow mb-2">How To Code It</div>
            <p className="mb-0">{topicSummary.howToCode || 'Run the example, compare the output, and then trace the code line by line.'}</p>
          </div>
          <div className="topic-brief-card">
            <div className="eyebrow mb-2">Expected Output</div>
            <p className="mb-0">{topicSummary.expectedOutput || 'The code comments and printed lines show the expected behavior.'}</p>
          </div>
          <div className="topic-brief-card">
            <div className="eyebrow mb-2">Run Online</div>
            <p className="mb-2">
              Use the copy button, then paste into JDoodle or OneCompiler.
              Simple single-class examples usually work directly.
            </p>
            {topicSummary.previewRequired ? (
              <p className="mb-0 text-danger-emphasis">
                This topic uses newer Java features that may need local JDK 25 preview support.
              </p>
            ) : null}
          </div>
        </div>
      </div>

      {topicSummary.takeaways.length ? (
        <div className="content-card mb-4">
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
            <h2 className="page-title mb-0">After Reading This Example, You Should Know</h2>
            <span className="badge rounded-pill badge-soft">Takeaways</span>
          </div>
          <BulletList items={topicSummary.takeaways} />
        </div>
      ) : null}

      {topicSummary.tryThisNext ? (
        <div className="content-card mb-4">
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
            <h2 className="page-title mb-0">Try This Next</h2>
            <span className="badge rounded-pill badge-soft">Stretch the example</span>
          </div>
          <p className="mb-0 muted-copy">{topicSummary.tryThisNext}</p>
        </div>
      ) : null}

      <div className="content-card">
        <div className="topic-meta">
          <span className="badge rounded-pill badge-soft">{topicSummary.concept || data.topic.concept}</span>
          <span className="badge rounded-pill badge-soft">Java Source</span>
          {topicSummary.previewRequired ? <span className="badge rounded-pill badge-warning-soft">Preview-sensitive</span> : null}
        </div>
        <div className="code-panel">
          <div className="code-toolbar">
            <div>
              <div className="fw-semibold">{data.topic.title}</div>
              <div className="source-path">{data.topic.sourcePath}</div>
            </div>
          </div>
          <CodeBlock code={data.raw} />
        </div>
      </div>
    </PageLayout>
  );
}
