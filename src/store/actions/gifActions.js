export const SET_GET_MORE = "SET_GET_MORE";
export const GET_LOCAL_DATA = "GET_LOCAL_DATA";
export const FETCH_GIFS = "FETCH_GIFS";
export const FETCH_GIFS_SUCCESS = "FETCH_GIFS_SUCCESS";
export const FETCH_GIFS_ERROR = "FETCH_GIFS_ERROR";
export const ADD_GIFS_SUCCESS = "ADD_GIFS_SUCCESS";

export const fetchGifs = () => ({
  type: FETCH_GIFS,
});

export const fetchGifsSuccess = (payload) => ({
  type: FETCH_GIFS_SUCCESS,
  payload,
});
export const addGifsSuccess = (payload) => ({
  type: ADD_GIFS_SUCCESS,
  payload,
});

export const fetchGifsError = (payload) => ({
  type: FETCH_GIFS_ERROR,
  payload,
});
