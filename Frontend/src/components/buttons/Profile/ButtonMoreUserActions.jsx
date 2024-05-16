import Swal from 'sweetalert2';
import '../EditButton.jsx';
import { EditButton } from '../EditButton.jsx';

export const ButtonMoreUserActions = ({ id, activeUser, isActive, token }) => {

    const handleClick = async () => {
        // Dependiendo del estado isActive, mostramos el mensaje y el color correspondiente
        const confirmButtonText = isActive ? 'Desactivar' : 'Activar';
        const confirmButtonColor = isActive ? '#dc3545' : '#28a745';
        const confirmationMessage = isActive ? '¿Quieres desactivar al usuario?' : '¿Quieres activar al usuario?';

        const confirmed = await Swal.fire({
            title: '¿Estás seguro?',
            text: confirmationMessage,
            icon: 'question',
            allowOutsideClick: false,
            showCancelButton: true,
            confirmButtonColor: confirmButtonColor,
            cancelButtonColor: '#6c757d',
            confirmButtonText: `Sí, ${confirmButtonText}`
        });

        if (confirmed.isConfirmed) {
            try {
                // Realizar la petición al servidor para activar o desactivar al usuario según sea necesario
                const response = await fetch(`http://localhost:3000/user/toggleActivation`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `${token}`
                    },
                    body: JSON.stringify({ id })
                });

                if (response.ok) {
                  const responseData = await response.json();
              
                  // Determinar el mensaje de éxito basado en el estado del usuario
                  const successMessage = responseData.isActive ? 'Usuario activado con éxito' : 'Usuario desactivado con éxito';
              
                  // Mostrar un mensaje de éxito
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
                      text: successMessage,
                  });

                   // Actualizar el estado del usuario en el frontend
                   activeUser(id);
              } else {
                  // Mostrar un mensaje de error si la petición falla
                  Swal.fire({
                      icon: 'error',
                      text: 'Hubo un problema al realizar la operación'
                  });
              }

            } catch (error) {
                // Mostrar un mensaje de error si hay algún error en la petición
                Swal.fire({
                    icon: 'error',
                    text: 'Hubo un problema al realizar la operación'
                });
            }
        }
    };

    return (
        <EditButton onClick={handleClick} />
    );
};
