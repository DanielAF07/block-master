import React from 'react';
import styled from '@emotion/styled'


const Btn = styled.a`
  text-decoration: none;
  color: var(--black);
  font-weight: 700;
  font-size: 18px;
  line-height: 28px;
  padding: 10px 24px;
  border: 1px solid var(--primary);
  border-radius: 4px;
  text-transform: uppercase;
  cursor: pointer;
  
  & svg {
    padding-right: 8px;
    width: 15px;
    height: 15px;
    position: relative;
    top: 1.5px;
  }
`

const Button = ({type, Icon, text, size}) => {
  return (
    <>
      <Btn
        style={{
          background: `${type === 'secondary' ? 'var(--black)' : 'var(--primary)'}`,
          color: `${type === 'secondary' ? 'var(--primary)' : 'var(--black)'}`,
          fill: `${type === 'secondary' ? 'var(--primary)' : 'var(--black)'}`,
          paddingLeft: `${size === 'l' ? '45px' : '24px'}`,
          paddingRight: `${size === 'l' ? '45px' : '24px'}`
        }}
      >
        {Icon ? <Icon/> : null}
        <span>{text}</span></Btn>
    </>
  );
};

export default Button;