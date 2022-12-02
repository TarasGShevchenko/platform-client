import { IComment } from '../store/types'
import axios from 'axios'

export class CommentsApi {
  static async getPostComments(postId: string, token: string): Promise<IComment[]> {
    const res = await axios.get(`http://localhost:8000/comments/postComment/${postId}`, {
      headers: { Authorization: 'Bearer ' + token },
    })
    return res.data
  }
  static async createComment(data: FormData, token: string): Promise<IComment> {
    const res = await axios.post(`http://localhost:8000/comments`, data, {
      headers: { Authorization: 'Bearer ' + token },
    })
    return res.data
  }
  static async deleteComment(id: string, token: string) {
    return await axios.delete(`http://localhost:8000/comments/${id}`, {
      headers: { Authorization: 'Bearer ' + token },
    })
  }
}
