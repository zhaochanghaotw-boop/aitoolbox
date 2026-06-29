import { siteConfig } from '../config/site'
import './Hero.css'

interface HeroProps {
  search: string
  onSearchChange: (value: string) => void
  productCount: number
}

export function Hero({ search, onSearchChange, productCount }: HeroProps) {
  return (
    <section className="hero">
      <div className="hero__glow" aria-hidden="true" />
      <div className="hero__content">
        <p className="hero__badge">共 {productCount} 款工具</p>
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.subtitle}</p>
        <div className="hero__search">
          <svg className="hero__search-icon" width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
            <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M12.5 12.5L16 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <input
            type="search"
            className="hero__search-input"
            placeholder="搜索工具名称或标签..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            aria-label="搜索产品"
          />
          {search && (
            <button
              className="hero__search-clear"
              onClick={() => onSearchChange('')}
              aria-label="清除搜索"
            >
              ×
            </button>
          )}
        </div>
      </div>
    </section>
  )
}
