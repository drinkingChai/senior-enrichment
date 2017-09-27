import React from 'react'
import { Link } from 'react-router-dom'

export default function Nav () {

  return (
    <nav className="row">
      <div className="col-offset-3 col-3 col-md-offset-3 col-md-3 col-sm-6">
        <Link className='card btn' to='/campuses'>Campuses</Link>
      </div>
      <div className="col-3 col-md-3 col-sm-6">
        <Link className='card btn' to='/students'>Students</Link>
      </div>
    </nav>
  )
}
