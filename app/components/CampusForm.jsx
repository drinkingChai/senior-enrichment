import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { writeCampusName, resetCampus, fetchCampus } from '../reducers'

class CampusForm extends Component {
  componentDidMount() {
    const { id } = this.props.match.params
    if (id) this.props.getCampus(id)
  }

  componentWillUnmount() {
    this.props.resetForm()
  }

  render() {
    const { campus, onChangeHandler } = this.props

    return (
      <form>
        <div>
          <label htmlFor='name'>Name</label>
          <input name='name' value={ campus.name } onChange={ onChangeHandler }/>
        </div>

        <div>
          { campus.students.map(student=> (
              <div key={ student.id }>
                <Link key={ student.id } to={ `/students/${student.id}` }>{ student.name }</Link>
              </div>
            ))
          }
        </div>
      </form>
    )

  }
}

const mapStateToProps = ({ campus }) => {
  return { campus }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onChangeHandler(ev) {
      dispatch(writeCampusName(ev.target.value))
    },
    getCampus(id) {
      dispatch(fetchCampus(id))
    },
    resetForm() {
      dispatch(resetCampus())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CampusForm)
