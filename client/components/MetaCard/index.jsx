
import React from 'react';
import PropTypes from 'prop-types';

const MetaCard = ({ cardName, cardValue }) => (
  <div className="number__max" key={cardValue}>
    <span>{cardName}</span>
    <div className="number__max--separator" />
    <span className="number__max--text" data-testid={cardName}>
      {cardValue}
    </span>
  </div>
);

MetaCard.propTypes = {
  cardName: PropTypes.string.isRequired,
  cardValue: PropTypes.string.isRequired,
};

export default MetaCard;
