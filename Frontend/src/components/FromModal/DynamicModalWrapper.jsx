import { useState } from 'react';
import { DynamicFormModal } from './DynamicFormModal';
import { EditButton } from '../buttons/EditButton.jsx';
import { StyleButtonCreate } from '../buttons/StyleButtonCreate.jsx';
import { UpdateUser } from '../buttons/Profile/UpdateUser.jsx';

export const DynamicModalWrapper = ({ title, fields, schema, onSubmit, buttonText, dynamicIdModal, StyleButton, customModalSize, StyleAcceptBtn, initialValues = {} }) => {
  const [showModal, setShowModal] = useState(false);

  const handleClickOpen = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      {StyleButton.action === 'profileUpdate' ? 
        <UpdateUser StyleButton={StyleButton} onClick={handleClickOpen} />
        : (StyleButton.action === 'create' ? 
            <StyleButtonCreate StyleButton={StyleButton} onClick={handleClickOpen} />
            : <EditButton onClick={handleClickOpen} />
          )
      }
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
        resetFormValues={() => {}}
        customModalSize={customModalSize} 
        StyleAcceptBtn={StyleAcceptBtn}
      />
    </>
  );
};
