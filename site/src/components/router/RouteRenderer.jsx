import ResourcePage from '../pages/ResourcePage.jsx';
import SectionPage from '../pages/SectionPage.jsx';
import ChapterPage from '../pages/ChapterPage.jsx';
import TopicPage from '../pages/TopicPage.jsx';
import HomePage from '../pages/HomePage.jsx';
import ProgressPage from '../pages/ProgressPage.jsx';
import InterviewHubPage from '../pages/InterviewHubPage.jsx';
import { useRouteContent } from '../../hooks/use-route-content.js';

export default function RouteRenderer({
  route,
  manifest,
  fetchText,
  readingState,
  learningPathState,
  feedbackState,
  flashcardState,
  uiPreferences
}) {
  const content = useRouteContent({ route, manifest, fetchText });

  if (content.status === 'loading') {
    return <div className="content-card empty-state">Loading content…</div>;
  }

  if (content.status === 'error') {
    return <div className="content-card empty-state">{content.error}</div>;
  }

  const data = content.data;

  if (data.type === 'home') {
    return <HomePage manifest={manifest} fetchText={fetchText} learningPathState={learningPathState} />;
  }

  if (data.type === 'progress') {
    return (
      <ProgressPage
        manifest={manifest}
        completedChapters={readingState.completedChapters}
        quizScores={readingState.quizScores}
      />
    );
  }

  if (data.type === 'interview-hub') {
    return <InterviewHubPage manifest={manifest} route={data.route} />;
  }

  if (data.type === 'resource') {
    return (
      <ResourcePage
        manifest={manifest}
        resource={data.resource}
        raw={data.raw}
        readingState={readingState}
        feedbackState={feedbackState}
        flashcardState={flashcardState}
      />
    );
  }

  if (data.type === 'section') {
    return <SectionPage manifest={manifest} section={data.section} raw={data.raw} uiPreferences={uiPreferences} />;
  }

  if (data.type === 'chapter') {
    return (
      <ChapterPage
        manifest={manifest}
        data={data}
        readingState={readingState}
        feedbackState={feedbackState}
        uiPreferences={uiPreferences}
      />
    );
  }

  return (
    <TopicPage
      manifest={manifest}
      data={data}
      readingState={readingState}
      feedbackState={feedbackState}
      uiPreferences={uiPreferences}
    />
  );
}
