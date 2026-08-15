import { en } from './en'

export type Messages = typeof en

export type DeepStringify<T> = T extends string
  ? string
  : T extends readonly (infer U)[]
    ? readonly DeepStringify<U>[]
    : T extends object
      ? { readonly [K in keyof T]: DeepStringify<T[K]> }
      : T

export type LocaleMessages = DeepStringify<Messages>
