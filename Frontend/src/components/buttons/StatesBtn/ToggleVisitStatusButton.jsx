import Swal from 'sweetalert2';
import { CancelButton } from './CancelButton.jsx';
import { CompletButton } from './CompletButton.jsx';
const URL = import.meta.env.VITE_URL;

export const ToggleVisitStatusButton = ({ id, currentStatus, updateVisit, token }) => {
  const handleClick = async () => {
    if (currentStatus === 'scheduled') {
      const result = await Swal.fire({
        title: '¿Qué acción deseas realizar?',
        text: 'Puedes completar o cancelar la visita.',
        icon: 'question',
        allowOutsideClick: false,
        showCancelButton: true,
        confirmButtonText: 'Completar',
        confirmButtonColor: '#3aa856', // Verde para completar
        cancelButtonColor: '#6c757d', // Color para salir
        showDenyButton: true,
        denyButtonText: 'Cancelar visita',
        denyButtonColor: '#eb3a3a', // Rojo para cancelar
      });

      if (result.isConfirmed) {
        updateStatus('completed');
      } else if (result.isDenied) {
        const confirmed = await Swal.fire({
          title: '¿Estás seguro?',
          text: '¿Quieres cancelar la visita?',
          icon: 'question',
          allowOutsideClick: false,
          showCancelButton: true,
          confirmButtonColor: '#eb3a3a', // Rojo para cancelar
          cancelButtonColor: '#6c757d',
          confirmButtonText: 'Sí, Cancelar',
          cancelButtonText: 'Salir',
        });

        if (confirmed.isConfirmed) {
          updateStatus('cancelled');
        }
      }
      
    } else if (currentStatus === 'completed') {
      const confirmed = await Swal.fire({
        title: '¿Estás seguro?',
        text: '¿Quieres cancelar la visita?',
        icon: 'question',
        allowOutsideClick: false,
        showCancelButton: true,
        confirmButtonColor: '#eb3a3a', // Rojo para cancelar
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'Sí, Cancelar',
        cancelButtonText: 'Salir',
      });

      if (confirmed.isConfirmed) {
        updateStatus('cancelled');
      }
    }
  };

  const updateStatus = async (newStatus) => {
    try {
      const response = await fetch(`${URL}/visits/updateStatus`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`,
        },
        body: JSON.stringify({ id, newStatus }),
      });

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

      if (response.ok) {
        updateVisit(id, newStatus);

        // Mostrar un mensaje de éxito
        Toast.fire({
          icon: 'success',
          title: `Visita ${newStatus === 'completed' ? 'completada' : 'cancelada'} con éxito`,
        });
      } else {
        // Mostrar un mensaje de error si la petición falla
        Toast.fire({
          icon: 'error',
          title: 'Hubo un problema al realizar la operación',
        });
      }
    } catch (error) {
      // Mostrar un mensaje de error si hay algún error en la petición
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
        icon: 'error',
        title: 'Hubo un problema al realizar la operación',
      });
    }
  };

  if (currentStatus === 'cancelled') {
    return (
      <div className="disabledVisit">
        <img className="disabledVisitimg" src="/blockCancel.svg" alt="Visita cancelada" />
      </div>
    );
  }

  return currentStatus === 'completed' ? (
    <CancelButton onClick={handleClick} />
  ) : (
    <CompletButton onClick={handleClick} />
  );
};
