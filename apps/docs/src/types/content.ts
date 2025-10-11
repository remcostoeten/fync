export type TCodeExample = {
  id: string
  title: string
  description: string
  code: string
  language: string
  category: string
  tags: string[]
}

export type TParameter = {
  name: string
  type: string
  description: string
  required: boolean
}

export type TApiMethod = {
  id: string
  name: string
  description: string
  signature: string
  parameters: TParameter[]
  returnType: string
  examples: TCodeExample[]
}

export type TApiSection = {
  id: string
  title: string
  description: string
  methods: TApiMethod[]
}

export type TSearchResult = {
  id: string
  title: string
  description: string
  type: 'method' | 'example' | 'section'
  href: string
  category: string
}

export type TNavItem = {
  id: string
  title: string
  href: string
  icon?: string
  children?: TNavItem[]
}

export type TDocMeta = {
  title: string
  description: string
  keywords: string[]
  openGraph?: {
    title: string
    description: string
    type: string
    url?: string
  }
}

export type TApiReference = {
  api: string
  sections: TApiSection[]
}

export type TTocItem = {
  id: string
  title: string
  level: number
}
