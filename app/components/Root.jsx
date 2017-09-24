import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import store from '../store'
import { fetchCampuses, fetchStudents } from '../reducers' 
import Nav from './Nav'
import Campuses from './Campuses'
import CampusForm from './CampusForm'
import Students from './Students'
import StudentForm from './StudentForm'

export default class Root extends Component {
  componentDidMount() {
    store.dispatch(fetchCampuses())
    store.dispatch(fetchStudents())
  }

  render() {
    return (
      <div>
        <Nav />

        <Route exact path='/campuses' component={ Campuses }/>
        <Route exact path='/campuses/:id' component={ CampusForm }/>
        <Route exact path='/add-campus' component={ CampusForm }/>
        <Route exact path='/students' component={ Students }/>
        <Route exact path='/students/:id' component={ StudentForm }/>
        <Route exact path='/add-student' component={ StudentForm }/>
      </div>
    )
  }
}
