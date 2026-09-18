import { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import ScrollToTop from './components/layout/ScrollToTop'
import ErrorBoundary from './components/layout/ErrorBoundary'
import Home from './pages/Home'

// Secondary routes are code-split so the landing page ships the smallest bundle.
const Services = lazy(() => import('./pages/Services'))
const Cases = lazy(() => import('./pages/Cases'))
const Blog = lazy(() => import('./pages/Blog'))
const BlogPost = lazy(() => import('./pages/BlogPost'))
const About = lazy(() => import('./pages/About'))
const Contacts = lazy(() => import('./pages/Contacts'))
const NotFound = lazy(() => import('./pages/NotFound'))

export default function App() {
  return (
    <>
      <a href="#main" className="skip-link">
        К основному содержимому
      </a>
      <ScrollToTop />
      <Navbar />
      <main id="main">
        <ErrorBoundary>
          <Suspense fallback={<div className="route-fallback">Загрузка…</div>}>
            <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/uslugi" element={<Services />} />
            <Route path="/keysy" element={<Cases />} />
            <Route path="/o-byuro" element={<About />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/kontakty" element={<Contacts />} />
            <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </main>
      <Footer />
    </>
  )
}
