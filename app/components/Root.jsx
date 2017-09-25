import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import store from '../store'
import { fetchAllCampuses, fetchAllStudents } from '../reducers'
import Nav from './Nav'
import AllCampuses from './AllCampuses'
import AllStudents from './AllStudents'

export default class Root extends Component {
  componentDidMount() {
    store.dispatch(fetchAllCampuses())
    store.dispatch(fetchAllStudents())
  }

  render() {
    return (
      <div>
        <Nav />

        <Route exact path='/campuses' component={ AllCampuses }/>
        <Route exact path='/students' component={ AllStudents }/>
      </div>
    )
  }
}
