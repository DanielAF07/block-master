import { CHANGE_LIST, DESELECT_MOVIE, LOAD_GENRES, LOAD_GENRES_DONE, LOAD_GENRES_ERROR, LOAD_MOVIES, LOAD_MOVIES_DONE, LOAD_MOVIES_ERROR, SEARCH_MOVIES, SEARCH_MOVIES_DONE, SEARCH_MOVIES_ERROR, SELECT_MOVIE } from '../types'

const initialState = {
  movies: [],
  searchList: [],
  genres: [],
  shownList: 'all',
  loadingMovies: false,
  selectedMovie: {title: '', release_date: '', genre_ids: [], poster_path: '/mzOHg7Q5q9yUmY0b9Esu8Qe6Nnm.jpg'},
  search: '',
  showModal: false,
  error: false,
  page: 1
}

const reducer = (state = initialState, action) => {
  switch(action.type){
    case LOAD_MOVIES:
      return {
        ...state,
        loadingMovies: true,
        error: false
      }
    case LOAD_MOVIES_DONE:
      return {
        ...state,
        loadingMovies: false,
        movies: [...state.movies, ...action.payload],
        page: state.page + 1
      }
    case LOAD_MOVIES_ERROR:
      return {
        ...state,
        loadingMovies: false,
        error: true
      }
    case LOAD_GENRES:
      return {
        ...state,
        error: false
      }
    case LOAD_GENRES_DONE:
      return {
        ...state,
        genres: action.payload
      }
    case LOAD_GENRES_ERROR:
      return {
        ...state,
        error: true
      }
    case SELECT_MOVIE:
      return {
        ...state,
        selectedMovie: action.payload,
        showModal: true
      }
    case DESELECT_MOVIE:
      return {
        ...state,
        showModal: false
      }
    case CHANGE_LIST:
      return {
        ...state,
        shownList: action.payload,
      }
    case SEARCH_MOVIES:
      return {
        ...state,
        shownList: 'search',
        searchList: [],
        search: action.payload,
        loadingMovies: true
      }
    case SEARCH_MOVIES_DONE:
      return {
        ...state,
        searchList: action.payload,
        loadingMovies: false
      }
    case SEARCH_MOVIES_ERROR:
      return {
        ...state,
        searchList: [],
        loadingMovies: false
      }
    default:
      return state

  }
}

export default reducer