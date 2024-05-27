import Swal from 'sweetalert2';
import { newUserSchema } from '../../../Schema/Error/createSchema.js';
import { DynamicModalWrapper } from '../../FromModal/DynamicModalWrapper.jsx';
const URL = import.meta.env.VITE_URL;

export const CreateUser = ({ onAddUser, token }) => {

  // Aqui hace la peticion al servidor
  const handleUserCreate = async (formData) => {
    try {
        const response = await fetch(`${URL}/user/register`, {
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
          position: 'top-end',
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

  // Titulo de la ventana
  const title = 'Crear usuario';

  // Nombre que se muestra en el botón de submit
  const nameButton = 'Crear';

  // Campos del formulario personalizables
  const userFormFields = [
    {
      name: 'name',
      type: 'text',
      label: 'Nombre *',
      required: true,

      idLabel: 'labelNameUserCreate',
      idInput: `inputNameUserCreate`,
    },
    { 
      name: 'last_name',
      type: 'text',
      label: 'Apellidos *',
      required: true,
      idLabel: 'labelLastNameUserCreate',
      idInput: `inputLastNameUserCreate`,
    },
    {
      name: 'email',
      type: 'email',
      label: 'Email *',
      idLabel: 'labelEmailUserCreate',
      idInput: `inputEmailUserCreate`,
      required: true,
    },
    {
      name: 'role',
      type: 'select',
      label: 'Rol *',
      idLabel: 'labelRoleUserCreate',
      idInput: 'inputSelectUserCreate',
      value: '',
      required: true,
      options: {
        Cargo: [
          { value: 'admin', label: 'Administrador' },
          { value: 'salesAgent', label: 'Comercial' },
          { value: 'deliverer', label: 'Repartidor' },
        ],
      },
    }
  ];
  

  const StyleButton = {
    idBtn:'btnUserCreate',
    idImgBtn:'imgUserCreate',
    srcImgBtn:'/addUser.svg',
    altImgBtn:'icono agregar usuario',
    action:'create'
  }

  const customModalSize = {
    idModalContainer:'createCustomerContainerModal',
  }

  const StyleAcceptBtn = {
    idAcceptBtn:'btnAcceptUserCreate',
    altImgBtn:'icono crear usuario',
    btnSvg:'/addUserWhite.svg',
    altAcceptBtn:'Boton crear',
    action:'create'
  }

return (
    <DynamicModalWrapper
      title={title}
      fields={userFormFields}
      schema={newUserSchema}
      onSubmit={handleUserCreate}
      buttonText={nameButton}
      dynamicIdModal="dynamicFormModal"
      StyleButton={StyleButton}
      customModalSize={customModalSize} 
      StyleAcceptBtn={StyleAcceptBtn}
    />
  );
};
