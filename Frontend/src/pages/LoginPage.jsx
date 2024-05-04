import Joi from 'joi';
import DynamicForm from '../components/forms/DynamicForm.jsx';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext.jsx';
import { useContext } from 'react';
import'../components/PopsStyle/PopLoginStyle.css';
import Swal from 'sweetalert2';

export const LoginPage = () => {
  const navigate = useNavigate(); 
  const { setUser } = useContext(AuthContext);

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

        // Extraer el nombre de usuario de la respuesta
        const username = responseData.user;

        // Actualizar el token en el localStorage y en el estado del contexto
        setUser(newToken); 

        // Opcion Modal 1
        // await Swal.fire({
        //   title: "Login successful!",
        //   text: "Welcome, " + username + ".",
        //   icon: "success"
        // }).then((result) => {
        //   if (result.isConfirmed) {
        //     navigate('/home');
        //   }
        // });

        // Opcion Modal 2
        // await Swal.fire({
        //   title: "Login successful!",
        //   text: "Welcome, " + username + ".",
        //   icon: "success",
        //   allowOutsideClick: false // Evitar que el usuario cierre el modal haciendo clic fuera de él
        // }).then((result) => {
        //   if (result.isConfirmed || result.dismiss === Swal.DismissReason.overlay || result.dismiss === Swal.DismissReason.esc || result.dismiss === Swal.DismissReason.close) {
        //     navigate('/home');
        //   }
        // });

        // Opcion Modal 3
        const Toast = Swal.mixin({
          toast: true,
          position: "bottom-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
            navigate('/home');
          }
        });
        
        Toast.fire({
          icon: "success",
          title: "Bienvenido a Cosmic, " + username + "."
        });
        
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
    }
  ];

  // const extraButtons = [
  //   {
  //     type: 'reset',
  //     label: 'Borrar',
  //   }
  // ];

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
