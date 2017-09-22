import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import store from '../store'
import { fetchAllStudents } from '../reducers'

export default class Student extends Component {
  constructor() {
    super()
    this.state = store.getState()
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe(()=> {
      this.setState(store.getState)
    })

    store.dispatch(fetchAllStudents())
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  render() {
    const student = this.state.students.find(s=> s.id == this.props.match.params.id*1)
    
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
}
