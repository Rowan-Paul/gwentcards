import * as types from './types'

let api = process.env.REACT_APP_API

// sign in
export const signIn = (username, email, password) => (dispatch) => {
  const url = `${api}/auth/signin`
  const body = {
    username: username,
    email: email,
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
