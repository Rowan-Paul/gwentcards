import * as types from './types'

const INITIAL_STATE = {
  amount: null,
  selected: [],
}

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.FETCHED_CARDS:
      return {
        ...state,
        amount: action.payload.amount,
        selected: action.payload.cards,
      }

    default:
      return state
  }
}

export const cardsReducer = reducer
