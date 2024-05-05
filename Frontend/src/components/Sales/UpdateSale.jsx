import Joi from 'joi';
import DynamicFormPopUp from '../forms/DynamicFormPopUp.js';
import { useUser } from '../../context/authContext.jsx';
import Swal from 'sweetalert2';

export const UpdateSale = ({ sale }) => {
  // Asi obtienes el token del usuario de la sesión
  const token = useUser();

  // Aqui hace la peticion al servidor
  const handleUpdateSaleAccion = async (formData) => {
    try {
      const response = await fetch(
        `http://localhost:3000/sales/update/${sale}`,
        {
          method: 'PUT',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${token}`,
          },
          body: JSON.stringify(formData), // aqui va el formData lo que le envio lo del body
        }
      );

      if (response.ok) {
        //si la peticion es correcta
        const responseData = await response.json();
        console.log('Venta actualizada satisfactorio:', responseData);

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
          title: 'Actualización Realizada con exito ! ',
        });
      } else {
        // si la peticion es incorrecta
        const errorData = await response.json();
        console.error('Actualización Venta fallido:', errorData);
        // Aquí podrías mostrar un mensaje de error con Swal.fire si lo deseas
      }
    } catch (error) {
      // si la peticion falla
      console.error('Error durante la Actualización de venta:', error);
      // Aquí podrías mostrar un mensaje de error con Swal.fire si lo deseas
    }
  };

  // Titulo de la ventana, CAMBIARLO SI ES NECESARIO
  const title = 'Actualizar Venta';

  // Nombre que se muestra en el botón de submit, CAMBIARLO SI ES NECESARIO
  const nameButton = 'Actualizar';

  // Campos del formulario personalizables
  const updateSaleFormFields = [
    {
      name: 'id_user',
      label: 'Usuario',
      type: 'text',
      placeholder: 'Introduce el usuario...',
    },
    {
      name: 'saleProduct_id',
      label: 'Producto de venta',
      type: 'text',
      placeholder: 'Introduce el producto...',
    },
    {
      name: 'customer_id',
      label: 'Cliente',
      type: 'text',
      placeholder: 'Introduce el cliente...',
    },
    {
      name: 'operation_status',
      label: 'Estado',
      type: 'select',
      options: [
        { value: 'open', label: 'open' },
        { value: 'cancelled', label: 'cancelled' },
        { value: 'closed', label: 'closed' },
      ],
    },
  ];

  // Esquema de validación, que sea el mismo que hay en la base de datos, solo cambiando lo de message por el label
  const updateSaleSchema = Joi.object({
    id_user: Joi.string().optional().min(36),
    saleProduct_id: Joi.string().optional().min(36),
    customer_id: Joi.string().optional().min(36),
    operation_status: Joi.string().optional(),
  });

  // Crea el modal POP e inserta los campos y el esquema de validación, y luego retorna la informacion que tiene que introducir en el body
  const handleUpdateSale = () => {
    DynamicFormPopUp(
      title,
      updateSaleFormFields,
      updateSaleSchema,
      handleUpdateSaleAccion,
      nameButton
    );
  };

  return (
    <div>
      <button onClick={handleUpdateSale}>Actualizar Venta</button>
    </div>
  );
};
