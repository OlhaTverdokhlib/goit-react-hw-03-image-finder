import React from 'react';
import PropTypes from 'prop-types';
import { getPhotoByName } from 'Api';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from "./Button";
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

  static defaultProps = {
    photos: [],
  };

  static propTypes = {
    photos: PropTypes.arrayOf(PropTypes.object).isRequired,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.closeModalByEscape);
  }

  closeModalByEscape = (event) => {
    if (event.code === 'Escape') {
      this.setState({ largeImage: '' });
    }
  };

  componentDidUpdate(_, prevState) {

    if (prevState.name !== this.state.name || prevState.page !== this.state.page) {
      const fetchPhotoByName = async name => {
        try {
          this.setState({ isLoading: true });
          const photoByName = await getPhotoByName(name, this.state.page);
          this.setState(prevState => ({ photos: [...prevState.photos, ...photoByName] }));
        } catch (err) {
          this.setState({
            error: err.message,
          });
        } finally {
          this.setState({ isLoading: false });
        }
      };

      fetchPhotoByName(this.state.name);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.closeModalByEscape);
  }

  onSelectName = name => {
    this.setState({ name: name, photos: [], page: 1 });
  };

  onClickBtn = () => {
    this.setState({ page: this.state.page + 1 });
  }

  onClickImage = (src) => {
    this.setState({ largeImage: src })
  }

  onCloseModal = () => {
    this.setState({ largeImage: '' })
  }


  render() {
   
    return (
      <div className={ appStyles.container}>
       
        <Searchbar onSelectName={this.onSelectName} />
        {this.state.error.length > 0 && (
          <p>
            Upss, Some error occured... {this.state.error}
          </p>
        )}
        {this.state.isLoading && <Loader />}
        <ImageGallery photos={this.state.photos} onClick={this.onClickImage} />
        {this.state.photos.length > 0 && <Button onClick={this.onClickBtn} />}
        {!!this.state.largeImage.length && <Modal onClose={this.onCloseModal} largeImage={this.state.largeImage} />}
      </div>
    );
  }

};