import { HIGH_DEMAND_TOPICS, RESOURCE_DESCRIPTIONS, SECTION_PROFILES } from '../../lib/site-data.js';
import { BulletList } from '../common/AppChrome.jsx';

const START_ROUTES = [
  {
    title: 'Book Order',
    resourceSlug: 'BOOK',
    label: 'Reading order',
    note: 'Follow the chapters in the sequence that keeps the ideas connected.'
  },
  {
    title: 'Curriculum Map',
    resourceSlug: 'CURRICULUM',
    label: 'Structure',
    note: 'See how sections, chapters, and topics fit together.'
  },
  {
    title: 'Interview Track',
    resourceSlug: 'INTERVIEW_TRACK',
    label: 'Primary path',
    note: 'Use one path when you want pressure, tradeoffs, and answer structure.'
  },
  {
    title: 'Interview Index',
    resourceSlug: 'INTERVIEW_INDEX',
    label: 'Fast lookup',
    note: 'Jump straight to a topic when you already know the gap.'
  }
];

const FEATURED_SECTION_SLUGS = [
  'sec02_collections',
  'sec04_streams_and_functional_style',
  'sec05_multithreading_and_concurrency',
  'sec08_internal_of_jvm'
];

export default function HomePage({ manifest }) {
  const resourcesBySlug = new Map(manifest.resources.map((resource) => [resource.slug, resource]));

  const startRoutes = START_ROUTES
    .map((item) => ({ ...item, resource: resourcesBySlug.get(item.resourceSlug) }))
    .filter((item) => item.resource);

  const featuredSections = FEATURED_SECTION_SLUGS
    .map((slug) => {
      const section = manifest.sections.find((item) => item.slug === slug);
      if (!section) {
        return null;
      }
      const profile = SECTION_PROFILES[section.slug] || {};
      return { section, profile };
    })
    .filter(Boolean);

  const updates = [
    'Topics now lead with code, then explain what happens.',
    'Concurrency pages follow problem -> failure -> fix -> improvement.',
    'The home page now works as a landing page, not a dashboard.',
    'Use the interview track when you want a straight path through the repo.'
  ];

  return (
    <div className="home-page">
      <section className="home-hero">
        <div className="home-hero-copy">
          <p className="eyebrow mb-2">Java learning, simplified</p>
          <h1 className="home-title mb-3">Understand fast, then run code.</h1>
          <p className="home-subtitle mb-4">
            This site teaches Java through behavior, correctness, and concrete examples.
            Read one idea, run it, observe the result, then move to the next step.
          </p>
          <div className="home-actions">
            <a className="btn btn-dark rounded-pill px-4" href="#resource/INTERVIEW_TRACK">Start Interview Track</a>
            <a className="btn btn-outline-dark rounded-pill px-4" href="#resource/BOOK">Open Book Order</a>
            <a className="btn btn-outline-dark rounded-pill px-4" href="#resource/INTERVIEW_INDEX">Open Quick Index</a>
          </div>
          <div className="home-stats">
            <div>
              <strong>{manifest.stats.sections}</strong>
              <span>sections</span>
            </div>
            <div>
              <strong>{manifest.stats.chapters}</strong>
              <span>chapters</span>
            </div>
            <div>
              <strong>{manifest.stats.topics}</strong>
              <span>topics</span>
            </div>
          </div>
        </div>

        <aside className="home-hero-panel">
          <p className="eyebrow mb-2">How to use this site</p>
          <h2 className="home-panel-title mb-3">Read one path. Run one example. Change one assumption.</h2>
          <BulletList
            items={[
              'Pick one path instead of jumping between random topics.',
              'Run the example before reading the explanation.',
              'Change one line and note what stays stable and what changes.'
            ]}
          />
          <div className="home-panel-footnote mt-3">
            Best starting point: {RESOURCE_DESCRIPTIONS.INTERVIEW_TRACK}
          </div>
        </aside>
      </section>

      <hr className="home-divider" />

      <section className="home-section">
        <div className="home-section-head">
          <div>
            <p className="eyebrow mb-1">Start here</p>
            <h2 className="home-section-title mb-0">Stable entry points</h2>
          </div>
          <span className="home-section-note">Use these before browsing the full tree.</span>
        </div>
        <div className="home-link-grid">
          {startRoutes.map(({ title, resource, label, note }) => (
            <a className="home-link-card" href={`#resource/${resource.slug}`} key={resource.slug}>
              <span className="home-link-kicker">{label}</span>
              <h3 className="home-link-title">{title}</h3>
              <p className="home-link-note mb-0">{note}</p>
            </a>
          ))}
        </div>
      </section>

      <hr className="home-divider" />

      <section className="home-section">
        <div className="home-section-head">
          <div>
            <p className="eyebrow mb-1">Core topics</p>
            <h2 className="home-section-title mb-0">Highest-pressure areas</h2>
          </div>
          <span className="home-section-note">These are the places people most often get stuck.</span>
        </div>
        <div className="home-topic-grid">
          {HIGH_DEMAND_TOPICS.slice(0, 4).map((topic) => (
            <a className="home-topic-card" href={topic.route} key={topic.route}>
              <h3 className="home-topic-title">{topic.title}</h3>
              <p className="home-topic-copy mb-0">{topic.why}</p>
            </a>
          ))}
        </div>
      </section>

      <hr className="home-divider" />

      <section className="home-section">
        <div className="home-section-head">
          <div>
            <p className="eyebrow mb-1">Section map</p>
            <h2 className="home-section-title mb-0">Where the deeper learning lives</h2>
          </div>
        </div>
        <div className="home-section-list">
          {featuredSections.map(({ section, profile }) => (
            <a className="home-section-row" href={`#section/${section.slug}`} key={section.slug}>
              <div>
                <h3 className="home-section-row-title mb-1">{section.title}</h3>
                <p className="home-section-row-copy mb-0">{profile.hook || 'Open the section guide and chapter roadmap.'}</p>
              </div>
              <span className="home-section-row-meta">{section.chapters.length} chapters</span>
            </a>
          ))}
        </div>
      </section>

      <hr className="home-divider" />

      <section className="home-section home-updates">
        <div className="home-section-head">
          <div>
            <p className="eyebrow mb-1">Updates</p>
            <h2 className="home-section-title mb-0">What changed in this version</h2>
          </div>
        </div>
        <BulletList items={updates} />
      </section>
    </div>
  );
}
