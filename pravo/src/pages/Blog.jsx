import Seo from '../components/ui/Seo'
import { breadcrumbLd } from '../lib/seo'
import { posts } from '../data/posts'
import PageHero from '../components/layout/PageHero'
import ArticleCard from '../components/ArticleCard'
import Reveal from '../components/ui/Reveal'

export default function Blog() {
  return (
    <>
      <Seo
        title="Блог — статьи о праве и защите бизнеса"
        description="Практические статьи адвокатского бюро о банкротстве, налоговых спорах, субсидиарной ответственности, M&A и взыскании задолженности."
        path="/blog"
        jsonLd={breadcrumbLd([{ name: 'Блог', path: '/blog' }])}
      />
      <PageHero
        eyebrow="Блог"
        title="Статьи и разборы"
        lead="Объясняем сложные правовые вопросы простым языком — для собственников бизнеса и руководителей."
        crumbs={[{ name: 'Блог', path: '/blog' }]}
      />

      <section className="section">
        <div className="container">
          <Reveal className="grid-3" stagger={0.07}>
            {posts.map((post) => (
              <ArticleCard key={post.slug} post={post} />
            ))}
          </Reveal>
        </div>
      </section>
    </>
  )
}
