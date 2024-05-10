import Swal from "sweetalert2";
import { SimpleDeleteButton } from "../buttons/DeleteButtons/SimpleDeleteButton.jsx";

export const DeleteGenericModal = ({ id, onDelete, token, typeModule, typeModuleMessage }) => {
    const handleDelete = async () => {
        Swal.fire({
            title: "¿Estas seguro?",
            text: "¡No podrás revertir esto!",
            icon: "warning",
            showCancelButton: true,
            allowOutsideClick: false,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: "Cancelar",
            confirmButtonText: "¡Si, borrar!"
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
                      console.log(`${typeModuleMessage} borrada con éxito:`, responseData);
            
              
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
                        title: `${typeModuleMessage} eliminado con exito`,
                      });

                      onDelete(id);
                    } else {
                      // si la peticion es incorrecta
                      const errorData = await response.json();
                      console.error(`Error en la petición de ${typeModuleMessage}:`, errorData);

                      // Si el usuario no esta activo muestra un mensaje de error modal
                      if (errorData.code === 'MODULE_ASSIGNED_CRM_ERROR') {
                        Swal.fire({
                          icon: 'warning',
                          title: '¡Usuario con modulos asignados!',
                          text: 'No puedes borrar este usuario porque tiene modulos asignados',
                        });
                      }
                      
                    }
                  } catch (error) {
                    // si la peticion falla
                    console.error(`Error al borra la ${typeModuleMessage}:`, error);
                    // Aquí podrías mostrar un mensaje de error con Swal.fire si lo deseas

                  }
            }
          });
    }
    return (
        <nav className="mainDeleteBtn">
            <SimpleDeleteButton onClick={handleDelete}/>
        </nav>
    )
}