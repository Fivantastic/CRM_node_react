import Joi from 'joi';
import DynamicFormPopUp from '../../forms/DynamicFormPopUp';

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

  const title = 'Actualizar Envío';
  const nameButton = 'Actualizar';

  const updateShipmentFormFields = [
    {
      name: 'recipient_name',
      label: 'Nombre del destinatario',
      type: 'text',
      placeholder: 'Introduce el nombre del destinatario...',
      required: true,
    },
    {
      name: 'delivery_address',
      label: 'Dirección de entrega',
      type: 'text',
      placeholder: 'Introduce la dirección de entrega...',
      required: true,
    },
    
    {
      name: 'shipment_status',
      label: 'Estado del envío',
      type: 'text',
      placeholder: 'Introduce el estado del envío...',
      required: true,
    },
    
  ];

  const updateShipmentSchema = Joi.object({
    customer_id: Joi.string().optional().max(36),
    address: Joi.string().optional(),
    number: Joi.string().optional(),
    floor: Joi.string().optional(),
    letter_number: Joi.string().optional(),
    city: Joi.string().optional(),
    zip_code: Joi.string().optional(),
    country: Joi.string().optional(),
    deliveryNote_id: Joi.string().max(36),
    additional_notes: Joi.string().optional(),
  });

  const handleUpdateShipment = () => {
    DynamicFormPopUp(
      title,
      updateShipmentFormFields,
      updateShipmentSchema,
      handleUpdateShipmentAction,
      nameButton
    );
  };

  return (
    <>
      <button id='btnShipmentUpdate' className="mainUpdateBtn" onClick={handleUpdateShipment}>Actualizar Envío</button>
    </>
  );
};
