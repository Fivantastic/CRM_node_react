import { getNormalizedDate } from "../../../Services/getNormalizedDate.js";


export const ShipmentList = ({ shipment }) => {

  const traducirEstadoEntrega = (estado) => {
    switch (estado) {
      case 'pending':
        return { text: 'Pendiente', color: 'blue' };
      case 'delivered':
        return { text: 'Entregado', color: 'green' };
      case 'cancelled':
        return { text: 'Cancelado', color: 'red' };
      case 'inTransit':
        return { text: 'En tránsito', color: 'orange' };
      case 'delayed':
        return { text: 'Atrasado', color: 'purple' };
      case 'refused':
        return { text: 'Rechazado', color: 'red' };
      default:
        return { text: estado, color: 'black' };
    }
  };

  const dueDate = getNormalizedDate(shipment.delivery_date);

  const statusEntrega = traducirEstadoEntrega(shipment.shipment_status);

  const addressComplet = `${shipment.delivery_address}, ${'nº ' +shipment.address_number}, ${shipment.address_city}, ${shipment.address_zip_code}, ${shipment.address_country}`

  return (
    <>
      <p id="element_visit_subtitle" className="mainInsideSub">Ref: {shipment.ref_SH}</p>
      <p className="mainInsideSub"><strong>Empresa: </strong> {shipment.company_name}</p>
      <p className="mainInsideSub"><strong>Teléfono: </strong> {shipment.customer_phone}</p>
      <p className="mainInsideSub"><strong>Dirección: </strong>{addressComplet}</p>
      <p className="mainInsideSub"><strong>Ref. Albarán: </strong> {shipment.ref_DN}</p>
      <p className="mainInsideSub"><strong>Fecha estimada: </strong> {dueDate.toLocaleDateString()}</p>
      <p className="mainInsideSub"><strong>Estado: </strong><span style={{ color: statusEntrega.color, fontWeight: '600' }}>
        {statusEntrega.text}</span></p>
      <p className="mainInsideSub"><strong>Repartidor: </strong> {shipment.deliverer}</p>
    </>
  );
};