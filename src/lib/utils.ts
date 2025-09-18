import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function localizedValue(locale: string, ar: string, en: string) {
  return locale === 'ar' ? ar : en
}
