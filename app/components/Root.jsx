import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import store from '../store'
import { fetchCampuses, fetchStudents } from '../reducers'
import Nav from './Nav'
import AllCampuses from './AllCampuses'
import Campus from './Campus'
import AllStudents from './AllStudents'

export default class Root extends Component {
  componentDidMount() {
    store.dispatch(fetchCampuses())
    store.dispatch(fetchStudents())
  }

  render() {
    return (
      <div>
        <Nav />

        <Route exact path='/campuses' component={ AllCampuses }/>
        <Route exact path='/campuses/:id' component={ Campus }/>
        <Route exact path='/students' component={ AllStudents }/>
      </div>
    )
  }
}
