import { useEffect } from 'react'
import { connect } from 'react-redux'

import { signOut } from '../redux/auth/actions'

function SignoutUI(props) {
  useEffect(() => {
    props.signOut()
    // eslint-disable-next-line
  }, [])

  return <p>Signing out...</p>
}

const mapDispatchToProps = (dispatch) => ({
  signOut: () => dispatch(signOut()),
})

export const Signout = connect(null, mapDispatchToProps)(SignoutUI)
