import { BrowserRouter as Router, Route } from 'react-router-dom'

import { Home } from './homepage/Home'
import { SignIn } from './auth/SignIn'

function App() {
  return (
    <Router>
      <div className="p-10 text-center">
        <Route exact path="/" component={Home} />
        <Route exact path="/signin" component={SignIn} />
      </div>
    </Router>
  )
}

export default App
