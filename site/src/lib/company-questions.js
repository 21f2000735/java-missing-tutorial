import questions from '../data/company_questions.json';

export const COMPANY_FILTERS = ['All', 'Amazon', 'Google', 'Microsoft', 'Flipkart', 'Uber', 'Swiggy', 'Zepto', 'Paytm'];
export const LEVEL_FILTERS = ['All', 'fresher', 'intermediate', 'senior'];
export const TOPIC_ORDER = [
  'Core Java',
  'OOP',
  'Collections',
  'Java 8 Features',
  'Multithreading & Concurrency',
  'JVM Internals',
  'Design Patterns',
  'System Design / LLD'
];

const COMPANY_BADGE_CLASSES = {
  Amazon: 'company-pill-amazon',
  Google: 'company-pill-google',
  Microsoft: 'company-pill-microsoft',
  Flipkart: 'company-pill-flipkart',
  Uber: 'company-pill-uber',
  Swiggy: 'company-pill-swiggy',
  Zepto: 'company-pill-zepto',
  Paytm: 'company-pill-paytm'
};

const SECTION_TOPIC_MAP = {
  sec01_fundamentals: {
    ch01_java_basics: 'Core Java',
    ch02_classes_and_objects: 'OOP'
  },
  sec02_collections: 'Collections',
  sec03_generics: 'Core Java',
  sec04_streams_and_functional_style: 'Java 8 Features',
  sec05_multithreading_and_concurrency: 'Multithreading & Concurrency',
  sec06_design_patterns: 'Design Patterns',
  sec07_principles_and_solid: 'OOP',
  sec08_internal_of_jvm: 'JVM Internals',
  sec09_hidden_java_features: 'Java 8 Features',
  sec10_reflection_and_metadata: 'JVM Internals',
  sec11_exception_handling: 'Core Java',
  sec12_networking: 'System Design / LLD',
  sec13_io_and_data_access: 'Core Java',
  sec14_famous_design_problems: 'System Design / LLD',
  sec15_clean_code_and_refactoring: 'OOP',
  sec16_core_data_time_and_text: 'Java 8 Features',
  sec17_language_modeling_and_modern_types: 'Core Java',
  sec18_architecture_and_integration: 'System Design / LLD',
  sec19_testing_and_quality: 'System Design / LLD',
  sec20_data_structures_and_complexity: 'Collections',
  sec21_company_interview_tracks: 'System Design / LLD'
};

export function getCompanyQuestions() {
  return questions;
}

export function companyBadgeClass(company) {
  return COMPANY_BADGE_CLASSES[company] || 'company-pill-default';
}

export function isFrequentlyAsked(question) {
  return Array.isArray(question.company) && question.company.length >= 3;
}

export function matchesCompanyQuestion(question, filters) {
  if (filters.company !== 'All' && !question.company.includes(filters.company)) {
    return false;
  }
  if (filters.topic !== 'All' && question.topic !== filters.topic) {
    return false;
  }
  if (filters.level !== 'All' && question.level !== filters.level) {
    return false;
  }
  return true;
}

export function sortCompanyQuestions(list) {
  return [...list].sort((left, right) => {
    const topicDelta = TOPIC_ORDER.indexOf(left.topic) - TOPIC_ORDER.indexOf(right.topic);
    if (topicDelta !== 0) {
      return topicDelta;
    }
    const companyDelta = right.company.length - left.company.length;
    if (companyDelta !== 0) {
      return companyDelta;
    }
    return left.id.localeCompare(right.id);
  });
}

export function questionsForFilters(filters) {
  return sortCompanyQuestions(questions.filter((question) => matchesCompanyQuestion(question, filters)));
}

export function topicFilterOptions() {
  return [...new Set(questions.map((question) => question.topic))].sort((left, right) => TOPIC_ORDER.indexOf(left) - TOPIC_ORDER.indexOf(right));
}

export function questionsForChapter(sectionSlug, chapterSlug) {
  const topic = SECTION_TOPIC_MAP[sectionSlug]?.[chapterSlug] || SECTION_TOPIC_MAP[sectionSlug] || '';
  if (!topic) {
    return [];
  }
  return sortCompanyQuestions(questions.filter((question) => question.topic === topic)).slice(0, 3);
}

export function chapterTopicLabel(sectionSlug, chapterSlug) {
  return SECTION_TOPIC_MAP[sectionSlug]?.[chapterSlug] || SECTION_TOPIC_MAP[sectionSlug] || '';
}
