import Swal from "sweetalert2";
import { SimpleDeleteButton } from "../buttons/DeleteButtons/SimpleDeleteButton.jsx";
import { Toast } from "../alerts/Toast.jsx";
const URL = import.meta.env.VITE_URL;

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
                      `${URL}/${typeModule}/delete/${id}`,
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
                        title: `${typeModuleMessage} eliminado con exito`,
                      });

                      onDelete(id);
                    } else {
                      // si la peticion es incorrecta
                      const errorData = await response.json();
                      console.log(errorData);
                      console.error(`Error en la petición de ${typeModuleMessage}:`, errorData);
                      

                      // Si el usuario no esta activo muestra un mensaje de error modal
                      if (errorData.code === 'MODULE_ASSIGNED_CRM_ERROR') {
                        Swal.fire({
                          icon: 'warning',
                          title: '¡Usuario con modulos asignados!',
                          text: 'No puedes borrar este usuario porque tiene modulos asignados',
                        });
                      } else if(errorData.message === "La factura no esta cancelado"){
                        Toast.fire({
                          icon:'warning',
                          text:'Solo se pueden eliminar elementos cancelados'
                        })
                      } else if (errorData.code === 'NOTE_SHIPMENT_NOT_CANCELLED_CRM_ERROR') {
                        Toast.fire({
                          icon:'warning',
                          text:'La venta tiene albaranes y envios sin cancelar'
                        })
                      } else if(errorData.code === 'DELETE_SALE_NOT_CANCELLED_SALE_CRM_ERROR'){
                        Toast.fire({
                          icon:'warning',
                          text:'Tienes que cancelar la venta antes de eliminarla'
                        })
                      } else if (errorData.code === 'DELETE_SALES_HAS_INVOICE_CRM_ERROR') {
                        Toast.fire({
                          icon:'warning',
                          text:'No puedes eliminar esta venta que tiene una facturacion'
                        })
                      } else if (errorData.code === 'DELETE_SALES_HAS_NOTE_AND_SHIPMENT_CRM_ERROR') {
                        Toast.fire({
                          icon:'warning',
                          text:'No puedes eliminar esta venta ya que tiene albaranes y envios'
                        })
                      } else if (errorData.code === 'DELETE_SALES_HAS_SHIPMENTS_CRM_ERROR') {
                        Toast.fire({
                          icon:'warning',
                          text:'No puedes eliminar esta venta que tiene envios'
                        })
                      } else if (errorData.code === 'DELETE_SALES_HAS_NOTE_CRM_ERROR') {
                        Toast.fire({
                          icon:'warning',
                          text:'No puedes eliminar esta venta que tiene albaranes'
                        })
                      } else if (errorData.code === 'DELETE_NOTE_HAS_SHIPMENT_CRM_ERROR') {
                        Toast.fire({
                          icon:'warning',
                          text:'No puedes eliminar el albaran, tiene envios asociados'
                        })
                      } else if (errorData.code === 'DELETE_SHIPMENT_NOT_CANCELLED_CRM_ERROR') {
                        Toast.fire({
                          icon:'warning',
                          text:'El envio no esta cancelado'
                        })
                      } else if (errorData.code === 'DELETE_SHIPMENT_NOT_CANCELLED_NOTE_CRM_ERROR') {
                        Toast.fire({
                          icon:'warning',
                          text:'El albaran no esta cancelado'
                        })
                      } else {
                          Toast.fire({
                            icon:'error',
                            title:`Error al eliminar ${typeModuleMessage}`,
                          })
                        
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
      <>
        <SimpleDeleteButton className="mainDeleteBtn" onClick={handleDelete}/>
      </>
    )
}