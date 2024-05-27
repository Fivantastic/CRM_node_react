import Swal from 'sweetalert2';
import { createCustomerSchema } from '../../../Schema/Error/createSchema.js';
import { DynamicModalWrapper } from '../../FromModal/DynamicModalWrapper.jsx';
const URL = import.meta.env.VITE_URL;

export const CreateCustomer = ({ onAddCustomer, token, typeModule }) => {
  // Aquí hace la petición al servidor
  const handleCustomerCreatedAccion = async (formData) => {
    try {
      const response = await fetch(`${URL}/${typeModule}/register`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Si la petición es correcta
        const responseData = await response.json();
        console.log('Venta satisfactorio:', responseData);

        onAddCustomer(responseData.data);

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
          title: 'Cliente agregado con éxito!',
        });
      } else {
        // Si la petición es incorrecta
        const errorData = await response.json();
        console.error('Cliente fallido:', errorData);
        // Aquí podrías mostrar un mensaje de error con Swal.fire si lo deseas
      }
    } catch (error) {
      // Si la petición falla
      console.error('Error al agregar cliente:', error);
      // Aquí podrías mostrar un mensaje de error con Swal.fire si lo deseas
    }
  };

  // Título de la ventana, CAMBIARLO SI ES NECESARIO
  const title = 'Crear Cliente';

  // Nombre que se muestra en el botón de submit, CAMBIARLO SI ES NECESARIO
  const nameButton = 'Crear';

  // Campos del formulario personalizables
  const customerFormFields = [
    {
      name: 'name',
      label: 'Nombre *',
      type: 'text',
      idLabel: 'labelNameCustomerCreate',
      idInput: `inputNameCustomerCreate`,
      idInputContainer: `inputNameCustomerCreateContainer`,
      required: true,
    },
    {
      name: 'last_name',
      label: 'Apellidos *',
      type: 'text',
      idLabel: 'labelLastNameCustomerCreate',
      idInput: `inputLastNameCustomerCreate`,
      idInputContainer: `inputLastNameCustomerCreateContainer`,
      required: false,
    },
    {
      name: 'email',
      label: 'Email *',
      type: 'email',
      idLabel: 'labelEmailCustomerCreate',
      idInput: `inputEmailCustomerCreate`,
      idInputContainer: `inputEmailCustomerCreateContainer`,
      required: true,
    },
    {
      name: 'phone',
      label: 'Teléfono',
      type: 'text',
      idLabel: 'labelPhoneCustomerCreate',
      idInput: `inputPhoneCustomerCreate`,
      idInputContainer: `inputPhoneCustomerCreateContainer`,
      required: false,
    },
    {
      name: 'company_name',
      label: 'Empresa',
      type: 'text',
      idLabel: 'labelCompanyCustomerCreate',
      idInput: `inputCompanyCustomerCreate`,
      idInputContainer: `inputCompanyCustomerCreateContainer`,
      required: false,
    },
    {
      name: 'NIF',
      label: 'NIF',
      type: 'text',
      idLabel: 'labelNIFCustomerCreate',
      idInput: `inputNIFCustomerCreate`,
      idInputContainer: `inputNIFCustomerCreateContainer`,
      required: false,
    },
    {
      name: 'address',
      label: 'Dirección *',
      type: 'text',
      idLabel: 'labelAddressCustomerCreate',
      idInput: `inputAddressCustomerCreate`,
      idInputContainer: `inputAddressCustomerCreateContainer`,
      required: true,
    },
    {
      name: 'number',
      label: 'Número',
      type: 'text',
      idLabel: 'labelNumberCustomerCreate',
      idInput: `inputNumberCustomerCreate`,
      idInputContainer: `inputNumberCustomerCreateContainer`,
      required: false,
    },
    {
      name: 'city',
      label: 'Ciudad',
      type: 'text',
      idLabel: 'labelCityCustomerCreate',
      idInput: `inputCityCustomerCreate`,
      idInputContainer: `inputCityCustomerCreateContainer`,
      required: false,
    },
    {
      name: 'zip_code',
      label: 'C.P.',
      type: 'text',
      idLabel: 'labelZipCodeCustomerCreate',
      idInput: `inputZipCodeCustomerCreate`,
      idInputContainer: `inputZipCodeCustomerCreateContainer`,
      required: false,
    },
    {
      name: 'country',
      label: 'País',
      type: 'text',
      idLabel: 'labelCountryCustomerCreate',
      idInput: `inputCountryCustomerCreate`,
      idInputContainer: `inputCountryCustomerCreateContainer`,
      required: false,
    },
  ];


const StyleButton = {
  idBtn:'btnCustomerCreate',
  idImgBtn:'iconCustomerCreate',
  srcImgBtn:'/AddCustomer.svg',
  altImgBtn:'icono agregar cliente',
  action:'create'
}

const customModalSize = {
  idModalContainer:'createCustomerContainerModal',
  idModalFooter:'createCustomerFooterModal',
  idModalBtnClose:'createCustomerBtnCloseModal',
  idAcceptBtn:'createCustomerAcceptBtn',
}

const StyleAcceptBtn = {
  idAcceptBtn:'btnAcceptVisitsCreate',
  altImgBtn:'icono crear Visita',
  btnSvg:'/AddCustomerWhite.svg',
  altAcceptBtn:'Boton crear',
  action:'create'
}

return (
    <DynamicModalWrapper
      title={title}
      fields={customerFormFields}
      schema={createCustomerSchema}
      onSubmit={handleCustomerCreatedAccion}
      buttonText={nameButton}
      dynamicIdModal="customerCreateModal"
      StyleButton={StyleButton}
      customModalSize={customModalSize} 
      StyleAcceptBtn={StyleAcceptBtn}
    />
  );
};
