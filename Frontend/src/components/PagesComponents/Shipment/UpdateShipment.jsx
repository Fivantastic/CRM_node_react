import Swal from 'sweetalert2';
import { updateShipmentSchema } from '../../../Schema/Error/updateSchema.js';
import { DynamicModalWrapper } from '../../FromModal/DynamicModalWrapper.jsx';
const URL = import.meta.env.VITE_URL;

export const UpdateShipment = ({ shipment, onUpdateShipment, token }) => {
  const handleButtonUpdateShipment = async (formData) => {
    try {
      const response = await fetch(
        `${URL}/shipment/update/${shipment}`,
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
        console.log('Envío actualizado satisfactoriamente:', responseData);

        onUpdateShipment(responseData.data);
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
        console.error('Actualización de envío fallida:', errorData);
      }
    } catch (error) {
      console.error('Error durante la actualización del envío:', error);
    }
  };

  const title = 'Actualizar Estado de Envío';
  const nameButton = 'Actualizar';


  const updateShipmentFormFields = [
    {
      name: 'shipment_status',
      label: 'Estado del envío',
      type: 'select',
      options: {
        Estados: [
          { value: 'inTransit', label: 'En trásnsito' },
          { value: 'delivered', label: 'Entregado' },
          { value: 'delayed', label: 'Atrasado' },
          { value: 'cancelled', label: 'Cancelado' },
          { value: 'refused', label: 'Rechazado' },
        ],
      },
      required: false,
    },
  ];

  const StyleButton = {
    action: 'update',
  };

  const StyleAcceptBtn = {
    idAcceptBtn: 'btnAcceptShipmentUpdate',
    action: 'update',
  };

  return (
    <DynamicModalWrapper
      title={title}
      fields={updateShipmentFormFields}
      schema={updateShipmentSchema}
      onSubmit={handleButtonUpdateShipment}
      buttonText={nameButton}
      dynamicIdModal="dynamicFormModal"
      StyleButton={StyleButton}
      StyleAcceptBtn={StyleAcceptBtn}
    />
  );
};