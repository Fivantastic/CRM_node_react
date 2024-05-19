import Joi from 'joi';
import Swal from 'sweetalert2';
import DynamicFormPopUp from '../../forms/DynamicFormPopUp.js';
import { useOpenSales } from '../../../hooks/PagesHooks/useOpenSales.js';
import { useState, useEffect } from 'react';

export const CreateDeliveryNote = ({ onAddDeliveryNote, token }) => {
  const openSales = useOpenSales(token);
  const [selectedSale, setSelectedSale] = useState(null);
  const [formValues, setFormValues] = useState({
    deliverer_id: '',
    address_id: '',
    customer_id: '',
    saleProduct_id: ''
  });

  useEffect(() => {
    if (selectedSale !== null) {
      setFormValues({
        deliverer_id: selectedSale.deliverer_id || '',
        address_id: selectedSale.address_id || '',
        customer_id: selectedSale.id_customer || '',
        saleProduct_id: selectedSale.id_saleProduct || ''
      });
    }
  }, [selectedSale]);

  const handleDeliveryNoteCreatedAction = async (formData) => {
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

        onAddDeliveryNote(responseData.data);

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
          title: 'Nota de entrega creada con éxito',
        });
      } else {
        const errorData = await response.json();
        console.error('Error al crear la nota de entrega:', errorData);
      }
    } catch (error) {
      console.error('Error durante la creación de la nota de entrega:', error);
    }
  };

  const handleSaleChange = (e) => {
    const saleId = e.target.value;
    const sale = openSales.find(sale => sale.id_sale === saleId);
    setSelectedSale(sale);
  };

  const title = 'Crear Nota de Entrega';
  const nameButton = 'Crear';

  const deliveryNoteFormFields = [
    {
      key: `sale_id`, 
      name: 'sale_id',
      label: 'Venta',
      type: 'select',
      options: openSales.map(sale => ({
        value: sale.id_sale,
        label: sale.customer_name
      })),
      idLabel: 'labelSaleIdNoteCreate',
      idInput: 'inputSaleIdNoteCreate',
      required: true,
      onChange: handleSaleChange,
      value: selectedSale?.id_sale || ''
    },
    {
      key: `deliverer_id`, 
      name: 'deliverer_id',
      label: 'ID del Repartidor',
      type: 'text',
      placeholder: 'Introduce el ID del repartidor...',
      idLabel: 'labelDelivererNoteCreate',
      idInput: 'inputDelivererNoteCreate',
      required: true,
      value: formValues.deliverer_id,
      readOnly: true
    },
    {
      key: `address_id`, 
      name: 'address_id',
      label: 'ID de la Dirección',
      type: 'text',
      placeholder: 'Introduce el ID de la dirección...',
      idLabel: 'labelAddressIdNoteCreate',
      idInput: 'inputAddressIdNoteCreate',
      required: true,
      value: formValues.address_id,
      readOnly: true
    },
    {
      key: `customer_id`, 
      name: 'customer_id',
      label: 'ID del Cliente',
      type: 'text',
      placeholder: 'Introduce el ID del cliente...',
      idLabel: 'labelCustomerIdNoteCreate',
      idInput: 'inputCustomerIdNoteCreate',
      required: true,
      value: formValues.customer_id,
      readOnly: true
    },
    {
      key: `saleProduct_id`, 
      name: 'saleProduct_id',
      label: 'ID del Producto de la Venta',
      type: 'text',
      placeholder: 'Introduce el ID del producto de la venta...',
      idLabel: 'labelSaleProductIdNoteCreate',
      idInput: 'inputSaleProductIdNoteCreate',
      required: true,
      value: formValues.saleProduct_id,
      readOnly: true
    },
  ];

  const deliveryNoteSchema = Joi.object({
    sale_id: Joi.string().required(),
    deliverer_id: Joi.string().required(),
    address_id: Joi.string().required(),
    customer_id: Joi.string().required(),
    saleProduct_id: Joi.string().required(),
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
        <img id='imgCreateNoteBtn' className='imgCreateBtn' src="./addNote.svg" alt="icono agregar Albaran" />
      </button>
    </>
  );
};
