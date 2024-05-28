import Swal from 'sweetalert2';
import { DynamicModalWrapper } from '../../FromModal/DynamicModalWrapper.jsx';
import { updatePasswordSchema } from '../../../Schema/Error/updateSchema.js';
const URL = import.meta.env.VITE_URL;


const ChangePasswordPop = ({ token }) => {
  const handleChangePassword = async (formData) => {
    try {
      const { newPassword, repeatPassword } = formData;

      if (newPassword !== repeatPassword) {
        console.error('Las contraseñas no coinciden');
        return;
      }

      // Crea el objeto de datos para la petición
      const data = {
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      };

      const response = await fetch(
        `${URL}/user/change-password`,
        {
          method: 'PUT',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${token}`,
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        console.log('Contraseña cambiada con éxito:', responseData);

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
          title: 'Contraseña cambiada con exito',
        });
      } else {
        const errorData = await response.json();
        console.error('Error al cambiar la contraseña:', errorData);

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
      console.error('Error al cambiar la contraseña:', error);
      // Aquí podrías mostrar un mensaje de error con Swal.fire si lo deseas
    }
  };

  const title = 'Modificar contraseña';

  const nameButton = 'Modificar';

  const updatePasswordFields = [
    {
      name: 'currentPassword',
      type: 'password',
      label: 'Contraseña actual *',
      idLabel: 'labelCurrentPassword',
      idInput: 'inputCurrentPassword',
      required: true,
      eye: false
    },
    {
      name: 'newPassword',
      type: 'password',
      label: 'Nueva contraseña *',
      idLabel: 'labelNewPassword',
      idInput: 'inputNewPassword',
      required: true,
      eye: true
    },
    {
      name: 'repeatPassword',
      type: 'password',
      label: 'Repetir nueva contraseña *',
      idLabel: 'labelRepeatPassword',
      idInput: 'inputRepeatPassword',
      required: true,
      eye: true
    },
  ];

  const StyleButton = {
    action:'profileUpdate',
    imgProfile: '/currentPass.svg',
    altImgProfile: 'icono de perfil',
    textProfile: 'Password',
    classProfileText: 'textProfile',
  }

  const StyleAcceptBtn = {
    idAcceptBtn:'btnAcceptProfileUpdate',
    altImgBtn:'icono actualizar perfil',
    altAcceptBtn:'Boton actualizar perfil',
    action:'update',
  }


  return (
    <DynamicModalWrapper
    title={title}
    fields={updatePasswordFields}
    schema={updatePasswordSchema}
    onSubmit={handleChangePassword}
    buttonText={nameButton}
    dynamicIdModal="dynamicFormModal"
    StyleButton={StyleButton}
    StyleAcceptBtn={StyleAcceptBtn}
  />
  );
};

export default ChangePasswordPop;
