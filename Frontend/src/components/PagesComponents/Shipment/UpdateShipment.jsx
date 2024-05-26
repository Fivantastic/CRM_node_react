import { updateShipmentSchema } from '../../../Schema/Error/updateSchema.js';
import { DynamicModalWrapper } from '../../FromModal/DynamicModalWrapper.jsx';

export const UpdateShipment = ({ onUpdateShipment, shipment, token }) => {
  const handleUpdateShipmentAction = async (formData) => {
    try {
      const response = await fetch(
        `http://localhost:3000/shipment/update/${shipment}`,
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
        onUpdateShipment(shipment);
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
          { value: 'pending', label: 'Pendiente' },
          { value: 'inTransit', label: 'En Tránsito' },
          { value: 'delayed', label: 'Retrasado' },
          { value: 'cancelled', label: 'Cancelado' },
          { value: 'delivered', label: 'Entregado' },
        ]
      },
      required: false,
    },
  ];
  

  const StyleButton = {
    action:'update',
  }

  const StyleAcceptBtn = {
    idAcceptBtn:'btnAcceptShipmentUpdate',
    action:'update',
  }

  return (
      <DynamicModalWrapper
        title={title}
        fields={updateShipmentFormFields}
        schema={updateShipmentSchema}
        onSubmit={handleUpdateShipmentAction}
        buttonText={nameButton}
        dynamicIdModal="dynamicFormModal"
        StyleButton={StyleButton}
        StyleAcceptBtn={StyleAcceptBtn}
      />
    );
  };