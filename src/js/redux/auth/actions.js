import * as types from './types'

let api = process.env.REACT_APP_API

// sign in
export const signIn = (username, password) => (dispatch) => {
  const url = `${api}/auth/signin`
  const body = {
    username: username,
    password: password,
  }

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
    .then((response) => response.json())
    .then((response) =>
      dispatch({
        type: types.SIGNED_IN,
        payload: response,
      })
    )
}

// sign out
export const signOut = () => (dispatch) => {
  const url = `${api}/auth`

  fetch(url, {
    method: 'DELETE',
  }).then(() =>
    dispatch({
      type: types.SIGNED_OUT,
    })
  )
}
