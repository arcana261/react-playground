import './App.css'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { useState } from 'react'

import Context from './Context'
import { State } from './Models'

import HomePage from './pages/HomePage'

function App() {
  const [appState, setAppState] = useState<State>({})

  return (
    <Context.Provider value={[appState, setAppState]}>
      <Router>
        <Switch>
          <Route path='/'>
            <HomePage />
          </Route>
        </Switch>
      </Router>
    </Context.Provider>
  );
}

export default App;
