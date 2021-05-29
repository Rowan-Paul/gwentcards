import * as types from './types'

const INITIAL_STATE = {
  notice: {
    message: null,
    type: null,
  },
}

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.ADDED_NOTICE:
      return { ...state, notice: action.payload }

    default:
      return state
  }
}

export const mainReducer = reducer
