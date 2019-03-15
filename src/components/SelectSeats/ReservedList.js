import React from "react";

export class ReservedList extends React.Component {
  render() {
    const { reservedSeatsList } = this.props;

    return (
      <div className="right">
        <h6>Reserved Seats: ({reservedSeatsList.length})</h6>
        {reservedSeatsList.map(rsl => (
          <li key={rsl}>
            Row: {rsl.row} Seat: {rsl.seatNumber + 1}
          </li>
        ))}
      </div>
    );
  }
}
