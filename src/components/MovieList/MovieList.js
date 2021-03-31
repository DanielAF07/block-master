import React, { useEffect } from "react";
import styled from "@emotion/styled";
import MovieCover from "./MovieCover";
import Spinner from "../misc/Spinner";
import Modal from '../Modal/Modal'
import notFoundImage from '../../assets/Stuck at Home Searching.png'

//Redux
import { useDispatch, useSelector } from "react-redux";
import { loadMoviesAction, loadGenresAction } from "../../actions/movieActions";

// const MovieBox = styled.div`
//   display: flex;
//   flex-direction: row;
//   flex-wrap: wrap;
//   justify-content: space-between;
//   align-items: flex-start;
// `;

const MovieBox = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, 220px);
  justify-content: space-between;
`;

const NoResults = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
`

const MovieList = () => {
  const dispatch = useDispatch();

  const loadingMovies = useSelector((state) => state.movies.loadingMovies);
  const showModal = useSelector( state => state.movies.showModal)
  const shownList = useSelector( state => state.movies.shownList)
  const movies = useSelector((state) => state.movies.movies);
  const searchList = useSelector( state => state.movies.searchList)
  const search = useSelector( state => state.movies.search)

  useEffect(() => {
    dispatch(loadGenresAction())

    const handleIntersection = async (e) => {
      if (e[0].isIntersecting) {
        await dispatch(loadMoviesAction());
      }
    };
    const observer = new IntersectionObserver(handleIntersection);
    observer.observe(window.intersector);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if(showModal){
      document.body.style = 'overflow: hidden'
    } else {
      document.body.style = 'overflowY: auto'
    }
  }, [showModal]);



  const AllMovies = () => {
    return movies.map((movie) => {
      if (movie.poster_path !== null) {
        return <MovieCover key={movie.id} movie={movie} />;
      } else {
        return null;
      }
    })
  }

  const MostValued = () => {
    let sorted = [ ...movies ]
    sorted.sort( (movie, nextMovie) => {
      if(movie.vote_average > nextMovie.vote_average){
        return -1
      }
      return 1
    })
    return sorted.map((movie) => {
      if (movie.poster_path !== null && movie.vote_average >= 7) {
        return <MovieCover key={movie.id} movie={movie} />;
      } else {
        return null;
      }
    })
  }

  const LeastValued = () => {
    let sorted = [ ...movies ]
    sorted.sort( (movie, nextMovie) => {
      if(movie.vote_average > nextMovie.vote_average){
        return 1
      }
      return -1
    })
    return sorted.map((movie) => {
      if (movie.poster_path !== null && movie.vote_average < 7) {
        return <MovieCover key={movie.id} movie={movie} />;
      } else {
        return null;
      }
    })
  }

  const SearchList = () => {
    return searchList.map((movie) => {
      if (movie.poster_path !== null) {
        return <MovieCover key={movie.id} movie={movie} />;
      } else {
        return null;
      }
    })
  }

  const NotFound = () => {
    return (
      <NoResults>
        <img src={notFoundImage} alt=""/>
        <h3>{`No se encontraron resultados para "${search}"`}</h3>
      </NoResults>
    )
  }

  const listTitle = () => {
    if(shownList === 'all'){
      return 'Todas las peliculas'
    } else if(shownList === 'mostValued'){
      return 'Peliculas más valoradas'
    } else if(shownList === 'leastValued'){
      return 'Peliculas menos valoradas'
    } else if(shownList === 'search' && searchList.length > 0){
      return 'Resultados de busqueda'
    } else {
      return ''
    }
  }
  

  return (
    <>
    <Modal/>
      <div>
        <h2>{listTitle()}</h2>
        <MovieBox>
          {shownList === 'all' ?
          <AllMovies />
          : shownList === 'mostValued' ? <MostValued /> : shownList === 'leastValued' ? <LeastValued /> : <SearchList />}
          {shownList === 'search' && loadingMovies === false && searchList.length === 0 ? <NotFound /> : null}  
          <div id="intersector"> </div>
        </MovieBox>
      </div>
      {loadingMovies ? <Spinner /> : null}
    </>
  );
};

export default MovieList;
