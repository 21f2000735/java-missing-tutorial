import { useEffect, useMemo, useState } from 'react';
import { marked } from 'marked';
import { dayOfYear, formatLongDate } from '../../lib/study-tools.js';

export default function DailyChallengeCard({ questions }) {
  const [revealed, setRevealed] = useState(false);
  const [draftAnswer, setDraftAnswer] = useState('');

  const challenge = useMemo(() => {
    if (!questions.length) {
      return null;
    }
    const index = Math.max(0, dayOfYear(new Date()) - 1) % questions.length;
    return questions[index];
  }, [questions]);

  useEffect(() => {
    setRevealed(false);
    setDraftAnswer('');
  }, [challenge?.id]);

  if (!questions.length) {
    return (
      <div className="content-card daily-challenge-card">
        <div className="eyebrow mb-2">Daily challenge</div>
        <p className="muted-copy mb-0">The question bank is still loading, so today’s challenge is not ready yet.</p>
      </div>
    );
  }

  return (
    <div className="content-card daily-challenge-card">
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
        <div>
          <div className="eyebrow mb-2">Daily challenge</div>
          <h2 className="h4 mb-1">Question for {formatLongDate(Date.now())}</h2>
          <p className="muted-copy mb-0">Write your answer first, then reveal the sample answer and compare the structure.</p>
        </div>
        <div className="topic-meta mb-0">
          <span className="badge rounded-pill badge-soft">{challenge.company}</span>
          {challenge.focus.slice(0, 2).map((focus) => (
            <span key={`${challenge.id}-${focus}`} className="badge rounded-pill badge-success-soft">{focus}</span>
          ))}
        </div>
      </div>

      <div className="daily-challenge-prompt">
        <strong>{challenge.prompt}</strong>
      </div>

      <label className="filter-field mb-3">
        <span className="eyebrow mb-2">Your answer</span>
        <textarea
          className="form-control daily-challenge-input"
          rows={5}
          placeholder="Write the answer you would give in an interview before checking the sample answer."
          value={draftAnswer}
          onChange={(event) => setDraftAnswer(event.target.value)}
        />
      </label>

      <div className="d-flex flex-wrap gap-2 mb-3">
        <button type="button" className="btn btn-dark rounded-pill px-4" onClick={() => setRevealed((current) => !current)}>
          {revealed ? 'Hide sample answer' : 'Reveal sample answer'}
        </button>
        <a className="btn btn-outline-dark rounded-pill px-4" href="#resource/COMPANY_QUESTION_BANK">Open flashcards</a>
      </div>

      {revealed ? (
        <div className="daily-challenge-answer" dangerouslySetInnerHTML={{ __html: marked.parse(challenge.answer) }} />
      ) : null}
    </div>
  );
}
