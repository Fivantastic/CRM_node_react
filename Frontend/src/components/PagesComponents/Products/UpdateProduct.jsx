import Swal from 'sweetalert2';
import { useUser } from '../../../context/authContext.jsx';
import DynamicFormPopUp from '../../forms/DynamicFormPopUp.js';
import { EditButton } from '../../buttons/EditButton.jsx';
import { UpdateProductSchema } from '../../../Schema/Error/updateSchema.js';

export const UpdateProduct = ({ product, onUpdateProduct }) => {
  const token = useUser();

  const handleButtonUpdateProduct = async (formData) => {
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

  const title = 'Modificar producto';
  const nameButton = 'Modificar';

  const updateProductFormFields = [
    {
      name: 'name',
      label: 'nombre del producto',
      type: 'text',
      placeholder: 'Introduce nombre del producto',
      idLabel: 'labelNameProductCreate',
      idInput: 'inputNameProductCreate',
    },
    {
      name: 'description',
      label: 'descripción producto',
      type: 'text',
      placeholder: 'Introduce descripción del producto',
      idLabel: 'labelDescriptionProductCreate',
      idInput: 'inputDescriptionProductCreate',
    },
    {
      name: 'price',
      label: 'price',
      type: 'text',
      placeholder: 'Introduce precio del producto',
      idLabel: 'labelPriceProductCreate',
      idInput: 'inputPriceProductCreate',
    },
    {
      name: 'stock',
      label: 'stock',
      type: 'text',
      placeholder: 'introduce las cantidad',
      idLabel: 'labelStockProductCreate',
      idInput: 'inputStockProductCreate',
    },
    {
      name: 'product_status',
      label: 'Estado',
      type: 'select',
      idLabel: 'labelStatusProductCreate',
      idInput: 'inputStatusProductCreate',
      options: {
        Estado: {
          active: 'Activado',
          inactive: 'Inactivo',
        },
      },
    },
  ];


  const handleUpdateProduct = () => {
    DynamicFormPopUp(
      title,
      updateProductFormFields,
      UpdateProductSchema,
      handleButtonUpdateProduct,
      nameButton
    );
  };

  return (
    <EditButton
      id="btnProductUpdate"
      className="mainUpdateBtn"
      onClick={handleUpdateProduct}
    />
  );
};
