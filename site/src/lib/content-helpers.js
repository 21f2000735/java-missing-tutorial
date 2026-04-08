import {
  COMPANY_INTERVIEW_PROFILES,
  JAVA_VERSION_RANK,
  MODE_COPY,
  SECTION_PREREQUISITES,
  VERSION_HINTS
} from './site-data.js';

export function stripMarkdown(value = '') {
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

export function truncateText(value, max = 180) {
  if (!value) {
    return '';
  }
  if (value.length <= max) {
    return value;
  }
  return `${value.slice(0, max - 1).trimEnd()}…`;
}

export function sourcePathFromHref(href, repoRoot) {
  if (!href || href.startsWith('#')) {
    return '';
  }
  const normalizedRepoRoot = repoRoot.replace(/\\/g, '/');
  if (href.startsWith(normalizedRepoRoot)) {
    return href.slice(normalizedRepoRoot.length + 1);
  }
  const direct = href
    .replace(/^\.\//, '')
    .replace(/^\//, '');
  if (/^(?:src|planning|README\.md|CONTRIBUTING\.md)/.test(direct)) {
    return direct;
  }
  return '';
}

export function sourcePathToContentPath(sourcePath) {
  if (!sourcePath) {
    return '';
  }
  if (sourcePath.endsWith('.md')) {
    return normalizeContentPath(`content/${sourcePath}`);
  }
  if (sourcePath.endsWith('.java') || sourcePath.endsWith('.svg') || sourcePath.endsWith('.json')) {
    return normalizeContentPath(`content/library/${sourcePath.replace(/^src\/main\/java\/com\/learning\/javamissing\//, '')}`);
  }
  return '';
}

export function normalizeContentPath(value) {
  return value.replace(/\\/g, '/').replace(/^\/+/, '');
}

export function resolveRelativeContentPath(href, currentContentPath) {
  if (!href || !currentContentPath || href.startsWith('#') || /^https?:\/\//.test(href)) {
    return '';
  }
  const currentParts = currentContentPath.split('/');
  currentParts.pop();
  href.split('/').forEach((part) => {
    if (!part || part === '.') {
      return;
    }
    if (part === '..') {
      currentParts.pop();
      return;
    }
    currentParts.push(part);
  });
  return currentParts.join('/');
}

export function parseGuide(raw) {
  const lines = raw.split('\n');
  const sections = [];
  let title = '';
  const introLines = [];
  let current = null;

  lines.forEach((line) => {
    const headingMatch = line.match(/^##\s+(.*)/);
    const titleMatch = line.match(/^#\s+(.*)/);

    if (titleMatch && !title) {
      title = titleMatch[1].trim();
      return;
    }

    if (headingMatch) {
      if (current) {
        sections.push(current);
      }
      current = {
        title: headingMatch[1].trim(),
        lines: []
      };
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

export function parseFrontmatter(raw = '') {
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
    return blockLines.join('\n').replace(/\n$/, '');
  }

  while (index < lines.length) {
    const line = lines[index];
    const keyMatch = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!keyMatch) {
      index += 1;
      continue;
    }

    const [, key, rawValue] = keyMatch;
    if (rawValue === '|' || rawValue === '>') {
      const blockLines = [];
      index += 1;
      while (index < lines.length && (/^\s+/.test(lines[index]) || !lines[index].trim())) {
        blockLines.push(lines[index].replace(/^\s?/, ''));
        index += 1;
      }
      meta[key] = parseBlockValue(blockLines);
      continue;
    }

    if (!rawValue && lines[index + 1]?.trim().startsWith('- ')) {
      const items = [];
      index += 1;
      while (index < lines.length && lines[index].trim().startsWith('- ')) {
        items.push(parseScalar(lines[index].trim().slice(2)));
        index += 1;
      }
      meta[key] = items;
      continue;
    }

    meta[key] = parseScalar(rawValue);
    index += 1;
  }

  return { meta, body: raw.slice(match[0].length) };
}

export function normalizeJavaVersion(value = '') {
  const normalized = value.trim().toLowerCase();
  if (!normalized) {
    return '';
  }
  if (normalized === 'all') {
    return 'All';
  }
  const numberMatch = normalized.match(/(?:java\s*)?(\d+)/);
  if (!numberMatch) {
    return value.trim();
  }
  return `Java ${numberMatch[1]}`;
}

export function javaVersionRank(value = '') {
  return JAVA_VERSION_RANK[normalizeJavaVersion(value)] || 0;
}

export function inferChapterJavaVersion(sectionSlug, chapter) {
  const chapterKey = `${sectionSlug}/${chapter.slug}`;
  return normalizeJavaVersion(
    chapter.javaVersion
      || VERSION_HINTS[chapterKey]?.introduced
      || VERSION_HINTS[sectionSlug]?.introduced
      || ''
  );
}

export function matchesVersionFilter(chapterVersion, filter) {
  if (filter === 'All') {
    return true;
  }
  const targetRank = javaVersionRank(filter);
  const chapterRank = javaVersionRank(chapterVersion);
  if (!chapterRank || !targetRank) {
    return true;
  }
  return chapterRank <= targetRank;
}

export function normalizeInterviewQuestions(value) {
  if (Array.isArray(value)) {
    return value
      .map((item) => ({
        question: String(item.question || '').trim(),
        answer: String(item.answer || '').trim()
      }))
      .filter((item) => item.question);
  }

  return String(value || '')
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [question, ...rest] = line.split('|');
      return {
        question: stripMarkdown(question || ''),
        answer: stripMarkdown(rest.join('|'))
      };
    })
    .filter((item) => item.question);
}

export function scoreLabel(score) {
  if (!score?.total) {
    return '';
  }
  return `${score.score}/${score.total}`;
}

export function findGuideSection(guide, titles) {
  return guide.sections.find((section) => titles.includes(section.title));
}

export function firstNonEmpty(...values) {
  return values.find((value) => String(value || '').trim()) || '';
}

export function bulletItems(raw = '') {
  return raw
    .split('\n')
    .filter((line) => /^\s*[-*]\s+/.test(line))
    .map((line) => stripMarkdown(line.replace(/^[-*]\s+/, '')))
    .filter(Boolean);
}

export function numberedItems(raw = '') {
  return raw
    .split('\n')
    .filter((line) => /^\s*\d+\.\s+/.test(line))
    .map((line) => stripMarkdown(line.replace(/^\d+\.\s+/, '')))
    .filter(Boolean);
}

export function titleFromSlug(value) {
  return value
    .replace(/^sec\d+_/, '')
    .replace(/^ch\d+_/, '')
    .split('_')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

export function resolveVersionMeta(sectionSlug, chapterSlug, lessonMeta = {}, preview = {}) {
  const chapterKey = `${sectionSlug}/${chapterSlug}`;
  const explicitVersion = normalizeJavaVersion(lessonMeta.java || lessonMeta.javaVersion || '');
  const hint = VERSION_HINTS[chapterKey] || VERSION_HINTS[sectionSlug] || {};
  const display = explicitVersion || normalizeJavaVersion(hint.introduced || '');
  const status = String(lessonMeta.status || hint.status || '').trim();
  return {
    display,
    status,
    previewRequired: preview.previewRequired || status.toLowerCase() === 'preview'
  };
}

export function statusTone(status = '') {
  const normalized = status.toLowerCase();
  if (normalized === 'preview') {
    return 'warning';
  }
  if (normalized === 'final' || normalized === 'stable') {
    return 'success';
  }
  return 'soft';
}

export function badgeClassForTone(tone) {
  if (tone === 'warning') {
    return 'badge-warning-soft';
  }
  if (tone === 'success') {
    return 'badge-success-soft';
  }
  return 'badge-soft';
}

export function normalizeLessonMode(value = '') {
  const normalized = String(value).trim().toLowerCase();
  if (normalized === 'interview' || normalized === 'certification' || normalized === 'shared') {
    return normalized;
  }
  return '';
}

export function inferTopicMode(sectionSlug, chapterSlug, lessonMeta = {}) {
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

export function modePresentation(mode) {
  return MODE_COPY[mode] || MODE_COPY.shared;
}

export function getSectionPrerequisiteInfo(sectionSlug) {
  return SECTION_PREREQUISITES[sectionSlug] || { before: [], next: [] };
}

export function parseCompanyQuestionBank(raw = '') {
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

export function parseTopicMeta(code) {
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

export function extractPrintedValue(code, label) {
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
    if (collected.length || line.startsWith('System.out.println("')) {
      break;
    }
  }
  return collected.join(' ');
}

export function extractAfterReadingTakeaways(code) {
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

export function extractCodePreview(raw) {
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

export function effectiveRunner(preview, lessonMeta = {}) {
  if (lessonMeta.runner) {
    return lessonMeta.runner;
  }
  return preview.previewRequired ? 'local' : 'embedded';
}

export function extractTopicLessonFlow(raw = '') {
  if (!raw.trim()) {
    return {
      guide: null,
      concept: null,
      example: null,
      whatHappens: null,
      whatStaysStable: null,
      whatChanges: null,
      whyItMatters: null,
      rule: null,
      tryThis: null
    };
  }

  const guide = parseGuide(raw);
  const concept = findGuideSection(guide, ['Concept']);
  const example = findGuideSection(guide, ['Example']);
  const whatHappens = findGuideSection(guide, ['What Happens']);
  const whatStaysStable = findGuideSection(guide, ['What Stays Stable']);
  const whatChanges = findGuideSection(guide, ['What Changes']);
  const whyItMatters = findGuideSection(guide, ['Why It Matters']);
  const rule = findGuideSection(guide, ['Rule']);
  const tryThis = findGuideSection(guide, ['Try This']);

  return {
    guide,
    concept,
    example,
    whatHappens,
    whatStaysStable,
    whatChanges,
    whyItMatters,
    rule,
    tryThis,
    whyExists: concept,
    pain: whyItMatters,
    creatorMindset: whatStaysStable,
    inventIt: concept,
    naiveAttempt: whatChanges,
    whyBreaks: whatChanges,
    finalSolution: rule,
    walkthrough: whatHappens,
    mentalModel: whatStaysStable,
    mistakes: whatChanges,
    tradeoffs: whyItMatters,
    useAvoid: whyItMatters,
    summary: tryThis,
    why: whyItMatters,
    invention: concept
  };
}
