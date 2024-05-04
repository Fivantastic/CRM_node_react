import Joi from 'joi';
import DynamicForm from '../components/forms/DynamicForm.jsx';
import Swal from 'sweetalert2';
import { useUser } from '../context/authContext.jsx';

export const UpdateSalePage = () => {
  const token = useUser();
  const id_sale = '3ef4277d-788e-4c37-8197-8e323b594a56';

  const handleUpdateSaleSubmit = async (data) => {
    try {
      const response = await fetch(
        `http://localhost:3000/sales/update/${id_sale}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${token}`,
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        console.log('Venta actualizada satisfactorio:', responseData);

        //Opcion Modal 3
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
        const errorData = await response.json();
        console.error('Actualización Venta fallido:', errorData);
        // Mostrar un mensaje de error al usuario
      }
    } catch (error) {
      console.error('Error durante la Actualización de venta:', error);
      // Mostrar un mensaje de error al usuario
    }
  };

  const updateSaleSchema = Joi.object({
    id_user: Joi.string().optional().min(36),
    saleProduct_id: Joi.string().optional().min(36),
    customer_id: Joi.string().optional().min(36),
    operation_status: Joi.string().optional(),
  });

  const updateSaleFormFields = [
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
    {
      name: 'operation_status',
      label: 'Estado',
      type: 'select',
      options: [
        { value: 'open', label: 'open' },
        { value: 'cancelled', label: 'cancelled' },
        { value: 'closed', label: 'closed' },
      ],
      required: true,
    },
  ];

  return (
    <div>
      <DynamicForm
        title="Actualizar Venta"
        onSubmit={handleUpdateSaleSubmit}
        schema={updateSaleSchema}
        fields={updateSaleFormFields}
        buttonText={'Actualizar'}
        extraButtons={[]}
      />
    </div>
  );
};
