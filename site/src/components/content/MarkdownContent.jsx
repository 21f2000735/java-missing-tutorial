'use client';

import { useEffect, useRef, useState } from 'react';
import { marked } from 'marked';
import {
  resolveRelativeContentPath,
  sourcePathFromHref,
  sourcePathToContentPath
} from '../../lib/content-helpers.js';

let prismLoader;
let mermaidLoader;

async function loadPrism() {
  if (!prismLoader) {
    prismLoader = import('prismjs').then(async (module) => {
      await import('prismjs/components/prism-java');
      return module.default || module;
    });
  }
  return prismLoader;
}

async function loadMermaid() {
  if (!mermaidLoader) {
    mermaidLoader = import('mermaid').then((module) => {
      const mermaid = module.default || module;
      mermaid.initialize({
        startOnLoad: false,
        securityLevel: 'loose'
      });
      return mermaid;
    });
  }
  return mermaidLoader;
}

async function copyTextToClipboard(value) {
  if (navigator?.clipboard?.writeText) {
    await navigator.clipboard.writeText(value);
    return;
  }

  const textArea = document.createElement('textarea');
  textArea.value = value;
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand('copy');
  textArea.remove();
}

function codeVariantFromText(value = '') {
  const firstLine = String(value).split('\n')[0].trim().toUpperCase();
  if (firstLine === '// BAD') {
    return 'bad';
  }
  if (firstLine === '// GOOD') {
    return 'good';
  }
  return '';
}

function stripCodeVariantMarker(value = '') {
  return String(value).replace(/^\/\/\s*(?:BAD|GOOD)\s*\n?/i, '');
}

function transformBadGoodCodeDiffs(root) {
  Array.from(root.querySelectorAll('pre')).forEach((pre) => {
    if (!pre.parentElement || pre.parentElement.classList.contains('code-diff-panel')) {
      return;
    }

    const code = pre.querySelector('code');
    if (!code || codeVariantFromText(code.textContent) !== 'bad') {
      return;
    }

    const next = pre.nextElementSibling;
    if (!next || next.tagName !== 'PRE') {
      return;
    }

    const nextCode = next.querySelector('code');
    if (!nextCode || codeVariantFromText(nextCode.textContent) !== 'good') {
      return;
    }

    code.textContent = stripCodeVariantMarker(code.textContent);
    nextCode.textContent = stripCodeVariantMarker(nextCode.textContent);

    const container = document.createElement('div');
    container.className = 'code-diff-grid';

    const badPanel = document.createElement('div');
    badPanel.className = 'code-diff-panel code-diff-bad';
    const badBadge = document.createElement('span');
    badBadge.className = 'badge text-bg-danger code-diff-badge';
    badBadge.textContent = 'Avoid this';
    badPanel.appendChild(badBadge);
    badPanel.appendChild(pre);

    const goodPanel = document.createElement('div');
    goodPanel.className = 'code-diff-panel code-diff-good';
    const goodBadge = document.createElement('span');
    goodBadge.className = 'badge text-bg-success code-diff-badge';
    goodBadge.textContent = 'Do this instead';
    goodPanel.appendChild(goodBadge);
    goodPanel.appendChild(next);

    pre.replaceWith(container);
    container.appendChild(badPanel);
    container.appendChild(goodPanel);
  });
}

function attachCopyButtons(root) {
  root.querySelectorAll('pre').forEach((pre) => {
    if (pre.parentElement?.classList.contains('markdown-code-shell')) {
      return;
    }

    const shell = document.createElement('div');
    shell.className = 'markdown-code-shell';
    pre.replaceWith(shell);
    shell.appendChild(pre);

    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'btn btn-sm btn-outline-dark code-copy-button';
    button.textContent = 'Copy';
    button.addEventListener('click', async () => {
      const code = pre.querySelector('code');
      if (!code) {
        return;
      }
      await copyTextToClipboard(code.textContent || '');
      button.textContent = 'Copied!';
      window.setTimeout(() => {
        button.textContent = 'Copy';
      }, 2000);
    });
    shell.appendChild(button);
  });
}

function MarkdownBlock({ html, manifest, contentPath }) {
  const ref = useRef(null);

  useEffect(() => {
    let cancelled = false;

    async function enhanceBlock() {
      if (!ref.current) {
        return;
      }

      ref.current.querySelectorAll('a[href]').forEach((anchor) => {
        const href = anchor.getAttribute('href');
        const sourcePath = sourcePathFromHref(href, manifest.repoRoot);
        if (!sourcePath) {
          const relativeContentPath = resolveRelativeContentPath(href, contentPath);
          if (relativeContentPath) {
            anchor.setAttribute('href', relativeContentPath);
            anchor.setAttribute('target', '_blank');
            anchor.setAttribute('rel', 'noreferrer');
            return;
          }
          if (/^https?:\/\//.test(href)) {
            anchor.target = '_blank';
            anchor.rel = 'noreferrer';
          }
          return;
        }
        if (manifest.sourceToRoute.has(sourcePath)) {
          anchor.setAttribute('href', manifest.sourceToRoute.get(sourcePath));
        } else {
          const nextContentPath = sourcePathToContentPath(sourcePath);
          if (nextContentPath) {
            anchor.setAttribute('href', nextContentPath);
            anchor.setAttribute('target', '_blank');
            anchor.setAttribute('rel', 'noreferrer');
          }
        }
      });

      ref.current.querySelectorAll('img[src]').forEach((image) => {
        const src = image.getAttribute('src');
        const sourcePath = sourcePathFromHref(src, manifest.repoRoot);
        if (!sourcePath) {
          const relativeContentPath = resolveRelativeContentPath(src, contentPath);
          if (relativeContentPath) {
            image.setAttribute('src', relativeContentPath);
          }
          return;
        }
        const nextContentPath = sourcePathToContentPath(sourcePath);
        if (nextContentPath) {
          image.setAttribute('src', nextContentPath);
        }
      });

      const mermaidBlocks = ref.current.querySelectorAll('pre > code.language-mermaid');
      if (mermaidBlocks.length) {
        mermaidBlocks.forEach((code) => {
          const wrapper = document.createElement('div');
          wrapper.className = 'mermaid';
          wrapper.textContent = code.textContent;
          code.parentElement.replaceWith(wrapper);
        });
        const mermaid = await loadMermaid();
        if (!cancelled) {
          mermaid.run({ querySelector: '.mermaid' }).catch(() => {});
        }
      }

      transformBadGoodCodeDiffs(ref.current);
      attachCopyButtons(ref.current);

      const prism = await loadPrism();
      if (!cancelled && ref.current) {
        prism.highlightAllUnder(ref.current);
      }
    }

    enhanceBlock();
    return () => {
      cancelled = true;
    };
  }, [html, manifest, contentPath]);

  return <div ref={ref} className="content-markdown" dangerouslySetInnerHTML={{ __html: html }} />;
}

function LessonSectionContent({ section, manifest, contentPath }) {
  if (!section?.raw) {
    return null;
  }
  return <MarkdownBlock html={marked.parse(section.raw)} manifest={manifest} contentPath={contentPath} />;
}

function CodeBlock({ code }) {
  const ref = useRef(null);
  const [copyLabel, setCopyLabel] = useState('Copy');

  useEffect(() => {
    let cancelled = false;

    async function highlight() {
      const prism = await loadPrism();
      if (!cancelled && ref.current) {
        prism.highlightElement(ref.current);
      }
    }

    highlight();
    return () => {
      cancelled = true;
    };
  }, [code]);

  return (
    <div className="markdown-code-shell">
      <button
        type="button"
        className="btn btn-sm btn-outline-dark code-copy-button"
        onClick={async () => {
          await copyTextToClipboard(code);
          setCopyLabel('Copied!');
          window.setTimeout(() => setCopyLabel('Copy'), 2000);
        }}
      >
        {copyLabel}
      </button>
      <pre className="mb-0"><code ref={ref} className="language-java">{code}</code></pre>
    </div>
  );
}

export { CodeBlock, LessonSectionContent, MarkdownBlock };
