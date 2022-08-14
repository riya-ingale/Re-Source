import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import "../Css/index.css"
import heroimg from "../Images/home2.jpg"

export default class indexbody extends Component {
  render() {
    return (
      <>
      <section>
        <div class="overlay"></div>
        <div class="aspect text" data-aspect="2:1" data-s-aspect="1:1">
          <h1>Re-Source</h1>
          {/* <p>Over a ratio of 1:1</p> */}
        </div>
      </section>
      </>
    )
  }
}
