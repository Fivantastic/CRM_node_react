import Swal from 'sweetalert2';
import { usePendingDeliveryNotes } from '../../../hooks/selectsHook/usePendingDeliveryNotes.js';
import { useState } from 'react';
import { createShipmentSchema } from '../../../Schema/Error/createSchema.js';
import { DynamicModalWrapper } from '../../FromModal/DynamicModalWrapper.jsx';

export const CreateShipment = ({ onAddShipment, token, typeModule }) => {
  const [reload, setReload] = useState(false);
  const pendingDeliveryNotes = usePendingDeliveryNotes(token, reload);
  const URL = import.meta.env.VITE_URL;


  const handleShipmentCreatedAction = async (formData) => {
    try {
      const response = await fetch(`${URL}/${typeModule}/create`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log('Envío creado satisfactoriamente:', responseData);

          onAddShipment(responseData.data);
          Swal.fire({
            icon: 'success',
            title: 'Envío creado con éxito!',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            position: 'top-end',
            toast: true,
          });

          // Recargar datos de notas de entrega
          setReload(!reload);

      } else {
        console.error('Error al crear el envío:', await response.text());
      }
    } catch (error) {
      console.error('Error durante la creación del envío:', error);
    }
  };

  const title = 'Crear Envío';
  const nameButton = 'Crear';

  const createShipmentFormFields = [
    {
      name: 'deliveryNote_id',
      label: 'Nota de entrega',
      type: 'select',
      options: {
        'Notas de entrega pendientes': pendingDeliveryNotes.map(note => ({
          value: note.id_note,
          label: `${note.ref_DN} - ${note.customer_name}`
        }))
      },
      idLabel: 'labelDeliveryNoteShipmentCreate',
      idInput: 'inputDeliveryNoteShipmentCreate',
      required: true,
    },
    {
      name: 'additional_notes',
      label: 'Notas adicionales',
      type: 'text',
      placeholder: 'Introduce notas adicionales...',
      idLabel: 'labelAdditionalNotesShipmentCreate',
      idInput: 'inputAdditionalNotesShipmentCreate',
      required: false,
    }
  ];
  
  // Estilos del boton, copia el id del antiguo
  const StyleButton = {
    idBtn:'btnShipmentCreate',
    idImgBtn:'imgCreateShipmentBtn',
    srcImgBtn:'/addShipment.svg',
    altImgBtn:'Boton agregar Envío',
    action:'create'
  }

  const StyleAcceptBtn = {
    idAcceptBtn:'btnAcceptShipmentCreate',
    altImgBtn:'icono crear envío',
    btnSvg:'/addShipmentWhite.svg',
    altAcceptBtn:'Boton crear',
    action:'create'
  }

  return (
      <DynamicModalWrapper
        title={title}
        fields={createShipmentFormFields}
        schema={createShipmentSchema}
        onSubmit={handleShipmentCreatedAction}
        buttonText={nameButton}
        dynamicIdModal="dynamicFormModal"
        StyleButton={StyleButton}
        StyleAcceptBtn={StyleAcceptBtn}
      />
  );
};