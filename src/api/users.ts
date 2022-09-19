import { IUser } from '../store/types'
import axios from 'axios'

export class UserApi {
  static async getUsers(token: string): Promise<IUser[]> {
    const res = await axios.get('http://localhost:8000/users', { headers: { Authorization: 'Bearer ' + token } })
    return res.data
  }
  static async getUserByUsername(username: string, token: string): Promise<IUser> {
    const res = await axios.get(`http://localhost:8000/users/${username}`, {
      headers: { Authorization: 'Bearer ' + token },
    })
    return res.data
  }
  static async getUserByEmail(email: string, token: string): Promise<IUser> {
    const res = await axios.get(`http://localhost:8000/users/${email}`, {
      headers: { Authorization: 'Bearer ' + token },
    })
    return res.data
  }
  static async createUser(user: Partial<IUser>): Promise<IUser> {
    const res = await axios.post('http://localhost:8000/users', user)
    return res.data
  }
}
