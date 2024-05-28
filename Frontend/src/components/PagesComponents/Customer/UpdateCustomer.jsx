import Swal from 'sweetalert2';
import { updateCustomerSchema } from '../../../Schema/Error/updateSchema.js';
import { DynamicModalWrapper } from '../../FromModal/DynamicModalWrapper.jsx';
const URL = import.meta.env.VITE_URL;

export const UpdateCustomer = ({ customerData, onUpdateCustomer, token }) => {
  // Aquí hace la petición al servidor
  const handleUpdateCustomerAccion = async (formData) => {
    try {
      const response = await fetch(`${URL}/customer/${customerData.id_customer}`, {
        method: 'PUT',
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
        console.log('Cliente actualizado satisfactoriamente:', responseData);

        // Actualiza el cliente localmente
        onUpdateCustomer(responseData.data.customer);

        // Mostrar un mensaje de éxito con Swal
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
        // Si la petición es incorrecta
        const errorData = await response.json();
        console.error('Actualización fallida:', errorData);
      }
    } catch (error) {
      // Si la petición falla
      console.error('Error durante la actualización del cliente:', error);
    }
  };

  // Título de la ventana
  const title = 'Actualizar Cliente';

  // Nombre que se muestra en el botón de submit
  const nameButton = 'Actualizar';

  // Campos del formulario personalizables
  const updateCustomerFormFields = [
    {
      name: 'name',
      label: 'Nombre',
      type: 'text',
      idLabel: 'labelNameCustomerCreate',
      idInput: `inputNameCustomerCreate`,
      idInputContainer: `inputNameCustomerCreateContainer`,
      required: false,
      defaultValue: customerData.name,
    },
    {
      name: 'last_name',
      label: 'Apellidos',
      type: 'text',
      idLabel: 'labelLastNameCustomerCreate',
      idInput: `inputLastNameCustomerCreate`,
      idInputContainer: `inputLastNameCustomerCreateContainer`,
      required: false,
      defaultValue: customerData.last_name,
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      idLabel: 'labelEmailCustomerCreate',
      idInput: `inputEmailCustomerCreate`,
      idInputContainer: `inputEmailCustomerCreateContainer`,
      required: false,
      defaultValue: customerData.email,
    },
    {
      name: 'phone',
      label: 'Teléfono',
      type: 'text',
      idLabel: 'labelPhoneCustomerCreate',
      idInput: `inputPhoneCustomerCreate`,
      idInputContainer: `inputPhoneCustomerCreateContainer`,
      required: false,
      defaultValue: customerData.phone,
    },
    {
      name: 'company_name',
      label: 'Empresa',
      type: 'text',
      idLabel: 'labelCompanyCustomerCreate',
      idInput: `inputCompanyCustomerCreate`,
      idInputContainer: `inputCompanyCustomerCreateContainer`,
      required: false,
      defaultValue: customerData.company_name,
    },
    {
      name: 'NIF',
      label: 'NIF',
      type: 'text',
      idLabel: 'labelNIFCustomerCreate',
      idInput: `inputNIFCustomerCreate`,
      idInputContainer: `inputNIFCustomerCreateContainer`,
      required: false,
      defaultValue: customerData.NIF,
    },
    {
      name: 'address',
      label: 'Dirección',
      type: 'text',
      idLabel: 'labelAddressCustomerCreate',
      idInput: `inputAddressCustomerCreate`,
      idInputContainer: `inputAddressCustomerCreateContainer`,
      required: false,
      defaultValue: customerData.address,
    },
    {
      name: 'number',
      label: 'Número',
      type: 'text',
      idLabel: 'labelNumberCustomerCreate',
      idInput: `inputNumberCustomerCreate`,
      idInputContainer: `inputNumberCustomerCreateContainer`,
      required: false,
      defaultValue: customerData.number,
    },
    {
      name: 'city',
      label: 'Ciudad',
      type: 'text',
      idLabel: 'labelCityCustomerCreate',
      idInput: `inputCityCustomerCreate`,
      idInputContainer: `inputCityCustomerCreateContainer`,
      required: false,
      defaultValue: customerData.city,
    },
    {
      name: 'zip_code',
      label: 'C.P.',
      type: 'text',
      idLabel: 'labelZipCodeCustomerCreate',
      idInput: `inputZipCodeCustomerCreate`,
      idInputContainer: `inputZipCodeCustomerCreateContainer`,
      required: false,
      defaultValue: customerData.zip_code,
    },
    {
      name: 'country',
      label: 'País',
      type: 'text',
      idLabel: 'labelCountryCustomerCreate',
      idInput: `inputCountryCustomerCreate`,
      idInputContainer: `inputCountryCustomerCreateContainer`,
      required: false,
      defaultValue: customerData.country,
    },
  ];

  const customModalSize = {
    idModalContainer:'createCustomerContainerModal',
    idModalFooter:'createCustomerFooterModal',
    idModalBtnClose:'createCustomerBtnCloseModal',
    idAcceptBtn:'createCustomerAcceptBtn',
  }

  const StyleButton = {
    action:'Update'
  }

  const StyleAcceptBtn = {
    idAcceptBtn:'btnAcceptVisitsUpdate',
    altImgBtn:'icono actualizar Visitas',
    altAcceptBtn:'Boton actualizar Visitas',
    action:'update',
  }

  return (
    <DynamicModalWrapper
      title={title}
      fields={updateCustomerFormFields}
      schema={updateCustomerSchema}
      onSubmit={handleUpdateCustomerAccion}
      buttonText={nameButton}
      dynamicIdModal="customerCreateModal"
      StyleButton={StyleButton}
      customModalSize={customModalSize}
      StyleAcceptBtn={StyleAcceptBtn}
      initialValues={customerData}
    />
  );
};
