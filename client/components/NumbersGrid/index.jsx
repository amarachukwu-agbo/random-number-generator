import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';

const NumbersGrid = ({ phoneNumbers }) => (
  <div className="numbers__grid">
    {
      phoneNumbers.length && phoneNumbers.map(number => (
        <div key={`${number}`}>
          <span className="numbers__grid-item--text">{number}</span>
        </div>
      ))
    }
  </div>
);

NumbersGrid.propTypes = {
  phoneNumbers: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default NumbersGrid;
