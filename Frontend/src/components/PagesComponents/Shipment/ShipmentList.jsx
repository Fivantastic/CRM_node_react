import { getNormalizedDate } from "../../../Services/getNormalizedDate.js";
import { MoreShipments } from "./MoreShipments.jsx";
import { UpdateShipment } from "./UpdateShipment.jsx";
import { DeleteGenericModal } from "../../forms/DeleteGenericModal.jsx";

export const ShipmentList = ({ shipment, onUpdateShipment, onDelete, token }) => {
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
        return { text: 'Retrasado', color: 'purple' };
      default:
        return { text: estado, color: 'black' };
    }
  };

  const dueDate = getNormalizedDate(shipment.delivery_date);
  const statusEntrega = traducirEstadoEntrega(shipment.delivery_status);
  const addressComplet = `${shipment.delivery_address}, ${'nº ' + shipment.address_number}, ${shipment.address_city}, ${shipment.address_zip_code}, ${shipment.address_country}`;

  return (
    <>
      <p id="element_visit_subtitle" className="mainInsideSub">Ref: {shipment.ref_SH}</p>
      <p className="mainInsideSub"><strong>Empresa: </strong> {shipment.company_name}</p>
      <p className="mainInsideSub"><strong>Teléfono: </strong> {shipment.customer_phone}</p>
      <p className="mainInsideSub"><strong>Dirección: </strong>{addressComplet}</p>
      <p className="mainInsideSub"><strong>Ref. Albarán: </strong> {shipment.ref_DN}</p>
      <p className="mainInsideSub"><strong>Fecha estimada: </strong> {dueDate.toLocaleDateString()}</p>
      <p className="mainInsideSub"><strong>Estado: </strong><span style={{ color: statusEntrega.color }}>{statusEntrega.text}</span></p>
      <p className="mainInsideSub"><strong>Repartidor: </strong> {shipment.deliverer}</p>
      <div className="shipmentTableBodyRowActions">
        <MoreShipments shipment={shipment} />
        <UpdateShipment
          shipment={shipment.id_shipment}
          onUpdateShipment={onUpdateShipment}
          token={token}
        />
        <DeleteGenericModal
          id={shipment.id_shipment}
          onDelete={onDelete}
          token={token}
          typeModule="shipment"
          typeModuleMessage="Envío"
        />
      </div>
    </>
  );
};
