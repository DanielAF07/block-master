import React from "react";
import styled from "@emotion/styled";
import MovieCover from "../MovieList/MovieCover";
import Button from "../Button";
import { ReactComponent as PlayIcon } from "../../assets/play.svg";
import { ReactComponent as PlusIcon } from "../../assets/plus.svg";
import { ReactComponent as CrossIcon } from "../../assets/cross.svg";

import { useDispatch, useSelector } from "react-redux";
import { deselectMovieAction } from "../../actions/movieActions";

const Background = styled.div`
  position: fixed;
  transform: translateY(100%);
  top: 0;
  left: 0;
  z-index: 10;
  background: rgba(15, 14, 20, 0.95);
  width: 100vw;
  height: 100vh;
  transition: transform 0.3s;

  &.show {
    transform: translateY(0%);
  }
`;

const Container = styled.div`
  position: fixed;
  width: calc(1200px);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Cover = styled.div`
  transform: scale(0.8) matrix(1.11, -0.81, 1.22, 0.61, 0, 0);
  margin-left: 200px;
`;

const MovieInfo = styled.div`
  width: 500px;
`;

const Overview = styled.p`
  color: var(--white);
  font-weight: 400;
  font-family: Montserrat;
  font-size: 18px;
  line-height: 27px;
`;

const Data = styled.ul`
  margin-left: -40px;
  font-weight: 400;
  font-size: 18px;
  line-height: 27px;
  color: var(--gray);
  display: flex;
  flex-direction: row;
  & li {
    margin-left: 30px;
    padding: 0;
  }
  & li:first-of-type {
    margin-left: 0;
    list-style-type: none;
  }
`;

const Actions = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const CloseIcon = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 11;
  cursor: pointer;
`;

const Modal = () => {
  const dispatch = useDispatch();
  const selectedMovie = useSelector((state) => state.movies.selectedMovie);
  const genres = useSelector((state) => state.movies.genres);
  const showModal = useSelector((state) => state.movies.showModal);

  const handleClick = (e) => {
    if (e.target.getAttribute("id") === "modal-bg") {
      dispatch(deselectMovieAction());
    }
  };

  const handleCloseClick = (e) => {
    dispatch(deselectMovieAction());
  };

  console.log(selectedMovie);

  return (
    <Background
      className={`${showModal ? "show" : null}`}
      id="modal-bg"
      onClick={handleClick}
    >
      <Container>
        <CloseIcon onClick={handleCloseClick}>
          <CrossIcon id="close" />
        </CloseIcon>
        <Cover>
          <MovieCover size="big" movie={selectedMovie} />
        </Cover>
        <MovieInfo>
          <h1>{selectedMovie.title ? selectedMovie.title : selectedMovie.name}</h1>
          <Overview>{selectedMovie.overview}</Overview>
          <Data>
            {selectedMovie.release_date ? (
              <li>{selectedMovie.release_date.substring(0, 4)}</li>
            ) : null}
            {selectedMovie.genre_ids.length > 0 ? (
              <li>
                {selectedMovie.genre_ids.map((gen, i) => {
                  if(!genres.find((genre) => genre.id === gen)){
                    return null
                  }
                  if (i === 0) {
                    return genres.find((genre) => genre.id === gen).name;
                  } else if (i > 0) {
                    return (
                      " / " + genres.find((genre) => genre.id === gen).name
                    );
                  }
                  return null;
                })}
              </li>
            ) : null}

            {/* <li>1h 40m</li> */}
          </Data>
          <Actions>
            <Button type="primary" size="l" Icon={PlayIcon} text="ver ahora" />
            <Button
              type="secondary"
              size="l"
              Icon={PlusIcon}
              text="ver después"
            />
          </Actions>
        </MovieInfo>
      </Container>
    </Background>
  );
};

export default Modal;
