import Joi from 'joi';
import Swal from 'sweetalert2';
import DynamicFormPopUp from '../../forms/DynamicFormPopUp';
import usePendingDeliveryNotes from '../../../hooks/PagesHooks/usePendingDeliveryNotes';
import { useState } from 'react';

export const CreateShipment = ({ onAddShipment, token }) => {
  const [reload, setReload] = useState(false);
  const pendingDeliveryNotes = usePendingDeliveryNotes(token, reload);

  const [formValues, setFormValues] = useState({
    deliveryNote_id: '',
    shipment_status: '',
    additional_notes: ''
  });

  const handleShipmentCreatedAction = async (formData) => {
    try {
      const response = await fetch('http://localhost:3000/shipment/create', {
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

        if (responseData.id_shipment) {
          onAddShipment(responseData);
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
          console.error('La respuesta del servidor no contiene id_shipment:', responseData);
        }
      } else {
        console.error('Error al crear el envío:', await response.text());
      }
    } catch (error) {
      console.error('Error durante la creación del envío:', error);
    }
  };

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const title = 'Crear Envío';
  const nameButton = 'Crear';

  const createShipmentFormFields = [
    {
      key: 'deliveryNote_id',
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
      onChange: handleFieldChange,
      value: formValues.deliveryNote_id
    },
    {
      key: 'shipment_status',
      name: 'shipment_status',
      label: 'Estado',
      type: 'select',
      options: {
        'Estados': {
          inTransit: 'En proceso',
          cancelled: 'Cancelado',
          delayed: 'Retrasado'
        }
      },
      idLabel: 'labelShipmentStatusShipmentCreate',
      idInput: 'inputShipmentStatusShipmentCreate',
      required: true,
      onChange: handleFieldChange,
      value: formValues.shipment_status
    },
    {
      key: 'additional_notes',
      name: 'additional_notes',
      label: 'Notas adicionales',
      type: 'text',
      placeholder: 'Introduce notas adicionales...',
      idLabel: 'labelAdditionalNotesShipmentCreate',
      idInput: 'inputAdditionalNotesShipmentCreate',
      required: false,
      onChange: handleFieldChange,
      value: formValues.additional_notes
    }
  ];

  const createShipmentSchema = Joi.object({
    deliveryNote_id: Joi.string().guid().required(),
    shipment_status: Joi.string().valid('inTransit', 'cancelled', 'delayed', 'delivered').required(),
    additional_notes: Joi.string().allow('', null)
  }).messages({});

  const handleClickCreateShipment = () => {
    DynamicFormPopUp(
      title,
      createShipmentFormFields,
      createShipmentSchema,
      handleShipmentCreatedAction,
      nameButton,
      formValues
    );
  };

  return (
    <>
      <button id='btnShipmentCreate' className="mainCreateBtn" onClick={handleClickCreateShipment}>
        <img id='imgCreateShipmentBtn' className='imgCreateBtn' src="/shipmentRoute.svg" alt="icono agregar Envío" />
      </button>
    </>
  );
};
