import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import Loading from "../../components/Loading";
import * as moviesApi from "../../helpers/movieApi";
import { Showing } from "./Showing";

const BoottomDiv = styled.div`
  margin-bottom: 10px;
`;

class MovieBooking extends Component {
  state = {
    movieItem: null
  };

  componentDidMount = async () => {
    const movies = await moviesApi.getAll();

    this.setState({
      movieItem: movies.filter(
        movie => movie.id == this.props.match.params.movieId
      )[0]
    });
  };

  render() {
    const movie = this.state.movieItem;

    return (
      <div className="row">
        <div className="col-md-12">
          {movie ? (
            <div className="card mb-3">
              <div className="row no-gutters">
                <div className="col-md-12">
                  <div className="card-body">
                    <dl className="row">
                      <dt className="col-sm-12 text-center">
                        <h5>{movie.title}</h5>
                      </dt>
                      <dt className="col-sm-12 text-center">
                        <h6>{movie.categories.join(" ")}</h6>
                      </dt>
                    </dl>
                    {movie.showings.map(showing => (
                      <BoottomDiv className="row justify-content-md-center">
                        <h5 className="col-12 text-center">
                          {showing.movieFormat}
                        </h5>
                        {showing.showingDates.map(showingDate => {
                          const id = showingDate.id;
                          const date = showingDate.date;
                          return (
                            <Showing
                              key={id}
                              title={movie.title}
                              movieId={movie.id}
                              showingId={id}
                              date={date}
                            />
                          );
                        })}
                      </BoottomDiv>
                    ))}
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
                          to={`/movie/${movie.id}`}
                          className="btn btn-sm btn-outline-secondary"
                        >
                          Detalis
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

export default MovieBooking;
