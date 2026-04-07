import fs from 'node:fs/promises';
import path from 'node:path';
import { marked } from 'marked';

const root = process.cwd();
const docsRoot = path.join(root, 'public');
const planningRoot = path.join(root, 'planning');

const pages = [
  { slug: 'ocjp-track', file: 'OCJP_TRACK.md', title: 'OCJP Track - Java Missing Tutorial' },
  { slug: 'interview-track', file: 'INTERVIEW_TRACK.md', title: 'Interview Track - Java Missing Tutorial' },
  { slug: 'modern-java-track', file: 'MODERN_JAVA_TRACK.md', title: 'Modern Java Track - Java Missing Tutorial' },
  { slug: 'java-7-to-25', file: 'JAVA_7_TO_25.md', title: 'Java 7 To 25 - Java Missing Tutorial' },
  { slug: 'java-migration-guides', file: 'JAVA_MIGRATION_GUIDES.md', title: 'Java Migration Guides - Java Missing Tutorial' },
  { slug: 'high-demand-java-topics', file: 'HIGH_DEMAND_JAVA_TOPICS.md', title: 'High Demand Java Topics - Java Missing Tutorial' },
  { slug: 'interview-problem-approach', file: 'INTERVIEW_PROBLEM_APPROACH.md', title: 'Interview Problem Approach - Java Missing Tutorial' },
  { slug: 'company-question-bank', file: 'COMPANY_QUESTION_BANK.md', title: 'Company Question Bank - Java Missing Tutorial' },
  { slug: 'compare-collections', file: 'COMPARE_COLLECTIONS.md', title: 'Compare Collections - Java Missing Tutorial' },
  { slug: 'compare-streams', file: 'COMPARE_STREAMS.md', title: 'Compare Streams - Java Missing Tutorial' },
  { slug: 'compare-concurrency', file: 'COMPARE_CONCURRENCY.md', title: 'Compare Concurrency - Java Missing Tutorial' }
];

const pageByFile = new Map(pages.map((page) => [page.file, page.slug]));
const topTopics = [
  { slug: 'list-set-map', section: 'sec02_collections', chapter: 'ch01_collections', topic: 'list_set_map', title: 'List, Set, Map' },
  { slug: 'stream-pipeline', section: 'sec04_streams_and_functional_style', chapter: 'ch01_streams', topic: 'stream_pipeline', title: 'Stream Pipeline' },
  { slug: 'collectors', section: 'sec04_streams_and_functional_style', chapter: 'ch01_streams', topic: 'collectors', title: 'Collectors' },
  { slug: 'threads', section: 'sec05_multithreading_and_concurrency', chapter: 'ch01_concurrency_basics', topic: 'threads', title: 'Threads' },
  { slug: 'virtual-threads', section: 'sec05_multithreading_and_concurrency', chapter: 'ch02_virtual_threads', topic: 'why_virtual_threads_matter', title: 'Why Virtual Threads Matter' },
  { slug: 'stack-heap-and-references', section: 'sec08_internal_of_jvm', chapter: 'ch01_memory_and_execution_basics', topic: 'understanding_stack_heap_and_references', title: 'Stack, Heap, And References' },
  { slug: 'handling-payment-failures', section: 'sec11_exception_handling', chapter: 'ch01_handling_errors', topic: 'handling_payment_failures', title: 'Handling Payment Failures' },
  { slug: 'http-client-basics', section: 'sec12_networking', chapter: 'ch01_http_client_basics', topic: 'building_requests_with_http_client', title: 'HTTP Client Basics' },
  { slug: 'arraylist-growth-and-lookup', section: 'sec20_data_structures_and_complexity', chapter: 'ch02_collections_internals_and_tradeoffs', topic: 'arraylist_growth_and_lookup', title: 'ArrayList Growth And Lookup' },
  { slug: 'hashmap-buckets-and-collisions', section: 'sec20_data_structures_and_complexity', chapter: 'ch02_collections_internals_and_tradeoffs', topic: 'hashmap_buckets_and_collisions', title: 'HashMap Buckets And Collisions' }
];

marked.setOptions({
  gfm: true,
  breaks: false,
  mangle: false,
  headerIds: false
});

const sharedStaticStyle = `
  :root{
    --bg:#f5efe3;--panel:#fffaf2;--panel-strong:#fff6ea;--text:#2d2418;--muted:#6d5a46;--line:rgba(54,43,28,.12);
    --accent:#8d4300;--accent-strong:#af5b0c;--shadow:0 18px 42px rgba(60,42,18,.08);--radius:1.35rem;
  }
  html[data-theme="dark"]{
    --bg:#161311;--panel:#1f1a15;--panel-strong:#26201a;--text:#efe4d2;--muted:#baa88e;--line:rgba(230,216,194,.12);
    --accent:#f1b26a;--accent-strong:#e29a4d;--shadow:0 18px 42px rgba(0,0,0,.28);
  }
  *{box-sizing:border-box}
  html{scroll-behavior:smooth}
  body{
    margin:0;
    font-family:"IBM Plex Sans",system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;
    background:
      radial-gradient(circle at top left, rgba(244,194,126,.22), transparent 28rem),
      radial-gradient(circle at 85% 10%, rgba(83,135,111,.12), transparent 22rem),
      linear-gradient(180deg,#fcf5eb 0%,#f3eadb 100%);
    color:var(--text);
  }
  html[data-theme="dark"] body{
    background:
      radial-gradient(circle at top left, rgba(131,87,39,.22), transparent 28rem),
      radial-gradient(circle at 85% 10%, rgba(58,106,87,.12), transparent 22rem),
      linear-gradient(180deg,#161311 0%,#191611 46%,#12100d 100%);
  }
  a{color:var(--accent-strong)}
  main{max-width:72rem;margin:0 auto;padding:2rem 1.25rem 4rem}
  .static-shell{display:grid;gap:1rem}
  .static-header,.panel{
    background:linear-gradient(180deg,rgba(255,252,247,.96),rgba(255,249,240,.9)),var(--panel);
    border:1px solid var(--line);border-radius:var(--radius);box-shadow:var(--shadow);
  }
  html[data-theme="dark"] .static-header,
  html[data-theme="dark"] .panel{
    background:linear-gradient(180deg,rgba(31,27,22,.96),rgba(27,23,19,.92)),var(--panel);
  }
  .static-header{padding:1.6rem 1.4rem}
  .panel{padding:1.4rem 1.25rem;min-width:0}
  .eyebrow{text-transform:uppercase;letter-spacing:.16em;font-size:.72rem;font-weight:700;color:var(--muted);margin:0 0 .7rem}
  h1,h2,h3{font-family:"Fraunces",Georgia,serif;line-height:1.08}
  h1{font-size:clamp(2rem,4vw,3rem);margin:.2rem 0 1rem}
  h2{margin-top:1.8rem}
  p,li{line-height:1.75}
  .toolbar,.nav{display:flex;flex-wrap:wrap;gap:.75rem}
  .toolbar{justify-content:space-between;align-items:center;margin-top:1rem}
  .nav a,.theme-toggle,.action-btn{
    display:inline-flex;align-items:center;gap:.45rem;border-radius:999px;padding:.72rem .98rem;text-decoration:none;
    background:rgba(255,255,255,.75);box-shadow:inset 0 0 0 1px rgba(49,40,29,.08);color:var(--text);border:0;font:inherit;cursor:pointer;
  }
  html[data-theme="dark"] .nav a,
  html[data-theme="dark"] .theme-toggle,
  html[data-theme="dark"] .action-btn{background:rgba(40,34,28,.86);box-shadow:inset 0 0 0 1px var(--line)}
  .action-btn-primary{background:rgba(141,67,0,.12);box-shadow:inset 0 0 0 1px rgba(141,67,0,.18)}
  html[data-theme="dark"] .action-btn-primary{background:rgba(241,178,106,.16);box-shadow:inset 0 0 0 1px rgba(241,178,106,.22)}
  .nav a:hover,.theme-toggle:hover,.action-btn:hover{transform:translateY(-1px)}
  .nav a:focus-visible,.theme-toggle:focus-visible,.back-link:focus-visible,.action-btn:focus-visible{outline:2px solid var(--accent-strong);outline-offset:3px}
  .layout{display:grid;grid-template-columns:minmax(0,1fr) minmax(18rem,24rem);gap:1rem}
  .code-title,.lead,.muted{color:var(--muted)}
  .code-cta{display:grid;gap:.85rem;padding:1rem;border:1px solid var(--line);border-radius:1rem;background:linear-gradient(165deg,rgba(255,250,244,.96),rgba(246,238,221,.88))}
  html[data-theme="dark"] .code-cta{background:linear-gradient(180deg,rgba(31,27,22,.96),rgba(27,23,19,.92)),var(--panel)}
  .code-actions{display:flex;flex-wrap:wrap;gap:.75rem}
  .code-status{margin:0;color:var(--muted);font-size:.95rem;min-height:1.4rem}
  img{display:block;width:min(100%,56rem);max-width:100%;height:auto;margin:1.2rem auto;border-radius:1.15rem;border:1px solid var(--line);background:var(--panel-strong);box-shadow:var(--shadow)}
  pre{overflow:auto;-webkit-overflow-scrolling:touch;background:#241d15;color:#fdf8f1;padding:1rem;border-radius:1rem;font-size:.92rem;line-height:1.55}
  html[data-theme="dark"] pre{background:#15110d;color:#f7eddc}
  code{font-family:"IBM Plex Mono",ui-monospace,SFMono-Regular,Menlo,monospace}
  table{width:100%;display:block;overflow-x:auto;-webkit-overflow-scrolling:touch;border-collapse:collapse;margin:1rem 0;border-radius:1rem}
  th,td{border:1px solid var(--line);padding:.8rem .85rem;vertical-align:top}
  th{background:rgba(175,91,12,.08)}
  blockquote{margin:1rem 0;padding:.95rem 1rem;border-left:4px solid rgba(58,106,87,.45);background:rgba(58,106,87,.08);border-radius:.9rem}
  .back-link{display:inline-flex;align-items:center;gap:.4rem;text-decoration:none;color:var(--muted)}
  .footer-note{margin-top:1rem;color:var(--muted);font-size:.95rem}
  @media (max-width: 900px){
    main{padding:1rem .85rem 2.5rem}
    .layout{grid-template-columns:1fr}
    .toolbar{align-items:stretch}
    .nav,.code-actions{width:100%}
    .nav a,.theme-toggle,.action-btn{width:100%;justify-content:center}
  }
  @media (max-width: 640px){
    .static-header,.panel{padding:1rem}
    h1{font-size:1.9rem}
    h2{font-size:1.35rem}
    th,td{min-width:8rem;padding:.65rem .7rem;font-size:.94rem}
    pre{padding:.85rem;font-size:.84rem}
  }
`;

const sharedStaticScript = `
  const key = 'java-book-theme';
  const root = document.documentElement;
  const toggle = document.getElementById('theme-toggle');
  function apply(theme){
    root.dataset.theme = theme;
    if(toggle) toggle.textContent = theme === 'dark' ? 'Light Mode' : 'Dark Mode';
  }
  const current = localStorage.getItem(key) || 'light';
  apply(current);
  if(toggle){
    toggle.addEventListener('click', () => {
      const next = (root.dataset.theme || 'light') === 'dark' ? 'light' : 'dark';
      localStorage.setItem(key, next);
      apply(next);
    });
  }
  const copyButton = document.getElementById('copy-code-btn');
  const copyStatus = document.getElementById('copy-code-status');
  const jdoodleButton = document.getElementById('open-jdoodle-btn');
  if(copyButton && window.__topicCode){
    copyButton.addEventListener('click', async () => {
      try{
        await navigator.clipboard.writeText(window.__topicCode);
        copyButton.textContent = 'Copied';
        if(copyStatus) copyStatus.textContent = 'Snippet copied. Paste it into your IDE or playground.';
      }catch{
        copyButton.textContent = 'Copy failed';
        if(copyStatus) copyStatus.textContent = 'Clipboard access failed. Use the raw Java file link instead.';
      }
      window.setTimeout(() => {
        copyButton.textContent = 'Copy Code Snippet';
      }, 1800);
    });
  }
  if(jdoodleButton && window.__topicCode){
    jdoodleButton.addEventListener('click', () => {
      const form = document.createElement('form');
      form.method = 'post';
      form.action = 'https://www.jdoodle.com/api/redirect-to-post/online-java-compiler';
      form.target = '_blank';
      const fields = {
        language: 'java',
        versionIndex: '5',
        code: window.__topicCode
      };
      Object.entries(fields).forEach(([name, value]) => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = name;
        input.value = value;
        form.appendChild(input);
      });
      document.body.appendChild(form);
      form.submit();
      document.body.removeChild(form);
    });
  }
`;

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function stripMarkdown(value) {
  return value
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/^\s*[-*+]\s+/gm, '')
    .replace(/^\s*\d+\.\s+/gm, '')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/\s+/g, ' ')
    .trim();
}

function rewriteLinks(html) {
  return html
    .replace(/href="README\.md"/g, 'href="../../index.html"')
    .replace(/href="([A-Z0-9_]+)\.md"/g, (_, slug) => {
      const file = `${slug}.md`;
      const generatedSlug = pageByFile.get(file);
      return generatedSlug
        ? `href="../${generatedSlug}/"`
        : `href="../../index.html#resource/${slug}"`;
    })
    .replace(/href="\.\.\/src\/main\/java\/com\/learning\/javamissing\/([^"]+)"/g, (_, relative) => `href="../../index.html#file/src/main/java/com/learning/javamissing/${relative}"`)
    .replace(/href="([^"]*SectionGuide\.md)"/g, (_, target) => `href="../../index.html#file/src/main/java/com/learning/javamissing/${target.replace('../src/main/java/com/learning/javamissing/', '')}"`);
}

function rewriteTopicGuideLinks(html, contentBase) {
  return html
    .replace(/src="\.\//g, `src="${contentBase}/`)
    .replace(/href="\.\//g, `href="${contentBase}/`)
    .replace(/href="([A-Z0-9_]+)\.md"/g, (_, slug) => {
      const file = `${slug}.md`;
      const generatedSlug = pageByFile.get(file);
      return generatedSlug
        ? `href="../../guides/${generatedSlug}/"`
        : `href="../../index.html#resource/${slug}"`;
    });
}

function firstParagraph(markdown) {
  const lines = markdown.split('\n').map((line) => line.trim());
  for (const line of lines) {
    if (!line || line.startsWith('#')) continue;
    return stripMarkdown(line);
  }
  return 'Practical Java learning with problem-first explanations and runnable examples.';
}

for (const page of pages) {
  const source = path.join(planningRoot, page.file);
  const markdown = await fs.readFile(source, 'utf8');
  const withoutTopHeading = markdown.replace(/^# .*\n+/, '');
  const htmlBody = rewriteLinks(marked.parse(withoutTopHeading));
  const description = escapeHtml(firstParagraph(markdown).slice(0, 180));
  const targetDir = path.join(docsRoot, 'guides', page.slug);
  await fs.mkdir(targetDir, { recursive: true });
  const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(page.title)}</title>
  <meta name="description" content="${description}">
  <link rel="canonical" href="https://21f2000735.github.io/java-missing-tutorial/guides/${page.slug}/">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600;9..144,700&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">
  <style>${sharedStaticStyle}</style>
</head>
<body>
  <main>
    <div class="static-shell">
      <section class="static-header">
        <p class="eyebrow">Static Guide</p>
        <h1>${escapeHtml(page.title.replace(' - Java Missing Tutorial', ''))}</h1>
        <p class="lead">A crawlable article view of this guide, with the same reading direction as the main app.</p>
        <div class="toolbar">
          <div class="nav">
            <a href="../../index.html">Open site home</a>
            <a href="../../index.html#resource/${path.basename(page.file, '.md')}">Open app version</a>
          </div>
          <button id="theme-toggle" class="theme-toggle" type="button">Dark Mode</button>
        </div>
      </section>
      <article class="panel">
        <a class="back-link" href="../../index.html#resource/${path.basename(page.file, '.md')}">← Back to interactive view</a>
        ${htmlBody}
        <p class="footer-note">Prefer the app version when you want search, bookmarks, progress, or random-topic navigation.</p>
      </article>
    </div>
  </main>
  <script>${sharedStaticScript}</script>
</body>
</html>`;
  await fs.writeFile(path.join(targetDir, 'index.html'), html);
}

for (const topicPage of topTopics) {
  const topicRoot = path.join(
    root,
    'src/main/java/com/learning/javamissing',
    topicPage.section,
    topicPage.chapter,
    'topics',
    topicPage.topic
  );
  const guidePath = path.join(topicRoot, 'TopicGuide.md');
  const javaFiles = (await fs.readdir(topicRoot)).filter((file) => file.endsWith('.java')).sort();
  if (javaFiles.length === 0) {
    continue;
  }
  const javaFile = javaFiles[0];
  const javaCode = await fs.readFile(path.join(topicRoot, javaFile), 'utf8');
  let guideHtml = '';
  let description = `${topicPage.title} with runnable Java examples and clear explanation.`;
  if (await fs.stat(guidePath).then(() => true).catch(() => false)) {
    const markdown = await fs.readFile(guidePath, 'utf8');
    const withoutFrontmatter = markdown.replace(/^---[\s\S]*?---\n+/, '');
    const withoutTopHeading = withoutFrontmatter.replace(/^# .*\n+/, '');
    guideHtml = rewriteTopicGuideLinks(
      marked.parse(withoutTopHeading),
      `../../content/library/${topicPage.section}/${topicPage.chapter}/topics/${topicPage.topic}`
    );
    description = escapeHtml(firstParagraph(withoutFrontmatter).slice(0, 180));
  }

  const targetDir = path.join(docsRoot, 'topics', topicPage.slug);
  await fs.mkdir(targetDir, { recursive: true });
  const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(topicPage.title)} - Java Missing Tutorial</title>
  <meta name="description" content="${description}">
  <link rel="canonical" href="https://21f2000735.github.io/java-missing-tutorial/topics/${topicPage.slug}/">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600;9..144,700&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">
  <style>${sharedStaticStyle}</style>
</head>
<body>
  <main>
    <div class="static-shell">
      <section class="static-header">
        <p class="eyebrow">Static Topic Page</p>
        <h1>${escapeHtml(topicPage.title)}</h1>
        <p class="lead">Read the explanation first, then compare it with the runnable Java example beside it.</p>
        <div class="toolbar">
          <div class="nav">
            <a href="../../index.html">Open site home</a>
            <a href="../../index.html#topic/${topicPage.section}/${topicPage.chapter}/${topicPage.topic}">Open app version</a>
            <a href="../../content/library/${topicPage.section}/${topicPage.chapter}/topics/${topicPage.topic}/${javaFile}">Open raw Java file</a>
          </div>
          <button id="theme-toggle" class="theme-toggle" type="button">Dark Mode</button>
        </div>
      </section>
      <div class="layout">
        <article class="panel">
          <a class="back-link" href="../../index.html#topic/${topicPage.section}/${topicPage.chapter}/${topicPage.topic}">← Back to interactive topic view</a>
          ${guideHtml || '<p>This topic is currently best viewed inside the app version.</p>'}
        </article>
        <aside class="panel">
          <p class="eyebrow">Runnable Example</p>
          <p class="code-title">${escapeHtml(javaFile)}</p>
          <div class="code-cta">
            <div>
              <p class="eyebrow">Copy Or Try This Code</p>
              <p class="muted">Understand the idea first, then copy the snippet or open it in JDoodle to try it immediately.</p>
            </div>
            <div class="code-actions">
              <button class="action-btn action-btn-primary" id="copy-code-btn" type="button">Copy Code Snippet</button>
              <button class="action-btn" id="open-jdoodle-btn" type="button">Open JDoodle</button>
              <a class="action-btn" href="../../index.html#topic/${topicPage.section}/${topicPage.chapter}/${topicPage.topic}#source-code">Open App Code View</a>
            </div>
            <p class="code-status" id="copy-code-status" aria-live="polite"></p>
          </div>
          <pre><code>${escapeHtml(javaCode)}</code></pre>
        </aside>
      </div>
    </div>
  </main>
  <script>window.__topicCode = ${JSON.stringify(javaCode)};</script>
  <script>${sharedStaticScript}</script>
</body>
</html>`;
  await fs.writeFile(path.join(targetDir, 'index.html'), html);
}
