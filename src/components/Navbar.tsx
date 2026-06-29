import { siteConfig } from '../config/site'
import './Navbar.css'

export function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar__inner">
        <a href="#" className="navbar__logo">
          <span className="navbar__logo-text">
            {siteConfig.name}
            <span className="navbar__logo-author">{siteConfig.author}</span>
          </span>
        </a>
        <nav className="navbar__nav">
          <a href="#products" className="navbar__link">产品</a>
          <a href="#about" className="navbar__link">关于</a>
          <a
            href={siteConfig.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="navbar__link navbar__link--external"
          >
            GitHub
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M3 9L9 3M9 3H4M9 3V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </nav>
      </div>
    </header>
  )
}
