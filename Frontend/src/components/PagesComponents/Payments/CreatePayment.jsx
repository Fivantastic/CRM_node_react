import Swal from "sweetalert2";
import { createPaymentSchema } from "../../../Schema/Error/createSchema.js";
import { DynamicModalWrapper } from "../../FromModal/DynamicModalWrapper.jsx";

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


    // Titulo de la ventana
  const title = 'Crear Pago';

  // Nombre que se muestra en el botón de submit
  const nameButton = 'Crear';

  // Campos del formulario personalizables
  const saleFormFields = [
    {
      name: 'invoice_id',
      label: 'Factura',
      type: 'text',
      idLabel: 'labelIdPaymentCreate',
      idInput: 'inputIdPaymentCreate',
      required: true,
    }
  ];

  const StyleButton = {
    idBtn:'btnPaymentCreate',
    idImgBtn:'imgCreatePaymentBtn',
    srcImgBtn:'/addPay.svg',
    altImgBtn:'Boton crear pago',
    action:'create'
  }

  const StyleAcceptBtn = {
    idAcceptBtn:'btnAcceptPayCreate',
    altImgBtn:'icono crear pago',
    btnSvg:'/addPayWhite.svg',
    altAcceptBtn:'Boton crear',
    action:'create'
  }

  return (
      <DynamicModalWrapper
        title={title}
        fields={saleFormFields}
        schema={createPaymentSchema}
        onSubmit={handlePaymentCreatedAction}
        buttonText={nameButton}
        dynamicIdModal="dynamicFormModal"
        StyleButton={StyleButton}
        StyleAcceptBtn={StyleAcceptBtn}
      />
  );
};