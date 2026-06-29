import type { Product } from '../types/product'
import { ProductCard } from './ProductCard'
import './ProductGrid.css'

interface ProductGridProps {
  products: Product[]
  loading: boolean
  error: string | null
  search: string
}

export function ProductGrid({ products, loading, error, search }: ProductGridProps) {
  const filtered = products.filter((p) => {
    if (!search.trim()) return true
    const q = search.toLowerCase()
    return (
      p.name.toLowerCase().includes(q) ||
      p.desc.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q))
    )
  })

  return (
    <section id="products" className="product-grid-section">
      <div className="product-grid-section__inner">
        {loading && (
          <div className="product-grid__state">
            <div className="spinner" />
            <p>正在加载工具...</p>
          </div>
        )}

        {error && (
          <div className="product-grid__state product-grid__state--error">
            <p>加载产品失败：{error}</p>
          </div>
        )}

        {!loading && !error && filtered.length === 0 && (
          <div className="product-grid__state">
            <p>{search ? `未找到与「${search}」相关的工具` : '暂无可用工具'}</p>
          </div>
        )}

        {!loading && !error && filtered.length > 0 && (
          <div className="product-grid">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
