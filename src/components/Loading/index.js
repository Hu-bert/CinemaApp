import React, { Component } from "react";
import { Link } from "react-router-dom";

class Loading extends Component {
  render() {
    return (
      <div className=" offset-md-5 col-md-2">
        <i className="d-flex justify-content-center fas fa-spinner fa-spin fa-5x" />
        <br />
        <p className="text-center">Loading {this.props.text}</p>
        <p className="text-center">
          <Link to={`/`} className="btn btn-sm btn-outline-secondary ">
            Home
          </Link>
        </p>
      </div>
    );
  }
}

export default Loading;
