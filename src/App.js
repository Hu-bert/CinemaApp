import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import MovieList from "./containers/MovieList";
import Movie from "./components/Movie";
import MovieBooking from "./components/MovieBooking";
import SelectSeats from "./components/SelectSeats";
import NotFound from "./components/NotFound";
import PayForReservations from "./components/PayForReservations";

class App extends Component {
  render() {
    return (
      <Router>
        <main>
          <div className="album py-5 bg-light">
            <div className="container">
              <Switch>
                <Route exact path="/" component={MovieList} />
                <Route path="/movie/:movieId" component={Movie} />
                <Route path="/movieBooking/:movieId" component={MovieBooking} />
                <Route path="/selectSeats/:showing" component={SelectSeats} />
                <Route
                  path="/payForReservations/:payId"
                  component={PayForReservations}
                />
                <Route component={NotFound} />
              </Switch>
            </div>
          </div>
        </main>
      </Router>
    );
  }
}

export default App;
