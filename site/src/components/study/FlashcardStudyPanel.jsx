import { useEffect, useMemo, useState } from 'react';
import { marked } from 'marked';
import { formatShortDate } from '../../lib/study-tools.js';

export default function FlashcardStudyPanel({ questions, flashcardState }) {
  const [sessionMode, setSessionMode] = useState('due');
  const [currentCardId, setCurrentCardId] = useState('');
  const [revealed, setRevealed] = useState(false);
  const now = Date.now();

  const dueQuestions = useMemo(
    () => questions.filter((question) => !flashcardState.progress[question.id]?.nextReviewAt || flashcardState.progress[question.id].nextReviewAt <= now),
    [questions, flashcardState.progress, now]
  );
  const availableQuestions = sessionMode === 'due' ? dueQuestions : questions;
  const currentCard = availableQuestions.find((question) => question.id === currentCardId) || availableQuestions[0] || null;
  const reviewedCount = questions.filter((question) => flashcardState.progress[question.id]).length;
  const masteredCount = questions.filter((question) => (flashcardState.progress[question.id]?.intervalDays || 0) >= 4).length;
  const nextDueAt = questions
    .map((question) => flashcardState.progress[question.id]?.nextReviewAt)
    .filter((value) => typeof value === 'number' && value > now)
    .sort((left, right) => left - right)[0];

  useEffect(() => {
    if (!currentCard && currentCardId) {
      setCurrentCardId('');
      setRevealed(false);
      return;
    }
    if (currentCard && currentCard.id !== currentCardId) {
      setCurrentCardId(currentCard.id);
      setRevealed(false);
    }
  }, [currentCard, currentCardId]);

  function moveToNext() {
    if (!availableQuestions.length) {
      setCurrentCardId('');
      setRevealed(false);
      return;
    }
    const index = Math.max(0, availableQuestions.findIndex((question) => question.id === currentCard?.id));
    const next = availableQuestions[(index + 1) % availableQuestions.length];
    setCurrentCardId(next.id);
    setRevealed(false);
  }

  function handleGotIt() {
    if (!currentCard) {
      return;
    }
    flashcardState.markGotIt(currentCard.id);
    setCurrentCardId('');
    setRevealed(false);
  }

  function handleReviewAgain() {
    if (!currentCard) {
      return;
    }
    flashcardState.markReviewAgain(currentCard.id);
    setCurrentCardId('');
    setRevealed(false);
  }

  if (!questions.length) {
    return (
      <div className="content-card flashcard-shell mb-4">
        <div className="eyebrow mb-2">Flashcard mode</div>
        <p className="muted-copy mb-0">No cards match the current company filters.</p>
      </div>
    );
  }

  return (
    <div className="content-card flashcard-shell mb-4">
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
        <div>
          <h2 className="page-title mb-1">Flashcard Mode</h2>
          <p className="muted-copy mb-0">Flip the card, grade yourself honestly, and let local spaced repetition bring weak questions back tomorrow.</p>
        </div>
        <div className="flashcard-session-toggle">
          <button
            type="button"
            className={`btn btn-sm rounded-pill ${sessionMode === 'due' ? 'btn-dark' : 'btn-outline-dark'}`}
            onClick={() => setSessionMode('due')}
          >
            Due today
          </button>
          <button
            type="button"
            className={`btn btn-sm rounded-pill ${sessionMode === 'all' ? 'btn-dark' : 'btn-outline-dark'}`}
            onClick={() => setSessionMode('all')}
          >
            All cards
          </button>
        </div>
      </div>

      <div className="flashcard-stats">
        <div className="flashcard-stat">
          <span className="eyebrow">Due now</span>
          <strong>{dueQuestions.length}</strong>
        </div>
        <div className="flashcard-stat">
          <span className="eyebrow">Seen before</span>
          <strong>{reviewedCount}</strong>
        </div>
        <div className="flashcard-stat">
          <span className="eyebrow">Strong cards</span>
          <strong>{masteredCount}</strong>
        </div>
        <div className="flashcard-stat">
          <span className="eyebrow">Next review</span>
          <strong>{nextDueAt ? formatShortDate(nextDueAt) : 'None scheduled'}</strong>
        </div>
      </div>

      {currentCard ? (
        <div className="flashcard-card">
          <div className="d-flex justify-content-between align-items-start gap-3 flex-wrap mb-3">
            <div>
              <div className="eyebrow mb-2">Front</div>
              <h3 className="h5 mb-2">{currentCard.company}</h3>
              <p className="muted-copy mb-0">{currentCard.title}</p>
            </div>
            <div className="topic-meta mb-0">
              <span className="badge rounded-pill badge-soft">{currentCard.bucket}</span>
              {currentCard.focus.map((focus) => (
                <span key={`${currentCard.id}-${focus}`} className="badge rounded-pill badge-success-soft">{focus}</span>
              ))}
            </div>
          </div>

          <div className="flashcard-face mb-3">
            <strong>{currentCard.prompt}</strong>
          </div>

          {!revealed ? (
            <button type="button" className="btn btn-dark rounded-pill px-4 mb-3" onClick={() => setRevealed(true)}>
              Flip card
            </button>
          ) : (
            <div className="flashcard-answer mb-3" dangerouslySetInnerHTML={{ __html: marked.parse(currentCard.answer) }} />
          )}

          <div className="d-flex flex-wrap gap-2">
            <button type="button" className="btn btn-outline-dark rounded-pill px-4" onClick={moveToNext}>
              Skip
            </button>
            <button type="button" className="btn btn-dark rounded-pill px-4" onClick={handleGotIt} disabled={!revealed}>
              Got it
            </button>
            <button type="button" className="btn btn-outline-dark rounded-pill px-4" onClick={handleReviewAgain} disabled={!revealed}>
              Review again
            </button>
            <button type="button" className="btn btn-outline-dark rounded-pill px-4" onClick={flashcardState.resetAll}>
              Reset flashcards
            </button>
          </div>
        </div>
      ) : (
        <div className="flashcard-empty">
          <h3 className="h5 mb-2">No cards are due right now.</h3>
          <p className="muted-copy mb-3">Switch to all cards if you want extra practice, or come back on {nextDueAt ? formatShortDate(nextDueAt) : 'a future review day'}.</p>
          <button type="button" className="btn btn-outline-dark rounded-pill px-4" onClick={() => setSessionMode('all')}>
            Study all cards
          </button>
        </div>
      )}
    </div>
  );
}
