import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import { cardsReducer } from './cards/reducer'
import { authReducer } from './auth/reducer'

const cardsPersistConfig = {
  key: 'cards',
  storage: storage,
  blacklist: ['filters, page, reset'],
}

const rootReducer = combineReducers({
  cards: persistReducer(cardsPersistConfig, cardsReducer),
  auth: authReducer,
})

export default rootReducer
