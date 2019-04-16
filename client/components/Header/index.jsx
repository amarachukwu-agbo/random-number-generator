import React from 'react';
import PropTypes from 'prop-types';
import DropDown from '../Dropdown';
import MetaCard from '../MetaCard';
import './index.scss';

const Header = ({
  totalCount, minMaxNumbers, batchID, batches, getNumbers,
}) => (
  <div className="generator__button-group">
    <div className="sort-batch">
      <button type="button" className="number__sort">Sort</button>
      <div type="button" className="number__batch">Batch</div>
      <DropDown
        defaultSelected={batchID}
        dropDownItems={batches}
        onClickItem={getNumbers}
      />
    </div>
    <div className="number__min-max">
      {
      [
        { cardName: 'Total', cardValue: totalCount },
        { cardName: 'Max', cardValue: minMaxNumbers.maxNumber },
        { cardName: 'Min', cardValue: minMaxNumbers.minNumber },
      ]
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
};

export default Header;
