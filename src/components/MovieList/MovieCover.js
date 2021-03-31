import React from 'react';
import styled from '@emotion/styled'
import {ReactComponent as StarIcon} from '../../assets/star.svg'


//Redux
import {useDispatch} from 'react-redux'
import {selectMovieAction} from '../../actions/movieActions'

const Cover = styled.div`
  position: relative;
  margin-bottom: 40px;
  cursor: pointer;

  & img {
    border-radius: 8px;
  }
`

const Rate = styled.div`
  padding: 10px 23px;
  padding-left: 15px;
  position: absolute;
  color: var(--white);
  top: 24px;
  display: flex;
  gap: 8px;
  align-items: center;
  background: rgba(0,0,0,0.7);
  border-top-right-radius: 32px;
  border-bottom-right-radius: 32px;
  & h3 {
    font-weight: 700;
    font-size: 25px;
    line-height: 34.13px;
    letter-spacing: 1%;
    margin: 0;
  }
`

const MovieCover = ({movie, size}) => {

  const dispatch = useDispatch()

  const handleClick = (e) => {
    if (size!=='big'){
      dispatch(selectMovieAction(movie))
    }
  }

  if(!movie.poster_path) {
    return null
  }

  return (
    <Cover
      onClick={handleClick}
      style={{cursor: `${size!=='big' ? 'pointer': 'auto'}`}}
    >
      {size === 'big' ? <img src={`http://image.tmdb.org/t/p/w500${movie.poster_path}`} width="282.45px" height="403.49px" alt=""/> : <img src={`http://image.tmdb.org/t/p/w220_and_h330_face${movie.poster_path}`} alt={movie.original_title}/>}
          
      <Rate
        style={{
        borderTop: `2px solid ${movie.vote_average >= 7 ? 'var(--primary)' : '#0e3fa9'}`,
        borderRight: `2px solid ${movie.vote_average >= 7 ? 'var(--primary)' : '#0e3fa9'}`,
        borderBottom: `2px solid ${movie.vote_average >= 7 ? 'var(--primary)' : '#0e3fa9'}`,
        borderLeft: '0'
        }}
      >
        <StarIcon style={{width: '21px', height: '21px'}}/>
        <h3>{movie.vote_average}</h3>
      </Rate>
    </Cover>
  );
};

export default MovieCover;