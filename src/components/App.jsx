import { Component } from 'react';
import { SearchBar } from './SearchBar/SearchBar';
import { getImages } from 'api/images';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import s from '../main.module.css';

export class App extends Component {
  state = {
    images: [],
    query: '',
    page: 1,
    isLoading: false,
    isModalOpen: false,
    largeImage: null,
    alt: null,
  };

  componentDidMount() {
    this.getDataFromApi();
  }

  async componentDidUpdate(_, prevState) {
    if (
      prevState.page !== this.state.page ||
      prevState.query !== this.state.query
    ) {
      this.getDataFromApi();
    }
  }

  getDataFromApi = async () => {
    const { page, query } = this.state;
    try {
      this.setState({ isLoading: true });
      const { hits } = await getImages(page, query);
      if (this.state.page > 1) {
        this.setState(prev => ({ images: [...prev.images, ...hits] }));
      } else {
        this.setState({ images: hits });
      }
    } catch (error) {
      alert(error.message);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleLoadMore = () => {
    this.setState(prev => ({ page: prev.page + 1 }));
  };

  handleSubmit = e => {
    e.preventDefault();
    if (e.target[1].value === this.state.query) {
      alert('Your search query is already shown!');
      return;
    }
    this.setState({ query: e.target[1].value, page: 1 });
  };

  handleClickOnImg = (largeImage, alt) => {
    this.setState({ largeImage, alt, isModalOpen: true });
  };

  handleCloseModal = () => {
    this.setState({ isModalOpen: false });
  };

  render() {
    return (
      <div className={s.App}>
        <SearchBar handleSubmit={this.handleSubmit} />
        {this.state.isLoading && <Loader />}
        <ImageGallery
          images={this.state.images}
          handleClickOnImg={this.handleClickOnImg}
        />
        {this.state.images.length !== 0 && (
          <Button handleLoadMore={this.handleLoadMore} />
        )}
        {this.state.isModalOpen && (
          <Modal
            src={this.state.largeImage}
            alt={this.state.alt}
            onModalClose={this.handleCloseModal}
          />
        )}
      </div>
    );
  }
}
