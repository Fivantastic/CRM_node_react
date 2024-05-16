import Joi from 'joi';
import Swal from 'sweetalert2';
import { useUser } from '../../../context/authContext.jsx';
import DynamicFormPopUp from '../../forms/DynamicFormPopUp.js';
import { joiErrorMessages } from '../../../Schema/Error/JoiErrorMesasage.js';
const URL = import.meta.env.VITE_URL;

export const ChangeName = () => {
  const token = useUser();

  const handleChangeName = async (formData) => {
    try {
      const response = await fetch(`${URL}/user/update`, {
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
        console.log('Email cambiada con éxito:', responseData);

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
          title: 'Email cambiado con exito',
        });
      } else {
        const errorData = await response.json();
        console.error('Error al cambiar la email:', errorData);

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
      console.error('Error al cambiar la email:', error);
      // Aquí podrías mostrar un mensaje de error con Swal.fire si lo deseas
    }
  };

  const title = 'Cambiar Nombre';

  const nameButton = 'Cambiar';

  const updateNameFields = [
    {
      name: 'name',
      type: 'text',
      label: 'Nombre',
    },
  ];

  const updateNameSchema = Joi.object({
    name: Joi.string().min(3).max(30).required().messages(joiErrorMessages),
  });

  const handleClickChangeName = () => {
    DynamicFormPopUp(
      title,
      updateNameFields,
      updateNameSchema,
      handleChangeName,
      nameButton
    );
  };

  return (
    <div>
      <button onClick={handleClickChangeName} id="avatar-container">
        <img
          id="incon-setting"
          src="badge_24dp_FILL0_wght400_GRAD0_opsz24.svg"
          alt=""
        />
        <div id="content">
          <h3>Nombre</h3>
          <p id="info">Cambiar</p>
        </div>
      </button>
    </div>
  );
};
