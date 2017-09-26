import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

const AllCampuses = ({ campuses }) => {
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
//}

const mapState = ({ campuses }) => {
  return { campuses }
}

export default connect(mapState)(AllCampuses)
