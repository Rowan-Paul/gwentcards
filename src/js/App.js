import { BrowserRouter as Router, Route } from 'react-router-dom'
import { PublicRoute, PrivateRoute } from 'react-private-public-route'
import { connect } from 'react-redux'

import { Home } from './homepage/Home'
import { SignIn } from './auth/SignIn'

function AppUI(props) {
  return (
    <Router>
      <div className="p-10 text-center">
        <PublicRoute exact path="/" component={Home} />
        <PrivateRoute
          exact
          isAuthenticated={!props.signedIn}
          redirect="/"
          path="/signin"
          component={SignIn}
        />
      </div>
    </Router>
  )
}

const mapStateToProps = (state) => ({
  signedIn: state.auth.signedIn,
})

export const App = connect(mapStateToProps, null)(AppUI)
