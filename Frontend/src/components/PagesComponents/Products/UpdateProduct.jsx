import Swal from 'sweetalert2';
import { useUser } from '../../../context/authContext.jsx';
import { UpdateProductSchema } from '../../../Schema/Error/updateSchema.js';
import { DynamicModalWrapper } from '../../FromModal/DynamicModalWrapper.jsx';

export const UpdateProduct = ({ product, onUpdateProduct }) => {
  const token = useUser();

  const handleButtonUpdateProduct = async (formData) => {
    // Convertir el valor del estado a booleano
    formData.active = formData.active === 'true' ? true : false;

    try {
      const response = await fetch(
        `http://localhost:3000/product/update/${product}`,
        {
          method: 'PUT',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        console.log('Producto actualizado correctamente', responseData);

        onUpdateProduct(responseData);

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
          title: 'Producto actualizado con exito! ',
        });
      } else {
        const errorData = await response.json();
        console.error('El producto no ha podido ser actualizado:', errorData);
      }
    } catch (error) {
      console.error('Error durante la actualización del producto:', error);
    }
  };

  const title = 'Actualizar producto';
  const nameButton = 'Actualizar';

  const updateProductFormFields = [
    {
      name: 'name',
      label: 'nombre del producto',
      type: 'text',
      placeholder: 'Introduce nombre del producto',
      idLabel: 'labelNameProductCreate',
      idInput: 'inputNameProductCreate',
      required: false,
    },
    {
      name: 'description',
      label: 'descripción producto',
      type: 'text',
      placeholder: 'Introduce descripción del producto',
      idLabel: 'labelDescriptionProductCreate',
      idInput: 'inputDescriptionProductCreate',
      required: false,
    },
    {
      name: 'price',
      label: 'price',
      type: 'text',
      placeholder: 'Introduce precio del producto',
      idLabel: 'labelPriceProductCreate',
      idInput: 'inputPriceProductCreate',
      required: false,
    },
    {
      name: 'stock',
      label: 'stock',
      type: 'text',
      placeholder: 'introduce las cantidad',
      idLabel: 'labelStockProductCreate',
      idInput: 'inputStockProductCreate',
      required: false,
    },
    {
      name: 'active',
      label: 'Estado',
      type: 'select',
      idLabel: 'labelStatusProductCreate',
      idInput: 'inputStatusProductCreate',
      required: false,
      options: {
        Estado: [
          { value: 'true', label: 'Activo' },
          { value: 'false', label: 'Inactivo' },
        ],
      },
    },
  ];

  const StyleButton = {
    action:'update',
  }

  const StyleAcceptBtn = {
    idAcceptBtn:'btnAcceptProductUpdate',
    altImgBtn:'icono actualizar producto',
    btnSvg:'/AddProductWhite.svg',
    altAcceptBtn:'Boton actualizar producto',
    action:'update',
  }

  return (
    <DynamicModalWrapper
      title={title}
      fields={updateProductFormFields}
      schema={UpdateProductSchema}
      onSubmit={handleButtonUpdateProduct}
      buttonText={nameButton}
      dynamicIdModal="dynamicFormModal"
      StyleButton={StyleButton}
      StyleAcceptBtn={StyleAcceptBtn}
    />
  );
  };

