import {
  CHANGE_LIST,
  DESELECT_MOVIE,
  LOAD_GENRES,
  LOAD_GENRES_DONE,
  LOAD_GENRES_ERROR,
  LOAD_MOVIES,
  LOAD_MOVIES_DONE,
  LOAD_MOVIES_ERROR,
  SEARCH_MOVIES,
  SEARCH_MOVIES_DONE,
  SEARCH_MOVIES_ERROR,
  SELECT_MOVIE,
} from "../types";

import clienteAxios from "../config/axios";

const apikey = process.env.APIKEY

export function loadMoviesAction() {
  return async (dispatch, getState) => {
    const { shownList } = getState().movies;
    if (shownList === "search") {
      return;
    }
    dispatch(loadMovies());
    setTimeout(async () => {
      try {
        //Peticion a TMDB
        const { page } = getState().movies;
        const response = await clienteAxios(
          `discover/movie?api_key=${apikey}&page=${page}`
        );
        dispatch(loadMoviesDone(response.data.results));
      } catch (error) {
        console.log(error);
        dispatch(loadMoviesError(true));
      }
    }, 1000);
  };
}

const loadMovies = () => ({
  type: LOAD_MOVIES,
});

const loadMoviesDone = (movies) => ({
  type: LOAD_MOVIES_DONE,
  payload: movies,
});

const loadMoviesError = (state) => ({
  type: LOAD_MOVIES_ERROR,
  payload: state,
});

export function selectMovieAction(movie) {
  return (dispatch) => {
    dispatch(selectMovie(movie));
  };
}

const selectMovie = (movie) => ({
  type: SELECT_MOVIE,
  payload: movie,
});

export function deselectMovieAction() {
  return (dispatch) => {
    dispatch(deselectMovie());
  };
}

const deselectMovie = () => ({
  type: DESELECT_MOVIE,
});

export function loadGenresAction() {
  return async (dispatch) => {
    dispatch(loadGenres());
    try {
      //Peticion a TMDB
      const response = await clienteAxios(
        `genre/movie/list?api_key=${apikey}&language=en-US`
      );
      dispatch(loadGenresDone(response.data.genres));
    } catch (error) {
      console.log(error);
      dispatch(loadGenresError(true));
    }
  };
}

const loadGenres = () => ({
  type: LOAD_GENRES,
});

const loadGenresDone = (genres) => ({
  type: LOAD_GENRES_DONE,
  payload: genres,
});

const loadGenresError = (state) => ({
  type: LOAD_GENRES_ERROR,
  payload: state,
});

export function changeListAction(listName) {
  return (dispatch) => {
    dispatch(changeList(listName));
  };
}

const changeList = (listName) => ({
  type: CHANGE_LIST,
  payload: listName,
});

export function searchMoviesAction(search) {
  return async (dispatch) => {
    dispatch(searchMovies(search));
    setTimeout(async () => {
      try {
        //Peticion a TMDB

        const response = await clienteAxios(
          `search/multi?api_key=${apikey}&query=${search}&page=1`
        );
        dispatch(searchMoviesDone(response.data.results));
      } catch (error) {
        console.log(error);
        dispatch(searchMoviesError(true));
      }
    }, 1500);
  };
}

const searchMovies = (search) => ({
  type: SEARCH_MOVIES,
  payload: search,
});

const searchMoviesDone = (response) => ({
  type: SEARCH_MOVIES_DONE,
  payload: response,
});

const searchMoviesError = (state) => ({
  type: SEARCH_MOVIES_ERROR,
  payload: true,
});
