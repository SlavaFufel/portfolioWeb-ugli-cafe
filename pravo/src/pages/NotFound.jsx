import Seo from '../components/ui/Seo'
import Button from '../components/ui/Button'
import Eyebrow from '../components/ui/Eyebrow'

export default function NotFound() {
  return (
    <section
      className="surface-dark"
      style={{
        minHeight: '78dvh',
        display: 'grid',
        placeItems: 'center',
        paddingTop: 'calc(78px + var(--space-8))',
        paddingBottom: 'var(--space-8)',
        textAlign: 'center',
      }}
    >
      <Seo title="Страница не найдена" path="/404" />
      <div className="container">
        <Eyebrow light center>
          Ошибка 404
        </Eyebrow>
        <h1 style={{ fontSize: 'var(--text-4xl)', color: 'var(--on-dark)', margin: 'var(--space-5) 0' }}>
          Страница не найдена
        </h1>
        <p style={{ color: 'var(--on-dark-soft)', maxWidth: '46ch', margin: '0 auto var(--space-6)' }}>
          Возможно, ссылка устарела или страница была перемещена. Вернитесь на главную или
          напишите нам — мы поможем.
        </p>
        <div style={{ display: 'flex', gap: 'var(--space-4)', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button to="/" variant="cream" withArrow>
            На главную
          </Button>
          <Button to="/kontakty" variant="outline-light">
            Связаться с нами
          </Button>
        </div>
      </div>
    </section>
  )
}
