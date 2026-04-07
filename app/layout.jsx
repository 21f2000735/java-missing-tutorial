import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'prismjs/themes/prism.css';
import '../site/src/site.css';
import { NEXT_METADATA, NEXT_VIEWPORT } from '../site/src/lib/site-config.js';

export const metadata = NEXT_METADATA;
export const viewport = NEXT_VIEWPORT;

const themeBootScript = `
  (function () {
    try {
      var theme = localStorage.getItem('java-book-theme') || 'light';
      document.documentElement.setAttribute('data-theme', theme);
      document.documentElement.setAttribute('data-bs-theme', theme);
    } catch (error) {
      document.documentElement.setAttribute('data-theme', 'light');
      document.documentElement.setAttribute('data-bs-theme', 'light');
    }
  })();
`;

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
