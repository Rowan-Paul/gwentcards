import { useEffect } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { PublicRoute, PrivateRoute } from 'react-private-public-route'
import { connect } from 'react-redux'

import { Home } from './homepage/Home'
import { SignIn } from './auth/SignIn'
import { NavBar } from './components/NavBar'
import { Signout } from './auth/SignOut'
import { SignUp } from './auth/SignUp'

import { verify } from './redux/auth/actions'

function AppUI(props) {
  useEffect(() => {
    props.verify()
    // eslint-disable-next-line
  }, [])

  return (
    <Router>
      <NavBar />
      <div className="p-10 text-center">
        <PublicRoute exact path="/" component={Home} />
        <PrivateRoute
          exact
          isAuthenticated={!props.signedIn}
          redirect="/"
          path="/signin"
          component={SignIn}
        />
        <PrivateRoute
          exact
          isAuthenticated={props.signedIn}
          redirect="/"
          path="/signout"
          component={Signout}
        />
        <PrivateRoute
          exact
          isAuthenticated={!props.signedIn}
          redirect="/"
          path="/signup"
          component={SignUp}
        />
      </div>
    </Router>
  )
}

const mapStateToProps = (state) => ({
  signedIn: state.auth.signedIn,
})

const mapDispatchToProps = (dispatch) => ({
  verify: () => dispatch(verify()),
})

export const App = connect(mapStateToProps, mapDispatchToProps)(AppUI)
