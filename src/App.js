import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute.js'
import history from './utils/history'
import Welcome from './components/Welcome.js'
import SignIn from './components/SignIn.js'

function App() {
  return (
    <Router history={history}>
      <div>
        <Switch>
          <Route exact path='/' component={Welcome} />
          <Route path='/signup' component={SignIn} />
          <Route path='/signin' component={SignIn} />
        </Switch>
      </div>
    </Router>
  )
}

export default App