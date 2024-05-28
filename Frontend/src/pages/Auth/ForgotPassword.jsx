import Swal from 'sweetalert2';
import DynamicForm from '../../components/forms/DynamicForm.jsx';
import { InitialLayout } from '../../layout/InitialLayout.jsx';
import { forgotPasswordUserSchema } from '../../Schema/Error/AuthSchema.js';
import { NavLink, useNavigate } from 'react-router-dom';
const URL = import.meta.env.VITE_URL;

export const ForgotPassword = () => {
  const navigate = useNavigate();
  const handleForgotPasswordSubmit = async (data) => {
    try {
      //Peticion para cambiar el codigo de registro en la base de datos, y enviarte un email con el enlace para cambiar la contraseña
      const response = await fetch(`${URL}/user/forgot-password-request`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log('Correo enviado:', responseData);


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
          title: 'Email de recuperación enviado!',
      });
      } else {
        const errorData = await response.json();
        console.error('Error al enviar el correo:', errorData);
      }
    } catch (error) {
      console.error('Error al enviar el correo:', error);
    }
  };

  const forgotPasswordFormFields = [
    {
      name: 'email',
      label: 'Email',
      type: 'text',
      idInputContainer: 'emailContainerForgot',
      idInput: 'emailForgot',
      required: true,
    },
  ];

  const idFromForgot = {
    idTitleContainer:'idTitleContainerForgot',
    idLogo:'idLogoForgot',
    idSection:'sectionLogin',
    idFrom:'idFromForgot',
    idSubTitle:'idTitleForgot',
    subTitle:"Enter your email and we send you a password reset link.",
    submitBtn:"submitBtnForgot",
  }

  return (
    <InitialLayout>
      <DynamicForm
        title="Recuperar contraseña"
        imgTitle="./Logo_cosmic.svg"
        imgTitleActive='true'
        idCustom={idFromForgot}
        onSubmit={handleForgotPasswordSubmit}
        schema={forgotPasswordUserSchema}
        fields={forgotPasswordFormFields}
        buttonText="Send request"
        extraButtons={[]}
      />
      <NavLink to="/login">Volver</NavLink>
    </InitialLayout>
  );
};
