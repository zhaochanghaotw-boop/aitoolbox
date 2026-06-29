import { useLayoutEffect, useRef, useState } from 'react'
import './ProductDescription.css'

interface ProductDescriptionProps {
  text: string
}

export function ProductDescription({ text }: ProductDescriptionProps) {
  const [expanded, setExpanded] = useState(false)
  const [overflows, setOverflows] = useState(false)
  const descRef = useRef<HTMLParagraphElement>(null)

  useLayoutEffect(() => {
    const el = descRef.current
    if (!el || expanded) return

    const checkOverflow = () => {
      setOverflows(el.scrollHeight > el.clientHeight + 1)
    }

    checkOverflow()
    window.addEventListener('resize', checkOverflow)
    return () => window.removeEventListener('resize', checkOverflow)
  }, [text, expanded])

  const showToggle = overflows || expanded

  return (
    <div className="product-desc">
      <p
        ref={descRef}
        className={`product-desc__text${expanded ? ' product-desc__text--expanded' : ''}`}
      >
        {text}
      </p>
      {showToggle && (
        <button
          type="button"
          className="product-desc__toggle"
          onClick={() => setExpanded((prev) => !prev)}
          aria-expanded={expanded}
        >
          {expanded ? '收起' : '展开说明'}
          <svg
            className={`product-desc__chevron${expanded ? ' product-desc__chevron--up' : ''}`}
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M3 4.5L6 7.5L9 4.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}
    </div>
  )
}
