import type { LoginForm } from '@/lib/definitions/auth/login'
import type { AxiosError } from 'axios'
import { signIn } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'react-toastify'

export function useLogin() {
  const [isPending, setIsPending] = useState(false)

  const router = useRouter()
  const t = useTranslations('auth')

  const mutate = async (
    loginData: LoginForm
  ): Promise<{
    ok: boolean
    error?: string | null
  }> => {
    setIsPending(true)
    try {
      const result = await signIn('credentials', {
        email: loginData.email,
        password: loginData.password,
        redirect: false
      })
      // Check for successful authentication
      if (result?.ok && !result?.error) {
        router.push('/home')
        toast.success(t('login-successful'))
        return { ok: true }
      } else {
        // Handle authentication failure
        const errorMessage = t('login-failed')
        toast.error(errorMessage)
        return { ok: false, error: errorMessage }
      }
    } catch (error) {
      const axiosError = error as AxiosError
      const errMessage =
        (axiosError.response?.data as string) || t('login-failed')
      toast.error(errMessage)
      return { ok: false, error: errMessage }
    } finally {
      setIsPending(false)
    }
  }

  return { mutate, isPending }
}
