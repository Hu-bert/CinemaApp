import React, { Component } from "react";
import { Link } from "react-router-dom";
import Moment from "moment";

export class Showing extends Component {
  render() {
    const { showingId, date, title, movieId } = this.props;
    const showing = title + "&" + movieId + "&" + date + "&" + showingId;
    Moment.locale("pl");

    return (
      <div className="col-md-2" key={showingId}>
        <div className="card text-center mb-3">
          <div className="row">
            <div className="col-md-12">
              <div className="card-body">{Moment(date).format("hh:mm")}</div>
              <div className="card-footer position-relative fixed-bottom">
                <div className="justify-content-between align-items-center">
                  <div className="btn-group">
                    <Link
                      to={`/selectSeats/${showing}`}
                      className="btn btn-sm btn-outline-secondary"
                    >
                      Select
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
