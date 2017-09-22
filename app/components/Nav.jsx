import React from 'react'
import { NavLink } from 'react-router-dom'

const Nav = ()=> {

  return (
    <div>
      <NavLink to='/campus'>Campus</NavLink>
      <NavLink to='/students'>Students</NavLink>
    </div>
  )
}

export default Nav
