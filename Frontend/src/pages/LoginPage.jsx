import Joi from 'joi';
import DynamicForm from '../components/forms/DynamicForm.jsx';
export const LoginPage = () => {
  const handleLoginSubmit = async (data) => {
    try {
      // Peticion al servidor para el login y peticion en cors de las cookies
      const response = await fetch('http://localhost:3000/user/login', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      

      if (response.ok) {
        const responseData = await response.json();
        console.log('Login satisfactorio:', responseData);
        // redireccionar a la página principal
      } else {
        const errorData = await response.json();
        console.error('Login fallido:', errorData);
        // pops de error
      }
    } catch (error) {
      console.error('Error durante el login:', error);
      //pops de error
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
    }
  ];

  return (
    <div>
      <DynamicForm
        title="Login"
        onSubmit={handleLoginSubmit}
        schema={loginUserSchema}
        fields={loginFormFields}
        buttonText={'Entrar'}
      />
    </div>
  );
};

