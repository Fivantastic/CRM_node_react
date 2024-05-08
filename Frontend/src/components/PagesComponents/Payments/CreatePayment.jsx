import Joi from "joi";
import DynamicFormPopUp from "../../forms/DynamicFormPopUp";
import Swal from "sweetalert2";

export const CreatePayment = ({onAddPayment, token}) => {
  // Modelo swal
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
    
    // Petición al servidor
    const handlePaymentCreatedAction = async (formData) => {

        console.log('Function works!');

        try{
            const response = await fetch('http://localhost:3000/payments/create', {
                method: 'POST',
                credentials: 'include',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `${token}`, 
                },
                body: JSON.stringify(formData),
              });

            if (response.ok) {
                const responseData = await response.json();
                console.log('Pago añadido satisfactoriamente: ', responseData);

                // Añadir de manera visual la venta
                onAddPayment(responseData.data)

                // Mensaje de éxito con Swal
                Toast.fire({
                icon: 'success',
                title: 'Pago creado con exito!',
                });
            } else {
                // Fallo en la respuesta del servidor
                const errorData = await response.json();
                console.error('Creación del pago fallida:', errorData)
                Swal.fire({
                  title: "Creación del pago fallida",
                  text: errorData.message,
                  icon: "error",
                  allowOutsideClick: false,
                  confirmButtonColor: "#3085d6",
                  confirmButtonText: "Volver"
                })
            }
        } catch (error) {
            // Fallo en la petición
            console.error('Error durante la creación del pago:', error);
            Toast.fire({
              icon: 'error',
              title: 'Fallo en la petición',
              });
        }
                
    }


    // Titulo de la ventana, CAMBIARLO SI ES NECESARIO
  const title = 'Crear Pago';

  // Nombre que se muestra en el botón de submit, CAMBIARLO SI ES NECESARIO
  const nameButton = 'Crear';

  // Campos del formulario personalizables
  const saleFormFields = [
    {
      name: 'invoice_id',
      label: 'Factura',
      type: 'text',
      placeholder: 'Introduce el identificador...',
      required: true,
    }
  ];

  const paymentSchema = Joi.object({
    invoice_id: Joi.string().required().guid()
  });

  const handleClickCreatePayment = () => {
    DynamicFormPopUp(
      title,
      saleFormFields,
      paymentSchema,
      handlePaymentCreatedAction,
      nameButton
    );
  };

    return (
        <div>
            <button onClick={handleClickCreatePayment}>Crear Pago</button>
        </div>
    )}