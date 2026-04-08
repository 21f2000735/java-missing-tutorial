import { useState } from 'react';
import {
  badgeClassForTone,
  effectiveRunner,
  extractTopicLessonFlow,
  firstNonEmpty,
  inferTopicMode,
  modePresentation,
  normalizeInterviewQuestions,
  resolveVersionMeta,
  statusTone,
  titleFromSlug,
  truncateText
} from '../../lib/content-helpers.js';
import { PLAYGROUND_LINKS } from '../../lib/site-data.js';
import { CodeBlock, LessonSectionContent } from '../content/MarkdownContent.jsx';
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

export default function TopicPage({ manifest, data, readingState, feedbackState, uiPreferences }) {
  const topicSummary = data.preview;
  const lessonFlow = extractTopicLessonFlow(data.lessonRaw);
  const topicRunner = effectiveRunner(topicSummary, data.lessonMeta);
  const versionMeta = resolveVersionMeta(data.section.slug, data.chapter.slug, data.lessonMeta, topicSummary);
  const lessonModeUi = modePresentation(inferTopicMode(data.section.slug, data.chapter.slug, data.lessonMeta));
  const routeKey = `#topic/${data.section.slug}/${data.chapter.slug}/${data.topic.slug}`;
  const conceptLabel = topicSummary.concept || data.topic.concept || titleFromSlug(data.topic.slug);
  const topicSummaryLine = firstNonEmpty(
    lessonFlow.whyExists?.plain,
    lessonFlow.pain?.plain,
    topicSummary.problem,
    topicSummary.realWorld,
    topicSummary.mentalModel,
    'Understand the pressure first, then jump into the Java code.'
  );
  const ideaSummary = firstNonEmpty(
    lessonFlow.finalSolution?.plain,
    lessonFlow.creatorMindset?.plain,
    topicSummary.whyThisWorks,
    topicSummary.mentalModel,
    topicSummary.why,
    'The Java shape should feel like the natural answer to the problem.'
  );
  const ruleSummary = firstNonEmpty(
    lessonFlow.summary?.plain,
    topicSummary.whyThisWorks,
    topicSummary.mentalModel,
    'Use the rule that keeps the code predictable when the assumption changes.'
  );
  const topicIndex = typeof data.topic.topicIndex === 'number' ? data.topic.topicIndex : data.chapter.topics.findIndex((item) => item.slug === data.topic.slug);
  const previousTopic = topicIndex > 0 ? data.chapter.topics[topicIndex - 1] : null;
  const nextTopic = topicIndex >= 0 && topicIndex < data.chapter.topics.length - 1 ? data.chapter.topics[topicIndex + 1] : null;
  const interviewQuestions = normalizeInterviewQuestions(data.lessonMeta.interviewQ);

  const steps = [
    { title: 'See the pressure', detail: truncateText(firstNonEmpty(lessonFlow.pain?.plain, topicSummary.problem, topicSummary.realWorld, topicSummary.storyHook, topicSummaryLine), 130) },
    { title: 'Run the example', detail: truncateText(firstNonEmpty(topicSummary.howToCode, lessonFlow.walkthrough?.plain, 'Run the code, then change one assumption and compare the output.'), 130) },
    { title: 'Lock the rule', detail: truncateText(ruleSummary, 130) }
  ];

  return (
    <PageLayout
      header={(
        <HeaderPanel
          title={data.topic.title}
          eyebrow={`${data.section.title} · ${data.chapter.title}`}
          summary={truncateText(topicSummaryLine, 220)}
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

      <div className={`content-layout ${uiPreferences.readingMode ? 'content-layout-reading' : ''}`}>
        <div className="content-main">
          <div id="start-here" className="content-card mb-4">
            <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
              <h2 className="page-title mb-0">Start Here</h2>
              <span className="badge rounded-pill badge-soft">Read → Run → Observe</span>
            </div>
            <div className="learning-focus mb-3">
              <div className="eyebrow mb-2">Concept</div>
              <h3 className="h4 mb-2">{conceptLabel}</h3>
              <p className="mb-0">{topicSummaryLine}</p>
            </div>
            <div className="learning-step-grid">
              {steps.map((step, index) => (
                <div className="learning-step-card" key={step.title}>
                  <div className="learning-step-number">{index + 1}</div>
                  <div>
                    <h3 className="h6 mb-2">{step.title}</h3>
                    <p className="mb-0 muted-copy">{step.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div id="source-code" className="content-card mb-4">
            <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
              <h2 className="page-title mb-0">Try The Code</h2>
              <span className="badge rounded-pill badge-soft">See the Java shape early</span>
            </div>
            <div className="topic-meta mb-3">
              <span className="badge rounded-pill badge-soft">{conceptLabel}</span>
              <span className="badge rounded-pill badge-soft">Java Source</span>
              {topicSummary.previewRequired ? <span className="badge rounded-pill badge-warning-soft">Preview-sensitive</span> : null}
              <span className={`badge rounded-pill ${lessonModeUi.badgeClass}`}>Mode: {lessonModeUi.label}</span>
              {versionMeta.display ? <span className={`badge rounded-pill ${badgeClassForTone(statusTone(versionMeta.status))}`}>{versionMeta.display}</span> : null}
            </div>
            <div className="topic-brief-grid mb-3">
              <div className="topic-brief-card">
                <div className="eyebrow mb-2">What to observe</div>
                <p className="mb-0">{topicSummary.expectedOutput || 'Run the code, compare the output, and note what changes when you tweak one line.'}</p>
              </div>
              <div className="topic-brief-card">
                <div className="eyebrow mb-2">Why it matters</div>
                <p className="mb-0">{ideaSummary}</p>
              </div>
            </div>
            <div className="code-cta mb-3">
              <div>
                <div className="eyebrow mb-1">Copy Or Try This Code</div>
                <div className="muted-copy mb-0">Copy the snippet or open it in a playground, then compare the output with the rule.</div>
              </div>
              <TopicActionButtons code={data.raw} runner={topicRunner} copyLabel="Copy Code Snippet" />
            </div>
            <div className="code-panel">
              <div className="code-toolbar">
                <div>
                  <div className="fw-semibold">{data.topic.title}</div>
                  <div className="source-path">{data.topic.sourcePath}</div>
                </div>
              </div>
              <CodeBlock code={data.raw} />
            </div>
          </div>

          <div className="topic-insight-grid mb-4">
            <div className="content-card">
              <div className="eyebrow mb-2">What happens</div>
              <div className="muted-copy mb-0">
                <LessonSectionContent section={lessonFlow.walkthrough || lessonFlow.summary} manifest={manifest} contentPath={data.topic.guide?.contentPath} />
              </div>
            </div>
            <div className="content-card">
              <div className="eyebrow mb-2">What stays stable</div>
              <div className="muted-copy mb-0">
                <LessonSectionContent section={lessonFlow.mentalModel || lessonFlow.creatorMindset} manifest={manifest} contentPath={data.topic.guide?.contentPath} />
              </div>
            </div>
            <div className="content-card">
              <div className="eyebrow mb-2">What changes</div>
              <div className="muted-copy mb-0">
                <LessonSectionContent section={lessonFlow.naiveAttempt || lessonFlow.whyBreaks} manifest={manifest} contentPath={data.topic.guide?.contentPath} />
              </div>
            </div>
          </div>

          <div className="content-card mb-4">
            <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
              <h2 className="page-title mb-0">Rule</h2>
              <span className="badge rounded-pill badge-soft">Keep the design correct</span>
            </div>
            <p className="mb-0">{ruleSummary}</p>
          </div>

          {topicSummary.tryThisNext ? (
            <div className="content-card mb-4">
              <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
                <h2 className="page-title mb-0">Try This</h2>
                <span className="badge rounded-pill badge-soft">2 to 4 concrete tasks</span>
              </div>
              <p className="mb-0 muted-copy">{topicSummary.tryThisNext}</p>
            </div>
          ) : null}

          {interviewQuestions.length ? (
            <div className="content-card mb-4">
              <details>
                <summary className="eyebrow mb-3">Interview Questions</summary>
                <div className="interview-question-list">
                  {interviewQuestions.map((item) => (
                    <div className="interview-question-item" key={item.question}>
                      <div className="fw-semibold mb-2">{item.question}</div>
                      <div className="muted-copy mb-0">{item.answer || 'Answer not added yet.'}</div>
                    </div>
                  ))}
                </div>
              </details>
            </div>
          ) : null}

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
