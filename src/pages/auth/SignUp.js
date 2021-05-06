import { useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { signUp } from '../../redux/auth/actions'

function SignUpUI(props) {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleUsernameChange = (e) => {
    setUsername(e.target.value)
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const handleLogin = () => {
    props.signUp(username, email, password)
  }

  return (
    <div className="mt-20">
      <h1>Login</h1>

      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col mx-auto md:w-1/2 lg:w-1/4">
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
            onChange={handleUsernameChange}
          />
        </div>

        <div className="mb-4">
          <label
            className="text-left ml-5 block text-gray-500 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>

          <input
            className="shadow appearance-none border rounded w-full py-2 px-3"
            id="email"
            type="email"
            onChange={handleEmailChange}
          />
        </div>

        <div className="mb-6">
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

        <div className="flex items-center justify-between">
          <button
            className="text-white bg-blue-500 hover:bg-blue-800 font-bold py-2 px-4 rounded"
            type="button"
            onClick={handleLogin}
          >
            Sign In
          </button>

          <Link
            to="/signin"
            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
          >
            Have an account??
          </Link>
        </div>
      </div>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => ({
  signUp: (username, email, password) =>
    dispatch(signUp(username, email, password)),
})

export const SignUp = connect(null, mapDispatchToProps)(SignUpUI)
