export const RESOURCE_DESCRIPTIONS = {
  README: 'What this learning repo is trying to become and how to use it without getting lost.',
  PLANNING: 'A short map of the planning, roadmap, quality, and book-building documents that support the site.',
  BOOK: 'A book-style reading order for people who want narrative flow instead of random browsing.',
  CURRICULUM: 'Section-by-section map so similar concepts stay together and the learning path feels intentional.',
  ROADMAP_099: 'The longer curriculum direction and how this content can expand over time.',
  TOP_20_BOOKS: 'The books and references shaping the code examples, tradeoffs, and deeper explanations.',
  BOOK_MANUSCRIPT: 'A combined manuscript view when you want to read the material like one long book.',
  OCJP_TRACK: 'A guided path for certification-focused readers who want objective coverage, revision order, and practice priorities.',
  INTERVIEW_TRACK: 'A guided path for coding, backend, debugging, and company-style interview preparation across the repo.',
  MODERN_JAVA_TRACK: 'A guided path for readers moving from older Java to modern Java 17, 21, and 25-era features.',
  JAVA_7_TO_25: 'A release-by-release learning track so users can understand what changed from Java 7 through Java 25.',
  JAVA_MIGRATION_GUIDES: 'Upgrade guides for the biggest Java jumps, with what to learn, what to watch, and what to modernize.',
  HIGH_DEMAND_JAVA_TOPICS: 'A practical path through the Java topics people keep searching for: collections, streams, errors, concurrency, HTTP, and JVM basics.',
  COMPANY_QUESTION_BANK: 'Company-wise interview tracks with original question-and-answer practice for Google, Meta, Amazon, Apple, Netflix, Coinbase, Jane Street, MakeMyTrip, and HotelTrader.',
  INTERVIEW_PROBLEM_APPROACH: 'A step-by-step process for how to approach coding, backend, debugging, and system questions in interviews.',
  INTERVIEW_INDEX: 'A fast lookup page for interview prep: topic index, company index, short study sprints, and a clean restart point when you need quick direction.',
  VISUAL_LESSON_STANDARD: 'The repo standard for visual-first topics: use diagrams before code when the main confusion is internal working, memory shape, lifecycle, or architecture flow.',
  COMPARE_COLLECTIONS: 'A quick compare page for List, Set, and Map: shape, performance, and common mistakes.',
  COMPARE_STREAMS: 'A quick compare page for loops versus streams, focused on clarity, tradeoffs, and debugging.',
  COMPARE_CONCURRENCY: 'A quick compare page for Thread, ExecutorService, and virtual threads.',
  TOPIC_COVERAGE_MAP: 'A one-page map showing where strings, internals, generics, concurrency, testing, tooling, and other major Java topics live in the book.'
};

export const HIGH_DEMAND_TOPICS = [
  {
    title: 'List, Set, Map',
    route: './topics/list-set-map/',
    why: 'People keep searching for the right collection choice because it affects correctness, readability, and performance.'
  },
  {
    title: 'Stream Pipeline',
    route: './topics/stream-pipeline/',
    why: 'Streams remain one of the most searched Java topics because developers need a clear mental model for filter-map-collect flow.'
  },
  {
    title: 'Collectors',
    route: './topics/collectors/',
    why: 'Collectors are where many stream users get stuck, especially around grouping, counting, and mapping results.'
  },
  {
    title: 'Threads',
    route: './topics/threads/',
    why: 'Basic thread behavior is still the entry point for understanding executors, synchronization, and virtual threads.'
  },
  {
    title: 'Handling Payment Failures',
    route: './topics/handling-payment-failures/',
    why: 'Exception handling stays highly searched because it directly affects debugging, user messaging, and reliability.'
  },
  {
    title: 'HTTP Client Basics',
    route: './topics/http-client-basics/',
    why: 'Modern Java services frequently need outbound HTTP calls, so request-building basics matter immediately.'
  },
  {
    title: 'Stack, Heap, and References',
    route: './topics/stack-heap-and-references/',
    why: 'JVM memory basics stay popular because they explain mutation surprises, debugging confusion, and interview questions.'
  }
];

export const SECTION_PROFILES = {
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
    hook: 'Cover the utility-heavy Java areas that show up everywhere: Optional, time, formatting, text, and strings.',
    problems: [
      'Date, time, Optional, and formatting APIs feel fragmented.',
      'You want a stable way to reason about strings, text, and value formatting.',
      'You need high-frequency utility knowledge for interviews and daily work.'
    ]
  },
  sec17_language_modeling_and_modern_types: {
    icon: 'bi bi-bezier2',
    hook: 'Use modern Java language features to model data more clearly and with less ceremony.',
    problems: [
      'Pattern matching, records, and sealed types feel newer than your mental model.',
      'You want to model intent with less boilerplate.',
      'You need modern-Java fluency for Java 17+ work.'
    ]
  },
  sec18_architecture_and_integration: {
    icon: 'bi bi-diagram-2',
    hook: 'Bridge language knowledge into module boundaries, platform concerns, and safe integration design.',
    problems: [
      'You want to understand modules and larger-system integration choices.',
      'Architecture topics feel too abstract without code anchors.',
      'You need system shape, not just method syntax.'
    ]
  },
  sec19_testing_and_quality: {
    icon: 'bi bi-check2-square',
    hook: 'Use tests to protect behavior and clarify design instead of treating them as cleanup work.',
    problems: [
      'You can write code faster than you can trust it.',
      'Tests feel repetitive or disconnected from business rules.',
      'You want better validation of correctness under change.'
    ]
  },
  sec20_data_structures_and_complexity: {
    icon: 'bi bi-bar-chart-steps',
    hook: 'Understand the cost model behind code choices so interviews stop feeling like memorization drills.',
    problems: [
      'You know collection APIs but not their internals and cost tradeoffs.',
      'Big-O still feels abstract until a concrete problem appears.',
      'You want reusable problem-solving patterns.'
    ]
  },
  sec21_company_interview_tracks: {
    icon: 'bi bi-buildings',
    hook: 'Practice company-style pressure using Java-flavored backend, debugging, and design prompts.',
    problems: [
      'You want to hear what company questions are really testing.',
      'Interview prep feels scattered across coding, systems, and behavioral pressure.',
      'You want company flavor without memorizing leaked questions.'
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

export const SECTION_PREREQUISITES = {
  sec01_fundamentals: { before: [], next: ['sec02_collections', 'sec03_generics', 'sec15_clean_code_and_refactoring'] },
  sec02_collections: { before: ['sec01_fundamentals'], next: ['sec03_generics', 'sec04_streams_and_functional_style', 'sec20_data_structures_and_complexity'] },
  sec03_generics: { before: ['sec01_fundamentals', 'sec02_collections'], next: ['sec04_streams_and_functional_style'] },
  sec04_streams_and_functional_style: { before: ['sec02_collections', 'sec03_generics'], next: ['sec05_multithreading_and_concurrency', 'sec19_testing_and_quality'] },
  sec05_multithreading_and_concurrency: { before: ['sec01_fundamentals', 'sec02_collections', 'sec04_streams_and_functional_style'], next: ['sec08_internal_of_jvm', 'sec21_company_interview_tracks'] },
  sec08_internal_of_jvm: { before: ['sec01_fundamentals', 'sec05_multithreading_and_concurrency'], next: ['sec11_exception_handling', 'sec21_company_interview_tracks'] },
  sec11_exception_handling: { before: ['sec01_fundamentals'], next: ['sec12_networking', 'sec13_io_and_data_access', 'sec21_company_interview_tracks'] },
  sec16_core_data_time_and_text: { before: ['sec01_fundamentals', 'sec02_collections'], next: ['sec18_architecture_and_integration'] },
  sec17_language_modeling_and_modern_types: { before: ['sec01_fundamentals', 'sec07_principles_and_solid'], next: ['sec18_architecture_and_integration'] },
  sec19_testing_and_quality: { before: ['sec01_fundamentals', 'sec11_exception_handling'], next: ['sec21_company_interview_tracks'] },
  sec20_data_structures_and_complexity: { before: ['sec01_fundamentals', 'sec02_collections'], next: ['sec21_company_interview_tracks'] },
  sec21_company_interview_tracks: { before: ['sec02_collections', 'sec04_streams_and_functional_style', 'sec05_multithreading_and_concurrency', 'sec11_exception_handling', 'sec20_data_structures_and_complexity'], next: ['sec22_build_and_tooling'] },
  sec22_build_and_tooling: { before: ['sec01_fundamentals'], next: [] }
};

export const VERSION_HINTS = {
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

export const COMPANY_INTERVIEW_PROFILES = {
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

export const PLAYGROUND_LINKS = {
  jdoodle: 'https://www.jdoodle.com/online-java-compiler/',
  onecompiler: 'https://onecompiler.com/studio/java'
};

export const MODE_COPY = {
  interview: { label: 'Interview Ready', badgeClass: 'badge-danger-soft' },
  certification: { label: 'Certification Ready', badgeClass: 'badge-warning-soft' },
  shared: { label: 'Shared Core', badgeClass: 'badge-success-soft' }
};

export const JAVA_VERSION_FILTERS = ['All', 'Java 8', 'Java 11', 'Java 17', 'Java 21', 'Java 25'];

export const JAVA_VERSION_RANK = {
  'Java 8': 8,
  'Java 11': 11,
  'Java 17': 17,
  'Java 21': 21,
  'Java 25': 25
};

export function resourceSummaryFromSlug(slug) {
  return RESOURCE_DESCRIPTIONS[slug] || 'Open the original markdown behind this learning site.';
}
