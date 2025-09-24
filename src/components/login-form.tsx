'use client'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useLogin } from '@/hooks/auth/login'
import { createLoginSchema, type LoginForm } from '@/lib/definitions/auth/login'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)

  const t = useTranslations('auth')
  const { mutate: login, isPending } = useLogin()

  const form = useForm<LoginForm>({
    resolver: zodResolver(createLoginSchema(t)),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit = async (data: LoginForm) => {
    login(data)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="email">{t('email')}</FormLabel>
              <FormControl>
                <Input
                  id="email"
                  type="email"
                  placeholder={t('enter-email')}
                  autoComplete="email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="mb-1">
              <FormLabel htmlFor="password">{t('password')}</FormLabel>
              <div className="relative">
                <FormControl>
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder={t('enter-password')}
                    autoComplete="current-password"
                    className="pr-10"
                    {...field}
                  />
                </FormControl>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                >
                  {!showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full h-10" disabled={isPending}>
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {t('signing-in')}
            </>
          ) : (
            t('sign-in')
          )}
        </Button>
      </form>
    </Form>
  )
}
