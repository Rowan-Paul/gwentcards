import * as types from './types'
import { removeItemOnce } from '../../utils'
import { setNotice } from '../main/actions'

const api = process.env.REACT_APP_API

// fetch cards
export const fetchCards = () => (dispatch, getState) => {
  let url = `${api}/cards`
  const parameters = []
  const { filters } = getState().cards

  dispatch({
    type: types.REMOVED_CARDS,
  })

  if (filters.deck.length > 0) {
    parameters.push(`deck=${encodeURIComponent(filters.deck.toString())}`)
  }
  if (filters.row.length > 0) {
    parameters.push(`row=${encodeURIComponent(filters.row.toString())}`)
  }
  if (filters.strength.length > 0) {
    parameters.push(
      `strength=${encodeURIComponent(filters.strength.toString())}`
    )
  }
  if (filters.abilities.length > 0) {
    parameters.push(
      `abilities=${encodeURIComponent(filters.abilities.toString())}`
    )
  }
  if (filters.effect.length > 0) {
    parameters.push(`effect=${encodeURIComponent(filters.effect.toString())}`)
  }

  if (parameters.length > 0) {
    url += `/card?${parameters[0]}`
    if (parameters.length > 1) {
      for (let i = 1; i < parameters.length; i++) {
        url += `&${parameters[i]}`
      }
    }
  }

  fetch(url)
    .then((response) => response.json())
    .then((response) => {
      localStorage.setItem('cards', JSON.stringify(response))

      if (filters.showCollectedCards) {
        const cards = []

        response.cards.forEach((card) => {
          card.locations.forEach((location) => {
            if (
              getState().cards.collectedCards.includes(location._id) &&
              !cards.includes(card)
            ) {
              cards.push(card)
            }
          })
        })

        const newResponse = {
          amount: cards.length,
          cards: [...cards],
        }

        dispatch({
          type: types.FETCHED_CARDS,
          payload: newResponse,
        })
      } else if (filters.hideCollectedCards) {
        const cards = []
        const toRemove = []

        response.cards.forEach((card) => {
          card.locations.forEach((location) => {
            if (getState().cards.collectedCards.includes(location._id)) {
              toRemove.push(card._id)
            }
          })
        })

        response.cards.forEach((card) => {
          if (!toRemove.includes(card._id)) {
            cards.push(card)
          }
        })

        const newResponse = {
          amount: cards.length,
          cards: [...cards],
        }

        dispatch({
          type: types.FETCHED_CARDS,
          payload: newResponse,
        })
      } else {
        dispatch({
          type: types.FETCHED_CARDS,
          payload: response,
        })
      }
    })
    .catch(() => {
      dispatch({
        type: types.FETCHED_CARDS,
        payload: JSON.parse(localStorage.getItem('cards')) || {},
      })
      dispatch(
        setNotice({
          message: 'Failed to fetch cards, showing cached cards',
          type: 'error',
        })
      )
    })
}

// fetch collect card
export const fetchCollectedCards = () => {
  const url = `${api}/users/cards`

  return (dispatch) =>
    fetch(url)
      .then((response) => response.json())
      .then((response) => {
        if (response.amount > 0) {
          localStorage.setItem(
            'collectedCards',
            JSON.stringify(response.collected)
          )
          dispatch({ type: types.FETCHED_COLLECTED_CARDS, payload: response })
        } else {
          throw new Error('No collected cards')
        }
      })
      .catch(() => {
        console.log('Failed to fetch collected cards, showing cache')
        dispatch({
          type: types.FETCHED_COLLECTED_CARDS,
          payload: {
            collected: JSON.parse(localStorage.getItem('collectedCards')) || [],
          },
        })
      })
}

// collect card
export const collectCard = (card) => (dispatch, getState) => {
  const url = `${api}/users/cards`
  const offlineQueue = JSON.parse(localStorage.getItem('offlineCards')) || []

  let data = { collected: [card] }
  if (getState().cards.collectedCards.length > 0) {
    data = {
      collected: [...getState().cards.collectedCards, ...offlineQueue, card],
    }
  }
  localStorage.setItem('collectedCards', JSON.stringify(data.collected))

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((response) => {
      if (response.amount > 0) {
        localStorage.removeItem('offlineCards')

        dispatch({ type: types.COLLECTED_CARD, payload: response })
        dispatch(setNotice({ message: 'Collected card', type: 'success' }))
      } else {
        throw new Error('Not logged in')
      }
    })
    .catch(() => {
      localStorage.setItem(
        'offlineCards',
        JSON.stringify([...offlineQueue, card])
      )

      dispatch({ type: types.COLLECTED_CARD, payload: data })
      dispatch(setNotice({ message: 'Card saved locally', type: 'success' }))
    })
}

// uncollect card
export const uncollectCard = (card) => (dispatch, getState) => {
  const url = `${api}/users/cards`
  const data = { card }
  const offlineQueue =
    JSON.parse(localStorage.getItem('offlineUncollected')) || []

  let newArray = []
  if (getState().cards.collectedCards?.length > 1) {
    newArray = removeItemOnce(getState().cards.collectedCards, card)
  }
  if (offlineQueue.length > 0) {
    offlineQueue.forEach((element) => {
      newArray = removeItemOnce(getState().cards.collectedCards, element)
    })
  }
  localStorage.setItem('collectedCards', JSON.stringify(newArray))

  fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.status === 201) {
        localStorage.removeItem('offlineUncollected')

        dispatch({ type: types.UNCOLLECTED_CARD, payload: newArray })
        dispatch(setNotice({ message: 'Removed card', type: 'success' }))
      } else {
        throw new Error('Not logged in')
      }
    })
    .catch(() => {
      localStorage.setItem(
        'offlineUncollected',
        JSON.stringify([...offlineQueue, card])
      )

      dispatch(
        setNotice({
          message: 'Failed to remove cards, but did save locally',
          type: 'error',
        })
      )
      dispatch({
        type: types.UNCOLLECTED_CARD,
        payload: newArray,
      })
    })
}

export const setPageSize = (size) => ({
  type: types.PAGE_SIZE_SET,
  payload: size,
})

export const setFilters = (filters) => ({
  type: types.FILTERS_SET,
  payload: filters,
})

export const setPage = (page) => ({ type: types.PAGE_SET, payload: page })

export const setReset = (reset) => ({ type: types.RESET, payload: reset })

export const removeCards = () => ({ type: types.REMOVED_CARDS })
