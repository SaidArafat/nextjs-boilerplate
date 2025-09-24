import { z } from 'zod'

export const createLoginSchema = (t: (key: string) => string) =>
  z.object({
    email: z
      .email(t('validation.email-invalid'))
      .min(1, t('validation.email-required')),
    password: z
      .string()
      .nonempty(t('validation.password-required'))
      .min(5, t('validation.password-min-length-8'))
  })

export type LoginForm = z.infer<ReturnType<typeof createLoginSchema>>
