import { useCallback, useEffect, useState } from 'react'
import type { Comment, EngagementStore, ProductEngagementData } from '../types/engagement'

const STORAGE_KEY = 'honor-ai-tools-engagement'

function createDefault(): ProductEngagementData {
  return { likes: 0, liked: false, comments: [] }
}

function loadStore(): EngagementStore {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return {}
    return JSON.parse(raw) as EngagementStore
  } catch {
    return {}
  }
}

function saveStore(store: EngagementStore) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(store))
}

function formatDate(iso: string): string {
  const date = new Date(iso)
  return date.toLocaleString('zh-CN', {
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function useEngagement(productId: string) {
  const [data, setData] = useState<ProductEngagementData>(createDefault)

  useEffect(() => {
    const store = loadStore()
    setData(store[productId] ?? createDefault())
  }, [productId])

  const persist = useCallback(
    (next: ProductEngagementData) => {
      const store = loadStore()
      store[productId] = next
      saveStore(store)
      setData(next)
    },
    [productId],
  )

  const toggleLike = useCallback(() => {
    const store = loadStore()
    const current = store[productId] ?? createDefault()
    const next: ProductEngagementData = current.liked
      ? { ...current, likes: Math.max(0, current.likes - 1), liked: false }
      : { ...current, likes: current.likes + 1, liked: true }
    persist(next)
  }, [productId, persist])

  const addComment = useCallback(
    (author: string, content: string) => {
      const trimmed = content.trim()
      if (!trimmed) return false

      const store = loadStore()
      const current = store[productId] ?? createDefault()
      const comment: Comment = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        author: author.trim() || '匿名用户',
        content: trimmed,
        createdAt: new Date().toISOString(),
      }
      persist({
        ...current,
        comments: [comment, ...current.comments],
      })
      return true
    },
    [productId, persist],
  )

  return {
    likes: data.likes,
    liked: data.liked,
    comments: data.comments,
    toggleLike,
    addComment,
    formatDate,
  }
}
