import { z } from 'zod'

const MIN_PASSWORD_LENGTH = 5

export const createLoginSchema = (t: (key: string) => string) =>
  z.object({
    email: z
      .email(t('validation.email-invalid'))
      .min(1, t('validation.email-required')),
    password: z
      .string()
      .nonempty(t('validation.password-required'))
      .min(MIN_PASSWORD_LENGTH, t('validation.password-min-length-8'))
  })

export type LoginForm = z.infer<ReturnType<typeof createLoginSchema>>
