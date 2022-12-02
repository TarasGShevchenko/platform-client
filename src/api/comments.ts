import { IComment } from '../store/types'
import axios from 'axios'

export class CommentsApi {
  static apiUrl = process.env.REACT_APP_API_URL
  static async getPostComments(postId: string, token: string): Promise<IComment[]> {
    const res = await axios.get(`${this.apiUrl}comments/postComment/${postId}`, {
      headers: { Authorization: 'Bearer ' + token },
    })
    return res.data
  }
  static async createComment(data: FormData, token: string): Promise<IComment> {
    const res = await axios.post(`${this.apiUrl}comments`, data, {
      headers: { Authorization: 'Bearer ' + token },
    })
    return res.data
  }
  static async deleteComment(id: string, token: string) {
    return await axios.delete(`${this.apiUrl}comments/${id}`, {
      headers: { Authorization: 'Bearer ' + token },
    })
  }
}
