import Joi from 'joi';
import DynamicFormPopUp from '../forms/DynamicFormPopUp.js';
import { useUser } from '../../context/authContext.jsx';
import Swal from 'sweetalert2';

const ChangePasswordPop = () => {
const token = useUser();

  const handleChangePassword = async ( formData) => {
    try {
      const { newPassword, repeatPassword } = formData;

      if (newPassword !== repeatPassword) {
        console.error('Las contraseñas no coinciden');
        return;
      } 
      
      // Crea el objeto de datos para la petición
      const data = {
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword
      };

      const response = await fetch('http://localhost:3000/user/change-password', {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log('Contraseña cambiada con éxito:', responseData);

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
        Toast.fire({
          icon: "success",
          title: "Contraseña cambiada con exito"
        });


      } else {
        const errorData = await response.json();
        console.error('Error al cambiar la contraseña:', errorData);
        // Aquí podrías mostrar un mensaje de error con Swal.fire si lo deseas
      }
    } catch (error) {
      console.error('Error al cambiar la contraseña:', error);
      // Aquí podrías mostrar un mensaje de error con Swal.fire si lo deseas
    }
  };

  const title = 'Cambiar contraseña';

  const nameButton = 'Cambiar contraseña';

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
    },
  ];

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

  const handleClickChangePassword = () => {
    DynamicFormPopUp(title, updatePasswordFields, updatePasswordSchema, handleChangePassword, nameButton);
  };

  return (
    <div>
      <button onClick={handleClickChangePassword}>
        Cambiar contraseña
      </button>
    </div>
  );
};

export default ChangePasswordPop;
