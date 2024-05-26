import Swal from 'sweetalert2';
import './SalesListTable.css';
import { useOpenProducts } from '../../../hooks/selectsHook/useOpenProducts.js';
import { useState } from 'react';
import { useOpenCustomers } from '../../../hooks/selectsHook/useOpenCustomer.js';
import { DynamicModalWrapper } from '../../FromModal/DynamicModalWrapper.jsx';
import { saleSchema } from '../../../Schema/Error/createSchema.js';
const URL = import.meta.env.VITE_URL;

export const CreateSale = ({ onAddSale, token }) => {
  const [reload, setReload] = useState(false);
  const openProducts = useOpenProducts(token, reload);
  const openCustomers = useOpenCustomers(token, reload);
  
  // Aqui hace la peticion al servidor
  const handleSaleCreatedAccion = async (formData) => {
    try {
      const response = await fetch(`${URL}/sales/create`, {
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

  // Campos del formulario personalizables
  const saleFormFields = [
    {
      key: 'id_product', 
      name: 'product',
      label: 'Producto *',
      type: 'select',
      options: {
        Productos: openProducts.map(product => ({
          value: product.id_product,
          label: `${product.ref_PR} - ${product.name}`
        }))
      },
      idLabel: 'labelNameSaleCreate',
      idInput: 'inputNameSaleCreate',
      required: true,
    },
    {
      name: 'quantity',
      label: 'Cantidad *',
      type: 'text',
      placeholder: 'Introduce la cantidad de producto...',
      idLabel: 'labelQuantitySaleCreate',
      idInput: 'inputQuantitySaleCreate',
      required: true,
    },
    {
      key: 'id_customer', 
      name: 'customer',
      label: 'Cliente *',
      type: 'select',
      options: {
        Clientes: openCustomers.map(customer => ({
          value: customer.id_customer,
          label: `${customer.ref_CT} - ${customer.company_name}`
        }))
      },
      idLabel: 'labelCustomerSaleCreate',
      idInput: 'inputCustomerSaleCreate',
      required: true,
    },
  ];
  

  const StyleButton = {
    idBtn:'btnSalesCreate"',
    idImgBtn:'imgSaleCreate',
    srcImgBtn:'/addSales.svg',
    altImgBtn:'icono agregar Venta',
    action:'create'
  }

  const StyleAcceptBtn = {
    idAcceptBtn:'btnAcceptSalesCreate',
    altImgBtn:'icono crear Venta',
    btnSvg:'/addSalesWhite.svg',
    altAcceptBtn:'Boton crear',
    action:'create'
  }

  return (
    <DynamicModalWrapper
      title={title}
      fields={saleFormFields}
      schema={saleSchema}
      onSubmit={handleSaleCreatedAccion}
      buttonText={nameButton}
      dynamicIdModal="dynamicFormModal"
      StyleButton={StyleButton}
      StyleAcceptBtn={StyleAcceptBtn}
    />
  );
};
