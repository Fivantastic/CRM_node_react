import Swal from 'sweetalert2';
import { useUser } from '../../../context/authContext.jsx';
import { UpdateProductSchema } from '../../../Schema/Error/updateSchema.js';
import { DynamicModalWrapper } from '../../FromModal/DynamicModalWrapper.jsx';
const URL = import.meta.env.VITE_URL;

export const UpdateProduct = ({ id, onUpdateProduct, productData }) => {
  const token = useUser();

  const handleButtonUpdateProduct = async (formData) => {
    try {
      const response = await fetch(
        `${URL}/product/update/${id}`,
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

        // Recargar la lista para asegurar la consistencia
        onUpdateProduct(responseData.data);

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
          title: 'Producto actualizado con éxito!',
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
      label: 'Nombre',
      type: 'text',
      idLabel: 'labelNameProductCreate',
      idInput: 'inputNameProductCreate',
      required: false,
      defaultValue: productData.name,
    },
    {
      name: 'price',
      label: 'Precio',
      type: 'text',
      idLabel: 'labelPriceProductCreate',
      idInput: 'inputPriceProductCreate',
      required: false,
      defaultValue: productData.price,
    },
    {
      name: 'stock',
      label: 'Stock',
      type: 'text',
      placeholder: 'introduce las cantidad',
      idLabel: 'labelStockProductCreate',
      idInput: 'inputStockProductCreate',
      required: false,
      defaultValue: productData.stock,
    },
    {
      name: 'description',
      label: 'Descripción',
      type: 'textarea',
      idLabel: 'labelDescriptionProductCreate',
      idInput: 'inputDescriptionProductCreate',
      required: false,
      defaultValue: productData.description,
    },
  ];

  const StyleButton = {
    action: 'update',
  };

  const StyleAcceptBtn = {
    idAcceptBtn: 'btnAcceptProductUpdate',
    altImgBtn: 'icono actualizar producto',
    btnSvg: '/AddProductWhite.svg',
    altAcceptBtn: 'Boton actualizar producto',
    action: 'update',
  };

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
      initialValues={productData} // Asegúrate de pasar initialValues aquí
    />
  );
};