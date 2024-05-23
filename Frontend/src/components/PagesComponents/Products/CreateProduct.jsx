import Swal from 'sweetalert2';
import DynamicFormPopUp from '../../forms/DynamicFormPopUp.js';
import { newProductSchema } from '../../../Schema/Error/createSchema.js';

export const CreateProduct = ({ onAddProduct, token }) => {  
  const handleProductCreate = async (formData) => {
    // Convertir el valor del estado a booleano
    formData.active = formData.active === 'true' ? true : false;
    
    try {
      const response = await fetch('http://localhost:3000/product/register', {
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
          position: 'bottom-end',
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

  const title = 'Agregar producto';
  const nameButton = 'Agregar';

  const ProductFormFields = [
    {
        name: 'name',
        label: 'Nombre',
        type: 'text',
        idLabel: 'labelNameProductCreate',
        idInput: 'inputNameProductCreate',
    },
    {
        name: 'price',
        label: 'Precio',
        type: 'text',
        idLabel: 'labelPriceProductCreate',
        idInput: 'inputPriceProductCreate',
    },
    {
        name: 'stock',
        label: 'Cantidad',
        type: 'text',
        idLabel: 'labelStockProductCreate',
        idInput: 'inputStockProductCreate',
    },
    {
        name: 'description',
        label: 'Descripción',
        type: 'text',
        idLabel: 'labelDescriptionProductCreate',
        idInput: 'inputDescriptionProductCreate',
    },
    {
        name: 'active',
        label: 'Estado',
        type: 'select',
        idLabel: 'labelStatusProductCreate',
        idInput: 'inputStatusProductCreate',
        options: {
          Estado: {
            true: 'Activado',
            false: 'Inactivo',
          },
        },
    },
  ];

  const handleClickCreateProduct = () => {
    DynamicFormPopUp(
      title,
      ProductFormFields,
      newProductSchema,
      handleProductCreate,
      nameButton
    );
  };

  return (
    <div>
      <button className="btnProductCreate mainCreateBtn" onClick={handleClickCreateProduct}>
        <img id='imgProductCreate' className='imgCreateBtn' src="/productAdd.svg" alt="logoproduct" />
      </button>
    </div>
  );
};
