import React from 'react';
import PropTypes from 'prop-types';

import buttonStyles from './Button.module.css';

const Button = ({ onClick }) => {
  return (
    <button onClick={onClick} className={buttonStyles.loadMoreBtn} type="button">
      Load more
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Button;
