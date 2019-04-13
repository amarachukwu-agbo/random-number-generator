import React, { PureComponent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import './index.scss';

class SelectDropDown extends PureComponent {
  state = {
    isDropdownOpen: false,
    selectedItem: {},
  }

  static getDerivedStateFromProps(nextProps) {
    const { defaultSelected, dropDownItems } = nextProps;
    const selectedItem = dropDownItems.find(item => item === defaultSelected)
      || dropDownItems[0];
    return { selectedItem };
  }

  selectItem = (item) => {
    this.setState({
      selectedItem: item,
    });
  };

  showDropdownItems = () => {
    this.setState({
      isDropdownOpen: true,
    });
    document.addEventListener('click', this.hideDropdownItems);
  };

  hideDropdownItems = () => {
    this.setState({
      isDropdownOpen: false,
    });
    document.removeEventListener('click', this.hideDropdownItems);
  };

  handleItemClick = (item) => {
    const { onClickItem } = this.props;
    this.selectItem(item);
    onClickItem(item);
  };

  checkSelected = (item) => {
    const { selectedItem } = this.state;
    const isSelected = selectedItem === item
      ? 'selected' : '';
    return isSelected;
  }

  renderDropDownItems(dropDownItems) {
    return (
      <ul className="dropdown__list__items">
        {dropDownItems.map((item, index) => (
          <li
            id={`${item}`}
            key={item}
            data-testid={`dropdown-item-${index}`}
            className={`dropdown__list__item ${this.checkSelected(item)}`}
            onClick={() => this.handleItemClick(item)}
            role="presentation"
          >
            {item}
          </li>
        ))}
      </ul>
    );
  }

  render() {
    const { dropDownItems, dropDownClass } = this.props;
    const { isDropdownOpen, selectedItem } = this.state;
    return (
      <div
        className={`dropdown__container ${isDropdownOpen ? 'open' : ''}`}
        role="presentation"
        data-testid="dropdown"
        onClick={() => this.showDropdownItems()}
      >
        <div
          className={`dropdown__input ${isDropdownOpen ? 'clicked' : ''} ${dropDownClass}`}
        >
          <div className="dropdown__input__value">
            <span style={{ marginRight: '7px' }}>{selectedItem}</span>
            <FontAwesomeIcon icon="caret-down" />
          </div>
        </div>

        <div className="dropdown__list">
          {this.renderDropDownItems(dropDownItems)}
        </div>
      </div>
    );
  }
}

SelectDropDown.propTypes = {
  onClickItem: PropTypes.func,
  dropDownItems: PropTypes.arrayOf(PropTypes.string),
  dropDownClass: PropTypes.string,
};

SelectDropDown.defaultProps = {
  dropDownClass: '',
  onClickItem: null,
  dropDownItems: [],
};

export default SelectDropDown;
