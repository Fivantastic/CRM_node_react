import Swal from 'sweetalert2';
import { newProductSchema } from '../../../Schema/Error/createSchema.js';
import { DynamicModalWrapper } from '../../FromModal/DynamicModalWrapper.jsx';
const URL = import.meta.env.VITE_URL;

export const CreateProduct = ({ onAddProduct, token }) => {  
  const handleProductCreate = async (formData) => {
    // Convertir el valor del estado a booleano
    formData.active = formData.active === 'true' ? true : false;
    
    try {
      const response = await fetch(`${URL}/product/register`, {
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
        console.log('Producto creado satisfactoriamente:', responseData);

        onAddProduct(responseData.data);

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
          title: 'Producto agregado con éxito',
        });
      } else {
        const errorData = await response.json();
        console.error('Agregado de producto fallido', errorData);
      }
    } catch (error) {
      console.error('Error al agregar el producto')
    }
  };

  const title = 'Crear producto';
  const nameButton = 'Crear';

  const ProductFormFields = [
    {
      name: 'name',
      label: 'Nombre *',
      type: 'text',
      idLabel: 'labelNameProductCreate',
      idInput: 'inputNameProductCreate',
      required: true,
    },
    {
      name: 'price',
      label: 'Precio *',
      type: 'text',
      idLabel: 'labelPriceProductCreate',
      idInput: 'inputPriceProductCreate',
      required: true,
    },
    {
      name: 'stock',
      label: 'Cantidad *',
      type: 'text',
      idLabel: 'labelStockProductCreate',
      idInput: 'inputStockProductCreate',
      required: true,
    },
    {
      name: 'description',
      label: 'Descripción',
      type: 'text',
      idLabel: 'labelDescriptionProductCreate',
      idInput: 'inputDescriptionProductCreate',
      required: false,
    },
    {
      name: 'active',
      label: 'Estado *',
      type: 'select',
      idLabel: 'labelStatusProductCreate',
      idInput: 'inputStatusProductCreate',
      required: true,
      options: {
        Estado: [
          { value: 'true', label: 'Activo' },
          { value: 'false', label: 'Inactivo' },
        ],
      },
    },
  ];

    // Estilos del boton, copia el id del antiguo
    const StyleButton = {
      idBtn:'btnProductCreate',
      idImgBtn:'imgProductCreate',
      srcImgBtn:'/AddProduct.svg',
      altImgBtn:'Boton agregar producto',
      action:'create'
    }
  
    const StyleAcceptBtn = {
      idAcceptBtn:'btnAcceptVisitsCreate',
      altImgBtn:'icono crear Visita',
      btnSvg:'/AddProductWhite.svg',
      altAcceptBtn:'Boton crear',
      action:'create'
    }


return (
  <DynamicModalWrapper
    title={title}
    fields={ProductFormFields}
    schema={newProductSchema}
    onSubmit={handleProductCreate}
    buttonText={nameButton}
    dynamicIdModal="dynamicFormModal"
    StyleButton={StyleButton}
    StyleAcceptBtn={StyleAcceptBtn}
  />
);
};
