import Swal from "sweetalert2";
import { useUser } from "../../../context/authContext.jsx"
import { updateUserProfileSchema } from "../../../Schema/Error/updateSchema.js";
import { DynamicModalWrapper } from "../../FromModal/DynamicModalWrapper.jsx";

export const ChangeInfo = () => {
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

      // Titulo de la ventana
  const title = 'Actualizar Perfil';

  // Nombre que se muestra en el botón de submit, 
  const nameButton = 'Actualizar';

  // Campos del formulario personalizables
  const updateProfileFormFields = [
    {
      name: 'name',
      label: 'Nombre',
      type: 'text',
      idLabel: 'labelNameProfileUpdate',
      idInput: 'inputNameProfileUpdate',
      required: false,
    },
    {
      name: 'last_name',
      label: 'Apellidos',
      type: 'text',
      idLabel: 'labelLastNameProfileUpdate',
      idInput: 'inputLastNameProfileUpdate',
      required: false,
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      idLabel: 'labelEmailProfileUpdate',
      idInput: 'inputEmailProfileUpdate',
      required: false,
    },
    {
      name: 'phone',
      label: 'Teléfono',
      type: 'text',
      idLabel: 'labelPhoneProfileUpdate',
      idInput: 'inputPhoneProfileUpdate',
      required: false,
    },
    {
        name: 'biography',
        label: 'Informacion Personal',
        type: 'textarea',
        idLabel: 'labelBiographyProfileUpdate',
        idInput: 'inputBiographyProfileUpdate',
        required: false,
    }
  ];

  const StyleButton = {
    action:'profileUpdate',
    imgProfile: '',
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
    fields={updateProfileFormFields}
    schema={updateUserProfileSchema}
    onSubmit={handleChangeInfo}
    buttonText={nameButton}
    dynamicIdModal="dynamicFormModal"
    StyleButton={StyleButton}
    StyleAcceptBtn={StyleAcceptBtn}
  />
  );
};