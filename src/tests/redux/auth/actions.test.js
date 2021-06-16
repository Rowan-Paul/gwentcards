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
})
