import { useState, useEffect } from 'react';
import './ModalComponent.css';

export const ModalComponent = ({ show, onClose, fields }) => {
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

  return (
    <div className="modal-backdrop">
      <div className={`modal-content ${animationClass}`}>
        <div className="modal-header">
          <h2 className="modal-title">Detalles</h2>
        </div>
        <div className="modal-body">
          {fields.map((field, index) => (
            <p className="modal-field" key={index}><strong>{field.label}:</strong> {field.value}</p>
          ))}
        </div>
        <div className="modal-footer">
          <button className="close-modal-button" onClick={handleClose}>Cerrar</button>
        </div>
      </div>
    </div>
  );
};
