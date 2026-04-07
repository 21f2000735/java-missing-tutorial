import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'prismjs/themes/prism.css';
import '../site/src/site.css';
import { NEXT_METADATA, NEXT_VIEWPORT } from '../site/src/lib/site-config.js';

export const metadata = NEXT_METADATA;
export const viewport = NEXT_VIEWPORT;

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
