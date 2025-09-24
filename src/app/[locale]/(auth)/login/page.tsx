import { LoginForm } from '@/components/login-form'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { getLocaleMessages } from '@/i18n/helpers'
import type { Metadata } from 'next'

type LoginProps = {
  params: Promise<{ locale: string }>
}

export default async function Login({ params }: LoginProps) {
  const { locale } = await params
  const messages = await getLocaleMessages(locale, 'auth')

  return (
    <main className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <Card className="w-full max-w-sm flex flex-col gap-6">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            {messages['welcome-back']}
          </CardTitle>
          <CardDescription className="text-center">
            {messages['enter-credentials']}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </main>
  )
}

export async function generateMetadata({
  params
}: LoginProps): Promise<Metadata> {
  const { locale } = await params
  const messages = await getLocaleMessages(locale, 'auth')

  return {
    metadataBase: new URL('http://localhost:3000'),
    title: messages['sign-in'],
    description: `${messages['sign-in']},
                  ${messages['description']}`,
    keywords: [messages['sign-in']],
    authors: [{ name: 'Said Arafat' }],
    openGraph: {
      title: messages['sign-in'],
      description: `${messages['sign-in']}, 
                    ${messages['description']}`,
      url: `http://localhost:3000/`,
      siteName: messages['sign-in'],
      type: 'website',
      locale,
      alternateLocale: locale === 'en' ? 'ar' : 'en'
    },
    twitter: {
      card: 'summary',
      title: messages['sign-in'],
      description: `${messages['sign-in']}, 
                    ${messages['description']}`
    },
    robots: {
      index: true,
      follow: true
    }
  }
}
