import Seo from '../components/ui/Seo'
import { organizationLd, serviceListLd } from '../lib/seo'
import { services } from '../data/services'
import Hero from '../components/home/Hero'
import TrustStats from '../components/home/TrustStats'
import ServicesPreview from '../components/home/ServicesPreview'
import Approach from '../components/home/Approach'
import CasesPreview from '../components/home/CasesPreview'
import Credentials from '../components/home/Credentials'
import Testimonials from '../components/home/Testimonials'
import BlogPreview from '../components/home/BlogPreview'
import ConsultationCta from '../components/home/ConsultationCta'

export default function Home() {
  return (
    <>
      <Seo
        description="Адвокатское бюро «Корнилов и Партнёры»: арбитраж, банкротство, налоговые споры, M&A. 18 лет практики, 1 240 выигранных дел. Бесплатная консультация в Москве."
        path="/"
        jsonLd={[organizationLd, serviceListLd(services)]}
      />
      <Hero />
      <TrustStats />
      <ServicesPreview />
      <Approach />
      <CasesPreview />
      <Credentials />
      <Testimonials />
      <BlogPreview />
      <ConsultationCta />
    </>
  )
}
