export const HOME_HASH = '#home';
export const HOME_ROUTE = { type: 'home' };

export function parseHashRoute(hashValue = HOME_HASH) {
  const hash = decodeURIComponent(String(hashValue).replace(/^#/, '') || 'home');
  const parts = hash.split('/').filter(Boolean);

  if (!parts.length || parts[0] === 'home') {
    return HOME_ROUTE;
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
