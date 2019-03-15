import React, { Component } from "react";

import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";

class NotFound extends Component {
  state = {
    counter: 10
  };

  componentDidMount = () => {
    const intervalId = setInterval(this.countdown, 1000);
    this.setState({ intervalId });
  };

  countdown = () => this.setState({ counter: this.state.counter - 1 });

  componentWillUnmount = () => {
    clearInterval(this.state.intervalId);
  };

  render() {
    const { location } = this.props;
    const { counter } = this.state;

    return (
      <div class="row justify-content-md-center">
        <div className="col-md-4">
          <div className="card text-center mb-3">
            <div className="row no-gutters">
              <div className="col-md-12">
                <div className="card-body">
                  <p>
                    No match for <code>{location.pathname}</code>
                  </p>
                  <p>Reddirect to homepage in {counter} seconds</p>

                  {counter <= 0 && <Redirect to="/" />}
                </div>
                <div className="card-footer position-relative fixed-bottom">
                  <div className="justify-content-between align-items-center">
                    <div className="btn-group">
                      <Link
                        to={`/`}
                        className="btn btn-sm btn-outline-secondary"
                      >
                        Home
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

export default NotFound;
