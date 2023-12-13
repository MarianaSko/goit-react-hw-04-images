import { Component } from 'react';
import s from '../../main.module.css';

export class Modal extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.key === 'Escape') {
      this.props.onModalClose();
    }
  };

  handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      this.props.onModalClose();
    }
  };

  render() {
    return (
      <div className={s.Overlay} onClick={this.handleBackdropClick}>
        <div className={s.Modal}>
          <img
            className={s.ModalImg}
            src={this.props.src}
            alt={this.props.alt}
          />
        </div>
      </div>
    );
  }
}
