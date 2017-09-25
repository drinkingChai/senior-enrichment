import React from 'react'
import { Link } from 'react-router-dom'

export default function Nav () {

  return (
    <div>
      <Link to='/campuses'>Campuses</Link>
      <Link to='/students'>Students</Link>
    </div>
  )
}
