import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import store from '../store'

const Student = (props)=> {
  const student = props.state.students.find(s=> s.id == props.match.params.id*1)

  if (!student) return <div></div>
  return (
    <div>
      <p>{ student.name }</p>
      { student.campus ?
        <Link to={ `/campus/${ student.campus.id }` }>{ student.campus.name }</Link> : null
      }
    </div>
  )
}

const mapStateToProps = (state)=> {
  return {
    state
  }
}

export default connect(mapStateToProps)(Student)
