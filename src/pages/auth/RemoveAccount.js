import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { removeAccount } from '../../redux/auth/actions'

function RemoveAccountUI(props) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [notice, setNotice] = useState('')

  const handleUsernameChange = (e) => {
    setUsername(e.target.value)
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const handleRemoveAccount = () => {
    props.removeAccount(username, password)
  }

  useEffect(() => {
    if (props.notice?.type === 'auth') {
      setNotice(props.notice?.message)
    }
  }, [props.notice.type, props.notice.message])

  return (
    <div className="mt-20">
      <h1>Remove account</h1>

      <div className="text-black bg-white shadow-md rounded px-8 pt-6 pb-8 my-4 flex flex-col mx-auto md:w-1/2 lg:w-1/4">
        <div className="mb-4">
          <label
            className="text-left ml-5 block text-gray-500 text-sm font-bold mb-2"
            htmlFor="username"
          >
            Username
          </label>

          <input
            className="shadow appearance-none border rounded w-full py-2 px-3"
            id="username"
            type="text"
            placeholder="Fill in username or email..."
            onChange={handleUsernameChange}
          />
        </div>

        <div className="mb-1">
          <label
            className="text-left ml-5 block text-gray-500 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>

          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 mb-3"
            id="password"
            type="password"
            onChange={handlePasswordChange}
          />
        </div>

        <span className="text-red-600 mb-6">{notice}</span>

        <div className="grid lg:grid-cols-10 gap-5 justify-items-center">
          <button
            className="col-span-6 md:justify-self-start text-white bg-blue-500 hover:bg-blue-800 font-bold py-2 px-4 rounded "
            type="button"
            onClick={handleRemoveAccount}
          >
            Remove Account
          </button>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  notice: state.main.notice,
})

const mapDispatchToProps = (dispatch) => ({
  removeAccount: (username, password) =>
    dispatch(removeAccount(username, password)),
})

export const RemoveAccount = connect(
  mapStateToProps,
  mapDispatchToProps
)(RemoveAccountUI)
