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
      .catch(() => {
        dispatch(setNotice({ message: 'Failed to sign in', type: 'auth' }))
      })
}

// sign out
export const signOut = () => {
  const url = `${api}/auth`

  return (dispatch) =>
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
export const verify = () => {
  const url = `${api}/auth`

  return (dispatch) =>
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
export const signUp = (username, email, password) => {
  const url = `${api}/auth`
  const body = {
    username,
    email,
    password,
  }

  return (dispatch) =>
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
      .then((response) => {
        dispatch({
          type: types.SIGNED_IN,
          payload: response,
        })
        dispatch(
          setNotice({
            message: 'Check your email for verification mail',
            type: 'success',
          })
        )
      })
      .catch((error) => {
        if (error === "Couldn't send email, but did make an account") {
          dispatch({
            type: types.SIGNED_IN,
            payload: response,
          })
          dispatch(
            setNotice({
              message: error,
              type: 'error',
            })
          )
        }
        dispatch(
          setNotice({
            message: 'You must enter a unique username and email',
            type: 'auth',
          })
        )
      })
}

// reset password -- send email
export const resetPasswordRequest = (username) => {
  const url = `${api}/auth/reset`
  const body = {
    username,
  }

  return (dispatch) =>
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
            setNotice({
              message: 'Send email to email address',
              type: 'success',
            })
          )
        } else {
          throw response.statusText
        }
      })
      .catch(() => {
        dispatch(
          setNotice({
            message: 'No account known with that email',
            type: 'auth',
          })
        )
      })
}

// reset password
export const resetPassword = (token, password) => {
  const url = `${api}/auth/reset`
  const body = {
    token,
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
export const removeAccount = (username, password) => {
  const url = `${api}/auth/account`
  const body = {
    username,
    password,
  }

  return (dispatch) =>
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
          setNotice({
            message: 'Email and/or password incorrect',
            type: 'auth',
          })
        )
      })
}

// verify email
export const verifyEmail = (token) => {
  const url = `${api}/auth/account/verify`
  const body = {
    token,
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
        dispatch(
          setNotice({ message: 'Failed to verify email', type: 'error' })
        )
      })
}
