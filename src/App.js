import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute.js'
import history from './utils/history'
import Welcome from './components/Welcome.js'
import SignIn from './components/SignIn.js'
import ListFollowing from './components/followers/ListFollowing.js'
import Profile from './components/user/Profile.js'
import ListUsers from './components/user/ListUsers.js'
import Header from './components/Header.js'
import UserProfile from './components/user/UserProfile.js'

function App() {
  return (
    <Router history={history}>
      <div>
        <Header />
        <Switch>
          <PrivateRoute path='/friend/:id' component={UserProfile} />
          <PrivateRoute path='/user/:id' component={UserProfile} />
          <PrivateRoute path='/explore' component={ListUsers} />
          <PrivateRoute path='/profile/:id' component={Profile} />
          <PrivateRoute path='/following' component={ListFollowing} />
          <Route exact path='/' component={Welcome} />
          <Route path='/signup' component={SignIn} />
          <Route path='/signin' component={SignIn} />
        </Switch>
      </div>
    </Router>
  )
}

export default App
