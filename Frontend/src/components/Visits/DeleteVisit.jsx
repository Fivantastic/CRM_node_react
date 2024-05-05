import Joi from 'joi';
import DynamicFormPopUp from '../forms/DynamicFormPopUp.js';
import { useUser } from '../../context/authContext.jsx';
import Swal from 'sweetalert2';

export const DeleteVisit = ({ visit, onDeleteVisit }) => {
  // Asi obtienes el token del usuario de la sesión
  const token = useUser();

  // Aqui hace la peticion al servidor
  const handleDeleteVisit = async (formData, id_visit) => {
    try {
      const response = await fetch(
        `http://localhost:3000/visit/delete/${visit}`,
        {
          method: 'DELETE',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        //si la peticion es correcta
        const responseData = await response.json();
        console.log('Visita borrada con éxito:', responseData);

        onDeleteVisit(id_visit);

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
          title: 'Visita eliminada con exito',
        });
      } else {
        // si la peticion es incorrecta
        const errorData = await response.json();
        console.error('Error al borra la visita:', errorData);
        // Aquí podrías mostrar un mensaje de error con Swal.fire si lo deseas
      }
    } catch (error) {
      // si la peticion falla
      console.error('Error al borra la visita:', error);
      // Aquí podrías mostrar un mensaje de error con Swal.fire si lo deseas
    }
  };

  // Titulo de la ventana, CAMBIARLO SI ES NECESARIO
  const title = 'Eliminar la visita ?';

  // Nombre que se muestra en el botón de submit, CAMBIARLO SI ES NECESARIO
  const nameButton = 'Eliminar';

  // Campos del formulario personalizables
  const deleteVisitFields = [];

  // Esquema de validación, que sea el mismo que hay en la base de datos, solo cambiando lo de message por el label
  const deleteVisitSchema = Joi.object({});

  // Crea el modal POP e inserta los campos y el esquema de validación, y luego retorna la informacion que tiene que introducir en el body
  const handleClickDeleteVisit = () => {
    DynamicFormPopUp(
      title,
      deleteVisitFields,
      deleteVisitSchema,
      handleDeleteVisit,
      nameButton
    );
  };

  return (
    <div>
      <button onClick={handleClickDeleteVisit}>X</button>
    </div>
  );
};
