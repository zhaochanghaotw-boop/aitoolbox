import { useState, type FormEvent } from 'react'
import { useEngagement } from '../hooks/useEngagement'
import './ProductEngagement.css'

interface ProductEngagementProps {
  productId: string
}

export function ProductEngagement({ productId }: ProductEngagementProps) {
  const { likes, liked, comments, toggleLike, addComment, formatDate } = useEngagement(productId)
  const [showComments, setShowComments] = useState(false)
  const [author, setAuthor] = useState('')
  const [content, setContent] = useState('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (addComment(author, content)) {
      setContent('')
      setShowComments(false)
    }
  }

  return (
    <div className="engagement">
      <div className="engagement__bar">
        <button
          type="button"
          className={`engagement__btn${liked ? ' engagement__btn--liked' : ''}`}
          onClick={toggleLike}
          aria-pressed={liked}
          aria-label={liked ? '取消点赞' : '点赞'}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path
              d="M8 13.5L3.5 9.2C2.2 7.9 1.5 6.2 1.5 4.5C1.5 2.6 3 1 4.9 1C6.1 1 7.2 1.6 8 2.5C8.8 1.6 9.9 1 11.1 1C13 1 14.5 2.6 14.5 4.5C14.5 6.2 13.8 7.9 12.5 9.2L8 13.5Z"
              stroke="currentColor"
              strokeWidth="1.5"
              fill={liked ? 'currentColor' : 'none'}
            />
          </svg>
          <span>{likes > 0 ? likes : '点赞'}</span>
        </button>

        <button
          type="button"
          className={`engagement__btn${showComments ? ' engagement__btn--active' : ''}`}
          onClick={() => setShowComments((prev) => !prev)}
          aria-expanded={showComments}
          aria-label="评论"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path
              d="M2 3.5C2 2.67 2.67 2 3.5 2H12.5C13.33 2 14 2.67 14 3.5V10.5C14 11.33 13.33 12 12.5 12H5L2 14.5V3.5Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </svg>
          <span>{comments.length > 0 ? `${comments.length} 条评论` : '评论'}</span>
        </button>
      </div>

      {showComments && (
        <div className="engagement__panel">
          {comments.length === 0 ? (
            <p className="engagement__empty">暂无评论，来抢沙发吧</p>
          ) : (
            <ul className="engagement__list">
              {comments.map((comment) => (
                <li key={comment.id} className="engagement__item">
                  <div className="engagement__item-header">
                    <span className="engagement__author">{comment.author}</span>
                    <time className="engagement__time" dateTime={comment.createdAt}>
                      {formatDate(comment.createdAt)}
                    </time>
                  </div>
                  <p className="engagement__content">{comment.content}</p>
                </li>
              ))}
            </ul>
          )}

          <form className="engagement__form" onSubmit={handleSubmit}>
            <input
              type="text"
              className="engagement__input"
              placeholder="昵称（可选）"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              maxLength={20}
            />
            <textarea
              className="engagement__textarea"
              placeholder="写下你的使用感受或建议..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              maxLength={500}
              rows={3}
              required
            />
            <button type="submit" className="engagement__submit" disabled={!content.trim()}>
              发表评论
            </button>
          </form>
        </div>
      )}
    </div>
  )
}
