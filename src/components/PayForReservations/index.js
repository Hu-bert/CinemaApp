import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import Moment from "moment";

import { payForReservations } from "../../helpers/movieApi";

class PayForReservations extends Component {
  state = {
    counter: 300,
    redirect: true,
    paymentStatus: null
  };

  componentDidMount = () => {
    const intervalId = setInterval(this.countdown, 1000);
    this.setState({ intervalId });
  };

  countdown = () => this.setState({ counter: this.state.counter - 1 });

  componentWillUnmount = () => {
    clearInterval(this.state.intervalId);
  };

  payNow = async () => {
    const paymentStatus = await payForReservations({
      reservationToken: this.props.match.params.payId
    });
    this.setState({
      paymentStatus
    });
  };

  render() {
    const { counter, paymentStatus } = this.state;
    Moment.locale("pl");

    return (
      <div class="row justify-content-md-center">
        <div className="col-md-12">
          <div className="card text-center mb-3">
            <div className="row no-gutters">
              <div className="col-md-12">
                <div className="card-body">
                  <p>
                    Payment link:&nbsp;
                    <code>{window.location.href}</code>
                  </p>
                  {paymentStatus ? <p>{paymentStatus.error}</p> : null}
                  <p>
                    Time for payment{" "}
                    {Moment({
                      minute: counter / 60,
                      seconds: counter % 60
                    }).format("mm:ss")}{" "}
                    minutes
                  </p>
                  {counter <= 0 && <Redirect to="/" />}
                  <button
                    className="btn btn-sm btn-outline-secondary"
                    onClick={this.payNow}
                  >
                    Pay now
                  </button>
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

export default PayForReservations;
