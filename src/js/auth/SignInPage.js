import { useEffect, useState } from 'react'
import { connect } from 'react-redux'

import { signIn } from '../redux/auth/actions'

function SignInPageUI(props) {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = () => {
    props.signIn('rpf', 'mail@example.com', 'password')
  }

  return (
    <div>
      <button onClick={handleLogin}>Login</button>
      <br></br>
      <button
        onClick={() =>
          fetch('/api/v1/cards', {
            method: 'GET',
          }).then(() => console.log('SUCCES'))
        }
      >
        Fetch
      </button>
    </div>
  )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({
  signIn: (username, email, password) =>
    dispatch(signIn(username, email, password)),
})

export const SignInPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(SignInPageUI)
