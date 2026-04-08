import { marked } from 'marked';
import {
  bulletItems,
  findGuideSection,
  getSectionPrerequisiteInfo,
  matchesVersionFilter,
  parseGuide,
  titleFromSlug,
  truncateText
} from '../../lib/content-helpers.js';
import { SECTION_PROFILES } from '../../lib/site-data.js';
import { MarkdownBlock } from '../content/MarkdownContent.jsx';
import {
  BulletList,
  HeaderPanel,
  InsightCard,
  PageLayout
} from '../common/AppChrome.jsx';

function PrerequisiteMapCard({ manifest, required = [], next = [], title = 'Prerequisite Map' }) {
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

export default function SectionPage({ manifest, section, raw, uiPreferences }) {
  const guide = parseGuide(raw);
  const profile = SECTION_PROFILES[section.slug] || {};
  const prereqs = getSectionPrerequisiteInfo(section.slug);
  const why = findGuideSection(guide, ['Why This Section Matters', 'What Real Problems This Section Solves', 'The Story']);
  const beforeStart = findGuideSection(guide, ['Before You Start', 'Start Here If']);
  const howToRead = findGuideSection(guide, ['How To Read This Section']);
  const visibleChapters = section.chapters.filter((chapter) => matchesVersionFilter(chapter.javaVersion, uiPreferences.versionFilter));

  return (
    <PageLayout
      header={(
        <HeaderPanel
          title={section.title}
          eyebrow="Section"
          summary={profile.hook || truncateText(why?.plain || guide.intro || 'Open this section to see the main problems and chapters collected together.', 240)}
          sourcePath={section.guide.sourcePath}
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

      <PrerequisiteMapCard manifest={manifest} required={prereqs.before} next={prereqs.next} />

      <div className="content-card">
        <MarkdownBlock html={marked.parse(raw)} manifest={manifest} contentPath={section.guide.contentPath} />
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
            <a className="chapter-card text-decoration-none text-reset" href={`#chapter/${section.slug}/${chapter.slug}`} key={chapter.slug}>
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
