import * as types from './types'

const INITIAL_STATE = {
  amount: null,
  selected: [],
  userCards: [],
  filters: {
    deck: [],
    row: [],
    strength: [],
    abilities: [],
    effect: [],
  },
  pageSize: 20,
  page: 0,
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
      return { ...state, userCards: action.payload.cards }

    case types.FETCHED_USER_CARDS:
      return { ...state, userCards: action.payload.cards }

    case types.PAGE_SIZE_SET:
      return { ...state, pageSize: action.payload }

    case types.FILTERS_SET:
      return { ...state, filters: action.payload }

    case types.PAGE_SET:
      return { ...state, page: action.payload }

    default:
      return state
  }
}

export const cardsReducer = reducer
