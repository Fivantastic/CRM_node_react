import Joi from 'joi';
import Swal from 'sweetalert2';
import { useSetUser } from '../../context/authContext.jsx';
import { useNavigate } from 'react-router-dom';
import DynamicForm from '../../components/forms/DynamicForm.jsx';
import { getUserDataFromToken } from '../../Services/GetUserDataToken.js';
import { getFullName } from '../../Services/getFullName.js';
import '../../Styles/Auth/LoginPage.css';
const URL = import.meta.env.VITE_URL;

export const LoginPage = () => {
  const navigate = useNavigate();
  const setUser = useSetUser();

  const handleLoginSubmit = async (data) => {
    try {
      const response = await fetch(`${URL}/user/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log('Login satisfactorio:', responseData.message);

        // Extraer el token de la respuesta
        const newToken = responseData.token;

        // Extraer el nombre de usuario de la respuesta
        const { name, lastName } = getUserDataFromToken(newToken);

        // Actualizar el token en el localStorage y en el estado del contexto
        setUser(newToken);

        // Opcion Modal 3
        const Toast = Swal.mixin({
          toast: true,
          position: 'bottom-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
            navigate('/home');
          },
        });

        Toast.fire({
          icon: 'success',
          title: 'Bienvenido a Cosmic, ' + getFullName(name, lastName) + '.',
        });
      } else {
        const errorData = await response.json();
        console.error('Login fallido:', errorData);

        // Si el usuario no esta activo muestra un mensaje de error modal
        if (errorData.code === 'ACCOUNT_INACTIVE_CRM_ERROR') {
          Swal.fire({
            icon: 'error',
            title: 'Usuario inactivo',
            text: 'Verifica tu correo electronico para activar tu cuenta',
          });
        }

        // Si la contraseña es incorrecta muestra un mensaje de error modal
        if (errorData.code === 'INVALID_PASSWORD_CRM_ERROR') {
          Swal.fire({
            icon: 'error',
            title: '¡Contraseña incorrecta!',
          });
          // Borra el campo de la contraseña
          document.getElementById('password').value = '';
        }
      }
    } catch (error) {
      console.error('Error durante el login:', error);
      // Mostrar un mensaje de error al usuario
    }
  };

  const loginUserSchema = Joi.object({
    email: Joi.string().email({ tlds: false }).required().label('Email'),
    password: Joi.string()
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]+$/)
      .required()
      .label('Password'),
  });

  const loginFormFields = [
    {
      name: 'email',
      label: 'Usuario/Email',
      type: 'text',
      placeholder: 'Introduce tu email...',
      required: true,
    },
    {
      name: 'password',
      label: 'Password',
      type: 'password',
      placeholder: 'Introduce tu contraseña...',
      required: true,
    },
    {
      type: 'textWithLink',
      linkText: '¿Olvidaste tu contraseña?',
      link: 'http://localhost:5173/forgot-password',
    },
  ];

  return (
    <main className="login-page-container">
      <section className="login-page-animation-container">
        <img className="login-page-image" src="./Mesa_de_trabajo_1.png" alt="imagen de login" />

      </section>
      <section className="login-page-form-container">
        <DynamicForm
          title="Login"
          onSubmit={handleLoginSubmit}
          schema={loginUserSchema}
          fields={loginFormFields}
          buttonText={'Entrar'}
          extraButtons={[]}
          />
      </section>
    </main>
  );
};
