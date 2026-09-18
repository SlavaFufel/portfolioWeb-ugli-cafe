import { Link, useParams } from 'react-router-dom'
import Seo from '../components/ui/Seo'
import { articleLd, breadcrumbLd } from '../lib/seo'
import { getPost } from '../data/posts'
import { formatDate } from '../lib/format'
import Reveal from '../components/ui/Reveal'
import Button from '../components/ui/Button'
import './blog-post.css'

function ArticleBody({ blocks }) {
  return (
    <div className="article-body prose">
      {blocks.map((block, i) => {
        if (block.type === 'h2') return <h2 key={i}>{block.text}</h2>
        if (block.type === 'ul') {
          return (
            <ul key={i} className="article-list" role="list">
              {block.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          )
        }
        return <p key={i}>{block.text}</p>
      })}
    </div>
  )
}

export default function BlogPost() {
  const { slug } = useParams()
  const post = getPost(slug)

  if (!post) {
    return (
      <section className="section container" style={{ paddingTop: 'calc(78px + var(--space-8))' }}>
        <Seo title="Статья не найдена" path={`/blog/${slug}`} />
        <h1>Статья не найдена</h1>
        <p style={{ margin: 'var(--space-4) 0 var(--space-6)', color: 'var(--ink-soft)' }}>
          Возможно, материал был перемещён или удалён.
        </p>
        <Button to="/blog" variant="outline">
          Все статьи
        </Button>
      </section>
    )
  }

  return (
    <>
      <Seo
        title={post.title}
        description={post.excerpt}
        path={`/blog/${post.slug}`}
        type="article"
        jsonLd={[
          articleLd(post),
          breadcrumbLd([
            { name: 'Блог', path: '/blog' },
            { name: post.title, path: `/blog/${post.slug}` },
          ]),
        ]}
      />

      <article>
        <header className="article-header surface-dark">
          <div className="article-header__bg" aria-hidden="true" />
          <div className="container article-header__inner">
            <nav className="article-header__crumbs" aria-label="Навигационная цепочка">
              <Link to="/">Главная</Link>
              <span aria-hidden="true"> / </span>
              <Link to="/blog">Блог</Link>
            </nav>
            <span className="article-header__cat">{post.category}</span>
            <h1 className="article-header__title">{post.title}</h1>
            <div className="article-header__meta">
              <span>{post.author}</span>
              <span aria-hidden="true">·</span>
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <span aria-hidden="true">·</span>
              <span>{post.readingTime} мин чтения</span>
            </div>
          </div>
        </header>

        <div className="section">
          <div className="container">
            <Reveal>
              <ArticleBody blocks={post.body} />
            </Reveal>

            <div className="article-foot">
              <Button to="/blog" variant="link">
                ← Ко всем статьям
              </Button>
              <Button to="/kontakty" variant="primary" withArrow>
                Получить консультацию
              </Button>
            </div>
          </div>
        </div>
      </article>
    </>
  )
}
