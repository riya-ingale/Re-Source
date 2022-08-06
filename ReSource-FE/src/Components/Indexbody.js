import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class indexbody extends Component {
  render() {
    return (
      <div>
        <button><Link to={'/login'}>Login</Link></button>
      </div>
    )
  }
}
