import Joi from 'joi';
import DynamicForm from '../components/forms/DynamicForm.jsx'; 
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../context/authContext.jsx';
import Swal from 'sweetalert2';


export function RegisterPage(){
  const navigate = useNavigate();
  const token = useUser();


  const handleRegisterSubmit = async (data) => {
    try {
      console.log(token)
      const response = await fetch('http://localhost:3000/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        await response.json();

        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
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
          title: data.name + " " + data.last_name + " registro exitoso!",
        });
        // Redireccionar a la página principal
        navigate('/home');
      } else {
        const errorData = await response.json();
        console.error('Registration failed:', errorData);
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  const registerUserSchema = Joi.object({
    name: Joi.string().required().label('Name'),
    last_name: Joi.string().required().label('Last Name'),
    email: Joi.string().email({ tlds: false }).required().label('Email'),
    role: Joi.string().valid('salesAgent', 'admin', 'deliverer').required().label('Role')
  });

  const registrationFormFields = [
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      required: true,
    },
    {
      name: 'last_name',
      label: 'Last Name',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      required: true,
    },
    {
      name: 'role',
      label: 'Role',
      type: 'select',
      options: [
        { value: 'salesAgent', label: 'Sales Agent' },
        { value: 'admin', label: 'Admin' },
        { value: 'deliverer', label: 'Deliverer' },
      ],
      required: true,
    }
  ];

  return (
    <div>
      <li><Link to="/">Home</Link></li>
      <h1>User Registration</h1>
      <DynamicForm
        title="Register User"
        onSubmit={handleRegisterSubmit}
        schema={registerUserSchema}
        fields={registrationFormFields}
        buttonText={'Submit'}
        extraButtons={[]}
      />
    </div>
  );
}

export default RegisterPage;
