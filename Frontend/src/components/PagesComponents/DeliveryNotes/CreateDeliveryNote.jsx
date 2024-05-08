import Joi from 'joi';
import DynamicFormPopUp from '../../forms/DynamicFormPopUp.js';
import Swal from 'sweetalert2';

export const CreateDeliveryNote = ({ onAddDeliveryNote, token }) => {
  const handleDeliveryNoteCreatedAction = async (formData) => {
    try {
      const response = await fetch('http://localhost:3000/delivery-notes', {
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
        console.log('Nota de entrega creada satisfactoriamente:', responseData);

        onAddDeliveryNote(responseData.data);

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
          title: 'Nota de entrega creada con éxito',
        });
      } else {
        const errorData = await response.json();
        console.error('Error al crear la nota de entrega:', errorData);
      }
    } catch (error) {
      console.error('Error durante la creación de la nota de entrega:', error);
    }
  };

  const title = 'Crear Nota de Entrega';
  const nameButton = 'Crear';

  const deliveryNoteFormFields = [
    {
      name: 'sale_id',
      label: 'ID de Venta',
      type: 'text',
      placeholder: 'Introduce el ID de venta...',
      required: true,
    },
    {
      name: 'deliverer_id',
      label: 'ID del Repartidor',
      type: 'text',
      placeholder: 'Introduce el ID del repartidor...',
      required: true,
    },
    // Otros campos según necesites
  ];

  const deliveryNoteSchema = Joi.object({
    sale_id: Joi.string().required(),
    deliverer_id: Joi.string().required(),
    // Otros campos según necesites
  });

  const handleClickCreateDeliveryNote = () => {
    DynamicFormPopUp(
      title,
      deliveryNoteFormFields,
      deliveryNoteSchema,
      handleDeliveryNoteCreatedAction,
      nameButton
    );
  };

  return (
    <div>
      <button onClick={handleClickCreateDeliveryNote}>Crear Nota de Entrega</button>
    </div>
  );
};
