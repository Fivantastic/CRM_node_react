import Joi from 'joi';
import DynamicFormPopUp from '../../forms/DynamicFormPopUp.js';
import Swal from 'sweetalert2';

export const UpdateSale = ({ onUpdateSale, sale, token }) => {
  // Aqui hace la peticion al servidor
  const handleUpdateSaleAccion = async (formData) => {
    try {
      const response = await fetch(
        `http://localhost:3000/sales/update/${sale}`,
        {
          method: 'PUT',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${token}`,
          },
          body: JSON.stringify(formData), // aqui va el formData lo que le envio lo del body
        }
      );

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

  // Titulo de la ventana, CAMBIARLO SI ES NECESARIO
  const title = 'Actualizar Venta';

  // Nombre que se muestra en el botón de submit, CAMBIARLO SI ES NECESARIO
  const nameButton = 'Actualizar';

  // Campos del formulario personalizables
  const updateSaleFormFields = [
    {
      name: 'product',
      label: 'Producto',
      type: 'text',
      placeholder: 'Introduce el producto...',
      required: true,
    },
    {
      name: 'quantity',
      label: 'Cantidad',
      type: 'text',
      placeholder: 'Introduce la cantidad de producto...',
      required: true,
    },
    {
      name: 'customer',
      label: 'Cliente',
      type: 'text',
      placeholder: 'Introduce el cliente...',
      required: true,
    },
    {
      name: 'operation_status',
      label: 'Estado',
      type: 'select',
      options: {
        Estado: {
          open: 'En Proceso',
          cancelled: 'Cancelado',
          closed: 'Cerrado',
        },
      },
    },
  ];

  // Esquema de validación, que sea el mismo que hay en la base de datos, solo cambiando lo de message por el label
  const updateSaleSchema = Joi.object({
    product: Joi.string().optional(),
    quantity: Joi.string().optional(),
    customer: Joi.string().optional(),
    operation_status: Joi.string().optional(),
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
      <button id='btnSalesUpdate ' className="mainUpdateBtn" onClick={handleUpdateSale}>Actualizar Venta</button>
    </>
  );
};
