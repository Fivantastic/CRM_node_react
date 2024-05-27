import Swal from 'sweetalert2';
import { newVisitSchema } from '../../../Schema/Error/createSchema.js';
import { DynamicModalWrapper } from '../../FromModal/DynamicModalWrapper.jsx';
import './VisitListTable.css';
import { useOpenCustomers } from '../../../hooks/selectsHook/useOpenCustomer.js';
import { useState } from 'react';
const URL = import.meta.env.VITE_URL;


export const CreateVisit = ({ onAddVisit, token }) => {
  const [reload, setReload] = useState(false);
  const openCustomers = useOpenCustomers(token, reload);
  // Aqui hace la peticion al servidor
  const handleVisitCreate = async (formData) => {
    try {
      const response = await fetch(`${URL}/visits/new`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        //si la peticion es correcta
        const responseData = await response.json();
        console.log('Visita satisfactorio:', responseData);

        onAddVisit(responseData.data);

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
          title: 'Visita programada con exito !',
        });
        setReload(!reload);
      } else {
        // si la peticion es incorrecta
        const errorData = await response.json();
        console.error('Programa de visita fallido:', errorData);
        // Aquí podrías mostrar un mensaje de error con Swal.fire si lo deseas
      }
    } catch (error) {
      // si la peticion falla
      console.error('Error programa de visita fallido:', error);
      // Aquí podrías mostrar un mensaje de error con Swal.fire si lo deseas
    }
  };

  // Titulo de la ventana
  const title = 'Programar Visita';

  const nameButton = 'Crear';

  // Campos del formulario personalizables
  const VisitFormFields = [
    {
      key: 'id_customer', 
      name: 'id_customer',
      label: 'Cliente *',
      type: 'select',
      options: {
        'Clientes': openCustomers.map(customer => ({
          value: customer.id_customer,
          label: `${customer.ref_CT} - ${customer.company_name}`
        }))
      },
      idLabel: 'labelNameVisitCreate',
      idInput: 'inputNameVisitCreate',
      required: true,
    },
    {
      name: 'visit_date',
      label: 'Fecha *',
      type: 'date',
      idLabel: 'labelDateVisitCreate',
      idInput: 'inputDateVisitCreate',
      required: true,
    },
    {
      name: 'observations',
      label: 'Observaciones',
      type: 'textarea',
      idLabel: 'labelObservationsVisitCreate',
      idInput: 'inputObservationsVisitCreate',
      required: false,
    },
  ];

  // Estilos del boton, copia el id del antiguo
  const StyleButton = {
    idBtn:'btnVisitCreate',
    idImgBtn:'imgVisitCreate',
    srcImgBtn:'/addVisit.svg',
    altImgBtn:'Boton agregar visita',
    action:'create'
  }

  const StyleAcceptBtn = {
    idAcceptBtn:'btnAcceptVisitsCreate',
    altImgBtn:'icono crear Visita',
    btnSvg:'/addVisitWhite.svg',
    altAcceptBtn:'Boton crear',
    action:'create'
  }

  return (
      <DynamicModalWrapper
        title={title}
        fields={VisitFormFields}
        schema={newVisitSchema}
        onSubmit={handleVisitCreate}
        buttonText={nameButton}
        dynamicIdModal="dynamicFormModal"
        StyleButton={StyleButton}
        StyleAcceptBtn={StyleAcceptBtn}
      />
  );
};
