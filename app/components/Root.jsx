import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import store from '../store'
import Nav from './Nav'
import AllCampuses from './AllCampuses'
import Campus from './Campus'
import AddStudents from './AddStudents'
import AllStudents from './AllStudents'
import Student from './Student'

export default class Root extends Component {
  render() {
    return (
      <div>
        <Nav />

        <div>
          <Route exact path='/campuses' component={ AllCampuses }/>
          <Route exact path='/campuses/:id' component={ Campus }/>
          <Route exact path='/add-new-campus' component={ Campus }/>
          <Route exact path='/campuses/:id/add-students' component={ AddStudents }/>
          <Route exact path='/students' component={ AllStudents }/>
          <Route exact path='/students/:id' component={ Student }/>
          <Route exact path='/add-new-student' component={ Student }/>
        </div>
      </div>
    )
  }
}
