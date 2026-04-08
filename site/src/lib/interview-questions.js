import { readStorageJson, readStorageValue, writeStorageJson, writeStorageValue } from './browser-runtime.js';
import { companyBadgeClass as sharedCompanyBadgeClass } from './company-questions.js';
import questions from '../data/interview_questions.json';

export const INTERVIEW_BAND_STORAGE_KEY = 'java-interview-band';
export const INTERVIEW_BAND_DEFAULT = 3;
export const INTERVIEW_QUESTION_COUNT = questions.length;

export const COMPANY_FILTERS = ['All', 'Amazon', 'Google', 'Microsoft', 'Flipkart', 'Uber', 'Swiggy', 'Zepto', 'Paytm'];
export const TOPIC_FILTERS = [
  'All',
  'Core Java',
  'OOP',
  'Collections',
  'Java 8-21',
  'Concurrency',
  'JVM',
  'Spring Boot',
  'Hibernate',
  'Design Patterns',
  'LLD',
  'HLD',
  'Distributed Systems',
  'Architecture'
];
export const FREQUENCY_FILTERS = ['All', 'Very High', 'High'];
export const BAND_OPTIONS = [
  { value: 1, label: 'Fresher', subtitle: '0-1y', summary: 'Fresher & below' },
  { value: 2, label: 'Junior', subtitle: '1-3y', summary: 'Junior & below' },
  { value: 3, label: 'Mid', subtitle: '3-6y', summary: 'Mid & below' },
  { value: 4, label: 'Senior', subtitle: '6-10y', summary: 'Senior & below' },
  { value: 5, label: 'Staff', subtitle: '10-15y', summary: 'Staff & below' },
  { value: 6, label: 'Architect', subtitle: '15-30y', summary: 'Architect & below' }
];

const BAND_LABELS = {
  1: 'Fresher (0–1 yrs)',
  2: 'Junior (1–3 yrs)',
  3: 'Mid (3–6 yrs)',
  4: 'Senior (6–10 yrs)',
  5: 'Staff (10–15 yrs)',
  6: 'Architect (15–30 yrs)'
};

const BAND_SCORES = {
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6
};

const LEVEL_BY_BAND = {
  1: 'fresher',
  2: 'intermediate',
  3: 'intermediate',
  4: 'senior',
  5: 'architect',
  6: 'architect'
};

const BAND_BADGE_CLASSES = {
  1: 'band-badge-fresher',
  2: 'band-badge-junior',
  3: 'band-badge-mid',
  4: 'band-badge-senior',
  5: 'band-badge-staff',
  6: 'band-badge-architect'
};

const TOPIC_ALIASES = {
  'Java 8-21': ['Java 8-21', 'Java 8 Features'],
  JVM: ['JVM'],
  'Spring Boot': ['Spring Boot'],
  Hibernate: ['Hibernate'],
  'Design Patterns': ['Design Patterns'],
  LLD: ['LLD'],
  HLD: ['HLD'],
  'Distributed Systems': ['Distributed Systems'],
  Architecture: ['Architecture']
};

export function getInterviewQuestions() {
  return questions;
}

export function bandLabelForValue(band) {
  return BAND_LABELS[band] || BAND_LABELS[INTERVIEW_BAND_DEFAULT];
}

export function bandSummaryForValue(band) {
  return BAND_OPTIONS.find((item) => item.value === band)?.summary || BAND_OPTIONS.find((item) => item.value === INTERVIEW_BAND_DEFAULT)?.summary;
}

export function normalizeBand(value) {
  const parsed = Number.parseInt(String(value), 10);
  return BAND_SCORES[parsed] ? parsed : INTERVIEW_BAND_DEFAULT;
}

export function levelForBand(band) {
  return LEVEL_BY_BAND[normalizeBand(band)] || 'intermediate';
}

export function bandBadgeClass(band) {
  return BAND_BADGE_CLASSES[normalizeBand(band)] || BAND_BADGE_CLASSES[INTERVIEW_BAND_DEFAULT];
}

export function frequencyDisplay(frequency) {
  if (frequency === 'very-high') {
    return '🔥🔥 Very High';
  }
  if (frequency === 'high') {
    return '🔥 High';
  }
  return 'Medium';
}

export function frequencyMatchesFilter(questionFrequency, filter) {
  if (filter === 'All') {
    return true;
  }
  if (filter === 'Very High') {
    return questionFrequency === 'very-high';
  }
  if (filter === 'High') {
    return questionFrequency === 'very-high' || questionFrequency === 'high';
  }
  return true;
}

export function matchesTopicFilter(questionTopic, filter) {
  if (filter === 'All') {
    return true;
  }
  return TOPIC_ALIASES[filter]?.includes(questionTopic) || questionTopic === filter;
}

export function questionMatchesBand(question, band) {
  return normalizeBand(question.band) <= normalizeBand(band);
}

export function matchesInterviewQuestion(question, filters) {
  if (!questionMatchesBand(question, filters.band)) {
    return false;
  }
  if (filters.company !== 'All' && !question.company.includes(filters.company)) {
    return false;
  }
  if (!matchesTopicFilter(question.topic, filters.topic)) {
    return false;
  }
  if (!frequencyMatchesFilter(question.frequency, filters.frequency)) {
    return false;
  }
  return true;
}

export function sortInterviewQuestions(list) {
  return [...list].sort((left, right) => {
    const bandDelta = normalizeBand(left.band) - normalizeBand(right.band);
    if (bandDelta !== 0) {
      return bandDelta;
    }
    const topicDelta = left.topic.localeCompare(right.topic);
    if (topicDelta !== 0) {
      return topicDelta;
    }
    const frequencyRank = { medium: 0, high: 1, 'very-high': 2 };
    const freqDelta = frequencyRank[right.frequency] - frequencyRank[left.frequency];
    if (freqDelta !== 0) {
      return freqDelta;
    }
    return left.id.localeCompare(right.id);
  });
}

export function filteredInterviewQuestions(filters) {
  return sortInterviewQuestions(questions.filter((question) => matchesInterviewQuestion(question, filters)));
}

export function questionsForTopic(topic, band = INTERVIEW_BAND_DEFAULT) {
  return sortInterviewQuestions(
    questions.filter((question) => matchesTopicFilter(question.topic, topic) && questionMatchesBand(question, band))
  );
}

export function selectedInterviewBand() {
  return normalizeBand(readStorageValue(INTERVIEW_BAND_STORAGE_KEY, String(INTERVIEW_BAND_DEFAULT)));
}

export function setSelectedInterviewBand(band) {
  writeStorageValue(INTERVIEW_BAND_STORAGE_KEY, String(normalizeBand(band)));
}

export function readStoredInterviewFilters() {
  return readStorageJson('java-interview-hub-filters', {
    band: INTERVIEW_BAND_DEFAULT,
    company: 'All',
    topic: 'All',
    frequency: 'All'
  });
}

export function writeStoredInterviewFilters(filters) {
  const payload = {
    band: normalizeBand(filters.band),
    company: filters.company || 'All',
    topic: filters.topic || 'All',
    frequency: filters.frequency || 'All'
  };
  writeStorageJson('java-interview-hub-filters', payload);
}

export function companyBadgeClass(company) {
  return sharedCompanyBadgeClass(company);
}

export function buildInterviewHubHash(filters = {}) {
  const params = new URLSearchParams();
  if (filters.band) {
    params.set('band', String(normalizeBand(filters.band)));
  }
  if (filters.company && filters.company !== 'All') {
    params.set('company', filters.company);
  }
  if (filters.topic && filters.topic !== 'All') {
    params.set('topic', filters.topic);
  }
  if (filters.frequency && filters.frequency !== 'All') {
    params.set('frequency', filters.frequency);
  }
  const query = params.toString();
  return query ? `#interview-hub?${query}` : '#interview-hub';
}

function tokenizeTopicText(value = '') {
  return String(value).toLowerCase();
}

export function chapterInterviewTopic(sectionSlug, chapterSlug, chapterTitle = '') {
  const key = `${sectionSlug}/${chapterSlug}`;
  const title = tokenizeTopicText(chapterTitle);

  const overrides = {
    'sec01_fundamentals/ch01_java_basics': 'Core Java',
    'sec01_fundamentals/ch02_classes_and_objects': 'OOP',
    'sec02_collections/ch01_collections': 'Collections',
    'sec02_collections/ch02_maps_and_iterators_in_depth': 'Collections',
    'sec03_generics/ch01_generics': 'Core Java',
    'sec04_streams_and_functional_style/ch01_streams': 'Java 8-21',
    'sec05_multithreading_and_concurrency/ch01_threads_and_races': 'Concurrency',
    'sec05_multithreading_and_concurrency/ch02_virtual_threads': 'Concurrency',
    'sec05_multithreading_and_concurrency/ch03_structured_concurrency': 'Concurrency',
    'sec05_multithreading_and_concurrency/ch04_scoped_values': 'Concurrency',
    'sec05_multithreading_and_concurrency/ch05_concurrency_primitives_and_futures': 'Concurrency',
    'sec06_design_patterns/ch01_strategy_pattern': 'Design Patterns',
    'sec06_design_patterns/ch02_creational_patterns': 'Design Patterns',
    'sec06_design_patterns/ch03_structural_patterns': 'Design Patterns',
    'sec06_design_patterns/ch04_behavioral_patterns': 'Design Patterns',
    'sec07_principles_and_solid/ch01_principles_of_good_design': 'OOP',
    'sec08_internal_of_jvm/ch01_memory_and_execution_basics': 'JVM',
    'sec08_internal_of_jvm/ch02_jvm_jdk_jre_and_class_loading': 'JVM',
    'sec08_internal_of_jvm/ch03_jit_and_garbage_collection': 'JVM',
    'sec09_hidden_java_features/ch01_underused_core_utilities': 'Java 8-21',
    'sec09_hidden_java_features/ch02_records_and_sealed_types': 'Java 8-21',
    'sec10_reflection_and_metadata/ch01_reflection_basics': 'JVM',
    'sec11_exception_handling/ch01_handling_failures': 'Core Java',
    'sec11_exception_handling/ch02_exception_design_and_resources': 'Core Java',
    'sec12_networking/ch01_http_client_basics': 'Architecture',
    'sec13_io_and_data_access/ch01_files_and_streams': 'Core Java',
    'sec13_io_and_data_access/ch02_files_buffers_and_serialization': 'Core Java',
    'sec14_famous_design_problems/ch01_lru_cache': 'LLD',
    'sec14_famous_design_problems/ch02_rate_limiter': 'LLD',
    'sec14_famous_design_problems/ch03_consistent_hashing': 'Distributed Systems',
    'sec14_famous_design_problems/ch04_blocking_queue': 'LLD',
    'sec15_clean_code_and_refactoring/ch01_readable_code_basics': 'Architecture',
    'sec16_core_data_time_and_text/ch01_optional': 'Java 8-21',
    'sec16_core_data_time_and_text/ch02_date_and_time': 'Java 8-21',
    'sec16_core_data_time_and_text/ch03_formatting_and_text_blocks': 'Java 8-21',
    'sec16_core_data_time_and_text/ch04_strings_in_depth': 'Core Java',
    'sec17_language_modeling_and_modern_types/ch01_pattern_matching': 'Java 8-21',
    'sec17_language_modeling_and_modern_types/ch02_records_and_sealed_types': 'Java 8-21',
    'sec18_architecture_and_integration/ch01_modules': 'Architecture',
    'sec18_architecture_and_integration/ch02_service_integration': 'Architecture',
    'sec18_architecture_and_integration/ch03_building_for_many_languages': 'Architecture',
    'sec19_testing_and_quality/ch01_testing_and_quality': 'Architecture',
    'sec19_testing_and_quality/ch02_junit5_and_test_doubles': 'Architecture',
    'sec20_data_structures_and_complexity/ch01_reasoning_about_time_and_space': 'Collections',
    'sec20_data_structures_and_complexity/ch02_collections_internals_and_tradeoffs': 'Collections',
    'sec20_data_structures_and_complexity/ch03_sorting_searching_and_binary_search': 'Collections',
    'sec20_data_structures_and_complexity/ch04_problem_solving_patterns': 'Collections',
    'sec21_company_interview_tracks/ch01_google_facebook_amazon': 'Architecture',
    'sec21_company_interview_tracks/ch02_microsoft_uber_flipkart': 'Architecture',
    'sec21_company_interview_tracks/ch03_netflix_makemytrip_hoteltrader': 'Architecture'
  };

  if (overrides[key]) {
    return overrides[key];
  }

  if (title.includes('collection') || title.includes('map') || title.includes('queue') || title.includes('heap') || title.includes('deque') || title.includes('hash')) {
    return 'Collections';
  }
  if (title.includes('concurrency') || title.includes('thread') || title.includes('executor') || title.includes('lock') || title.includes('future') || title.includes('virtual')) {
    return 'Concurrency';
  }
  if (title.includes('jvm') || title.includes('gc') || title.includes('class load') || title.includes('jit') || title.includes('memory')) {
    return 'JVM';
  }
  if (title.includes('spring')) {
    return 'Spring Boot';
  }
  if (title.includes('hibernate') || title.includes('jpa')) {
    return 'Hibernate';
  }
  if (title.includes('optional') || title.includes('stream') || title.includes('lambda') || title.includes('functional') || title.includes('pattern matching') || title.includes('record') || title.includes('sealed')) {
    return 'Java 8-21';
  }
  if (title.includes('pattern') || title.includes('singleton') || title.includes('builder') || title.includes('factory') || title.includes('strategy') || title.includes('observer')) {
    return 'Design Patterns';
  }
  if (title.includes('architecture') || title.includes('integration') || title.includes('service') || title.includes('module') || title.includes('incident') || title.includes('mentoring') || title.includes('api')) {
    return 'Architecture';
  }
  if (title.includes('lru') || title.includes('limiter') || title.includes('producer') || title.includes('consumer')) {
    return 'LLD';
  }
  if (title.includes('kafka') || title.includes('redis') || title.includes('saga') || title.includes('cqrs') || title.includes('distributed') || title.includes('observability') || title.includes('consensus') || title.includes('event')) {
    return 'Distributed Systems';
  }
  if (title.includes('oop') || title.includes('solid') || title.includes('class') || title.includes('object') || title.includes('design')) {
    return 'OOP';
  }
  return 'Core Java';
}

export function chapterQuestions(manifest, topic, band) {
  if (!topic) {
    return [];
  }
  return questionsForTopic(topic, band).slice(0, 3);
}

export function chapterRoutesForTopic(manifest, topic) {
  if (!manifest || !topic) {
    return [];
  }

  const routes = [];
  manifest.sections.forEach((section) => {
    section.chapters.forEach((chapter) => {
      const chapterTopic = chapterInterviewTopic(section.slug, chapter.slug, chapter.title);
      if (chapterTopic === topic) {
        routes.push({
          route: `#chapter/${section.slug}/${chapter.slug}`,
          title: chapter.title,
          sectionTitle: section.title
        });
      }
    });
  });
  return routes;
}
