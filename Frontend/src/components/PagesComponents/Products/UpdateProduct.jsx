import Joi from 'joi';
import Swal from 'sweetalert2';
import { useUser } from '../../../context/authContext.jsx';
import DynamicFormPopUp from '../../forms/DynamicFormPopUp.js';

export const UpdateProduct = ({ product, onUpdateProduct }) => {
  // Asi obtienes el token del usuario de la sesión
  const token = useUser();

const handleButtonUpdateProduct = async (formData) => {
    try {
        const response = await fetch(
        `http://localhost:3000/product/update/${product}`,
        {
          method: 'PUT',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${token}`,
          },
          body: JSON.stringify(formData), // aqui va el formData lo que le envio lo del body
        }
    );
    if (response.ok){
        // Si la petición es correcta
        const responseData = await response.json();
        console.log('Producto actualizado correctamente', responseData);

        onUpdateProduct(responseData);

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
            title: 'Producto actualizado con exito! ',
          });
    } else {
        // Si la peticion es incorrecta
        const errorData = await response.json();
        console.error('El producto no ha podido ser actualizado:', errorData);
    }
  } catch (error) {
    // Si la peticion falla
    console.error('Error durante la actualización del producto:', error);
  }
}; 
// Titulo de la ventana
const title = 'Modificar producto';

// Nombre que se muestra en el botón de submit.
const nameButton = 'Modificar';


//Campos del formulario productos

const updateProductFormFields = [
  {
    name: 'name',
    label: 'nombre del producto',
    type: 'text',
    placeholder: 'Introduce nombre del producto'
},
{
    name: 'description',
    label: 'descripción producto',
    type: 'text',
    placeholder: 'Introduce descripción del producto',
},
{
    name: 'price',
    label: 'price',
    type: 'text',
    placeholder: 'Introduce precio del producto',
},
{
    name: 'stock',
    label: 'stock',
    type: 'text',
    placeholder: 'introduce las cantidad'
},
{
    name: 'product_status',
    label: 'Estado',
    type: 'select',
    options: {
      Estado: {
        active: 'Activado',
        inactive: 'Inactivo',
      },
    },
  },
];

// Esquema de validación, sacado de la base de datos.
const UpdateProductSchema = Joi.object({
  name: Joi.string().optional().min(3).max(30),
  description: Joi.string().optional(),
  price: Joi.string().optional(),
  stock: Joi.number().optional().min(1).max(100),
  product_status: Joi.string().optional().valid('active', 'inactive')
});

// Crea el modal POP e inserta los campos y el esquema de validación, y luego retorna la informacion que tiene que introducir en el body
const handleUpdateProduct = () => {
    DynamicFormPopUp(
        title,
        updateProductFormFields,
        UpdateProductSchema,
        handleButtonUpdateProduct,
        nameButton 
    );
};

return (
    <>
        <button className="btnProductUpdate mainUpdateBtn" onClick={handleUpdateProduct}>Actualizar Producto</button>
    </>
);

} 