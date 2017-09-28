import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchStudents, addStudentCampus } from '../reducers'

class AddStudents extends Component {
  constructor() {
    super()
    this.state = { studensToAdd: [] }
    this.toggleSelect = this.toggleSelect.bind(this)
    this.onSubmitHandler = this.onSubmitHandler.bind(this)
  }

  componentDidMount() {
    this.props.getFromServer()
  }

  toggleSelect(student) {
    const { studensToAdd } = this.state

    if (!studensToAdd.includes(student)) this.setState({ studensToAdd: [ ...studensToAdd, student ] })
    else this.setState({ studensToAdd: studensToAdd.filter(s=> s.id != student.id) })
  }

  onSubmitHandler(ev) {
    ev.preventDefault()
    this.props.addStudentsToCampus(this.state.studensToAdd)
  }

  render() {
    const { students, cancelAdd  } = this.props
    const { studensToAdd } = this.state
    const { toggleSelect, onSubmitHandler } = this
    const studentsWithoutCampus = students.filter(student=> !student.campusId)

    return (
      <div className="row">
        <div className="col-offset-2 col-8 col-md-offset-2 col-md-8">
          <div className="card campus">
            <div className="row">
              <h3>Add student</h3>
              <hr/>
            </div>

            <form onSubmit={ onSubmitHandler } className="row">

              { !studentsWithoutCampus.length ?
                  <div className="row"><h3>No students available...</h3></div> :
                  <div className="col-12">
                    { studentsWithoutCampus.map(student=> (
                      <div onClick={ ()=> toggleSelect(student) } key={ student.id } className="col-3 col-md-3 col-sm-3">
                        <div className={ `card thumb select-student ${ studensToAdd.includes(student) ? 'selected' : '' }` }>
                          <div className="col-12">
                            <h4>{ student.name }</h4> 
                          </div>

                          <div className="check-container">
                          { studensToAdd.includes(student) ?
                              <i className="im im-check-mark-circle"></i> :
                              <i className="im im-circle-o"></i> }
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
              }

              { studentsWithoutCampus.length ? 
                  <div className="col-12">
                    <div className="col-6"><button className="card btn card-blue">Add</button></div>
                    <div className="col-6"><button onClick={ cancelAdd } className="card btn card-orange">Back</button></div>
                  </div> :
                  <div className="col-12">
                    <div className="col-6"><Link className="card btn card-green" to="/add-new-student"><button>Add new student</button></Link></div>
                    <div className="col-6"><button onClick={ cancelAdd } className="card btn card-orange">Back</button></div>
                  </div> }
            </form>
          </div>
        </div>
      </div>
    )
  }
}
                //<button className="col-6 col-md-6 card btn card-blue">Add</button>
                //<button className="col-6 col-md-6 card btn card-red">Back</button>

const mapState = ({ students }, ownProps) => {
  return { students, ownProps }
}

const mapDispatch = (dispatch, ownProps) => {
  return {
    getFromServer: () => dispatch(fetchStudents()),
    addStudentsToCampus: (students) => {
      const { id } = ownProps.match.params
      Promise.all(
        students.map(student => dispatch(addStudentCampus(student, id)))
      )
      .then(()=> ownProps.history.push(`/campuses/${ownProps.match.params.id}`))
    },
    cancelAdd: ()=> {
      ownProps.history.push(`/campuses/${ownProps.match.params.id}`)
    }
  }
}

export default connect(mapState, mapDispatch)(AddStudents)
