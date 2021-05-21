import { combineReducers } from 'redux'

import { authReducer } from './auth/reducer'
import { cardsReducer } from './cards/reducer'

const rootReducer = combineReducers({
  auth: authReducer,
  cards: cardsReducer,
})

export default rootReducer
