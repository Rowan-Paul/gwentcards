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
  }
  return (
    <footer className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <span className="md:col-span-4">
        Copyright &copy; {new Date().getFullYear()}{' '}
        <a href="https://rowanpaulflynn.com/">Rowan Paul Flynn</a> <br />
      </span>

      <span>
        {props.signedIn ? (
          <Link to="/remove-account">Remove account</Link>
        ) : (
          <Link to="/signup">Create account</Link>
        )}
      </span>

      <span className="">
        <a href="mailto:contact@rowanpaulflynn.com">Contact us</a>
      </span>

      <span className="">
        <a href="https://github.com/Rowan-Paul/gwentcards">
          Frontend repository
        </a>
      </span>
      <span>
        <a href="https://github.com/Rowan-Paul/gwentapi">Backend repository</a>
      </span>
    </footer>
  )
}

const mapStateToProps = (state) => ({
  signedIn: state.auth.signedIn,
})

export const Footer = connect(mapStateToProps, null)(FooterUI)
