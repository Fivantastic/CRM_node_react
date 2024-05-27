import Swal from 'sweetalert2';
import { closedInvoiceSchema } from '../../../Schema/Error/updateSchema.js';
import { DynamicModalWrapper } from '../../FromModal/DynamicModalWrapper.jsx';
const URL = import.meta.env.VITE_URL;

export const ClosedInvoice = ({ onUpdateInvoice, invoice, token }) => {

  const handleclosedInvoiceAccion = async (formData) => {
    try {
      const response = await fetch(
        `${URL}/invoice/close/${invoice}`,
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
        //si la peticion es correcta
        const responseData = await response.json();
        console.log('Factura actualizada satisfactorio:', responseData);

        onUpdateInvoice(invoice);

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
        console.error('Actualización Factura fallido:', errorData);
        // Aquí podrías mostrar un mensaje de error con Swal.fire si lo deseas
      }
    } catch (error) {
      // si la peticion falla
      console.error('Error durante la Actualización de factura:', error);
      // Aquí podrías mostrar un mensaje de error con Swal.fire si lo deseas
    }
  };

  // Titulo de la ventana, CAMBIARLO SI ES NECESARIO
  const title = 'Actualizar estado';

  // Nombre que se muestra en el botón de submit, CAMBIARLO SI ES NECESARIO
  const nameButton = 'Actualizar';

  // Campos del formulario personalizables
  const updateSaleFormFields = [
    {
      name: 'invoice_status',
      label: 'Estado',
      type: 'select',
      required: false,
      idLabel: 'labelStatusInvoiceUpdate',
      idInput: 'inputStatusInvoiceUpdate',
      options: {
        Estado: [
          { value: 'pending', label: 'Pendiente' },
          { value: 'processing', label: 'Procesando' },
          { value: 'paid', label: 'Pagada' },
          { value: 'overdue', label: 'Vencida' },
          { value: 'partially_paid', label: 'Pago parcial' },
          { value: 'cancelled', label: 'Cancelada' },
          { value: 'refunded', label: 'Reembolsada' },
          { value: 'disputed', label: 'Reclamada' },
          { value: 'sent', label: 'Enviada' },
        ]
      },
    },
  ];

  const StyleButton = {
    action:'update',
  }

  const StyleAcceptBtn = {
    idAcceptBtn:'btnAcceptInvoiceUpdate',
    action:'update',
  }

  return (
    <DynamicModalWrapper
      title={title}
      fields={updateSaleFormFields}
      schema={closedInvoiceSchema}
      onSubmit={handleclosedInvoiceAccion}
      buttonText={nameButton}
      dynamicIdModal="dynamicFormModal"
      StyleButton={StyleButton}
      StyleAcceptBtn={StyleAcceptBtn}
    />
  );
  };
