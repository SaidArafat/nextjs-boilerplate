'use client'
import { QueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { baseURL } from './constants'

export const client = axios.create({
  baseURL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=UTF-8'
  },
  timeout: 1000 * 60
})

export { AxiosError } from 'axios'
export const queryClient = new QueryClient()
