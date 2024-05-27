import Joi from 'joi';
import Swal from 'sweetalert2';
import DynamicFormPopUp from '../../forms/DynamicFormPopUp.js';
import { useUser } from '../../../context/authContext.jsx';
import { getUserDataFromToken } from '../../../Services/GetUserDataToken.js';
import { imgSchema } from '../../../Schema/Error/ImgSchema.js';
const URL = import.meta.env.VITE_URL;

export const ChangeAvatar = () => {
  const token = useUser();
  const { id_user } = getUserDataFromToken(token);

  const handleChangeAvatar = async (formData) => {
    const formDataToSend = new FormData();
    formDataToSend.append('avatar', formData.file);
    try {
      for (let pair of formDataToSend.entries()) {
        console.log(pair[0] + ', ' + pair[1]);
      }

      const response = await fetch(
        `${URL}/user/avatar/${id_user}`,
        {
          method: 'PUT',
          credentials: 'include',
          headers: {
            Authorization: `${token}`,
          },
          body: formDataToSend, // aqui va el formData lo que le envio lo del body
        }
      );

      if (response.ok) {
        //si la peticion es correcta
        const responseData = await response.json();
        console.log('Avatar actualizada satisfactorio:', responseData);

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
          title: 'Actualización Realizada con exito ! ',
        });
      } else {
        // si la peticion es incorrecta
        const errorData = await response.json();
        console.error('Actualización avatar fallido:', errorData);
        // Aquí podrías mostrar un mensaje de error con Swal.fire si lo deseas
      }
    } catch (error) {
      // si la peticion falla
      console.error('Error durante la Actualización de avatar:', error);
      // Aquí podrías mostrar un mensaje de error con Swal.fire si lo deseas
    }
  };

  const title = 'Cambiar avatar';

  const nameButton = 'Cambiar';

  const updateAvatarFields = [
    /* {
      name: 'name',
      type: 'text',
      label: 'Nombre',
    }, */
    {
      name: 'file',
      type: 'file',
      label: 'Imagen',
      onChange: (e) => e.target.files[0],
    },
  ];

  const updateAvatarSchema = Joi.object({
    /* name: Joi.string().required(), */
    avatar: imgSchema.optional(),
  }).unknown(true);

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
        <img
          id="incon-setting"
          src="/person_add_24dp_FILL0_wght400_GRAD0_opsz24.svg"
          alt=""
        />
        <div id="content">
          <h3>Avatar</h3>
          <p id="info">Cambiar</p>
        </div>
      </button>
    </div>
  );
};
