import Swal from 'sweetalert2';
import { CompletButton } from '../../buttons/StatesBtn/CompletButton.jsx';
const URL = import.meta.env.VITE_URL;

export const StatusCustomerController = ({ id, isActive, activeCustomer, token, typeModuleMessage }) => {
  const handleClick = async () => {
    const confirmButtonText = isActive ? 'Desactivar' : 'Activar';
    const confirmButtonColor = isActive ? '#dc3545' : '#28a745';
    const confirmationMessage = isActive ? `¿Quieres desactivar el ${typeModuleMessage}?` : `¿Quieres activar el ${typeModuleMessage}?`;

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
        const response = await fetch(`${URL}/custo/active`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`
          },
          body: JSON.stringify({ id })
        });

        if (response.ok) {
          const responseData = await response.json();
          const successMessage = responseData.isActive ? `${typeModuleMessage} activado con éxito` : `${typeModuleMessage} desactivado con éxito`;

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
            text: successMessage,
          });

          activeCustomer(id, responseData.isActive);
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
    <CompletButton onClick={handleClick} />
  );
};
