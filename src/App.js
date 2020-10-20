import React from 'react'
import { Route, Switch } from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute.js'
import history from './utils/history'
import Welcome from './components/Welcome.js'
import SignIn from './components/SignIn.js'
import ListFollowing from './components/followers/ListFollowing.js'
import Profile from './components/profile/Profile.js'
import ListUsers from './components/helpers/ListUsers.js'
import Header from './components/Header.js'
import UserProfile from './components/profile/UserProfile.js'
import Post from './components/helpers/Post.js'

function App() {
  return (
    <div>
      <Header />
      <Switch>
        <PrivateRoute path='/friend/:id' component={UserProfile} />
        <PrivateRoute path='/user/:id' component={UserProfile} />
        <PrivateRoute path='/explore' component={ListUsers} />
        <PrivateRoute path='/profile/:id' component={Profile} />
        <PrivateRoute path='/post/:id' component={Post} />
        <PrivateRoute path='/following' component={ListFollowing} />
        <Route exact path='/' component={Welcome} />
        <Route path='/signup' component={SignIn} />
        <Route path='/signin' component={SignIn} />
      </Switch>
    </div>
  )
}

export default App
