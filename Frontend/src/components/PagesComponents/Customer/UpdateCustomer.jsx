import Swal from 'sweetalert2';
import DynamicFormPopUp from '../../forms/DynamicFormPopUp.js';
import { EditButton } from '../../buttons/EditButton.jsx';
import { updateCustomerSchema } from '../../../Schema/Error/updateSchema.js';

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
      idLabel: 'labelNameCustomerUpdate',
      idInput: 'inputNameCustomerUpdate',
      placeholder: 'Introduce el nombre...',
      required: true,
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      idLabel: 'labelEmailCustomerUpdate',
      idInput: 'inputEmailCustomerUpdate',
      placeholder: 'Introduce el email...',
      required: true,
    },
    {
      name: 'phone',
      label: 'Telefono',
      type: 'text',
      idLabel: 'labelPhoneCustomerUpdate',
      idInput: 'inputPhoneCustomerUpdate',
      placeholder: 'Introduce el telefono...',
    },
    {
      name: 'company_name',
      label: 'Empresa',
      type: 'text',
      idLabel: 'labelCompanyCustomerUpdate',
      idInput: 'inputCompanyCustomerUpdate',
      placeholder: 'Introduce el Empresa...',
    },
    {
      name: 'NIF',
      label: 'NIF',
      type: 'text',
      idLabel: 'labelNIFCustomerUpdate',
      idInput: 'inputNIFCustomerUpdate',
      placeholder: 'Introduce el NIF...',
    },
  ];

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
    <EditButton id='btnCustomerUpdate ' className="mainUpdateBtn" onClick={handleUpdateCustomer}/>
  );
};
