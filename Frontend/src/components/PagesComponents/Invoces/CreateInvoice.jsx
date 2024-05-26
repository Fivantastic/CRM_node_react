import Joi from 'joi';
import Swal from 'sweetalert2';
import { DynamicModalWrapper } from '../../FromModal/DynamicModalWrapper.jsx';
import { useState } from 'react';
import { joiErrorMessages } from '../../../Schema/Error/JoiErrorMesasage.js';
import { useUnasignedSales } from '../../../hooks/PagesHooks/useUnasignedSales.js';

export const CreateInvoice = ({ onAddInvoice, token }) => {
  const [reload, setReload] = useState(false);
  const unasignedSales = useUnasignedSales(token, reload);  

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
        const responseData = await response.json();
        console.log('Factura creada satisfactoriamente:', responseData);

        if (responseData.data && responseData.data.id_note) {
          onAddInvoice(responseData.data);
          Swal.fire({
            icon: 'success',
            title: 'Factura creada con éxito',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            position: 'top-end',
            toast: true,
          });

          setReload(!reload);
        } else {
          console.error('La respuesta del servidor no contiene id_invoice:', responseData);

        }
        
      } else {
        console.error('Error al crear la factura:', await response.text());
      }
    } catch (error) {
      console.error('Error durante la creación de la factura:', error);
    }
  };

  const title = 'Crear Factura';
  const nameButton = 'Crear';

  const invoiceFormFields = [
    {
      key: 'id_sale',
      name: 'id_sale',
      label: 'Venta *',
      type: 'select',
      options: {
        'Órdenes de venta': unasignedSales.map(sale => ({
          value: sale.id_sale,
          label: `${sale.ref_SL} - ${sale.customer_name}`
        }))
      },
      idLabel: 'labelRefSLInvoiceCreate',
      idInput: 'inputRefSLInvoiceCreate',
      required: true
    },
    // {
    //   key: 'payment_method',
    //   name: 'payment_method',
    //   label: 'Metodo De Pago *',
    //   type: 'select',
    //   // defaultValue: 'Transfecia',
    //   idLabel: 'labelMethodInvoiceCreate',
    //   idInput: 'inputMethodInvoiceCreate',
    //   options: {
    //     Metodo: {
    //       transfer: 'Transferencia',
    //       cash: 'Efectivo',
    //       card: 'Tarjeta',
    
    //     },
        
    //   },
    //   required: true,
    // },
    // {
    //   name: 'due_date',
    //   label: 'Vencimiento Del Pago',
    //   type: 'date',
    //   placeholder: 'Introduce el fecha...',
    //   idLabel: 'labelDateInvoiceCreate',
    //   idInput: 'inputDateInvoiceCreate',
    // },
  ];

  const StyleButton = {
    idBtn:'btnInvoiceCreate',
    idImgBtn:'imgCreateInvoiceBtn',
    srcImgBtn:'/addInvoice.svg', // TODO - Works?
    altImgBtn:'icono agregar Factura',
  }

  const invoiceSchema = Joi.object({
    sale_id: Joi.string().guid().required().messages(joiErrorMessages),
    payment_method: Joi.string().valid('cash', 'card', 'transfer').messages(joiErrorMessages),
    due_date: Joi.date().optional()
  });

  return (
    <DynamicModalWrapper
      title={title}
      fields={invoiceFormFields}
      schema={invoiceSchema}
      onSubmit={handleInvoiceCreatedAccion}
      buttonText={nameButton}
      dynamicIdModal="dynamicFormModal"
      StyleButton={StyleButton}
    />
  );
};
