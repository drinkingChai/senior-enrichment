import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import store from '../store'
import { fetchCampus, fetchStudents } from '../reducers' 

export default class Root extends Component {
  componentDidMount() {
    store.dispatch(fetchCampus())
    store.dispatch(fetchStudents())
  }

  render() {
    return (
      <div>
      </div>
    )
  }
}
