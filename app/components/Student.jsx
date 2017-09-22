import React, { Component } from 'react'
import store from '../store'

export default class Student extends Component {
  constructor() {
    super()
    this.state = store.getState()
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe(()=> {
      this.setState(store.getState)
    })
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  render() {
    const student = this.state.students.find(s=> s.id == this.props.match.params.id*1)

    return (
      <div>
        <p>{ student.name }</p>
      </div>
    )
  }
}
