import { nanoid } from 'nanoid';
import s from '../../main.module.css';

export const ImageGalleryItem = ({
  src,
  alt,
  handleClickOnImg,
  largeImage,
}) => {
  return (
    <li className={s.ImageGalleryItem} key={nanoid()}>
      <img
        src={src}
        alt={alt}
        className={s.ImageGalleryItemImage}
        onClick={() => handleClickOnImg(largeImage, alt)}
      />
    </li>
  );
};
