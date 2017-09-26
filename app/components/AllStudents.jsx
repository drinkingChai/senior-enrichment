import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

const AllStudents = ({ students }) => {
  return (
    <div>
      <h3>Students</h3>

      <div>
        { students.map(student=> (
          <div key={ student.id }>
            <Link to={ `/students/${student.id}` }>{ student.name }</Link>
          </div>
        ))}
      </div>
    </div>
  )
}
//}

const mapState = ({ students }) => {
  return { students }
}

export default connect(mapState)(AllStudents)
