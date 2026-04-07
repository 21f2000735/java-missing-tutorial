import { PageLayout, HeaderPanel } from '../common/AppChrome.jsx';
import { scoreLabel } from '../../lib/content-helpers.js';

export default function ProgressPage({ manifest, completedChapters, quizScores }) {
  const groups = manifest.sections.map((section) => {
    const chapters = section.chapters.map((chapter) => ({
      route: chapter.route,
      title: chapter.title,
      quizScore: quizScores[chapter.route],
      completed: completedChapters.includes(chapter.route)
    }));
    return {
      ...section,
      chapters,
      completedCount: chapters.filter((chapter) => chapter.completed).length
    };
  });
  const total = manifest.chapterOrder.length;
  const done = completedChapters.length;

  return (
    <PageLayout
      header={(
        <HeaderPanel
          title="My Progress"
          eyebrow="Reader Progress"
          summary="Track completed chapters section by section and revisit weak quiz scores before interviews or revision sessions."
        />
      )}
    >
      <div className="content-card mb-4">
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
          <div>
            <div className="eyebrow mb-1">Overall Completion</div>
            <div className="muted-copy mb-0">{done} / {total} chapters marked done.</div>
          </div>
          <span className="badge rounded-pill text-bg-primary">{Math.round((done / Math.max(1, total)) * 100)}%</span>
        </div>
      </div>
      <div className="progress-section-list">
        {groups.map((section) => (
          <div className="content-card mb-4" key={section.slug}>
            <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
              <h2 className="page-title mb-0">{section.title}</h2>
              <span className="badge rounded-pill badge-soft">{section.completedCount} / {section.chapters.length}</span>
            </div>
            <div className="progress-chapter-list">
              {section.chapters.map((chapter) => (
                <a className="progress-chapter-row" href={chapter.route} key={chapter.route}>
                  <div className="d-flex align-items-center gap-2">
                    {chapter.completed ? <i className="bi bi-check-circle-fill text-success" /> : <i className="bi bi-circle text-muted" />}
                    <span>{chapter.title}</span>
                  </div>
                  <div className="d-flex align-items-center gap-2">
                    {scoreLabel(chapter.quizScore) ? <span className="badge rounded-pill text-bg-warning">{scoreLabel(chapter.quizScore)}</span> : null}
                    <span className={`badge rounded-pill ${chapter.completed ? 'text-bg-success' : 'badge-soft'}`}>
                      {chapter.completed ? 'Done' : 'Pending'}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </PageLayout>
  );
}
