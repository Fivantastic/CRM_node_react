import Joi from 'joi';
import DynamicForm from '../components/forms/DynamicForm.jsx';
import { useUser } from '../context/authContext.jsx';
import Swal from 'sweetalert2';

export const SalesPage = () => {
  const token = useUser();

  const handleSaleSubmit = async (data) => {
    try {
      const response = await fetch('http://localhost:3000/sales/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`,
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log('Venta satisfactorio:', responseData);

        //Opcion Modal 3
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
          title: 'Venta Realizada con exito ! ',
        });
      } else {
        const errorData = await response.json();
        console.error('Venta fallido:', errorData);
        // Mostrar un mensaje de error al usuario
      }
    } catch (error) {
      console.error('Error durante la venta:', error);
      // Mostrar un mensaje de error al usuario
    }
  };

  const saleSchema = Joi.object({
    id_user: Joi.string().required().min(36),
    saleProduct_id: Joi.string().required().min(36),
    customer_id: Joi.string().required().min(36),
  });

  const saleFormFields = [
    {
      name: 'id_user',
      label: 'Usuario',
      type: 'text',
      placeholder: 'Introduce el usuario...',
      required: true,
    },
    {
      name: 'saleProduct_id',
      label: 'Producto de venta',
      type: 'text',
      placeholder: 'Introduce el producto...',
      required: true,
    },
    {
      name: 'customer_id',
      label: 'Cliente',
      type: 'text',
      placeholder: 'Introduce el cliente...',
      required: true,
    },
  ];

  return (
    <div>
      <DynamicForm
        title="Crear Venta"
        onSubmit={handleSaleSubmit}
        schema={saleSchema}
        fields={saleFormFields}
        buttonText={'Crear'}
        extraButtons={[]}
      />
    </div>
  );
};
