import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

const Campuses = ({ campuses })=> {

  return (
    <div>
      { campuses.map(campus=> (
          <div key={ campus.id }>
            <Link to={ `/campuses/${campus.id}` }>{ campus.name } { campus.students.length }</Link>
          </div>
        ))
      }
      <Link to='/add-campus'>Add campus</Link>
    </div>
  )
}

const mapStateToProps = ({ campuses }) => {
  return { campuses }
}

export default connect(mapStateToProps)(Campuses)
