import { getLocaleMessages } from '@/i18n/helpers'
import { Metadata } from 'next'

type HomeProps = {
  params: Promise<{ locale: string }>
}

export default function Home() {
  return <main>Home page</main>
}

export async function generateMetadata({
  params
}: HomeProps): Promise<Metadata> {
  const { locale } = await params
  const messages = await getLocaleMessages(locale, 'landing')

  return {
    metadataBase: new URL('http://localhost:3000'),
    title: messages['title'],
    description: `${messages['title']},
                  ${messages['description']}`,
    keywords: [messages['keywords']],
    authors: [{ name: messages['author'] }],
    openGraph: {
      title: messages['title'],
      description: `${messages['title']}, 
                    ${messages['description']}`,
      url: `http://localhost:3000/`,
      siteName: messages['title'],
      type: 'website',
      locale,
      alternateLocale: locale === 'en' ? 'ar' : 'en'
    },
    twitter: {
      card: 'summary',
      title: messages['title'],
      description: `${messages['title']}, 
                    ${messages['description']}`
    },
    robots: {
      index: true,
      follow: true
    }
  }
}
