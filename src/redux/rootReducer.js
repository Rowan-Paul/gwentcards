import { combineReducers } from 'redux'

import { authReducer } from './auth/reducer'
import { cardsReducer } from './cards/reducer'
import { mainReducer } from './main/reducer'

const rootReducer = combineReducers({
  auth: authReducer,
  cards: cardsReducer,
  main: mainReducer,
})

export default rootReducer
