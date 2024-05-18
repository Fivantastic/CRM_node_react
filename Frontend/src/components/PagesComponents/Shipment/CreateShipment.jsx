import Joi from 'joi';
import DynamicFormPopUp from '../../forms/DynamicFormPopUp';
import Swal from 'sweetalert2';

export const CreateShipment = ({ onAddShipment, token }) => {
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

        onAddShipment(responseData.data);

        const Toast = Swal.mixin({
          toast: true,
          position: 'bottom-end',
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
          title: 'Envío creado con éxito!',
        });
      } else {
        const errorData = await response.json();
        console.error('Creación de envío fallida:', errorData);
      }
    } catch (error) {
      console.error('Error durante la creación de envío:', error);
    }
  };

  const title = 'Crear Envío';
  const nameButton = 'Crear';

  const createShipmentFormFields = [
    {
      name: 'customer_id',
      label: 'ID de cliente',
      type: 'text',
      placeholder: 'Introduce el ID de cliente...',
      idLabel: 'labelNameShipmentCreate',
      idInput: 'inputNameShipmentCreate',
      required: true,
    },
    {
      name: 'address_id',
      label: 'ID de dirección',
      type: 'text',
      placeholder: 'Introduce el ID de dirección...',
      idLabel: 'labelAddressShipmentCreate',
      idInput: 'inputAddressShipmentCreate',
      required: true,
    },
    {
      name: 'deliveryNote_id',
      label: 'ID de nota de entrega',
      type: 'text',
      placeholder: 'Introduce el ID de nota de entrega...',
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
      required: true,
    },
    {
      name: 'product_name',
      label: 'Nombre del producto',
      type: 'text',
      placeholder: 'Introduce el nombre del producto...',
      idLabel: 'labelProductNameShipmentCreate',
      idInput: 'inputProductNameShipmentCreate',
      required: true,
    },
    {
      name: 'product_quantity',
      label: 'Cantidad del producto',
      type: 'number',
      placeholder: 'Introduce la cantidad del producto...',
      idLabel: 'labelProductQuantityShipmentCreate',
      idInput: 'inputProductQuantityShipmentCreate',
      required: true,
    },
    {
      name: 'shipment_status',
      label: 'Estado',
      type: 'select',
      idLabel: 'labelShipmentStatusShipmentCreate',
      idInput: 'inputShipmentStatusShipmentCreate',
      options: {
        Estados:{
        inTransit: 'En proceso' ,
        cancelled: 'Cancelado' ,
        delayed: 'Retrasado' ,
        delivered: 'Entregado'
    }
    },
    },
  ];

  const createShipmentSchema = Joi.object({
    customer_id: Joi.string().required(),
    address_id: Joi.string().required(),
    deliveryNote_id: Joi.string(),
    additional_notes: Joi.string(),
    product_name: Joi.string().required(),
    product_quantity: Joi.number().required(),
    shipment_status: Joi.string().required(),
  }).messages({

  });

  const handleClickCreateShipment = () => {
    DynamicFormPopUp(
      title,
      createShipmentFormFields,
      createShipmentSchema,
      handleShipmentCreatedAction,
      nameButton
    );
  };

  return (
    <>
      <button id='btnShipmentCreate' className="mainCreateBtn" onClick={handleClickCreateShipment}>
        <img id='imgCreateShipmentBtn' className='imgCreateBtn' src="./shipmentRoute.svg" alt="" />
      </button>
    </>
  );
};
