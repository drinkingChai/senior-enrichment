import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import store  from '../store'
import { fetchAllStudents } from '../reducers'

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

  render() {
    const { students } = this.state

    return (
      <div>
        {
          students.map(student=> (
            <div key={ student.id }>
              <Link to={ `/students/${student.id}` }>{ student.name }</Link>
            </div>
          ))
        }
      </div>
    )
  }
}
