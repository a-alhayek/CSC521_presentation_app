import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Delete = styled.div.attrs({
  className: 'delete-item-btn',
})`
  color: #0080ff;
  cursor: pointer;
`;

class UpdateButton extends Component {
  confirmUpdateButton = event => {
    event.preventDefault();

    if (window.confirm(`Are you sure you want to change the status of this timeslot?`)) {
      this.props.onUpdate(
        this.props.id,
        this.props.start,
        this.props.end,
        this.props.day,
        !this.props.status,
      );
      alert(`${this.props.item} with ${this.props.id} have been updated`);
    }
  };

  render() {
    return <Delete onClick={this.confirmUpdateButton}>Update{this.props.item}</Delete>;
  }
}

UpdateButton.propTypes = {
  id: PropTypes.string,
};

export default UpdateButton;
