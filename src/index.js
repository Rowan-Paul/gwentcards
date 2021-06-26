import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { CloudinaryContext } from 'cloudinary-react'

import { App } from './App'
import store from './redux/store'
import './index.css'
import reportWebVitals from './reportWebVitals'
import * as serviceWorkerRegistration from './serviceWorkerRegistration'

require('dotenv').config()

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <CloudinaryContext cloudName={process.env.REACT_APP_CLOUDINARY_ID}>
        <App />
      </CloudinaryContext>
    </React.StrictMode>
  </Provider>,
  document.getElementById('root'),
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()

serviceWorkerRegistration.register()
