import React from 'react';
import PropTypes from 'prop-types';

import imageGalleryItemStyles from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ src, onClick, largeImageURL }) => {
  return (
    <li className={imageGalleryItemStyles.imageGalleryItem}>
      <img
        className={imageGalleryItemStyles.imageGalleryItemImage}
        onClick={() => onClick(largeImageURL)}
        src={src}
        alt="search word"
      />
    </li>
  );
};
ImageGalleryItem.propTypes = {
  src: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};

export default ImageGalleryItem;