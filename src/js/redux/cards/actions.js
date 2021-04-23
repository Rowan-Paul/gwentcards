import * as types from './types'

let api = 'http://localhost:3000/api/v1'

// fetch cards
export const fetchCards = () => (dispatch) => {
  const url = `${api}/cards/card`

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
