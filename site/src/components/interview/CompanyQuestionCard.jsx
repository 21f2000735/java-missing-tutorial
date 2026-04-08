import { useState } from 'react';
import { marked } from 'marked';
import {
  companyBadgeClass,
  isFrequentlyAsked
} from '../../lib/company-questions.js';

function CompanyBadges({ companies }) {
  return (
    <div className="company-badge-row">
      {companies.map((company) => (
        <span key={company} className={`badge rounded-pill company-pill ${companyBadgeClass(company)}`}>
          {company}
        </span>
      ))}
    </div>
  );
}

export default function CompanyQuestionCard({ question, compact = false }) {
  const [open, setOpen] = useState(false);
  const frequent = isFrequentlyAsked(question);

  return (
    <div className={`company-question-card ${compact ? 'company-question-card-compact' : ''}`}>
      <div className="company-question-card-header">
        <div className="d-flex align-items-start justify-content-between gap-3">
          <div className="min-w-0">
            <div className="company-question-kicker mb-2">
              <span className="badge rounded-pill badge-soft">{question.topic}</span>
              <span className="badge rounded-pill badge-success-soft">{question.subtopic}</span>
              <span className="badge rounded-pill badge-soft">{question.level}</span>
              {frequent ? (
                <span className="badge rounded-pill badge-danger-soft frequent-badge">
                  <i className="bi bi-fire me-1" />
                  Frequently Asked
                </span>
              ) : null}
            </div>
            <h3 className="h6 mb-2 company-question-title">{question.question}</h3>
            <CompanyBadges companies={question.company} />
          </div>
          <button
            type="button"
            className="btn btn-dark btn-sm rounded-pill flex-shrink-0"
            onClick={() => setOpen((current) => !current)}
          >
            {open ? 'Hide Answer' : 'Show Answer'}
          </button>
        </div>
      </div>

      {open ? (
        <div className="company-question-card-body">
          <div className="company-answer mb-3" dangerouslySetInnerHTML={{ __html: marked.parse(question.answer) }} />
          {question.codeExample ? (
            <div className="company-code-block">
              <div className="eyebrow mb-2">Code Example</div>
              <pre className="mb-0"><code>{question.codeExample}</code></pre>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

export function CompanyQuestionsSection({
  title = 'Companies that ask this',
  subtitle = 'Top interview questions matched to the current chapter.',
  questions = [],
  compact = false,
  emptyMessage = 'No matching company questions are available for this chapter yet.'
}) {
  if (!questions.length) {
    return null;
  }

  return (
    <section className="content-card company-questions-section">
      <div className="d-flex justify-content-between align-items-start gap-3 flex-wrap mb-3">
        <div>
          <h2 className="page-title mb-1">{title}</h2>
          <p className="muted-copy mb-0">{subtitle}</p>
        </div>
        <a className="btn btn-outline-dark btn-sm rounded-pill" href="#interview-hub">
          Open Interview Hub
        </a>
      </div>
      <div className="company-question-list">
        {questions.length ? questions.map((question) => (
          <CompanyQuestionCard key={question.id} question={question} compact={compact} />
        )) : (
          <div className="empty-state border rounded-4 p-4">{emptyMessage}</div>
        )}
      </div>
    </section>
  );
}
