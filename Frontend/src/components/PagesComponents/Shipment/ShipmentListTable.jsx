import { useUser } from '../../../context/authContext.jsx';
import { UpdateShipment } from './UpdateShipment.jsx';
import { DeleteGenericModal } from '../../forms/DeleteGenericModal.jsx';
import { getNormalizedDate } from '../../../Services/getNormalizedDate.js';
import { MoreShipments } from './MoreShipments.jsx';
import './ShipListTable.css';

export const ShipmentListTable = ({ shipment, onUpdateShipment, onDelete }) => {
  const token = useUser();

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

  return (
    <section id="shipment_table">
      <div id="shipmentTableHead">
        <div id="shipmentTableHeadRowRef">Ref. Envío</div>
        <div id="shipmentTableHeadRowRefSales">Ref. Albarán</div>
        {/* <div id="shipmentTableHeadRowCompany">Empresa</div> */}
        <div id="shipmentTableHeadRowDate">Fecha de envío</div>
        <div id="shipmentTableHeadRowStatus">Estado</div>
        <div id="shipmentTableHeadRowActions">Acciones</div>
      </div>
      <div id="shipmentTableBody">
        {shipment.length > 0 &&
          shipment.map((shipmentItem) => {
           const fechaEnvio = getNormalizedDate(shipmentItem.delivery_date);
            const statusEntrega = traducirEstadoEntrega(shipmentItem.delivery_status);
            return (
              <div key={shipmentItem.id_shipment} className="shipmentTableBodyRow">
                <div className="shipmentTableBodyRowRef">{shipmentItem.ref_SH}</div>
                <div className="shipmentTableBodyRowRefSales">{shipmentItem.ref_DN}</div>
                {/* <div className="shipmentTableBodyRowCompany">{shipmentItem.company_name}</div> */}
                <div className="shipmentTableBodyRowDate">{ fechaEnvio.toLocaleDateString()}</div>
                <div className="shipmentTableBodyRowStatus" style={{ color: statusEntrega.color }}>
                  {statusEntrega.text}
                </div>
                <span className="shipmentTableBodyRowActions">
                  <MoreShipments shipment={shipmentItem} key={`more-${shipmentItem.id_shipment}`} />
                  <UpdateShipment
                    shipment={shipmentItem.id_shipment}
                    onUpdateShipment={onUpdateShipment}
                    token={token}
                    key={`update-${shipmentItem.id_shipment}`}
                  />
                  <DeleteGenericModal
                    id={shipmentItem.id_shipment}
                    onDelete={onDelete}
                    token={token}
                    typeModule="shipment"
                    typeModuleMessage="Envío"
                    key={`delete-${shipmentItem.id_shipment}`}
                  />
                </span>
              </div>
            );
          })}
      </div>
    </section>
  );
};
