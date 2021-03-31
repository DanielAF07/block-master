import React from "react";
import styled from '@emotion/styled'

import Button from '../Button'
import { ReactComponent as PlayIcon} from '../../assets/play.svg'
import { ReactComponent as PlusIcon} from '../../assets/plus.svg'

const StyledActions = styled.div`
  position: absolute;
  bottom: 32px;
  left: 32px;
  display: flex;
  gap: 16px;
`

const StyledImg = styled.img`
  max-inline-size: 1200px;
  margin: 0 auto;
  width: calc(100vw - 166px);
`

const Slide = ({slide}) => {
  return (
    <>
      <div className="slide" style={{ position: "relative"}}>
        <StyledImg className="slide__image" src={slide.image} alt={`Banner of movie ${slide.name}`}/>
        <StyledActions>
          <Button type="primary" Icon={PlayIcon} text="ver ahora" />
          <Button type="secondary" Icon={PlusIcon} text="ver después" />
        </StyledActions>
      </div>
    </>
  );
};

export default Slide;
