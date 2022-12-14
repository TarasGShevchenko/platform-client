import axios from 'axios'

import { UserSuccess } from '../store/types'

export class AuthApi {
  static apiUrl = process.env.REACT_APP_API_URL
  static async login(username: string, password: string): Promise<UserSuccess> {
    const token = await axios.post(`${this.apiUrl}auth/login`, { username, password })
    return token.data
  }
  static async registration(username: string, email: string, password: string): Promise<UserSuccess> {
    const token = await axios.post(`${this.apiUrl}auth/registration`, { username, email, password })
    return token.data
  }
}
