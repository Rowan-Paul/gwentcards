import * as types from './types'

const INITIAL_STATE = {
  amount: null,
  selected: [],
  userCards: [],
}

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.FETCHED_CARDS:
      return {
        ...state,
        amount: action.payload.amount,
        selected: action.payload.cards,
      }

    case types.ADDED_USER_CARD:
      console.log(action.payload)
      return { ...state, userCards: action.payload.cards }

    case types.FETCHED_USER_CARDS:
      return { ...state, userCards: action.payload.cards }

    default:
      return state
  }
}

export const cardsReducer = reducer
