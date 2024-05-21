import Joi from 'joi';
import Swal from 'sweetalert2';
import DynamicFormPopUp from '../../forms/DynamicFormPopUp.js';
import { useOpenSales } from '../../../hooks/PagesHooks/useOpenSales.js';
import { useDeliverers } from '../../../hooks/PagesHooks/useDeliverers.js';
import { useState } from 'react';

export const CreateDeliveryNote = ({ onAddDeliveryNote, token }) => {
  const [reload, setReload] = useState(false);
  const openSales = useOpenSales(token, reload);
  const deliverers = useDeliverers(token, reload);

  const [formValues, setFormValues] = useState({
    id_sale: '',
    deliverer_id: ''
  });

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
  
          // Recargar datos de ventas y repartidores
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

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const title = 'Crear Nota de Entrega';
  const nameButton = 'Crear';

  const deliveryNoteFormFields = [
    {
      key: 'id_sale', 
      name: 'id_sale',
      label: 'Venta',
      type: 'select',
      options: {
        'Órdenes de venta': openSales.map(sale => ({
          value: sale.id_sale,
          label: `${sale.ref_SL} - ${sale.customer_name}`
        }))
      },
      idLabel: 'labelRefSLNoteCreate',
      idInput: 'inputRefSLNoteCreate',
      required: true,
      onChange: handleFieldChange,
      value: formValues.id_sale
    },
    {
      key: 'deliverer_id', 
      name: 'deliverer_id',
      label: 'Repartidor',
      type: 'select',
      options: {
        'Repartidores': deliverers.map(deliverer => ({
          value: deliverer.id_user,
          label: `${deliverer.ref_US} - ${deliverer.name} ${deliverer.last_name}` 
        }))
      },
      idLabel: 'labelDelivererNoteCreate',
      idInput: 'inputDelivererNoteCreate',
      required: true,
      onChange: handleFieldChange,
      value: formValues.deliverer_id
    }
  ];

  const deliveryNoteSchema = Joi.object({
    id_sale: Joi.string().guid().required(),
    deliverer_id: Joi.string().guid().required()
  });

  const handleClickCreateDeliveryNote = () => {
    DynamicFormPopUp(
      title,
      deliveryNoteFormFields,
      deliveryNoteSchema,
      handleDeliveryNoteCreatedAction,
      nameButton,
      formValues
    );
  };

  return (
    <>
      <button className="btnNoteCreate mainCreateBtn" onClick={handleClickCreateDeliveryNote}>
        <img id='imgCreateNoteBtn' className='imgCreateBtn' src="/addNote.svg" alt="icono agregar Albaran" />
      </button>
    </>
  );
};
