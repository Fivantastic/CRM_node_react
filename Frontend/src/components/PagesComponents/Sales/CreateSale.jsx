import Joi from 'joi';
import Swal from 'sweetalert2';
import DynamicFormPopUp from '../../forms/DynamicFormPopUp.js';
import './SalesListTable.css';
import { useOpenProducts } from '../../../hooks/selectsHook/useOpenProducts.js';
import { useState } from 'react';
import { useOpenCustomers } from '../../../hooks/selectsHook/useOpenCustomer.js';

export const CreateSale = ({ onAddSale, token }) => {
  const [reload, setReload] = useState(false);
  const openProducts = useOpenProducts(token, reload);
  const openCustomers = useOpenCustomers(token, reload);
  const [formValues, setFormValues] = useState({
    id_product: '',
  });
  
  // Aqui hace la peticion al servidor
  const handleSaleCreatedAccion = async (formData) => {
    try {
      const response = await fetch('http://localhost:3000/sales/create', {
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
        console.log('Venta satisfactorio:', responseData);

        onAddSale(responseData.data);

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
          title: 'Venta Realizada con exito !',
        });
        setReload(!reload);
      } else {
        // si la peticion es incorrecta
        const errorData = await response.json();
        console.error('Venta fallido:', errorData);
        // Aquí podrías mostrar un mensaje de error con Swal.fire si lo deseas
      }
    } catch (error) {
      // si la peticion falla
      console.error('Error durante la venta:', error);
      // Aquí podrías mostrar un mensaje de error con Swal.fire si lo deseas
    }
  };

  // Titulo de la ventana, CAMBIARLO SI ES NECESARIO
  const title = 'Crear Venta';

  // Nombre que se muestra en el botón de submit, CAMBIARLO SI ES NECESARIO
  const nameButton = 'Crear';

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  // Campos del formulario personalizables
  const saleFormFields = [
    {
      key: 'id_product', 
      name: 'product',
      label: 'Producto',
      type: 'select',
      options: {
        'Productos': openProducts.map(product => ({
          value: product.id_product,
          label: `${product.ref_PR} - ${product.name}`
        }))
      },
      idLabel: 'labelNameSaleCreate',
      idInput: 'inputNameSaleCreate',
      required: true,
      onChange: handleFieldChange,
      value: formValues.id_product
    },
    {
      name: 'quantity',
      label: 'Cantidad ',
      type: 'text',
      placeholder: 'Introduce la cantidad de producto...',
      idLabel: 'labelQuantitySaleCreate',
      idInput: 'inputQuantitySaleCreate',
      required: true,
    },
    {
      key: 'id_customer', 
      name: 'customer',
      label: 'Cliente',
      type: 'select',
      options: {
        'Clientes': openCustomers.map(customer => ({
          value: customer.id_customer,
          label: `${customer.ref_CT} - ${customer.company_name}`
        }))
      },
      idLabel: 'labelCustomerSaleCreate',
      idInput: 'inputCustomerSaleCreate',
      required: true,
      onChange: handleFieldChange,
      value: formValues.id_customer
    },
  ];

  const saleSchema = Joi.object({
    product: Joi.string().required(),
    quantity: Joi.string().required(),
    customer: Joi.string().required(),
  });

  const handleClickCreateSale = () => {
    DynamicFormPopUp(
      title,
      saleFormFields,
      saleSchema,
      handleSaleCreatedAccion,
      nameButton
    );
  };
  return (
    <>
      <button
        id="btnSalesCreate"
        className=" mainCreateBtn"
        onClick={handleClickCreateSale}
      >
        <img
          id="imgUserCreate"
          src="/list_alt_add_24dp_FILL0_wght400_GRAD0_opsz24.svg"
          alt="Boton agregar usuario"
        />
      </button>
    </>
  );
};
