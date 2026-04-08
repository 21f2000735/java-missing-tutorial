import { badgeClassForTone, bulletItems, inferTopicMode, modePresentation, numberedItems, parseGuide, resolveVersionMeta, scoreLabel, statusTone, truncateText } from '../../lib/content-helpers.js';
import {
  FeedbackBar,
  HeaderPanel,
  PageLayout,
  ReadingStateBar,
  BulletList
} from '../common/AppChrome.jsx';

function splitIntoGroups(items, maxGroups = 3) {
  if (!items.length) {
    return [];
  }
  const groupCount = Math.min(maxGroups, Math.max(1, Math.ceil(items.length / 3)));
  const base = Math.floor(items.length / groupCount);
  let remainder = items.length % groupCount;
  const groups = [];
  let index = 0;
  for (let groupIndex = 0; groupIndex < groupCount; groupIndex += 1) {
    const size = base + (remainder > 0 ? 1 : 0);
    remainder -= remainder > 0 ? 1 : 0;
    groups.push(items.slice(index, index + size));
    index += size;
  }
  return groups.filter((group) => group.length);
}

function practiceItems(raw) {
  const items = bulletItems(raw || '');
  return items.length ? items : [
    'Run the first topic again and explain the behavior out loud.',
    'Change one assumption and note what stays stable.',
    'Move to the next chapter only after the rule is clear.'
  ];
}

function ChapterPager({ previousChapter, nextChapter, isCompleted, onToggleDone }) {
  return (
    <div className="content-card chapter-nav-card">
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">
        <div>
          <div className="eyebrow mb-1">Move Next</div>
          <div className="muted-copy mb-0">Use chapter navigation to keep the reading order intact.</div>
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

function TopicPreviewCard({ section, chapter, topic }) {
  const versionMeta = resolveVersionMeta(section.slug, chapter.slug, topic.lessonMeta, topic.preview);
  const modeUi = modePresentation(inferTopicMode(section.slug, chapter.slug, topic.lessonMeta));
  const summary = truncateText(
    topic.preview.storyHook
      || topic.preview.problem
      || topic.preview.why
      || topic.preview.realWorld
      || topic.preview.mentalModel
      || topic.sourcePath.split('/topics/')[1],
    160
  );

  return (
    <a className="topic-card topic-teaser text-decoration-none text-reset" href={`#topic/${section.slug}/${chapter.slug}/${topic.slug}`}>
      <div className="d-flex justify-content-between align-items-start gap-3 mb-2">
        <div className="d-flex flex-wrap gap-2">
          <span className="badge rounded-pill badge-soft">{topic.preview.concept || topic.concept}</span>
          <span className={`badge rounded-pill ${modeUi.badgeClass}`}>{modeUi.label}</span>
        </div>
        {versionMeta.display ? (
          <span className={`badge rounded-pill ${badgeClassForTone(statusTone(versionMeta.status))}`}>{versionMeta.display}</span>
        ) : null}
      </div>
      <h3 className="h6 mb-2">{topic.title}</h3>
      <p className="muted-copy mb-2">{summary}</p>
      <div className="topic-kicker">Run the file, observe one change, then move on.</div>
    </a>
  );
}

export default function ChapterPage({ manifest, data, readingState, feedbackState, uiPreferences }) {
  const guide = parseGuide(data.guideRaw);
  const routeKey = `#chapter/${data.section.slug}/${data.chapter.slug}`;
  const chapterIndex = manifest.chapterOrder.findIndex((chapter) => chapter.route === routeKey);
  const previousChapter = chapterIndex > 0 ? manifest.chapterOrder[chapterIndex - 1] : null;
  const nextChapter = chapterIndex >= 0 && chapterIndex < manifest.chapterOrder.length - 1 ? manifest.chapterOrder[chapterIndex + 1] : null;
  const isChapterDone = readingState.completedChapters.includes(routeKey);
  const learningPath = guide.sections.find((section) => section.title === 'Learning Path');
  const problem = guide.sections.find((section) => ['Problem', 'What Problem This Chapter Solves', 'The Problem', 'Mini Case Study', 'The Story'].includes(section.title));
  const practice = guide.sections.find((section) => ['Practice', 'Try This', 'Exercise'].includes(section.title));
  const topicGroups = splitIntoGroups(data.chapter.topics, 3);
  const learningPathItems = numberedItems(learningPath?.raw || '');

  return (
    <PageLayout
      header={(
        <HeaderPanel
          title={data.chapter.title}
          eyebrow={`${data.section.title} · Chapter`}
          summary={truncateText(problem?.plain || guide.intro || 'Use this chapter to understand the concept, then run the topic files.', 200)}
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
      <ReadingStateBar routeKey={routeKey} {...readingState} />

      <div className="content-layout content-layout-single">
        <div className="content-main">
          {learningPathItems.length ? (
            <div className="content-card mb-4">
              <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
                <div>
                  <div className="eyebrow mb-2">Learning Path</div>
                  <h2 className="page-title mb-0">Step-by-step ladder</h2>
                </div>
                <span className="badge rounded-pill badge-soft">{learningPathItems.length} steps</span>
              </div>
              <BulletList items={learningPathItems} />
            </div>
          ) : null}

          <div className="content-card mb-4">
            <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
              <h2 className="page-title mb-0">Start With Examples</h2>
              <div className="d-flex flex-wrap gap-2">
                {scoreLabel(readingState.quizScores[routeKey]) ? <span className="badge rounded-pill text-bg-warning">Last score: {scoreLabel(readingState.quizScores[routeKey])}</span> : null}
                <span className="badge rounded-pill badge-soft">{data.chapter.topics.length} runnable topic{data.chapter.topics.length === 1 ? '' : 's'}</span>
              </div>
            </div>
            <div className="section-flow-grid">
              {topicGroups.map((group, index) => (
                <div className="section-path-card" key={`${data.chapter.slug}-group-${index}`}>
                  <div className="d-flex justify-content-between align-items-center gap-2 mb-3">
                    <div>
                      <div className="eyebrow mb-1">Group {index + 1}</div>
                      <div className="muted-copy mb-0">{group.length} topic{group.length === 1 ? '' : 's'}</div>
                    </div>
                    <span className="badge rounded-pill badge-soft">Read → Run → Observe</span>
                  </div>
                  <div className="topic-grid topic-grid-compact">
                    {group.map((topic) => (
                      <TopicPreviewCard section={data.section} chapter={data.chapter} topic={topic} key={topic.slug} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="content-card mb-4">
            <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
              <h2 className="page-title mb-0">Practice</h2>
              <span className="badge rounded-pill badge-soft">2 to 4 concrete tasks</span>
            </div>
            <div className="practice-grid">
              <div className="practice-card">
                <div className="eyebrow mb-2">Try this</div>
                <BulletList items={practiceItems(practice?.raw)} />
              </div>
              <div className="practice-card">
                <div className="eyebrow mb-2">Quick Check</div>
                <BulletList items={[
                  'Can you explain the problem in one sentence?',
                  'Can you describe what changes when the assumption changes?',
                  'Can you name the rule before moving on?'
                ]} />
              </div>
            </div>
          </div>

          <ChapterPager
            previousChapter={previousChapter}
            nextChapter={nextChapter}
            isCompleted={isChapterDone}
            onToggleDone={() => readingState.toggleChapterCompleted(routeKey)}
          />
        </div>
      </div>

      <FeedbackBar routeKey={routeKey} feedbackState={feedbackState} />
    </PageLayout>
  );
}
