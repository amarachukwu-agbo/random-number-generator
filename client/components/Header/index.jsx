import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DropDown from '../Dropdown';
import MetaCard from '../MetaCard';

import './index.scss';

const renderSortButton = (icon, order, setOrder, sortOrder) => (
  <button
    type="button"
    data-testid={`${icon}-button`}
    className={`number__sort-order ${sortOrder === order ? 'active' : ''}`}
    onClick={() => { setOrder(order); }}
  >
    <FontAwesomeIcon icon={`arrow-circle-${icon}`} />
  </button>
);
const Header = ({
  totalCount, minMaxNumbers, batchID, batches, getNumbers, setOrder, sortOrder,
}) => (
  <div className="generator__button-group">
    <div className="sort-batch">
      <div type="button" className="number__sort">
        <div className="number__sort-text">Sort</div>
        {
          [{ icon: 'up', order: 'ASC' }, { icon: 'down', order: 'DESC' }]
            .map(({ icon, order }) => renderSortButton(icon, order, setOrder, sortOrder))
        }
      </div>
      <div type="button" className="number__batch">Batch</div>
      <DropDown
        defaultSelected={batchID}
        dropDownItems={batches}
        onClickItem={getNumbers}
      />
    </div>
    <div className="number__min-max">
      {[
        { cardName: 'Total', cardValue: totalCount },
        { cardName: 'Max', cardValue: minMaxNumbers.maxNumber },
        { cardName: 'Min', cardValue: minMaxNumbers.minNumber }]
        .map(({ cardName, cardValue }) => (
          <MetaCard
            cardName={cardName}
            cardValue={cardValue}
            key={cardValue}
          />))
    }
    </div>
  </div>
);

Header.propTypes = {
  minMaxNumbers: PropTypes.shape({
    maxNumber: PropTypes.string.isRequired,
    minNumber: PropTypes.string.isRequired,
  }).isRequired,
  totalCount: PropTypes.number.isRequired,
  batchID: PropTypes.string.isRequired,
  batches: PropTypes.arrayOf(PropTypes.string).isRequired,
  getNumbers: PropTypes.func.isRequired,
  setOrder: PropTypes.string.isRequired,
  sortOrder: PropTypes.func.isRequired,
};

export default Header;
