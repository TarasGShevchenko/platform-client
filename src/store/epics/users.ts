import { RootEpic } from '../types'
import { filter, map, exhaustMap } from 'rxjs/operators'
import { isActionOf } from 'typesafe-actions'
import { from } from 'rxjs'
import { getUsersSuccess, loginUserSuccess } from '../actions'

export const GetUsersEpic: RootEpic = (action$, state$, { UserApi }) => {
  return action$.pipe(filter(isActionOf(loginUserSuccess))).pipe(
    exhaustMap(() => {
      return from(UserApi.getUsers(state$.value.auth.token)).pipe(
        map((res) => {
          return getUsersSuccess(res)
        }),
      )
    }),
  )
}

export default [GetUsersEpic]
