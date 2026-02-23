import axios from 'axios'

const TIMEOUT_MS = 60000 // 60 seconds

export const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=UTF-8'
  },
  timeout: TIMEOUT_MS
})
