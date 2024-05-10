import Joi from 'joi';
import DynamicFormPopUp from '../../forms/DynamicFormPopUp.js';
import Swal from 'sweetalert2';

export const ClosedInvoice = ({ onUpdateInvoice, invoice, token }) => {
  /* const token = useUser(); */
  // Aqui hace la peticion al servidor
  const handleclosedInvoiceAccion = async (formData) => {
    try {
      const response = await fetch(
        `http://localhost:3000/invoice/close/${invoice}`,
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
  const title = 'Cerrar Factura';

  // Nombre que se muestra en el botón de submit, CAMBIARLO SI ES NECESARIO
  const nameButton = 'Cerrar';

  // Campos del formulario personalizables
  const updateSaleFormFields = [
    {
      name: 'invoice_status',
      label: 'Estado',
      type: 'select',
      options: {
        Estado: {
          paid: 'Pagado',
          overdue: 'Atrasada',
          partially_paid: 'Parcialmente pagado',
          cancelled: 'Cancelado',
          refunded: 'Reintegrada',
          disputed: 'Disputa',
          sent: 'Enviado',
        },
      },
    },
  ];

  // Esquema de validación, que sea el mismo que hay en la base de datos, solo cambiando lo de message por el label
  const closedInvoiceSchema = Joi.object({
    invoice_status: Joi.string()
      .valid(
        'pending',
        'paid',
        'overdue',
        'partially_paid',
        'cancelled',
        'refunded',
        'disputed',
        'sent'
      )
      .required(),
  });

  // Crea el modal POP e inserta los campos y el esquema de validación, y luego retorna la informacion que tiene que introducir en el body
  const handleClosedInvoice = () => {
    DynamicFormPopUp(
      title,
      updateSaleFormFields,
      closedInvoiceSchema,
      handleclosedInvoiceAccion,
      nameButton
    );
  };

  return (
    <>
      <button id='btnInvoiceClose' className=" mainCloseBtn" onClick={handleClosedInvoice}>Cerrar Factura</button>
    </>
  );
};
