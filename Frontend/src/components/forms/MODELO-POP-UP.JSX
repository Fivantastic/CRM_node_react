//! COPIARLO Y MODIFICAR LO QUE NECESITES
//!NO USAR ESTE

// Los imports son estos...
// Agrega mas si tu codigo necesita mas de una libreria o archivos
import Joi from 'joi';
import DynamicFormPopUp from './DynamicFormPopUp.js';
import { useUser } from '../../context/authContext.jsx';
import Swal from 'sweetalert2';

// Ponle el nombre de la accion que seas, por ejemplo, crear un customer, o editar un customer
// Ejemplo: createCustomer, updateCustomer, deleteCustomer.
// Y acuerdate de exportalo al final de la funcion
const nombreDeLaAccion = () => {
    // Asi obtienes el token del usuario de la sesión
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const token = useUser();

    // Aqui hace la peticion al servidor 
    const handleNombreDeLaAccion = async ( formData) => {
    try {
      // FormData es lo que recibo del formulario y pasare como body de la peticion

      // ? Si necesito alguna logica extra, vendria aqui
      
        //Peticion al servidor que llama al EndPoint
      const response = await fetch('URL DEL ENDPOINT', {
        method: 'LA PETICION QUE QUIERO LLAMAR',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}` //aqui ya entra el token
        },
        body: JSON.stringify(formData), // aqui va el formData lo que le envio lo del body
      });

      if (response.ok) { //si la peticion es correcta
        const responseData = await response.json();
        console.log('Contraseña cambiada con éxito:', responseData);

        // Aqui puedes mostrar un mensaje de exito con Swal que sale abajo a la derecha de la pantalla y dura 3 segundos
        const Toast = Swal.mixin({
          toast: true,
          position: "bottom-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          }
        });

        // Aqui puedes mostrar un mensaje de exito con Swal que sale abajo a la derecha de la pantalla y dura 3 segundos
        // Cambiar el texto de titulo del mensaje de exito
        Toast.fire({
          icon: "success",
          title: "Contraseña cambiada con exito"
        });


      } else { // si la peticion es incorrecta
        const errorData = await response.json();
        console.error('Error al cambiar la contraseña:', errorData);
        // Aquí podrías mostrar un mensaje de error con Swal.fire si lo deseas
      }
    } catch (error) { // si la peticion falla
      console.error('Error al cambiar la contraseña:', error);
      // Aquí podrías mostrar un mensaje de error con Swal.fire si lo deseas
    }
  };

  // Titulo de la ventana, CAMBIARLO SI ES NECESARIO
  const title = 'Cambiar contraseña';

  // Nombre que se muestra en el botón de submit, CAMBIARLO SI ES NECESARIO
  const nameButton = 'Cambiar contraseña';

  // Campos del formulario personalizables
  const updatePasswordFields = [
    {
      name: 'currentPassword',
      type: 'password',
      label: 'Contraseña actual',
    },
    {
      name: 'newPassword',
      type: 'password',
      label: 'Nueva contraseña',
    },
    {
      name: 'repeatPassword',
      type: 'password',
      label: 'Repetir nueva contraseña',
    }
  ];

  //! RECORDAR QUE EL name de los campos es el mismo que el name de los schema, y los mismos que estan en la base de datos, incluidos los shcemas de la base de datos.

  // Esquema de validación, que sea el mismo que hay en la base de datos, solo cambiando lo de message por el label
  const updatePasswordSchema = Joi.object({
    currentPassword: Joi.string()
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]+$/)
    .required()
    .label('Contraseña actual'),
    newPassword: Joi.string()
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]+$/)
    .required()
    .label('Nueva contraseña'),
    repeatPassword: Joi.string()
    .valid(Joi.ref('newPassword'))
    .required()
    .label('Repetir nueva contraseña'),
  });

  // Crea el modal POP e inserta los campos y el esquema de validación, y luego retorna la informacion que tiene que introducir en el body
  const handleClickChangePassword = () => {
    DynamicFormPopUp(title, updatePasswordFields, updatePasswordSchema, handleNombreDeLaAccion, nameButton); 
    //cambia el nombre de handleNombreDeLaAccion, por ejemplo si es crear un customer handleCreateCustomer, si es eliminar un customer handleDeleteCustomer.
  };

  // Retorna el botón para imprimirlo en la pantalla donde llame al componente, que mas adelante puede ser otras acciones
  return (
    <div>
      <button onClick={handleClickChangePassword}>
        Cambiar contraseña
      </button>
    </div>
  );
};

// Nombre de la accion, CAMBIARLO
export default nombreDeLaAccion;
