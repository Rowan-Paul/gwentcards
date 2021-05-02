import * as types from './types'

const INITIAL_STATE = {
  user: {},
  signedIn: false,
}

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.SIGNED_IN:
      return {
        ...state,
        user: action.payload,
        signedIn: true,
      }

    case types.SIGNED_OUT:
      return { INITIAL_STATE }

    default:
      return state
  }
}

export const authReducer = reducer
