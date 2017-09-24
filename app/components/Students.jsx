import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

const Students = ({ students })=> {

  return (
    <div>
      { students.map(student=> (
          <div key={ student.id }>
            <Link to={ `/students/${student.id}` }>{ student.name }</Link>
          </div>
        ))
      }
      <Link to='/add-student'>Add student</Link>
    </div>
  )
}

const mapStateToProps = ({ students })=> {
  return { students }
}

export default connect(mapStateToProps)(Students)
