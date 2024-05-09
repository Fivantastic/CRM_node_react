import Swal from 'sweetalert2';
import '../EditButton.jsx';

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
        <button className="editBtn" onClick={handleClick}>
            <svg height="1em" viewBox="0 0 512 512">
                <path
                    d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"
                ></path>
            </svg>
        </button>
    );
};
