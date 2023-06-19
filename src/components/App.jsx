import React from 'react';
import { getPhotoByName } from 'services/api';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Loader from './Loader';
import Modal from './Modal';
import appStyles from './App.module.css';

export class App extends React.Component {
  state = {
    name: '',
    photos: [],
    isLoading: false,
    error: '',
    page: 1,
    largeImage: '',
  };

  fetchPhotoByName = async name => {
    try {
      this.setState({ isLoading: true });
      const photoByName = await getPhotoByName(name, this.state.page);
      this.setState(prevState => ({
        photos: [...prevState.photos, ...photoByName],
      }));
    } catch (err) {
      this.setState({
        error: err.message,
      });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  componentDidUpdate(_, prevState) {
    if (
      prevState.name !== this.state.name ||
      prevState.page !== this.state.page
    ) {
      this.fetchPhotoByName(this.state.name);
    }
  }

  onSelectName = name => {
    this.setState({ name: name, photos: [], page: 1 });
  };

  onClickBtn = () => {
    this.setState({ page: this.state.page + 1 });
  };

  onClickImage = src => {
    this.setState({ largeImage: src });
  };

  onCloseModal = () => {
    this.setState({ largeImage: '' });
  };

  render() {
    const { error, isLoading, photos, largeImage } = this.state;
    const minVisibleImages = 12;
    return (
      <div className={appStyles.container}>
        <Searchbar onSelectName={this.onSelectName} />
        {error.length > 0 && <p>Upss, Some error occured... {error}</p>}
        {isLoading && <Loader />}
        <ImageGallery photos={photos} onClick={this.onClickImage} />
        {photos.length > 0 && photos.length >= minVisibleImages && (
          <Button onClick={this.onClickBtn} />
        )}
        {!!largeImage.length && (
          <Modal onClose={this.onCloseModal} largeImage={largeImage} />
        )}
      </div>
    );
  }
}
