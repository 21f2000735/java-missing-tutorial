import { useEffect, useState } from 'react';
import { extractCodePreview, parseFrontmatter } from '../lib/content-helpers.js';

export function useRouteContent({ route, manifest, fetchText }) {
  const [content, setContent] = useState({ status: 'loading', data: null, error: '' });

  useEffect(() => {
    if (!manifest) {
      return;
    }

    let cancelled = false;

    async function load() {
      setContent({ status: 'loading', data: null, error: '' });

      try {
        if (route.type === 'home') {
          if (!cancelled) {
            setContent({ status: 'ready', data: { type: 'home' }, error: '' });
          }
          return;
        }

        if (route.type === 'progress') {
          if (!cancelled) {
            setContent({ status: 'ready', data: { type: 'progress' }, error: '' });
          }
          return;
        }

        if (route.type === 'interview-prep') {
          if (!cancelled) {
            setContent({ status: 'ready', data: { type: 'interview-prep' }, error: '' });
          }
          return;
        }

        if (route.type === 'resource') {
          const resource = manifest.resources.find((item) => item.slug === route.slug);
          if (!resource) {
            throw new Error(`Unknown resource: ${route.slug}`);
          }
          const raw = await fetchText(resource.contentPath);
          if (!cancelled) {
            setContent({ status: 'ready', data: { type: 'resource', resource, raw }, error: '' });
          }
          return;
        }

        const section = manifest.sections.find((item) => item.slug === route.sectionSlug);
        if (!section) {
          throw new Error(`Unknown section: ${route.sectionSlug}`);
        }

        if (route.type === 'section') {
          const raw = await fetchText(section.guide.contentPath);
          if (!cancelled) {
            setContent({ status: 'ready', data: { type: 'section', section, raw }, error: '' });
          }
          return;
        }

        const chapter = section.chapters.find((item) => item.slug === route.chapterSlug);
        if (!chapter) {
          throw new Error(`Unknown chapter: ${route.chapterSlug}`);
        }

        if (route.type === 'chapter') {
          const topicRequests = chapter.topics.flatMap((topic) => (
            topic.guide
              ? [fetchText(topic.contentPath), fetchText(topic.guide.contentPath)]
              : [fetchText(topic.contentPath)]
          ));

          const [guideRaw, revisionRaw, quizRaw, ...topicPayloads] = await Promise.all([
            fetchText(chapter.guide.contentPath),
            fetchText(chapter.revision.contentPath),
            chapter.quiz ? fetchText(chapter.quiz.contentPath).catch(() => '') : Promise.resolve(''),
            ...topicRequests
          ]);

          let pointer = 0;
          const topics = chapter.topics.map((topic) => {
            const raw = topicPayloads[pointer];
            pointer += 1;

            let lessonRaw = '';
            let lessonMeta = {};
            if (topic.guide) {
              const lesson = parseFrontmatter(topicPayloads[pointer]);
              lessonRaw = lesson.body;
              lessonMeta = lesson.meta;
              pointer += 1;
            }

            return {
              ...topic,
              raw,
              lessonRaw,
              lessonMeta,
              preview: extractCodePreview(raw)
            };
          });

          let quiz = null;
          if (quizRaw) {
            try {
              quiz = JSON.parse(quizRaw);
            } catch {
              quiz = null;
            }
          }

          if (!cancelled) {
            setContent({
              status: 'ready',
              data: {
                type: 'chapter',
                section,
                chapter: {
                  ...chapter,
                  topics,
                  quiz
                },
                guideRaw,
                revisionRaw
              },
              error: ''
            });
          }
          return;
        }

        const topic = chapter.topics.find((item) => item.slug === route.topicSlug);
        if (!topic) {
          throw new Error(`Unknown topic: ${route.topicSlug}`);
        }

        const topicRequests = [fetchText(topic.contentPath)];
        if (topic.guide) {
          topicRequests.push(fetchText(topic.guide.contentPath));
        }

        const [raw, lessonSource = ''] = await Promise.all(topicRequests);
        const lesson = parseFrontmatter(lessonSource);

        if (!cancelled) {
          setContent({
            status: 'ready',
            data: {
              type: 'topic',
              section,
              chapter,
              topic,
              raw,
              lessonRaw: lesson.body,
              lessonMeta: lesson.meta,
              preview: extractCodePreview(raw)
            },
            error: ''
          });
        }
      } catch (loadError) {
        if (!cancelled) {
          setContent({ status: 'error', data: null, error: loadError.message });
        }
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [fetchText, manifest, route]);

  return content;
}
