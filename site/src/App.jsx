'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { marked } from 'marked';
import {
  applyDocumentMetadata,
  applyTheme,
  currentHash,
  fetchJson,
  fetchText as fetchTextFromRuntime,
  loadBootstrapBundle,
  markAppReady,
  navigateToHash,
  readStorageJson,
  readStorageValue,
  subscribeToHashRoute,
  writeStorageJson,
  writeStorageValue
} from './lib/browser-runtime.js';
import { HOME_ROUTE, parseHashRoute } from './lib/hash-route.js';
import { GITHUB_URL, SITE_DESCRIPTION, SITE_TITLE } from './lib/site-config.js';
import {
  buildSearchEntries,
  collectChapterRoutes,
  collectTopicRoutes,
  normalizeManifest,
  resolveRouteMetadata
} from './lib/site-manifest.js';
import {
  badgeClassForTone,
  bulletItems,
  effectiveRunner,
  extractCodePreview,
  extractTopicLessonFlow,
  findGuideSection,
  firstNonEmpty,
  getSectionPrerequisiteInfo,
  inferChapterJavaVersion,
  inferTopicMode,
  matchesVersionFilter,
  modePresentation,
  normalizeInterviewQuestions,
  normalizeJavaVersion,
  numberedItems,
  parseCompanyQuestionBank,
  parseFrontmatter,
  parseGuide,
  resolveVersionMeta,
  scoreLabel,
  statusTone,
  titleFromSlug,
  truncateText
} from './lib/content-helpers.js';
import {
  HIGH_DEMAND_TOPICS,
  PLAYGROUND_LINKS,
  RESOURCE_DESCRIPTIONS,
  SECTION_PROFILES,
  resourceSummaryFromSlug
} from './lib/site-data.js';
import { SearchBox } from './components/layout/Sidebar.jsx';
import Sidebar from './components/layout/Sidebar.jsx';
import { CodeBlock, LessonSectionContent, MarkdownBlock } from './components/content/MarkdownContent.jsx';
import {
  BulletList,
  CalloutCard,
  FeedbackBar,
  HeaderPanel,
  InPageToc,
  InsightCard,
  PageLayout,
  QuickLinkRail,
  RandomTopicButton,
  ReadingStateBar
} from './components/common/AppChrome.jsx';
import HomePage from './components/pages/HomePage.jsx';
import CompanyQuestionBankPage from './components/pages/CompanyQuestionBankPage.jsx';
import ProgressPage from './components/pages/ProgressPage.jsx';
import { useLearningPathState } from './hooks/use-learning-path-state.js';
import { useFlashcardState } from './hooks/use-flashcard-state.js';
import { useFeedbackState, useHashRoute, useReadingState, useUiPreferences } from './hooks/use-app-state.js';
import LearningPathsBoard from './components/study/LearningPathsBoard.jsx';
import DailyChallengeCard from './components/study/DailyChallengeCard.jsx';
import FlashcardStudyPanel from './components/study/FlashcardStudyPanel.jsx';

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
  },
  sec21_company_interview_tracks: {
    icon: 'bi bi-buildings',
    hook: 'Practice company-style backend interview questions with runnable Java examples and answer patterns.',
    problems: [
      'You want Google, Meta, Amazon, Coinbase, Jane Street, Netflix, MakeMyTrip, and HotelTrader prep to feel distinct where it should.',
      'You need original company-style questions backed by complete Java examples.',
      'You want interview preparation that points back to the right sections of the Java book.'
    ]
  },
  sec22_build_and_tooling: {
    icon: 'bi bi-tools',
    hook: 'Learn the practical build-system and packaging ideas every working Java developer needs.',
    problems: [
      'You can write Java but still hesitate when a project opens with pom.xml or build.gradle.',
      'Dependency scopes, jars, wars, and fat jars feel like build-tool trivia instead of deployment choices.',
      'You want a clear explanation of why modern Java apps often ship as executable jars.'
    ]
  }
};

const SECTION_PREREQUISITES = {
  sec01_fundamentals: {
    before: [],
    next: ['sec02_collections', 'sec03_generics', 'sec15_clean_code_and_refactoring']
  },
  sec02_collections: {
    before: ['sec01_fundamentals'],
    next: ['sec03_generics', 'sec04_streams_and_functional_style', 'sec20_data_structures_and_complexity']
  },
  sec03_generics: {
    before: ['sec01_fundamentals', 'sec02_collections'],
    next: ['sec04_streams_and_functional_style']
  },
  sec04_streams_and_functional_style: {
    before: ['sec02_collections', 'sec03_generics'],
    next: ['sec05_multithreading_and_concurrency', 'sec19_testing_and_quality']
  },
  sec05_multithreading_and_concurrency: {
    before: ['sec01_fundamentals', 'sec02_collections', 'sec04_streams_and_functional_style'],
    next: ['sec08_internal_of_jvm', 'sec21_company_interview_tracks']
  },
  sec08_internal_of_jvm: {
    before: ['sec01_fundamentals', 'sec05_multithreading_and_concurrency'],
    next: ['sec11_exception_handling', 'sec21_company_interview_tracks']
  },
  sec11_exception_handling: {
    before: ['sec01_fundamentals'],
    next: ['sec12_networking', 'sec13_io_and_data_access', 'sec21_company_interview_tracks']
  },
  sec16_core_data_time_and_text: {
    before: ['sec01_fundamentals', 'sec02_collections'],
    next: ['sec18_architecture_and_integration']
  },
  sec17_language_modeling_and_modern_types: {
    before: ['sec01_fundamentals', 'sec07_principles_and_solid'],
    next: ['sec18_architecture_and_integration']
  },
  sec19_testing_and_quality: {
    before: ['sec01_fundamentals', 'sec11_exception_handling'],
    next: ['sec21_company_interview_tracks']
  },
  sec20_data_structures_and_complexity: {
    before: ['sec01_fundamentals', 'sec02_collections'],
    next: ['sec21_company_interview_tracks']
  },
  sec21_company_interview_tracks: {
    before: ['sec02_collections', 'sec04_streams_and_functional_style', 'sec05_multithreading_and_concurrency', 'sec11_exception_handling', 'sec20_data_structures_and_complexity'],
    next: ['sec22_build_and_tooling']
  },
  sec22_build_and_tooling: {
    before: ['sec01_fundamentals'],
    next: []
  }
};

const VERSION_HINTS = {
  sec02_collections: { introduced: 'Java 1.2', status: 'stable' },
  sec03_generics: { introduced: 'Java 5', status: 'stable' },
  sec04_streams_and_functional_style: { introduced: 'Java 8', status: 'stable' },
  sec05_multithreading_and_concurrency: { introduced: 'Modern Java', status: 'mixed' },
  'sec05_multithreading_and_concurrency/ch02_virtual_threads': { introduced: 'Java 21', status: 'final' },
  'sec05_multithreading_and_concurrency/ch03_structured_concurrency': { introduced: 'Java 25', status: 'preview' },
  'sec05_multithreading_and_concurrency/ch04_scoped_values': { introduced: 'Java 25', status: 'preview' },
  sec10_reflection_and_metadata: { introduced: 'Java 5+', status: 'stable' },
  sec12_networking: { introduced: 'Java 11', status: 'stable' },
  sec16_core_data_time_and_text: { introduced: 'Mixed Java', status: 'stable' },
  'sec16_core_data_time_and_text/ch01_optional': { introduced: 'Java 8', status: 'stable' },
  'sec16_core_data_time_and_text/ch02_working_with_time': { introduced: 'Java 8', status: 'stable' },
  'sec16_core_data_time_and_text/ch07_strings_in_depth': { introduced: 'Mixed Java', status: 'stable' },
  sec17_language_modeling_and_modern_types: { introduced: 'Modern Java', status: 'stable' },
  'sec17_language_modeling_and_modern_types/ch01_pattern_matching': { introduced: 'Java 21', status: 'stable' },
  'sec17_language_modeling_and_modern_types/ch02_records_and_sealed_types': { introduced: 'Java 17', status: 'stable' },
  sec18_architecture_and_integration: { introduced: 'Mixed Java', status: 'stable' },
  'sec18_architecture_and_integration/ch01_modules': { introduced: 'Java 9', status: 'stable' },
  sec19_testing_and_quality: { introduced: 'JUnit 5 era', status: 'stable' },
  sec22_build_and_tooling: { introduced: 'Ecosystem', status: 'stable' }
};

const COMPANY_INTERVIEW_PROFILES = {
  Google: { slug: 'google', bucket: 'FAANG', focus: ['algorithms', 'debugging', 'system design'] },
  Meta: { slug: 'meta', bucket: 'FAANG', focus: ['product systems', 'coding speed', 'impact'] },
  Amazon: { slug: 'amazon', bucket: 'FAANG', focus: ['ownership', 'system design', 'customer focus'] },
  Apple: { slug: 'apple', bucket: 'FAANG', focus: ['api design', 'correctness', 'performance'] },
  Netflix: { slug: 'netflix', bucket: 'FAANG+', focus: ['distributed systems', 'observability', 'reliability'] },
  Coinbase: { slug: 'coinbase', bucket: 'High-paying product', focus: ['idempotency', 'money correctness', 'consistency'] },
  'Jane Street': { slug: 'jane-street', bucket: 'High-paying quant', focus: ['algorithms', 'invariants', 'clean reasoning'] },
  MakeMyTrip: { slug: 'makemytrip', bucket: 'Travel tech', focus: ['caching', 'booking flows', 'latency'] },
  HotelTrader: { slug: 'hoteltrader', bucket: 'Travel tech', focus: ['graphql', 'data freshness', 'partner APIs'] }
};

const PLAYGROUND_LINKS = {
  jdoodle: 'https://www.jdoodle.com/online-java-compiler/',
  onecompiler: 'https://onecompiler.com/studio/java'
};

const MODE_COPY = {
  interview: { label: 'Interview Ready', badgeClass: 'badge-danger-soft' },
  certification: { label: 'Certification Ready', badgeClass: 'badge-warning-soft' },
  shared: { label: 'Shared Core', badgeClass: 'badge-success-soft' }
};

const JAVA_VERSION_FILTERS = ['All', 'Java 8', 'Java 11', 'Java 17', 'Java 21', 'Java 25'];

const JAVA_VERSION_RANK = {
  'Java 8': 8,
  'Java 11': 11,
  'Java 17': 17,
  'Java 21': 21,
  'Java 25': 25
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
  const metaMatch = decoded.match(/((?:planning\/)?(?:README|BOOK|CURRICULUM|ROADMAP_099|TOP_20_BOOKS|BOOK_MANUSCRIPT|JAVA_7_TO_25|JAVA_MIGRATION_GUIDES|HIGH_DEMAND_JAVA_TOPICS|COMPANY_QUESTION_BANK|INTERVIEW_PROBLEM_APPROACH|INTERVIEW_INDEX|VISUAL_LESSON_STANDARD|COMPARE_COLLECTIONS|COMPARE_STREAMS|COMPARE_CONCURRENCY|TOPIC_COVERAGE_MAP|OCJP_TRACK|INTERVIEW_TRACK|MODERN_JAVA_TRACK)\.md)$/);
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
    return `content/meta/${sourcePath.replace(/^planning\//, '')}`;
  }
  return null;
}

function normalizeContentPath(value) {
  const parts = [];
  value.split('/').forEach((part) => {
    if (!part || part === '.') {
      return;
    }
    if (part === '..') {
      parts.pop();
      return;
    }
    parts.push(part);
  });
  return parts.join('/');
}

function resolveRelativeContentPath(href, currentContentPath) {
  if (!href || !currentContentPath) {
    return null;
  }
  if (
    href.startsWith('#') ||
    href.startsWith('/') ||
    href.startsWith('content/') ||
    href.startsWith('http://') ||
    href.startsWith('https://') ||
    href.startsWith('data:')
  ) {
    return null;
  }
  const slashIndex = currentContentPath.lastIndexOf('/');
  if (slashIndex === -1) {
    return null;
  }
  const baseDir = currentContentPath.slice(0, slashIndex + 1);
  return normalizeContentPath(`${baseDir}${href}`);
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
  const lines = match[1].split('\n');
  let index = 0;

  function parseScalar(value = '') {
    const trimmed = value.trim();
    if (!trimmed) {
      return '';
    }
    if ((trimmed.startsWith('"') && trimmed.endsWith('"')) || (trimmed.startsWith("'") && trimmed.endsWith("'"))) {
      return trimmed.slice(1, -1);
    }
    if (trimmed === 'true') {
      return true;
    }
    if (trimmed === 'false') {
      return false;
    }
    if (/^-?\d+(?:\.\d+)?$/.test(trimmed)) {
      return Number(trimmed);
    }
    if (trimmed.startsWith('[') || trimmed.startsWith('{')) {
      try {
        return JSON.parse(trimmed);
      } catch {
        return trimmed;
      }
    }
    return trimmed;
  }

  function parseBlockValue(blockLines) {
    const trimmed = blockLines.map((line) => line.trimEnd()).filter(Boolean);
    if (!trimmed.length) {
      return '';
    }

    const joined = trimmed.join('\n').trim();
    if (joined.startsWith('[') || joined.startsWith('{')) {
      try {
        return JSON.parse(joined);
      } catch {
        return joined;
      }
    }

    if (trimmed.every((line) => line.trim().startsWith('-'))) {
      const items = [];
      let currentObject = null;
      trimmed.forEach((line) => {
        const current = line.trim();
        if (/^-\s+/.test(current)) {
          const itemValue = current.replace(/^-+\s*/, '');
          if (itemValue.includes(':')) {
            const separator = itemValue.indexOf(':');
            currentObject = {
              [itemValue.slice(0, separator).trim()]: parseScalar(itemValue.slice(separator + 1))
            };
            items.push(currentObject);
          } else {
            currentObject = null;
            items.push(parseScalar(itemValue));
          }
          return;
        }
        if (currentObject && current.includes(':')) {
          const separator = current.indexOf(':');
          currentObject[current.slice(0, separator).trim()] = parseScalar(current.slice(separator + 1));
        }
      });
      return items;
    }

    return joined;
  }

  while (index < lines.length) {
    const line = lines[index];
    const separator = line.indexOf(':');
    if (separator === -1) {
      index += 1;
      continue;
    }

    const key = line.slice(0, separator).trim();
    const value = line.slice(separator + 1).trim();
    if (!key) {
      index += 1;
      continue;
    }

    if (value) {
      meta[key] = parseScalar(value);
      index += 1;
      continue;
    }

    const block = [];
    index += 1;
    while (index < lines.length && (/^\s+/.test(lines[index]) || /^\s*-\s*/.test(lines[index]))) {
      block.push(lines[index]);
      index += 1;
    }
    meta[key] = parseBlockValue(block);
  }

  return {
    meta,
    body: raw.slice(match[0].length)
  };
}

function normalizeJavaVersion(value = '') {
  const normalized = String(value).trim().toLowerCase();
  if (!normalized || normalized === 'all') {
    return 'All';
  }
  if (normalized.includes('25')) {
    return 'Java 25';
  }
  if (normalized.includes('21')) {
    return 'Java 21';
  }
  if (normalized.includes('17')) {
    return 'Java 17';
  }
  if (normalized.includes('11')) {
    return 'Java 11';
  }
  if (normalized.includes('8') || normalized.includes('1.0') || normalized.includes('1.2') || normalized.includes('5') || normalized.includes('9')) {
    return 'Java 8';
  }
  if (normalized.includes('mixed') || normalized.includes('modern') || normalized.includes('ecosystem') || normalized.includes('junit')) {
    return 'Java 8';
  }
  return '';
}

function javaVersionRank(value = '') {
  const normalized = normalizeJavaVersion(value);
  if (!normalized || normalized === 'All') {
    return 0;
  }
  return JAVA_VERSION_RANK[normalized] || 0;
}

function inferChapterJavaVersion(sectionSlug, chapter) {
  const explicit = normalizeJavaVersion(chapter?.javaVersion);
  if (explicit) {
    return explicit;
  }
  const hinted = VERSION_HINTS[`${sectionSlug}/${chapter.slug}`]?.introduced || VERSION_HINTS[sectionSlug]?.introduced || '';
  return normalizeJavaVersion(hinted);
}

function matchesVersionFilter(chapterVersion, filter) {
  if (!filter || filter === 'All') {
    return true;
  }
  const filterRank = javaVersionRank(filter);
  const chapterRank = javaVersionRank(chapterVersion);
  if (!chapterRank) {
    return true;
  }
  return chapterRank <= filterRank;
}

function normalizeInterviewQuestions(value) {
  if (!Array.isArray(value)) {
    return [];
  }
  return value
    .map((item) => {
      if (typeof item === 'string') {
        return { question: item, answer: '' };
      }
      if (!item || typeof item !== 'object') {
        return null;
      }
      return {
        question: String(item.question || item.q || '').trim(),
        answer: String(item.answer || item.a || item.explanation || '').trim()
      };
    })
    .filter((item) => item?.question);
}

function scoreLabel(score) {
  if (!score || typeof score.score !== 'number' || typeof score.total !== 'number') {
    return '';
  }
  return `${score.score}/${score.total}`;
}

function findGuideSection(guide, titles) {
  const normalizedTitles = titles.map((title) => title.toLowerCase());
  return guide.sections.find((section) => normalizedTitles.includes(section.title.toLowerCase()));
}

function firstNonEmpty(...values) {
  return values.find((value) => typeof value === 'string' && value.trim()) || '';
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

function resolveVersionMeta(sectionSlug, chapterSlug, lessonMeta = {}, preview = {}) {
  const chapterKey = `${sectionSlug}/${chapterSlug}`;
  const hinted = VERSION_HINTS[chapterKey] || VERSION_HINTS[sectionSlug] || {};
  const introduced = lessonMeta.introduced || hinted.introduced || '';
  const status = lessonMeta.status || (preview.previewRequired ? 'preview' : hinted.status) || '';
  const display = status === 'preview' && introduced ? `${introduced} preview` : introduced || '';
  return { introduced, status, display };
}

function statusTone(status = '') {
  const normalized = status.toLowerCase();
  if (normalized === 'preview') {
    return 'warning';
  }
  if (normalized === 'final' || normalized === 'stable') {
    return 'success';
  }
  return 'soft';
}

function badgeClassForTone(tone) {
  if (tone === 'warning') {
    return 'badge-warning-soft';
  }
  if (tone === 'success') {
    return 'badge-success-soft';
  }
  return 'badge-soft';
}

function normalizeLessonMode(value = '') {
  const normalized = String(value).trim().toLowerCase();
  if (normalized === 'interview' || normalized === 'certification' || normalized === 'shared') {
    return normalized;
  }
  return '';
}

function inferTopicMode(sectionSlug, chapterSlug, lessonMeta = {}) {
  const explicitMode = normalizeLessonMode(lessonMeta.mode);
  if (explicitMode) {
    return explicitMode;
  }
  if (sectionSlug === 'sec21_company_interview_tracks') {
    return 'interview';
  }
  if (
    sectionSlug === 'sec02_collections'
    || sectionSlug === 'sec04_streams_and_functional_style'
    || sectionSlug === 'sec05_multithreading_and_concurrency'
    || sectionSlug === 'sec11_exception_handling'
    || sectionSlug === 'sec20_data_structures_and_complexity'
    || sectionSlug === 'sec08_internal_of_jvm'
  ) {
    return 'shared';
  }
  if (
    sectionSlug === 'sec01_fundamentals'
    || sectionSlug === 'sec16_core_data_time_and_text'
    || sectionSlug === 'sec17_language_modeling_and_modern_types'
    || sectionSlug === 'sec22_build_and_tooling'
  ) {
    return 'certification';
  }
  if (chapterSlug?.includes('pattern_matching') || chapterSlug?.includes('records_and_sealed_types')) {
    return 'certification';
  }
  return 'shared';
}

function modePresentation(mode) {
  return MODE_COPY[mode] || MODE_COPY.shared;
}

function getSectionPrerequisiteInfo(sectionSlug) {
  return SECTION_PREREQUISITES[sectionSlug] || { before: [], next: [] };
}

function parseCompanyQuestionBank(raw = '') {
  const lines = raw.split('\n');
  const companies = [];
  let currentCompany = null;
  let currentQuestion = null;
  let mode = '';
  const overview = { howToUse: [] };

  function flushQuestion() {
    if (currentCompany && currentQuestion) {
      currentQuestion.prompt = currentQuestion.prompt.trim();
      currentQuestion.answer = currentQuestion.answer.trim();
      currentCompany.questions.push(currentQuestion);
      currentQuestion = null;
    }
  }

  function flushCompany() {
    flushQuestion();
    if (currentCompany) {
      companies.push(currentCompany);
      currentCompany = null;
    }
  }

  lines.forEach((rawLine) => {
    const line = rawLine.trim();
    if (!line) {
      if (mode === 'answer' && currentQuestion) {
        currentQuestion.answer += '\n\n';
      }
      return;
    }

    const h2 = line.match(/^##\s+(.*)/);
    if (h2) {
      const title = h2[1].trim();
      if (COMPANY_INTERVIEW_PROFILES[title]) {
        flushCompany();
        currentCompany = {
          name: title,
          profile: COMPANY_INTERVIEW_PROFILES[title],
          prepare: [],
          questions: []
        };
        mode = '';
        return;
      }
      flushCompany();
      mode = title === 'How To Use This Page' ? 'overview' : '';
      return;
    }

    if (mode === 'overview' && /^\d+\.\s+/.test(line)) {
      overview.howToUse.push(stripMarkdown(line.replace(/^\d+\.\s+/, '')));
      return;
    }

    if (!currentCompany) {
      return;
    }

    const h3 = line.match(/^###\s+(.*)/);
    if (h3) {
      const title = h3[1].trim();
      if (title === 'What to prepare for') {
        flushQuestion();
        mode = 'prepare';
        return;
      }
      if (title.startsWith('Question')) {
        flushQuestion();
        currentQuestion = {
          title,
          prompt: '',
          answer: ''
        };
        mode = 'question';
        return;
      }
      if (title === 'Answer') {
        mode = 'answer';
      }
      return;
    }

    if (mode === 'prepare' && /^-\s+/.test(line)) {
      currentCompany.prepare.push(stripMarkdown(line.replace(/^-\s+/, '')));
      return;
    }

    if (mode === 'question' && currentQuestion) {
      currentQuestion.prompt = `${currentQuestion.prompt}${currentQuestion.prompt ? '\n' : ''}${line}`;
      return;
    }

    if (mode === 'answer' && currentQuestion) {
      currentQuestion.answer = `${currentQuestion.answer}${currentQuestion.answer ? '\n' : ''}${line}`;
    }
  });

  flushCompany();
  return { overview, companies };
}
function useHashRoute() {
  const [route, setRoute] = useState(() => HOME_ROUTE);

  useEffect(() => {
    setRoute(parseHashRoute(currentHash()));
    return subscribeToHashRoute(setRoute);
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

function extractTopicLessonFlow(raw = '') {
  if (!raw.trim()) {
    return {
      guide: null,
      whyExists: null,
      pain: null,
      creatorMindset: null,
      inventIt: null,
      naiveAttempt: null,
      whyBreaks: null,
      finalSolution: null,
      walkthrough: null,
      mentalModel: null,
      mistakes: null,
      tradeoffs: null,
      useAvoid: null,
      summary: null
    };
  }

  const guide = parseGuide(raw);
  return {
    guide,
    whyExists: findGuideSection(guide, ['Why This Exists', 'Why This Matters']),
    pain: findGuideSection(guide, ['The Pain Before It', 'Problem Statement']),
    creatorMindset: findGuideSection(guide, ['Java Creator Mindset', 'Core Idea']),
    inventIt: findGuideSection(guide, ['How You Might Invent It', 'Intuition']),
    naiveAttempt: findGuideSection(guide, ['Naive Attempt']),
    whyBreaks: findGuideSection(guide, ['Why It Breaks']),
    finalSolution: findGuideSection(guide, ['Final Java Solution']),
    walkthrough: findGuideSection(guide, ['Walkthrough', 'Step-by-Step Working']),
    mentalModel: findGuideSection(guide, ['Mental Model']),
    mistakes: findGuideSection(guide, ['Mistakes', 'Common Mistakes']),
    tradeoffs: findGuideSection(guide, ['Tradeoffs', 'Rules / Syntax']),
    useAvoid: findGuideSection(guide, ['Use / Avoid', 'When To Use / When Not To Use']),
    summary: findGuideSection(guide, ['Summary'])
  };
}

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

function Sidebar({ sections, activeRoute, completedChapters, quizScores, versionFilter, onVersionChange, chapterCount }) {
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
                  <a
                    className={`nav-link-card nav-link-section mb-3 ${activeRoute === sectionRoute ? 'active' : ''}`}
                    href={sectionRoute}
                  >
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

function codeVariantFromText(value = '') {
  const firstLine = String(value).split('\n')[0].trim().toUpperCase();
  if (firstLine === '// BAD') {
    return 'bad';
  }
  if (firstLine === '// GOOD') {
    return 'good';
  }
  return '';
}

function stripCodeVariantMarker(value = '') {
  return String(value).replace(/^\/\/\s*(?:BAD|GOOD)\s*\n?/i, '');
}

async function copyTextToClipboard(value) {
  if (navigator?.clipboard?.writeText) {
    await navigator.clipboard.writeText(value);
    return;
  }

  const textArea = document.createElement('textarea');
  textArea.value = value;
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand('copy');
  textArea.remove();
}

function transformBadGoodCodeDiffs(root) {
  Array.from(root.querySelectorAll('pre')).forEach((pre) => {
    if (!pre.parentElement || pre.parentElement.classList.contains('code-diff-panel')) {
      return;
    }

    const code = pre.querySelector('code');
    if (!code || codeVariantFromText(code.textContent) !== 'bad') {
      return;
    }

    const next = pre.nextElementSibling;
    if (!next || next.tagName !== 'PRE') {
      return;
    }

    const nextCode = next.querySelector('code');
    if (!nextCode || codeVariantFromText(nextCode.textContent) !== 'good') {
      return;
    }

    code.textContent = stripCodeVariantMarker(code.textContent);
    nextCode.textContent = stripCodeVariantMarker(nextCode.textContent);

    const container = document.createElement('div');
    container.className = 'code-diff-grid';

    const badPanel = document.createElement('div');
    badPanel.className = 'code-diff-panel code-diff-bad';
    const badBadge = document.createElement('span');
    badBadge.className = 'badge text-bg-danger code-diff-badge';
    badBadge.textContent = 'Avoid this';
    badPanel.appendChild(badBadge);
    badPanel.appendChild(pre);

    const goodPanel = document.createElement('div');
    goodPanel.className = 'code-diff-panel code-diff-good';
    const goodBadge = document.createElement('span');
    goodBadge.className = 'badge text-bg-success code-diff-badge';
    goodBadge.textContent = 'Do this instead';
    goodPanel.appendChild(goodBadge);
    goodPanel.appendChild(next);

    pre.replaceWith(container);
    container.appendChild(badPanel);
    container.appendChild(goodPanel);
  });
}

function attachCopyButtons(root) {
  root.querySelectorAll('pre').forEach((pre) => {
    if (pre.parentElement?.classList.contains('markdown-code-shell')) {
      return;
    }

    const shell = document.createElement('div');
    shell.className = 'markdown-code-shell';
    pre.replaceWith(shell);
    shell.appendChild(pre);

    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'btn btn-sm btn-outline-dark code-copy-button';
    button.textContent = 'Copy';
    button.addEventListener('click', async () => {
      const code = pre.querySelector('code');
      if (!code) {
        return;
      }
      await copyTextToClipboard(code.textContent || '');
      button.textContent = 'Copied!';
      window.setTimeout(() => {
        button.textContent = 'Copy';
      }, 2000);
    });
    shell.appendChild(button);
  });
}

function MarkdownBlock({ html, manifest, contentPath }) {
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
          const relativeContentPath = resolveRelativeContentPath(href, contentPath);
          if (relativeContentPath) {
            anchor.setAttribute('href', relativeContentPath);
            anchor.setAttribute('target', '_blank');
            anchor.setAttribute('rel', 'noreferrer');
            return;
          }
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

      ref.current.querySelectorAll('img[src]').forEach((image) => {
        const src = image.getAttribute('src');
        const sourcePath = sourcePathFromHref(src, manifest.repoRoot);
        if (!sourcePath) {
          const relativeContentPath = resolveRelativeContentPath(src, contentPath);
          if (relativeContentPath) {
            image.setAttribute('src', relativeContentPath);
          }
          return;
        }
        const contentPath = sourcePathToContentPath(sourcePath);
        if (contentPath) {
          image.setAttribute('src', contentPath);
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

      transformBadGoodCodeDiffs(ref.current);
      attachCopyButtons(ref.current);

      const prism = await loadPrism();
      if (!cancelled && ref.current) {
        prism.highlightAllUnder(ref.current);
      }
    }

    enhanceBlock();

    return () => {
      cancelled = true;
    };
  }, [html, manifest, contentPath]);

  return <div ref={ref} className="content-markdown" dangerouslySetInnerHTML={{ __html: html }} />;
}

function LessonSectionContent({ section, manifest, contentPath }) {
  if (!section?.raw) {
    return null;
  }
  return <MarkdownBlock html={marked.parse(section.raw)} manifest={manifest} contentPath={contentPath} />;
}

function CodeBlock({ code }) {
  const ref = useRef(null);
  const [copyLabel, setCopyLabel] = useState('Copy');

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

  return (
    <div className="markdown-code-shell">
      <button
        type="button"
        className="btn btn-sm btn-outline-dark code-copy-button"
        onClick={async () => {
          await copyTextToClipboard(code);
          setCopyLabel('Copied!');
          window.setTimeout(() => setCopyLabel('Copy'), 2000);
        }}
      >
        {copyLabel}
      </button>
      <pre className="mb-0"><code ref={ref} className="language-java">{code}</code></pre>
    </div>
  );
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

function resourceSummaryFromSlug(slug) {
  return RESOURCE_DESCRIPTIONS[slug] || 'Open the original markdown behind this learning site.';
}

function useReadingState() {
  const [bookmarks, setBookmarks] = useState(() => readStorageJson('java-book-bookmarks', []));
  const [completed, setCompleted] = useState(() => readStorageJson('java-book-completed', []));
  const [completedChapters, setCompletedChapters] = useState(() => readStorageJson('java-book-completed-chapters', []));
  const [quizScores, setQuizScores] = useState(() => readStorageJson('java-book-quiz-scores', {}));

  useEffect(() => {
    writeStorageJson('java-book-bookmarks', bookmarks);
  }, [bookmarks]);

  useEffect(() => {
    writeStorageJson('java-book-completed', completed);
  }, [completed]);

  useEffect(() => {
    writeStorageJson('java-book-completed-chapters', completedChapters);
  }, [completedChapters]);

  useEffect(() => {
    writeStorageJson('java-book-quiz-scores', quizScores);
  }, [quizScores]);

  function toggleBookmark(route) {
    setBookmarks((current) => current.includes(route)
      ? current.filter((item) => item !== route)
      : [...current, route]);
  }

  function toggleCompleted(route) {
    setCompleted((current) => current.includes(route)
      ? current.filter((item) => item !== route)
      : [...current, route]);
  }

  function toggleChapterCompleted(route) {
    setCompletedChapters((current) => current.includes(route)
      ? current.filter((item) => item !== route)
      : [...current, route]);
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
function useFeedbackState() {
  const [votes, setVotes] = useState(() => readStorageJson('java-book-feedback', {}));

  useEffect(() => {
    writeStorageJson('java-book-feedback', votes);
  }, [votes]);

  function setVote(routeKey, vote) {
    setVotes((current) => ({ ...current, [routeKey]: vote }));
  }

  return { votes, setVote };
}

function useUiPreferences() {
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

function RandomTopicButton({ manifest, currentRoute }) {
  function goToRandomTopic() {
    const topics = [];
    manifest.sections.forEach((section) => {
      section.chapters.forEach((chapter) => {
        chapter.topics.forEach((topic) => {
          const route = `#topic/${section.slug}/${chapter.slug}/${topic.slug}`;
          if (route !== currentRoute) {
            topics.push(route);
          }
        });
      });
    });
    if (!topics.length) {
      navigateToHash('#home');
      return;
    }
    const index = Math.floor(Math.random() * topics.length);
    navigateToHash(topics[index]);
  }

  return (
    <button className="btn btn-outline-dark btn-sm rounded-pill" type="button" onClick={goToRandomTopic}>
      Random Topic
    </button>
  );
}

function ReadingStateBar({ routeKey, bookmarks, completed, toggleBookmark, toggleCompleted }) {
  const isBookmarked = bookmarks.includes(routeKey);
  const isCompleted = completed.includes(routeKey);
  return (
    <div className="reading-state-bar content-card mb-4">
      <div className="d-flex flex-wrap gap-2 align-items-center justify-content-between">
        <div>
          <div className="eyebrow mb-1">Your Progress</div>
          <div className="muted-copy mb-0">Bookmark this page or mark it complete after you finish the example.</div>
        </div>
        <div className="d-flex flex-wrap gap-2">
          <button className={`btn btn-sm rounded-pill ${isBookmarked ? 'btn-dark' : 'btn-outline-dark'}`} type="button" onClick={() => toggleBookmark(routeKey)}>
            {isBookmarked ? 'Bookmarked' : 'Bookmark'}
          </button>
          <button className={`btn btn-sm rounded-pill ${isCompleted ? 'btn-dark' : 'btn-outline-dark'}`} type="button" onClick={() => toggleCompleted(routeKey)}>
            {isCompleted ? 'Completed' : 'Mark Complete'}
          </button>
        </div>
      </div>
    </div>
  );
}

function InPageToc({ items, title = 'On This Page' }) {
  if (!items.length) {
    return null;
  }
  return (
    <aside className="toc-panel content-card">
      <div className="eyebrow mb-2">{title}</div>
      <div className="toc-links">
        {items.map((item) => (
          <a key={item.href} className="toc-link" href={item.href}>{item.label}</a>
        ))}
      </div>
    </aside>
  );
}

function FeedbackBar({ routeKey, feedbackState }) {
  const vote = feedbackState.votes[routeKey];
  return (
    <div className="content-card feedback-bar">
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">
        <div>
          <div className="eyebrow mb-1">Quick Feedback</div>
          <div className="muted-copy mb-0">Was this page useful for learning the concept?</div>
        </div>
        <div className="d-flex gap-2">
          <button type="button" className={`btn btn-sm rounded-pill ${vote === 'up' ? 'btn-dark' : 'btn-outline-dark'}`} onClick={() => feedbackState.setVote(routeKey, 'up')}>
            <i className="bi bi-hand-thumbs-up me-1" />
            Yes
          </button>
          <button type="button" className={`btn btn-sm rounded-pill ${vote === 'down' ? 'btn-dark' : 'btn-outline-dark'}`} onClick={() => feedbackState.setVote(routeKey, 'down')}>
            <i className="bi bi-hand-thumbs-down me-1" />
            Needs Work
          </button>
        </div>
      </div>
    </div>
  );
}

function normalizeQuizQuestions(value) {
  const questions = Array.isArray(value?.questions) ? value.questions : Array.isArray(value) ? value : [];
  return questions
    .map((question, index) => {
      const options = Array.isArray(question.options) ? question.options : [];
      const answerIndex = typeof question.answerIndex === 'number'
        ? question.answerIndex
        : Math.max(0, options.findIndex((option) => option === question.answer));
      return {
        id: question.id || `q-${index + 1}`,
        question: String(question.question || `Question ${index + 1}`).trim(),
        options,
        answerIndex,
        explanation: String(question.explanation || '').trim()
      };
    })
    .filter((question) => question.question && question.options.length >= 2);
}

function ChapterPager({ previousChapter, nextChapter, isCompleted, onToggleDone }) {
  return (
    <div className="content-card chapter-nav-card">
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">
        <div>
          <div className="eyebrow mb-1">Keep Reading</div>
          <div className="muted-copy mb-0">Use chapter navigation to move through the book without reopening the sidebar.</div>
        </div>
        <div className="d-flex flex-wrap gap-2">
          <button className={`btn btn-sm rounded-pill ${isCompleted ? 'btn-success' : 'btn-outline-success'}`} type="button" onClick={onToggleDone}>
            {isCompleted ? 'Marked as done' : 'Mark as done'}
          </button>
          <a className={`btn btn-outline-dark btn-sm rounded-pill ${previousChapter ? '' : 'disabled'}`} href={previousChapter?.route || '#'} aria-disabled={!previousChapter}>
            <i className="bi bi-arrow-left me-1" />
            Prev
          </a>
          <a className={`btn btn-dark btn-sm rounded-pill ${nextChapter ? '' : 'disabled'}`} href={nextChapter?.route || '#'} aria-disabled={!nextChapter}>
            Next
            <i className="bi bi-arrow-right ms-1" />
          </a>
        </div>
      </div>
    </div>
  );
}

function InterviewQuestionsPanel({ questions }) {
  const [openIndex, setOpenIndex] = useState(-1);

  if (!questions.length) {
    return null;
  }

  return (
    <div className="content-card interview-panel mb-4">
      <details open>
        <summary className="interview-panel-summary">
          <div>
            <h2 className="page-title mb-1">Interview Questions</h2>
            <div className="muted-copy mb-0">Quick follow-up questions and concise answers for this topic.</div>
          </div>
          <span className="badge rounded-pill text-bg-warning">{questions.length}</span>
        </summary>
        <div className="accordion interview-accordion" id="topic-interview-questions">
          {questions.map((item, index) => {
            const isOpen = index === openIndex;
            return (
              <div className="accordion-item interview-question-item" key={`${item.question}-${index}`}>
                <h3 className="accordion-header">
                  <button
                    className={`accordion-button ${isOpen ? '' : 'collapsed'}`}
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  >
                    {item.question}
                  </button>
                </h3>
                <div className={`accordion-collapse collapse ${isOpen ? 'show' : ''}`}>
                  <div className="accordion-body">
                    <button
                      type="button"
                      className="btn btn-link btn-sm px-0 mb-2 interview-toggle"
                      onClick={() => setOpenIndex(isOpen ? -1 : index)}
                    >
                      {isOpen ? 'Hide answer' : 'Show answer'}
                    </button>
                    {isOpen ? <p className="mb-0">{item.answer || 'Answer not added yet.'}</p> : null}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </details>
    </div>
  );
}

function ChapterQuizModal({ isOpen, onClose, chapterTitle, quiz, routeKey, onSaveScore }) {
  const questions = useMemo(() => normalizeQuizQuestions(quiz), [quiz]);
  const [answers, setAnswers] = useState([]);
  const [index, setIndex] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      return;
    }
    setAnswers(new Array(questions.length).fill(null));
    setIndex(0);
    setSubmitted(false);
  }, [isOpen, questions.length, routeKey]);

  useEffect(() => {
    function onEscape() {
      onClose();
    }

    if (isOpen) {
      document.addEventListener('reader:close-overlays', onEscape);
    }
    return () => document.removeEventListener('reader:close-overlays', onEscape);
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  const total = questions.length;
  const currentQuestion = questions[index];
  const allAnswered = answers.length === total && answers.every((answer) => answer !== null);
  const score = submitted
    ? answers.reduce((sum, answer, currentIndex) => sum + (answer === questions[currentIndex]?.answerIndex ? 1 : 0), 0)
    : 0;

  function chooseAnswer(answerIndex) {
    setAnswers((current) => {
      const next = [...current];
      next[index] = answerIndex;
      return next;
    });
  }

  function submitQuiz() {
    if (!allAnswered) {
      return;
    }
    const nextScore = {
      score: answers.reduce((sum, answer, currentIndex) => sum + (answer === questions[currentIndex]?.answerIndex ? 1 : 0), 0),
      total,
      at: new Date().toISOString()
    };
    onSaveScore(routeKey, nextScore);
    setSubmitted(true);
  }

  return (
    <div className="modal fade show reader-modal" style={{ display: 'block' }} role="dialog" aria-modal="true">
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <div>
              <h2 className="modal-title h5 mb-1">{chapterTitle} Quiz</h2>
              <div className="muted-copy mb-0">5-question OCJP-style chapter check.</div>
            </div>
            <button type="button" className="btn-close" aria-label="Close" onClick={onClose} />
          </div>
          <div className="modal-body">
            {!questions.length ? (
              <div className="empty-state border rounded-4 p-4">
                Quiz content has not been added for this chapter yet.
              </div>
            ) : submitted ? (
              <div className="quiz-summary">
                <div className="quiz-score-card mb-4">
                  <div className="eyebrow mb-2">Your Score</div>
                  <h3 className="display-6 mb-1">{score}/{total}</h3>
                  <p className="mb-0 muted-copy">Review the wrong answers below and rerun the quiz whenever you want.</p>
                </div>
                <div className="quiz-review-list">
                  {questions.map((question, questionIndex) => {
                    const chosen = answers[questionIndex];
                    const correct = chosen === question.answerIndex;
                    return (
                      <div className={`quiz-review-item ${correct ? 'quiz-review-correct' : 'quiz-review-wrong'}`} key={question.id}>
                        <div className="fw-semibold mb-2">{question.question}</div>
                        <div className="mb-1">Your answer: {question.options[chosen] || 'Not answered'}</div>
                        {!correct ? <div className="mb-1">Correct answer: {question.options[question.answerIndex]}</div> : null}
                        {question.explanation ? <div className="muted-copy mb-0">{question.explanation}</div> : null}
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <>
                <div className="d-flex justify-content-between align-items-center gap-3 mb-3">
                  <span className="badge rounded-pill badge-soft">Question {index + 1} of {total}</span>
                  <span className="badge rounded-pill badge-soft">{answers.filter((answer) => answer !== null).length} answered</span>
                </div>
                <div className="quiz-question-card">
                  <h3 className="h5 mb-3">{currentQuestion.question}</h3>
                  <div className="quiz-options">
                    {currentQuestion.options.map((option, optionIndex) => (
                      <button
                        key={`${currentQuestion.id}-${option}`}
                        type="button"
                        className={`btn text-start quiz-option ${answers[index] === optionIndex ? 'quiz-option-active' : ''}`}
                        onClick={() => chooseAnswer(optionIndex)}
                      >
                        <span className="quiz-option-marker">{String.fromCharCode(65 + optionIndex)}</span>
                        <span>{option}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
          <div className="modal-footer">
            {!submitted ? (
              <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 w-100">
                <div className="d-flex gap-2">
                  <button type="button" className="btn btn-outline-dark" onClick={() => setIndex((current) => Math.max(0, current - 1))} disabled={index === 0 || !questions.length}>
                    Prev question
                  </button>
                  <button type="button" className="btn btn-outline-dark" onClick={() => setIndex((current) => Math.min(total - 1, current + 1))} disabled={index === total - 1 || !questions.length}>
                    Next question
                  </button>
                </div>
                <div className="d-flex gap-2">
                  <button type="button" className="btn btn-outline-secondary" onClick={onClose}>Close</button>
                  <button type="button" className="btn btn-primary" onClick={submitQuiz} disabled={!questions.length || !allAnswered}>
                    Finish quiz
                  </button>
                </div>
              </div>
            ) : (
              <div className="d-flex justify-content-end gap-2 w-100">
                <button type="button" className="btn btn-outline-dark" onClick={() => {
                  setAnswers(new Array(questions.length).fill(null));
                  setIndex(0);
                  setSubmitted(false);
                }}>
                  Retake
                </button>
                <button type="button" className="btn btn-primary" onClick={onClose}>Done</button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show" onClick={onClose} aria-hidden="true" />
    </div>
  );
}

function ProgressPage({ manifest, completedChapters, quizScores }) {
  const groups = manifest.sections.map((section) => {
    const chapters = section.chapters.map((chapter) => ({
      route: chapter.route,
      title: chapter.title,
      quizScore: quizScores[chapter.route],
      completed: completedChapters.includes(chapter.route)
    }));
    return {
      ...section,
      chapters,
      completedCount: chapters.filter((chapter) => chapter.completed).length
    };
  });
  const total = manifest.chapterOrder.length;
  const done = completedChapters.length;

  return (
    <PageLayout
      header={(
        <HeaderPanel
          title="My Progress"
          eyebrow="Reader Progress"
          summary="Track completed chapters section by section and revisit weak quiz scores before interviews or revision sessions."
        />
      )}
    >
      <div className="content-card mb-4">
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
          <div>
            <div className="eyebrow mb-1">Overall Completion</div>
            <div className="muted-copy mb-0">{done} / {total} chapters marked done.</div>
          </div>
          <span className="badge rounded-pill text-bg-primary">{Math.round((done / Math.max(1, total)) * 100)}%</span>
        </div>
      </div>
      <div className="progress-section-list">
        {groups.map((section) => (
          <div className="content-card mb-4" key={section.slug}>
            <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
              <h2 className="page-title mb-0">{section.title}</h2>
              <span className="badge rounded-pill badge-soft">{section.completedCount} / {section.chapters.length}</span>
            </div>
            <div className="progress-chapter-list">
              {section.chapters.map((chapter) => (
                <a className="progress-chapter-row" href={chapter.route} key={chapter.route}>
                  <div className="d-flex align-items-center gap-2">
                    {chapter.completed ? <i className="bi bi-check-circle-fill text-success" /> : <i className="bi bi-circle text-muted" />}
                    <span>{chapter.title}</span>
                  </div>
                  <div className="d-flex align-items-center gap-2">
                    {scoreLabel(chapter.quizScore) ? <span className="badge rounded-pill text-bg-warning">{scoreLabel(chapter.quizScore)}</span> : null}
                    <span className={`badge rounded-pill ${chapter.completed ? 'text-bg-success' : 'badge-soft'}`}>
                      {chapter.completed ? 'Done' : 'Pending'}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </PageLayout>
  );
}

function PrerequisiteMapCard({ title = 'Prerequisite Map', required = [], next = [], manifest }) {
  const sectionTitle = (slug) => manifest.sections.find((section) => section.slug === slug)?.title || titleFromSlug(slug);
  const requiredItems = required.map((slug) => ({ slug, title: sectionTitle(slug) }));
  const nextItems = next.map((slug) => ({ slug, title: sectionTitle(slug) }));

  return (
    <div className="content-card prerequisite-card">
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
        <h2 className="page-title mb-0">{title}</h2>
        <span className="badge rounded-pill badge-soft">Study path</span>
      </div>
      <div className="prerequisite-grid">
        <div className="prerequisite-panel">
          <div className="eyebrow mb-2">Read Before This</div>
          {requiredItems.length ? (
            <div className="prerequisite-list">
              {requiredItems.map((item) => (
                <a key={item.slug} className="prerequisite-pill" href={`#section/${item.slug}`}>
                  {item.title}
                </a>
              ))}
            </div>
          ) : (
            <p className="muted-copy mb-0">You can start here directly.</p>
          )}
        </div>
        <div className="prerequisite-panel">
          <div className="eyebrow mb-2">Unlocks Next</div>
          {nextItems.length ? (
            <div className="prerequisite-list">
              {nextItems.map((item) => (
                <a key={item.slug} className="prerequisite-pill prerequisite-pill-next" href={`#section/${item.slug}`}>
                  {item.title}
                </a>
              ))}
            </div>
          ) : (
            <p className="muted-copy mb-0">Use this as a stable anchor before you branch out.</p>
          )}
        </div>
      </div>
    </div>
  );
}

function CompanyQuestionBankPage({ raw, manifest, resource, routeKey, readingState, feedbackState, flashcardState }) {
  const parsed = useMemo(() => parseCompanyQuestionBank(raw), [raw]);
  const [companyFilter, setCompanyFilter] = useState('all');
  const [bucketFilter, setBucketFilter] = useState('all');
  const [focusFilter, setFocusFilter] = useState('all');

  const availableBuckets = useMemo(
    () => [...new Set(parsed.companies.map((company) => company.profile.bucket))],
    [parsed.companies]
  );
  const availableFocus = useMemo(
    () => [...new Set(parsed.companies.flatMap((company) => company.profile.focus))],
    [parsed.companies]
  );

  const filteredCompanies = parsed.companies.filter((company) => {
    if (companyFilter !== 'all' && company.profile.slug !== companyFilter) {
      return false;
    }
    if (bucketFilter !== 'all' && company.profile.bucket !== bucketFilter) {
      return false;
    }
    if (focusFilter !== 'all' && !company.profile.focus.includes(focusFilter)) {
      return false;
    }
    return true;
  });
  const filteredQuestions = useMemo(() => flattenCompanyQuestions({ ...parsed, companies: filteredCompanies }), [parsed, filteredCompanies]);

  return (
    <PageLayout
      header={(
        <HeaderPanel
          title={resource.title}
          eyebrow="Interview Resource"
          summary={RESOURCE_DESCRIPTIONS[resource.slug]}
          sourcePath={resource.sourcePath}
        />
      )}
    >
      <ReadingStateBar routeKey={routeKey} {...readingState} />
      <div className="insight-grid mb-4">
        <InsightCard icon="bi bi-buildings" title="What This Page Helps With">
          Company pressure differs. This page lets you filter by company tier, interview focus, and question style without losing the deeper runnable chapters behind it.
        </InsightCard>
        <InsightCard icon="bi bi-list-check" title="How To Use It">
          <BulletList items={parsed.overview.howToUse} />
        </InsightCard>
        <InsightCard icon="bi bi-diagram-3" title="Question Count">
          {parsed.companies.length} company tracks and {parsed.companies.reduce((sum, company) => sum + company.questions.length, 0)} original question-answer pairs are available right now.
        </InsightCard>
        <InsightCard icon="bi bi-arrow-right-circle" title="Best Next Move">
          Filter one company, answer aloud before reading the sample answer, then jump into the linked company-interview section chapters for runnable code.
        </InsightCard>
      </div>

      <FlashcardStudyPanel questions={filteredQuestions} flashcardState={flashcardState} />

      <div className="content-card mb-4">
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
          <h2 className="page-title mb-0">Filter The Question Bank</h2>
          <span className="badge rounded-pill badge-soft">{filteredCompanies.length} company track{filteredCompanies.length === 1 ? '' : 's'}</span>
        </div>
        <div className="filter-grid">
          <label className="filter-field">
            <span className="eyebrow mb-2">Company</span>
            <select className="form-select filter-select" value={companyFilter} onChange={(event) => setCompanyFilter(event.target.value)}>
              <option value="all">All companies</option>
              {parsed.companies.map((company) => (
                <option key={company.profile.slug} value={company.profile.slug}>{company.name}</option>
              ))}
            </select>
          </label>
          <label className="filter-field">
            <span className="eyebrow mb-2">Company Group</span>
            <select className="form-select filter-select" value={bucketFilter} onChange={(event) => setBucketFilter(event.target.value)}>
              <option value="all">All groups</option>
              {availableBuckets.map((bucket) => (
                <option key={bucket} value={bucket}>{bucket}</option>
              ))}
            </select>
          </label>
          <label className="filter-field">
            <span className="eyebrow mb-2">Interview Focus</span>
            <select className="form-select filter-select" value={focusFilter} onChange={(event) => setFocusFilter(event.target.value)}>
              <option value="all">All focus areas</option>
              {availableFocus.map((focus) => (
                <option key={focus} value={focus}>{focus}</option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <div className="company-grid">
        {filteredCompanies.length ? filteredCompanies.map((company) => (
          <div key={company.profile.slug} className="content-card company-card">
            <div className="d-flex justify-content-between align-items-start gap-3 flex-wrap mb-3">
              <div>
                <h2 className="page-title mb-2">{company.name}</h2>
                <div className="topic-meta mb-0">
                  <span className="badge rounded-pill badge-soft">{company.profile.bucket}</span>
                  {company.profile.focus.map((focus) => (
                    <span key={focus} className="badge rounded-pill badge-success-soft">{focus}</span>
                  ))}
                </div>
              </div>
              <a className="btn btn-outline-dark btn-sm rounded-pill" href="#section/sec21_company_interview_tracks">
                Open Company Section
              </a>
            </div>

            <div className="insight-grid mb-4">
              <InsightCard icon="bi bi-bullseye" title="What To Prepare For">
                <BulletList items={company.prepare} />
              </InsightCard>
              <InsightCard icon="bi bi-lightning-charge" title="Interview Pressure">
                {company.profile.focus.join(', ')} are the dominant follow-up directions for this company track.
              </InsightCard>
            </div>

            <div className="company-question-list">
              {company.questions.map((question) => (
                <details key={`${company.profile.slug}-${question.title}`} className="company-question">
                  <summary>
                    <span className="badge rounded-pill badge-soft">{question.title}</span>
                    <span>{question.prompt}</span>
                  </summary>
                  <div className="company-answer" dangerouslySetInnerHTML={{ __html: marked.parse(question.answer) }} />
                </details>
              ))}
            </div>
          </div>
        )) : (
          <div className="content-card empty-state">
            No company track matches this filter combination. Clear one filter and try again.
          </div>
        )}
      </div>

      <FeedbackBar routeKey={routeKey} feedbackState={feedbackState} />
    </PageLayout>
  );
}

function HomePage({ manifest, fetchText, learningPathState }) {
  const [challengeQuestions, setChallengeQuestions] = useState([]);

  useEffect(() => {
    let cancelled = false;

    async function loadChallengeQuestions() {
      const questionResource = manifest.resources.find((resource) => resource.slug === 'COMPANY_QUESTION_BANK');
      if (!questionResource) {
        return;
      }
      try {
        const raw = await fetchText(questionResource.contentPath);
        if (!cancelled) {
          setChallengeQuestions(flattenCompanyQuestions(parseCompanyQuestionBank(raw)));
        }
      } catch {
        if (!cancelled) {
          setChallengeQuestions([]);
        }
      }
    }

    loadChallengeQuestions();
    return () => {
      cancelled = true;
    };
  }, [manifest, fetchText]);

  const featuredSections = manifest.sections.filter((section) => (
    ['sec02_collections', 'sec04_streams_and_functional_style', 'sec05_multithreading_and_concurrency', 'sec08_internal_of_jvm', 'sec21_company_interview_tracks']
      .includes(section.slug)
  ));
  const sectionCounts = {
    interview: featuredSections.reduce((total, section) => total + section.chapters.reduce((count, chapter) => count + chapter.topics.length, 0), 0),
    visual: manifest.sections
      .filter((section) => ['sec02_collections', 'sec04_streams_and_functional_style', 'sec05_multithreading_and_concurrency', 'sec08_internal_of_jvm'].includes(section.slug))
      .reduce((total, section) => total + section.chapters.length, 0)
  };
  const primaryJourneys = [
    { title: 'Interview Track', resourceSlug: 'INTERVIEW_TRACK', label: 'Primary Path', icon: 'bi bi-buildings' },
    { title: 'Interview Index', resourceSlug: 'INTERVIEW_INDEX', label: 'Fast Lookup', icon: 'bi bi-grid-1x2' },
    { title: 'Problem Approach', resourceSlug: 'INTERVIEW_PROBLEM_APPROACH', label: 'Answer Better', icon: 'bi bi-diagram-3' },
    { title: 'Company Question Bank', resourceSlug: 'COMPANY_QUESTION_BANK', label: 'Company Prep', icon: 'bi bi-bank' }
  ]
    .map((item) => ({
      ...item,
      resource: manifest.resources.find((resource) => resource.slug === item.resourceSlug)
    }))
    .filter((item) => item.resource);
  const secondaryJourneys = [
    { title: 'High-Demand Topics', resourceSlug: 'HIGH_DEMAND_JAVA_TOPICS', label: 'Core Topics', icon: 'bi bi-lightning-charge' },
    { title: 'OCJP Track', resourceSlug: 'OCJP_TRACK', label: 'Certification Path', icon: 'bi bi-mortarboard' },
    { title: 'Java 7 To 25', resourceSlug: 'JAVA_7_TO_25', label: 'Version Revision', icon: 'bi bi-clock-history' }
  ]
    .map((item) => ({
      ...item,
      resource: manifest.resources.find((resource) => resource.slug === item.resourceSlug)
    }))
    .filter((item) => item.resource);
  const roadmapSteps = [
    {
      step: '01',
      title: 'Start on the track',
      description: 'Use one sequence instead of opening random sections and hoping they connect.',
      route: '#resource/INTERVIEW_TRACK',
      badge: 'Order first'
    },
    {
      step: '02',
      title: 'Lock the core battlefields',
      description: 'Collections, streams, concurrency, and JVM internals should become explainable, not just recognizable.',
      route: '#resource/HIGH_DEMAND_JAVA_TOPICS',
      badge: 'Interview core'
    },
    {
      step: '03',
      title: 'Practice answer pressure',
      description: 'Use the problem approach and company bank to rehearse tradeoffs, follow-ups, and implementation choices.',
      route: '#resource/INTERVIEW_PROBLEM_APPROACH',
      badge: 'Answer better'
    },
    {
      step: '04',
      title: 'Use certification as revision',
      description: 'Bring in Java 25 and OCJP-style revision after the interview path is stable, not before.',
      route: '#resource/OCJP_TRACK',
      badge: 'Secondary path'
    }
  ];
  const weeklySprints = [
    {
      title: '3-day reset',
      summary: 'When you are lost, restart with interview index, collections choice, stream pipeline, and one company question.',
      links: [
        { label: 'Interview Index', href: '#resource/INTERVIEW_INDEX' },
        { label: 'List, Set, Map', href: './topics/list-set-map/' },
        { label: 'Company Bank', href: '#resource/COMPANY_QUESTION_BANK' }
      ]
    },
    {
      title: '1-week interview sprint',
      summary: 'Use one week to rebuild answer confidence around data structures, transformation, concurrency, and JVM basics.',
      links: [
        { label: 'High-Demand Topics', href: '#resource/HIGH_DEMAND_JAVA_TOPICS' },
        { label: 'Streams', href: '#section/sec04_streams_and_functional_style' },
        { label: 'Concurrency', href: '#section/sec05_multithreading_and_concurrency' }
      ]
    },
    {
      title: 'Java 25 revision pass',
      summary: 'After the interview layer feels stable, use certification and release guides for sharper revision and feature mapping.',
      links: [
        { label: 'OCJP Track', href: '#resource/OCJP_TRACK' },
        { label: 'Java 7 To 25', href: '#resource/JAVA_7_TO_25' },
        { label: 'Modern Java Track', href: '#resource/MODERN_JAVA_TRACK' }
      ]
    }
  ];
  const visualFocusTopics = [
    {
      title: 'Stack, Heap, and References',
      route: './topics/stack-heap-and-references/',
      note: 'Use diagrams to see object lifetime, reference flow, and why mutation surprises happen.'
    },
    {
      title: 'Threads',
      route: './topics/threads/',
      note: 'Follow request flow, scheduling, and shared-state hazards before reading synchronization code.'
    },
    {
      title: 'Stream Pipeline',
      route: './topics/stream-pipeline/',
      note: 'See filter-map-collect stages visually, then map them to the Java code path.'
    },
    {
      title: 'List, Set, Map',
      route: './topics/list-set-map/',
      note: 'Understand data shape first: duplicates, order, and lookup pressure become obvious in a visual compare.'
    }
  ];

  return (
    <>
      <section className="landing-stage mb-4">
        <div className="landing-stage-grid">
          <div className="hero-panel hero-home landing-hero">
            <div className="landing-chip-row mb-3">
              <span className="landing-chip landing-chip-primary">Interview-first</span>
              <span className="landing-chip">Java 25 aware</span>
              <span className="landing-chip">Visual learning</span>
            </div>
            <p className="eyebrow mb-2">Structured Java Prep</p>
            <h1 className="display-title landing-title">Build interview answers that are quick to find, easy to trust, and hard to forget.</h1>
            <p className="display-subtitle mb-4 landing-subtitle">
              The site is now organized like an interview system: one track to follow, one quick index to restart from,
              one answer pattern to practice, and core Java topics explained through pressure, diagrams, and runnable code.
            </p>
            <div className="landing-actions">
              <a className="btn btn-dark rounded-pill px-4" href="#resource/INTERVIEW_TRACK">Start Interview Track</a>
              <a className="btn btn-outline-dark rounded-pill px-4" href="#resource/INTERVIEW_INDEX">Open Quick Index</a>
              <a className="btn btn-outline-dark rounded-pill px-4" href="#resource/INTERVIEW_PROBLEM_APPROACH">Practice Answers</a>
            </div>
            <div className="landing-signal-bar">
              <div>
                <div className="landing-signal-number">{sectionCounts.interview}</div>
                <div className="landing-signal-label">core interview topics</div>
              </div>
              <div>
                <div className="landing-signal-number">{manifest.stats.chapters}</div>
                <div className="landing-signal-label">chapters to sequence</div>
              </div>
              <div>
                <div className="landing-signal-number">{manifest.stats.topics}</div>
                <div className="landing-signal-label">runnable examples</div>
              </div>
            </div>
          </div>

          <div className="landing-right-rail">
            <div className="landing-radar-card">
              <div className="eyebrow mb-2">What changes here</div>
              <h2 className="h4 mb-3">The homepage should feel like an operating board, not a markdown dump.</h2>
              <div className="landing-radar-grid">
                <div className="landing-radar-node">
                  <span className="landing-radar-kicker">Find fast</span>
                  <strong>Interview index and topic lanes sit above everything else.</strong>
                </div>
                <div className="landing-radar-node">
                  <span className="landing-radar-kicker">Learn visually</span>
                  <strong>Internals are explained with diagrams before code wherever that is the real blocker.</strong>
                </div>
                <div className="landing-radar-node">
                  <span className="landing-radar-kicker">Answer better</span>
                  <strong>Every strong topic should prepare you for follow-ups, not just syntax recall.</strong>
                </div>
              </div>
            </div>

            <div className="landing-metric-stack">
              <div className="landing-metric-card">
                <span className="eyebrow">Primary motion</span>
                <strong>Track first. Topic second. Company pressure after that.</strong>
              </div>
              <div className="landing-metric-card">
                <span className="eyebrow">Visual sweep</span>
                <strong>{sectionCounts.visual} chapter areas are good candidates for picture-first explanation.</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="landing-two-column mb-4">
        <LearningPathsBoard learningPathState={learningPathState} />
        <DailyChallengeCard questions={challengeQuestions} />
      </div>

      <div className="content-card landing-roadmap-card">
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
          <h2 className="page-title mb-0">Interview Operating System</h2>
          <span className="badge rounded-pill badge-danger-soft">Use this order</span>
        </div>
        <div className="landing-roadmap-grid">
          {roadmapSteps.map((step) => (
            <a className="landing-roadmap-step text-decoration-none text-reset" href={step.route} key={step.step}>
              <div className="landing-roadmap-topline">
                <span className="landing-roadmap-number">{step.step}</span>
                <span className="badge rounded-pill badge-soft">{step.badge}</span>
              </div>
              <h3 className="h5 mb-2">{step.title}</h3>
              <p className="muted-copy mb-0">{step.description}</p>
            </a>
          ))}
        </div>
      </div>

      <div className="content-card landing-lanes-card">
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
          <h2 className="page-title mb-0">Fast Lanes</h2>
          <span className="badge rounded-pill badge-danger-soft">Primary entry</span>
        </div>
        <div className="landing-lanes-grid">
          {primaryJourneys.map(({ title, resource, label, icon }) => {
            return (
              <a className="journey-card landing-lane text-decoration-none text-reset" href={`#resource/${resource.slug}`} key={resource.slug}>
                <div className="d-flex align-items-center gap-2 mb-2 landing-lane-topline">
                  <i className={`${icon} section-icon`} />
                  <span className="badge rounded-pill badge-danger-soft">{label}</span>
                </div>
                <h3 className="h5 mb-2">{title}</h3>
                <p className="muted-copy mb-3">{RESOURCE_DESCRIPTIONS[resource.slug]}</p>
                <BulletList items={
                  resource.slug === 'INTERVIEW_TRACK'
                    ? [
                        'Use a deliberate study order',
                        'Match sections to interview pressure',
                        'Move from concept to answer language'
                      ]
                    : resource.slug === 'INTERVIEW_INDEX'
                      ? [
                          'Jump straight to topic lookup',
                          'Use it as a restart point when lost',
                          'Find short study sprints fast'
                        ]
                    : resource.slug === 'INTERVIEW_PROBLEM_APPROACH'
                      ? [
                          'Structure coding and backend answers',
                          'Avoid random solving under pressure',
                          'Practice stronger follow-up responses'
                        ]
                      : [
                          'Filter by company and focus area',
                          'Practice original question-answer pairs',
                          'Jump into the linked Java sections after each answer'
                        ]
                } />
              </a>
            );
          })}
        </div>
      </div>

      <div className="content-card landing-core-card">
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
          <h2 className="page-title mb-0">Core Battlegrounds</h2>
          <span className="badge rounded-pill badge-success-soft">Shared core</span>
        </div>
        <div className="section-grid landing-battleground-grid">
          {featuredSections.map((section) => {
            const profile = SECTION_PROFILES[section.slug] || {};
            return (
              <a className="chapter-card section-spotlight landing-battleground text-decoration-none text-reset" href={`#section/${section.slug}`} key={section.slug}>
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

      <div className="landing-two-column">
        <div className="content-card landing-visual-card">
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
            <h2 className="page-title mb-0">Visual-First Learning</h2>
            <a className="badge rounded-pill badge-soft text-decoration-none" href="#resource/VISUAL_LESSON_STANDARD">See the standard</a>
          </div>
          <p className="muted-copy landing-section-intro">
            For JVM internals, thread flow, stream mechanics, and collection tradeoffs, diagrams should explain the shape before code explains the API.
          </p>
          <div className="landing-visual-grid">
            {visualFocusTopics.map((topic) => (
              <a className="landing-visual-topic text-decoration-none text-reset" href={topic.route} key={topic.route}>
                <h3 className="h6 mb-2">{topic.title}</h3>
                <p className="muted-copy mb-0">{topic.note}</p>
              </a>
            ))}
          </div>
        </div>

        <div className="content-card landing-sprint-card">
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
            <h2 className="page-title mb-0">Quick Sprints</h2>
            <span className="badge rounded-pill badge-warning-soft">Restart fast</span>
          </div>
          <div className="landing-sprint-list">
            {weeklySprints.map((sprint) => (
              <div className="landing-sprint-item" key={sprint.title}>
                <h3 className="h6 mb-2">{sprint.title}</h3>
                <p className="muted-copy mb-3">{sprint.summary}</p>
                <div className="landing-sprint-links">
                  {sprint.links.map((link) => (
                    <a key={`${sprint.title}-${link.label}`} href={link.href}>{link.label}</a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="content-card">
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
          <h2 className="page-title mb-0">Most Asked Java Topics</h2>
          <a className="badge rounded-pill badge-soft text-decoration-none" href="#resource/HIGH_DEMAND_JAVA_TOPICS">See why these matter</a>
        </div>
        <div className="topic-grid landing-topic-grid">
          {HIGH_DEMAND_TOPICS.map((topic) => (
            <a className="topic-card topic-teaser text-decoration-none text-reset" href={topic.route} key={topic.route}>
              <h3 className="h5 mb-2">{topic.title}</h3>
              <p className="muted-copy mb-0">{topic.why}</p>
            </a>
          ))}
        </div>
      </div>

      <div className="content-card">
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
          <h2 className="page-title mb-0">Certification And Version Follow-Up</h2>
          <span className="badge rounded-pill badge-warning-soft">Secondary path</span>
        </div>
        <div className="journey-grid">
          {secondaryJourneys.map(({ title, resource, label, icon }) => (
            <a className="journey-card text-decoration-none text-reset" href={`#resource/${resource.slug}`} key={resource.slug}>
              <div className="d-flex align-items-center gap-2 mb-2">
                <i className={`${icon} section-icon`} />
                <span className="badge rounded-pill badge-warning-soft">{label}</span>
              </div>
              <h3 className="h5 mb-2">{title}</h3>
              <p className="muted-copy mb-3">{RESOURCE_DESCRIPTIONS[resource.slug]}</p>
              <BulletList items={
                resource.slug === 'OCJP_TRACK'
                  ? [
                      'Revise exam-heavy Java areas in order',
                      'Use after core interview topics feel stable',
                      'Keep runnable examples attached to revision'
                    ]
                  : resource.slug === 'HIGH_DEMAND_JAVA_TOPICS'
                    ? [
                        'Use as a drill list for repeated weak areas',
                        'Connect search-heavy topics to runnable code',
                        'Prioritize sections interviewers ask most'
                      ]
                    : [
                        'See what changed across Java releases',
                        'Support Java 25 revision with historical context',
                        'Use migration notes after topic-level understanding'
                      ]
              } />
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

function TopicPreviewCard({ section, chapter, topic }) {
  const versionMeta = resolveVersionMeta(section.slug, chapter.slug, topic.lessonMeta, topic.preview);
  const mode = inferTopicMode(section.slug, chapter.slug, topic.lessonMeta);
  const modeUi = modePresentation(mode);
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
        <div className="d-flex flex-wrap gap-2">
          <span className="badge rounded-pill badge-soft">{topic.preview.concept || topic.concept}</span>
          <span className={`badge rounded-pill ${modeUi.badgeClass}`}>{modeUi.label}</span>
        </div>
        {versionMeta.display ? <span className={`badge rounded-pill ${badgeClassForTone(statusTone(versionMeta.status))}`}>{versionMeta.display}</span> : null}
      </div>
      <h3 className="h5 mb-2">{topic.title}</h3>
      <p className="muted-copy mb-3">{summary}</p>
      {topic.preview.storyHook ? <div className="topic-story-hook mb-2">{topic.preview.storyHook}</div> : null}
      <div className="topic-kicker">Real-world setup: {topic.preview.realWorld || 'Open the file to see the scenario and code walkthrough.'}</div>
    </a>
  );
}

function QuickLinkRail({ onRandomTopic, onToggleTheme, themeLabel, onToggleReadingMode, readingLabel }) {
  const links = [
    { label: 'Interview Track', href: '#resource/INTERVIEW_TRACK' },
    { label: 'Interview Index', href: '#resource/INTERVIEW_INDEX' },
    { label: 'Problem Approach', href: '#resource/INTERVIEW_PROBLEM_APPROACH' },
    { label: 'Company Bank', href: '#resource/COMPANY_QUESTION_BANK' },
    { label: 'My Progress', href: '#progress' },
    { label: 'High-Demand', href: '#resource/HIGH_DEMAND_JAVA_TOPICS' },
    { label: 'Certification', href: '#resource/OCJP_TRACK' },
    { label: 'Streams', href: '#section/sec04_streams_and_functional_style' },
    { label: 'Concurrency', href: '#section/sec05_multithreading_and_concurrency' },
    { label: 'Collections', href: '#section/sec02_collections' }
  ];

  return (
    <div className="quick-link-rail">
      <button type="button" className="quick-link-chip quick-link-button" onClick={onRandomTopic}>
        Random Topic
      </button>
      <button type="button" className="quick-link-chip quick-link-button" onClick={onToggleTheme}>
        {themeLabel}
      </button>
      <button type="button" className="quick-link-chip quick-link-button" onClick={onToggleReadingMode}>
        {readingLabel}
      </button>
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

function TopicActionButtons({
  code,
  runner,
  showNote = true,
  copyLabel = 'Copy code',
  copiedLabel = 'Copied',
  failedLabel = 'Copy failed'
}) {
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
    <div className="d-flex flex-wrap gap-2 topic-actions">
      <button className="btn btn-dark btn-sm rounded-pill" type="button" onClick={onCopy}>
        {copyState === 'copied' ? copiedLabel : copyState === 'failed' ? failedLabel : copyLabel}
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
      {showNote && runner === 'local' ? <span className="playground-note">This example is best run locally, usually because of newer or preview Java features.</span> : null}
    </div>
  );
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
    loadBootstrapBundle();
  }, []);

  useEffect(() => {
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
        setManifest({ ...normalizedManifest, sections, chapterOrder, routeToChapter });
      } catch (loadError) {
        setError(loadError.message);
      } finally {
        setLoading(false);
      }
    }
    loadManifest();
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

  async function fetchText(path) {
    if (contentCache.current.has(path)) {
      return contentCache.current.get(path);
    }
    const text = await fetchTextFromRuntime(path);
    contentCache.current.set(path, text);
    return text;
  }

  const activeRoute = route.type === 'section'
    ? `#section/${route.sectionSlug}`
    : route.type === 'chapter'
      ? `#chapter/${route.sectionSlug}/${route.chapterSlug}`
      : route.type === 'topic'
        ? `#chapter/${route.sectionSlug}/${route.chapterSlug}`
        : route.type === 'progress'
          ? '#progress'
          : '';
  const activeChapterRoute = route.type === 'chapter'
    ? `#chapter/${route.sectionSlug}/${route.chapterSlug}`
    : route.type === 'topic'
      ? `#chapter/${route.sectionSlug}/${route.chapterSlug}`
      : '';
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

function RouteRenderer({ route, manifest, fetchText, readingState, learningPathState, feedbackState, flashcardState, uiPreferences }) {
  const [content, setContent] = useState({ status: 'loading', data: null, error: '' });
  const [quizOpen, setQuizOpen] = useState(false);

  useEffect(() => {
    setQuizOpen(false);
  }, [route]);

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

        if (route.type === 'progress') {
          if (!cancelled) {
            setContent({ status: 'ready', data: { type: 'progress' }, error: '' });
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

          const [guideRaw, revisionRaw, quizRaw, ...topicPayloads] = await Promise.all([
            fetchText(chapter.guide.contentPath),
            fetchText(chapter.revision.contentPath),
            chapter.quiz ? fetchText(chapter.quiz.contentPath).catch(() => '') : Promise.resolve(''),
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

          let quiz = null;
          if (quizRaw) {
            try {
              quiz = JSON.parse(quizRaw);
            } catch {
              quiz = null;
            }
          }

          if (!cancelled) {
            setContent({
              status: 'ready',
              data: {
                type: 'chapter',
                section,
                chapter: {
                  ...chapter,
                  topics,
                  quiz
                },
                guideRaw,
                revisionRaw
              },
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
    return <HomePage manifest={manifest} fetchText={fetchText} learningPathState={learningPathState} />;
  }

  if (data.type === 'progress') {
    return <ProgressPage manifest={manifest} completedChapters={readingState.completedChapters} quizScores={readingState.quizScores} />;
  }

  if (data.type === 'resource') {
    const routeKey = `#resource/${data.resource.slug}`;
    if (data.resource.slug === 'COMPANY_QUESTION_BANK') {
      return (
        <CompanyQuestionBankPage
          raw={data.raw}
          manifest={manifest}
          resource={data.resource}
          routeKey={routeKey}
          readingState={readingState}
          feedbackState={feedbackState}
          flashcardState={flashcardState}
        />
      );
    }
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
        <ReadingStateBar routeKey={routeKey} {...readingState} />
        <div className="content-card">
          <MarkdownBlock html={marked.parse(data.raw)} manifest={manifest} contentPath={data.resource.contentPath} />
        </div>
        <FeedbackBar routeKey={routeKey} feedbackState={feedbackState} />
      </PageLayout>
    );
  }

  if (data.type === 'section') {
    const guide = parseGuide(data.raw);
    const profile = SECTION_PROFILES[data.section.slug] || {};
    const prereqs = getSectionPrerequisiteInfo(data.section.slug);
    const why = findGuideSection(guide, ['Why This Section Matters', 'What Real Problems This Section Solves', 'The Story']);
    const beforeStart = findGuideSection(guide, ['Before You Start', 'Start Here If']);
    const howToRead = findGuideSection(guide, ['How To Read This Section', 'How To Read This Section']);
    const visibleChapters = data.section.chapters.filter((chapter) => matchesVersionFilter(chapter.javaVersion, uiPreferences.versionFilter));

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
        <PrerequisiteMapCard
          title="Prerequisite Map"
          required={prereqs.before}
          next={prereqs.next}
          manifest={manifest}
        />
        <div className="content-card">
          <MarkdownBlock html={marked.parse(data.raw)} manifest={manifest} contentPath={data.section.guide.contentPath} />
        </div>
        <div className="content-card">
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
            <h2 className="page-title mb-0">Chapters In This Section</h2>
            <div className="d-flex flex-wrap gap-2">
              <span className="badge rounded-pill badge-soft">Filter: {uiPreferences.versionFilter}</span>
              <span className="badge rounded-pill badge-soft">{visibleChapters.length} shown</span>
            </div>
          </div>
          <div className="chapter-grid">
            {visibleChapters.map((chapter) => (
              <a className="chapter-card text-decoration-none text-reset" href={`#chapter/${data.section.slug}/${chapter.slug}`} key={chapter.slug}>
                <div className="d-flex justify-content-between align-items-start gap-3 mb-2">
                  <span className="badge rounded-pill badge-soft">{chapter.javaVersion || chapter.slug}</span>
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
    const routeKey = `#chapter/${data.section.slug}/${data.chapter.slug}`;
    const chapterIndex = manifest.chapterOrder.findIndex((chapter) => chapter.route === routeKey);
    const previousChapter = chapterIndex > 0 ? manifest.chapterOrder[chapterIndex - 1] : null;
    const nextChapter = chapterIndex >= 0 && chapterIndex < manifest.chapterOrder.length - 1 ? manifest.chapterOrder[chapterIndex + 1] : null;
    const isChapterDone = readingState.completedChapters.includes(routeKey);
    const chapterToc = [
      { href: '#start-with-examples', label: 'Start With Examples' },
      { href: '#chapter-guide', label: 'Chapter Guide' },
      { href: '#revision-sheet', label: 'Revision Sheet' }
    ];

    return (
      <>
        <PageLayout
          header={(
            <HeaderPanel
              title={data.chapter.title}
              eyebrow={`${data.section.title} · Chapter`}
              summary={truncateText(problem?.plain || guide.intro || quickSummary?.plain || 'Use this chapter to understand the concept, then run the topic files.', 240)}
              sourcePath={data.chapter.guide.sourcePath}
              actions={(
                <>
                  <button className="btn btn-primary btn-sm rounded-pill" type="button" onClick={() => setQuizOpen(true)}>Take Quiz</button>
                  <a className="btn btn-outline-dark btn-sm rounded-pill" href={data.chapter.runChapter.contentPath} target="_blank" rel="noreferrer">RunChapter.java</a>
                  <a className="btn btn-outline-dark btn-sm rounded-pill" href={data.chapter.runAllTopics.contentPath} target="_blank" rel="noreferrer">RunAllTopics.java</a>
                  <a className="btn btn-dark btn-sm rounded-pill" href={`#section/${data.section.slug}`}>Back To Section</a>
                </>
              )}
            />
          )}
        >
          <ReadingStateBar routeKey={routeKey} {...readingState} />
          <div className={`content-layout ${uiPreferences.readingMode ? 'content-layout-reading' : ''}`}>
            <div className="content-main">
              <div id="start-with-examples" className="content-card">
                <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
                  <h2 className="page-title mb-0">Start With These Examples</h2>
                  <div className="d-flex flex-wrap gap-2">
                    {scoreLabel(readingState.quizScores[routeKey]) ? <span className="badge rounded-pill text-bg-warning">Last score: {scoreLabel(readingState.quizScores[routeKey])}</span> : null}
                    <span className="badge rounded-pill badge-soft">{data.chapter.topics.length} runnable topic{data.chapter.topics.length === 1 ? '' : 's'}</span>
                  </div>
                </div>
                <div className="topic-grid">
                  {data.chapter.topics.map((topic) => (
                    <TopicPreviewCard section={data.section} chapter={data.chapter} topic={topic} key={topic.slug} />
                  ))}
                </div>
              </div>
              <div id="chapter-guide" className="content-card">
                <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
                  <h2 className="page-title mb-0">Chapter Guide</h2>
                  <span className="badge rounded-pill badge-soft">Read this after the first example</span>
                </div>
                <MarkdownBlock html={marked.parse(data.guideRaw)} manifest={manifest} contentPath={data.chapter.guide.contentPath} />
              </div>
              <div id="revision-sheet" className="content-card">
                <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
                  <h2 className="page-title mb-0">Revision Sheet</h2>
                  <span className="badge rounded-pill badge-soft">{truncateText(revision.intro || 'Use this for quick recap after running the examples.', 100)}</span>
                </div>
                <MarkdownBlock html={marked.parse(data.revisionRaw)} manifest={manifest} contentPath={data.chapter.revision.contentPath} />
              </div>
              <ChapterPager
                previousChapter={previousChapter}
                nextChapter={nextChapter}
                isCompleted={isChapterDone}
                onToggleDone={() => readingState.toggleChapterCompleted(routeKey)}
              />
            </div>
            {!uiPreferences.readingMode ? (
              <div className="content-side">
                <InPageToc items={chapterToc} />
              </div>
            ) : null}
          </div>
          <FeedbackBar routeKey={routeKey} feedbackState={feedbackState} />
        </PageLayout>
        <ChapterQuizModal
          isOpen={quizOpen}
          onClose={() => setQuizOpen(false)}
          chapterTitle={data.chapter.title}
          quiz={data.chapter.quiz}
          routeKey={routeKey}
          onSaveScore={readingState.saveQuizScore}
        />
      </>
    );
  }

  const topicSummary = data.preview;
  const lessonFlow = extractTopicLessonFlow(data.lessonRaw);
  const topicRunner = effectiveRunner(topicSummary, data.lessonMeta);
  const versionMeta = resolveVersionMeta(data.section.slug, data.chapter.slug, data.lessonMeta, topicSummary);
  const lessonMode = inferTopicMode(data.section.slug, data.chapter.slug, data.lessonMeta);
  const lessonModeUi = modePresentation(lessonMode);
  const routeKey = `#topic/${data.section.slug}/${data.chapter.slug}/${data.topic.slug}`;
  const conceptLabel = topicSummary.concept || data.topic.concept || titleFromSlug(data.topic.slug);
  const topicSummaryLine = firstNonEmpty(
    lessonFlow.whyExists?.plain,
    lessonFlow.pain?.plain,
    topicSummary.problem,
    topicSummary.realWorld,
    topicSummary.mentalModel,
    'Understand the pressure first, then jump into the Java code.'
  );
  const ideaSummary = firstNonEmpty(
    lessonFlow.finalSolution?.plain,
    lessonFlow.creatorMindset?.plain,
    topicSummary.whyThisWorks,
    topicSummary.mentalModel,
    topicSummary.why,
    'The Java shape should feel like the natural answer to the problem.'
  );
  const eurekaLine = firstNonEmpty(
    lessonFlow.summary?.plain,
    topicSummary.takeaways[0],
    topicSummary.whyThisWorks,
    topicSummary.mentalModel,
    'By the end, you should be able to explain why Java chose this shape and when to use it.'
  );
  const takeaways = topicSummary.takeaways.length
    ? topicSummary.takeaways
    : bulletItems(lessonFlow.summary?.raw || '');
  const interviewQuestions = normalizeInterviewQuestions(data.lessonMeta.interviewQ);
  const topicToc = [
    { href: '#start-here', label: 'Start Here' },
    { href: '#invent-it', label: 'Invent It' },
    { href: '#source-code', label: 'Try The Code' },
    ...(lessonFlow.walkthrough || lessonFlow.mentalModel ? [{ href: '#understand-it', label: 'Understand It' }] : []),
    ...(lessonFlow.mistakes || lessonFlow.tradeoffs || lessonFlow.useAvoid || topicSummary.commonMistake || topicSummary.useWhen || topicSummary.avoidWhen
      ? [{ href: '#use-it-well', label: 'Use It Well' }]
      : []),
    ...(takeaways.length || lessonFlow.summary ? [{ href: '#takeaways', label: 'Takeaways' }] : [])
  ];
  const quickSteps = [
    {
      title: 'See the pressure',
      detail: truncateText(firstNonEmpty(lessonFlow.pain?.plain, topicSummary.problem, topicSummary.realWorld, topicSummary.storyHook, topicSummaryLine), 145)
    },
    {
      title: 'Catch the Java idea',
      detail: truncateText(firstNonEmpty(lessonFlow.creatorMindset?.plain, lessonFlow.finalSolution?.plain, ideaSummary), 145)
    },
    {
      title: 'Run the example',
      detail: truncateText(firstNonEmpty(topicSummary.howToCode, lessonFlow.walkthrough?.plain, 'Run the example, compare the output, then trace the code line by line.'), 145)
    },
    {
      title: 'Lock the insight',
      detail: truncateText(firstNonEmpty(topicSummary.expectedOutput, lessonFlow.summary?.plain, eurekaLine), 145)
    }
  ];
  return (
    <PageLayout
      header={(
        <HeaderPanel
          title={data.topic.title}
          eyebrow={`${data.section.title} · ${data.chapter.title}`}
          summary={truncateText(topicSummaryLine, 240)}
          sourcePath={data.topic.sourcePath}
          actions={(
            <>
              <a className="btn btn-outline-dark btn-sm rounded-pill" href={`#chapter/${data.section.slug}/${data.chapter.slug}`}>Back To Chapter</a>
              <TopicActionButtons code={data.raw} runner={topicRunner} showNote={false} copyLabel="Copy Snippet" />
            </>
          )}
        />
      )}
    >
      <ReadingStateBar routeKey={routeKey} {...readingState} />
      <div className={`content-layout ${uiPreferences.readingMode ? 'content-layout-reading' : ''}`}>
        <div className="content-main">
          <div id="start-here" className="content-card mb-4">
            <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
              <h2 className="page-title mb-0">Start Here</h2>
              <span className="badge rounded-pill badge-soft">Understand fast, then run code</span>
            </div>
            <div className="learning-focus mb-3">
              <div className="eyebrow mb-2">Concept In One Line</div>
              <h3 className="h4 mb-2">{conceptLabel}</h3>
              <p className="mb-0">{topicSummaryLine}</p>
            </div>
            <div className="learning-step-grid mb-3">
              {quickSteps.map((step, index) => (
                <div className="learning-step-card" key={step.title}>
                  <div className="learning-step-number">{index + 1}</div>
                  <div>
                    <h3 className="h6 mb-2">{step.title}</h3>
                    <p className="mb-0 muted-copy">{step.detail}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="eureka-banner">
              <div className="eyebrow mb-1">Eureka Goal</div>
              <p className="mb-0">{truncateText(eurekaLine, 220)}</p>
            </div>
          </div>

          <div id="invent-it" className="content-card mb-4">
            <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
              <h2 className="page-title mb-0">How The Idea Emerges</h2>
              <span className="badge rounded-pill badge-soft">Problem to invention</span>
            </div>
            <div className="insight-grid mb-4">
              <InsightCard icon="bi bi-bullseye" title="Problem Pressure">
                {lessonFlow.pain?.plain || topicSummary.problem || topicSummary.realWorld || 'Start with the real pressure before reading APIs.'}
              </InsightCard>
              <InsightCard icon="bi bi-lightbulb" title="Java Creator Mindset">
                {lessonFlow.creatorMindset?.plain || topicSummary.why || topicSummary.mentalModel || 'Ask what Java is trying to simplify, protect, or make clearer.'}
              </InsightCard>
              <InsightCard icon="bi bi-stars" title="Final Java Idea">
                {ideaSummary}
              </InsightCard>
            </div>
            {lessonFlow.inventIt ? (
              <div className="section-panel section-panel-soft mb-4">
                <div className="eyebrow mb-2">How You Might Invent It</div>
                <LessonSectionContent section={lessonFlow.inventIt} manifest={manifest} contentPath={data.topic.guide?.contentPath} />
              </div>
            ) : null}
            {(lessonFlow.naiveAttempt || lessonFlow.whyBreaks || lessonFlow.finalSolution) ? (
              <div className="journey-grid journey-grid-primary">
                {lessonFlow.naiveAttempt ? (
                  <div className="section-panel">
                    <div className="eyebrow mb-2">Naive Attempt</div>
                    <LessonSectionContent section={lessonFlow.naiveAttempt} manifest={manifest} contentPath={data.topic.guide?.contentPath} />
                  </div>
                ) : null}
                {lessonFlow.whyBreaks ? (
                  <div className="section-panel">
                    <div className="eyebrow mb-2">Why It Breaks</div>
                    <LessonSectionContent section={lessonFlow.whyBreaks} manifest={manifest} contentPath={data.topic.guide?.contentPath} />
                  </div>
                ) : null}
                {lessonFlow.finalSolution ? (
                  <div className="section-panel section-panel-strong">
                    <div className="eyebrow mb-2">Final Java Solution</div>
                    <LessonSectionContent section={lessonFlow.finalSolution} manifest={manifest} contentPath={data.topic.guide?.contentPath} />
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>

          {(versionMeta.display || versionMeta.status || data.lessonMeta.runner || data.lessonMeta.estimated) ? (
            <div className="content-card mb-4">
              <div className="topic-meta">
                {versionMeta.display ? (
                  <span className={`badge rounded-pill ${badgeClassForTone(statusTone(versionMeta.status))}`}>
                    {versionMeta.status === 'preview' ? versionMeta.display : `Introduced: ${versionMeta.display}`}
                  </span>
                ) : null}
                {versionMeta.status && versionMeta.status !== 'preview' ? (
                  <span className={`badge rounded-pill ${badgeClassForTone(statusTone(versionMeta.status))}`}>Status: {versionMeta.status}</span>
                ) : null}
                <span className={`badge rounded-pill ${lessonModeUi.badgeClass}`}>Mode: {lessonModeUi.label}</span>
                <span className="badge rounded-pill badge-soft">Runner: {topicRunner}</span>
                {data.lessonMeta.estimated ? <span className="badge rounded-pill badge-soft">Read time: {data.lessonMeta.estimated}</span> : null}
              </div>
            </div>
          ) : null}

          <div id="source-code" className="content-card mb-4">
            <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
              <h2 className="page-title mb-0">Try The Code</h2>
              <span className="badge rounded-pill badge-soft">See the Java shape early</span>
            </div>
            <div className="topic-meta">
              <span className="badge rounded-pill badge-soft">{conceptLabel}</span>
              <span className="badge rounded-pill badge-soft">Java Source</span>
              {topicSummary.previewRequired ? <span className="badge rounded-pill badge-warning-soft">Preview-sensitive</span> : null}
            </div>
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
                  {topicRunner === 'embedded'
                    ? 'Use the run button to send this stable example directly to JDoodle, or copy it into another playground.'
                    : 'This topic is best run locally because it depends on newer or preview Java behavior.'}
                </p>
                {topicRunner === 'local' ? (
                  <p className="mb-0 text-danger-emphasis">
                    This topic uses newer Java features that may need local JDK 25 preview support.
                  </p>
                ) : null}
              </div>
              <div className="topic-brief-card">
                <div className="eyebrow mb-2">What Changed</div>
                <p className="mb-0">{firstNonEmpty(lessonFlow.finalSolution?.plain, topicSummary.whyThisWorks, ideaSummary)}</p>
              </div>
            </div>
            <div className="topic-meta">
              {topicSummary.storyHook || lessonFlow.whyExists?.plain ? (
                <span className="badge rounded-pill badge-soft">{truncateText(firstNonEmpty(topicSummary.storyHook, lessonFlow.whyExists?.plain), 90)}</span>
              ) : null}
            </div>
            <div className="code-cta mb-3">
              <div>
                <div className="eyebrow mb-1">Copy Or Try This Code</div>
                <div className="muted-copy mb-0">Copy the snippet directly or open it in an online playground before reading line by line. The goal is to connect the code to the idea immediately.</div>
              </div>
              <TopicActionButtons code={data.raw} runner={topicRunner} copyLabel="Copy Code Snippet" />
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

          {(lessonFlow.walkthrough || lessonFlow.mentalModel) ? (
            <div id="understand-it" className="content-card mb-4">
              <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
                <h2 className="page-title mb-0">Understand What Happened</h2>
                <span className="badge rounded-pill badge-soft">Build the mental model</span>
              </div>
              <div className="journey-grid journey-grid-primary">
                {lessonFlow.walkthrough ? (
                  <div className="section-panel">
                    <div className="eyebrow mb-2">Walkthrough</div>
                    <LessonSectionContent section={lessonFlow.walkthrough} manifest={manifest} contentPath={data.topic.guide?.contentPath} />
                  </div>
                ) : null}
                {lessonFlow.mentalModel ? (
                  <div className="section-panel section-panel-soft">
                    <div className="eyebrow mb-2">Mental Model</div>
                    <LessonSectionContent section={lessonFlow.mentalModel} manifest={manifest} contentPath={data.topic.guide?.contentPath} />
                  </div>
                ) : null}
              </div>
            </div>
          ) : null}

          {(lessonFlow.mistakes || lessonFlow.tradeoffs || lessonFlow.useAvoid || topicSummary.commonMistake || topicSummary.useWhen || topicSummary.avoidWhen) ? (
            <div id="use-it-well" className="content-card mb-4">
              <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
                <h2 className="page-title mb-0">Use It Well</h2>
                <span className="badge rounded-pill badge-soft">Mistakes and tradeoffs</span>
              </div>
              <div className="journey-grid journey-grid-primary">
                {(lessonFlow.mistakes || topicSummary.commonMistake) ? (
                  <div className="section-panel">
                    <div className="eyebrow mb-2">Common Mistakes</div>
                    {lessonFlow.mistakes ? (
                      <LessonSectionContent section={lessonFlow.mistakes} manifest={manifest} contentPath={data.topic.guide?.contentPath} />
                    ) : (
                      <p className="mb-0 muted-copy">{topicSummary.commonMistake}</p>
                    )}
                  </div>
                ) : null}
                {(lessonFlow.tradeoffs || topicSummary.useWhen || topicSummary.avoidWhen) ? (
                  <div className="section-panel">
                    <div className="eyebrow mb-2">Tradeoffs</div>
                    {lessonFlow.tradeoffs ? (
                      <LessonSectionContent section={lessonFlow.tradeoffs} manifest={manifest} contentPath={data.topic.guide?.contentPath} />
                    ) : (
                      <div className="insight-grid compact-grid">
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
                      </div>
                    )}
                  </div>
                ) : null}
                {(lessonFlow.useAvoid || topicSummary.useWhen || topicSummary.avoidWhen) ? (
                  <div className="section-panel section-panel-soft">
                    <div className="eyebrow mb-2">Use / Avoid</div>
                    {lessonFlow.useAvoid ? (
                      <LessonSectionContent section={lessonFlow.useAvoid} manifest={manifest} contentPath={data.topic.guide?.contentPath} />
                    ) : (
                      <div className="insight-grid compact-grid">
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
                      </div>
                    )}
                  </div>
                ) : null}
              </div>
            </div>
          ) : null}

          {(takeaways.length || lessonFlow.summary) ? (
            <div id="takeaways" className="content-card mb-4">
              <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
                <h2 className="page-title mb-0">Leave With This</h2>
                <span className="badge rounded-pill badge-soft">Eureka checkpoint</span>
              </div>
              {lessonFlow.summary ? (
                <div className="section-panel section-panel-strong mb-3">
                  <LessonSectionContent section={lessonFlow.summary} manifest={manifest} contentPath={data.topic.guide?.contentPath} />
                </div>
              ) : null}
              {takeaways.length ? <BulletList items={takeaways} /> : null}
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

          <InterviewQuestionsPanel questions={interviewQuestions} />
        </div>
        {!uiPreferences.readingMode ? (
          <div className="content-side">
            <InPageToc items={topicToc} />
          </div>
        ) : null}
      </div>
      <FeedbackBar routeKey={routeKey} feedbackState={feedbackState} />
    </PageLayout>
  );
}
