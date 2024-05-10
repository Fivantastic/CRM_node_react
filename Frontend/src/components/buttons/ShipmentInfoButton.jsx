import Swal from 'sweetalert2';

// Define la función para mostrar la información del envío
const showShipmentInfo = (shipmentData) => {
    // Construye el contenido del modal con la información del envío
    const shipmentInfoHtml = `
      <section>
        <div class="shipment-icon-container">
        </div>
        <div class="container-details">
          <p><strong>Cliente:</strong> ${shipmentData.customer_name}</p>
          <p><strong>Compañía:</strong> ${shipmentData.company_name}</p>
          <p><strong>Teléfono:</strong> ${shipmentData.customer_phone}</p>
          <p><strong>NIF:</strong>      ${shipmentData.NIF}</p>
         <p><strong>Producto:</strong> ${shipmentData.product_name}</p>
          <p><strong>Cantidad:</strong> ${shipmentData.product_quantity}</p>
          <p><strong>Estado:</strong> ${shipmentData.delivery_status}</p>
          <p><strong>Repartidor:</strong> ${shipmentData.deliverer}</p>

        </div>
      </section>
    `;

    // Muestra el modal con la información del envío
    Swal.fire({
      title: 'Detalle del Envío',
      html: shipmentInfoHtml,
      allowOutsideClick: false,
      showCancelButton: false,
      confirmButtonText: 'Cerrar'
    });
};

// Define el componente para abrir el modal del envío
export const ShipmentInfoButton = ({ shipmentData }) => {
    // Define la función que maneja el clic en el botón
    const handleClick = () => {
      // Muestra la información del envío al hacer clic en el botón
      showShipmentInfo(shipmentData);
    };

    return (
        <button onClick={handleClick}>Ver Envios</button>
    );
};
