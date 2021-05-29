import * as types from './types'
import { removeItemOnce } from '../../utils'
import { setNotice } from '../main/actions'

let api = process.env.REACT_APP_API

// fetch cards
export const fetchCards = () => (dispatch, getState) => {
  let url = `${api}/cards`
  let parameters = []
  const filters = getState().cards.filters

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
      for (var i = 1; i < parameters.length; i++) {
        url += `&${parameters[i]}`
      }
    }
  }

  fetch(url)
    .then((response) => {
      return response.json()
    })
    .then((response) => {
      localStorage.setItem('cards', JSON.stringify(response))

      if (filters.showCollectedCards) {
        let cards = []

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
        let cards = []
        let toRemove = []

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
export const fetchCollectedCards = () => (dispatch) => {
  let url = `${api}/users/cards`

  fetch(url)
    .then((response) => response.json())
    .then((response) => {
      if (response.amount > 0) {
        dispatch({ type: types.FETCHED_COLLECTED_CARDS, payload: response })
      } else {
        throw new Error('No collected cards')
      }
    })
    .catch((err) => {
      console.log('Failed to fetch collected cards')
    })
}

// collect card
export const collectCard = (card) => (dispatch, getState) => {
  let url = `${api}/users/cards`
  const data = { collected: [...getState().cards.collectedCards, card] }

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
        dispatch({ type: types.COLLECTED_CARD, payload: response })
        dispatch(setNotice({ message: 'Collected card', type: 'success' }))
      } else {
        throw new Error('Not logged in')
      }
    })
    .catch(() => {
      dispatch({ type: types.COLLECTED_CARD, payload: data })
      dispatch(setNotice({ message: 'Card saved locally', type: 'success' }))
    })
}

// uncollect card
export const uncollectCard = (card) => (dispatch, getState) => {
  let url = `${api}/users/cards`
  const data = { card }

  fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.status === 201) {
        let newArray = []
        if (getState().cards.collectedCards?.length > 1) {
          newArray = removeItemOnce(getState().cards.collectedCards, card)
        }

        dispatch({ type: types.UNCOLLECTED_CARD, payload: newArray })
        dispatch(setNotice({ message: 'Removed card', type: 'success' }))
      } else {
        throw new Error('Not logged in')
      }
    })
    .catch(() => {
      dispatch(setNotice({ message: 'Failed to remove cards', type: 'error' }))
    })
}

export const setPageSize = (size) => {
  return { type: types.PAGE_SIZE_SET, payload: size }
}

export const setFilters = (filters) => {
  return { type: types.FILTERS_SET, payload: filters }
}

export const setPage = (page) => {
  return { type: types.PAGE_SET, payload: page }
}

export const setReset = (reset) => {
  return { type: types.RESET, payload: reset }
}

export const removeCards = () => {
  return { type: types.REMOVED_CARDS }
}
