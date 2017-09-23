import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import store from '../store'

const Campus = (props)=> {
  const id = props.match.params.id * 1
  const campus = props.state.campus.find(camp=> camp.id == id)

  return (
    <div>
      { 
        campus && campus.students && campus.students.map(student=> (
          <div key={ student.id }>
            <Link to={ `/students/${student.id}` }>{ student.name }</Link>
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

export default connect(mapStateToProps)(Campus)
