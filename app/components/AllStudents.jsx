import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import store  from '../store'
import { fetchAllStudents, deleteStudent } from '../reducers'

export default class AllStudents extends Component {
  constructor() {
    super()
    this.state = store.getState()
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe(()=> {
      this.setState(store.getState())
    })

    store.dispatch(fetchAllStudents())
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  onDeleteHandler(ev) {
    store.dispatch(deleteStudent(ev.target.value))
  }

  render() {
    const { students } = this.state
    const { onDeleteHandler } = this

    return (
      <div>
        {
          students.map(student=> (
            <div key={ student.id }>
              <Link to={ `/students/${student.id}` }>{ student.name }</Link>
              <button value={ student.id } onClick={ onDeleteHandler }>Delete</button>
            </div>
          ))
        }
        <Link to='/add-student'>Add Student</Link>
      </div>
    )
  }
}
