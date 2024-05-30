import Swal from 'sweetalert2';
import { DynamicModalWrapper } from '../../FromModal/DynamicModalWrapper.jsx';
import { updateDeliverySchema } from '../../../Schema/Error/updateSchema.js';
const URL = import.meta.env.VITE_URL;

export const UpdateDelivery = ({ onDeliveryNote, deliveryNote, token }) => {
  const handleUpdateDeliveryAction = async (formData) => {
    console.log(formData);
    try {
      const response = await fetch(
        `${URL}/deliveryNotes/close/${deliveryNote}`,
        {
          method: 'PUT',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        console.log(
          'Actualización de nota de entrega satisfactoria:',
          responseData
        );
        onDeliveryNote(deliveryNote);

        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        });

        Toast.fire({
          icon: 'success',
          title: 'Actualización realizada con éxito!',
        });
      } else {
        const errorData = await response.json();
        console.error(
          'Error en la actualización de la nota de entrega:',
          errorData
        );
      }
    } catch (error) {
      console.error(
        'Error durante la actualización de la nota de entrega:',
        error
      );
    }
  };

  'pending', 'readyToShipment', 'incidence', 'cancelled', 'delivering', 'delivered'

  const title = 'Actualizar Nota de Entrega';
  const nameButton = 'Actualizar';

  const updateDeliveryFormFields = [
    {
      name: 'delivery_status',
      label: 'Estado',
      type: 'select',
      defaultValue: '',
      required: false,
      idLabel: 'labelStatusNoteUpdate',
      idInput: 'inputStatusNoteUpdate',
      options: {
        Estados: [
          { value: 'readyToShipment', label: 'Listo para envio' },
          { value: 'cancelled', label: 'Cancelado' },
          { value: 'delivering', label: 'En reparto' },
          { value: 'incidence', label: 'Incidencia' },
          { value: 'pending', label: 'Pendiente' },
        ],
      },
    },
  ];

  const StyleButton = {
    action:'update',
  }

  const StyleAcceptBtn = {
    idAcceptBtn:'btnAcceptNoteUpdate',
    action:'update',
  }

  return (
    <DynamicModalWrapper
      title={title}
      fields={updateDeliveryFormFields}
      schema={updateDeliverySchema}
      onSubmit={handleUpdateDeliveryAction}
      buttonText={nameButton}
      dynamicIdModal="dynamicFormModal"
      StyleButton={StyleButton}
      StyleAcceptBtn={StyleAcceptBtn}
    />
  );
  };
