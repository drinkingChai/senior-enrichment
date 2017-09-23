import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import store  from '../store'
import { deleteStudent } from '../reducers'

const AllStudents = (props)=> {
  const { students } = props.state

  return (
    <div>
      {
        students.map(student=> (
          <div key={ student.id }>
            <Link to={ `/students/${student.id}` }>{ student.name }</Link>
            <button value={ student.id } onClick={ ()=> props.removeStudent(student.id) }>Delete</button>
          </div>
        ))
      }
      <Link to='/add-student'>Add Student</Link>
    </div>
  )
}

const mapStateToProps = (state)=> {
  return {
    state
  }
}

const mapDispatchToProps = (dispatch)=> {
  return {
    removeStudent: (studentId)=> dispatch(deleteStudent(studentId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllStudents) 
