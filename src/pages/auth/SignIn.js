import { useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { signIn } from '../../redux/auth/actions'

function SignInUI(props) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleUsernameChange = (e) => {
    setUsername(e.target.value)
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const handleLogin = () => {
    props.signIn(username, password)
  }

  return (
    <div className="mt-20">
      <h1>Sign in</h1>

      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col mx-auto md:max-w-sm">
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

        <div className="grid grid-cols-1 md:grid-cols-7 justify-items-center">
          <button
            className="md:col-span-3 md:justify-self-start text-white bg-blue-500 hover:bg-blue-800 font-bold py-2 px-4 rounded "
            type="button"
            onClick={handleLogin}
          >
            Sign In
          </button>

          <Link
            to="/reset-password"
            className="mt-5 md:mt-0 md:col-span-2 font-bold text-sm text-blue-500 hover:text-blue-800"
          >
            Forgot Password?
          </Link>
          <Link
            to="/signup"
            className="md:col-span-2 font-bold text-sm text-blue-500 hover:text-blue-800"
          >
            No account?
          </Link>
        </div>
      </div>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => ({
  signIn: (username, password) => dispatch(signIn(username, password)),
})

export const SignIn = connect(null, mapDispatchToProps)(SignInUI)
