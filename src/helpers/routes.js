const serverUrl = "https://candidatetest.arpideas.pl/api";

export const moviesApiUrl = id =>
  id ? `${serverUrl}/Movies/Get/${id}` : `${serverUrl}/Repertoire/Get`;

export const categoriesApiUrl = id => `${serverUrl}/Movies/GetMovieCategories`;

export const formatsApiUrl = id =>
  `${serverUrl}/Movies/GetAvailableMovieFormats`;

export const seatsStatusApiUrl = id =>
  `${serverUrl}/Reservation/GetSeatsStatus/${id}`;

export const reserveSeatsApiUrl = id => `${serverUrl}/Reservation/ReserveSeats`;

export const payForReservationsApiUrl = id =>
  `${serverUrl}/Payment/PayForReservations`;
