import { IPost } from '../store/types'
import axios from 'axios'

export class PostApi {
  static async getUserPosts(id: string, token: string): Promise<IPost[]> {
    const res = await axios.get(`http://localhost:8000/posts/user/${id}`, {
      headers: { Authorization: 'Bearer ' + token },
    })
    return res.data
  }
  static async getPosts(): Promise<IPost[]> {
    const res = await axios.get('http://localhost:8000/posts')
    return res.data
  }
  static async getPostById(id: string, token: string): Promise<IPost> {
    const res = await axios.get(`http://localhost:8000/posts/${id}`, { headers: { Authorization: 'Bearer ' + token } })
    return res.data
  }
  static async createPost(data: FormData, token: string): Promise<IPost> {
    const res = await axios.post(`http://localhost:8000/posts`, data, { headers: { Authorization: 'Bearer ' + token } })
    return res.data
  }
  static async deletePost(id: string, token: string) {
    return await axios.delete(`http://localhost:8000/posts/${id}`, {
      headers: { Authorization: 'Bearer ' + token },
    })
  }
}
