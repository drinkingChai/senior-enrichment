import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchCampuses } from '../reducers'

class AllCampuses extends Component {
  componentDidMount() {
    this.props.getFromServer()
  }

  render() {
    const { campuses } = this.props

    return (
      <div>
        <h3>Campuses</h3>

        <div>
          { campuses.map(campus=> (
            <div key={ campus.id }>
              <Link to={ `/campuses/${campus.id}` }>{ campus.name }</Link>
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
    getFromServer: () => dispatch(fetchCampuses())
  }
}

export default connect(mapState, mapDispatch)(AllCampuses)
