import { useState } from 'react';
import {
  badgeClassForTone,
  bulletItems,
  effectiveRunner,
  extractTopicLessonFlow,
  firstNonEmpty,
  inferTopicMode,
  modePresentation,
  resolveVersionMeta,
  statusTone,
  titleFromSlug,
  truncateText
} from '../../lib/content-helpers.js';
import { PLAYGROUND_LINKS } from '../../lib/site-data.js';
import { CodeBlock } from '../content/MarkdownContent.jsx';
import {
  BulletList,
  FeedbackBar,
  HeaderPanel,
  PageLayout,
  ReadingStateBar
} from '../common/AppChrome.jsx';

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
      {showNote && runner === 'local' ? <span className="playground-note">This example is best run locally because it uses newer or preview Java features.</span> : null}
    </div>
  );
}

function TopicPager({ previousTopic, nextTopic, chapterRoute }) {
  return (
    <div className="content-card chapter-nav-card">
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">
        <div>
          <div className="eyebrow mb-1">Move Next</div>
          <div className="muted-copy mb-0">Go forward when you can explain what stayed stable and what changed.</div>
        </div>
        <div className="d-flex flex-wrap gap-2">
          <a className={`btn btn-outline-dark btn-sm rounded-pill ${chapterRoute ? '' : 'disabled'}`} href={chapterRoute || '#'}>
            Back To Chapter
          </a>
          <a className={`btn btn-outline-dark btn-sm rounded-pill ${previousTopic ? '' : 'disabled'}`} href={previousTopic?.route || '#'} aria-disabled={!previousTopic}>
            <i className="bi bi-arrow-left me-1" />
            Prev Topic
          </a>
          <a className={`btn btn-dark btn-sm rounded-pill ${nextTopic ? '' : 'disabled'}`} href={nextTopic?.route || '#'} aria-disabled={!nextTopic}>
            Next Topic
            <i className="bi bi-arrow-right ms-1" />
          </a>
        </div>
      </div>
    </div>
  );
}

function compactBullets(section, fallback = []) {
  const items = bulletItems(section?.raw || '');
  return items.length ? items : fallback;
}

export default function TopicPage({ data, readingState, feedbackState, uiPreferences }) {
  const topicSummary = data.preview;
  const lessonFlow = extractTopicLessonFlow(data.lessonRaw);
  const topicRunner = effectiveRunner(topicSummary, data.lessonMeta);
  const versionMeta = resolveVersionMeta(data.section.slug, data.chapter.slug, data.lessonMeta, topicSummary);
  const lessonModeUi = modePresentation(inferTopicMode(data.section.slug, data.chapter.slug, data.lessonMeta));
  const routeKey = `#topic/${data.section.slug}/${data.chapter.slug}/${data.topic.slug}`;
  const conceptLabel = topicSummary.concept || data.topic.concept || titleFromSlug(data.topic.slug);
  const topicSummaryLine = firstNonEmpty(
    lessonFlow.concept?.plain,
    topicSummary.problem,
    topicSummary.realWorld,
    topicSummary.mentalModel,
    'Understand the pressure first, then jump into the Java code.'
  );
  const whyItMatters = firstNonEmpty(
    lessonFlow.whyItMatters?.plain,
    topicSummary.whyThisWorks,
    topicSummary.why,
    'The rule matters because it keeps the design correct when the assumption changes.'
  );
  const ruleSummary = firstNonEmpty(
    lessonFlow.rule?.plain,
    topicSummary.whyThisWorks,
    topicSummary.mentalModel,
    'Use the rule that keeps the code predictable when the assumption changes.'
  );
  const topicIndex = typeof data.topic.topicIndex === 'number' ? data.topic.topicIndex : data.chapter.topics.findIndex((item) => item.slug === data.topic.slug);
  const previousTopic = topicIndex > 0 ? data.chapter.topics[topicIndex - 1] : null;
  const nextTopic = topicIndex >= 0 && topicIndex < data.chapter.topics.length - 1 ? data.chapter.topics[topicIndex + 1] : null;

  const blocks = [
    {
      title: 'What happens',
      items: compactBullets(lessonFlow.whatHappens, ['Run the example and compare the output with the rule.'])
    },
    {
      title: 'What stays stable',
      items: compactBullets(lessonFlow.whatStaysStable, ['The core rule stays the same even when the input changes.'])
    },
    {
      title: 'What changes',
      items: compactBullets(lessonFlow.whatChanges, ['Change one assumption and see how the output changes.'])
    },
    {
      title: 'Why it matters',
      items: [whyItMatters]
    },
    {
      title: 'Rule',
      items: [`👉 Rule: ${ruleSummary}`]
    },
    {
      title: 'Try this',
      items: compactBullets(lessonFlow.tryThis, [
        'Replace the main assumption with a smaller one and rerun the file.',
        'Change one line and note what stays stable.',
        'Explain the result in one sentence before moving on.'
      ])
    }
  ];

  return (
    <PageLayout
      header={(
        <HeaderPanel
          title={data.topic.title}
          eyebrow={`${data.section.title} · ${data.chapter.title}`}
          summary={truncateText(topicSummaryLine, 200)}
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

      <div className="content-layout content-layout-single">
        <div className="content-main">
          <div className="content-card mb-4">
            <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
              <div>
                <div className="eyebrow mb-2">Concept</div>
                <h2 className="page-title mb-0">{conceptLabel}</h2>
              </div>
              <div className="d-flex flex-wrap gap-2">
                <span className="badge rounded-pill badge-soft">{lessonModeUi.label}</span>
                {versionMeta.display ? <span className={`badge rounded-pill ${badgeClassForTone(statusTone(versionMeta.status))}`}>{versionMeta.display}</span> : null}
                {topicSummary.previewRequired ? <span className="badge rounded-pill badge-warning-soft">Preview-sensitive</span> : null}
              </div>
            </div>

            <p className="mb-3 muted-copy">{topicSummaryLine}</p>

            <div className="code-panel mb-3">
              <div className="code-toolbar">
                <div>
                  <div className="fw-semibold">{data.topic.title}</div>
                  <div className="source-path">{data.topic.sourcePath}</div>
                </div>
              </div>
              <CodeBlock code={data.raw} />
            </div>

            <div className="topic-brief-grid mb-3">
              {blocks.map((block) => (
                <div className="topic-brief-card" key={block.title}>
                  <div className="eyebrow mb-2">{block.title}</div>
                  <BulletList items={block.items} />
                </div>
              ))}
            </div>

          </div>

          <TopicPager
            previousTopic={previousTopic}
            nextTopic={nextTopic}
            chapterRoute={`#chapter/${data.section.slug}/${data.chapter.slug}`}
          />
        </div>
      </div>

      <FeedbackBar routeKey={routeKey} feedbackState={feedbackState} />
    </PageLayout>
  );
}
