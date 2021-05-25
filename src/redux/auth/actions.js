import * as types from './types'

let api = process.env.REACT_APP_API

// sign in
export const signIn = (username, password) => (dispatch) => {
  const url = `${api}/auth`
  const body = {
    username: username,
    password: password,
  }

  fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
    .then((response) => {
      if (response.status === 200) {
        return response.json()
      } else {
        throw response.statusText
      }
    })
    .then((response) =>
      dispatch({
        type: types.SIGNED_IN,
        payload: response,
      })
    )
    .catch(() => {
      console.log('Failed to sign in')
    })
}

// sign out
export const signOut = () => (dispatch) => {
  const url = `${api}/auth`

  fetch(url, {
    method: 'DELETE',
  })
    .then(() =>
      dispatch({
        type: types.SIGNED_OUT,
      })
    )
    .catch(() => {
      console.log('Failed to sign out')
    })
}

// verify
export const verify = () => (dispatch) => {
  const url = `${api}/auth`

  fetch(url, {
    method: 'GET',
  })
    .then((response) => {
      if (response.status === 200) {
        return response.json()
      } else {
        throw response.statusText
      }
    })
    .then((response) => {
      dispatch({
        type: types.SIGNED_IN,
        payload: response,
      })
    })
    .catch((err) => {
      console.log('Failed to verify', err)
      dispatch(signOut())
    })
}

// sign up
export const signUp = (username, email, password) => (dispatch) => {
  const url = `${api}/auth`
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
    .then((response) => {
      if (response.status === 201) {
        return response.json()
      } else {
        throw response.statusText
      }
    })
    .then((response) =>
      dispatch({
        type: types.SIGNED_IN,
        payload: response,
      })
    )
    .catch((err) => {
      console.log('Failed to sign up', err)
    })
}

// reset password -- send email
export const resetPasswordRequest = (username) => (dispatch) => {
  const url = `${api}/auth/reset`
  const body = {
    username: username,
  }

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
    .then((response) => {
      if (response.status === 201) {
        dispatch({
          type: types.RESET_MAIL_SENT,
          payload: response,
        })
      } else {
        throw response.statusText
      }
    })
    .catch((err) => {
      console.log('Failed to request reset mail', err)
    })
}

// reset password
export const resetPassword = (token, password) => (dispatch) => {
  const url = `${api}/auth/reset`
  const body = {
    token: token,
    password: password,
  }

  fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
    .then((response) => {
      if (response.status === 201) {
        dispatch({
          type: types.PASSWORD_CHANGED,
          payload: response,
        })
      } else {
        throw response.statusText
      }
    })
    .catch((err) => {
      console.log('Failed to update password', err)
    })
}
