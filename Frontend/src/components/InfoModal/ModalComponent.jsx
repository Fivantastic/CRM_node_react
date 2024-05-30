import { useState, useEffect } from 'react';
import './ModalComponent.css';

export const ModalComponent = ({ show, onClose, fields, modalIds }) => {
  const [animationClass, setAnimationClass] = useState('');

  useEffect(() => {
    if (show) {
      setAnimationClass('modal-show');
    } else if (animationClass === 'modal-show') {
      setAnimationClass('modal-hide');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show]);

  const handleClose = () => {
    setAnimationClass('modal-hide');
    setTimeout(() => {
      onClose();
      setAnimationClass('');
    }, 300); 
  };

  if (!show && animationClass !== 'modal-hide') return null;

  const {
    idModalContainer = 'modal-container',
    idModalHeader = 'modal-header',
    idModalTitle = 'modal-title',
    idModalBody = 'modal-body',
    idModalFooter = 'modal-footer',
    idModalBtnClose = 'close-modal-button',
  } = modalIds;

  return (
    <div className="modal-backdrop">
      <div id={idModalContainer} className={`modal-content ${animationClass}`}>
        <div id={idModalHeader} className="modal-header">
          <h2 id={idModalTitle} className="modal-title">Detalles</h2>
        </div>
        <div id={idModalBody} className="modal-body">
          {fields.map((field, index) => (
            <p id={field.id || ''} className={`modal-field ${field.color ? 'font-bold' : ''}`} key={index} style={field.color ? { color: field.color } : {}}><strong style={{ fontWeight: 'bold' }}>{field.label}: </strong>{field.value}</p>
          ))}
        </div>
        <div id={idModalFooter} className="modal-footer">
          <button id={idModalBtnClose} className="close-modal-button" onClick={handleClose}>Cerrar</button>
        </div>
      </div>
    </div>
  );
};
