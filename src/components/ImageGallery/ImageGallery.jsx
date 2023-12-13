import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { nanoid } from 'nanoid';
import s from '../../main.module.css';

export const ImageGallery = ({ images, onOpenModal, handleClickOnImg }) => {
  return (
    <ul className={s.ImageGallery}>
      {/* <!-- Набір <li> із зображеннями --> */}
      {images.map(image => (
        <ImageGalleryItem
          onOpenModal={onOpenModal}
          src={image.webformatURL}
          largeImage={image.largeImageURL}
          alt={image.tags}
          key={nanoid()}
          handleClickOnImg={handleClickOnImg}
        />
      ))}
    </ul>
  );
};
