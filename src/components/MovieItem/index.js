import React, { Component } from "react";

import { Link } from "react-router-dom";

class MovieItem extends Component {
  static defaultProps = {
    done: false
  };

  state = {
    done: this.props.done
  };

  taggleDone = () => {
    this.setState({ done: !this.state.done });
  };

  render() {
    const { id, title, categories, duration, ageLimit, formats } = this.props;

    return (
      <div className="col-md-4">
        <div className="card text-center mb-3">
          <div className="row no-gutters">
            <div className="col-md-12">
              <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <h6 className="card-subtitle mb-2 text-muted">
                  {categories.join(" ")}
                </h6>
                <small className="card-text text-muted">
                  Duration: {duration}
                  <br />
                  Age limit: {ageLimit ? ageLimit : "na"}
                  <br />
                  Formats:&nbsp;
                  {formats.join(", ")}
                </small>
              </div>
              <div className="card-footer position-relative fixed-bottom">
                <div className="justify-content-between align-items-center">
                  <div className="btn-group">
                    <Link
                      to={`/movie/${id}`}
                      className="btn btn-sm btn-outline-secondary"
                    >
                      Details
                    </Link>
                    <Link
                      to={`/movieBooking/${id}`}
                      className="btn btn-sm btn-outline-secondary"
                    >
                      Book&nbsp;now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MovieItem;
