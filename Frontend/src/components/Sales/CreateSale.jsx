import Joi from 'joi';
import DynamicFormPopUp from '../forms/DynamicFormPopUp.js';
import { useUser } from '../../context/authContext.jsx';
import Swal from 'sweetalert2';

export const CreateSale = ({ onAddSale }) => {
  // Asi obtienes el token del usuario de la sesión
  const token = useUser();

  // Aqui hace la peticion al servidor
  const handleSaleDeLaAccion = async (formData, newSale) => {
    try {
      const response = await fetch('http://localhost:3000/sales/create', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`, //aqui ya entra el token
        },
        body: JSON.stringify(formData), // aqui va el formData lo que le envio lo del body
      });

      if (response.ok) {
        //si la peticion es correcta
        const responseData = await response.json();
        console.log('Venta satisfactorio:', responseData);

        onAddSale(newSale);

        // Aqui puedes mostrar un mensaje de exito con Swal que sale abajo a la derecha de la pantalla y dura 3 segundos
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
          title: 'Venta Realizada con exito !',
        });
      } else {
        // si la peticion es incorrecta
        const errorData = await response.json();
        console.error('Venta fallido:', errorData);
        // Aquí podrías mostrar un mensaje de error con Swal.fire si lo deseas
      }
    } catch (error) {
      // si la peticion falla
      console.error('Error durante la venta:', error);
      // Aquí podrías mostrar un mensaje de error con Swal.fire si lo deseas
    }
  };

  // Titulo de la ventana, CAMBIARLO SI ES NECESARIO
  const title = 'Crear Venta';

  // Nombre que se muestra en el botón de submit, CAMBIARLO SI ES NECESARIO
  const nameButton = 'Crear';

  // Campos del formulario personalizables
  const saleFormFields = [
    {
      name: 'id_user',
      label: 'Usuario',
      type: 'text',
      placeholder: 'Introduce el usuario...',
      required: true,
    },
    {
      name: 'saleProduct_id',
      label: 'Producto de venta',
      type: 'text',
      placeholder: 'Introduce el producto...',
      required: true,
    },
    {
      name: 'customer_id',
      label: 'Cliente',
      type: 'text',
      placeholder: 'Introduce el cliente...',
      required: true,
    },
  ];

  const saleSchema = Joi.object({
    id_user: Joi.string().required().min(36),
    saleProduct_id: Joi.string().required().min(36),
    customer_id: Joi.string().required().min(36),
  });

  const handleClickCreateSale = () => {
    DynamicFormPopUp(
      title,
      saleFormFields,
      saleSchema,
      handleSaleDeLaAccion,
      nameButton
    );
  };
  return (
    <div>
      <button onClick={handleClickCreateSale}>Crear Venta</button>
    </div>
  );
};
