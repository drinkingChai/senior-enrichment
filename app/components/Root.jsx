import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import store from '../store'
import { fetchAllCampus } from '../reducers'
import Nav from './Nav'
import AllCampus from './AllCampus'
import SingleCampus from './SingleCampus'

export default class Root extends Component {
  render() {

    return (
      <div>
        <Nav />

       <Route exact path='/campus' component={ AllCampus }/>
       <Route exact path='/campus/:id' component={ SingleCampus }/>
      </div>
    )
  }
}
