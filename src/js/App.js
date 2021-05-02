import { BrowserRouter as Router, Route } from 'react-router-dom'

import { HomePage } from './homepage/Homepage'
import { SignInPage } from './auth/SignInPage'

function App() {
  return (
    <Router>
      <div className="p-10 text-center">
        <Route exact path="/" component={HomePage} />
        <Route exact path="/signin" component={SignInPage} />
      </div>
    </Router>
  )
}

export default App
