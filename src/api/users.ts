import { IUser } from '../store/types'
import axios from 'axios'

export class UserApi {
  static apiUrl = process.env.REACT_APP_API_URL
  static async getUsers(token: string): Promise<IUser[]> {
    const res = await axios.get(`${this.apiUrl}users`, { headers: { Authorization: 'Bearer ' + token } })
    return res.data
  }
  static async getUserByUsername(username: string, token: string): Promise<IUser> {
    const res = await axios.get(`${this.apiUrl}users/${username}`, {
      headers: { Authorization: 'Bearer ' + token },
    })
    return res.data
  }

  static async updateUser(id: string, token: string, logo?: string, background?: string): Promise<IUser> {
    const res = await axios.patch(
      `${this.apiUrl}users/${id}/update`,
      { avatarLogo: logo, avatarBackground: background },
      {
        headers: { Authorization: 'Bearer ' + token },
      },
    )
    return res.data
  }
}
