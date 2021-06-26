import createMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import * as actionTypes from '../../../redux/auth/actions'
import * as types from '../../../redux/auth/types'

const mws = [thunk]
const mockStore = createMockStore(mws)
const store = mockStore({})

describe('Auth actions', () => {
  const USERNAME = 'RPF'
  const PASSWORD = 'password'
  const EMAIL = 'mail@example.com'
  const TOKEN =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJwZmx5bm44MEBnbWFpbC5jb20iLCJ1c2VybmFtZSI6InJwZiIsImlhdCI6MTYyMzI0MTM4MywiZXhwIjo0MjE1MjQxMzgzfQ.tNTRrfISkm5NYX7UHWXNUkOJ-6TCRdkdoxzZkOBaU18'

  beforeEach(() => {
    store.clearActions()
  })

  it('Dispatches SIGNED_IN after signing in', () => {
    expect.assertions(2)

    const body = {
      username: USERNAME,
      password: PASSWORD,
    }
    const expectedResponse = {
      token: TOKEN,
    }

    const mResponse = {
      json: jest.fn().mockResolvedValueOnce(expectedResponse),
      status: 200,
    }
    global.fetch = jest.fn().mockResolvedValueOnce(mResponse)

    const expectedActions = [
      {
        type: types.SIGNED_IN,
        payload: {
          token: TOKEN,
        },
      },
    ]

    return store.dispatch(actionTypes.signIn(USERNAME, PASSWORD)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
      expect(global.fetch).toBeCalledWith('/api/v1/auth', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })
    })
  })

  it('Dispatches SIGNED_OUT after signing out', () => {
    expect.assertions(2)

    const mResponse = {
      json: jest.fn().mockResolvedValueOnce(),
      status: 201,
    }
    global.fetch = jest.fn().mockResolvedValueOnce(mResponse)

    const expectedActions = [
      {
        type: types.SIGNED_OUT,
      },
    ]

    return store.dispatch(actionTypes.signOut()).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
      expect(global.fetch).toBeCalledWith('/api/v1/auth', {
        method: 'DELETE',
      })
    })
  })

  it('Dispatches SIGNED_IN after verifying token', () => {
    expect.assertions(2)

    const expectedResponse = {
      token: TOKEN,
    }

    const mResponse = {
      json: jest.fn().mockResolvedValueOnce(expectedResponse),
      status: 200,
    }
    global.fetch = jest.fn().mockResolvedValueOnce(mResponse)

    const expectedActions = [
      {
        type: types.SIGNED_IN,
        payload: {
          token: TOKEN,
        },
      },
    ]

    return store.dispatch(actionTypes.verify()).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
      expect(global.fetch).toBeCalledWith('/api/v1/auth', {
        method: 'GET',
      })
    })
  })

  it('Dispatches SIGNED_IN after signing up', () => {
    expect.assertions(2)

    const body = {
      username: USERNAME,
      email: EMAIL,
      password: PASSWORD,
    }
    const expectedResponse = {
      token: TOKEN,
    }

    const mResponse = {
      json: jest.fn().mockResolvedValueOnce(expectedResponse),
      status: 201,
    }
    global.fetch = jest.fn().mockResolvedValueOnce(mResponse)

    const expectedActions = [
      {
        type: types.SIGNED_IN,
        payload: {
          token: TOKEN,
        },
      },
    ]

    return store
      .dispatch(actionTypes.signUp(USERNAME, EMAIL, PASSWORD))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
        expect(global.fetch).toBeCalledWith('/api/v1/auth', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        })
      })
  })

  it('Dispatches RESET_MAIL_SENT after sending reset password email', () => {
    expect.assertions(2)

    const body = { username: USERNAME }
    const expectedResponse = {
      token: TOKEN,
    }

    const mResponse = {
      json: jest.fn().mockResolvedValueOnce(expectedResponse),
      status: 201,
    }
    global.fetch = jest.fn().mockResolvedValueOnce(mResponse)

    const expectedActions = [
      {
        type: types.RESET_MAIL_SENT,
      },
      {
        type: 'ADDED_NOTICE',
        payload: {
          message: 'Send email to email address',
          type: 'success',
        },
      },
    ]

    return store
      .dispatch(actionTypes.resetPasswordRequest(USERNAME))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
        expect(global.fetch).toBeCalledWith('/api/v1/auth/reset', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        })
      })
  })

  it('Dispatches PASSWORD_CHANGED after updating password', () => {
    expect.assertions(2)

    const body = { token: TOKEN, password: PASSWORD }
    const mResponse = {
      json: jest.fn().mockResolvedValueOnce(),
      status: 201,
    }
    global.fetch = jest.fn().mockResolvedValueOnce(mResponse)

    const expectedActions = [
      {
        type: types.PASSWORD_CHANGED,
      },
      {
        type: 'ADDED_NOTICE',
        payload: {
          message: 'Password updated',
          type: 'auth',
        },
      },
    ]

    return store
      .dispatch(actionTypes.resetPassword(TOKEN, PASSWORD))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
        expect(global.fetch).toBeCalledWith('/api/v1/auth/reset', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        })
      })
  })

  it('Dispatches DELETED_ACCOUNT after deleting account', () => {
    expect.assertions(2)

    const body = { username: USERNAME, password: PASSWORD }
    const mResponse = {
      json: jest.fn().mockResolvedValueOnce(),
      status: 201,
    }
    global.fetch = jest.fn().mockResolvedValueOnce(mResponse)

    const expectedActions = [
      {
        type: types.DELETED_ACCOUNT,
      },
      {
        type: 'ADDED_NOTICE',
        payload: {
          message: 'Deleted account',
          type: 'success',
        },
      },
    ]

    return store
      .dispatch(actionTypes.removeAccount(USERNAME, PASSWORD))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
        expect(global.fetch).toBeCalledWith('/api/v1/auth/account', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        })
      })
  })

  it('Dispatches VERIFIED_EMAIL after verifying email', () => {
    expect.assertions(2)

    const body = { token: TOKEN }
    const mResponse = {
      json: jest.fn().mockResolvedValueOnce(),
      status: 201,
    }
    global.fetch = jest.fn().mockResolvedValueOnce(mResponse)

    const expectedActions = [
      {
        type: types.VERIFIED_EMAIL,
      },
      {
        type: 'ADDED_NOTICE',
        payload: {
          message: 'Email has been verified',
          type: 'success',
        },
      },
    ]

    return store.dispatch(actionTypes.verifyEmail(TOKEN)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
      expect(global.fetch).toBeCalledWith('/api/v1/auth/account/verify', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })
    })
  })
})
