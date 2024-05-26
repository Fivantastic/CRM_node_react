import Swal from 'sweetalert2';
import { useUser } from '../../../context/authContext.jsx';
import { createInvoiceSchema } from '../../../Schema/Error/createSchema.js';
import { DynamicModalWrapper } from '../../FromModal/DynamicModalWrapper.jsx';

export const CreateInvoice = ({ onAddInvoice }) => {
  const token = useUser();
  // peticion al servidor
  const handleInvoiceCreatedAccion = async (formData) => {
    try {
      const response = await fetch('http://localhost:3000/invoice', {
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
        console.log('Factura satisfactorio:', responseData);

        onAddInvoice(responseData.data);

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
          title: 'Factura Realizada con exito !',
        });
      } else {
        // si la peticion es incorrecta
        const errorData = await response.json();
        console.error('Factura fallido:', errorData);
        // Aquí podrías mostrar un mensaje de error con Swal.fire si lo deseas
      }
    } catch (error) {
      // si la peticion falla
      console.error('Error durante la Factura:', error);
      // Aquí podrías mostrar un mensaje de error con Swal.fire si lo deseas
    }
  };

  // Titulo de la ventana
  const title = 'Crear Factura';

  // Nombre que se muestra en el botón de submit
  const nameButton = 'Crear';

  // Campos del formulario personalizables
  const invoiceFormFields = [
    {
      name: 'sale_id',
      label: 'Referencia de Venta *',
      type: 'text',
      placeholder: 'Introduce el código...',
      idLabel: 'labelNameInvoiceCreate',
      idInput: 'inputNameInvoiceCreate',
      required: true,
    },
    {
      name: 'payment_method',
      label: 'Método de Pago',
      type: 'select',
      required: false,
      idLabel: 'labelMethodInvoiceCreate',
      idInput: 'inputMethodInvoiceCreate',
      options: {
        Métodos: [
          { value: 'transfer', label: 'Transferencia' },
          { value: 'cash', label: 'Efectivo' },
          { value: 'card', label: 'Tarjeta' },
        ],
      },
    },
    {
      name: 'due_date',
      label: 'Vencimiento del Pago',
      type: 'date',
      placeholder: 'Introduce la fecha...',
      idLabel: 'labelDateInvoiceCreate',
      idInput: 'inputDateInvoiceCreate',
      required: true,
    },
  ];
  
  const StyleButton = {
    idBtn:'btnInvoiceCreate',
    idImgBtn:'imgInvoiceCreateBtn',
    srcImgBtn:'/addInvoice.svg',
    altImgBtn:'Boton agregar factura',
    action:'create'
  }

  const StyleAcceptBtn = {
    idAcceptBtn:'btnAcceptInvoiceCreate',
    altImgBtn:'icono crear factura',
    btnSvg:'/addInvoiceWhite.svg',
    altAcceptBtn:'Boton crear',
    action:'create'
  }

  return (
    <DynamicModalWrapper
      title={title}
      fields={invoiceFormFields}
      schema={createInvoiceSchema}
      onSubmit={handleInvoiceCreatedAccion}
      buttonText={nameButton}
      dynamicIdModal="dynamicFormModal"
      StyleButton={StyleButton}
      StyleAcceptBtn={StyleAcceptBtn}
    />
);
};
