'use strict'
import React from 'react'
import { HashRouter as Router } from 'react-router-dom'
import {render} from 'react-dom'
import { Provider } from 'react-redux'

import store from './store'
import Root from './components/Root'

render (
  <Router>
    <Provider store={store}>
      <Root/>
    </Provider>
  </Router>,
  document.getElementById('main')
)
