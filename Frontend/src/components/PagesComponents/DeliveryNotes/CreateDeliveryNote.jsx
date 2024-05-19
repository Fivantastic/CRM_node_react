import Joi from 'joi';
import Swal from 'sweetalert2';
import DynamicFormPopUp from '../../forms/DynamicFormPopUp.js';
import { useOpenSales } from '../../../hooks/PagesHooks/useOpenSales.js';
import { useDeliverers } from '../../../hooks/PagesHooks/useDeliverers.js';
import { useState } from 'react';

export const CreateDeliveryNote = ({ onAddDeliveryNote, token }) => {
  const openSales = useOpenSales(token);
  const deliverers = useDeliverers(token);

  const [formValues, setFormValues] = useState({
    ref_SL: '',
    deliverer_id: ''
  });

  const handleDeliveryNoteCreatedAction = async (formData) => {
    console.log('Form Data being sent to backend:', formData);

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
        console.log(responseData.data);

        // Asegúrate de que onAddDeliveryNote recibe el objeto de datos correcto
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
      } else {
        const errorData = await response.json();
        console.error('Error al crear la nota de entrega:', errorData);
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
      key: 'ref_SL', 
      name: 'ref_SL',
      label: 'Venta',
      type: 'select',
      options: openSales.map(sale => ({
        value: sale.ref_SL,
        label: sale.customer_name
      })),
      idLabel: 'labelRefSLNoteCreate',
      idInput: 'inputRefSLNoteCreate',
      required: true,
      onChange: handleFieldChange,
      value: formValues.ref_SL
    },
    {
      key: 'deliverer_id', 
      name: 'deliverer_id',
      label: 'Repartidor',
      type: 'select',
      options: deliverers.map(deliverer => ({
        value: deliverer.id_user, 
        label: `${deliverer.name} ${deliverer.last_name}` 
      })),
      idLabel: 'labelDelivererNoteCreate',
      idInput: 'inputDelivererNoteCreate',
      required: true,
      onChange: handleFieldChange,
      value: formValues.deliverer_id
    }
  ];

  const deliveryNoteSchema = Joi.object({
    ref_SL: Joi.string().required(),
    deliverer_id: Joi.string().guid().required()
  });

  const handleClickCreateDeliveryNote = () => {
    console.log('Current form values before opening popup:', formValues);
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
        <img id='imgCreateNoteBtn' className='imgCreateBtn' src="./addNote.svg" alt="icono agregar Albaran" />
      </button>
    </>

  );
};
