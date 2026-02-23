import type { NextAuthConfig } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

import { isAxiosError } from 'axios'

import { client } from '@/lib/client'

const MS_PER_SECOND = 1000
const SESSION_MAX_AGE = 604800 // 7 days in seconds

export const authConfig = {
  pages: {
    signIn: '/login'
  },
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
        token: { label: 'Token', type: 'text' },
        user: { label: 'User', type: 'text' }
      },
      async authorize(credentials) {
        const { email, password, token, user } = credentials as {
          email: string
          password: string
          token?: string
          user?: string
        }

        // Case 1: Direct user and token provided (from OTP verification)
        if (token && user) {
          try {
            const userData = typeof user === 'string' ? JSON.parse(user) : user
            return {
              ...userData,
              token,
              role: userData.role || 'user'
            }
          } catch (error) {
            console.error('Error parsing user data:', error)
            return null
          }
        }

        // Case 2: Regular email/password login
        try {
          const response = await client.post('/api/auth/login', {
            email,
            password
          })

          if (!response?.data?.user || !response?.data?.token) {
            throw new Error('Invalid credentials')
          }

          return {
            ...response.data.user,
            token: response.data.token,
            role: response.data.user.role || 'user'
          }
        } catch (error) {
          console.error('Authentication error:', error)
          if (isAxiosError(error) && error.response) {
            console.error('Error response data:', error.response.data)
            console.error('Error response status:', error.response.status)
            console.error('Error response headers:', error.response.headers)
            return null
          }
          return null
        }
      }
    })
  ],
  session: {
    strategy: 'jwt',
    maxAge: SESSION_MAX_AGE
  },
  cookies: {
    sessionToken: {
      name:
        process.env.NODE_ENV === 'production'
          ? `__Secure-next-auth.session-token`
          : `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production'
      }
    }
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const isPublicPath = [
        '/login',
        '/_next',
        '/api/auth',
        /\/images\//,
        '/favicon.ico'
      ].some((path) => {
        if (typeof path === 'string') {
          return nextUrl.pathname.includes(path)
        }
        return path.test(nextUrl.pathname)
      })

      return isPublicPath ? true : isLoggedIn
    },
    async jwt({ token, user, trigger, session }) {
      // Handle token refresh and validation

      if (trigger === 'update' && session) {
        // Update token if session is updated
        return { ...token, ...session }
      }

      if (user) {
        token.id = user.id as string
        token.email = user.email
        token.token = user.token
        token.role = user.role || 'user'
        // Add issued at time to track token age
        token.iat = Math.floor(Date.now() / MS_PER_SECOND)
      }

      // Validate token hasn't expired (optional)
      const tokenAge =
        Math.floor(Date.now() / MS_PER_SECOND) - ((token.iat as number) || 0)
      if (tokenAge > SESSION_MAX_AGE) {
        // 7 days
        console.warn('Token expired, clearing session')
        return null
      }

      return token
    },
    async session({ session, token }) {
      if (token && token.id) {
        session.user.id = token.id as string
        session.user.email = token.email as string
        session.token = token.token as string
        session.user.role = token.role as string
      }
      return session
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
  trustHost: true,
  // Add debug mode for development
  debug: process.env.NODE_ENV === 'development'
} satisfies NextAuthConfig
