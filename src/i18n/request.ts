import { hasLocale } from 'next-intl'
import { getRequestConfig } from 'next-intl/server'
import { routing } from './routing'

export default getRequestConfig(async ({ requestLocale }) => {
  // Typically corresponds to the `[locale]` segment
  const requested = await requestLocale
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale

  // Load messages with proper namespace structure
  const [common, landing] = await Promise.all([
    import(`../../messages/${locale}/common.json`),
    import(`../../messages/${locale}/landing.json`)
  ])

  return {
    locale,
    messages: {
      common: common.default,
      landing: landing.default
    }
  }
})
