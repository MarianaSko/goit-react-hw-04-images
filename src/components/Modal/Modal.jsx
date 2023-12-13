import { useEffect } from 'react';
import s from '../../main.module.css';

export const Modal = ({ src, alt, onModalClose }) => {
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleKeyDown = e => {
    if (e.key === 'Escape') {
      onModalClose();
    }
  };

  const handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      onModalClose();
    }
  };

  return (
    <div className={s.Overlay} onClick={handleBackdropClick}>
      <div className={s.Modal}>
        <img className={s.ModalImg} src={src} alt={alt} />
      </div>
    </div>
  );
};
