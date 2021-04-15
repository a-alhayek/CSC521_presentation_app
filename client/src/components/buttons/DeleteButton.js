import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';

const Delete = styled.div.attrs({
  className: 'delete-item-btn',
})`
  color: #ff0000;
  cursor: pointer;
`;

class DeleteButton extends Component {
  confirmDeleteItem = event => {
    event.preventDefault();

    if (
      window.confirm(`Do you want to permanently delete this ${this.props.item}? ${this.props.id}`)
    ) {
      this.props.onDelete(this.props.id, this.props.sid);
      alert(`${this.props.item} with ${this.props.id} have been deleted`);
    }
  };

  render() {
    return (
      <div>
        <Button variant="contained" color="secondary" onClick={this.confirmDeleteItem}>
          Delete {this.props.item}
        </Button>
      </div>
    );
  }
}

DeleteButton.propTypes = {
  id: PropTypes.string,
};

export default DeleteButton;
