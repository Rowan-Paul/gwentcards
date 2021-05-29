import React from 'react'
import { connect } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'

function FooterUI(props) {
  const noFooterPages = [
    '/signin',
    '/signup',
    '/remove-account',
    '/reset-password',
    '/verify-account',
  ]
  const location = useLocation()

  if (noFooterPages.includes(location.pathname)) {
    return ''
  } else {
    return (
      <footer className="grid grid-cols-1 md:grid-cols-6 text-left md:text-center">
        <span className="md:col-span-6">
          Copyright &copy; {new Date().getFullYear()} Rowan Paul Flynn <br></br>
        </span>
        <span className="md:col-start-2">
          <a href="https://github.com/Rowan-Paul/gwentcards">
            Frontend repository
          </a>
        </span>
        <span>
          <a href="https://github.com/Rowan-Paul/gwentcards">
            Backend repository
          </a>
        </span>

        <span>
          {props.signedIn ? (
            <Link to="/remove-account">Remove account</Link>
          ) : (
            <Link to="/signup">Create account</Link>
          )}
        </span>

        <span className="md:col-end-6">
          <a href="mailto:contact@rowanpaulflynn.com">Contact us</a>
        </span>
      </footer>
    )
  }
}

const mapStateToProps = (state) => ({
  signedIn: state.auth.signedIn,
})

export const Footer = connect(mapStateToProps, null)(FooterUI)
