import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import store from '../store'
import { fetchAllCampus, fetchAllStudents } from '../reducers'
import Nav from './Nav'
import AllCampus from './AllCampus'
import Campus from './Campus'
import AllStudents from './AllStudents'
import Student from './Student'
import AddStudent from './AddStudent'

export default class Root extends Component {
  componentDidMount() {
    store.dispatch(fetchAllCampus())
    store.dispatch(fetchAllStudents())
  }

  render() {

    return (
      <div>
        <Nav />

        <Route exact path='/campus' component={ AllCampus }/>
        <Route exact path='/campus/:id' component={ Campus }/>
        <Route exact path='/students' component={ AllStudents }/>
        <Route exact path='/students/:id' component={ AddStudent }/>
        <Route exact path='/add-student' component={ AddStudent }/>
     </div>
    )
  }
}
