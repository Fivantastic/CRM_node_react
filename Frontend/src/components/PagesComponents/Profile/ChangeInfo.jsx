import Swal from "sweetalert2";
import { useUser } from "../../../context/authContext.jsx";
import { updateUserProfileSchema } from "../../../Schema/Error/updateSchema.js";
import { DynamicModalWrapper } from "../../FromModal/DynamicModalWrapper.jsx";

const URL = import.meta.env.VITE_URL;

export const ChangeInfo = ({ updateinfo, user }) => {
  const token = useUser();

  const handleChangeInfo = async (formData) => {
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
        console.log('Perfil actualizado:', responseData);

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
          title: 'Perfil actualizado',
        });
        updateinfo(); // Llama a updateinfo para obtener los datos actualizados
      } else {
        const errorData = await response.json();
        console.error('Error al cambiar el email:', errorData);

        if (errorData.code === 'INVALID_PASSWORD_CRM_ERROR') {
          Swal.fire({
            icon: 'error',
            title: '¡Datos no actualizada!',
          }).then((result) => {
            if (result.isConfirmed) {
              // Recarga de nuevo el botón de modificar contraseña modal
            }
          });
        }
      }
    } catch (error) {
      console.error('Error al cambiar el email:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ha ocurrido un error. Por favor, intenta nuevamente.',
      });
    }
  };

  // Título de la ventana
  const title = 'Actualizar Perfil';

  // Nombre que se muestra en el botón de submit, 
  const nameButton = 'Actualizar';

  // Campos del formulario personalizables
  const updateProfileFormFields = user ? [
    {
      name: 'name',
      label: 'Nombre',
      type: 'text',
      idLabel: 'labelNameProfileUpdate',
      idInput: 'inputNameProfileUpdate',
      required: false,
      defaultValue: user.name,
    },
    {
      name: 'last_name',
      label: 'Apellidos',
      type: 'text',
      idLabel: 'labelLastNameProfileUpdate',
      idInput: 'inputLastNameProfileUpdate',
      required: false,
      defaultValue: user.last_name,
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      idLabel: 'labelEmailProfileUpdate',
      idInput: 'inputEmailProfileUpdate',
      required: false,
      defaultValue: user.email,
    },
    {
      name: 'phone',
      label: 'Teléfono',
      type: 'text',
      idLabel: 'labelPhoneProfileUpdate',
      idInput: 'inputPhoneProfileUpdate',
      required: false,
      defaultValue: user.phone,
    },
    {
      name: 'biography',
      label: 'Información Personal',
      type: 'textarea',
      idLabel: 'labelBiographyProfileUpdate',
      idInput: 'inputBiographyProfileUpdate',
      required: false,
      defaultValue: user.biography,
    }
  ] : [];

  const StyleButton = {
    action: 'profileUpdate',
    imgProfile: '/userChange.svg',
    altImgProfile: 'icono de perfil',
    textProfile: 'Perfil',
    classProfileText: 'textProfile',
  }

  const StyleAcceptBtn = {
    idAcceptBtn: 'btnAcceptProfileUpdate',
    altImgBtn: 'icono actualizar perfil',
    altAcceptBtn: 'Boton actualizar perfil',
    action: 'update',
  }

  return (
    <DynamicModalWrapper
      title={title}
      fields={updateProfileFormFields}
      schema={updateUserProfileSchema}
      onSubmit={handleChangeInfo}
      buttonText={nameButton}
      dynamicIdModal="dynamicFormModal"
      StyleButton={StyleButton}
      StyleAcceptBtn={StyleAcceptBtn}
      initialValues={user}
    />
  );
};
