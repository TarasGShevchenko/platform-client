import { RootEpic } from '../types'
import { filter, switchMap, map } from 'rxjs/operators'
import { isActionOf } from 'typesafe-actions'
import { loginUserRequest, loginUserSuccess, getUsers, registerUserRequest, registerUserSuccess } from '../actions'
import { from } from 'rxjs'

export const LoginEpic: RootEpic = (action$, state$, { AuthApi }) => {
  return action$.pipe(filter(isActionOf(loginUserRequest))).pipe(
    switchMap(({ payload: { username, password } }) => {
      return from(AuthApi.login(username, password)).pipe(
        map((res) => {
          if (res.token) {
            window.localStorage.setItem('token', res.token)
          }
          return loginUserSuccess(res)
        }),
      )
    }),
  )
}
export const RegisterEpic: RootEpic = (action$, state$, { AuthApi }) => {
  return action$.pipe(filter(isActionOf(registerUserRequest))).pipe(
    switchMap(({ payload: { username, email, password } }) => {
      return from(AuthApi.registration(username, email, password)).pipe(
        map((res) => {
          if (res.token) {
            window.localStorage.setItem('token', res.token)
          }
          getUsers()
          return registerUserSuccess(res)
        }),
      )
    }),
  )
}

export default [LoginEpic, RegisterEpic]
