import React from 'react';
import PropTypes from 'prop-types';

import modalStyles from './Modal.module.css';

const Modal = ({ largeImage, onClose }) => {
  return (
    <div className={modalStyles.overlay} onClick={onClose}>
      <div className={modalStyles.modal}>
        <img src={largeImage} alt="Large" />
      </div>
    </div>
  );
};

Modal.propTypes = {
  largeImage: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
