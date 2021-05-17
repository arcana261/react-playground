import 'bootstrap/dist/css/bootstrap.min.css';

import Context from './Context.js'
import { useState } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import LoginPage from './components/LoginPage.js'
import Header from './components/Header'

const App = () => {
  const [context, setContext] = useState({
    user: null,
  })

  return (
    <Context.Provider value={[context, setContext]}>
      <Router>
        <Header />
        <Switch>
          <Route path='/login' handler={LoginPage}>
            <LoginPage />
          </Route>
        </Switch>
      </Router>
    </Context.Provider>
  )
}

export default App
