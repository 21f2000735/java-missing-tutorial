export function normalizeManifest(data) {
  const sourceToRoute = new Map();

  data.resources.forEach((resource) => {
    sourceToRoute.set(resource.sourcePath, `#resource/${resource.slug}`);
  });

  data.sections.forEach((section) => {
    sourceToRoute.set(section.guide.sourcePath, `#section/${section.slug}`);
    section.chapters.forEach((chapter) => {
      sourceToRoute.set(chapter.guide.sourcePath, `#chapter/${section.slug}/${chapter.slug}`);
      sourceToRoute.set(chapter.revision.sourcePath, `#chapter/${section.slug}/${chapter.slug}`);
      sourceToRoute.set(chapter.runChapter.sourcePath, `#chapter/${section.slug}/${chapter.slug}`);
      sourceToRoute.set(chapter.runAllTopics.sourcePath, `#chapter/${section.slug}/${chapter.slug}`);
      chapter.topics.forEach((topic) => {
        sourceToRoute.set(topic.sourcePath, `#topic/${section.slug}/${chapter.slug}/${topic.slug}`);
        if (topic.guide) {
          sourceToRoute.set(topic.guide.sourcePath, `#topic/${section.slug}/${chapter.slug}/${topic.slug}`);
        }
      });
    });
  });

  return { ...data, sourceToRoute };
}

export function buildSearchEntries(manifest) {
  if (!manifest) {
    return [];
  }

  const entries = [];
  manifest.resources.forEach((resource) => {
    entries.push({ label: resource.title, meta: 'Resource', route: `#resource/${resource.slug}` });
  });
  manifest.sections.forEach((section) => {
    entries.push({ label: section.title, meta: 'Section', route: `#section/${section.slug}` });
    section.chapters.forEach((chapter) => {
      entries.push({ label: chapter.title, meta: `${section.title} · Chapter`, route: `#chapter/${section.slug}/${chapter.slug}` });
      chapter.topics.forEach((topic) => {
        entries.push({
          label: topic.title,
          meta: `${chapter.title} · Topic`,
          route: `#topic/${section.slug}/${chapter.slug}/${topic.slug}`
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
