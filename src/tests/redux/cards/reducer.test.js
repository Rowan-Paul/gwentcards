import { cardsReducer } from '../../../redux/cards/reducer'
import * as types from '../../../redux/cards/types'

describe('Cards reducer', () => {
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
      listView: false,
    },
    pageSize: 20,
    page: 0,
    reset: false,
  }

  it('Should return the initial state', () => {
    expect(cardsReducer(undefined, {})).toEqual(INITIAL_STATE)
  })

  it('Should handle FETCHED_CARDS', () => {
    const dispatchedData = {
      type: types.FETCHED_CARDS,
      payload: {
        amount: 20,
        selected: [],
      },
    }

    expect(cardsReducer([], dispatchedData)).toEqual({
      amount: dispatchedData.payload.amount,
      selected: dispatchedData.payload.cards,
      reset: false,
      page: 0,
    })
  })

  it('Should handle COLLECTED_CARD', () => {
    const dispatchedData = {
      type: types.COLLECTED_CARD,
      payload: {
        collected: [],
      },
    }

    expect(cardsReducer([], dispatchedData)).toEqual({
      collectedCards: dispatchedData.payload.collected,
    })
  })

  it('Should handle UNCOLLECTED_CARD', () => {
    const dispatchedData = {
      type: types.UNCOLLECTED_CARD,
      payload: [],
    }

    expect(cardsReducer([], dispatchedData)).toEqual({
      collectedCards: dispatchedData.payload,
    })
  })

  it('Should handle FETCHED_COLLECTED_CARDS', () => {
    const dispatchedData = {
      type: types.FETCHED_COLLECTED_CARDS,
      payload: {
        collected: [],
      },
    }

    expect(cardsReducer([], dispatchedData)).toEqual({
      collectedCards: dispatchedData.payload.collected,
    })
  })

  it('Should handle PAGE_SIZE_SET', () => {
    const dispatchedData = {
      type: types.PAGE_SIZE_SET,
      payload: 2,
    }

    expect(cardsReducer([], dispatchedData)).toEqual({
      pageSize: dispatchedData.payload,
    })
  })

  it('Should handle FILTERS_SET', () => {
    const dispatchedData = {
      type: types.FILTERS_SET,
      payload: {
        deck: 'Nilfgaard',
        row: 2,
        strength: 2,
        abilities: ['dog'],
        effect: ['twelve'],
        hideCollectedCards: true,
        showCollectedCards: false,
        listView: false,
      },
    }

    expect(cardsReducer([], dispatchedData)).toEqual({
      filters: {
        deck: dispatchedData.payload.deck,
        row: dispatchedData.payload.row,
        strength: dispatchedData.payload.strength,
        abilities: dispatchedData.payload.abilities,
        effect: dispatchedData.payload.effect,
        hideCollectedCards: dispatchedData.payload.hideCollectedCards,
        showCollectedCards: dispatchedData.payload.showCollectedCards,
        listView: false,
      },
      page: 0,
      reset: false,
    })
  })

  it('Should handle PAGE_SET', () => {
    const dispatchedData = {
      type: types.PAGE_SET,
      payload: 2,
    }

    expect(cardsReducer([], dispatchedData)).toEqual({
      page: dispatchedData.payload,
    })
  })

  it('Should handle RESET', () => {
    const dispatchedData = {
      type: types.RESET,
      payload: true,
    }

    expect(cardsReducer([], dispatchedData)).toEqual({
      reset: dispatchedData.payload,
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
    })
  })

  it('Should handle REMOVED_CARDS', () => {
    const dispatchedData = {
      type: types.REMOVED_CARDS,
    }

    expect(cardsReducer([], dispatchedData)).toEqual({
      selected: [],
    })
  })
})
