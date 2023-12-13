import s from '../../main.module.css';

export const Button = ({ handleLoadMore }) => {
  return (
    <button className={s.Button} onClick={handleLoadMore}>
      Load More
    </button>
  );
};
