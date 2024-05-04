import Joi from 'joi';
import DynamicForm from '../components/forms/DynamicForm.jsx'; 
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../context/authContext.jsx'; 
import Swal from 'sweetalert2';

export function DeliveryNotePage() {
  const navigate = useNavigate();
  const token = useUser(); // Obtener el token usando el hook useUser

  const handleSubmit = async (data) => {
    try {
      const response = await fetch('http://localhost:3000/delivery-notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}` // Agregar el token de autenticación en el encabezado
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log('Delivery note created successfully:', responseData);

        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
            navigate('/delivery-notes');
          }
        });
        
        Toast.fire({
          icon: "success",
          title: "Delivery note created successfully!",
        });
      } else {
        const errorData = await response.json();
        console.error('Error creating delivery note:', errorData);
      }
    } catch (error) {
      console.error('Error during delivery note creation:', error);
    }
  };

  const deliveryNoteSchema = Joi.object({
    sale_id: Joi.string().guid().required(),
    deliverer_id: Joi.string().guid().required(),
    address_id: Joi.string().guid().required(),
    customer_id: Joi.string().guid().required(),
    saleProduct_id: Joi.string().guid().optional(),
  });

  const deliveryNoteFormFields = [
    {
      name: 'sale_id',
      label: 'Sale ID',
      type: 'text',
      required: true,
    },
    {
      name: 'deliverer_id',
      label: 'Deliverer ID',
      type: 'text',
      required: true,
    },
    {
      name: 'address_id',
      label: 'Address ID',
      type: 'text',
      required: true,
    },
    {
      name: 'customer_id',
      label: 'Customer ID',
      type: 'text',
      required: true,
    },
    {
      name: 'saleProduct_id',
      label: 'Sale Product ID',
      type: 'text',
      required: false,
    },
  ];

  return (
    <div>
      <li><Link to="/">Home</Link></li>
      <h1>Create Delivery Note</h1>
      <DynamicForm
        title="Delivery Note Form"
        onSubmit={handleSubmit}
        schema={deliveryNoteSchema}
        fields={deliveryNoteFormFields}
        buttonText={'Create Delivery Note'}
        extraButtons={[]}
      />
    </div>
  );
}

export default DeliveryNotePage;
