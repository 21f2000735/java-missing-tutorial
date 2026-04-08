import { useState } from 'react';
import {
  badgeClassForTone,
  bulletItems,
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
  InPageToc,
  InsightCard,
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
      {showNote && runner === 'local' ? <span className="playground-note">This example is best run locally, usually because of newer or preview Java features.</span> : null}
    </div>
  );
}

function InterviewQuestionsPanel({ questions }) {
  const [openIndex, setOpenIndex] = useState(-1);

  if (!questions.length) {
    return null;
  }

  return (
    <div className="content-card interview-panel mb-4">
      <details open>
        <summary className="interview-panel-summary">
          <div>
            <h2 className="page-title mb-1">Interview Questions</h2>
            <div className="muted-copy mb-0">Quick follow-up questions and concise answers for this topic.</div>
          </div>
          <span className="badge rounded-pill text-bg-warning">{questions.length}</span>
        </summary>
        <div className="accordion interview-accordion" id="topic-interview-questions">
          {questions.map((item, index) => {
            const isOpen = index === openIndex;
            return (
              <div className="accordion-item interview-question-item" key={`${item.question}-${index}`}>
                <h3 className="accordion-header">
                  <button
                    className={`accordion-button ${isOpen ? '' : 'collapsed'}`}
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  >
                    {item.question}
                  </button>
                </h3>
                <div className={`accordion-collapse collapse ${isOpen ? 'show' : ''}`}>
                  <div className="accordion-body">
                    <button
                      type="button"
                      className="btn btn-link btn-sm px-0 mb-2 interview-toggle"
                      onClick={() => setOpenIndex(isOpen ? -1 : index)}
                    >
                      {isOpen ? 'Hide answer' : 'Show answer'}
                    </button>
                    {isOpen ? <p className="mb-0">{item.answer || 'Answer not added yet.'}</p> : null}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </details>
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
  const eurekaLine = firstNonEmpty(
    lessonFlow.summary?.plain,
    topicSummary.takeaways[0],
    topicSummary.whyThisWorks,
    topicSummary.mentalModel,
    'By the end, you should be able to explain why Java chose this shape and when to use it.'
  );
  const takeaways = topicSummary.takeaways.length ? topicSummary.takeaways : bulletItems(lessonFlow.summary?.raw || '');
  const interviewQuestions = normalizeInterviewQuestions(data.lessonMeta.interviewQ);
  const topicToc = [
    { href: '#start-here', label: 'Start Here' },
    { href: '#invent-it', label: 'Invent It' },
    { href: '#source-code', label: 'Try The Code' },
    ...(lessonFlow.walkthrough || lessonFlow.mentalModel ? [{ href: '#understand-it', label: 'Understand It' }] : []),
    ...(lessonFlow.mistakes || lessonFlow.tradeoffs || lessonFlow.useAvoid || topicSummary.commonMistake || topicSummary.useWhen || topicSummary.avoidWhen
      ? [{ href: '#use-it-well', label: 'Use It Well' }]
      : []),
    ...(takeaways.length || lessonFlow.summary ? [{ href: '#takeaways', label: 'Takeaways' }] : [])
  ];
  const quickSteps = [
    {
      title: 'See the pressure',
      detail: truncateText(firstNonEmpty(lessonFlow.pain?.plain, topicSummary.problem, topicSummary.realWorld, topicSummary.storyHook, topicSummaryLine), 145)
    },
    {
      title: 'Catch the Java idea',
      detail: truncateText(firstNonEmpty(lessonFlow.creatorMindset?.plain, lessonFlow.finalSolution?.plain, ideaSummary), 145)
    },
    {
      title: 'Run the example',
      detail: truncateText(firstNonEmpty(topicSummary.howToCode, lessonFlow.walkthrough?.plain, 'Run the example, compare the output, then trace the code line by line.'), 145)
    },
    {
      title: 'Lock the insight',
      detail: truncateText(firstNonEmpty(topicSummary.expectedOutput, lessonFlow.summary?.plain, eurekaLine), 145)
    }
  ];

  return (
    <PageLayout
      header={(
        <HeaderPanel
          title={data.topic.title}
          eyebrow={`${data.section.title} · ${data.chapter.title}`}
          summary={truncateText(topicSummaryLine, 240)}
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
              <span className="badge rounded-pill badge-soft">Understand fast, then run code</span>
            </div>
            <div className="learning-focus mb-3">
              <div className="eyebrow mb-2">Concept In One Line</div>
              <h3 className="h4 mb-2">{conceptLabel}</h3>
              <p className="mb-0">{topicSummaryLine}</p>
            </div>
            <div className="learning-step-grid mb-3">
              {quickSteps.map((step, index) => (
                <div className="learning-step-card" key={step.title}>
                  <div className="learning-step-number">{index + 1}</div>
                  <div>
                    <h3 className="h6 mb-2">{step.title}</h3>
                    <p className="mb-0 muted-copy">{step.detail}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="eureka-banner">
              <div className="eyebrow mb-1">Eureka Goal</div>
              <p className="mb-0">{truncateText(eurekaLine, 220)}</p>
            </div>
          </div>

          <div id="invent-it" className="content-card mb-4">
            <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
              <h2 className="page-title mb-0">How The Idea Emerges</h2>
              <span className="badge rounded-pill badge-soft">Problem to invention</span>
            </div>
            <div className="insight-grid mb-4">
              <InsightCard icon="bi bi-bullseye" title="Problem Pressure">
                {lessonFlow.pain?.plain || topicSummary.problem || topicSummary.realWorld || 'Start with the real pressure before reading APIs.'}
              </InsightCard>
              <InsightCard icon="bi bi-lightbulb" title="Java Creator Mindset">
                {lessonFlow.creatorMindset?.plain || topicSummary.why || topicSummary.mentalModel || 'Ask what Java is trying to simplify, protect, or make clearer.'}
              </InsightCard>
              <InsightCard icon="bi bi-stars" title="Final Java Idea">
                {ideaSummary}
              </InsightCard>
            </div>
            {lessonFlow.inventIt ? (
              <div className="section-panel section-panel-soft mb-4">
                <div className="eyebrow mb-2">How You Might Invent It</div>
                <LessonSectionContent section={lessonFlow.inventIt} manifest={manifest} contentPath={data.topic.guide?.contentPath} />
              </div>
            ) : null}
            {(lessonFlow.naiveAttempt || lessonFlow.whyBreaks || lessonFlow.finalSolution) ? (
              <div className="journey-grid journey-grid-primary">
                {lessonFlow.naiveAttempt ? (
                  <div className="section-panel">
                    <div className="eyebrow mb-2">Naive Attempt</div>
                    <LessonSectionContent section={lessonFlow.naiveAttempt} manifest={manifest} contentPath={data.topic.guide?.contentPath} />
                  </div>
                ) : null}
                {lessonFlow.whyBreaks ? (
                  <div className="section-panel">
                    <div className="eyebrow mb-2">Why It Breaks</div>
                    <LessonSectionContent section={lessonFlow.whyBreaks} manifest={manifest} contentPath={data.topic.guide?.contentPath} />
                  </div>
                ) : null}
                {lessonFlow.finalSolution ? (
                  <div className="section-panel section-panel-strong">
                    <div className="eyebrow mb-2">Final Java Solution</div>
                    <LessonSectionContent section={lessonFlow.finalSolution} manifest={manifest} contentPath={data.topic.guide?.contentPath} />
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>

          {(versionMeta.display || versionMeta.status || data.lessonMeta.runner || data.lessonMeta.estimated) ? (
            <div className="content-card mb-4">
              <div className="topic-meta">
                {versionMeta.display ? (
                  <span className={`badge rounded-pill ${badgeClassForTone(statusTone(versionMeta.status))}`}>
                    {versionMeta.status === 'preview' ? versionMeta.display : `Introduced: ${versionMeta.display}`}
                  </span>
                ) : null}
                {versionMeta.status && versionMeta.status !== 'preview' ? (
                  <span className={`badge rounded-pill ${badgeClassForTone(statusTone(versionMeta.status))}`}>Status: {versionMeta.status}</span>
                ) : null}
                <span className={`badge rounded-pill ${lessonModeUi.badgeClass}`}>Mode: {lessonModeUi.label}</span>
                <span className="badge rounded-pill badge-soft">Runner: {topicRunner}</span>
                {data.lessonMeta.estimated ? <span className="badge rounded-pill badge-soft">Read time: {data.lessonMeta.estimated}</span> : null}
              </div>
            </div>
          ) : null}

          <div id="source-code" className="content-card mb-4">
            <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
              <h2 className="page-title mb-0">Try The Code</h2>
              <span className="badge rounded-pill badge-soft">See the Java shape early</span>
            </div>
            <div className="topic-meta">
              <span className="badge rounded-pill badge-soft">{conceptLabel}</span>
              <span className="badge rounded-pill badge-soft">Java Source</span>
              {topicSummary.previewRequired ? <span className="badge rounded-pill badge-warning-soft">Preview-sensitive</span> : null}
            </div>
            <div className="topic-brief-grid">
              <div className="topic-brief-card">
                <div className="eyebrow mb-2">How To Code It</div>
                <p className="mb-0">{topicSummary.howToCode || 'Run the example, compare the output, and then trace the code line by line.'}</p>
              </div>
              <div className="topic-brief-card">
                <div className="eyebrow mb-2">Expected Output</div>
                <p className="mb-0">{topicSummary.expectedOutput || 'The code comments and printed lines show the expected behavior.'}</p>
              </div>
              <div className="topic-brief-card">
                <div className="eyebrow mb-2">Run Online</div>
                <p className="mb-2">
                  {topicRunner === 'embedded'
                    ? 'Use the run button to send this stable example directly to JDoodle, or copy it into another playground.'
                    : 'This topic is best run locally because it depends on newer or preview Java behavior.'}
                </p>
                {topicRunner === 'local' ? (
                  <p className="mb-0 text-danger-emphasis">This topic uses newer Java features that may need local JDK 25 preview support.</p>
                ) : null}
              </div>
              <div className="topic-brief-card">
                <div className="eyebrow mb-2">What Changed</div>
                <p className="mb-0">{firstNonEmpty(lessonFlow.finalSolution?.plain, topicSummary.whyThisWorks, ideaSummary)}</p>
              </div>
            </div>
            <div className="topic-meta">
              {topicSummary.storyHook || lessonFlow.whyExists?.plain ? (
                <span className="badge rounded-pill badge-soft">{truncateText(firstNonEmpty(topicSummary.storyHook, lessonFlow.whyExists?.plain), 90)}</span>
              ) : null}
            </div>
            <div className="code-cta mb-3">
              <div>
                <div className="eyebrow mb-1">Copy Or Try This Code</div>
                <div className="muted-copy mb-0">Copy the snippet directly or open it in an online playground before reading line by line. The goal is to connect the code to the idea immediately.</div>
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

          {(lessonFlow.walkthrough || lessonFlow.mentalModel) ? (
            <div id="understand-it" className="content-card mb-4">
              <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
                <h2 className="page-title mb-0">Understand What Happened</h2>
                <span className="badge rounded-pill badge-soft">Build the mental model</span>
              </div>
              <div className="journey-grid journey-grid-primary">
                {lessonFlow.walkthrough ? (
                  <div className="section-panel">
                    <div className="eyebrow mb-2">Walkthrough</div>
                    <LessonSectionContent section={lessonFlow.walkthrough} manifest={manifest} contentPath={data.topic.guide?.contentPath} />
                  </div>
                ) : null}
                {lessonFlow.mentalModel ? (
                  <div className="section-panel section-panel-soft">
                    <div className="eyebrow mb-2">Mental Model</div>
                    <LessonSectionContent section={lessonFlow.mentalModel} manifest={manifest} contentPath={data.topic.guide?.contentPath} />
                  </div>
                ) : null}
              </div>
            </div>
          ) : null}

          {(lessonFlow.mistakes || lessonFlow.tradeoffs || lessonFlow.useAvoid || topicSummary.commonMistake || topicSummary.useWhen || topicSummary.avoidWhen) ? (
            <div id="use-it-well" className="content-card mb-4">
              <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
                <h2 className="page-title mb-0">Use It Well</h2>
                <span className="badge rounded-pill badge-soft">Mistakes and tradeoffs</span>
              </div>
              <div className="journey-grid journey-grid-primary">
                {(lessonFlow.mistakes || topicSummary.commonMistake) ? (
                  <div className="section-panel">
                    <div className="eyebrow mb-2">Common Mistakes</div>
                    {lessonFlow.mistakes ? (
                      <LessonSectionContent section={lessonFlow.mistakes} manifest={manifest} contentPath={data.topic.guide?.contentPath} />
                    ) : (
                      <p className="mb-0 muted-copy">{topicSummary.commonMistake}</p>
                    )}
                  </div>
                ) : null}
                {(lessonFlow.tradeoffs || topicSummary.useWhen || topicSummary.avoidWhen) ? (
                  <div className="section-panel">
                    <div className="eyebrow mb-2">Tradeoffs</div>
                    {lessonFlow.tradeoffs ? (
                      <LessonSectionContent section={lessonFlow.tradeoffs} manifest={manifest} contentPath={data.topic.guide?.contentPath} />
                    ) : (
                      <div className="insight-grid compact-grid">
                        {topicSummary.useWhen ? (
                          <InsightCard icon="bi bi-check2-circle" title="Use This When">{topicSummary.useWhen}</InsightCard>
                        ) : null}
                        {topicSummary.avoidWhen ? (
                          <InsightCard icon="bi bi-slash-circle" title="Avoid This When">{topicSummary.avoidWhen}</InsightCard>
                        ) : null}
                      </div>
                    )}
                  </div>
                ) : null}
                {(lessonFlow.useAvoid || topicSummary.useWhen || topicSummary.avoidWhen) ? (
                  <div className="section-panel section-panel-soft">
                    <div className="eyebrow mb-2">Use / Avoid</div>
                    {lessonFlow.useAvoid ? (
                      <LessonSectionContent section={lessonFlow.useAvoid} manifest={manifest} contentPath={data.topic.guide?.contentPath} />
                    ) : (
                      <div className="insight-grid compact-grid">
                        {topicSummary.useWhen ? (
                          <InsightCard icon="bi bi-check2-circle" title="Use This When">{topicSummary.useWhen}</InsightCard>
                        ) : null}
                        {topicSummary.avoidWhen ? (
                          <InsightCard icon="bi bi-slash-circle" title="Avoid This When">{topicSummary.avoidWhen}</InsightCard>
                        ) : null}
                      </div>
                    )}
                  </div>
                ) : null}
              </div>
            </div>
          ) : null}

          {(takeaways.length || lessonFlow.summary) ? (
            <div id="takeaways" className="content-card mb-4">
              <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
                <h2 className="page-title mb-0">Leave With This</h2>
                <span className="badge rounded-pill badge-soft">Eureka checkpoint</span>
              </div>
              {lessonFlow.summary ? (
                <div className="section-panel section-panel-strong mb-3">
                  <LessonSectionContent section={lessonFlow.summary} manifest={manifest} contentPath={data.topic.guide?.contentPath} />
                </div>
              ) : null}
              {takeaways.length ? <BulletList items={takeaways} /> : null}
            </div>
          ) : null}

          {topicSummary.tryThisNext ? (
            <div className="content-card mb-4">
              <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
                <h2 className="page-title mb-0">Try This Next</h2>
                <span className="badge rounded-pill badge-soft">Stretch the example</span>
              </div>
              <p className="mb-0 muted-copy">{topicSummary.tryThisNext}</p>
            </div>
          ) : null}

          <InterviewQuestionsPanel questions={interviewQuestions} />
        </div>

        {!uiPreferences.readingMode ? (
          <div className="content-side">
            <InPageToc items={topicToc} />
          </div>
        ) : null}
      </div>

      <FeedbackBar routeKey={routeKey} feedbackState={feedbackState} />
    </PageLayout>
  );
}
