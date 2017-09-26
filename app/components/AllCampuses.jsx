import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchCampuses, removeCampus } from '../reducers'

class AllCampuses extends Component {
  componentDidMount() {
    this.props.getFromServer()
  }

  render() {
    const { campuses, deleteCampus } = this.props

    return (
      <div>
        <h3>Campuses</h3>

        <div>
          { campuses.map(campus=> (
            <div key={ campus.id }>
              <Link to={ `/campuses/${campus.id}` }>{ campus.name }</Link>
              <button value={ campus.id } onClick={ deleteCampus }>Delete</button>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

const mapState = ({ campuses }) => {
  return { campuses }
}

const mapDispatch = dispatch => {
  return {
    getFromServer: () => dispatch(fetchCampuses()),
    deleteCampus: ev => dispatch(removeCampus(ev.target.value))
  }
}

export default connect(mapState, mapDispatch)(AllCampuses)
