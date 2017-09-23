import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import store from '../store'

const AllCampus = (props)=> {
  const { campus } = props.state

  return (
    <div>
    {
      campus.map(camp=> (
        <div key={ camp.id }>
          <Link to={ `/campus/${camp.id}` }>{ camp.name } { camp.students.length }</Link>
        </div>
      ))
    }
    </div>
  )
}

const mapStateToProps = (state)=> {
  return {
    state
  }
}

export default connect(mapStateToProps)(AllCampus)

// <Route exact path={ `/campus/${camp.id}` } component={ SingleCampus }/>
