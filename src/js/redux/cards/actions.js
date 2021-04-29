import * as types from './types'

let api = 'http://localhost:3000/api/v1'

// fetch cards
export const fetchCards = (deck, row, strength, abilities, effect) => (
  dispatch
) => {
  let url = `${api}/cards`
  let parameters = []

  if (deck) {
    parameters.push(`deck=${deck}`)
  }
  if (row) {
    parameters.push(`row=${row}`)
  }
  if (strength) {
    parameters.push(`strength=${strength}`)
  }
  if (abilities) {
    parameters.push(`abilities=${abilities}`)
  }
  if (effect) {
    parameters.push(`effect=${effect}`)
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
    .then((response) =>
      dispatch({
        type: types.FETCHED_CARDS,
        payload: response,
      })
    )
}
