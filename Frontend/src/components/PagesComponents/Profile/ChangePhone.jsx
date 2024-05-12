import Joi from 'joi';
import DynamicFormPopUp from '../../forms/DynamicFormPopUp.js';
import Swal from 'sweetalert2';
import { useUser } from '../../../context/authContext.jsx';
import { joiErrorMessages } from '../../../../../Backend/src/schemas/error/joiErrorMessage.js';
import { getUserDataFromToken } from '../../../Services/GetUserDataToken.js';

export const ChangePhone = () => {
  const token = useUser();
  const { id_user } = getUserDataFromToken(token);

  const handleChangePhone = async (formData) => {
    try {
      const response = await fetch(
        `http://localhost:3000/user/update/${id_user}`,
        {
          method: 'PUT',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        console.log('Telefono cambiada con éxito:', responseData);

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
          title: 'Telefono cambiado con exito',
        });
      } else {
        const errorData = await response.json();
        console.error('Error al cambiar el telefono:', errorData);

        if (errorData.code === 'INVALID_PASSWORD_CRM_ERROR') {
          Swal.fire({
            icon: 'error',
            title: 'Telefono incorrecta!',
          }).then((result) => {
            if (result.isConfirmed) {
              // Recarga de nuevo el boton de modificar contraseña modal
            }
          });
        }
      }
    } catch (error) {
      console.error('Error al cambiar la telefono:', error);
      // Aquí podrías mostrar un mensaje de error con Swal.fire si lo deseas
    }
  };

  const title = 'Cambiar Telefono';

  const nameButton = 'Cambiar';

  const updateNameFields = [
    {
      name: 'phone',
      type: 'text',
      label: 'Telefono',
    },
  ];

  const phoneSchema = Joi.object({
    phone: Joi.number().required().messages(joiErrorMessages),
  });

  const handleClickChangePhone = () => {
    DynamicFormPopUp(
      title,
      updateNameFields,
      phoneSchema,
      handleChangePhone,
      nameButton
    );
  };

  return (
    <div>
      <button onClick={handleClickChangePhone} id="avatar-container">
        <img
          id="incon-setting"
          src="phone_iphone_24dp_FILL0_wght400_GRAD0_opsz24.svg"
          alt=""
        />
        <div id="content">
          <h3>Telefono</h3>
          <p id="info">Cambiar</p>
        </div>
      </button>
    </div>
  );
};