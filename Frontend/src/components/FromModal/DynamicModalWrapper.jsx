import { useState } from 'react';
import { DynamicFormModal } from './DynamicFormModal';

export const DynamicModalWrapper = ({ title, fields, schema, onSubmit, buttonText, dynamicIdModal, StyleButton }) => {
  const [showModal, setShowModal] = useState(false);
  const [initialValues, setInitialValues] = useState({});

  const handleClickOpen = () => {
    const initialFormValues = {};
    fields.forEach(field => {
      initialFormValues[field.name] = field.defaultValue || '';
    });
    setInitialValues(initialFormValues);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <button id={StyleButton.idBtn || ''} className='mainCreateBtn' onClick={handleClickOpen}>
        <img id={StyleButton.idImgBtn || ''} className='imgCreateBtn' src={StyleButton.srcImgBtn || ''} alt={StyleButton.altImgBtn || 'Icono'} />
      </button>
      <DynamicFormModal
        show={showModal}
        onClose={handleCloseModal}
        title={title}
        fields={fields}
        schema={schema}
        onSubmit={onSubmit}
        buttonText={buttonText}
        dynamicIdModal={dynamicIdModal}
        initialValues={initialValues}
        resetFormValues={() => setInitialValues({})}
      />
    </>
  );
};
