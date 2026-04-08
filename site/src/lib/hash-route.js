export const HOME_HASH = '#home';
export const HOME_ROUTE = { type: 'home' };

export function parseHashRoute(hashValue = HOME_HASH) {
  const raw = decodeURIComponent(String(hashValue).replace(/^#/, '') || 'home');
  const [path, query = ''] = raw.split('?');
  const parts = path.split('/').filter(Boolean);
  const params = new URLSearchParams(query);
  const band = params.get('band');
  const company = params.get('company');
  const topic = params.get('topic');
  const frequency = params.get('frequency');

  if (!parts.length || parts[0] === 'home') {
    return HOME_ROUTE;
  }
  if (parts[0] === 'progress') {
    return { type: 'progress' };
  }
  if (parts[0] === 'interview-prep' || parts[0] === 'interview-hub') {
    return {
      type: 'interview-hub',
      band,
      company,
      topic,
      frequency
    };
  }
  if (parts[0] === 'resource' && parts[1]) {
    return { type: 'resource', slug: parts[1] };
  }
  if (parts[0] === 'section' && parts[1]) {
    return { type: 'section', sectionSlug: parts[1] };
  }
  if (parts[0] === 'chapter' && parts[1] && parts[2]) {
    return { type: 'chapter', sectionSlug: parts[1], chapterSlug: parts[2] };
  }
  if (parts[0] === 'topic' && parts[1] && parts[2] && parts[3]) {
    return { type: 'topic', sectionSlug: parts[1], chapterSlug: parts[2], topicSlug: parts[3] };
  }
  return HOME_ROUTE;
}

export function routeToHash(route) {
  if (!route || route.type === 'home') {
    return HOME_HASH;
  }
  if (route.type === 'progress') {
    return '#progress';
  }
  if (route.type === 'interview-prep' || route.type === 'interview-hub') {
    const params = new URLSearchParams();
    if (route.band) {
      params.set('band', String(route.band));
    }
    if (route.company) {
      params.set('company', route.company);
    }
    if (route.topic) {
      params.set('topic', route.topic);
    }
    if (route.frequency) {
      params.set('frequency', route.frequency);
    }
    const query = params.toString();
    return query ? `#interview-hub?${query}` : '#interview-hub';
  }
  if (route.type === 'resource') {
    return `#resource/${route.slug}`;
  }
  if (route.type === 'section') {
    return `#section/${route.sectionSlug}`;
  }
  if (route.type === 'chapter') {
    return `#chapter/${route.sectionSlug}/${route.chapterSlug}`;
  }
  if (route.type === 'topic') {
    return `#topic/${route.sectionSlug}/${route.chapterSlug}/${route.topicSlug}`;
  }
  return HOME_HASH;
}
