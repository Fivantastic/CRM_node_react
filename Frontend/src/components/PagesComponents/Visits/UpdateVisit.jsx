import Joi from 'joi';
import DynamicFormPopUp from '../../forms/DynamicFormPopUp.js';
import { useUser } from '../../../context/authContext.jsx';
import Swal from 'sweetalert2';

export const UpdateVisit = ({ visit, onUpdateSale }) => {
  // Asi obtienes el token del usuario de la sesión
  const token = useUser();

  // Aqui hace la peticion al servidor
  const handleButtonUpdateVisit = async (formData) => {
    try {
      const response = await fetch(
        `http://localhost:3000/visits/update/${visit}`,
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

        onUpdateSale(responseData);

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
        console.error('Actualización Visita fallido:', errorData);
        // Aquí podrías mostrar un mensaje de error con Swal.fire si lo deseas
      }
    } catch (error) {
      // si la peticion falla
      console.error('Error durante la Actualización de venta:', error);
      // Aquí podrías mostrar un mensaje de error con Swal.fire si lo deseas
    }
  };

  // Titulo de la ventana, CAMBIARLO SI ES NECESARIO
  const title = 'Modificar Visita';

  // Nombre que se muestra en el botón de submit, CAMBIARLO SI ES NECESARIO
  const nameButton = 'Modificar';

  // Campos del formulario personalizables
  const updateVisitFormFields = [
    {
      name: 'id_customer',
      label: 'Cliente',
      type: 'text',
      placeholder: 'Introduce el cliente...',
    },
    {
      name: 'id_user',
      label: 'Comercial',
      type: 'text',
      placeholder: 'Introduce el comercial...',
    },
    {
      name: 'visit_date',
      label: 'Fecha',
      type: 'date',
      placeholder: 'Introduce la fecha...',
    },
    {
      name: 'observations',
      label: 'Observaciones',
      type: 'textarea',
      placeholder: 'Introduce las observaciones...',
    },
  ];

  // Esquema de validación, que sea el mismo que hay en la base de datos, solo cambiando lo de message por el label
  const updateVisitSchema = Joi.object({
    id_customer: Joi.string().guid().optional(),
    id_user: Joi.string().guid().optional(),
    visit_date: Joi.date().optional(),
    observations: Joi.string().optional(),
  });

  // Crea el modal POP e inserta los campos y el esquema de validación, y luego retorna la informacion que tiene que introducir en el body
  const handleUpdateVisit = () => {
    DynamicFormPopUp(
      title,
      updateVisitFormFields,
      updateVisitSchema,
      handleButtonUpdateVisit,
      nameButton
    );
  };

  return (
    <div>
      <button onClick={handleUpdateVisit}>Actualizar Venta</button>
    </div>
  );
};
