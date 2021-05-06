import { combineReducers } from 'redux'

import { cardsReducer } from './cards/reducer'
import { authReducer } from './auth/reducer'

const rootReducer = combineReducers({
  cards: cardsReducer,
  auth: authReducer,
})

export default rootReducer
