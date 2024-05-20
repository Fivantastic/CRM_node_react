import Joi from 'joi';
import DynamicForm from '../../components/forms/DynamicForm.jsx';
import { InitialLayout } from '../../layout/InitialLayout.jsx';
import { NavLink } from 'react-router-dom';
const URL = import.meta.env.VITE_URL;

export const ForgotPassword = () => {
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
      } else {
        const errorData = await response.json();
        console.error('Error al enviar el correo:', errorData);
      }
    } catch (error) {
      console.error('Error al enviar el correo:', error);
    }
  };

  const forgotPasswordUserSchema = Joi.object({
    email: Joi.string().email({ tlds: false }).required().label('Email'),
  });

  const forgotPasswordFormFields = [
    {
      name: 'email',
      label: 'Email',
      type: 'text',
      idInput: 'emailForgot',
      required: true,
    },
  ];

  const idFromForgot = {
    idTitleContainer:'idTitleContainerForgot',
    idLogo:'idLogoForgot',
    idSection:'idSectionForgot',
    idFrom:'idFromForgot',
    subTitle:"Welkome back! Please login to your account",
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
        buttonText="Recuperar contraseña"
        extraButtons={[]}
      />
            <NavLink to="/login">Volver</NavLink>
    </InitialLayout>
  );
};
