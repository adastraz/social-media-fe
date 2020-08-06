import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import history from './utils/history'
import Welcome from './components/Welcome'
import SignUp from './components/SignUp'
import SignIn from './components/SignIn'

function App() {
  return (
    <Router history={history}>
      <div>
        <Switch>
        <Route exact path='/' component={Welcome} />
          <Route path='/signup' component={SignUp} />
          <Route path='/signin' component={SignIn} />
        </Switch>
      </div>
    </Router>
  )
}

export default App
