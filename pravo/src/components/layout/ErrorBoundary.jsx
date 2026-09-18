import { Component } from 'react'
import Button from '../ui/Button'

/**
 * Catches render/chunk-load errors in the route tree so a failed lazy import
 * shows a recovery screen instead of a blank page.
 */
export default class ErrorBoundary extends Component {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return (
        <section
          className="surface-dark"
          style={{
            minHeight: '70dvh',
            display: 'grid',
            placeItems: 'center',
            paddingTop: 'calc(78px + var(--space-8))',
            textAlign: 'center',
          }}
        >
          <div className="container">
            <h1 style={{ color: 'var(--on-dark)', fontSize: 'var(--text-3xl)', marginBottom: 'var(--space-4)' }}>
              Что-то пошло не так
            </h1>
            <p style={{ color: 'var(--on-dark-soft)', maxWidth: '44ch', margin: '0 auto var(--space-6)' }}>
              Произошла ошибка при загрузке страницы. Обновите страницу или вернитесь на главную.
            </p>
            <Button href="/" variant="cream" withArrow>
              На главную
            </Button>
          </div>
        </section>
      )
    }
    return this.props.children
  }
}
