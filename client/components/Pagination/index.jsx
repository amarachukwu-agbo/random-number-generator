import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './index.scss';

const Pagination = ({ metaData: { currentPage, pagesCount }, changePage }) => (
  <div className="pagination">
    <button
      className="pagination__button"
      type="button"
      onClick={() => changePage(currentPage - 1)}
      disabled={currentPage === 1}
    >
      <FontAwesomeIcon icon="chevron-left" />
      <span style={{ marginLeft: '4px' }}>Previous</span>
    </button>
    <div>
      <span className="pagination__button--text page__text">Page</span>
      <span className="pagination__button--text current-page">{currentPage}</span>
      <span className="pagination__button--text">of</span>
      <span className="pagination__button--text">{pagesCount}</span>
    </div>
    <button
      className="pagination__button"
      type="button"
      onClick={() => changePage(currentPage + 1)}
      disabled={currentPage === pagesCount}
    >
      <span style={{ marginRight: '4px' }}>Next</span>
      <FontAwesomeIcon icon="chevron-right" />
    </button>
  </div>
);

Pagination.propTypes = {
  metaData: PropTypes.shape({
    currentPage: PropTypes.number.isRequired,
    pagesCount: PropTypes.number.isRequired,
  }).isRequired,
  changePage: PropTypes.func.isRequired,
};


export default Pagination;
