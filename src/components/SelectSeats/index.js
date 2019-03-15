import React, { Component } from "react";
import { Link } from "react-router-dom";
import Moment from "moment";

import "./index.css";
import Loading from "../../components/Loading";
import { getSeatsStatus } from "../../helpers/movieApi";
import { SeatsStatus } from "./SeatsStatus";

class SelectSeats extends Component {
  state = {
    seatsStatus: null,
    title: this.props.match.params.showing.split("&")[0],
    movieId: this.props.match.params.showing.split("&")[1],
    date: this.props.match.params.showing.split("&")[2],
    showingId: this.props.match.params.showing.split("&")[3]
  };

  componentDidMount = async () => {
    const seatsStatus = await getSeatsStatus(this.state.showingId);
    this.setState({ seatsStatus });
  };

  render() {
    const { title, movieId, date, seatsStatus, showingId } = this.state;
    Moment.locale("pl");

    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card mb-3">
            <div className="row no-gutters">
              <div className="col-md-12">
                <div className="card-body">
                  <dl className="row">
                    <dt className="col-sm-12 text-center">
                      <h5>{title}</h5>
                    </dt>
                    <dt className="col-sm-12 text-center">
                      <h6>{Moment(date).format("hh:mm")}</h6>
                    </dt>
                  </dl>
                  {seatsStatus ? (
                    <SeatsStatus seats={seatsStatus} showingId={showingId} />
                  ) : (
                    <Loading text={"seats status"} />
                  )}
                </div>
                <div className="card-footer position-relative fixed-bottom text-center">
                  <div className="justify-content-between align-items-center">
                    <div className="btn-group">
                      <Link
                        to={`/`}
                        className="btn btn-sm btn-outline-secondary"
                      >
                        Home
                      </Link>
                      <Link
                        to={`/movie/${movieId}`}
                        className="btn btn-sm btn-outline-secondary"
                      >
                        Detalis
                      </Link>
                      <Link
                        to={`/movieBooking/${movieId}`}
                        className="btn btn-sm btn-outline-secondary"
                      >
                        Other showings
                      </Link>
                    </div>
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

export default SelectSeats;
