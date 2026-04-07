import { useMemo, useState } from 'react';
import { marked } from 'marked';
import { flattenCompanyQuestions } from '../../lib/study-tools.js';
import { parseCompanyQuestionBank } from '../../lib/content-helpers.js';
import { RESOURCE_DESCRIPTIONS } from '../../lib/site-data.js';
import FlashcardStudyPanel from '../study/FlashcardStudyPanel.jsx';
import {
  BulletList,
  FeedbackBar,
  HeaderPanel,
  InsightCard,
  PageLayout,
  ReadingStateBar
} from '../common/AppChrome.jsx';

export default function CompanyQuestionBankPage({ raw, resource, routeKey, readingState, feedbackState, flashcardState }) {
  const parsed = useMemo(() => parseCompanyQuestionBank(raw), [raw]);
  const [companyFilter, setCompanyFilter] = useState('all');
  const [bucketFilter, setBucketFilter] = useState('all');
  const [focusFilter, setFocusFilter] = useState('all');

  const availableBuckets = useMemo(() => [...new Set(parsed.companies.map((company) => company.profile.bucket))], [parsed.companies]);
  const availableFocus = useMemo(() => [...new Set(parsed.companies.flatMap((company) => company.profile.focus))], [parsed.companies]);

  const filteredCompanies = parsed.companies.filter((company) => {
    if (companyFilter !== 'all' && company.profile.slug !== companyFilter) {
      return false;
    }
    if (bucketFilter !== 'all' && company.profile.bucket !== bucketFilter) {
      return false;
    }
    if (focusFilter !== 'all' && !company.profile.focus.includes(focusFilter)) {
      return false;
    }
    return true;
  });
  const filteredQuestions = useMemo(() => flattenCompanyQuestions({ ...parsed, companies: filteredCompanies }), [parsed, filteredCompanies]);

  return (
    <PageLayout
      header={(
        <HeaderPanel
          title={resource.title}
          eyebrow="Interview Resource"
          summary={RESOURCE_DESCRIPTIONS[resource.slug]}
          sourcePath={resource.sourcePath}
        />
      )}
    >
      <ReadingStateBar routeKey={routeKey} {...readingState} />
      <div className="insight-grid mb-4">
        <InsightCard icon="bi bi-buildings" title="What This Page Helps With">
          Company pressure differs. This page lets you filter by company tier, interview focus, and question style without losing the deeper runnable chapters behind it.
        </InsightCard>
        <InsightCard icon="bi bi-list-check" title="How To Use It">
          <BulletList items={parsed.overview.howToUse} />
        </InsightCard>
        <InsightCard icon="bi bi-diagram-3" title="Question Count">
          {parsed.companies.length} company tracks and {parsed.companies.reduce((sum, company) => sum + company.questions.length, 0)} original question-answer pairs are available right now.
        </InsightCard>
        <InsightCard icon="bi bi-arrow-right-circle" title="Best Next Move">
          Filter one company, answer aloud before reading the sample answer, then jump into the linked company-interview section chapters for runnable code.
        </InsightCard>
      </div>

      <FlashcardStudyPanel questions={filteredQuestions} flashcardState={flashcardState} />

      <div className="content-card mb-4">
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
          <h2 className="page-title mb-0">Filter The Question Bank</h2>
          <span className="badge rounded-pill badge-soft">{filteredCompanies.length} company track{filteredCompanies.length === 1 ? '' : 's'}</span>
        </div>
        <div className="filter-grid">
          <label className="filter-field">
            <span className="eyebrow mb-2">Company</span>
            <select className="form-select filter-select" value={companyFilter} onChange={(event) => setCompanyFilter(event.target.value)}>
              <option value="all">All companies</option>
              {parsed.companies.map((company) => (
                <option key={company.profile.slug} value={company.profile.slug}>{company.name}</option>
              ))}
            </select>
          </label>
          <label className="filter-field">
            <span className="eyebrow mb-2">Company Group</span>
            <select className="form-select filter-select" value={bucketFilter} onChange={(event) => setBucketFilter(event.target.value)}>
              <option value="all">All groups</option>
              {availableBuckets.map((bucket) => (
                <option key={bucket} value={bucket}>{bucket}</option>
              ))}
            </select>
          </label>
          <label className="filter-field">
            <span className="eyebrow mb-2">Interview Focus</span>
            <select className="form-select filter-select" value={focusFilter} onChange={(event) => setFocusFilter(event.target.value)}>
              <option value="all">All focus areas</option>
              {availableFocus.map((focus) => (
                <option key={focus} value={focus}>{focus}</option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <div className="company-grid">
        {filteredCompanies.length ? filteredCompanies.map((company) => (
          <div key={company.profile.slug} className="content-card company-card">
            <div className="d-flex justify-content-between align-items-start gap-3 flex-wrap mb-3">
              <div>
                <h2 className="page-title mb-2">{company.name}</h2>
                <div className="topic-meta mb-0">
                  <span className="badge rounded-pill badge-soft">{company.profile.bucket}</span>
                  {company.profile.focus.map((focus) => (
                    <span key={focus} className="badge rounded-pill badge-success-soft">{focus}</span>
                  ))}
                </div>
              </div>
              <a className="btn btn-outline-dark btn-sm rounded-pill" href="#section/sec21_company_interview_tracks">
                Open Company Section
              </a>
            </div>

            <div className="insight-grid mb-4">
              <InsightCard icon="bi bi-bullseye" title="What To Prepare For">
                <BulletList items={company.prepare} />
              </InsightCard>
              <InsightCard icon="bi bi-lightning-charge" title="Interview Pressure">
                {company.profile.focus.join(', ')} are the dominant follow-up directions for this company track.
              </InsightCard>
            </div>

            <div className="company-question-list">
              {company.questions.map((question) => (
                <details key={`${company.profile.slug}-${question.title}`} className="company-question">
                  <summary>
                    <span className="badge rounded-pill badge-soft">{question.title}</span>
                    <span>{question.prompt}</span>
                  </summary>
                  <div className="company-answer" dangerouslySetInnerHTML={{ __html: marked.parse(question.answer) }} />
                </details>
              ))}
            </div>
          </div>
        )) : (
          <div className="content-card empty-state">
            No company track matches this filter combination. Clear one filter and try again.
          </div>
        )}
      </div>

      <FeedbackBar routeKey={routeKey} feedbackState={feedbackState} />
    </PageLayout>
  );
}
