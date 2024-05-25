import Joi from 'joi';
import Swal from 'sweetalert2';
import DynamicFormPopUp from '../../forms/DynamicFormPopUp.js';
import { EditButton } from '../../buttons/EditButton.jsx';
const URL = import.meta.env.VITE_URL;
import './SalesListTable.css';
import { useState } from 'react';
/* import { useOpenProducts } from '../../../hooks/selectsHook/useOpenProducts.js'; */
import { useOpenCustomers } from '../../../hooks/selectsHook/useOpenCustomer.js';


export const UpdateSale = ({ onUpdateSale, sale, token}) => {
  const [listStatus, setListStatus] = useState([]);
  const [reload, setReload] = useState(false);
  /* const openProducts = useOpenProducts(token, reload); */
  const openCustomers = useOpenCustomers(token, reload);
  const [formValues, setFormValues] = useState({
    id_product: '',
  });
  

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
        body: JSON.stringify(formData), // aqui va el formData lo que le envio lo del body
      });
      console.log(response);

      if (response.ok) {
        //si la peticion es correcta
        const responseData = await response.json();
        console.log('Venta actualizada satisfactorio:', responseData);
        onUpdateSale(sale);
        setListStatus(responseData.data);
        console.log(responseData.data);

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

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  // Titulo de la ventana, CAMBIARLO SI ES NECESARIO
  const title = 'Actualizar Venta';

  // Nombre que se muestra en el botón de submit, CAMBIARLO SI ES NECESARIO
  const nameButton = 'Actualizar';

  // Campos del formulario personalizables
  const updateSaleFormFields = [
    /* {
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
    }, */
    {
      name: 'quantity',
      label: 'Cantidad',
      type: 'text',
      placeholder: 'Introduce la cantidad de producto...',
      idLabel: 'labelQuantitySaleUpdate',
      idInput: 'inputQuantitySaleUpdate',
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

  // Esquema de validación, que sea el mismo que hay en la base de datos, solo cambiando lo de message por el label
  const updateSaleSchema = Joi.object({
    /* product: Joi.string().optional(), */
    quantity: Joi.string().optional(),
    customer: Joi.string().optional(),
    /* operation_status: Joi.string().optional(), */
  });

  // Crea el modal POP e inserta los campos y el esquema de validación, y luego retorna la informacion que tiene que introducir en el body
  const handleUpdateSale = () => {
    DynamicFormPopUp(
      title,
      updateSaleFormFields,
      updateSaleSchema,
      handleUpdateSaleAccion,
      nameButton
    );
  };

  return (
    <>
      {listStatus !== 'closed' && (
        <EditButton
          id="btnSalesUpdate"
          className="mainUpdateBtn"
          onClick={handleUpdateSale}
        />
      )}
    </>
  );
};
