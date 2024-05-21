import Swal from 'sweetalert2';
import DynamicFormPopUp from '../../forms/DynamicFormPopUp.js';
import { createCustomerSchema } from '../../../Schema/Error/createSchema.js';

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

  // Id de la ventana customizable
  const dynamicIdModal = 'customerCreateModal';

  // Campos del formulario personalizables
  const customerFormFields = [
    {
      name: 'name',
      label: 'Nombre',
      type: 'text',
      placeholder: 'Introduce el nombre...',
      idLabel: 'labelNameCustomerCreate',
      idInput: `inputNameCustomerCreate`,
      idInputContainer: `inputNameCustomerCreateContainer`,
      required: true,
    },
    {
      name: 'last_name',
      label: 'Apellidos',
      type: 'text',
      placeholder: 'Introduce los apellidos...',
      idLabel: 'labelLastNameCustomerCreate',
      idInput: `inputLastNameCustomerCreate`,
      idInputContainer: `inputLastNameCustomerCreateContainer`,
      required: true,
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      idLabel: 'labelEmailCustomerCreate',
      idInput: `inputEmailCustomerCreate`,
      idInputContainer: `inputEmailCustomerCreateContainer`,
      placeholder: 'Introduce el email...',
      required: true,
    },
    {
      name: 'phone',
      label: 'Telefono',
      type: 'text',
      idLabel: 'labelPhoneCustomerCreate',
      idInput: `inputPhoneCustomerCreate`,
      placeholder: 'Introduce el telefono...',
      idInputContainer: `inputPhoneCustomerCreateContainer`,
      required: true,
    },
    {
      name: 'company_name',
      label: 'Empresa',
      type: 'text',
      idLabel: 'labelCompanyCustomerCreate',
      idInput: `inputCompanyCustomerCreate`,
      placeholder: 'Introduce el Empresa...',
      idInputContainer: `inputCompanyCustomerCreateContainer`,
      required: false,
    },
    {
      name: 'NIF',
      label: 'NIF',
      type: 'text',
      idLabel: 'labelNIFCustomerCreate',
      idInput: `inputNIFCustomerCreate`,
      placeholder: 'Introduce el NIF...',
      idInputContainer: `inputNIFCustomerCreateContainer`,
      required: false,
    },
    {
      name: 'address',
      label: 'Dirección',
      type: 'text',
      idLabel: 'labelAddressCustomerCreate',
      idInput: `inputAddressCustomerCreate`,
      placeholder: 'Introduce la dirección...',
      idInputContainer: `inputAddressCustomerCreateContainer`,
      required: false,
    },
    {
      name: 'number',
      label: 'Numero',
      type: 'text',
      idLabel: 'labelNumberCustomerCreate',
      idInput: `inputNumberCustomerCreate`,
      placeholder: 'Introduce el numero...', 
      idInputContainer: `inputNumberCustomerCreateContainer`, 
      required: false,
    },
    {
      name: 'city',
      label: 'Ciudad',
      type: 'text',
      idLabel: 'labelCityCustomerCreate',
      idInput: `inputCityCustomerCreate`,
      placeholder: 'Introduce la ciudad...',
      idInputContainer: `inputCityCustomerCreateContainer`,
      required: false,
    },
    {
      name: 'zip_code',
      label: 'C.P.',
      type: 'text',
      idLabel: 'labelZipCodeCustomerCreate',
      idInput: `inputZipCodeCustomerCreate`,
      placeholder: 'Introduce el C.P...',
      idInputContainer: `inputZipCodeCustomerCreateContainer`,
      required: false,
    },
    {
      name: 'country',
      label: 'Pais',
      type: 'text',
      idLabel: 'labelCountryCustomerCreate',
      idInput: `inputCountryCustomerCreate`,
      placeholder: 'Introduce el pais...',
      idInputContainer: `inputCountryCustomerCreateContainer`,
      required: false,
    },
  ];

  const handleClickCreateCustomer = () => {
    DynamicFormPopUp(
      title,
      customerFormFields,
      createCustomerSchema,
      handleCustomerCreatedAccion,
      nameButton,
      dynamicIdModal
    );
  };
  return (
    <>
      <button id='btnCustomerCreate' className=" mainCreateBtn" onClick={handleClickCreateCustomer}>
        <img id='iconCustomerCreate' className='imgCreateBtn' src="./AddCustomer.svg" alt="icono agregar cliente" />
      </button>
    </>
  );
};
