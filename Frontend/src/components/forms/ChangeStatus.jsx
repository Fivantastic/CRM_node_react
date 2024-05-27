// import { useEffect } from "react";
import Swal from "sweetalert2";
import { Toast } from "../alerts/Toast";
import { CancelButton } from "../buttons/StatesBtn/CancelButton";
import { CompletButton } from "../buttons/StatesBtn/CompletButton";
const URL = import.meta.env.VITE_URL;

export const ChangeStatus = ({id, onClick: handleNewPaymentStatus , currentStatus, token}) => {

  // TODO - Dev
  // console.log(`
  // id: ${id},
  // newStatus: ${newStatus},
  // type: ${typeModule},
  // typeMessage: ${typeModuleMessage},
  // token: ${token}`);

  const handleStatusChange = async () => {
    console.log(currentStatus);
      if (currentStatus === 'pending') {
        const { value: action } = await Swal.fire({
          title: '¿Qué acción deseas realizar?',
          text: 'Puedes resolver o cancelar el pago.',
          icon: 'question',
          allowOutsideClick: false,
          showCancelButton: true,
          confirmButtonText: 'Resolver',
          confirmButtonColor: '#28a745', 
          cancelButtonColor: '#6c757d', 
          showDenyButton: true,
          denyButtonText: 'Cancelar Pago',
          denyButtonColor: '#dc3545', 
        });

        if (action) {
          updateStatus('paid');
        } else if (action === false) {
          updateStatus('cancelled');
        }
    } else if (currentStatus === 'paid') {
        const confirmed = await Swal.fire({
          title: '¿Estás seguro?',
          text: '¿Quieres cancelar el pago?',
          icon: 'question',
          allowOutsideClick: false,
          showCancelButton: true,
          confirmButtonColor: '#dc3545', 
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
          const response = await fetch(
            `${URL}/payments/status`,
            {
              method: 'PUT',
              credentials: 'include',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `${token}`,
              },
              body: JSON.stringify({
                payment_id: id,
                new_status: newStatus
              }),
            }
          );
    
          if (response.ok) {
            //si la peticion es correcta
            const responseData = await response.json();
            console.log(`Pago actualizado con éxito:`, responseData);
            Toast.fire({
              icon: 'success',
              title: `Pago ${newStatus === 'paid'? 'resuelto' : 'cancelado'} con éxito`,
            })
            
            handleNewPaymentStatus(id, newStatus)
          } else {
            Toast.fire({
              icon: 'error',
              title: 'Hubo un problema al actualizar el pago',
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
      <img className="disabledVisitimg"  src="./blockCancel.svg" alt="Visita cancelada" />
    </div>
    )
  }

  return currentStatus === 'paid' ? (
    <CancelButton onClick={handleStatusChange} />
  ) : (
    <CompletButton onClick={handleStatusChange} />
  )
}