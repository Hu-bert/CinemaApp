import {
  moviesApiUrl,
  categoriesApiUrl,
  formatsApiUrl,
  seatsStatusApiUrl,
  reserveSeatsApiUrl,
  payForReservationsApiUrl
} from "./routes";
import * as api from "./api";

export const getAll = () => api.get(moviesApiUrl());

export const get = id => api.get(moviesApiUrl(id));

export const getCategories = () => api.get(categoriesApiUrl());

export const getFormats = () => api.get(formatsApiUrl());

export const getSeatsStatus = id => api.get(seatsStatusApiUrl(id));

export const createReserveSeats = params =>
  api.post(reserveSeatsApiUrl(), { ...params });

export const payForReservations = params =>
  api.post(payForReservationsApiUrl(), { ...params });
