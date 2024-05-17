export const ShipmentList = ({ shipment }) => {

  const traducirEstadoEntrega = (estado) => {
    switch (estado) {
      case 'pending':
        return 'Pendiente';
      case 'delivered':
        return 'Entregado';
      case 'cancelled':
        return 'Cancelado';
      case 'inTransit':
        return 'En reparto';
      case 'returned':
        return 'Devuelto';
      case 'delayed':
        return 'Retrasado';
      default:
        return estado;
    }
  }

  return (
    <>
      <h2 id='element_shipment_title' className="mainInsideTitle">Detalles del envío</h2>
      <h3 id='element_shipment_section' className="mainSubSection">Destinatario</h3>
      <p><strong>Nombre: </strong> {shipment.customer_name}</p>
      <p><strong>Compañía:</strong> {shipment.company_name}</p>
      <p><strong>Dirección: </strong> {shipment.delivery_address}</p>
      <p><strong>NIF:</strong> {shipment.NIF}</p>
      <p><strong>Producto:</strong> {shipment.product_name}</p>
      <p><strong>Cantidad:</strong> {shipment.product_quantity} u.</p>
      <p><strong>Ciudad: </strong> {shipment.address_city}</p>
      <p><strong>Teléfono:</strong> {shipment.customer_phone}</p>
      <p><strong>Fecha:</strong> {shipment.shipment_create_at}</p>
      <h3 id='element_shipment_section' className="mainSubSection">Estado del envío</h3>
      <p>{traducirEstadoEntrega(shipment.delivery_status)}</p>

      <h3 id='element_shipment_section' className="mainSubSection">Repartidor</h3>
      <p>{shipment.deliverer}</p>
    </>
  );
};
