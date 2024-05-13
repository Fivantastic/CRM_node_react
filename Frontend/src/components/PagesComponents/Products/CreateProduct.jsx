import Joi from 'joi';
import Swal from 'sweetalert2';
import DynamicFormPopUp from '../../forms/DynamicFormPopUp.js';

export const CreateProduct = ({ onAddProduct, token }) => {  
    // Aqui hace la peticion al servidor
    const handleProductCreate = async (formData) => {

        try {
           
            const response = await fetch('http://localhost:3000/product/register', {
                method: 'POST',
                credentials: 'include',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `${token}`, 
                },
                body: JSON.stringify(formData),
            });


            if (response.ok) {
                //si la peticion es correcta
                const responseData = await response.json();
                console.log('Producto creado satisfactoriamente:', responseData);
            
                onAddProduct(responseData.data);

            
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
                        title: 'Producto agregado con éxito',
                    });
            } else {
                // Si la peticion es incorrecta
                const errorData = await response.json();
                console.error('Agregado de producto fallido', errorData);
            }
        } catch (error) {
            // Si la petición falla
            console.error('Error al agregar el producto')
        }
    };
    //Titulo de la venta
    const title = 'Agregar producto';

    // Nombre que se muestra en el botón submit.
    const nameButton = 'Agregar';

    // Campos del formulario personalizables

    const ProductFormFields = [

        {
            name: 'name',
            label: 'nombre del producto',
            type: 'text',
            placeholder: 'Introduce nombre del producto',
            idLabel: 'labelNameProductCreate',
            idInput: 'inputNameProductCreate',
        },
        {
            name: 'description',
            label: 'descripción producto',
            type: 'text',
            placeholder: 'Introduce descripción del producto',
            idLabel: 'labelDescriptionProductCreate',
            idInput: 'inputDescriptionProductCreate',
        },
        {
            name: 'price',
            label: 'price',
            type: 'text',
            placeholder: 'Introduce precio del producto',
            idLabel: 'labelPriceProductCreate',
            idInput: 'inputPriceProductCreate',
        },
        {
            name: 'stock',
            label: 'stock',
            type: 'text',
            placeholder: 'introduce las cantidad'
            ,idLabel: 'labelStockProductCreate',
            idInput: 'inputStockProductCreate',
        },
        {
            name: 'product_status',
            label: 'Estado',
            type: 'select',
            idLabel: 'labelStatusProductCreate',
            idInput: 'inputStatusProductCreate',
            options: {
              Estado: {
                active: 'Activado',
                inactive: 'Inactivo',
              },
            },
          },
    ];

    const newProductSchema = Joi.object({
        name: Joi.string().required().min(3).max(30),
        description: Joi.string().required(),
        price: Joi.string().required(),
        stock: Joi.number().required().min(1).max(100),
        product_status: Joi.string().required().valid('active', 'inactive')
    });


    const handleClickCreateProduct = () => {
        DynamicFormPopUp(
          title,
          ProductFormFields,
          newProductSchema,
          handleProductCreate,
          nameButton
        );
    };

    return (
        <div>
          <button className="btnProductCreate mainCreateBtn" onClick={handleClickCreateProduct}>Agregar producto</button>
        </div>
    );

};
    
