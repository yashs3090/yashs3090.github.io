import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Footer } from './components/layout/Footer';
import { Header } from './components/layout/Header';
import { SkipLink } from './components/layout/SkipLink';
import { Apps } from './routes/Apps';
import { Home } from './routes/Home';
import { NotFound } from './routes/NotFound';
import { Resume } from './routes/Resume';

/**
 * BrowserRouter (clean paths) rather than HashRouter is safe here only
 * because the deploy workflow copies dist/index.html to dist/404.html.
 * GitHub Pages serves 404.html for any path with no file behind it, which
 * hands control to the router — so /resume and /apps survive a direct visit
 * or a refresh. If that cp step is ever removed from the workflow, every
 * deep link starts 404ing.
 */
export function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <SkipLink />
        <Header />
        <main id="main" className="app-main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="/apps" element={<Apps />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
