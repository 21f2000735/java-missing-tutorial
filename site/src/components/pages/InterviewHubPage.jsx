import { useEffect, useMemo, useState } from 'react';
import {
  COMPANY_FILTERS,
  FREQUENCY_FILTERS,
  TOPIC_FILTERS,
  bandSummaryForValue,
  buildInterviewHubHash,
  filteredInterviewQuestions,
  getInterviewQuestions,
  normalizeBand,
  readStoredInterviewFilters,
  selectedInterviewBand,
  setSelectedInterviewBand,
  writeStoredInterviewFilters
} from '../../lib/interview-questions.js';
import { HeaderPanel, PageLayout } from '../common/AppChrome.jsx';
import {
  BandSelector,
  InterviewMockModal,
  InterviewQuestionCard,
  InterviewStatsBar
} from '../interview/InterviewQuestionCard.jsx';

function readRouteValue(value) {
  return value ? String(value) : 'All';
}

export default function InterviewHubPage({ manifest, route }) {
  const questions = useMemo(() => getInterviewQuestions(), []);
  const savedFilters = useMemo(() => readStoredInterviewFilters(), []);
  const [selectedBand, setBandState] = useState(() => normalizeBand(route?.band || savedFilters.band || selectedInterviewBand()));
  const [companyFilter, setCompanyFilter] = useState(() => readRouteValue(route?.company || savedFilters.company));
  const [topicFilter, setTopicFilter] = useState(() => readRouteValue(route?.topic || savedFilters.topic));
  const [frequencyFilter, setFrequencyFilter] = useState(() => readRouteValue(route?.frequency || savedFilters.frequency));
  const [mockOpen, setMockOpen] = useState(false);

  useEffect(() => {
    if (route?.band) {
      setBandState(normalizeBand(route.band));
    }
    if (route?.company && COMPANY_FILTERS.includes(route.company)) {
      setCompanyFilter(route.company);
    }
    if (route?.topic && TOPIC_FILTERS.includes(route.topic)) {
      setTopicFilter(route.topic);
    }
    if (route?.frequency && FREQUENCY_FILTERS.includes(route.frequency)) {
      setFrequencyFilter(route.frequency);
    }
  }, [route?.band, route?.company, route?.frequency, route?.topic]);

  useEffect(() => {
    setSelectedInterviewBand(selectedBand);
  }, [selectedBand]);

  useEffect(() => {
    writeStoredInterviewFilters({
      band: selectedBand,
      company: companyFilter,
      topic: topicFilter,
      frequency: frequencyFilter
    });
  }, [companyFilter, frequencyFilter, selectedBand, topicFilter]);

  const filteredQuestions = useMemo(() => filteredInterviewQuestions({
    band: selectedBand,
    company: companyFilter,
    topic: topicFilter,
    frequency: frequencyFilter
  }), [companyFilter, frequencyFilter, selectedBand, topicFilter]);

  const interviewPool = useMemo(() => filteredInterviewQuestions({
    band: selectedBand,
    company: 'All',
    topic: topicFilter,
    frequency: 'All'
  }), [selectedBand, topicFilter]);

  const scopeCount = useMemo(() => filteredInterviewQuestions({
    band: selectedBand,
    company: 'All',
    topic: topicFilter,
    frequency: 'All'
  }).length, [selectedBand, topicFilter]);

  const topicLabel = topicFilter === 'All' ? 'All topics' : topicFilter;
  const bandLabel = `${bandSummaryForValue(selectedBand)}`;

  return (
    <>
      <PageLayout
        header={(
          <HeaderPanel
            title="Interview Hub"
            eyebrow="Interview Prep Hub"
            summary="Filter questions by experience band, company, topic, and frequency. Start a mock interview when you want timed practice without answers in view."
            sourcePath="site/src/data/interview_questions.json"
            actions={(
              <>
                <button className="btn btn-primary btn-sm rounded-pill" type="button" onClick={() => setMockOpen(true)} disabled={!interviewPool.length}>
                  Start Mock Interview
                </button>
                <a className="btn btn-outline-dark btn-sm rounded-pill" href={buildInterviewHubHash({ band: selectedBand, company: companyFilter, topic: topicFilter, frequency: frequencyFilter })}>
                  Share Current Filter
                </a>
              </>
            )}
          />
        )}
      >
        <InterviewStatsBar
          visibleCount={filteredQuestions.length}
          totalCount={scopeCount}
          band={bandLabel}
          topic={topicLabel}
        />

        <div className="content-card mb-4">
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
            <h2 className="page-title mb-0">Experience Band</h2>
            <span className="badge rounded-pill badge-soft">{bandLabel}</span>
          </div>
          <BandSelector value={selectedBand} onChange={setBandState} />
        </div>

        <div className="content-card mb-4">
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
            <h2 className="page-title mb-0">Filters</h2>
            <span className="badge rounded-pill badge-soft">{filteredQuestions.length} question{filteredQuestions.length === 1 ? '' : 's'}</span>
          </div>
          <div className="filter-grid interview-filter-grid">
            <div className="filter-field">
              <span className="eyebrow mb-2 d-block">Company</span>
              <div className="interview-chip-row">
                {COMPANY_FILTERS.map((company) => (
                  <button
                    key={company}
                    type="button"
                    className={`btn btn-sm rounded-pill interview-chip ${companyFilter === company ? 'btn-dark' : 'btn-outline-dark'}`}
                    onClick={() => setCompanyFilter(company)}
                  >
                    {company}
                  </button>
                ))}
              </div>
            </div>

            <label className="filter-field">
              <span className="eyebrow mb-2 d-block">Topic</span>
              <select className="form-select filter-select" value={topicFilter} onChange={(event) => setTopicFilter(event.target.value)}>
                {TOPIC_FILTERS.map((topic) => (
                  <option key={topic} value={topic}>{topic}</option>
                ))}
              </select>
            </label>

            <label className="filter-field">
              <span className="eyebrow mb-2 d-block">Frequency</span>
              <select className="form-select filter-select" value={frequencyFilter} onChange={(event) => setFrequencyFilter(event.target.value)}>
                {FREQUENCY_FILTERS.map((frequency) => (
                  <option key={frequency} value={frequency}>{frequency}</option>
                ))}
              </select>
            </label>
          </div>
        </div>

        <div className="company-question-list">
          {filteredQuestions.length ? filteredQuestions.map((question) => (
            <InterviewQuestionCard key={question.id} question={question} />
          )) : (
            <div className="content-card empty-state">
              No questions match this combination. Broaden one filter or lower the band.
            </div>
          )}
        </div>
      </PageLayout>

      <InterviewMockModal
        isOpen={mockOpen}
        onClose={() => setMockOpen(false)}
        questions={interviewPool}
        manifest={manifest}
        bandLabel={bandLabel}
        topicLabel={topicLabel}
      />
    </>
  );
}
