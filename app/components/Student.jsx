import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import store from '../store'

//const Student = (props)=> {
  //const student = props.state.students.find(s=> s.id == props.match.params.id*1)

  //if (!student) return <div></div>
  //return (
    //<div>
      //<form>
        //<div>
          //<label htmlFor='name'>Name</label>
          //<input name='name'/>
        //</div>

        //<button>Update</button>
        //<button>Delete</button>
      //</form>
      //<p>{ student.name }</p>
      //{ student.campus ?
        //<Link to={ `/campus/${ student.campus.id }` }>{ student.campus.name }</Link> : null
      //}
    //</div>
  //)
//}

class Student extends Component {
  constructor() {
    super()
    this.onChangeHandler = this.onChangeHandler.bind(this)
    this.onUpdateHandler = this.onUpdateHandler.bind(this)
    this.onDeleteHandler = this.onDeleteHandler.bind(this)
  }

  onChangeHandler() {
  }

  onUpdateHandler() {
  }

  onDeleteHandler() {
  }

  render() {
    const student = this.props.state.students.find(s=> s.id == this.props.match.params.id*1)

    if (!student) return <div></div>
    return (
      <div>
        <form>
          <div>
            <label htmlFor='name'>Name</label>
            <input name='name'/>
          </div>

          <button>Update</button>
          <button>Delete</button>
        </form>
        <p>{ student.name }</p>
        { student.campus ?
          <Link to={ `/campus/${ student.campus.id }` }>{ student.campus.name }</Link> : null
        }
      </div>
    )
  }
}

const mapStateToProps = (state)=> {
  return {
    state
  }
}

export default connect(mapStateToProps)(Student)
