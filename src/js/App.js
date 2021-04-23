import { BrowserRouter as Router, Route } from 'react-router-dom'

import { HomePage } from './homepage/Homepage'

function App() {
  return (
    <Router>
      <div className="p-10 text-center">
        <Route exact path="/" component={HomePage} />
      </div>
    </Router>
  )
}

export default App
