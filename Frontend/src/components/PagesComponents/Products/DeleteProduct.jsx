import Joi from 'joi';
import Swal from 'sweetalert2';
import DynamicFormPopUp from '../../forms/DynamicFormPopUp.js';
const URL = import.meta.env.VITE_URL;

export const DeleteProduct = ({ onDeleteProduct, token }) => {  
    // Función para manejar el borrado de productos
    const handleProductDelete = async (formData) => {
        try {
            const response = await fetch(`${URL}/products/delete`, {
                method: 'DELETE',
                credentials: 'include',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `${token}`, 
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                // Si la petición es correcta
                const responseData = await response.json();
                console.log('Producto eliminado satisfactoriamente:', responseData);
                
                onDeleteProduct(responseData.data);
            
                // Mostrar mensaje de éxito
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
                    title: 'Producto eliminado con éxito',
                });
            } else {
                // Si la petición es incorrecta
                const errorData = await response.json();
                console.error('Eliminación de producto fallida', errorData);
            }
        } catch (error) {
            // Si la petición falla
            console.error('Error al eliminar el producto:', error);
        }
    };
    
    // Título del formulario
    const title = 'Eliminar producto';
    
    // Nombre del botón de submit
    const nameButton = 'Eliminar producto';
    
    // Campos del formulario
    const ProductFormFields = [
        {
            id_product: 'id_product',
        }
    ];

    // Esquema de validación
    const deleteProductSchema = Joi.object({
        id_product: Joi.string().guid().required(),
    });

    // Manejar el click para abrir el formulario de borrado
    const handleClickDeleteProduct = () => {
        DynamicFormPopUp(
            title,
            ProductFormFields,
            deleteProductSchema,
            handleProductDelete,
            nameButton
        );
    };

    return (
        <div>
            <button onClick={handleClickDeleteProduct}>Eliminar producto</button>
        </div>
    );
};
