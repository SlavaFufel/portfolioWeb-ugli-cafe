// All site copy for «Угли». Single source of truth for text content.

export const brand = {
  name: 'Угли',
  latin: 'UGLI',
  tagline: 'Обжарено вручную. С 1962-го.',
  since: '1962',
  city: 'Москва',
}

export const nav = [
  { id: 'menu', label: 'Меню' },
  { id: 'about', label: 'О нас' },
  { id: 'gallery', label: 'Интерьер' },
  { id: 'hours', label: 'Часы' },
  { id: 'location', label: 'Адрес' },
]

export const hero = {
  eyebrow: 'Ремесленная обжарка · Москва',
  word: 'Угли',
  headline: 'Кофейня, где утро\nпахнет свежим зерном',
  subheadline:
    'Обжариваем на собственном ростере, печём на закваске и завариваем не спеша. Заходите на чашку — оставайтесь на завтрак.',
  ctaPrimary: 'Забронировать стол',
  ctaSecondary: 'Смотреть меню',
}

export const about = {
  eyebrow: 'О нас',
  title: 'Маленькая обжарочная\nс большой историей',
  paragraphs: [
    'Всё началось в 1962-м с одной барабанной ростер-машины и упрямой идеи: кофе должен быть свежим. Сегодня мы всё так же обжариваем небольшими партиями каждое утро — чтобы зерно доезжало до чашки на пике вкуса.',
    'Наша кухня работает на той же философии. Хлеб на закваске медленного брожения, сезонные продукты от локальных фермеров и открытый огонь — то, что мы называем «готовить на углях».',
    'Здесь знают вашу любимую чашку по имени. Это не просто кофейня — это гостиная района, где одинаково хорошо и работать с ноутбуком, и встретить старого друга.',
  ],
  stats: [
    { value: '1962', label: 'год первой обжарки' },
    { value: '12', label: 'моносортов на ростере' },
    { value: '48ч', label: 'от обжарки до чашки' },
  ],
}

export const hours = {
  eyebrow: 'Часы работы',
  title: 'Когда мы открыты',
  note: 'Кухня принимает последний заказ за 30 минут до закрытия. Кофе наливаем до последнего гостя.',
  schedule: [
    { day: 'Пн', open: '08:00', close: '22:00', closed: false },
    { day: 'Вт', open: '08:00', close: '22:00', closed: false },
    { day: 'Ср', open: '08:00', close: '22:00', closed: false },
    { day: 'Чт', open: '08:00', close: '22:00', closed: false },
    { day: 'Пт', open: '08:00', close: '23:00', closed: false },
    { day: 'Сб', open: '09:00', close: '23:00', closed: false },
    { day: 'Вс', open: '09:00', close: '22:00', closed: false },
  ],
}

export const location = {
  eyebrow: 'Как нас найти',
  title: 'Покровка, 17',
  addressLine: 'улица Покровка, 17',
  city: 'Москва, 101000',
  metro: 'м. Чистые пруды / Китай-город — 7 минут пешком',
  walkNote: 'Ищите медную вывеску во дворе с аркой. Дверь зелёная, пахнет кофе — не промахнётесь.',
  phone: '+7 495 962-19-62',
  phoneHref: '+74959621962',
  email: 'privet@ugli.coffee',
  // OpenStreetMap embed (no API key); warmed toward the palette via CSS filter.
  // Centered on the Chistye Prudy area, Moscow. No default marker — we overlay
  // our own brass pin so the embed never reads as the raw blue-and-white default.
  mapEmbedSrc:
    'https://www.openstreetmap.org/export/embed.html?bbox=37.6409%2C55.7581%2C37.6529%2C55.7651&layer=mapnik',
  // "Build a route" deep link into Yandex.Maps.
  routeUrl: 'https://yandex.ru/maps/?rtext=~Москва, улица Покровка, 17&rtt=auto',
  deliveryLinks: [
    { name: 'Яндекс Еда', url: 'https://eda.yandex.ru/' },
    { name: 'Купер', url: 'https://kuper.ru/' },
    { name: 'Самокат', url: 'https://samokat.ru/' },
  ],
}

export const reservation = {
  eyebrow: 'Бронирование',
  title: 'Займём вам место',
  subtitle:
    'Оставьте заявку — и к вашему приходу столик будет накрыт. Для компаний от 8 человек подберём отдельную зону.',
  note: 'Подтвердим бронь по телефону в течение часа.',
  reassurance: 'Подтвердим в течение часа',
  success: {
    stamp: 'Принято · 1962',
    title: 'Спасибо, бронь принята!',
    message: 'Мы перезвоним на указанный номер, чтобы подтвердить детали. До скорой встречи в «Углях».',
  },
}

export const gallery = {
  eyebrow: 'Интерьер',
  title: 'Тепло, дерево и медь',
  subtitle: 'Загляните внутрь до того, как откроете дверь.',
  pullQuote: 'Запах свежей обжарки встречает вас ещё на пороге — это и есть наш фирменный аромат.',
  items: [
    { image: '/images/interior-1.jpg', caption: 'Зал на закате' },
    { image: '/images/interior-2.jpg', caption: 'Барная стойка' },
    { image: '/images/interior-3.jpg', caption: 'Уголок у окна' },
    { image: '/images/interior-4.jpg', caption: 'Утренний свет, 9:00' },
    { image: '/images/interior-5.jpg', caption: 'Полки с зерном' },
    { image: '/images/interior-6.jpg', caption: 'Столик на двоих' },
  ],
}

export const footer = {
  about: 'Ремесленная кофейня и обжарочная в центре Москвы. Кофе своей обжарки, завтраки весь день и тёплый свет до ночи.',
  newsletterTitle: 'Письма по утрам',
  newsletterNote: 'Сезонное меню, новые сорта и закрытые дегустации — раз в неделю, без спама.',
  socials: [
    { name: 'Telegram', url: 'https://t.me/ugli_coffee' },
    { name: 'VK', url: 'https://vk.com/ugli.coffee' },
    { name: 'Instagram', url: 'https://instagram.com/ugli.coffee' },
  ],
  colophon: 'Сделано с теплом в Москве',
  copyright: `© 1962–${new Date().getFullYear()} «Угли». Все права защищены.`,
}

export const seo = {
  title: 'Угли — ремесленная кофейня и обжарочная в Москве',
  description:
    'Кофе собственной обжарки, завтраки весь день и бранч на углях. Живое меню, бронь столика онлайн, доставка. Покровка, 17. С 1962 года.',
  ogImageAlt: 'Чашка свежесваренного кофе в кофейне «Угли»',
}
