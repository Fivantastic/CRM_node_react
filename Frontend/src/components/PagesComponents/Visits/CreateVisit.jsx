import Joi from 'joi';
import DynamicFormPopUp from '../../forms/DynamicFormPopUp.js';
import Swal from 'sweetalert2';

export const CreateVisit = ({ onAddVisit, token }) => {

  // Aqui hace la peticion al servidor
  const handleVisitCreate = async (formData) => {
    try {
      const response = await fetch('http://localhost:3000/visits/new', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`, 
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        //si la peticion es correcta
        const responseData = await response.json();
        console.log('Visita satisfactorio:', responseData);

        
        onAddVisit(responseData.data);

        // Aqui puedes mostrar un mensaje de exito con Swal que sale abajo a la derecha de la pantalla y dura 3 segundos
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
          title: 'Visita programada con exito !',
        });
      } else {
        // si la peticion es incorrecta
        const errorData = await response.json();
        console.error('Programa de visita fallido:', errorData);
        // Aquí podrías mostrar un mensaje de error con Swal.fire si lo deseas
      }
    } catch (error) {
      // si la peticion falla
      console.error('Error programa de visita fallido:', error);
      // Aquí podrías mostrar un mensaje de error con Swal.fire si lo deseas
    }
  };

  // Titulo de la ventana, CAMBIARLO SI ES NECESARIO
  const title = 'Programar Visita';

  // Nombre que se muestra en el botón de submit, CAMBIARLO SI ES NECESARIO
  const nameButton = 'Programar Visita';

  // Campos del formulario personalizables
  const VisitFormFields = [
    {
      name: 'id_customer',
      label: 'Cliente',
      type: 'text',
      placeholder: 'Introduce el  cliente...',
      required: true,
    },
    {
      name: 'visit_date',
      label: 'Fecha',
      type: 'date',
      required: true,
    },
    {
      name: 'observations',
      label: 'Observaciones',
      type: 'textarea',
      placeholder: 'Introduce las observaciones...',
      required: false,
    },
  ];

  const newVisitSchema = Joi.object({
    id_customer: Joi.string().guid().required(),
    visit_date: Joi.date().required(),
    observations: Joi.string().optional()
  });

  const handleClickCreateVisit = () => {
    DynamicFormPopUp(
      title,
      VisitFormFields,
      newVisitSchema,
      handleVisitCreate,
      nameButton
    );
  };
  return (
    <>
      <button onClick={handleClickCreateVisit}>Programar Visita</button>
    </>
  );
};
