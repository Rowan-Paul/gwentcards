import * as types from './types'
import { setNotice } from '../main/actions'

const api = process.env.REACT_APP_API

// sign in
export const signIn = (username, password) => {
  const url = `${api}/auth`
  const body = {
    username,
    password,
  }

  return (dispatch) =>
    fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        console.log('response', response)
        if (response?.status === 200) {
          return response.json()
        }
        throw response.statusText
      })
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
  })
    .then(() =>
      dispatch({
        type: types.SIGNED_OUT,
      })
    )
    .catch(() => {
      dispatch(setNotice({ message: 'Failed to sign out', type: 'auth' }))
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
      }
      throw response.statusText
    })
    .then((response) => {
      dispatch({
        type: types.SIGNED_IN,
        payload: response,
      })
    })
    .catch(() => {
      dispatch(signOut())
    })
}

// sign up
export const signUp = (username, email, password) => (dispatch) => {
  const url = `${api}/auth`
  const body = {
    username,
    email,
    password,
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
      }
      throw response.statusText
    })
    .then((response) =>
      dispatch({
        type: types.SIGNED_IN,
        payload: response,
      })
    )
    .catch(() => {
      dispatch(
        setNotice({
          message: 'You must enter a unique username and email',
          type: 'auth',
        })
      )
    })
}

// reset password -- send email
export const resetPasswordRequest = (username) => (dispatch) => {
  const url = `${api}/auth/reset`
  const body = {
    username,
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
        })
        dispatch(
          setNotice({ message: 'Send email to email address', type: 'success' })
        )
      } else {
        throw response.statusText
      }
    })
    .catch(() => {
      dispatch(
        setNotice({ message: 'No account known with that email', type: 'auth' })
      )
    })
}

// reset password
export const resetPassword = (token, password) => (dispatch) => {
  const url = `${api}/auth/reset`
  const body = {
    token,
    password,
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
        })

        dispatch(setNotice({ message: 'Password updated', type: 'auth' }))
      } else {
        throw response.statusText
      }
    })
    .catch(() => {
      dispatch(
        setNotice({ message: 'Failed to update password', type: 'auth' })
      )
    })
}

// remove account
export const removeAccount = (username, password) => (dispatch) => {
  const url = `${api}/auth/account`
  const body = {
    username,
    password,
  }

  fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
    .then((response) => {
      if (response.status === 201) {
        dispatch({
          type: types.DELETED_ACCOUNT,
        })
        dispatch(
          setNotice({
            message: 'Deleted account',
            type: 'success',
          })
        )
      } else {
        throw response.statusText
      }
    })
    .catch(() => {
      dispatch(
        setNotice({ message: 'Email and/or password incorrect', type: 'auth' })
      )
    })
}

// verify email
export const verifyEmail = (token) => (dispatch) => {
  const url = `${api}/auth/account/verify`
  const body = {
    token,
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
          type: types.VERIFIED_EMAIL,
        })

        dispatch(
          setNotice({
            message: 'Email has been verified',
            type: 'success',
          })
        )
      } else {
        throw response.statusText
      }
    })
    .catch(() => {
      dispatch(setNotice({ message: 'Failed to verify email', type: 'error' }))
    })
}
