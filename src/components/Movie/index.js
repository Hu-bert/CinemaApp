import React, { Component } from "react";
import { Link } from "react-router-dom";
import Moment from "moment";

import { get } from "../../helpers/movieApi";
import Loading from "../../components/Loading";

class Movie extends Component {
  state = {
    movieItem: null
  };

  componentDidMount = async () => {
    if (!isNaN(this.props.match.params.movieId)) {
      const movieItem = await get(this.props.match.params.movieId);
      this.setState({ movieItem });
    }
  };

  render() {
    Moment.locale("pl");
    const movie = this.state.movieItem;

    return (
      <div class="row">
        <div className="col-md-12">
          {movie ? (
            <div className="card mb-3">
              <div className="row no-gutters">
                <div className="col-md-12">
                  <div className="card-body">
                    <dl class="row">
                      <dt class="col-sm-12 text-center">
                        <h5>{movie.title}</h5>
                      </dt>

                      <dt class="col-sm-12 text-center">
                        <h6>{movie.categories.join(" ")}</h6>
                      </dt>
                      <dt class="col-sm-12 text-center">
                        <br />
                      </dt>
                      <dd class="col-sm-6">
                        <dl class="row">
                          <dt class="col-sm-6">Original title:</dt>
                          <dd class="col-sm-6">{movie.originalTitle}</dd>
                          <dt class="col-sm-6">Director full name:</dt>
                          <dd class="col-sm-6">{movie.directorFullName}</dd>
                          <dt class="col-sm-6">Production year:</dt>
                          <dd class="col-sm-6">{movie.productionYear}</dd>
                          <dt class="col-sm-6">Production place:</dt>
                          <dd class="col-sm-6">{movie.productionPlace}</dd>
                          <dt class="col-sm-6">Original language:</dt>
                          <dd class="col-sm-6">{movie.originalLanguage}</dd>
                          <dt class="col-sm-6">Actors</dt>
                          <dd class="col-sm-6">{movie.actors.join(", ")}</dd>
                          <dt class="col-sm-6">Duration:</dt>
                          <dd class="col-sm-6">{movie.duration}</dd>
                          <dt class="col-sm-6">Age limit:</dt>
                          <dd class="col-sm-6">
                            {movie.ageLimit ? movie.ageLimit : "na"}
                          </dd>
                          <dt class="col-sm-6">Release date:</dt>
                          <dd class="col-sm-6">
                            {Moment(movie.releaseDate).format("DD-MM-YYYY")}
                          </dd>
                        </dl>
                      </dd>
                      <dd class="col-sm-6">
                        <dt class="col-sm-12">Description: </dt>
                        <dd class="col-sm-12">{movie.description}</dd>
                      </dd>
                    </dl>
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
                          to={`/movieBooking/${movie.id}`}
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
          ) : (
            <Loading text={"movie detalis"} />
          )}
        </div>
      </div>
    );
  }
}

export default Movie;
