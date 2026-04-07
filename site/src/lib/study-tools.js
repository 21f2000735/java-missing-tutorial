export const DAY_MS = 24 * 60 * 60 * 1000;

export function flattenCompanyQuestions(parsed) {
  return parsed.companies.flatMap((company) => (
    company.questions.map((question, index) => ({
      id: `${company.profile.slug}-q${index + 1}`,
      company: company.name,
      companySlug: company.profile.slug,
      bucket: company.profile.bucket,
      focus: company.profile.focus,
      title: question.title,
      prompt: question.prompt.trim(),
      answer: question.answer.trim()
    }))
  ));
}

export function dayOfYear(date = new Date()) {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date - start;
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
}

export function formatShortDate(value) {
  return new Intl.DateTimeFormat(undefined, {
    month: 'short',
    day: 'numeric'
  }).format(new Date(value));
}

export function formatLongDate(value) {
  return new Intl.DateTimeFormat(undefined, {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  }).format(new Date(value));
}
