import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { connect } from 'react-redux'

import { NightModeIcon } from './NightModeIcon'

function NavBarUI(props) {
  const location = useLocation()

  if (location.pathname !== '/') {
    return (
      <div>
        <div className="absolute py-2 px-5 w-full">
          <Link to="/">Home</Link>

          {props.signedIn ? (
            <Link to="/signout" className="float-right">
              Sign out
            </Link>
          ) : (
            <Link to="/signin" className="float-right">
              Sign In
            </Link>
          )}
          <Link to="/about" className="float-right mr-2">
            About
          </Link>
          <span className="float-right mr-2">
            <NightModeIcon />
          </span>
        </div>
      </div>
    )
  }
  return (
    <div>
      <NightModeIcon />
      <div className="absolute top-0 right-0 my-2 mx-5">
        <Link to="/about" className="mr-2">
          About
        </Link>
        {props.signedIn ? (
          <Link to="/signout">Sign out</Link>
        ) : (
          <Link to="/signin">Sign In</Link>
        )}
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  signedIn: state.auth.signedIn,
})

export const NavBar = connect(mapStateToProps, null)(NavBarUI)
