import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchStudents, removeStudent } from '../reducers'

class AllStudents extends Component {
  componentDidMount() {
    this.props.getFromServer()
  }

  render() {
    const { students, deleteStudent } = this.props

    return (
      <div className="row">
        <div className="col-12">
          <h3>Students</h3>
          <hr/>
        </div>

        <div>
          { students.map(student=> (
            <div key={ student.id } className="col-3 col-md-3 col-sm-3">
              <div className="card thumb">
                <div className="row">
                  <div className="col-12">
                    <h4>{ student.name }</h4>
                    <h5>{ student.email }</h5>
                    <hr/>
                    <h5>{ student.campus && student.campus.name }</h5>
                  </div>

                  <div className="col-12">
                    <Link to={ `/students/${student.id}` }>More info...</Link>
                    <button value={ student.id } onClick={ deleteStudent }>Delete</button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className="col-12 col-md-12 col-sm-12">
            <Link className="col-12 card card-blue btn" to='/add-new-student'>Add new student</Link>
          </div>
        </div>
      </div>
    )
  }
}

const mapState = ({ students }) => {
  return { students }
}

const mapDispatch = dispatch => {
  return {
    getFromServer: () => dispatch(fetchStudents()),
    deleteStudent: ev => dispatch(removeStudent(ev.target.value))
  }
}

export default connect(mapState, mapDispatch)(AllStudents)
