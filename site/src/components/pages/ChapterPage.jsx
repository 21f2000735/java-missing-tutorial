import { useEffect, useMemo, useState } from 'react';
import { marked } from 'marked';
import {
  badgeClassForTone,
  findGuideSection,
  inferTopicMode,
  modePresentation,
  parseGuide,
  resolveVersionMeta,
  scoreLabel,
  statusTone,
  truncateText
} from '../../lib/content-helpers.js';
import { MarkdownBlock } from '../content/MarkdownContent.jsx';
import {
  bandSummaryForValue,
  buildInterviewHubHash,
  chapterInterviewTopic,
  questionsForTopic,
  selectedInterviewBand
} from '../../lib/interview-questions.js';
import {
  FeedbackBar,
  HeaderPanel,
  InPageToc,
  PageLayout,
  ReadingStateBar
} from '../common/AppChrome.jsx';
import { InterviewQuestionsSection } from '../interview/InterviewQuestionCard.jsx';

function normalizeQuizQuestions(value) {
  const questions = Array.isArray(value?.questions) ? value.questions : Array.isArray(value) ? value : [];
  return questions
    .map((question, index) => {
      const options = Array.isArray(question.options) ? question.options : [];
      const answerIndex = typeof question.answerIndex === 'number'
        ? question.answerIndex
        : Math.max(0, options.findIndex((option) => option === question.answer));
      return {
        id: question.id || `q-${index + 1}`,
        question: String(question.question || `Question ${index + 1}`).trim(),
        options,
        answerIndex,
        explanation: String(question.explanation || '').trim()
      };
    })
    .filter((question) => question.question && question.options.length >= 2);
}

function ChapterPager({ previousChapter, nextChapter, isCompleted, onToggleDone }) {
  return (
    <div className="content-card chapter-nav-card">
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">
        <div>
          <div className="eyebrow mb-1">Keep Reading</div>
          <div className="muted-copy mb-0">Use chapter navigation to move through the book without reopening the sidebar.</div>
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

function ChapterQuizModal({ isOpen, onClose, chapterTitle, quiz, routeKey, onSaveScore }) {
  const questions = useMemo(() => normalizeQuizQuestions(quiz), [quiz]);
  const [answers, setAnswers] = useState([]);
  const [index, setIndex] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      return;
    }
    setAnswers(new Array(questions.length).fill(null));
    setIndex(0);
    setSubmitted(false);
  }, [isOpen, questions.length, routeKey]);

  useEffect(() => {
    function onEscape() {
      onClose();
    }

    if (isOpen) {
      document.addEventListener('reader:close-overlays', onEscape);
    }
    return () => document.removeEventListener('reader:close-overlays', onEscape);
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  const total = questions.length;
  const currentQuestion = questions[index];
  const allAnswered = answers.length === total && answers.every((answer) => answer !== null);
  const score = submitted
    ? answers.reduce((sum, answer, currentIndex) => sum + (answer === questions[currentIndex]?.answerIndex ? 1 : 0), 0)
    : 0;

  function chooseAnswer(answerIndex) {
    setAnswers((current) => {
      const next = [...current];
      next[index] = answerIndex;
      return next;
    });
  }

  function submitQuiz() {
    if (!allAnswered) {
      return;
    }

    onSaveScore(routeKey, {
      score: answers.reduce((sum, answer, currentIndex) => sum + (answer === questions[currentIndex]?.answerIndex ? 1 : 0), 0),
      total,
      at: new Date().toISOString()
    });
    setSubmitted(true);
  }

  return (
    <div className="modal fade show reader-modal" style={{ display: 'block' }} role="dialog" aria-modal="true">
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <div>
              <h2 className="modal-title h5 mb-1">{chapterTitle} Quiz</h2>
              <div className="muted-copy mb-0">5-question OCJP-style chapter check.</div>
            </div>
            <button type="button" className="btn-close" aria-label="Close" onClick={onClose} />
          </div>
          <div className="modal-body">
            {!questions.length ? (
              <div className="empty-state border rounded-4 p-4">Quiz content has not been added for this chapter yet.</div>
            ) : submitted ? (
              <div className="quiz-summary">
                <div className="quiz-score-card mb-4">
                  <div className="eyebrow mb-2">Your Score</div>
                  <h3 className="display-6 mb-1">{score}/{total}</h3>
                  <p className="mb-0 muted-copy">Review the wrong answers below and rerun the quiz whenever you want.</p>
                </div>
                <div className="quiz-review-list">
                  {questions.map((question, questionIndex) => {
                    const chosen = answers[questionIndex];
                    const correct = chosen === question.answerIndex;
                    return (
                      <div className={`quiz-review-item ${correct ? 'quiz-review-correct' : 'quiz-review-wrong'}`} key={question.id}>
                        <div className="fw-semibold mb-2">{question.question}</div>
                        <div className="mb-1">Your answer: {question.options[chosen] || 'Not answered'}</div>
                        {!correct ? <div className="mb-1">Correct answer: {question.options[question.answerIndex]}</div> : null}
                        {question.explanation ? <div className="muted-copy mb-0">{question.explanation}</div> : null}
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <>
                <div className="d-flex justify-content-between align-items-center gap-3 mb-3">
                  <span className="badge rounded-pill badge-soft">Question {index + 1} of {total}</span>
                  <span className="badge rounded-pill badge-soft">{answers.filter((answer) => answer !== null).length} answered</span>
                </div>
                <div className="quiz-question-card">
                  <h3 className="h5 mb-3">{currentQuestion.question}</h3>
                  <div className="quiz-options">
                    {currentQuestion.options.map((option, optionIndex) => (
                      <button
                        key={`${currentQuestion.id}-${option}`}
                        type="button"
                        className={`btn text-start quiz-option ${answers[index] === optionIndex ? 'quiz-option-active' : ''}`}
                        onClick={() => chooseAnswer(optionIndex)}
                      >
                        <span className="quiz-option-marker">{String.fromCharCode(65 + optionIndex)}</span>
                        <span>{option}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
          <div className="modal-footer">
            {!submitted ? (
              <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 w-100">
                <div className="d-flex gap-2">
                  <button type="button" className="btn btn-outline-dark" onClick={() => setIndex((current) => Math.max(0, current - 1))} disabled={index === 0 || !questions.length}>
                    Prev question
                  </button>
                  <button type="button" className="btn btn-outline-dark" onClick={() => setIndex((current) => Math.min(total - 1, current + 1))} disabled={index === total - 1 || !questions.length}>
                    Next question
                  </button>
                </div>
                <div className="d-flex gap-2">
                  <button type="button" className="btn btn-outline-secondary" onClick={onClose}>Close</button>
                  <button type="button" className="btn btn-primary" onClick={submitQuiz} disabled={!questions.length || !allAnswered}>
                    Finish quiz
                  </button>
                </div>
              </div>
            ) : (
              <div className="d-flex justify-content-end gap-2 w-100">
                <button
                  type="button"
                  className="btn btn-outline-dark"
                  onClick={() => {
                    setAnswers(new Array(questions.length).fill(null));
                    setIndex(0);
                    setSubmitted(false);
                  }}
                >
                  Retake
                </button>
                <button type="button" className="btn btn-primary" onClick={onClose}>Done</button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show" onClick={onClose} aria-hidden="true" />
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
    180
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
      <h3 className="h5 mb-2">{topic.title}</h3>
      <p className="muted-copy mb-3">{summary}</p>
      {topic.preview.storyHook ? <div className="topic-story-hook mb-2">{topic.preview.storyHook}</div> : null}
      <div className="topic-kicker">Real-world setup: {topic.preview.realWorld || 'Open the file to see the scenario and code walkthrough.'}</div>
    </a>
  );
}

export default function ChapterPage({ manifest, data, readingState, feedbackState, uiPreferences }) {
  const [quizOpen, setQuizOpen] = useState(false);
  const guide = parseGuide(data.guideRaw);
  const revision = parseGuide(data.revisionRaw);
  const problem = findGuideSection(guide, ['What Problem This Chapter Solves', 'The Problem', 'Mini Case Study', 'The Story']);
  const quickSummary = findGuideSection(guide, ['Quick Summary', 'What To Look For']);
  const routeKey = `#chapter/${data.section.slug}/${data.chapter.slug}`;
  const chapterIndex = manifest.chapterOrder.findIndex((chapter) => chapter.route === routeKey);
  const previousChapter = chapterIndex > 0 ? manifest.chapterOrder[chapterIndex - 1] : null;
  const nextChapter = chapterIndex >= 0 && chapterIndex < manifest.chapterOrder.length - 1 ? manifest.chapterOrder[chapterIndex + 1] : null;
  const isChapterDone = readingState.completedChapters.includes(routeKey);
  const chapterTopic = chapterInterviewTopic(data.section.slug, data.chapter.slug, data.chapter.title);
  const selectedBand = selectedInterviewBand();
  const chapterQuestions = questionsForTopic(chapterTopic, selectedBand).slice(0, 3);
  const chapterHubHref = buildInterviewHubHash({ topic: chapterTopic, band: selectedBand });
  const chapterToc = [
    { href: '#start-with-examples', label: 'Start With Examples' },
    { href: '#chapter-guide', label: 'Chapter Guide' },
    { href: '#revision-sheet', label: 'Revision Sheet' }
  ];

  useEffect(() => {
    setQuizOpen(false);
  }, [routeKey]);

  return (
    <>
      <PageLayout
        header={(
          <HeaderPanel
            title={data.chapter.title}
            eyebrow={`${data.section.title} · Chapter`}
            summary={truncateText(problem?.plain || guide.intro || quickSummary?.plain || 'Use this chapter to understand the concept, then run the topic files.', 240)}
            sourcePath={data.chapter.guide.sourcePath}
            actions={(
              <>
                <button className="btn btn-primary btn-sm rounded-pill" type="button" onClick={() => setQuizOpen(true)}>Take Quiz</button>
                <a className="btn btn-outline-dark btn-sm rounded-pill" href={data.chapter.runChapter.contentPath} target="_blank" rel="noreferrer">RunChapter.java</a>
                <a className="btn btn-outline-dark btn-sm rounded-pill" href={data.chapter.runAllTopics.contentPath} target="_blank" rel="noreferrer">RunAllTopics.java</a>
                <a className="btn btn-dark btn-sm rounded-pill" href={`#section/${data.section.slug}`}>Back To Section</a>
              </>
            )}
          />
        )}
      >
        <ReadingStateBar routeKey={routeKey} {...readingState} />
        <div className={`content-layout ${uiPreferences.readingMode ? 'content-layout-reading' : ''}`}>
          <div className="content-main">
            <div id="start-with-examples" className="content-card">
              <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
                <h2 className="page-title mb-0">Start With These Examples</h2>
                <div className="d-flex flex-wrap gap-2">
                  {scoreLabel(readingState.quizScores[routeKey]) ? <span className="badge rounded-pill text-bg-warning">Last score: {scoreLabel(readingState.quizScores[routeKey])}</span> : null}
                  <span className="badge rounded-pill badge-soft">{data.chapter.topics.length} runnable topic{data.chapter.topics.length === 1 ? '' : 's'}</span>
                </div>
              </div>
              <div className="topic-grid">
                {data.chapter.topics.map((topic) => (
                  <TopicPreviewCard section={data.section} chapter={data.chapter} topic={topic} key={topic.slug} />
                ))}
              </div>
            </div>

            <div id="chapter-guide" className="content-card">
              <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
                <h2 className="page-title mb-0">Chapter Guide</h2>
                <span className="badge rounded-pill badge-soft">Read this after the first example</span>
              </div>
              <MarkdownBlock html={marked.parse(data.guideRaw)} manifest={manifest} contentPath={data.chapter.guide.contentPath} />
            </div>

            <div id="revision-sheet" className="content-card">
              <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
                <h2 className="page-title mb-0">Revision Sheet</h2>
                <span className="badge rounded-pill badge-soft">{truncateText(revision.intro || 'Use this for quick recap after running the examples.', 100)}</span>
              </div>
              <MarkdownBlock html={marked.parse(data.revisionRaw)} manifest={manifest} contentPath={data.chapter.revision.contentPath} />
            </div>

            <ChapterPager
              previousChapter={previousChapter}
              nextChapter={nextChapter}
              isCompleted={isChapterDone}
              onToggleDone={() => readingState.toggleChapterCompleted(routeKey)}
            />

            {chapterTopic ? (
              <InterviewQuestionsSection
                title="Interview Questions for this topic"
                subtitle={`${chapterTopic} · ${bandSummaryForValue(selectedBand)}`}
                questions={chapterQuestions}
                topic={chapterTopic}
                band={selectedBand}
                totalCount={questionsForTopic(chapterTopic, selectedBand).length}
                compact
                hubHref={chapterHubHref}
                emptyMessage="No interview questions are available for this topic at the current band yet."
              />
            ) : null}
          </div>

          {!uiPreferences.readingMode ? (
            <div className="content-side">
              <InPageToc items={chapterToc} />
            </div>
          ) : null}
        </div>

        <FeedbackBar routeKey={routeKey} feedbackState={feedbackState} />
      </PageLayout>

      <ChapterQuizModal
        isOpen={quizOpen}
        onClose={() => setQuizOpen(false)}
        chapterTitle={data.chapter.title}
        quiz={data.chapter.quiz}
        routeKey={routeKey}
        onSaveScore={readingState.saveQuizScore}
      />
    </>
  );
}
