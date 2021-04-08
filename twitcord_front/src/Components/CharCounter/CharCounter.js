import React from 'react';
import PropTypes from 'prop-types';
import './CharCounter.css';

const Counter = (props) => {
  const r = 15;
  const circleLength = 2 * Math.PI * r;
  const twitterBlue = 'rgb(29, 161, 242)';
  const colored = (circleLength * props.numChar) / 140;
  const gray = circleLength - colored > 0 ? circleLength - colored : 0;
  const ringStyle = {
    stroke:
      140 - props.numChar <= 0 ?
        'red' :
        140 - props.numChar <= 20 ?
        'orange' :
        twitterBlue,
    strokeDasharray: `${colored}  ${gray}`,
  };

  return (
    <div>
      <div id="counter-container">
        <p>{props.numChar}</p>
        <svg>
          <circle id="gray" cx="20px" cy="20px" r="16"></circle>
          <circle
            id="colored"
            cx="20px"
            cy="20px"
            r="16"
            style={ringStyle}
          ></circle>
        </svg>
      </div>
    </div>
  );
};

Counter.propTypes = {
  numChar: PropTypes.number,
};

export default Counter;
