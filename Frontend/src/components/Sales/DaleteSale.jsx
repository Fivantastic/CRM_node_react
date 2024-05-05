import Joi from 'joi';
import DynamicFormPopUp from '../forms/DynamicFormPopUp.js';
import { useUser } from '../../context/authContext.jsx';
import Swal from 'sweetalert2';

export const DaleteSale = () => {
  // Asi obtienes el token del usuario de la sesión
  const token = useUser();
  const id_sale = 'e533b5d4-b6f2-4f2b-b89b-bbef88897d84';

  // Aqui hace la peticion al servidor
  const handleDeleteSaleAccion = async (formData) => {
    try {
      const response = await fetch(
        `http://localhost:3000/sales/delete/${id_sale}`,
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
        console.log('Venta borrada con éxito:', responseData);

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
          title: 'Venta eliminada con exito',
        });
      } else {
        // si la peticion es incorrecta
        const errorData = await response.json();
        console.error('Error al borra la venta:', errorData);
        // Aquí podrías mostrar un mensaje de error con Swal.fire si lo deseas
      }
    } catch (error) {
      // si la peticion falla
      console.error('Error al borra la venta:', error);
      // Aquí podrías mostrar un mensaje de error con Swal.fire si lo deseas
    }
  };

  // Titulo de la ventana, CAMBIARLO SI ES NECESARIO
  const title = 'Eliminar la Venta ?';

  // Nombre que se muestra en el botón de submit, CAMBIARLO SI ES NECESARIO
  const nameButton = 'Eliminar';

  // Campos del formulario personalizables
  const deleteSaleFields = [];

  // Esquema de validación, que sea el mismo que hay en la base de datos, solo cambiando lo de message por el label
  const deleteSaleSchema = Joi.object({});

  // Crea el modal POP e inserta los campos y el esquema de validación, y luego retorna la informacion que tiene que introducir en el body
  const handleClickChangePassword = () => {
    DynamicFormPopUp(
      title,
      deleteSaleFields,
      deleteSaleSchema,
      handleDeleteSaleAccion,
      nameButton
    );
  };

  return (
    <div>
      <button onClick={handleClickChangePassword}>X</button>
    </div>
  );
};
