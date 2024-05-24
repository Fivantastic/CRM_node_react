import Joi from 'joi';
import DynamicFormPopUp from '../../forms/DynamicFormPopUp';
import { EditButton } from '../../buttons/EditButton.jsx';

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
      options: [
        { value: 'pending', label: 'Pendiente' },
        { value: 'inTransit', label: 'En Tránsito' },
        { value: 'delayed', label: 'Retrasado' },
      ],
      required: true,
    },
  ];

  const updateShipmentSchema = Joi.object({
    shipment_status: Joi.string().valid('pending', 'inTransit', 'delivered', 'delayed', 'cancelled').required(),
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
      <EditButton id="btnShipmentUpdate" className="mainUpdateBtn" onClick={handleUpdateShipment}/>
  );
};
