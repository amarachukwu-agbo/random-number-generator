import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './index.scss';

const NavBar = ({ generateNumbers, loading }) => (
  <div className="navbar__container">
    <h2 className="navbar__header-text">
      <span className="navbar__header-text--big">P</span>
      <span>hone </span>
      <span className="navbar__header-text--big">N</span>
      <span>umber </span>
      <span className="navbar__header-text--big">G</span>
      <span>enerator</span>
    </h2>
    <button
      className="numbers__button"
      type="submit"
      data-testid="generate-button"
      onClick={() => generateNumbers()}
      disabled={loading}
    >
      <FontAwesomeIcon icon="cog" spin={loading} />
      <span className="generate-text">Generate</span>
    </button>
  </div>
);

NavBar.propTypes = {
  generateNumbers: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default NavBar;
