import { createStore, compose, applyMiddleware } from 'redux'
import rootReducer from './rootReducer'
import thunkMiddleware from 'redux-thunk'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'

let composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

if (process.env.NODE_ENV === 'production') composeEnhancers = compose

const persistConfig = {
  key: 'root',
  storage: storage,
  stateReconciler: autoMergeLevel2,
  blacklist: ['auth'],
}

const pReducer = persistReducer(persistConfig, rootReducer)

export const store = createStore(
  pReducer,
  composeEnhancers(applyMiddleware(thunkMiddleware))
)
export const persistor = persistStore(store)
