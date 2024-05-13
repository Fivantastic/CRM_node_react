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
      name: 'customer_id',
      label: 'ID de cliente',
      type: 'text',
      placeholder: 'Introduce el ID de cliente...',
      idLabel: 'labelNameShipmentUpdate',
      idInput: 'inputNameShipmentUpdate',
      required: true,
    },

   {
      name: 'number',
      label: 'Número',
      type: 'text',
      placeholder: 'Introduce el número...',
      idLabel: 'labelAddressShipmentUpdate',
      idInput: 'inputAddressShipmentUpdate',
      required: true,
    },
    {
      name: 'floor',
      label: 'Piso',
      type: 'text',
      placeholder: 'Introduce el piso...',
      required: false,
    },
    {
      name: 'letter_number',
      label: 'Número de puerta',
      type: 'text',
      placeholder: 'Introduce el número de puerta...',
      required: false,
    },
    {
      name: 'city',
      label: 'Ciudad',
      type: 'text',
      placeholder: 'Introduce la ciudad...',
      required: false,
    },
    {
      name: 'zip_code',
      label: 'Código Postal',
      type: 'text',
      placeholder: 'Introduce el código postal...',
      required: false,
    },
    {
      name: 'country',
      label: 'País',
      type: 'text',
      placeholder: 'Introduce el país...',
      required: false,
    },
    {
      name: 'deliveryNote_id',
      label: 'ID de nota de entrega',
      type: 'text',
      placeholder: 'Introduce el ID de nota de entrega...',
      required: false,
    },
    {
      name: 'additional_notes',
      label: 'Notas adicionales',
      type: 'text',
      placeholder: 'Introduce el estado del envío...',
      idLabel: 'labelStatusShipmentUpdate',
      idInput: 'inputStatusShipmentUpdate',
      required: true,
    },
  ];

  const updateShipmentSchema = Joi.object({
    customer_id: Joi.string().optional(),
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
