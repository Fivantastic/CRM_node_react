import { useEffect } from "react";
import Swal from "sweetalert2";

export const ChangeStatus = ({id, newStatus, typeModule, typeModuleMessage, token}) => {

  // TODO - Dev
  console.log(`
  id: ${id},
  newStatus: ${newStatus},
  type: ${typeModule},
  typeMessage: ${typeModuleMessage},
  token: ${token}`);
  
  const handleStatusChange = async () => {
    Swal.fire({
        title: "Advertencia",
        text: `Se cambiará el estado de este elemento a "${newStatus}"`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "Cancelar",
        confirmButtonText: "Cambiar Estado"
      }).then(async (result) => {
        if (result.isConfirmed) {
            try {
                const response = await fetch(
                  `http://localhost:3000/${typeModule}/delete/${id}`,
                  {
                    method: 'DELETE',
                    credentials: 'include',
                    headers: {
                      'Content-Type': 'application/json',
                      Authorization: `${token}`,
                    },
                  }
                );
          
                if (response.ok) {
                  //si la peticion es correcta
                  const responseData = await response.json();
                  console.log(`${typeModuleMessage} actualizado con éxito:`, responseData);
            
                  // TODO - Lógica actualizar lista
            
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
                    title: `${typeModuleMessage}: Estado actualizado`,
                  });
                } else {
                  // si la peticion es incorrecta
                  const errorData = await response.json();
                  console.error(` ${typeModuleMessage}: Error al cambiar el estado`
                  ,errorData );
                  // Aquí podrías mostrar un mensaje de error con Swal.fire si lo deseas
                }
              } catch (error) {
                // si la peticion falla
                console.error(`Error al cambiar el estado de este elemendo en ${typeModuleMessage}:`, error);
                // Aquí podrías mostrar un mensaje de error con Swal.fire si lo deseas
            
              }
            }
      });
}

  return (
    <button onClick={handleStatusChange()}>{newStatus}</button>
  )
}
