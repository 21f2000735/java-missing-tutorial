import { useState } from 'react';
import { LEARNING_PATHS } from '../../data/learning-paths.js';

export default function LearningPathsBoard({ learningPathState }) {
  const [activePathId, setActivePathId] = useState(() => LEARNING_PATHS[0]?.id || '');
  const activePath = LEARNING_PATHS.find((path) => path.id === activePathId) || LEARNING_PATHS[0];

  if (!activePath) {
    return null;
  }

  const completedForPath = learningPathState.pathProgress[activePath.id] || [];
  const completedCount = completedForPath.length;
  const nextStep = activePath.steps.find((step) => !learningPathState.isStepDone(activePath.id, step.id));
  const weeks = activePath.steps.reduce((groups, step) => {
    const bucket = groups.get(step.week) || [];
    bucket.push(step);
    groups.set(step.week, bucket);
    return groups;
  }, new Map());

  return (
    <div className="content-card learning-paths-card">
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
        <div>
          <h2 className="page-title mb-1">Learning Paths</h2>
          <p className="muted-copy mb-0">Use one guided schedule instead of reopening random sections whenever motivation drops.</p>
        </div>
        <span className="badge rounded-pill badge-danger-soft">Study system</span>
      </div>

      <div className="learning-path-grid">
        {LEARNING_PATHS.map((path) => {
          const complete = (learningPathState.pathProgress[path.id] || []).length;
          const percent = Math.round((complete / Math.max(1, path.steps.length)) * 100);
          return (
            <button
              type="button"
              key={path.id}
              className={`learning-path-summary ${path.id === activePath.id ? 'learning-path-summary-active' : ''}`}
              onClick={() => setActivePathId(path.id)}
            >
              <div className="d-flex justify-content-between align-items-start gap-2 mb-2">
                <span className="badge rounded-pill badge-soft">{path.badge}</span>
                <span className="learning-path-percent">{percent}%</span>
              </div>
              <h3 className="h5 mb-2">{path.title}</h3>
              <p className="muted-copy mb-3">{path.summary}</p>
              <div className="learning-path-summary-footer">
                <span>{path.durationLabel}</span>
                <span>{complete} / {path.steps.length} done</span>
              </div>
            </button>
          );
        })}
      </div>

      <div className="learning-path-detail">
        <div className="d-flex justify-content-between align-items-start flex-wrap gap-3 mb-3">
          <div>
            <div className="eyebrow mb-2">{activePath.durationLabel}</div>
            <h3 className="h4 mb-2">{activePath.title}</h3>
            <p className="muted-copy mb-2">{activePath.outcome}</p>
            <div className="learning-path-summary-footer">
              <span>{completedCount} / {activePath.steps.length} checkpoints complete</span>
              <span>{nextStep ? `Next: Day ${nextStep.day}` : 'Path complete'}</span>
            </div>
          </div>
          <div className="d-flex flex-wrap gap-2">
            {nextStep ? <a className="btn btn-dark btn-sm rounded-pill" href={nextStep.route}>Open Day {nextStep.day}</a> : null}
            <button type="button" className="btn btn-outline-dark btn-sm rounded-pill" onClick={() => learningPathState.resetPath(activePath.id)}>
              Reset Path
            </button>
          </div>
        </div>

        <div className="learning-week-list">
          {Array.from(weeks.entries()).map(([weekNumber, steps]) => (
            <div className="learning-week-card" key={`${activePath.id}-week-${weekNumber}`}>
              <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
                <h4 className="h6 mb-0">Week {weekNumber}</h4>
                <span className="badge rounded-pill badge-success-soft">
                  {steps.filter((step) => learningPathState.isStepDone(activePath.id, step.id)).length} / {steps.length} done
                </span>
              </div>
              <div className="learning-step-list">
                {steps.map((step) => {
                  const done = learningPathState.isStepDone(activePath.id, step.id);
                  return (
                    <div className={`learning-step-row ${done ? 'learning-step-row-done' : ''}`} key={step.id}>
                      <button
                        type="button"
                        className={`learning-step-toggle ${done ? 'learning-step-toggle-done' : ''}`}
                        onClick={() => learningPathState.toggleStep(activePath.id, step.id)}
                        aria-label={done ? `Mark day ${step.day} as not done` : `Mark day ${step.day} as done`}
                      >
                        {done ? <i className="bi bi-check-lg" /> : step.day}
                      </button>
                      <div className="learning-step-copy">
                        <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
                          <strong>{step.title}</strong>
                          <span className="badge rounded-pill badge-soft">{step.minutes} min</span>
                        </div>
                        <p className="muted-copy mb-0">{step.goal}</p>
                      </div>
                      <a className="btn btn-outline-dark btn-sm rounded-pill" href={step.route}>Open</a>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
