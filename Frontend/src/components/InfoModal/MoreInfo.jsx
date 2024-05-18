import { useState } from 'react';
import { ModalComponent } from './ModalComponent';
import { MoreInfoButton } from '../buttons/MoreInfoButton.jsx';

export const MoreInfo = ({ fields, modalIds }) => {
  const [showModal, setShowModal] = useState(false);

  const handleClick = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <>
      <MoreInfoButton onClick={handleClick} />
      <ModalComponent show={showModal} onClose={handleClose} fields={fields} modalIds={modalIds} />
    </>
  );
};
