import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './index.scss';

const NavBar = () => (
  <div className="navbar__container">
    <h2 className="navbar__header--text">Phone Number Generator</h2>
    <button className="numbers__button" type="button">
      <FontAwesomeIcon icon="cog" />
      <span className="numbers__button--text">Generate</span>
    </button>
  </div>
);

export default NavBar;
