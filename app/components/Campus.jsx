import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import store from '../store'
import { fetchAllCampus } from '../reducers'

export default class Campus extends Component {
  constructor() {
    super()
    this.state = store.getState()
    console.log('rendered')
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

  render() {
    const id = this.props.match.params.id * 1
    const campus = this.state.campus.find(camp=> camp.id == id)

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
}
