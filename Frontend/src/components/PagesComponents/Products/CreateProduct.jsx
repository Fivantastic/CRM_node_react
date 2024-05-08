// import Joi from 'joi';
// import DynamicFormPopUp from '../../forms/DynamicFormPopUp.js';
// import Swal from 'sweetalert2';

// export const CreateProduct = ({ onAddProduct, token }) => {  
//     // Aqui hace la peticion al servidor
//     const handleProductCreate = async (formData) => {

//         try {
           
//             const response = await fetch('http://localhost:3000/products/new', {
//                 method: 'POST',
//                 credentials: 'include',
//                 headers: {
//                   'Content-Type': 'application/json',
//                   Authorization: `${token}`, 
//                 },
//                 body: JSON.stringify(formData),
//             });


//             if (response.ok) {
//                 //si la peticion es correcta
//                 const responseData = await response.json();
//                 console.log('Producto creado satisfactoriamente:', responseData);
            
//                 onAddProduct(responseData.data);

            
//                 // Aqui puedes mostrar un mensaje de exito con Swal que sale abajo a la derecha de la pantalla y dura 3 segundos
//                 const Toast = Swal.mixin({ 
//                     toast: true,
//                     position: 'bottom-end',
//                     showConfirmButton: false,
//                     timer: 3000,
//                     timerProgressBar: true,
//                     didOpen: (toast) => {
//                     toast.onmouseenter = Swal.stopTimer;
//                     toast.onmouseleave = Swal.resumeTimer;
//                     },
//                   });
                  
//                     Toast.fire({
//                         icon: 'success',
//                         title: 'Producto agregado con éxito',
//                     });
//             } else {
//                 // Si la peticion es incorrecta
//                 const errorData = await response.json();
//                 console.error('Agregado de producto fallido', errorData);
//             }
//         } catch (error) {
//             // Si la petición falla
//             console.error('Error al agregar el producto')
//         }
//     };
//     //Titulo de la venta
//     const title = 'Agregar producto';

//     // Nombre que se muestra en el botón submit.
//     const nameButton = 'Agregar producto';

//     // Campos del formulario personalizables

//     const ProductFormFields = [

//         {
//             id_product: 'id_product',
//             name: 'name',
//             description: 'description',
//             price: 'price',
//             stock: 'stock',
//             product_status: 'product_status',
//             creation_at: 'creation_at',
//             update_at: 'update_at',
//         }
//     ];

//     const newProductSchema = Joi.object({
//         id_product: Joi.string().guid().required(),
//     });


//     const handleClickCreateProduct = () => {
//         DynamicFormPopUp(
//           title,
//           ProductFormFields,
//           newProductSchema,
//           handleProductCreate,
//           nameButton
//         );
//     };

//     return (
//         <div>
//           <button onClick={handleClickCreateProduct}>Agregar producto</button>
//         </div>
//     );

// };
    