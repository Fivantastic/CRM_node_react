import Joi from 'joi';
import DynamicFormPopUp from '../../forms/DynamicFormPopUp.js';
import Swal from 'sweetalert2';
import { useUser } from '../../../context/authContext.jsx';

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

  // Titulo de la ventana, CAMBIARLO SI ES NECESARIO
  const title = 'Crear Factura';

  // Nombre que se muestra en el botón de submit, CAMBIARLO SI ES NECESARIO
  const nameButton = 'Crear';

  // Campos del formulario personalizables
  const invoiceFormFields = [
    {
      name: 'sale_id',
      label: 'Codigo De Venta',
      type: 'text',
      placeholder: 'Introduce el codigo...',
      required: true,
    },
    {
      name: 'payment_method',
      label: 'Metodo De Pago',
      type: 'select',
      options: {
        Estados: {
          cash: 'Efectivo',
          card: 'Tarjeta',
          transfer: 'Transfecia',
        },
      },
    },
    {
      name: 'due_date',
      label: 'Vencimiento Del Pago',
      type: 'date',
      placeholder: 'Introduce el fecha...',
    },
  ];

  const invoiceSchema = Joi.object({
    sale_id: Joi.string().guid().required(),
    payment_method: Joi.string().valid('cash', 'card', 'transfer').optional(),
    due_date: Joi.date().optional(),
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

  const handleClickCreateInvoice = () => {
    DynamicFormPopUp(
      title,
      invoiceFormFields,
      invoiceSchema,
      handleInvoiceCreatedAccion,
      nameButton
    );
  };
  return (
    <div>
      <button onClick={handleClickCreateInvoice}>Crear Factura</button>
    </div>
  );
};
