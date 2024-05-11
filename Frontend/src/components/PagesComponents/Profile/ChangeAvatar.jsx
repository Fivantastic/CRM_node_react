import Joi from 'joi';
import Swal from 'sweetalert2';
import { useUser } from '../../../context/authContext.jsx';
import DynamicFormPopUp from '../../forms/DynamicFormPopUp.js';

export const ChangeAvatar = () => {
  const token = useUser();

  const handleChangeAvatar = async (formData) => {
    try {
      // Crea el objeto de datos para la petición
      const data = {
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      };

      const response = await fetch('http://localhost:3000/user/avatar', {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`,
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log('Avatar cambiada con éxito:', responseData);

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
          title: 'avatar cambiado con exito',
        });
      } else {
        const errorData = await response.json();
        console.error('Error al cambiar la avatar:', errorData);

        if (errorData.code === 'INVALID_PASSWORD_CRM_ERROR') {
          Swal.fire({
            icon: 'error',
            title: '¡Contraseña incorrecta!',
          }).then((result) => {
            if (result.isConfirmed) {
              // Recarga de nuevo el boton de modificar contraseña modal
            }
          });
        }
      }
    } catch (error) {
      console.error('Error al cambiar la avatar:', error);
      // Aquí podrías mostrar un mensaje de error con Swal.fire si lo deseas
    }
  };

  const title = 'Cambiar avatar';

  const nameButton = 'Cambiar';

  const updateAvatarFields = [
    {
      name: 'file',
      type: 'file',
      label: 'Imagen',
    },
  ];

  const updateAvatarSchema = Joi.object({
    name: Joi.string().optional(),
  });

  const handleClickChangeAvatar = () => {
    DynamicFormPopUp(
      title,
      updateAvatarFields,
      updateAvatarSchema,
      handleChangeAvatar,
      nameButton
    );
  };

  return (
    <div>
      <button onClick={handleClickChangeAvatar} id="avatar-container">
        <img id="incon-setting" src="./person_add_24dp_FILL0_wght400_GRAD0_opsz24.svg" alt="" />
        <div id="content">
          <h3>Avatar</h3>
          <p id="info">Cambiar</p>
        </div>
      </button>
    </div>
  );
};
