import React, { useState } from 'react';
import styled from '@emotion/styled'
import searchIcon from '../../assets/search.svg'

//Redux
import { useDispatch } from 'react-redux'
import { changeListAction, searchMoviesAction } from '../../actions/movieActions';

const TextInput = styled.form`
  height: auto;
  display: flex;
  align-items: center;
  gap: -1px;
`

const Input = styled.input`
  padding: 0;
  margin: 0;
  padding: 12px 11px;
  font-size: 16px;
  line-height: 22px;
  width: 28vw;
  max-width: 533px;
  border: 2px solid var(--primary);
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
`

const Button = styled.button`
  border: 3.5px solid var(--primary);
  height: 100%;
  background: var(--primary);
  padding: 10px 24px;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  & img {
    color: var(--white);
    width: 20px;
    height: 20px;
  }
`

const InputText = () => {

  const dispatch = useDispatch()

  const [search, setSearch] = useState('')

  const handleChange = (e) => {
    setSearch(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if(search.trim() === ''){
      dispatch(changeListAction('all'))
      return
    }
    dispatch(searchMoviesAction(search))

  }
  return (
    <TextInput
      onSubmit={handleSubmit}
    >
      <Input 
        id="searchMovie"
        type="text"
        placeholder="Busca tu película favorita"
        value={search}
        onChange={handleChange}
      />
      <Button
        type="submit"
      ><i><img src={searchIcon} alt="Search Icon"/></i></Button>
    </TextInput>
  );
};

export default InputText;