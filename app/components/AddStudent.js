import React, { Component } from 'react'
import store from '../store'
import { fetchAllCampus, writeStudentName, setStudentCampus, createNewStudent } from '../reducers'

export default class AddStudent extends Component {
  constructor() {
    super()
    this.state = store.getState()
    this.onChangeHandler = this.onChangeHandler.bind(this)
    this.onSubmitHandler = this.onSubmitHandler.bind(this)
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe(()=> {
      this.setState(store.getState())
    })

    store.dispatch(fetchAllCampus())
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  onChangeHandler(ev) {
    ev.preventDefault()
    switch (ev.target.name) {
      case 'name':
        return store.dispatch(writeStudentName(ev.target.value))
      case 'channelId':
        return store.dispatch(setStudentCampus(ev.target.value)) 
      default:
    }
  }

  onSubmitHandler(ev) {
    ev.preventDefault()
    const { studentNameEntry, studentChannelId } = this.state

    store.dispatch(createNewStudent(studentNameEntry, studentChannelId))
  }

  render() {
    const { campus, studentNameEntry, studentChannelId } = this.state
    const { onChangeHandler, onSubmitHandler } = this

    console.log(campus)
    return (
      <form onSubmit={ onSubmitHandler }>
        <div>
          <label htmlFor='name'>Name</label>
          <input name='name' value={ studentNameEntry } onChange={ onChangeHandler }/>
        </div>

        <select name='channelId' value={ studentChannelId } onChange={ onChangeHandler }>
          <option>--- none ---</option>
          { campus.map(camp=> <option key={ camp.id } value={ camp.id }>{ camp.name }</option>) }
        </select>

        <button>Add!</button>
      </form>
    )
  }
}
