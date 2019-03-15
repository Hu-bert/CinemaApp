import React from "react";
import { Redirect } from "react-router-dom";

import { createReserveSeats } from "../../helpers/movieApi";
import { ReservedList } from "./ReservedList";
import { DrawRowSeats } from "./DrawRowSeats";

export class SeatsStatus extends React.Component {
  state = {
    seatsReserved: [],
    reserveSeatsStatus: null,
    redirectPayForReservations: false
  };

  onClickData(row, seatNumber) {
    if (
      this.state.seatsReserved.findIndex(
        sr => sr.seatNumber === seatNumber && sr.row === row
      ) > -1
    ) {
      this.setState({
        seatsReserved: this.state.seatsReserved.filter(
          sr => sr.seatNumber !== seatNumber || sr.row !== row
        )
      });
    } else {
      this.setState({
        seatsReserved: this.state.seatsReserved.concat({ row, seatNumber })
      });
    }
  }

  reserveSeats = async () => {
    const reserveSeatsStatus = await createReserveSeats({
      showingId: this.props.showingId,
      seats: this.state.seatsReserved
    });

    this.setState({
      reserveSeatsStatus
    });
    if (
      typeof this.state.reserveSeatsStatus === "string" ||
      this.state.reserveSeatsStatus instanceof String
    ) {
      this.setState({
        redirectPayForReservations: true
      });
    }
  };

  render() {
    const {
      reserveSeatsStatus,
      redirectPayForReservations,
      seatsReserved
    } = this.state;

    const { seats } = this.props;

    return (
      <div className="container" key>
        {redirectPayForReservations ? (
          <Redirect to={`/payForReservations/${reserveSeatsStatus}`} />
        ) : null}
        <div className="row justify-content-center">
          <div className="col-12 text-center ">
            <h6>Seat Reservation System</h6>
          </div>
          {reserveSeatsStatus ? (
            <div className="col-sm-12 text-center">
              <p>{reserveSeatsStatus.Seats}</p>
              <a
                href={window.location.href}
                className="btn btn-sm btn-outline-secondary"
              >
                Reload seats
              </a>
            </div>
          ) : (
            <div className="col-sm-12 col-lg-7 horizontalScrolling text-center">
              <div className="screen">
                <p />
              </div>
              {seats.map(rowOfSeats => (
                <DrawRowSeats
                  row={rowOfSeats.row}
                  seats={rowOfSeats.seats}
                  reserved={seatsReserved}
                  onClickData={this.onClickData.bind(this)}
                />
              ))}
              <ReservedList reservedSeatsList={seatsReserved} />
              <PayButton
                seatsReserved={seatsReserved}
                reserveSeats={this.reserveSeats}
              >
                Pay now
              </PayButton>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const PayButton = ({ seatsReserved, reserveSeats }) => {
  if (seatsReserved.length > 0) {
    return (
      <button
        className="btn btn-sm btn-outline-secondary"
        onClick={reserveSeats}
      >
        Pay now
      </button>
    );
  }

  return (
    <button className="btn btn-sm btn-light" disabled>
      Pay now
    </button>
  );
};
