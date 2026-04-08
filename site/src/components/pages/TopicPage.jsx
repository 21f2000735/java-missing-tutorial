import { useState } from 'react';
import {
  bulletItems,
  effectiveRunner,
  extractTopicLessonFlow,
  firstNonEmpty,
  inferTopicMode,
  modePresentation,
  resolveVersionMeta,
  titleFromSlug,
  truncateText
} from '../../lib/content-helpers.js';
import { PLAYGROUND_LINKS } from '../../lib/site-data.js';
import { CodeBlock } from '../content/MarkdownContent.jsx';
import { BulletList, PageLayout } from '../common/AppChrome.jsx';

function submitToJdoodle(code) {
  const form = document.createElement('form');
  form.method = 'post';
  form.action = 'https://www.jdoodle.com/api/redirect-to-post/online-java-compiler';
  form.target = '_blank';
  form.style.display = 'none';

  const textarea = document.createElement('textarea');
  textarea.name = 'initScript';
  textarea.value = code;
  form.appendChild(textarea);

  document.body.appendChild(form);
  form.submit();
  document.body.removeChild(form);
}

function TopicActionButtons({ code, runner }) {
  const [copyState, setCopyState] = useState('idle');

  async function onCopy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopyState('copied');
      window.setTimeout(() => setCopyState('idle'), 1500);
    } catch {
      setCopyState('failed');
      window.setTimeout(() => setCopyState('idle'), 1500);
    }
  }

  return (
    <div className="topic-actions-minimal">
      <button className="topic-action-link" type="button" onClick={onCopy}>
        {copyState === 'copied' ? 'Copied' : copyState === 'failed' ? 'Copy failed' : 'Copy code'}
      </button>
      {runner === 'embedded' ? (
        <button className="topic-action-link" type="button" onClick={() => submitToJdoodle(code)}>
          Run in JDoodle
        </button>
      ) : (
        <a className="topic-action-link" href={PLAYGROUND_LINKS.jdoodle} target="_blank" rel="noreferrer">
          Open JDoodle
        </a>
      )}
      <a className="topic-action-link" href={PLAYGROUND_LINKS.onecompiler} target="_blank" rel="noreferrer">
        OneCompiler
      </a>
    </div>
  );
}

function TopicPager({ previousTopic, nextTopic, chapterRoute }) {
  return (
    <nav className="topic-nav" aria-label="Topic navigation">
      <a className={`topic-nav-link ${chapterRoute ? '' : 'is-disabled'}`} href={chapterRoute || '#'}>
        Back to chapter
      </a>
      <a className={`topic-nav-link ${previousTopic ? '' : 'is-disabled'}`} href={previousTopic?.route || '#'} aria-disabled={!previousTopic}>
        Previous topic
      </a>
      <a className={`topic-nav-link ${nextTopic ? '' : 'is-disabled'}`} href={nextTopic?.route || '#'} aria-disabled={!nextTopic}>
        Next topic
      </a>
    </nav>
  );
}

function compactBullets(section, fallback = []) {
  const items = bulletItems(section?.raw || '');
  return items.length ? items : fallback;
}

function ReadingSection({ title, children }) {
  return (
    <section className="reading-section">
      <h2>{title}</h2>
      {children}
    </section>
  );
}

export default function TopicPage({ data }) {
  const topicSummary = data.preview;
  const lessonFlow = extractTopicLessonFlow(data.lessonRaw);
  const topicRunner = effectiveRunner(topicSummary, data.lessonMeta);
  const versionMeta = resolveVersionMeta(data.section.slug, data.chapter.slug, data.lessonMeta, topicSummary);
  const lessonModeUi = modePresentation(inferTopicMode(data.section.slug, data.chapter.slug, data.lessonMeta));
  const conceptLabel = topicSummary.concept || data.topic.concept || titleFromSlug(data.topic.slug);
  const topicSummaryLine = firstNonEmpty(
    lessonFlow.concept?.plain,
    topicSummary.problem,
    topicSummary.realWorld,
    topicSummary.mentalModel,
    'Understand the pressure first, then jump into the Java code.'
  );
  const whyItMatters = firstNonEmpty(
    lessonFlow.whyItMatters?.plain,
    topicSummary.whyThisWorks,
    topicSummary.why,
    'The rule matters because it keeps the design correct when the assumption changes.'
  );
  const ruleSummary = firstNonEmpty(
    lessonFlow.rule?.plain,
    topicSummary.whyThisWorks,
    topicSummary.mentalModel,
    'Use the rule that keeps the code predictable when the assumption changes.'
  );
  const topicIndex = typeof data.topic.topicIndex === 'number' ? data.topic.topicIndex : data.chapter.topics.findIndex((item) => item.slug === data.topic.slug);
  const previousTopic = topicIndex > 0 ? data.chapter.topics[topicIndex - 1] : null;
  const nextTopic = topicIndex >= 0 && topicIndex < data.chapter.topics.length - 1 ? data.chapter.topics[topicIndex + 1] : null;

  const blocks = [
    {
      title: 'What happens',
      items: compactBullets(lessonFlow.whatHappens, ['Run the example and compare the output with the rule.'])
    },
    {
      title: 'What stays stable',
      items: compactBullets(lessonFlow.whatStaysStable, ['The core rule stays the same even when the input changes.'])
    },
    {
      title: 'What changes',
      items: compactBullets(lessonFlow.whatChanges, ['Change one assumption and see how the output changes.'])
    },
    {
      title: 'Why it matters',
      items: [whyItMatters]
    },
    {
      title: 'Rule',
      items: [`👉 Rule: ${ruleSummary}`]
    }
  ];

  const practiceItems = compactBullets(lessonFlow.tryThis, [
    'Replace the main assumption with a smaller one and rerun the file.',
    'Change one line and note what stays stable.',
    'Explain the result in one sentence before moving on.'
  ]);

  return (
    <PageLayout
      header={(
        <header className="topic-header">
          <div className="eyebrow mb-2">Topic</div>
          <h1 className="topic-title mb-2">{data.topic.title}</h1>
          <p className="topic-purpose mb-2">
            {truncateText(topicSummaryLine, 200)}
          </p>
          <p className="topic-meta mb-3">
            {data.section.title} · {data.chapter.title}
            {versionMeta.display ? ` · ${versionMeta.display}` : ''}
            {lessonModeUi.label ? ` · ${lessonModeUi.label}` : ''}
          </p>
          <TopicActionButtons code={data.raw} runner={topicRunner} />
        </header>
      )}
    >
      <div className="reading-page">
        <hr className="reading-divider" />

        <ReadingSection title={conceptLabel}>
          <CodeBlock code={data.raw} />
        </ReadingSection>

        {blocks.map((block) => (
          <div key={block.title}>
            <hr className="reading-divider" />
            <ReadingSection title={block.title}>
              <BulletList items={block.items} />
            </ReadingSection>
          </div>
        ))}

        <hr className="reading-divider" />
        <ReadingSection title="Practice">
          <BulletList items={practiceItems} />
        </ReadingSection>

        <hr className="reading-divider" />
        <TopicPager
          previousTopic={previousTopic}
          nextTopic={nextTopic}
          chapterRoute={`#chapter/${data.section.slug}/${data.chapter.slug}`}
        />
      </div>
    </PageLayout>
  );
}
