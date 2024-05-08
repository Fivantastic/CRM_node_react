// import { useEffect } from "react";
import Swal from "sweetalert2";

export const ChangeStatus = ({id, onClick: handleNewPaymentStatus , newStatus, newStatusMessage,typeModule, typeModuleMessage, token}) => {

  // TODO - Dev
  // console.log(`
  // id: ${id},
  // newStatus: ${newStatus},
  // type: ${typeModule},
  // typeMessage: ${typeModuleMessage},
  // token: ${token}`);

  const handleStatusChange = async () => {
    // Toast de notificación de éxito / error
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

    // Swal.fire({
    //     title: "Advertencia",
    //     text: `${newStatusMessage} este elemento?`,
    //     icon: "question",
    //     showCancelButton: true,
    //     confirmButtonColor: "#3085d6",
    //     cancelButtonColor: "#d33",
    //     cancelButtonText: "Volver atrás",
    //     confirmButtonText: "Cambiar Estado"
    //   }).then(async (result) => {
    //     if (result.isConfirmed) {
            try {
                const response = await fetch(
                  `http://localhost:3000/${typeModule}/status`,
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
                  console.log(`${typeModuleMessage} actualizado con éxito:`, responseData);
            
                  // TODO - Lógica actualizar lista
                  handleNewPaymentStatus(id, newStatus)
            
                  // Aqui puedes mostrar un mensaje de exito con Swal que sale abajo a la derecha de la pantalla y dura 3 segundos            
                  // Toast.fire({
                  //   icon: 'success',
                  //   title: `${typeModuleMessage}: Estado actualizado`,
                  // });
                } else {
                  // si la peticion es incorrecta
                  const errorData = await response.json();
                  const errorMsg = ` ${typeModuleMessage}: Error al cambiar el estado`
                  console.error(errorMsg ,errorData );
                  // Aquí podrías mostrar un mensaje de error con Swal.fire si lo deseas
                  Toast.fire({
                    icon: 'error',
                    title: errorMsg,
                  });
                }
              } catch (error) {
                // si la peticion falla
                const errorMsg = `Error al cambiar el estado de este elemento en ${typeModuleMessage}:`
                console.error(errorMsg, error);
                // Aquí podrías mostrar un mensaje de error con Swal.fire si lo deseas
                Toast.fire({
                  icon: 'error',
                  title: error || errorMsg
                });
              }
            // }
      // });
}

  return (
    <button onClick={handleStatusChange}>{newStatusMessage}</button>
  )
}
