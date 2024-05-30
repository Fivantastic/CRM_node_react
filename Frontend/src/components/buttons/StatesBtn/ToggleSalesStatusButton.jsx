import Swal from 'sweetalert2';
import { CancelButton } from './CancelButton.jsx';
import { CompletButton } from './CompletButton.jsx';
const URL = import.meta.env.VITE_URL;

export const ToggleSalesStatusButton = ({ id, currentStatus, onUpdateSale, token }) => {
  const handleClick = async () => {
    if (currentStatus === 'processing') {
      const result = await Swal.fire({
        title: '¿Qué acción deseas realizar?',
        text: 'Puedes completar o cancelar la venta.',
        icon: 'question',
        allowOutsideClick: false,
        showCancelButton: true,
        confirmButtonText: 'Completar',
        confirmButtonColor: '#28a745', // Verde para completar
        cancelButtonColor: '#6c757d', // Color para salir
        showDenyButton: true,
        denyButtonText: 'Cancelar venta',
        denyButtonColor: '#dc3545', // Rojo para cancelar
      });

      if (result.isConfirmed) {
        updateStatus('closed');
      } else if (result.isDenied) {
        const confirmed = await Swal.fire({
          title: '¿Estás seguro?',
          text: '¿Quieres cancelar la venta?',
          icon: 'question',
          allowOutsideClick: false,
          showCancelButton: true,
          confirmButtonColor: '#dc3545', // Rojo para cancelar
          cancelButtonColor: '#6c757d',
          confirmButtonText: 'Sí, cancelar',
          cancelButtonText: 'Salir',
        });

        if (confirmed.isConfirmed) {
          updateStatus('cancelled');
        }
      }
    } else if (currentStatus === 'closed') {
      const confirmed = await Swal.fire({
        title: '¿Estás seguro?',
        text: '¿Quieres cancelar la venta?',
        icon: 'question',
        allowOutsideClick: false,
        showCancelButton: true,
        confirmButtonColor: '#dc3545', // Rojo para cancelar
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'Sí, cancelar',
        cancelButtonText: 'Salir',
      });

      if (confirmed.isConfirmed) {
        updateStatus('cancelled');
      }
    }
  };

  const updateStatus = async (newStatus) => {
    try {
      const response = await fetch(`${URL}/sales/updateStatus`, {
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
        // Actualizar el estado de la venta en el frontend
        onUpdateSale(id, newStatus);

        // Mostrar un mensaje de éxito
        Toast.fire({
          icon: 'success',
          title: `Venta ${newStatus === 'closed' ? 'completada' : 'cancelada'} con éxito`,
        });
      } else {
        const data = await response.json();
        if (data.code === 'NOTE_NOT_CANCELLED_CRM_ERROR') {
          Toast.fire({
            icon: 'warning',
            title: 'Esta venta tiene el albaran sin cancelar',
          });
        } else if (data.code === 'NOTE_SHIPMENT_NOT_CANCELLED_CRM_ERROR') {
          Toast.fire({
            icon: 'warning',
            title: 'Esta venta tiene albaranes y envios sin cancelar',
          });
        } else {
          Toast.fire({
            icon: 'error',
            title: 'Hubo un problema al realizar la operación',
          });
        }
      }
    } catch (error) {
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
        <img
          className="disabledVisitimg"
          src="./blockCancel.svg"
          alt="Venta cancelada"
        />
      </div>
    );
  }

  return currentStatus === 'closed' ? (
    <CancelButton onClick={handleClick} />
  ) : (
    <CompletButton onClick={handleClick} />
  );
};
