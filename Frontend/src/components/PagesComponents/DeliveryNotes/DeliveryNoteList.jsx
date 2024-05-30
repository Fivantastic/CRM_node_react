import { getNormalizedDate } from "../../../Services/getNormalizedDate.js";

export const DeliveryNoteList = ({ deliveryNote }) => {
  const traducirEstadoEntrega = (estado) => {
    switch (estado) { 
      case 'pending':
        return { text: 'Pendiente', color: 'blue' };
      case 'delivered':
        return { text: 'Entregado', color: 'green' };
      case 'cancelled':
        return { text: 'Cancelado', color: 'red' };
      case 'delivering':
        return { text: 'En reparto', color: 'orange' };
      case 'readyToShipment':
        return { text: 'Listo para envio', color: 'orange' };
      case 'incidence':
        return { text: 'Incidencia', color: 'red' };
      default:
        return { text: estado, color: 'black' };
    }
  };

  const fechaEntrega = getNormalizedDate(deliveryNote.delivery_date);

  const addressComplete = `${deliveryNote.delivery_address}, ${deliveryNote.address_number}, ${'nº ' + deliveryNote.address_floor}, ${deliveryNote.address_city}, ${deliveryNote.address_zip_code}, ${deliveryNote.address_country}`

  const statusEntrega = traducirEstadoEntrega(deliveryNote.delivery_status);

  return (
    <>
      <p id="element_visit_subtitle" className="mainInsideSub">Ref: {deliveryNote.ref_DN}</p>
      <p className="mainInsideSub"><strong>Empresa: </strong> {deliveryNote.company_name}</p>
      <p className="mainInsideSub"><strong>Teléfono: </strong> {deliveryNote.customer_phone}</p>
      <p className="mainInsideSub"><strong>Dirección: </strong> {addressComplete}</p>
      <p className="mainInsideSub"><strong>Ref. venta: </strong> {deliveryNote.ref_SL}</p>
      <p className="mainInsideSub"><strong>Producto: </strong> {deliveryNote.product_name}</p>
      <p className="mainInsideSub"><strong>Cantidad: </strong> {deliveryNote.product_quantity + ' u.'}</p>
      <p className="mainInsideSub"><strong>Fecha de entrega: </strong> {fechaEntrega.toLocaleDateString()}</p>
      <p className="mainInsideSub"><strong>Estado: </strong> <span style={{ color: statusEntrega.color, fontWeight: '600' }}>{statusEntrega.text}</span></p>
    </>
  );
};
