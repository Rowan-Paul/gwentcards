import * as types from './types'

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
        let cards = response.cards

        response.cards.forEach((card) => {
          card.locations.forEach((location) => {
            if (getState().cards.collectedCards.includes(location._id)) {
              // remove card from cards
              for (var i = 0; i < cards.length; i++) {
                if (cards[i]._id === card._id) {
                  cards.splice(i, 1)
                }
              }
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
      } else {
        dispatch({
          type: types.FETCHED_CARDS,
          payload: response,
        })
      }
    })
    .catch((err) => {
      console.log('Failed to fetch cards', err)
    })
}

// fetch collect card
export const fetchCollectedCards = () => (dispatch, getState) => {
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
    .catch((error) => {
      console.log('Failed to fetch collected cards', error)
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
      } else {
        throw new Error('Not logged in')
      }
    })
    .catch((error) => {
      console.log('Failed to collect card', error)
      dispatch({ type: types.COLLECTED_CARD, payload: data })
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
