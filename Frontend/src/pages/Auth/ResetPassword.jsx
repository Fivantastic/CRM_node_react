import { useNavigate, useParams } from 'react-router-dom';
import DynamicForm from '../../components/forms/DynamicForm.jsx';
import { InitialLayout } from '../../layout/InitialLayout.jsx';
import { resetPasswordUserSchema } from '../../Schema/Error/AuthSchema.js';
import { NavLink } from 'react-router-dom';
import Swal from 'sweetalert2';
const URL = import.meta.env.VITE_URL;

export const ResetPassword = () => {
  const { registration_code } = useParams();
  const navigate = useNavigate();

  const handleResetPasswordSubmit = async (data) => {
    try {
      // Peticion al servidor para el login y peticion en cors de las cookies
      const response = await fetch(
        `${URL}/user/reset-password/${registration_code}`,
        {
          // Incluye el código de registro en la URL de la solicitud
          method: 'PUT',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }
      );
      if (response.ok) {
        const responseData = await response.json();
        console.log('Contraseña cambiada con exito:', responseData);
        // redireccionar a la página principal

        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
              navigate('/login');
          },
      });

      Toast.fire({
          icon: 'success',
          title: 'Password restablecido!',
      });
      } else {
        const errorData = await response.json();
        console.error('Restablecer contraseña a fallado:', errorData);
        // pops de error
      }
    } catch (error) {
      console.error('Error durante el login:', error);
      //pops de error
    }
  };

  const resetPasswordFields = [
    {
      name: 'newPassword',
      label: 'New password',
      type: 'password',
      idInputContainer: 'passwordContainerReset',
      idInput: 'passwordLoginReset',
      required: true,
    },
    {
      name: 'repeatPassword',
      label: 'Repeat new password',
      type: 'password',
      idInputContainer: 'passwordContainerResetNew',
      idInput: 'passwordResetNew',
      required: true,
    },
  ];

  const idFormReset = {
    idTitleContainer: 'idTitleContainerReset',
    idLogo: 'idLogoReset',
    idSection: 'sectionLogin',
    idFrom: 'idFormReset',
    idSubTitle:'idTitleReset',
    subTitle: "Enter your new password to update your account.",
    idNavLogin: "idNavReset",
    submitBtn: "submitBtnReset",
}

  return (
    <InitialLayout>
      <DynamicForm
        title="Nueva contraseña"
        imgTitle="/Logo_cosmic.svg"
        imgTitleActive='true'
        idCustom={idFormReset}
        onSubmit={handleResetPasswordSubmit}
        schema={resetPasswordUserSchema}
        fields={resetPasswordFields}
        buttonText={'Reset password'}
        extraButtons={[]}
      />
      <NavLink to="/login">Volver</NavLink>
    </InitialLayout>
  );
};
