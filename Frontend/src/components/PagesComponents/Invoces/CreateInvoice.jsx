import Swal from 'sweetalert2';
import { DynamicModalWrapper } from '../../FromModal/DynamicModalWrapper.jsx';
import { useState } from 'react';
import { useUnasignedSales } from '../../../hooks/selectsHook/useUnasignedSales.js';
import { createInvoiceSchema } from '../../../Schema/Error/createSchema.js';
const URL = import.meta.env.VITE_URL;

export const CreateInvoice = ({ onAddInvoice, token }) => {
  const [reload, setReload] = useState(false);
  const unasignedSales = useUnasignedSales(token, reload); 
  const handleInvoiceCreatedAccion = async (formData) => {
    try {
      const response = await fetch(`${URL}/invoice/create`, {
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
      key: 'sale_id',
      name: 'sale_id',
      label: 'Venta *',
      type: 'select',
      options: {
        'Órdenes de venta': unasignedSales.map(sale => ({
          value: sale.id_sale,
          label: `${sale.ref_SL} - ${sale.company}`
        }))
      },
      idLabel: 'labelRefSLInvoiceCreate',
      idInput: 'inputRefSLInvoiceCreate',
      required: true
    }
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

}