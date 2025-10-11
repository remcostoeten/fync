import { useMemo } from 'react'
import type { TTocItem, TApiSection } from '@/types/content'

type TUseTocProps = {
  sections: TApiSection[]
  includeMethods?: boolean
}

export function useToc({ sections, includeMethods = true }: TUseTocProps): TTocItem[] {
  return useMemo(function generateTocItems() {
    const items: TTocItem[] = []
    
    for (const section of sections) {
      items.push({
        id: section.id,
        title: section.title,
        level: 2
      })
      
      if (includeMethods && section.methods) {
        for (const method of section.methods) {
          items.push({
            id: method.id,
            title: method.name,
            level: 3
          })
        }
      }
    }
    
    return items
  }, [sections, includeMethods])
}
