import joi from 'joi';
import DynamicFormPopUp from '../../forms/DynamicFormPopUp.js';
import Swal from 'sweetalert2';

export const UpdateCustomer = ({ customer, token, onUpdateCustomer }) => {
  // Aqui hace la peticion al servidor
  const handleUpdateCustomerAccion = async (formData) => {
    try {
      const response = await fetch(
        `http://localhost:3000/customer/${customer}`,
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
        console.log('Cliente actualizada satisfactorio:', responseData);

        onUpdateCustomer(customer);

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
        console.error('Actualización cliente fallido:', errorData);
        // Aquí podrías mostrar un mensaje de error con Swal.fire si lo deseas
      }
    } catch (error) {
      // si la peticion falla
      console.error('Error durante la Actualización de cliente:', error);
      // Aquí podrías mostrar un mensaje de error con Swal.fire si lo deseas
    }
  };

  // Titulo de la ventana, CAMBIARLO SI ES NECESARIO
  const title = 'Actualizar Cliente';

  // Nombre que se muestra en el botón de submit, CAMBIARLO SI ES NECESARIO
  const nameButton = 'Actualizar';

  // Campos del formulario personalizables
  const updateCustomerFormFields = [
    {
      name: 'name',
      label: 'Nombre',
      type: 'text',
      placeholder: 'Introduce el nombre...',
      required: true,
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      placeholder: 'Introduce el email...',
      required: true,
    },
    {
      name: 'phone',
      label: 'Telefono',
      type: 'text',
      placeholder: 'Introduce el telefono...',
    },
    {
      name: 'company_name',
      label: 'Empresa',
      type: 'text',
      placeholder: 'Introduce el Empresa...',
    },
    {
      name: 'NIF',
      label: 'NIF',
      type: 'text',
      placeholder: 'Introduce el NIF...',
    },
  ];

  // Esquema de validación, que sea el mismo que hay en la base de datos, solo cambiando lo de message por el label
  const updateCustomerSchema = joi.object({
    name: joi.string().min(3).max(30).optional(),
    email: joi.string().email({ tlds: false }).optional().label('Email'),
    phone: joi.string().min(9).max(30).optional(),
    company_name: joi.string().min(0).max(30).optional(),
    NIF: joi.string().optional(),
  });

  // Crea el modal POP e inserta los campos y el esquema de validación, y luego retorna la informacion que tiene que introducir en el body
  const handleUpdateCustomer = () => {
    DynamicFormPopUp(
      title,
      updateCustomerFormFields,
      updateCustomerSchema,
      handleUpdateCustomerAccion,
      nameButton
    );
  };

  return (
    <>
      <button onClick={handleUpdateCustomer}>Actualizar Cliente</button>
    </>
  );
};
