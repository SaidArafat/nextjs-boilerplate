import { auth } from '@/auth'
import { queryClient } from '@/lib/client'
import { cn } from '@/lib/utils'
import { ShadcnProvider } from '@/providers/shadcn'
import '@/styles/globals.css'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { SessionProvider } from 'next-auth/react'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { ToastContainer } from 'react-toastify'

type AuthLayoutProps = {
  params: Promise<{ locale: string }>
  children: React.ReactNode
}

export default async function AuthLayout({
  children,
  params
}: Readonly<AuthLayoutProps>) {
  const { locale } = await params
  const session = await auth()
  const messages = await getMessages({ locale })

  return (
    <html
      lang={locale}
      dir={locale === 'ar' ? 'rtl' : 'ltr'}
      suppressHydrationWarning
    >
      <body className={cn('bg-layout-background')}>
        <SessionProvider session={session}>
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
        </SessionProvider>
      </body>
    </html>
  )
}
