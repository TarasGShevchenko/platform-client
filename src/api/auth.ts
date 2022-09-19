import axios from 'axios'

export class AuthApi {
  static async login(username: string, password: string): Promise<{ token: string }> {
    const token = await axios.post('http://localhost:8000/auth/login', { username, password })
    return token.data
  }
  static async registration(username: string, email: string, password: string): Promise<{ token: string }> {
    const token = await axios.post('http://localhost:8000/auth/registration', { username, email, password })
    return token.data
  }
}
