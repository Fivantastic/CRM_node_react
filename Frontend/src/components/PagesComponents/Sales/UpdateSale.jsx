import Swal from 'sweetalert2';
const URL = import.meta.env.VITE_URL;
import './SalesListTable.css';
import { useState } from 'react';
import { useOpenCustomers } from '../../../hooks/selectsHook/useOpenCustomer.js';
import { updateSaleSchema } from '../../../Schema/Error/updateSchema.js';
import { DynamicModalWrapper } from '../../FromModal/DynamicModalWrapper.jsx';


export const UpdateSale = ({ onUpdateSale, sale, token}) => {
  const [reload, setReload] = useState(false);
  const openCustomers = useOpenCustomers(token, reload);

  // Aqui hace la peticion al servidor
  const handleUpdateSaleAccion = async (formData) => {
    try {
      const response = await fetch(`${URL}/sales/update/${sale}`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`,
        },
        body: JSON.stringify(formData), 
      });
      console.log(response);

      if (response.ok) {
        //si la peticion es correcta
        const responseData = await response.json();
        console.log('Venta actualizada satisfactorio:', responseData);
        onUpdateSale(sale);

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

        setReload(!reload);
      } else {
        // si la peticion es incorrecta
        const errorData = await response.json();
        console.error('Actualización Venta fallido:', errorData);
        // Aquí podrías mostrar un mensaje de error con Swal.fire si lo deseas
      }
    } catch (error) {
      // si la peticion falla
      console.error('Error durante la Actualización de venta:', error);
      // Aquí podrías mostrar un mensaje de error con Swal.fire si lo deseas
    }
  };

  // Titulo de la ventana
  const title = 'Actualizar Venta';
  // Nombre que se muestra en el botón de submit
  const nameButton = 'Actualizar';

  // Campos del formulario personalizables
  const updateSaleFormFields = [
    {
      name: 'quantity',
      label: 'Cantidad',
      type: 'text',
      placeholder: 'Introduce la cantidad de producto...',
      idLabel: 'labelQuantitySaleUpdate',
      idInput: 'inputQuantitySaleUpdate',
      required: false,
    },
    {
      key: 'id_customer', 
      name: 'customer',
      label: 'Cliente',
      type: 'select',
      options: {
        Clientes: openCustomers.map(customer => ({
          value: customer.id_customer,
          label: `${customer.ref_CT} - ${customer.company_name}`
        }))
      },
      idLabel: 'labelCustomerSaleUpdate',
      idInput: 'inputCustomerSaleUpdate',
      required: false,
    },
  ];
  

  const StyleButton = {
    action:'Update'
  }
  const StyleAcceptBtn = {
    idAcceptBtn:'btnAcceptSalesUpdate',
    altImgBtn:'icono actualizar Venta',
    btnSvg:'/addSalesWhite.svg',
    altAcceptBtn:'Boton actualizar Venta',
    action:'update'
  }
  
  return (
    <DynamicModalWrapper
      title={title}
      fields={updateSaleFormFields}
      schema={updateSaleSchema}
      onSubmit={handleUpdateSaleAccion}
      buttonText={nameButton}
      dynamicIdModal="dynamicFormModal"
      StyleButton={StyleButton}
      StyleAcceptBtn={StyleAcceptBtn}
    />
    
  );
};
