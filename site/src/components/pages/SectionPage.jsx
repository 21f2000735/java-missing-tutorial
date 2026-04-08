import {
  matchesVersionFilter,
  parseGuide,
  truncateText
} from '../../lib/content-helpers.js';
import { SECTION_PROFILES } from '../../lib/site-data.js';
import {
  BulletList,
  HeaderPanel,
  PageLayout
} from '../common/AppChrome.jsx';

function chunkIntoGroups(items, groupCount = 3) {
  if (!items.length) {
    return [];
  }
  const size = Math.ceil(items.length / groupCount);
  const groups = [];
  for (let index = 0; index < items.length; index += size) {
    groups.push(items.slice(index, index + size));
  }
  return groups;
}

function SectionPager({ previousSection, nextSection }) {
  return (
    <div className="content-card chapter-nav-card">
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">
        <div>
          <div className="eyebrow mb-1">Move Next</div>
          <div className="muted-copy mb-0">Use section navigation to continue the reading order without reopening the sidebar.</div>
        </div>
        <div className="d-flex flex-wrap gap-2">
          <a className={`btn btn-outline-dark btn-sm rounded-pill ${previousSection ? '' : 'disabled'}`} href={previousSection ? `#section/${previousSection.slug}` : '#'} aria-disabled={!previousSection}>
            <i className="bi bi-arrow-left me-1" />
            Prev Section
          </a>
          <a className={`btn btn-dark btn-sm rounded-pill ${nextSection ? '' : 'disabled'}`} href={nextSection ? `#section/${nextSection.slug}` : '#'} aria-disabled={!nextSection}>
            Next Section
            <i className="bi bi-arrow-right ms-1" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default function SectionPage({ manifest, section, raw, uiPreferences }) {
  const guide = parseGuide(raw);
  const profile = SECTION_PROFILES[section.slug] || {};
  const sectionIndex = manifest.sections.findIndex((item) => item.slug === section.slug);
  const previousSection = sectionIndex > 0 ? manifest.sections[sectionIndex - 1] : null;
  const nextSection = sectionIndex >= 0 && sectionIndex < manifest.sections.length - 1 ? manifest.sections[sectionIndex + 1] : null;
  const visibleChapters = section.chapters.filter((chapter) => matchesVersionFilter(chapter.javaVersion, uiPreferences.versionFilter));
  const chapterGroups = chunkIntoGroups(visibleChapters, 3);
  const purpose = truncateText(profile.hook || guide.intro || 'Use this section to move from problem to practice with a small set of related chapters.', 160);
  const startHere = profile.problems?.slice(0, 3) || [];
  const practice = [
    'Open the first chapter and run the first topic.',
    'Change one assumption and compare the output.',
    'Move to the next chapter only after you can explain the rule.'
  ];

  return (
    <PageLayout
      header={(
        <HeaderPanel
          title={section.title}
          eyebrow="Section"
          summary={purpose}
          sourcePath={section.guide.sourcePath}
        />
      )}
    >
      <div className="section-flow-grid mb-4">
        <div className="content-card">
          <div className="eyebrow mb-2">Purpose</div>
          <h2 className="h5 mb-2">Why this section matters</h2>
          <p className="mb-0 muted-copy">{purpose}</p>
        </div>
        <div className="content-card">
          <div className="eyebrow mb-2">Start Here</div>
          <BulletList items={startHere.length ? startHere : ['Open the first chapter and run the first topic.']} />
        </div>
        <div className="content-card">
          <div className="eyebrow mb-2">Practice</div>
          <BulletList items={practice} />
        </div>
      </div>

      <div className="content-card mb-4">
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
          <h2 className="page-title mb-0">Chapter Path</h2>
          <div className="d-flex flex-wrap gap-2">
            <span className="badge rounded-pill badge-soft">Filter: {uiPreferences.versionFilter}</span>
            <span className="badge rounded-pill badge-soft">{visibleChapters.length} shown</span>
          </div>
        </div>
        <div className="section-chapter-grid">
          {chapterGroups.map((group, index) => (
            <div className="section-path-card" key={`${section.slug}-group-${index}`}>
              <div className="d-flex justify-content-between align-items-center gap-2 mb-3">
                <div>
                  <div className="eyebrow mb-1">Path {index + 1}</div>
                  <div className="muted-copy mb-0">{group.length} chapter{group.length === 1 ? '' : 's'}</div>
                </div>
                <span className="badge rounded-pill badge-soft">Run in order</span>
              </div>
              <div className="chapter-rail">
                {group.map((chapter) => (
                  <a className="chapter-card chapter-card-compact text-decoration-none text-reset" href={`#chapter/${section.slug}/${chapter.slug}`} key={chapter.slug}>
                    <div className="d-flex justify-content-between align-items-start gap-3 mb-2">
                      <span className="badge rounded-pill badge-soft">{chapter.javaVersion || chapter.slug}</span>
                      <small className="text-muted">{chapter.topics.length} topic{chapter.topics.length === 1 ? '' : 's'}</small>
                    </div>
                    <h3 className="h6 mb-2">{chapter.title}</h3>
                    <p className="muted-copy mb-0">Open the chapter, run the examples, then move to the next path card.</p>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <SectionPager previousSection={previousSection} nextSection={nextSection} />
    </PageLayout>
  );
}
