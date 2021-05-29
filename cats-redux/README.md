# Cats

1. create react app

```
npx create-react-app cats-redux
```

2. cleanup react boiler plate

3. install dependencies

```
yarn add redux react-redux redux-sagas

```

4. create directory `src/redux`

5. create file `src/redux/types.js`

```javascript
export default const ACTION_TYPES = {
  INITIALIZE_APP: 'INITIALIZE_APP'
}
```

5. create file `src/redux/sagas.js`

```javascript
import ACTION_TYPES from './types'
import { all, fork, spawn, call, put, select, race, take, takeLatest, takeEvery } from 'redux-saga/effects'

function* initializeApp(action) {
}

function* mainSaga() {
  yield takeLatest(ACTION_TYPES.INITIALIZE_APP, initializeApp)
}

export default function* rootSaga() {
  yield all(mainSaga()) //postsSaga()
}
```

6. create file `src/redux/reducer.js`

```javascript
import { combineReducers } from 'redux'
// import postReducer from './postReducer'

export default combineReducers({
  // posts: postReducer
})

```

7. create file `src/redux/store.js`

```javascript
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

import rootReducer from './reducer'

const initialState = {}

const middleware = [
  thunk
]

const composure = [
  applyMiddleware(...middleware)
]

if (window.__REDUX_DEVTOOLS_EXTENSION__) {
  composure.push(window.__REDUX_DEVTOOLS_EXTENSION__())
}

const store = createStore(rootReducer, initialState, compose(...composure))

export default store
```

8. create provider in App

```javascript
import { Provider } from 'react-redux'

function App() {
  return (
    <Provider store={store}>
      <p>Hello, from React!</p>
    </Provider>
  );
}

export default App;
```

9. create component action types in `./redux/posts/types.js`

```javascript
export const FETCH_POSTS = 'FETCH_POSTS'
export const NEW_POST = 'NEW_POST'
```


10. create reducer component in `./redux/posts/reducer.js`

```javascript
import { FETCH_POSTS, NEW_POST } from './types'

const initialState = {
  items: []
  item: {}
}

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_POSTS:
      return {
        ...state,
        items: action.payload
      }
    default:
      return state
  }
}
```

11. create actions component in `./redux/posts/actions.js`

NOTE: using thunk middleware we can write async action as well

```javascript
import { FETCH_POSTS, NEW_POST } from './types'

export const fetchPosts = () => dispatch => {
  fetch(URL)
    .then(res => res.json())
    .then(posts => dispatch({
      type: FETCH_POSTS,
      payload: posts
    }))
}
```

12. useSelector

```javascript
const { useSelector, useDispatch } from 'react-redux'

const state = useSelector(state => state.posts.items)
```

13. useDispatch

```javascript
const { useSelector, useDispatch } from 'react-redux'

const dispatch = useDispatch()
```
