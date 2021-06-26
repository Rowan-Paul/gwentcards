import { authReducer } from '../../../redux/auth/reducer'
import * as types from '../../../redux/auth/types'

describe('Auth reducer', () => {
  const TOKEN =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJwZmx5bm44MEBnbWFpbC5jb20iLCJ1c2VybmFtZSI6InJwZiIsImlhdCI6MTYyMzI0MTM4MywiZXhwIjo0MjE1MjQxMzgzfQ.tNTRrfISkm5NYX7UHWXNUkOJ-6TCRdkdoxzZkOBaU18'
  const INITIAL_STATE = {
    user: {},
    signedIn: false,
  }

  it('Should return the initial state', () => {
    expect(authReducer(undefined, {})).toEqual(INITIAL_STATE)
  })

  it('Should handle SIGNED_IN', () => {
    const dispatchedData = {
      type: types.SIGNED_IN,
      payload: {
        token: TOKEN,
      },
    }

    expect(authReducer([], dispatchedData)).toEqual({
      user: {
        token: TOKEN,
      },
      signedIn: true,
    })
  })

  it('Should handle SIGNED_OUT', () => {
    const dispatchedData = {
      type: types.SIGNED_OUT,
    }

    expect(authReducer([], dispatchedData)).toEqual(INITIAL_STATE)
  })

  it('Should handle PASSWORD_CHANGED', () => {
    const dispatchedData = {
      type: types.PASSWORD_CHANGED,
    }

    expect(authReducer([], dispatchedData)).toEqual({})
  })

  it('Should handle RESET_MAIL_SENT', () => {
    const dispatchedData = {
      type: types.RESET_MAIL_SENT,
    }

    expect(authReducer([], dispatchedData)).toEqual({})
  })

  it('Should handle DELETED_ACCOUNT', () => {
    const dispatchedData = {
      type: types.DELETED_ACCOUNT,
    }

    expect(authReducer([], dispatchedData)).toEqual({
      signedIn: false,
      user: {},
    })
  })

  it('Should handle VERIFIED_EMAIL', () => {
    const dispatchedData = {
      type: types.VERIFIED_EMAIL,
    }

    expect(authReducer([], dispatchedData)).toEqual({})
  })
})
