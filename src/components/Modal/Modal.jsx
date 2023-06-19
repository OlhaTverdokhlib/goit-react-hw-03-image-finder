import React, { Component } from 'react';
import PropTypes from 'prop-types';

import modalStyles from './Modal.module.css';

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.closeModalByEscape);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.closeModalByEscape);
  }

  closeModalByEscape = event => {
    if (event.code === 'Escape') {
      this.props.onClose();
    }
  };

  render() {
    const { largeImage, onClose } = this.props;
    return (
      <div className={modalStyles.overlay} onClick={onClose}>
        <div className={modalStyles.modal}>
          <img src={largeImage} alt="Large" />
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  largeImage: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
