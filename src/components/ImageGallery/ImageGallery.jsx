import React from 'react';
import PropTypes from "prop-types";

import ImageGalleryItem from "components/ImageGalleryItem/ImageGalleryItem";
import imageGalleryStyles from "./ImageGallery.module.css";


const ImageGallery = ({ photos, onClick }) => {
    return (
      <ul className={imageGalleryStyles.imageGallery}>
        {photos.map(({ id, webformatURL, largeImageURL }) => {
          return (
            <ImageGalleryItem
              onClick={onClick}
              key={id}
              src={webformatURL}
              largeImageURL={largeImageURL}
              id={id}
            />
          );
        })}
      </ul>
    );
}

ImageGallery.propTypes = {
  photos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ImageGallery;