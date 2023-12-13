import { SearchBar } from './SearchBar/SearchBar';
import { getImages } from 'api/images';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import s from '../main.module.css';
import { useState } from 'react';
import { useEffect } from 'react';

export const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [largeImage, setLargeImage] = useState(null);
  const [alt, setAlt] = useState(null);

  useEffect(() => {
    const getDataFromApi = async () => {
      try {
        setIsLoading(true);
        const { hits } = await getImages(page, query);
        if (page > 1) {
          setImages(prev => [...prev, ...hits]);
        } else {
          setImages(hits);
        }
      } catch (error) {
        alert(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    getDataFromApi();
  }, [page, query]);

  const handleLoadMore = () => {
    setPage(prev => prev + 1);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (e.target[1].value === query) {
      alert('Your search query is already shown!');
      return;
    }
    setQuery(e.target[1].value);
    setPage(1);
  };

  const handleClickOnImg = (largeImage, alt) => {
    setLargeImage(largeImage);
    setAlt(alt);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={s.App}>
      <SearchBar handleSubmit={handleSubmit} />
      {isLoading && <Loader />}
      <ImageGallery images={images} handleClickOnImg={handleClickOnImg} />
      {images.length !== 0 && <Button handleLoadMore={handleLoadMore} />}
      {isModalOpen && (
        <Modal src={largeImage} alt={alt} onModalClose={handleCloseModal} />
      )}
    </div>
  );
};
