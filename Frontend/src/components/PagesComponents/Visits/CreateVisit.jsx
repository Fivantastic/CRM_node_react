import Swal from 'sweetalert2';
import { newVisitSchema } from '../../../Schema/Error/createSchema.js';
import './VisitListTable.css';
import { DynamicModalWrapper } from '../../FromModal/DynamicModalWrapper.jsx';

export const CreateVisit = ({ onAddVisit, token }) => {
  // Aqui hace la peticion al servidor
  const handleVisitCreate = async (formData) => {
    try {
      const response = await fetch('http://localhost:3000/visits/new', {
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
          title: 'Visita programada con exito !',
        });
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

  // Titulo de la ventana, CAMBIARLO SI ES NECESARIO
  const title = 'Programar Visita';

  // Nombre que se muestra en el botón de submit, CAMBIARLO SI ES NECESARIO
  const nameButton = 'Crear';

  // Campos del formulario personalizables
  const VisitFormFields = [
    {
      name: 'id_customer',
      label: 'Cliente *',
      type: 'text',
      placeholder: 'Introduce el  cliente...',
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
      placeholder: 'Introduce las observaciones...',
      required: false,
    },
  ];


  const StyleButton = {
    idBtn:'btnVisitCreate',
    idImgBtn:'imgVisitCreate',
    srcImgBtn:'/calendar_add_on_24dp_FILL0_wght400_GRAD0_opsz24.svg',
    altImgBtn:'Boton agregar visita',
  }

  return (
    <>
      <DynamicModalWrapper
        title={title}
        fields={VisitFormFields}
        schema={newVisitSchema}
        onSubmit={handleVisitCreate}
        buttonText={nameButton}
        dynamicIdModal="dynamicFormModal"
        StyleButton={StyleButton}
      />
    </>
  );
};
