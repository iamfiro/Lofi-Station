import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import { Range, getTrackBackground } from 'react-range';

const RangeSlider = ({ min, max, step, value, onChange }) => {
  return (
    <Range
      draggableTrack
      step={step}
      min={min}
      max={max}
      values={price}
      onChange={onChange}
      renderTrack={({ props, children }) => (
        <StyledRangeTrack {...props} min={min} max={max} price={price}>
          {children}
        </StyledRangeTrack>
      )}
      renderThumb={({ props }) => <StyledRangeThumb {...props} />}
    />
  );
};

const StyledRangeTrack = styled.div`
  position: relative;
  height: 5px;
  width: 100%;
  border-radius: 4px;
  margin-top: 1.5rem;
  background: ${props =>
    getTrackBackground({
      values: props.price,
      colors: ['#ccc', oc.teal[5], '#ccc'],
      min: props.min,
      max: props.max,
    })};
  align-self: center;
  cursor: default !important;
`;

const StyledRangeThumb = styled.div`
  position: absolute;
  top: 0;
  width: 24px;
  height: 24px;
  border-radius: 24px;
  box-shadow: rgba(157, 157, 157, 0.2) 0px 2px 5px 0px;
  border: 1px solid rgb(237, 237, 237);
  background-color: rgb(255, 255, 255);
  backface-visibility: hidden;
  outline: none;
  cursor: default !important;
`;

export default RangeSlider;