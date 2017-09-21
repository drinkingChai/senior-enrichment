import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom'
import store from '../store'
import { fetchAllCampus } from '../reducers'
import SingleCampus from './SingleCampus'

export default class AllCampuses extends Component {
  constructor() {
    super()
    this.state = store.getState()
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
    const { campus } = this.state

    return (
      <div>
      {
        campus.map(camp=> (
          <div key={ camp.id }>
            <Link to={ `/campus/${camp.id}` }>{ camp.name }</Link>
          </div>
        ))
      }
      </div>
    )
  }
}

// <Route exact path={ `/campus/${camp.id}` } component={ SingleCampus }/>
