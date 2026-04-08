import { marked } from 'marked';
import {
  FeedbackBar,
  HeaderPanel,
  PageLayout,
  ReadingStateBar
} from '../common/AppChrome.jsx';
import { MarkdownBlock } from '../content/MarkdownContent.jsx';
import { RESOURCE_DESCRIPTIONS } from '../../lib/site-data.js';
import CompanyQuestionBankPage from './CompanyQuestionBankPage.jsx';

export default function ResourcePage({
  manifest,
  resource,
  raw,
  readingState,
  feedbackState,
  flashcardState
}) {
  const routeKey = `#resource/${resource.slug}`;

  if (resource.slug === 'COMPANY_QUESTION_BANK') {
    return (
      <CompanyQuestionBankPage
        raw={raw}
        resource={resource}
        routeKey={routeKey}
        readingState={readingState}
        feedbackState={feedbackState}
        flashcardState={flashcardState}
      />
    );
  }

  return (
    <PageLayout
      header={(
        <HeaderPanel
          title={resource.title}
          eyebrow="Reference"
          summary={RESOURCE_DESCRIPTIONS[resource.slug] || 'Read the source markdown behind this part of the site.'}
          sourcePath={resource.sourcePath}
        />
      )}
    >
      <ReadingStateBar routeKey={routeKey} {...readingState} />
      <div className="content-card">
        <MarkdownBlock html={marked.parse(raw)} manifest={manifest} contentPath={resource.contentPath} />
      </div>
      <FeedbackBar routeKey={routeKey} feedbackState={feedbackState} />
    </PageLayout>
  );
}
