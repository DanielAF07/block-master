import React from 'react';
import styled from '@emotion/styled'
import searchIcon from '../../assets/search.svg'

const TextInput = styled.div`
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
  return (
    <TextInput>
      <Input id="searchMovie" type="text" placeholder="Busca tu película favorita"/>
      <Button><i><img src={searchIcon} alt="Search Icon"/></i></Button>
    </TextInput>
  );
};

export default InputText;