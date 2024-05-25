import { useState, useEffect } from 'react';
import './customModal.css';

export const CustomModal = ({ show, onClose, onSubmit, children, buttonText, isSubmitDisabled, customModalSize = {} }) => {
  const [animationClass, setAnimationClass] = useState('');

  useEffect(() => {
    if (show) {
      setAnimationClass('modal-show-custom');
    } else if (animationClass === 'modal-show-custom') {
      setAnimationClass('modal-hide');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show]);

  const handleClose = () => {
    setAnimationClass('modal-hide-custom');
    setTimeout(() => {
      onClose();
      setAnimationClass('');
    }, 300);
  };

  if (!show && animationClass !== 'modal-hide-custom') return null;

  const { 
    idModalContainer = 'modal-container-custom', 
    idModalBody = 'modal-body-custom', 
    idModalFooter = 'modal-footer-custom', 
    idModalBtnClose = 'close-modal-button-custom' 
  } = customModalSize;



  return (
    <div className="modal-backdrop-custom">
      <div id={idModalContainer} className={`modal-content-custom ${animationClass}`}>
        <div id={idModalBody} className="modal-body-custom">
          {children}
        </div>
        <div id={idModalFooter} className="modal-footer-custom">
          <button
            id="submit-button-custom"
            className="submit-button-custom"
            onClick={onSubmit}
            disabled={isSubmitDisabled}
          >
            {buttonText}
          </button>
          <button id={idModalBtnClose} className="cancel-button-custom" onClick={handleClose}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};