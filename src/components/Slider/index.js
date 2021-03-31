import React from 'react';
import styled from '@emotion/styled'
import Slide from './Slide'
import raya from '../../assets/slides/raya.png'
import unidos from '../../assets/slides/unidos.png'
import mulan from '../../assets/slides/mulan.png'

const slides = [
  {name: 'mulan', image: mulan, id:1},
  {name: 'raya', image: raya, id:2},
  {name: 'unidos', image: unidos, id:3},
  {name: 'mulan', image: mulan, id:4},
  {name: 'raya', image: raya, id:5}
]

const StyledSlider = styled.div`
  display: flex;
  flex-wrap: nowrap;
  gap: 24px;
  transform: translateX(0%);
  /* transition: all .7s cubic-bezier(.29, 1.01, 1, 0.68);   */
  transition: all .7s ease-in-out;  
  & .slide {
    width: 100%;
  }
`

const SliderIndicator = styled.div`
  margin-top: 24px;
  display: flex;
  gap: 16px;
  justify-content: center;
`

const Circle = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--gray);
  transition: background 0.3s;
  cursor: pointer;
  &.active {
    background: var(--white);
  }
`

const handleClickSlider = (position) => {
  // window.slider.style = `transform: translateX(${position === 0 ? '0' : `-${position*102}%`})`
  window.slider.style = `transform: translateX( calc(-${position}00% - (24px * ${position})) )`
  const $circles = [ ...document.querySelectorAll('.circle-indicator')]
  $circles.forEach(circle => circle.classList.remove('active'))
  $circles[position].classList.add('active')
}

const Slider = () => {
  return (
    <div style={{textAlign: 'center'}}>
      <StyledSlider id="slider">
        {slides.map(slide => (
          <Slide key={slide.id} slide={slide}/>
        ))}
      </StyledSlider>
      <SliderIndicator>
        {slides.map( (slide, i) => (
          <Circle
            className={`circle-indicator ${i === 0 ? 'active' : '' }`}
            key={slide.id}
            onClick={ () => {handleClickSlider(i)} }
          /> 
        )
        )}

      </SliderIndicator>
    </div>
  );
};

export default Slider;