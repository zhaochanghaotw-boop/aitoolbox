import type { Product } from '../types/product'
import { isValidUrl } from '../utils/url'
import { ProductDescription } from './ProductDescription'
import { ProductEngagement } from './ProductEngagement'
import './ProductCard.css'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const base = import.meta.env.BASE_URL
  const hasDemo = isValidUrl(product.demoUrl)
  const hasDownload = isValidUrl(product.downloadUrl)

  return (
    <article className="product-card">
      <div className="product-card__cover">
        <div className="product-card__cover-frame">
          <img
            src={`${base}${product.cover.replace(/^\//, '')}`}
            alt={product.name}
            loading="lazy"
          />
        </div>
      </div>
      <div className="product-card__body">
        <div className="product-card__header">
          <h3 className="product-card__name">{product.name}</h3>
          <span className="product-card__version">v{product.version}</span>
        </div>
        <ProductDescription text={product.desc} />
        <div className="product-card__tags">
          {product.tags.map((tag) => (
            <span key={tag} className="product-card__tag">{tag}</span>
          ))}
        </div>
        <div className="product-card__meta">
          <span>更新于 {product.updated}</span>
        </div>
        <ProductEngagement productId={product.id} />
        <div className="product-card__actions">
          {hasDemo ? (
            <a
              href={product.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--primary"
            >
              在线体验
            </a>
          ) : (
            <span className="btn btn--primary btn--disabled" aria-disabled="true">
              在线体验
            </span>
          )}
          {hasDownload ? (
            <a
              href={product.downloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--secondary"
              download
            >
              下载
            </a>
          ) : (
            <span className="btn btn--secondary btn--disabled" aria-disabled="true">
              下载
            </span>
          )}
        </div>
      </div>
    </article>
  )
}
