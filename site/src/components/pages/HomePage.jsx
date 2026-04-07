import { useEffect, useState } from 'react';
import { flattenCompanyQuestions } from '../../lib/study-tools.js';
import { parseCompanyQuestionBank } from '../../lib/content-helpers.js';
import { HIGH_DEMAND_TOPICS, RESOURCE_DESCRIPTIONS, SECTION_PROFILES } from '../../lib/site-data.js';
import { BulletList } from '../common/AppChrome.jsx';
import LearningPathsBoard from '../study/LearningPathsBoard.jsx';
import DailyChallengeCard from '../study/DailyChallengeCard.jsx';

export default function HomePage({ manifest, fetchText, learningPathState }) {
  const [challengeQuestions, setChallengeQuestions] = useState([]);

  useEffect(() => {
    let cancelled = false;

    async function loadChallengeQuestions() {
      const questionResource = manifest.resources.find((resource) => resource.slug === 'COMPANY_QUESTION_BANK');
      if (!questionResource) {
        return;
      }
      try {
        const raw = await fetchText(questionResource.contentPath);
        if (!cancelled) {
          setChallengeQuestions(flattenCompanyQuestions(parseCompanyQuestionBank(raw)));
        }
      } catch {
        if (!cancelled) {
          setChallengeQuestions([]);
        }
      }
    }

    loadChallengeQuestions();
    return () => {
      cancelled = true;
    };
  }, [manifest, fetchText]);

  const featuredSections = manifest.sections.filter((section) => (
    ['sec02_collections', 'sec04_streams_and_functional_style', 'sec05_multithreading_and_concurrency', 'sec08_internal_of_jvm', 'sec21_company_interview_tracks']
      .includes(section.slug)
  ));
  const sectionCounts = {
    interview: featuredSections.reduce((total, section) => total + section.chapters.reduce((count, chapter) => count + chapter.topics.length, 0), 0),
    visual: manifest.sections
      .filter((section) => ['sec02_collections', 'sec04_streams_and_functional_style', 'sec05_multithreading_and_concurrency', 'sec08_internal_of_jvm'].includes(section.slug))
      .reduce((total, section) => total + section.chapters.length, 0)
  };

  const primaryJourneys = [
    { title: 'Interview Track', resourceSlug: 'INTERVIEW_TRACK', label: 'Primary Path', icon: 'bi bi-buildings' },
    { title: 'Interview Index', resourceSlug: 'INTERVIEW_INDEX', label: 'Fast Lookup', icon: 'bi bi-grid-1x2' },
    { title: 'Problem Approach', resourceSlug: 'INTERVIEW_PROBLEM_APPROACH', label: 'Answer Better', icon: 'bi bi-diagram-3' },
    { title: 'Company Question Bank', resourceSlug: 'COMPANY_QUESTION_BANK', label: 'Company Prep', icon: 'bi bi-bank' }
  ].map((item) => ({ ...item, resource: manifest.resources.find((resource) => resource.slug === item.resourceSlug) })).filter((item) => item.resource);

  const secondaryJourneys = [
    { title: 'High-Demand Topics', resourceSlug: 'HIGH_DEMAND_JAVA_TOPICS', label: 'Core Topics', icon: 'bi bi-lightning-charge' },
    { title: 'OCJP Track', resourceSlug: 'OCJP_TRACK', label: 'Certification Path', icon: 'bi bi-mortarboard' },
    { title: 'Java 7 To 25', resourceSlug: 'JAVA_7_TO_25', label: 'Version Revision', icon: 'bi bi-clock-history' }
  ].map((item) => ({ ...item, resource: manifest.resources.find((resource) => resource.slug === item.resourceSlug) })).filter((item) => item.resource);

  const roadmapSteps = [
    { step: '01', title: 'Start on the track', description: 'Use one sequence instead of opening random sections and hoping they connect.', route: '#resource/INTERVIEW_TRACK', badge: 'Order first' },
    { step: '02', title: 'Lock the core battlefields', description: 'Collections, streams, concurrency, and JVM internals should become explainable, not just recognizable.', route: '#resource/HIGH_DEMAND_JAVA_TOPICS', badge: 'Interview core' },
    { step: '03', title: 'Practice answer pressure', description: 'Use the problem approach and company bank to rehearse tradeoffs, follow-ups, and implementation choices.', route: '#resource/INTERVIEW_PROBLEM_APPROACH', badge: 'Answer better' },
    { step: '04', title: 'Use certification as revision', description: 'Bring in Java 25 and OCJP-style revision after the interview path is stable, not before.', route: '#resource/OCJP_TRACK', badge: 'Secondary path' }
  ];

  const weeklySprints = [
    {
      title: '3-day reset',
      summary: 'When you are lost, restart with interview index, collections choice, stream pipeline, and one company question.',
      links: [
        { label: 'Interview Index', href: '#resource/INTERVIEW_INDEX' },
        { label: 'List, Set, Map', href: './topics/list-set-map/' },
        { label: 'Company Bank', href: '#resource/COMPANY_QUESTION_BANK' }
      ]
    },
    {
      title: '1-week interview sprint',
      summary: 'Use one week to rebuild answer confidence around data structures, transformation, concurrency, and JVM basics.',
      links: [
        { label: 'High-Demand Topics', href: '#resource/HIGH_DEMAND_JAVA_TOPICS' },
        { label: 'Streams', href: '#section/sec04_streams_and_functional_style' },
        { label: 'Concurrency', href: '#section/sec05_multithreading_and_concurrency' }
      ]
    },
    {
      title: 'Java 25 revision pass',
      summary: 'After the interview layer feels stable, use certification and release guides for sharper revision and feature mapping.',
      links: [
        { label: 'OCJP Track', href: '#resource/OCJP_TRACK' },
        { label: 'Java 7 To 25', href: '#resource/JAVA_7_TO_25' },
        { label: 'Modern Java Track', href: '#resource/MODERN_JAVA_TRACK' }
      ]
    }
  ];

  const visualFocusTopics = [
    { title: 'Stack, Heap, and References', route: './topics/stack-heap-and-references/', note: 'Use diagrams to see object lifetime, reference flow, and why mutation surprises happen.' },
    { title: 'Threads', route: './topics/threads/', note: 'Follow request flow, scheduling, and shared-state hazards before reading synchronization code.' },
    { title: 'Stream Pipeline', route: './topics/stream-pipeline/', note: 'See filter-map-collect stages visually, then map them to the Java code path.' },
    { title: 'List, Set, Map', route: './topics/list-set-map/', note: 'Understand data shape first: duplicates, order, and lookup pressure become obvious in a visual compare.' }
  ];

  return (
    <>
      <section className="landing-stage mb-4">
        <div className="landing-stage-grid">
          <div className="hero-panel hero-home landing-hero">
            <div className="landing-chip-row mb-3">
              <span className="landing-chip landing-chip-primary">Interview-first</span>
              <span className="landing-chip">Java 25 aware</span>
              <span className="landing-chip">Visual learning</span>
            </div>
            <p className="eyebrow mb-2">Structured Java Prep</p>
            <h1 className="display-title landing-title">Build interview answers that are quick to find, easy to trust, and hard to forget.</h1>
            <p className="display-subtitle mb-4 landing-subtitle">
              The site is now organized like an interview system: one track to follow, one quick index to restart from,
              one answer pattern to practice, and core Java topics explained through pressure, diagrams, and runnable code.
            </p>
            <div className="landing-actions">
              <a className="btn btn-dark rounded-pill px-4" href="#resource/INTERVIEW_TRACK">Start Interview Track</a>
              <a className="btn btn-outline-dark rounded-pill px-4" href="#resource/INTERVIEW_INDEX">Open Quick Index</a>
              <a className="btn btn-outline-dark rounded-pill px-4" href="#resource/INTERVIEW_PROBLEM_APPROACH">Practice Answers</a>
            </div>
            <div className="landing-signal-bar">
              <div><div className="landing-signal-number">{sectionCounts.interview}</div><div className="landing-signal-label">core interview topics</div></div>
              <div><div className="landing-signal-number">{manifest.stats.chapters}</div><div className="landing-signal-label">chapters to sequence</div></div>
              <div><div className="landing-signal-number">{manifest.stats.topics}</div><div className="landing-signal-label">runnable examples</div></div>
            </div>
          </div>

          <div className="landing-right-rail">
            <div className="landing-radar-card">
              <div className="eyebrow mb-2">What changes here</div>
              <h2 className="h4 mb-3">The homepage should feel like an operating board, not a markdown dump.</h2>
              <div className="landing-radar-grid">
                <div className="landing-radar-node"><span className="landing-radar-kicker">Find fast</span><strong>Interview index and topic lanes sit above everything else.</strong></div>
                <div className="landing-radar-node"><span className="landing-radar-kicker">Learn visually</span><strong>Internals are explained with diagrams before code wherever that is the real blocker.</strong></div>
                <div className="landing-radar-node"><span className="landing-radar-kicker">Answer better</span><strong>Every strong topic should prepare you for follow-ups, not just syntax recall.</strong></div>
              </div>
            </div>

            <div className="landing-metric-stack">
              <div className="landing-metric-card"><span className="eyebrow">Primary motion</span><strong>Track first. Topic second. Company pressure after that.</strong></div>
              <div className="landing-metric-card"><span className="eyebrow">Visual sweep</span><strong>{sectionCounts.visual} chapter areas are good candidates for picture-first explanation.</strong></div>
            </div>
          </div>
        </div>
      </section>

      <div className="landing-two-column mb-4">
        <LearningPathsBoard learningPathState={learningPathState} />
        <DailyChallengeCard questions={challengeQuestions} />
      </div>

      <div className="content-card landing-roadmap-card">
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
          <h2 className="page-title mb-0">Interview Operating System</h2>
          <span className="badge rounded-pill badge-danger-soft">Use this order</span>
        </div>
        <div className="landing-roadmap-grid">
          {roadmapSteps.map((step) => (
            <a className="landing-roadmap-step text-decoration-none text-reset" href={step.route} key={step.step}>
              <div className="landing-roadmap-topline"><span className="landing-roadmap-number">{step.step}</span><span className="badge rounded-pill badge-soft">{step.badge}</span></div>
              <h3 className="h5 mb-2">{step.title}</h3>
              <p className="muted-copy mb-0">{step.description}</p>
            </a>
          ))}
        </div>
      </div>

      <div className="content-card landing-lanes-card">
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
          <h2 className="page-title mb-0">Fast Lanes</h2>
          <span className="badge rounded-pill badge-danger-soft">Primary entry</span>
        </div>
        <div className="landing-lanes-grid">
          {primaryJourneys.map(({ title, resource, label, icon }) => (
            <a className="journey-card landing-lane text-decoration-none text-reset" href={`#resource/${resource.slug}`} key={resource.slug}>
              <div className="d-flex align-items-center gap-2 mb-2 landing-lane-topline"><i className={`${icon} section-icon`} /><span className="badge rounded-pill badge-danger-soft">{label}</span></div>
              <h3 className="h5 mb-2">{title}</h3>
              <p className="muted-copy mb-3">{RESOURCE_DESCRIPTIONS[resource.slug]}</p>
              <BulletList items={
                resource.slug === 'INTERVIEW_TRACK'
                  ? ['Use a deliberate study order', 'Match sections to interview pressure', 'Move from concept to answer language']
                  : resource.slug === 'INTERVIEW_INDEX'
                    ? ['Jump straight to topic lookup', 'Use it as a restart point when lost', 'Find short study sprints fast']
                    : resource.slug === 'INTERVIEW_PROBLEM_APPROACH'
                      ? ['Structure coding and backend answers', 'Avoid random solving under pressure', 'Practice stronger follow-up responses']
                      : ['Filter by company and focus area', 'Practice original question-answer pairs', 'Jump into the linked Java sections after each answer']
              } />
            </a>
          ))}
        </div>
      </div>

      <div className="content-card landing-core-card">
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
          <h2 className="page-title mb-0">Core Battlegrounds</h2>
          <span className="badge rounded-pill badge-success-soft">Shared core</span>
        </div>
        <div className="section-grid landing-battleground-grid">
          {featuredSections.map((section) => {
            const profile = SECTION_PROFILES[section.slug] || {};
            return (
              <a className="chapter-card section-spotlight landing-battleground text-decoration-none text-reset" href={`#section/${section.slug}`} key={section.slug}>
                <div className="d-flex justify-content-between align-items-start gap-3 mb-3">
                  <span className="badge rounded-pill badge-soft">{section.slug}</span>
                  <small className="text-muted">{section.chapters.length} chapter{section.chapters.length === 1 ? '' : 's'}</small>
                </div>
                <h3 className="h5 mb-2">{section.title}</h3>
                <p className="muted-copy mb-3">{profile.hook || 'Open the section guide and chapter roadmap.'}</p>
                <BulletList items={profile.problems?.slice(0, 3) || section.chapters.slice(0, 3).map((chapter) => chapter.title)} />
              </a>
            );
          })}
        </div>
      </div>

      <div className="landing-two-column">
        <div className="content-card landing-visual-card">
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
            <h2 className="page-title mb-0">Visual-First Learning</h2>
            <a className="badge rounded-pill badge-soft text-decoration-none" href="#resource/VISUAL_LESSON_STANDARD">See the standard</a>
          </div>
          <p className="muted-copy landing-section-intro">For JVM internals, thread flow, stream mechanics, and collection tradeoffs, diagrams should explain the shape before code explains the API.</p>
          <div className="landing-visual-grid">
            {visualFocusTopics.map((topic) => (
              <a className="landing-visual-topic text-decoration-none text-reset" href={topic.route} key={topic.route}>
                <h3 className="h6 mb-2">{topic.title}</h3>
                <p className="muted-copy mb-0">{topic.note}</p>
              </a>
            ))}
          </div>
        </div>

        <div className="content-card landing-sprint-card">
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
            <h2 className="page-title mb-0">Quick Sprints</h2>
            <span className="badge rounded-pill badge-warning-soft">Restart fast</span>
          </div>
          <div className="landing-sprint-list">
            {weeklySprints.map((sprint) => (
              <div className="landing-sprint-item" key={sprint.title}>
                <h3 className="h6 mb-2">{sprint.title}</h3>
                <p className="muted-copy mb-3">{sprint.summary}</p>
                <div className="landing-sprint-links">
                  {sprint.links.map((link) => (
                    <a key={`${sprint.title}-${link.label}`} href={link.href}>{link.label}</a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="content-card">
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
          <h2 className="page-title mb-0">Most Asked Java Topics</h2>
          <a className="badge rounded-pill badge-soft text-decoration-none" href="#resource/HIGH_DEMAND_JAVA_TOPICS">See why these matter</a>
        </div>
        <div className="topic-grid landing-topic-grid">
          {HIGH_DEMAND_TOPICS.map((topic) => (
            <a className="topic-card topic-teaser text-decoration-none text-reset" href={topic.route} key={topic.route}>
              <h3 className="h5 mb-2">{topic.title}</h3>
              <p className="muted-copy mb-0">{topic.why}</p>
            </a>
          ))}
        </div>
      </div>

      <div className="content-card">
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
          <h2 className="page-title mb-0">Certification And Version Follow-Up</h2>
          <span className="badge rounded-pill badge-warning-soft">Secondary path</span>
        </div>
        <div className="journey-grid">
          {secondaryJourneys.map(({ title, resource, label, icon }) => (
            <a className="journey-card text-decoration-none text-reset" href={`#resource/${resource.slug}`} key={resource.slug}>
              <div className="d-flex align-items-center gap-2 mb-2"><i className={`${icon} section-icon`} /><span className="badge rounded-pill badge-warning-soft">{label}</span></div>
              <h3 className="h5 mb-2">{title}</h3>
              <p className="muted-copy mb-3">{RESOURCE_DESCRIPTIONS[resource.slug]}</p>
              <BulletList items={
                resource.slug === 'OCJP_TRACK'
                  ? ['Revise exam-heavy Java areas in order', 'Use after core interview topics feel stable', 'Keep runnable examples attached to revision']
                  : resource.slug === 'HIGH_DEMAND_JAVA_TOPICS'
                    ? ['Use as a drill list for repeated weak areas', 'Connect search-heavy topics to runnable code', 'Prioritize sections interviewers ask most']
                    : ['See what changed across Java releases', 'Support Java 25 revision with historical context', 'Use migration notes after topic-level understanding']
              } />
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
