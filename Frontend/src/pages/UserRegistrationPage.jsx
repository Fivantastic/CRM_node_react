import Joi from 'joi';
import DynamicForm from '../components/forms/DynamicForm.jsx'; 
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext.jsx';
import { useContext } from 'react';

function RegisterPage() {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  const handleRegisterSubmit = async (data) => {
    try {
      const response = await fetch('http://localhost:3000/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log('Registration successful:', responseData);

        const newToken = responseData.token;

        setUser(newToken);

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
    lastName: Joi.string().required().label('Last Name'),
    email: Joi.string().email({ tlds: false }).required().label('Email'),
    role: Joi.string().valid('user', 'admin').required().label('Role')
  });

  const registrationFormFields = [
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      required: true,
    },
    {
      name: 'lastName',
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
        { value: 'user', label: 'User' },
        { value: 'admin', label: 'Admin' }
      ],
      required: true,
    }
  ];

  return (
    <div>
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
