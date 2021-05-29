import * as types from './types'

const INITIAL_STATE = {
  amount: null,
  selected: [],
  collectedCards: [],
  filters: {
    deck: [],
    row: [],
    strength: [],
    abilities: [],
    effect: [],
    hideCollectedCards: false,
    showCollectedCards: false,
  },
  pageSize: 20,
  page: 0,
  reset: false,
}

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.FETCHED_CARDS:
      return {
        ...state,
        amount: action.payload.amount,
        selected: action.payload.cards,
        reset: false,
        page: 0,
      }

    case types.COLLECTED_CARD:
      return { ...state, collectedCards: action.payload.collected }

    case types.UNCOLLECTED_CARD:
      return { ...state, collectedCards: [...action.payload] }

    case types.FETCHED_COLLECTED_CARDS:
      return { ...state, collectedCards: action.payload.collected }

    case types.PAGE_SIZE_SET:
      return { ...state, pageSize: action.payload }

    case types.FILTERS_SET:
      return {
        ...state,
        filters: {
          deck: action.payload.deck,
          row: action.payload.row,
          strength: action.payload.strength,
          abilities: action.payload.abilities,
          effect: action.payload.effect,
          hideCollectedCards: action.payload.hideCollectedCards,
          showCollectedCards: action.payload.showCollectedCards,
        },
        page: 0,
        reset: false,
      }

    case types.PAGE_SET:
      return { ...state, page: action.payload }

    case types.RESET:
      return {
        ...state,
        reset: action.payload,
        page: 0,
        filters: {
          deck: [],
          row: [],
          strength: [],
          abilities: [],
          effect: [],
          hideCollectedCards: false,
          showCollectedCards: false,
        },
      }

    case types.REMOVED_CARDS:
      return { ...state, selected: [] }

    default:
      return state
  }
}

export const cardsReducer = reducer
