import React from 'react';
import PropTypes from 'prop-types';
import './CharCounter.css';
import * as Constants from '../../Utils/Constants.js';

const Counter = (props) => {
  const offset = 5;
  const r = 15;
  const circleLength = Math.round(2 * Math.PI * r);
  const twitterBlue = 'rgb(29, 161, 242)';
  const colored = Math.round(
      (circleLength * props.numChar) / Constants.TWEET_CHAR_LIMIT,
  );
  const gray = circleLength - colored > 0 ? circleLength - colored + offset : 0;
  const ringStyle = {
    stroke:
      Constants.TWEET_CHAR_LIMIT - props.numChar <= 0 ?
        'red' :
        Constants.TWEET_CHAR_LIMIT - props.numChar <= 20 ?
        'orange' :
        twitterBlue,
    strokeDasharray: `${colored}  ${gray}`,
    strokeDashoffset: 0,
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
