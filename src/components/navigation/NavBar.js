import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { connect } from 'react-redux'

function NavBarUI(props) {
  const location = useLocation()

  if (location.pathname !== '/') {
    return (
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
      </div>
    )
  }
  return (
    <div className="absolute top-0 right-0 my-2 mx-5">
      {props.signedIn ? (
        <Link to="/signout">Sign out</Link>
      ) : (
        <Link to="/signin">Sign In</Link>
      )}
    </div>
  )
}

const mapStateToProps = (state) => ({
  signedIn: state.auth.signedIn,
})

export const NavBar = connect(mapStateToProps, null)(NavBarUI)
