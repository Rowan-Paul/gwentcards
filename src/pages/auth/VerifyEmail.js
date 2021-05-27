import { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import queryString from 'query-string'

import { verifyEmail } from '../../redux/auth/actions'

function VerifyEmailUI(props) {
  useEffect(() => {
    const parsed = queryString.parse(props.location.search)
    if (parsed.token) {
      props.verifyEmail(parsed.token)
    } else {
      props.history.push('/signin')
    }
    // eslint-disable-next-line
  }, [])

  return (
    <div className="mt-20">
      <h1>Thank you</h1>

      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col mx-auto md:w-1/2 lg:w-1/4">
        <p>For verifying your email with us.</p>
        <Link to="/">Go to the homepage</Link>
      </div>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => ({
  verifyEmail: (token) => dispatch(verifyEmail(token)),
})

export const VerifyEmail = connect(
  null,
  mapDispatchToProps
)(withRouter(VerifyEmailUI))
