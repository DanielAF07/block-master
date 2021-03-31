import React from "react";
import styled from "@emotion/styled";
import logo from "../../assets/logo-blockBuster.png";
import InputText from './InputText'

import { useDispatch, useSelector } from 'react-redux'
import {changeListAction} from '../../actions/movieActions'

const StyledHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-top: 24px;
  padding-bottom: 24px;
  & a {
    text-decoration: none;
    color: var(--white);
    font-family: Inter;
    font-weight: 700;
    transition: color 0.2s;
  }
  & a.active {
    color: var(--primary);
    text-decoration: underline;
  }
  
  & a:hover {
    color: var(--primary);
  }
`;

const Header = () => {

  const dispatch = useDispatch()

  const shownList = useSelector( state => state.movies.shownList )

  const handleClick = (e) => {
    dispatch(changeListAction(e.target.getAttribute('value')))
  }
  
  return (
    <StyledHeader className="hwrapper">
      <img src={logo} alt="" />
      <a 
        href="#!" 
        value="all"
        className={`${shownList === 'all' ? 'active' : ''}`}
        onClick={handleClick}
      >Todas</a>
      <a 
        href="#!" 
        value="mostValued"
        className={`${shownList === 'mostValued' ? 'active' : ''}`}
        onClick={handleClick}
      >Más valoradas</a>
      <a 
        href="#!" 
        value="leastValued"
        className={`${shownList === 'leastValued' ? 'active' : ''}`}
        onClick={handleClick}
      >Menos valoradas</a>
      <InputText />
    </StyledHeader>
  );
};

export default Header;
