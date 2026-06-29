import { useEffect, useState } from 'react'
import type { Product } from '../types/product'

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const base = import.meta.env.BASE_URL
    fetch(`${base}products.json`)
      .then((res) => {
        if (!res.ok) throw new Error('无法加载产品数据')
        return res.json()
      })
      .then((data: Product[]) => {
        setProducts(data)
        setLoading(false)
      })
      .catch((err: Error) => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  return { products, loading, error }
}
