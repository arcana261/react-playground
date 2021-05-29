import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import rootReducer from './reducer'
import rootSagas from './sagas'

const initialState = {}

const sagaMiddleware = createSagaMiddleware()

const middleware = [
  sagaMiddleware
]

const composure = [
  applyMiddleware(...middleware)
]

if (window.__REDUX_DEVTOOLS_EXTENSION__) {
  composure.push(window.__REDUX_DEVTOOLS_EXTENSION__())
}

const store = createStore(rootReducer, initialState, compose(...composure))

sagaMiddleware.run(rootSagas)

export default store
