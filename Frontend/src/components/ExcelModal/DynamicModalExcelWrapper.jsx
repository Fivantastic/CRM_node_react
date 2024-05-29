// src/components/ExportModal/DynamicModalExcelWrapper.jsx
import { useState } from 'react';
import { saveAs } from 'file-saver';
import { DynamicFormModal } from '../FromModal/DynamicFormModal.jsx';
import { ExportExcelButton } from './ExportExcelButton.jsx';

const URL = import.meta.env.VITE_URL;

export const DynamicModalExcelWrapper = ({ title, fields, tableName, token, nameButton, customModalSize, StyleAcceptBtn, onExport, schema }) => {
  const [showModal, setShowModal] = useState(false);

  const handleClickOpen = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleExport = async (formData) => {
    try {
      const response = await fetch(`${URL}/excel/export/${tableName}`, {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const blob = await response.blob();
      saveAs(blob, `${tableName}.xlsx`);
      handleCloseModal();
      if (onExport) {
        onExport();
      }
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  return (
    <>
      <ExportExcelButton onClick={handleClickOpen} />
      <DynamicFormModal
        show={showModal}
        onClose={handleCloseModal}
        title={title}
        fields={fields}
        onSubmit={handleExport}
        buttonText={nameButton}
        dynamicIdModal="exportExcelModal"
        customModalSize={customModalSize}
        StyleAcceptBtn={StyleAcceptBtn}
        schema={schema}
      />
    </>
  );
};
