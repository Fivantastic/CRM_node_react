import Joi from 'joi';
import Swal from 'sweetalert2';
import { useState } from 'react';
import { useOpenSales } from '../../../hooks/PagesHooks/useOpenSales.js';
import { useDeliverers } from '../../../hooks/PagesHooks/useDeliverers.js';
import { DynamicModalWrapper } from '../../FromModal/DynamicModalWrapper.jsx';
import { joiErrorMessages } from '../../../Schema/Error/JoiErrorMesasage.js';


export const CreateDeliveryNote = ({ onAddDeliveryNote, token }) => {
  const [reload, setReload] = useState(false);
  const openSales = useOpenSales(token, reload);
  const deliverers = useDeliverers(token, reload);

  const handleDeliveryNoteCreatedAction = async (formData) => {
    console.log(formData);
    try {
      const response = await fetch('http://localhost:3000/delivery-notes', {
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
        console.log('Nota de entrega creada satisfactoriamente:', responseData);
  
        if (responseData.data && responseData.data.id_note) {
          onAddDeliveryNote(responseData.data);
          Swal.fire({
            icon: 'success',
            title: 'Nota de entrega creada con éxito',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            position: 'top-end',
            toast: true,
          });
  
          setReload(!reload);
        } else {
          console.error('La respuesta del servidor no contiene id_note:', responseData);
        }
      } else {
        console.error('Error al crear la nota de entrega:', await response.text());
      }
    } catch (error) {
      console.error('Error durante la creación de la nota de entrega:', error);
    }
  };

  const title = 'Crear Nota de Entrega';
  const nameButton = 'Crear';

  const deliveryNoteFormFields = [
    {
      key: 'id_sale',
      name: 'id_sale',
      label: 'Venta *',
      type: 'select',
      options: {
        'Órdenes de venta': openSales.map(sale => ({
          value: sale.id_sale,
          label: `${sale.ref_SL} - ${sale.customer_name}`
        }))
      },
      idLabel: 'labelRefSLNoteCreate',
      idInput: 'inputRefSLNoteCreate',
      required: true
    },
    {
      key: 'deliverer_id',
      name: 'deliverer_id',
      label: 'Repartidor *',
      type: 'select',
      options: {
        'Repartidores': deliverers.map(deliverer => ({
          value: deliverer.id_user,
          label: `${deliverer.ref_US} - ${deliverer.name}`
        }))
      },
      idLabel: 'labelDelivererNoteCreate',
      idInput: 'inputDelivererNoteCreate',
      required: true
    }
  ];

  const StyleButton = {
    idBtn:'btnNoteCreate',
    idImgBtn:'imgCreateNoteBtn',
    srcImgBtn:'/addNote.svg',
    altImgBtn:'icono agregar Albaran',
    action:'create'
  }
  
  const deliveryNoteSchema = Joi.object({
    id_sale: Joi.string().guid().required().messages(joiErrorMessages),
    deliverer_id: Joi.string().guid().required().messages(joiErrorMessages),
  });

  return (
    <DynamicModalWrapper
      title={title}
      fields={deliveryNoteFormFields}
      schema={deliveryNoteSchema}
      onSubmit={handleDeliveryNoteCreatedAction}
      buttonText={nameButton}
      dynamicIdModal="dynamicFormModal"
      StyleButton={StyleButton}
    />
  );
};
