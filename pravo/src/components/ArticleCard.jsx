import { Link } from 'react-router-dom'
import { formatDate } from '../lib/format'
import './article-card.css'

export default function ArticleCard({ post }) {
  return (
    <article className="article-card">
      <Link to={`/blog/${post.slug}`} className="article-card__link" aria-label={post.title}>
        <div className="article-card__meta">
          <span className="article-card__cat">{post.category}</span>
          <time dateTime={post.date}>{formatDate(post.date)}</time>
        </div>
        <h3 className="article-card__title">{post.title}</h3>
        <p className="article-card__excerpt">{post.excerpt}</p>
        <span className="article-card__more">
          Читать статью · {post.readingTime} мин
          <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M5 12h14M13 6l6 6-6 6"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </Link>
    </article>
  )
}
