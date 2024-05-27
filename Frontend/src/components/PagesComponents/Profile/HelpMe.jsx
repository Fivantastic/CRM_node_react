import Joi from 'joi';
import Swal from 'sweetalert2';
import { useUser } from '../../../context/authContext.jsx';
import { DynamicModalWrapper } from '../../FromModal/DynamicModalWrapper.jsx';
const URL = import.meta.env.VITE_URL;

export const HelpMe = () => {
  const token = useUser();

  const handleHelpAction = async (formData) => {
    try {
      const response = await fetch(`${URL}/help`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log('Ayuda enviada con éxito:', responseData);

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
          title: 'Ayuda enviada con exito',
        });
      } else {
        const errorData = await response.json();
        console.error('Error al cambiar la ayuda:', errorData);

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
      console.error('Error al cambiar la ayuda:', error);
      // Aquí podrías mostrar un mensaje de error con Swal.fire si lo deseas
    }
  };

  const title = 'Ayuda';

  const nameButton = 'Contactar';

  const helpFields = [
    {
      name: 'help',
      type: 'text-area',
      label: 'Ayuda ',
    },
  ];

  const helpSchema = Joi.object({
    help: Joi.string().min(3).max(50).required(),
  });


  const StyleButton = {
    action:'profileUpdate',
    imgProfile: '/help.svg',
    altImgProfile: 'icono de ayuda',
    textProfile: 'Ayuda',
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
    fields={helpFields}
    schema={helpSchema}
    onSubmit={handleHelpAction}
    buttonText={nameButton}
    dynamicIdModal="dynamicFormModal"
    StyleButton={StyleButton}
    StyleAcceptBtn={StyleAcceptBtn}
  />
  );
};