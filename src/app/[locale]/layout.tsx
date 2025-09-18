import { getLocaleMessages } from '@/i18n/helpers'
import { queryClient } from '@/lib/client'
import { ShadcnProvider } from '@/providers/shadcn'
import '@/styles/globals.css'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { ToastContainer } from 'react-toastify'

type RootLayoutProps = {
  params: Promise<{ locale: string }>
  children: React.ReactNode
}

export default async function RootLayout({
  children,
  params
}: Readonly<RootLayoutProps>) {
  const { locale } = await params
  const messages = await getMessages({ locale })

  return (
    <html
      lang={locale}
      dir={locale === 'ar' ? 'rtl' : 'ltr'}
      suppressHydrationWarning
    >
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <QueryClientProvider client={queryClient}>
            <ShadcnProvider>
              {children}
              <ToastContainer
                position={locale === 'ar' ? 'bottom-left' : 'bottom-right'}
              />
            </ShadcnProvider>
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}

export async function generateMetadata({
  params
}: RootLayoutProps): Promise<Metadata> {
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
