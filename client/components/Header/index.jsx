import React from 'react';
import PropTypes from 'prop-types';

const Header = ({ meta, minMaxNumbers }) => (
  <div className="generator__button-group">
    <button type="button" className="number__sort">Sort</button>
    <div className="number__min-max">
      <div className="number__max">
        <span className="number__max--border">Total</span>
        <span>{meta.totalCount}</span>
      </div>
      <div className="number__max">
        <span className="number__max--border">Max</span>
        <span data-testid="max-number">{minMaxNumbers.maxNumber}</span>
      </div>
      <div className="number__max">
        <span>Min</span>
        <span data-testid="min-number">{minMaxNumbers.minNumber}</span>
      </div>
    </div>
  </div>
);

Header.propTypes = {
  minMaxNumbers: PropTypes.shape({
    maxNumber: PropTypes.number.isRequired,
    minNumber: PropTypes.number.isRequired,
  }).isRequired,
  meta: PropTypes.shape({
    totalCount: PropTypes.number.isRequired,
  }).isRequired,
};

export default Header;
