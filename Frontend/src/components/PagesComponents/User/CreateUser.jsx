import Joi from 'joi';
import Swal from 'sweetalert2';
import DynamicFormPopUp from '../../forms/DynamicFormPopUp.js';

export const CreateUser = ({ onAddUser, token }) => {

  // Aqui hace la peticion al servidor
  const handleUserCreate = async (formData) => {
    try {
        const response = await fetch('http://localhost:3000/user/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `${token}`
            },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        //si la peticion es correcta
        const responseData = await response.json();
        console.log('Visita satisfactorio:', responseData);

        
        onAddUser(responseData.data);

        // Aqui puedes mostrar un mensaje de exito con Swal que sale abajo a la derecha de la pantalla y dura 3 segundos
        const Toast = Swal.mixin({
          toast: true,
          position: 'bottom-end',
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
          title: 'Usuario creado con exito !',
        });
      } else {
        // si la peticion es incorrecta
        const errorData = await response.json();
        console.error('Crear usuario fallido:', errorData);
        // Aquí podrías mostrar un mensaje de error con Swal.fire si lo deseas
      }
    } catch (error) {
      // si la peticion falla
      console.error('Error al crear usuario:', error);
      // Aquí podrías mostrar un mensaje de error con Swal.fire si lo deseas
    }
  };

  // Titulo de la ventana, CAMBIARLO SI ES NECESARIO
  const title = 'Crear usuario';

  // Nombre que se muestra en el botón de submit, CAMBIARLO SI ES NECESARIO
  const nameButton = 'Crear';

  // Campos del formulario personalizables
  const userFormFields = [
    {
      name: 'name',
      type: 'text',
      label: 'Nombre',
      required: true,

      idLabel: 'labelNameUserCreate',
      idInput: `inputNameUserCreate`,
    },
    { 
      name: 'last_name',
      type: 'text',
      label: 'Apellidos',
      required: true,
      idLabel: 'labelLastNameUserCreate',
      idInput: `inputNameUserCreate`,
    },
    {
      name: 'email',
      type: 'email',
      label: 'Email',
      idLabel: 'labelEmailUserCreate',
      idInput: `inputEmailUserCreate`,
      required: true,
    },
    {
      name: 'role',
      type: 'select',
      label: 'Rol',
      idLabel: 'labelRoleUserCreate',
      idInput: `inputSelectUserCreate`,

      required: true,
      options: {
        Administradores: { 
          admin: 'Administrador'
        },
        Empleados: {
          salesAgent: 'Comercial', 
          deliverer: 'Repartidor'
        },
      },
    },
  ];
  
  const newUserSchema = Joi.object({
    name: Joi.string().required().label('Name'),
    last_name: Joi.string().required().label('Last Name'),
    email: Joi.string().email({ tlds: false }).required().label('Email'),
    role: Joi.string().valid('salesAgent', 'admin', 'deliverer').required().label('Role')
  });

  const handleClickCreateUser = () => {
    DynamicFormPopUp(
      title,
      userFormFields,
      newUserSchema,
      handleUserCreate,
      nameButton
    );
  };
  return (
    <>
      <button id='btnUserCreate' className=" mainCreateBtn" onClick={handleClickCreateUser}>
        <img id='imgUserCreate' src="./addUser.svg" alt="Boton agregar usuario" />
      </button>
    </>
  );
};
