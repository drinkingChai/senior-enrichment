import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchCampus, resetCampus, removeStudentFromCampus } from '../reducers'

class Campus extends Component {
  constructor() {
    super()
    this.onRemoveStudentHandler = this.onRemoveStudentHandler.bind(this)
  }

  componentDidMount() {
    const { id } = this.props.ownProps.match.params
    const { fetchById } = this.props

    fetchById(id)
  }

  componentWillUnmount() {
    this.props.reset()
  }

  onRemoveStudentHandler(ev) {
    this.props.removeFromCampus(this.props.campus, ev.target.value)
  }

  render() {
    const { campus } = this.props
    const { onRemoveStudentHandler } = this

    return (
      <div>
        <div>
          <label htmlFor='name'>Name</label>
          <input name='name' value={ campus.name }/>
        </div>
      
        {
          campus.students.map(student=> (
            <div key={ student.id }>
              <h5>{ student.name }</h5>
              <button value={ student.id } onClick={ onRemoveStudentHandler }>Remove</button>
            </div>
          ))
        }
      </div>
    )
  }
}

const mapState = ({ campus }, ownProps) => {
  return { campus, ownProps }
}

const mapDispatch = dispatch => {
  return {
    fetchById: id => dispatch(fetchCampus(id)),
    reset: () => dispatch(resetCampus()),
    removeFromCampus: (campus, studentId) => dispatch(removeStudentFromCampus(campus, studentId))
  }
}

export default connect(mapState, mapDispatch)(Campus)
