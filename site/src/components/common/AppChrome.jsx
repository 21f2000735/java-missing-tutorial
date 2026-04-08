import { currentHash, navigateToHash } from '../../lib/browser-runtime.js';

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

function PageLayout({ header, children }) {
  return (
    <>
      <div className="page-header">{header}</div>
      {children}
    </>
  );
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

function QuickLinkRail({ onRandomTopic, onToggleTheme, themeLabel, onToggleReadingMode, readingLabel }) {
  const links = [
    { label: 'Interview Prep', href: '#interview-prep' },
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
      <button type="button" className="quick-link-chip quick-link-button" onClick={onRandomTopic}>Random Topic</button>
      <button type="button" className="quick-link-chip quick-link-button" onClick={onToggleTheme}>{themeLabel}</button>
      <button type="button" className="quick-link-chip quick-link-button" onClick={onToggleReadingMode}>{readingLabel}</button>
      {links.map((link) => (
        <a key={link.href} className="quick-link-chip" href={link.href}>{link.label}</a>
      ))}
    </div>
  );
}

export {
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
};
