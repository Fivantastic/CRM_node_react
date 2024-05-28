import Swal from 'sweetalert2';
import '../EditButton.jsx';
import { EditButton } from '../EditButton.jsx';

export const ButtonMoreUserActions = ({ id, activeUser, isActive, token }) => {
    const handleClick = async () => {
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
                    const successMessage = responseData.isActive ? 'Usuario activado con éxito' : 'Usuario desactivado con éxito';
                    
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

                    activeUser(id, responseData.isActive);
                } else {
                    Swal.fire({
                        icon: 'error',
                        text: 'Hubo un problema al realizar la operación'
                    });
                }
            } catch (error) {
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
