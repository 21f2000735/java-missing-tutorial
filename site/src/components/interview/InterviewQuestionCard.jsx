import { useEffect, useMemo, useState } from 'react';
import { marked } from 'marked';
import { CodeBlock } from '../content/MarkdownContent.jsx';
import {
  bandBadgeClass,
  bandLabelForValue,
  chapterRoutesForTopic,
  companyBadgeClass,
  frequencyDisplay,
  normalizeBand
} from '../../lib/interview-questions.js';

function CompanyPills({ companies }) {
  return (
    <div className="interview-company-row">
      {companies.map((company) => (
        <span key={company} className={`badge rounded-pill company-pill ${companyBadgeClass(company)}`}>
          {company}
        </span>
      ))}
    </div>
  );
}

function AnswerBody({ question }) {
  return (
    <div className="interview-answer-body">
      <div className="interview-answer-text" dangerouslySetInnerHTML={{ __html: marked.parse(question.answer) }} />
      {question.codeExample ? (
        <div className="mt-3">
          <div className="eyebrow mb-2">Code Example</div>
          <CodeBlock code={question.codeExample} />
        </div>
      ) : null}
      {Array.isArray(question.followUp) && question.followUp.length ? (
        <div className="mt-3">
          <div className="eyebrow mb-2">Follow-up Questions</div>
          <ul className="interview-followups mb-0">
            {question.followUp.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

export function InterviewQuestionCard({ question, compact = false }) {
  const [open, setOpen] = useState(false);
  const band = normalizeBand(question.band);
  const frequencyClass = question.frequency === 'very-high' ? 'badge-danger-soft' : question.frequency === 'high' ? 'badge-warning-soft' : 'badge-soft';

  return (
    <article className={`interview-question-card ${compact ? 'interview-question-card-compact' : ''}`}>
      <div className="d-flex justify-content-between align-items-start gap-3 flex-wrap">
        <div className="min-w-0 flex-grow-1">
          <div className="interview-question-meta mb-2">
            <span className={`badge rounded-pill ${bandBadgeClass(band)}`}>{bandLabelForValue(band)}</span>
            <span className="badge rounded-pill badge-soft">{question.topic}</span>
            <span className="badge rounded-pill badge-success-soft">{question.subtopic}</span>
            <span className={`badge rounded-pill ${frequencyClass}`}>
              {frequencyDisplay(question.frequency)}
            </span>
          </div>
          <h3 className="h6 mb-2 interview-question-title">{question.question}</h3>
          <CompanyPills companies={question.company} />
        </div>
        <button
          type="button"
          className={`btn btn-sm rounded-pill ${open ? 'btn-outline-dark' : 'btn-dark'}`}
          onClick={() => setOpen((current) => !current)}
        >
          {open ? 'Hide Answer' : 'Show Answer'}
        </button>
      </div>

      {open ? (
        <AnswerBody question={question} />
      ) : null}
    </article>
  );
}

export function InterviewQuestionsSection({
  title = 'Interview Questions for this topic',
  subtitle,
  questions = [],
  topic,
  band,
  totalCount,
  compact = true,
  emptyMessage = 'No matching interview questions were found for this chapter yet.',
  hubHref
}) {
  const countLabel = typeof totalCount === 'number' ? totalCount : questions.length;
  const linkHref = hubHref || buildInterviewHubHash({ topic, band });

  return (
    <section className="content-card interview-section">
      <div className="d-flex justify-content-between align-items-start flex-wrap gap-3 mb-3">
        <div>
          <h2 className="page-title mb-1">{title}</h2>
          <p className="muted-copy mb-0">
            {subtitle || 'Try the answer before you open it. Use the hub to see more questions at the same level.'}
          </p>
        </div>
        <a className="btn btn-outline-dark btn-sm rounded-pill" href={linkHref}>
          See all {countLabel} questions on this topic →
        </a>
      </div>
      <div className="company-question-list">
        {questions.length ? questions.map((question) => (
          <InterviewQuestionCard key={question.id} question={question} compact={compact} />
        )) : (
          <div className="empty-state border rounded-4 p-4">{emptyMessage}</div>
        )}
      </div>
    </section>
  );
}

export function BandSelector({ value, onChange }) {
  return (
    <div className="interview-band-selector">
      {[
        { value: 1, label: 'Fresher', subtitle: '0-1y' },
        { value: 2, label: 'Junior', subtitle: '1-3y' },
        { value: 3, label: 'Mid', subtitle: '3-6y' },
        { value: 4, label: 'Senior', subtitle: '6-10y' },
        { value: 5, label: 'Staff', subtitle: '10-15y' },
        { value: 6, label: 'Architect', subtitle: '15-30y' }
      ].map((bandOption) => (
        <button
          key={bandOption.value}
          type="button"
          className={`btn band-chip ${normalizeBand(value) === bandOption.value ? 'btn-primary band-chip-active' : 'btn-outline-dark'}`}
          onClick={() => onChange(bandOption.value)}
        >
          <span className="band-chip-label">{bandOption.label}</span>
          <span className="band-chip-subtitle">{bandOption.subtitle}</span>
        </button>
      ))}
    </div>
  );
}

export function InterviewStatsBar({ visibleCount, totalCount, band, topic }) {
  return (
    <div className="content-card interview-stats-bar mb-4">
      <div className="d-flex justify-content-between align-items-start gap-3 flex-wrap">
        <div>
          <div className="eyebrow mb-2">Interview Hub</div>
          <div className="muted-copy mb-0">
            Showing {visibleCount} of {totalCount} questions | Band: {band} | Topic: {topic}
          </div>
        </div>
      </div>
    </div>
  );
}

function pickRandomQuestions(list, limit) {
  const copy = [...list];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
  }
  return copy.slice(0, Math.min(limit, copy.length));
}

function ratingPoints(rating) {
  if (rating === 'got') {
    return 2;
  }
  if (rating === 'review') {
    return 1;
  }
  return 0;
}

export function InterviewMockModal({ isOpen, onClose, questions, manifest, bandLabel, topicLabel, storageKey = 'java-interview-last-session' }) {
  const [sessionQuestions, setSessionQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [ratings, setRatings] = useState([]);
  const [showAnswer, setShowAnswer] = useState(false);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      return;
    }
    const picked = pickRandomQuestions(questions, 10);
    setSessionQuestions(picked);
    setIndex(0);
    setRatings([]);
    setShowAnswer(false);
    setFinished(false);
  }, [isOpen, questions]);

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

  const currentQuestion = sessionQuestions[index];
  const total = sessionQuestions.length;

  function finishSession(nextRatings) {
    const entries = nextRatings.map((item, ratingIndex) => ({
      ...item,
      points: ratingPoints(item.rating),
      question: sessionQuestions[ratingIndex]
    }));
    const topicSummary = entries.reduce((map, item) => {
      const current = map[item.question.topic] || { topic: item.question.topic, points: 0, total: 0 };
      current.points += item.points;
      current.total += 2;
      map[item.question.topic] = current;
      return map;
    }, {});
    const weakTopics = Object.values(topicSummary)
      .map((item) => ({ ...item, ratio: item.total ? item.points / item.total : 0 }))
      .sort((left, right) => left.ratio - right.ratio)
      .slice(0, 3);

    const session = {
      at: new Date().toISOString(),
      bandLabel,
      topicLabel,
      total,
      ratings: entries.map((entry) => ({
        id: entry.question.id,
        rating: entry.rating,
        topic: entry.question.topic,
        band: entry.question.band
      })),
      weakTopics
    };

    localStorage.setItem(storageKey, JSON.stringify(session));
  }

  function rate(rating) {
    if (!currentQuestion) {
      return;
    }
    const nextRatings = [...ratings, { rating, questionId: currentQuestion.id }];
    setRatings(nextRatings);
    setShowAnswer(false);
    if (index + 1 >= total) {
      finishSession(nextRatings);
      setFinished(true);
      return;
    }
    setIndex((current) => current + 1);
  }

  const answerHtml = currentQuestion ? marked.parse(currentQuestion.answer) : '';
  const completedCount = ratings.length;
  const score = ratings.reduce((sum, item) => sum + ratingPoints(item.rating), 0);
  const maxScore = total * 2;
  const weakTopics = useMemo(() => {
    const totals = new Map();
    ratings.forEach((item, ratingIndex) => {
      const question = sessionQuestions[ratingIndex];
      if (!question) {
        return;
      }
      const current = totals.get(question.topic) || { topic: question.topic, points: 0, total: 0 };
      current.points += ratingPoints(item.rating);
      current.total += 2;
      totals.set(question.topic, current);
    });
    return [...totals.values()]
      .map((item) => ({ ...item, ratio: item.total ? item.points / item.total : 0 }))
      .sort((left, right) => left.ratio - right.ratio)
      .slice(0, 3);
  }, [ratings, sessionQuestions]);

  return (
    <div className="mock-modal-backdrop">
      <div className="mock-modal-shell">
        <div className="mock-modal-header">
          <div>
            <div className="eyebrow mb-1">Mock Interview</div>
            <h2 className="page-title mb-0">{topicLabel || 'Mixed Topics'} · {bandLabel}</h2>
          </div>
          <button type="button" className="btn btn-outline-dark btn-sm rounded-pill" onClick={onClose}>Close</button>
        </div>

        {!finished ? (
          !total ? (
            <div className="mock-summary-card">
              <div className="eyebrow mb-2">No Questions Available</div>
              <p className="muted-copy mb-0">Broaden the band or topic filter to start a mock interview.</p>
            </div>
          ) : (
          <>
            <div className="mock-modal-progress mb-3">
              <div className="d-flex justify-content-between align-items-center gap-3 mb-2">
                <span className="badge rounded-pill badge-soft">Question {index + 1} of {total || 1}</span>
                <span className="badge rounded-pill badge-soft">{completedCount} rated</span>
              </div>
              <div className="progress">
                <div className="progress-bar" style={{ width: `${total ? ((index + 1) / total) * 100 : 0}%` }} />
              </div>
            </div>

            <div className="mock-modal-question">
              <h3 className="h4 mb-3">{currentQuestion?.question}</h3>
              <div className="mock-modal-meta mb-3">
                <span className={`badge rounded-pill ${bandBadgeClass(normalizeBand(currentQuestion?.band || 1))}`}>{currentQuestion ? bandLabelForValue(currentQuestion.band) : ''}</span>
                {currentQuestion ? <span className="badge rounded-pill badge-soft">{currentQuestion.topic}</span> : null}
                {currentQuestion ? <span className="badge rounded-pill badge-success-soft">{currentQuestion.subtopic}</span> : null}
              </div>
              {showAnswer && currentQuestion ? (
                <div className="mock-modal-answer mb-3">
                  <div className="content-markdown" dangerouslySetInnerHTML={{ __html: answerHtml }} />
                  {currentQuestion.codeExample ? (
                    <div className="mt-3">
                      <div className="eyebrow mb-2">Code Example</div>
                      <CodeBlock code={currentQuestion.codeExample} />
                    </div>
                  ) : null}
                </div>
              ) : (
                <div className="mock-modal-hidden-answer mb-3">Think about the problem before revealing the answer.</div>
              )}
            </div>

            <div className="d-flex flex-wrap gap-2 justify-content-between align-items-center">
              <button type="button" className="btn btn-outline-dark rounded-pill" onClick={() => setShowAnswer((current) => !current)}>
                {showAnswer ? 'Hide Answer' : 'Show Answer'}
              </button>
              <div className="d-flex flex-wrap gap-2">
                <button type="button" className="btn btn-success rounded-pill" onClick={() => rate('got')} disabled={!showAnswer}>Got it ✓</button>
                <button type="button" className="btn btn-warning rounded-pill" onClick={() => rate('review')} disabled={!showAnswer}>Needs review ↺</button>
                <button type="button" className="btn btn-danger rounded-pill" onClick={() => rate('miss')} disabled={!showAnswer}>Didn't know ✗</button>
              </div>
            </div>
          </>
          )
        ) : (
          <div className="mock-modal-summary">
            <div className="row g-3 mb-3">
              <div className="col-12 col-md-4">
                <div className="mock-summary-card">
                  <div className="eyebrow mb-1">Score</div>
                  <div className="display-6 mb-0">{score}/{maxScore}</div>
                </div>
              </div>
              <div className="col-12 col-md-4">
                <div className="mock-summary-card">
                  <div className="eyebrow mb-1">Breakdown</div>
                  <div className="mb-1">Got it: {ratings.filter((item) => item.rating === 'got').length}</div>
                  <div className="mb-1">Needs review: {ratings.filter((item) => item.rating === 'review').length}</div>
                  <div className="mb-0">Didn't know: {ratings.filter((item) => item.rating === 'miss').length}</div>
                </div>
              </div>
              <div className="col-12 col-md-4">
                <div className="mock-summary-card">
                  <div className="eyebrow mb-1">Last Session Saved</div>
                  <div className="mb-0">{new Date().toLocaleString()}</div>
                </div>
              </div>
            </div>

            <div className="mock-summary-card mb-3">
              <div className="eyebrow mb-2">Weak Topics</div>
              {weakTopics.length ? weakTopics.map((item) => (
                <div key={item.topic} className="d-flex justify-content-between align-items-center gap-2 flex-wrap mb-2">
                  <span className="badge rounded-pill badge-soft">{item.topic}</span>
                  <span className="muted-copy">{Math.round(item.ratio * 100)}%</span>
                </div>
              )) : <p className="mb-0 muted-copy">No weak topics found in this session.</p>}
            </div>

            <div className="mock-summary-card">
              <div className="eyebrow mb-2">Relevant Chapters</div>
              <div className="d-flex flex-wrap gap-2">
                {(weakTopics.length ? weakTopics : [{ topic: topicLabel || 'Architecture' }]).flatMap((item) => chapterRoutesForTopic(manifest, item.topic).slice(0, 1)).map((item) => (
                  <a key={`${item.route}-${item.title}`} className="btn btn-outline-dark btn-sm rounded-pill" href={item.route}>
                    {item.sectionTitle} · {item.title}
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
