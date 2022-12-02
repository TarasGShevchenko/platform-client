import { IPost } from '../store/types'
import axios from 'axios'

export class PostApi {
  static apiUrl = process.env.REACT_APP_API_URL
  static async getUserPosts(id: string, token: string): Promise<IPost[]> {
    const res = await axios.get(`${this.apiUrl}posts/user/${id}`, {
      headers: { Authorization: 'Bearer ' + token },
    })
    return res.data
  }
  static async getPosts(): Promise<IPost[]> {
    const res = await axios.get(`${this.apiUrl}posts`)
    return res.data
  }
  static async getPostById(id: string, token: string): Promise<IPost> {
    const res = await axios.get(`${this.apiUrl}posts/${id}`, { headers: { Authorization: 'Bearer ' + token } })
    return res.data
  }
  static async createPost(data: FormData, token: string): Promise<IPost> {
    const res = await axios.post(`${this.apiUrl}posts`, data, { headers: { Authorization: 'Bearer ' + token } })
    return res.data
  }
  static async deletePost(id: string, token: string) {
    return await axios.delete(`${this.apiUrl}posts/${id}`, {
      headers: { Authorization: 'Bearer ' + token },
    })
  }
}
