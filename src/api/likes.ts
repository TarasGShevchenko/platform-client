import axios from 'axios'

export class LikesApi {
  static apiUrl = process.env.REACT_APP_API_URL
  static async like(userId: number, postId: number, token: string) {
    const res = await axios.post(
      `${this.apiUrl}likes`,
      { userId, postId },
      {
        headers: { Authorization: 'Bearer ' + token },
      },
    )
    return res.data
  }
  static async unlike(postId: number, userId: number, token: string) {
    return await axios.delete(`${this.apiUrl}likes/${postId}/${userId}`, {
      headers: { Authorization: 'Bearer ' + token },
    })
  }
}
