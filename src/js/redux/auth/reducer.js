import * as types from './types'

const INITIAL_STATE = {
  user: {},
}

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.SIGNED_IN:
      return {
        ...state,
        user: action.payload,
      }

    default:
      return state
  }
}

export const authReducer = reducer
