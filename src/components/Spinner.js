import React, { Component } from 'react'
import loading from './loading.gif'
export default class Spinner extends Component {
  render() {
    return (
      <div className="d-flex justify-content-center">
        <img className="my-3" src={loading} style={{height:"20px"}} alt="loading" />
      </div>
    )
  }
}
