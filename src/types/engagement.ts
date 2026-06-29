export interface Comment {
  id: string
  author: string
  content: string
  createdAt: string
}

export interface ProductEngagementData {
  likes: number
  liked: boolean
  comments: Comment[]
}

export type EngagementStore = Record<string, ProductEngagementData>
