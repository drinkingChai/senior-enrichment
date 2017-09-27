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
      <div className="row">
        <div className="col-12">
          <h3>Campuses</h3>
          <hr/>
        </div>

        <div>
          { campuses.map(campus=> (
            <div key={ campus.id } className="col-6 col-md-6 col-sm-6">
              <div className="card thumb">
                <div className="row">
                  <div className="col-12">
                    <h4>{ campus.name }</h4>
                    <h5>{ campus.address }</h5>
                    <hr/>
                    <h5>Students: { campus.students.length }</h5>
                  </div>

                  <div className="col-12">
                    <Link to={ `/campuses/${campus.id}` }>More info...</Link>
                    <button value={ campus.id } onClick={ deleteCampus }>Delete</button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className="col-12 col-md-12 col-sm-12">
            <Link className="col-12 card card-blue btn" to='/add-new-campus'>Add new campus</Link>
          </div>
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
