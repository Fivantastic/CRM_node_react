import joi from 'joi';
import DynamicFormPopUp from '../../forms/DynamicFormPopUp.js';
import Swal from 'sweetalert2';

export const CreateCustomer = ({ onAddCustomer, token }) => {
  // Aqui hace la peticion al servidor
  const handleCustomerCreatedAccion = async (formData) => {
    try {
      const response = await fetch('http://localhost:3000/customer/register', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        //si la peticion es correcta
        const responseData = await response.json();
        console.log('Venta satisfactorio:', responseData);

        onAddCustomer(responseData.data);

        // Aqui puedes mostrar un mensaje de exito con Swal que sale abajo a la derecha de la pantalla y dura 3 segundos
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
          title: 'Cliente agregado con exito !',
        });
      } else {
        // si la peticion es incorrecta
        const errorData = await response.json();
        console.error('Cliente fallido:', errorData);
        // Aquí podrías mostrar un mensaje de error con Swal.fire si lo deseas
      }
    } catch (error) {
      // si la peticion falla
      console.error('Error al agregar cliente:', error);
      // Aquí podrías mostrar un mensaje de error con Swal.fire si lo deseas
    }
  };

  // Titulo de la ventana, CAMBIARLO SI ES NECESARIO
  const title = 'Crear Cliente';

  // Nombre que se muestra en el botón de submit, CAMBIARLO SI ES NECESARIO
  const nameButton = 'Crear';

  // Campos del formulario personalizables
  const customerFormFields = [
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

  const customerSchema = joi.object({
    name: joi.string().min(3).max(30).required(),
    email: joi.string().email({ tlds: false }).required().label('Email'),
    phone: joi.string().min(9).max(30).optional(),
    company_name: joi.string().min(0).max(30).optional(),
    NIF: joi.string().optional(),
  });

  const handleClickCreateCustomer = () => {
    DynamicFormPopUp(
      title,
      customerFormFields,
      customerSchema,
      handleCustomerCreatedAccion,
      nameButton
    );
  };
  return (
    <>
      <button className="btnCustomerCreate mainCreateBtn" onClick={handleClickCreateCustomer}>Crear Cliente</button>
    </>
  );
};
