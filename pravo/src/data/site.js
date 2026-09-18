// Single source of truth for firm identity, contacts, navigation and trust signals.
// Keeping content data-driven makes SEO copy and structured data easy to maintain.

export const firm = {
  name: 'Корнилов и Партнёры',
  legalName: 'Адвокатское бюро «Корнилов и Партнёры»',
  monogram: 'К&П',
  tagline: 'Защищаем бизнес и капитал',
  established: 2008,
  description:
    'Адвокатское бюро полного цикла: арбитраж, банкротство, налоговые и корпоративные споры, сопровождение сделок M&A.',
  domain: 'https://kornilov-partners.ru',
}

export const contacts = {
  phone: '+7 (495) 120-45-67',
  phoneHref: 'tel:+74951204567',
  email: 'office@kornilov-partners.ru',
  emailHref: 'mailto:office@kornilov-partners.ru',
  address: 'Москва, Пресненская наб., 12, башня «Федерация», 41 этаж',
  addressShort: 'Москва, Пресненская наб., 12',
  hours: 'Пн–Пт 9:00–20:00',
  geo: { lat: 55.7497, lng: 37.5392 },
}

export const navLinks = [
  { to: '/uslugi', label: 'Услуги' },
  { to: '/keysy', label: 'Кейсы' },
  { to: '/o-byuro', label: 'О бюро' },
  { to: '/blog', label: 'Блог' },
  { to: '/kontakty', label: 'Контакты' },
]

// Headline trust metrics. `to` is the numeric target used by the count-up animation.
export const stats = [
  { to: 18, suffix: '', label: 'лет практики', note: 'с 2008 года' },
  { to: 1240, suffix: '+', label: 'выигранных дел', note: 'в судах всех инстанций' },
  { to: 8.6, suffix: ' млрд ₽', label: 'защищённых активов', decimals: 1, note: 'совокупно для клиентов' },
  { to: 94, suffix: '%', label: 'дел в нашу пользу', note: 'за последние 5 лет' },
]

// 4-step engagement process — communicates predictability (a key trust driver).
export const process = [
  {
    step: '01',
    title: 'Консультация и анализ',
    text: 'Бесплатно изучаем документы и честно оцениваем перспективы дела — без ложных обещаний.',
  },
  {
    step: '02',
    title: 'Правовая стратегия',
    text: 'Готовим позицию, просчитываем риски и фиксируем план действий с понятными сроками.',
  },
  {
    step: '03',
    title: 'Ведение дела',
    text: 'Сопровождаем на всех инстанциях, берём переговоры на себя и держим вас в курсе.',
  },
  {
    step: '04',
    title: 'Результат и исполнение',
    text: 'Доводим до решения и контролируем его фактическое исполнение, а не только «бумагу».',
  },
]

// Credentials / memberships — Trust & Authority style relies on visible credibility.
export const credentials = [
  { name: 'Адвокатская палата г. Москвы', detail: 'Действующие адвокатские статусы' },
  { name: 'Право-300', detail: 'Рекомендованы в банкротстве и арбитраже' },
  { name: 'Коммерсантъ', detail: 'Рейтинг юридических фирм' },
  { name: 'Best Lawyers', detail: 'Персональные рекомендации партнёров' },
  { name: 'Forbes Club', detail: 'Партнёрская программа' },
  { name: 'ISO 9001', detail: 'Сертифицированные процессы ведения дел' },
]

export const partners = [
  {
    name: 'Дмитрий Корнилов',
    role: 'Управляющий партнёр',
    focus: 'Банкротство, субсидиарная ответственность',
    bio: 'Адвокат с 2004 года. Провёл более 300 банкротных процедур, защищает бенефициаров и топ-менеджмент.',
    initials: 'ДК',
  },
  {
    name: 'Анна Вересова',
    role: 'Партнёр, налоговая практика',
    focus: 'Налоговые споры, сопровождение проверок',
    bio: 'Экс-сотрудник ФНС. Специализируется на досудебном урегулировании и обжаловании доначислений.',
    initials: 'АВ',
  },
  {
    name: 'Сергей Лагутин',
    role: 'Партнёр, корпоративная практика',
    focus: 'M&A, корпоративные конфликты',
    bio: 'Сопроводил сделки на сумму более 40 млрд ₽. Структурирует приобретения и защищает доли.',
    initials: 'СЛ',
  },
]

// FAQ doubles as SEO content (FAQPage schema) and pre-empts conversion objections.
export const faq = [
  {
    q: 'Сколько стоит первая консультация?',
    a: 'Первичная консультация и оценка перспектив дела — бесплатно. Мы честно скажем, есть ли смысл идти в суд.',
  },
  {
    q: 'Вы работаете по фиксированной стоимости или почасово?',
    a: 'Возможны оба формата, а по ряду дел — гонорар успеха. Стоимость фиксируем в договоре до начала работы.',
  },
  {
    q: 'В каких регионах вы ведёте дела?',
    a: 'Головной офис в Москве, но мы представляем интересы клиентов в арбитражных судах по всей России.',
  },
  {
    q: 'Гарантируете ли вы результат?',
    a: 'Закон запрещает гарантировать исход дела. Мы гарантируем стратегию, прозрачность и полную отдачу — наш показатель 94% говорит сам за себя.',
  },
]
