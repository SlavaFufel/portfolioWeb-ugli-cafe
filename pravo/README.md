# Адвокатское бюро «Корнилов и Партнёры»

Многостраничный маркетинговый сайт юридической фирмы. Строгая, «дорогая»
типографика, дисциплинированный контраст (глубокий navy + золото) и элегантные,
производительные анимации на GSAP, которые корректно работают на любом устройстве.

## Стек

- **React 18** + **Vite 6**
- **react-router-dom** — клиентская маршрутизация, страницы с code-splitting (`React.lazy`)
- **GSAP** + **@gsap/react** (`useGSAP`) + **ScrollTrigger** — анимации появления, счётчики, параллакс
- **react-helmet-async** — мета-теги и JSON-LD для каждой страницы
- Чистый CSS с дизайн-токенами (без UI-фреймворков)

## Запуск

```bash
npm install
npm run dev      # http://localhost:5174
npm run build    # production-сборка в dist/
npm run preview  # предпросмотр собранной версии
```

## Структура

```
src/
├── components/
│   ├── layout/      Navbar, Footer, PageHero, ScrollToTop, ErrorBoundary
│   ├── ui/          Button, Reveal, SectionHeading, StatCounter, Emblem, Seo, Eyebrow
│   ├── home/        секции главной (Hero, TrustStats, Approach, …)
│   └── *Card.jsx    ServiceCard, CaseCard, ArticleCard, ConsultationForm, Faq
├── data/            контент: services, cases, posts, testimonials, site
├── lib/             gsap (регистрация плагинов), seo (JSON-LD), format
├── pages/           Home, Services, Cases, Blog, BlogPost, About, Contacts, NotFound
└── styles/          tokens.css, global.css
```

## Дизайн-система

Сгенерирована через навык `ui-ux-pro-max` (стиль **Trust & Authority**):

- **Заголовки:** EB Garamond · **Текст:** Lato
- **Палитра:** navy `#0B1F3A → #13294B`, золото-акцент `#C5A253`, тёплая «бумага» `#F6F4EE`
- Все цвета — семантические токены в `src/styles/tokens.css`
- Контрастные пары проверены на WCAG AA (≥ 4.5:1 для текста)

## SEO

- Семантическая разметка, корректная иерархия заголовков, хлебные крошки
- `<title>` / `description` / Open Graph и canonical на каждый маршрут (Helmet)
- Структурированные данные JSON-LD: `LegalService`, `BreadcrumbList`, `BlogPosting`,
  `FAQPage`, `OfferCatalog`
- `public/sitemap.xml` и `public/robots.txt`

## Доступность

- Полная навигация с клавиатуры, видимые focus-состояния, skip-link
- Мобильное меню — `role="dialog"`, `aria-modal`, перевод фокуса и focus-trap
- Форма: связанные подписи, `aria-invalid`/`aria-describedby`, единая сводка ошибок,
  фокус на первое невалидное поле
- `prefers-reduced-motion` отключает все анимации (через `gsap.matchMedia`)
- Счётчики и слайдер отзывов корректно озвучиваются скринридерами

## Производительность

- Анимируются только `transform`/`opacity` (compositor-friendly)
- Маршруты разделены на чанки, главная грузится первой
- Графика (эмблема, паттерны, текстура) — SVG/CSS, без тяжёлых растров
- Шрифты с `display=swap`

---

## Что нужно сделать перед production

Сайт — клиентский статический фронтенд. Перед боевым запуском:

1. **Форма заявки** сейчас демонстрационная (`setTimeout`, без бэкенда). При интеграции:
   - POST на CRM/почтовый эндпоинт;
   - **серверная** валидация (клиентская — только UX);
   - rate-limiting по IP;
   - проверка honeypot-поля `company` на сервере;
   - не логировать содержимое `message` (может содержать персональные данные).
2. **Заголовки безопасности** (на уровне хостинга — Netlify `_headers`, `vercel.json`):
   ```
   Content-Security-Policy: default-src 'self'; script-src 'self';
     style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
     font-src 'self' https://fonts.gstatic.com; img-src 'self' data:;
     frame-ancestors 'none'; base-uri 'self'; form-action 'self';
   X-Content-Type-Options: nosniff
   Referrer-Policy: strict-origin-when-cross-origin
   Strict-Transport-Security: max-age=31536000; includeSubDomains
   ```
   `style-src 'unsafe-inline'` нужен, т.к. GSAP пишет инлайновые стили.
3. **Шрифты:** для скорости и приватности рекомендуется self-hosting (WOFF2 в `public/fonts/`)
   вместо Google Fonts CDN — тогда из CSP можно убрать домены Google.
4. Заменить демо-реквизиты (ИНН, телефон, адрес, домен в `src/data/site.js` и `index.html`)
   на реальные данные фирмы.

> Демо-контент (кейсы, отзывы, статьи, цифры) вымышлен и нужен только для показа структуры.
