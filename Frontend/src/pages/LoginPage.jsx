import Joi from 'joi';
import DynamicForm from '../components/forms/DynamicForm.jsx';
import { AuthContext } from '../context/authContext.jsx';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';

export const LoginPage = () => {
  const navigate = useNavigate(); 
  const { setToken } = useContext(AuthContext);

  const handleLoginSubmit = async (data) => {
    try {
      const response = await fetch('http://localhost:3000/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log('Login satisfactorio:', responseData);

        // Extraer el token de la respuesta
        const newToken = responseData.token;

        // Actualizar el token en el localStorage y en el estado del contexto
        setToken(newToken);

        // Redireccionar a la página principal
        navigate('/home'); // Usa navigate para redirigir al usuario a la página principal

      } else {
        const errorData = await response.json();
        console.error('Login fallido:', errorData);
        // Mostrar un mensaje de error al usuario
      }
    } catch (error) {
      console.error('Error durante el login:', error);
      // Mostrar un mensaje de error al usuario
    }
  };

  const loginUserSchema = Joi.object({
    email: Joi.string().email({ tlds: false }).required().label('Email'),
    password: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]+$/)
                     .required()
                     .label('Password')
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
      link: 'http://localhost:5173/forgot-password' // URL a la que deseas redirigir al hacer clic en el enlace
    },
  ];

  return (
    <div>
      <DynamicForm
        title="Login"
        onSubmit={handleLoginSubmit}
        schema={loginUserSchema}
        fields={loginFormFields}
        buttonText={'Entrar'}
        extraButtons={[]}
      />
    </div>
  );
};
