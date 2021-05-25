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

        <div className="grid lg:grid-cols-10 gap-5 justify-items-center">
          <button
            className="col-span-6 md:justify-self-start text-white bg-blue-500 hover:bg-blue-800 font-bold py-2 px-4 rounded "
            type="button"
            onClick={handleLogin}
          >
            Sign In
          </button>

          <Link
            to="/reset-password"
            className="col-span-2 font-bold text-sm text-blue-500 hover:text-blue-800"
          >
            Forgot Password?
          </Link>
          <Link
            to="/signup"
            className="col-span-2 font-bold text-sm text-blue-500 hover:text-blue-800"
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
