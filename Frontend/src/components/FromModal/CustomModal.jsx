import { useState, useEffect } from 'react';
import './customModal.css';

export const CustomModal = ({ show, onClose, onSubmit, children, modalIds, buttonText }) => {
  const [animationClass, setAnimationClass] = useState('');

  useEffect(() => {
    if (show) {
      setAnimationClass('modal-show-forms');
    } else if (animationClass === 'modal-show') {
      setAnimationClass('modal-hide-forms');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show]);

  const handleClose = () => {
    setAnimationClass('modal-hide-forms');
    setTimeout(() => {
      onClose();
      setAnimationClass('');
    }, 300);
  };

  if (!show && animationClass !== 'modal-hide-forms') return null;

  const {
    idModalContainer = 'modal-container',
    idModalBody = 'modal-body',
    idModalFooter = 'modal-footer',
    idModalBtnClose = 'close-modal-button'
  } = modalIds || {};

  return (
    <div className="modal-backdrop-forms">
      <div id={idModalContainer} className={`modal-content-forms ${animationClass}`}>
        <div id={idModalBody} className="modal-body-forms">
          {children}
        </div>
        <div id={idModalFooter} className="modal-footer-forms">
          <button id="submit-button" className="submit-button-forms" onClick={onSubmit}>{buttonText}</button>
          <button id={idModalBtnClose} className="cancel-button-forms" onClick={handleClose}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};
