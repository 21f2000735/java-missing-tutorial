export function normalizeManifest(data) {
  const sourceToRoute = new Map();
  const chapterOrder = [];
  const routeToChapter = new Map();

  data.resources.forEach((resource) => {
    sourceToRoute.set(resource.sourcePath, `#resource/${resource.slug}`);
  });

  const sections = data.sections.map((section) => {
    sourceToRoute.set(section.guide.sourcePath, `#section/${section.slug}`);
    const chapters = section.chapters.map((chapter, chapterIndex) => {
      const route = `#chapter/${section.slug}/${chapter.slug}`;
      sourceToRoute.set(chapter.guide.sourcePath, route);
      sourceToRoute.set(chapter.revision.sourcePath, route);
      sourceToRoute.set(chapter.runChapter.sourcePath, route);
      sourceToRoute.set(chapter.runAllTopics.sourcePath, route);
      const topics = chapter.topics.map((topic, topicIndex) => {
        const topicRoute = `#topic/${section.slug}/${chapter.slug}/${topic.slug}`;
        sourceToRoute.set(topic.sourcePath, topicRoute);
        if (topic.guide) {
          sourceToRoute.set(topic.guide.sourcePath, topicRoute);
        }
        return {
          ...topic,
          route: topicRoute,
          sectionSlug: section.slug,
          chapterSlug: chapter.slug,
          topicIndex
        };
      });
      const normalizedChapter = {
        ...chapter,
        route,
        sectionSlug: section.slug,
        chapterIndex,
        topics
      };
      chapterOrder.push(normalizedChapter);
      routeToChapter.set(route, normalizedChapter);
      return normalizedChapter;
    });
    return { ...section, chapters };
  });

  return { ...data, sections, sourceToRoute, chapterOrder, routeToChapter };
}

export function buildSearchEntries(manifest) {
  if (!manifest) {
    return [];
  }

  const entries = [];
  manifest.resources.forEach((resource) => {
    entries.push({
      label: resource.title,
      meta: 'Resource',
      route: `#resource/${resource.slug}`,
      snippet: `Reference page: ${resource.title}`
    });
  });
  entries.push({
    label: 'Interview Prep',
    meta: 'Company Interview Q&A',
    route: '#interview-prep',
    snippet: 'Browse company interview questions by company, topic, and level.'
  });
  manifest.sections.forEach((section) => {
    entries.push({
      label: section.title,
      meta: 'Section',
      route: `#section/${section.slug}`,
      snippet: `Section overview for ${section.title}`
    });
    section.chapters.forEach((chapter) => {
      entries.push({
        label: chapter.title,
        meta: `${section.title} · Chapter`,
        route: `#chapter/${section.slug}/${chapter.slug}`,
        snippet: `${section.title} chapter with ${chapter.topics.length} topic${chapter.topics.length === 1 ? '' : 's'}`
      });
      chapter.topics.forEach((topic) => {
        entries.push({
          label: topic.title,
          meta: `${section.title} · ${chapter.title}`,
          route: `#topic/${section.slug}/${chapter.slug}/${topic.slug}`,
          snippet: topic.concept
            ? `${topic.concept} topic in ${chapter.title}`
            : `${topic.title} topic in ${chapter.title}`
        });
      });
    });
  });
  return entries;
}

export function collectTopicRoutes(manifest) {
  if (!manifest) {
    return [];
  }

  const topics = [];
  manifest.sections.forEach((section) => {
    section.chapters.forEach((chapter) => {
      chapter.topics.forEach((topic) => {
        topics.push(`#topic/${section.slug}/${chapter.slug}/${topic.slug}`);
      });
    });
  });
  return topics;
}

export function collectChapterRoutes(manifest) {
  if (!manifest) {
    return [];
  }
  return manifest.chapterOrder.map((chapter) => chapter.route);
}

export function resolveRouteMetadata({
  manifest,
  route,
  sectionProfiles,
  siteTitle,
  siteDescription,
  resourceSummaryFromSlug
}) {
  const defaultMetadata = {
    title: `${siteTitle} - Learn Java 7 to 25 with Real Examples`,
    description: siteDescription
  };

  if (!manifest || route.type === 'home') {
    return defaultMetadata;
  }

  if (route.type === 'progress') {
    return {
      title: `My Progress | ${siteTitle}`,
      description: 'Track chapter completion and quiz scores across the Java interview and certification book.'
    };
  }

  if (route.type === 'interview-prep') {
    return {
      title: `Interview Prep | ${siteTitle}`,
      description: 'Browse company interview questions by company, topic, and level.'
    };
  }

  if (route.type === 'resource') {
    const resource = manifest.resources.find((item) => item.slug === route.slug);
    return {
      title: `${resource?.title || 'Resource'} | ${siteTitle}`,
      description: resourceSummaryFromSlug(route.slug)
    };
  }

  const section = manifest.sections.find((item) => item.slug === route.sectionSlug);
  if (!section) {
    return { title: siteTitle, description: siteDescription };
  }

  if (route.type === 'section') {
    return {
      title: `${section.title} | ${siteTitle}`,
      description: sectionProfiles[section.slug]?.hook || `${section.title} section of the Java learning book.`
    };
  }

  const chapter = section.chapters.find((item) => item.slug === route.chapterSlug);
  if (!chapter) {
    return {
      title: `${section.title} | ${siteTitle}`,
      description: sectionProfiles[section.slug]?.hook || siteDescription
    };
  }

  if (route.type === 'chapter') {
    return {
      title: `${chapter.title} | ${siteTitle}`,
      description: `${chapter.title} in ${section.title}. Runnable Java examples, guide, and revision notes.`
    };
  }

  const topic = chapter.topics.find((item) => item.slug === route.topicSlug);
  return {
    title: `${topic?.title || chapter.title} | ${siteTitle}`,
    description: `${topic?.title || chapter.title} in ${chapter.title}. Learn the concept through real-world Java examples and guided explanations.`
  };
}
