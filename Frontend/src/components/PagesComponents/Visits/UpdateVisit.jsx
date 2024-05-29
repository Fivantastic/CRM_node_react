import Swal from 'sweetalert2';
import { useUser } from '../../../context/authContext.jsx';
import { updateVisitSchema } from '../../../Schema/Error/updateSchema.js';
import { DynamicModalWrapper } from '../../FromModal/DynamicModalWrapper.jsx';
import { useState } from 'react';
import { useOpenUser } from '../../../hooks/selectsHook/useOpenUser.js';
const URL = import.meta.env.VITE_URL;

export const UpdateVisit = ({ visit, onUpdateVisit }) => {
  // Asi obtienes el token del usuario de la sesión
  const token = useUser();
  const [reload, setReload] = useState(false);
  const openUsers = useOpenUser(token, reload);

  // Aqui hace la peticion al servidor
  const handleButtonUpdateVisit = async (formData) => {
    try {
      const response = await fetch(
        `${URL}/visits/update/${visit}`,
        {
          method: 'PUT',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${token}`,
          },
          body: JSON.stringify(formData), // aqui va el formData lo que le envio lo del body
        }
      );

      if (response.ok) {
        //si la peticion es correcta
        const responseData = await response.json();
        console.log('Venta actualizada satisfactorio:', responseData);

        onUpdateVisit(visit);

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
          title: 'Actualización Realizada con exito ! ',
        });

        setReload(!reload);
      } else {
        // si la peticion es incorrecta
        const errorData = await response.json();
        console.error('Actualización Visita fallido:', errorData);
        // Aquí podrías mostrar un mensaje de error con Swal.fire si lo deseas
      }
    } catch (error) {
      // si la peticion falla
      console.error('Error durante la Actualización de venta:', error);
      // Aquí podrías mostrar un mensaje de error con Swal.fire si lo deseas
    }
  };

  // Titulo de la ventana
  const title = 'Actualizar Visita';

  // Nombre que se muestra en el botón de submit, 
  const nameButton = 'Actualizar';

  // Campos del formulario personalizables
  const updateVisitFormFields = [
    {
      key: 'id_user', 
      name: 'id_user',
      label: 'Comercial',
      type: 'select',
      options: {
        Comercial: openUsers.map(user => ({
          value: user.id_user,
          label: `${user.ref_US} - ${user.name} ${user.last_name}`,
        }))
      },
      idLabel: 'labelUserVisitUpdate',
      idInput: 'inputUserVisitUpdate',
      required: false,
    },
    {
      name: 'visit_date',
      label: 'Fecha',
      type: 'date',
      idLabel: 'labelDateVisitUpdate',
      idInput: 'inputDateVisitUpdate',
      required: false,
    },
    {
      name: 'observations',
      label: 'Observaciones',
      type: 'textarea',
      idLabel: 'labelObservationsVisitUpdate',
      idInput: 'inputObservationsVisitUpdate',
      required: false,
    },
  ];

  const StyleButton = {
    action:'Update'
  }

  const StyleAcceptBtn = {
    idAcceptBtn:'btnAcceptVisitsUpdate',
    altImgBtn:'icono actualizar Visitas',
    altAcceptBtn:'Boton actualizar Visitas',
    action:'update',
  }


  return (
    <DynamicModalWrapper
    title={title}
    fields={updateVisitFormFields}
    schema={updateVisitSchema}
    onSubmit={handleButtonUpdateVisit}
    buttonText={nameButton}
    dynamicIdModal="dynamicFormModal"
    StyleButton={StyleButton}
    StyleAcceptBtn={StyleAcceptBtn}
  />
  );
};
