import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import logger from  'redux-logger'
import 'bootstrap/dist/css/bootstrap.min.css'
import { reducer } from './reducers'
import { BrowserRouter as Router } from 'react-router-dom'
import history from './utils/history'

const store = createStore(reducer, applyMiddleware(thunk, logger))

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
)


