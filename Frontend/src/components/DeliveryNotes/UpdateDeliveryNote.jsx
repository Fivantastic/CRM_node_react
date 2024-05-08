import Joi from 'joi';
import DynamicFormPopUp from '../forms/DynamicFormPopUp.js';
import Swal from 'sweetalert2';

const UpdateDelivery = ({ deliveryNote, token }) => {
  const handleUpdateDeliveryAction = async (formData) => {
    console.log(formData);
    try {
      const response = await fetch(
        `http://localhost:3000/deliveryNotes/close/${deliveryNote}`,
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
        console.log('Actualización de nota de entrega satisfactoria:', responseData);

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
        console.error('Error en la actualización de la nota de entrega:', errorData);
      }
    } catch (error) {
      console.error('Error durante la actualización de la nota de entrega:', error);
    }
  };

  const title = 'Actualizar Nota de Entrega';
  const nameButton = 'Actualizar';

  const updateDeliveryFormFields = [
    
    {
      name: 'delivery_status',
      label: 'Estado',
      type: 'select',
      options: {
        Estados:{
        pending: 'En proceso' ,
        cancelled: 'Cancelado' ,
        delivering: 'Cerrado' ,
        delivered: 'Entregado'
    }
    },
    },
  ];

  const updateDeliverySchema = Joi.object({

    delivery_status: Joi.string().required(),
  });

  const handleUpdateDelivery = () => {
    DynamicFormPopUp(
      title,
      updateDeliveryFormFields,
      updateDeliverySchema,
      handleUpdateDeliveryAction,
      nameButton
    );
  };

  return (
    <>
      <button onClick={handleUpdateDelivery}>Actualizar Nota de Entrega</button>
    </>
  );
};

export default UpdateDelivery;
