import React from "react";

export class DrawRowSeats extends React.Component {
  render() {
    const { row, seats, reserved } = this.props;

    return (
      <table className="grid">
        <tbody>
          <tr>
            <td className="notd">{row}</td>
            {seats.map((seatNumber, seatIndex) =>
              seatNumber === 1 ? (
                <td className="unAvailable">{seatIndex + 1}</td>
              ) : (
                <td
                  className={
                    reserved.findIndex(
                      x => x.seatNumber === seatIndex && x.row === row
                    ) > -1
                      ? "reserved"
                      : "available"
                  }
                  key={seatIndex + row}
                  onClick={e => this.onClickSeat(row, seatIndex)}
                >
                  {seatIndex + 1}{" "}
                </td>
              )
            )}
          </tr>
        </tbody>
      </table>
    );
  }

  onClickSeat(row, seatIndex) {
    this.props.onClickData(row, seatIndex);
  }
}
