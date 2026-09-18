import { Link } from 'react-router-dom'
import { posts } from '../../data/posts'
import SectionHeading from '../ui/SectionHeading'
import ArticleCard from '../ArticleCard'
import Reveal from '../ui/Reveal'
import './home.css'

export default function BlogPreview() {
  return (
    <section className="section" style={{ background: 'var(--ivory-100)' }} aria-labelledby="blog-title">
      <div className="container">
        <div className="section-head-row">
          <SectionHeading
            id="blog-title"
            eyebrow="Блог"
            title="Разбираем сложное простым языком"
            lead="Практические статьи о банкротстве, налогах и защите бизнеса — для собственников и руководителей."
          />
          <Link to="/blog" className="section-head-row__link">
            Все статьи
            <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>

        <Reveal className="grid-3 mt-head" stagger={0.08}>
          {posts.slice(0, 3).map((post) => (
            <ArticleCard key={post.slug} post={post} />
          ))}
        </Reveal>
      </div>
    </section>
  )
}
