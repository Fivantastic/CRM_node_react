import { UpdateShipment } from './UpdateShipment.jsx';
import { DeleteGenericModal } from '../../forms/DeleteGenericModal.jsx';
import { getNormalizedDate } from '../../../Services/getNormalizedDate.js';
import { MoreShipments } from './MoreShipments.jsx';
import './ShipListTable.css';
import { Prohibited } from '../../buttons/BtnForms/Prohibited.jsx';

export const ShipmentListTable = ({ shipment, updateShipment, deleteShipment, token }) => {

  const traducirEstadoEntrega = (estado) => {
    switch (estado) {
      case 'pending':
        return { text: 'Pendiente', color: 'blue' };
      case 'inTransit':
        return { text: 'En trásnsito', color: 'orange' };
      case 'delivered':
        return { text: 'Entregado', color: 'green' };
      case 'delayed':
        return { text: 'Atrasado', color: 'purple' };
      case 'cancelled':
        return { text: 'Cancelado', color: 'red' };
      case 'refused':
        return { text: 'Rechazado', color: 'red' };
      default:
        return { text: estado, color: 'black' };
    }
  };

  return (
    <section id="shipment_table">
      <div id="shipmentTableHead" className="shipmentTableHead">
        <div id="shipmentTableHeadRowRef" className="headRow">Ref. Envío</div>
        <div id="shipmentTableHeadRowRefSales" className="headRow">Ref. Albarán</div>
        <div id="shipmentTableHeadRowDate" className="headRow">Fecha de envío</div>
        <div id="shipmentTableHeadRowStatus" className="headRow">Estado</div>
        <div id="shipmentTableHeadRowActions" className="headRow">Acciones</div>
      </div>
      <div id="shipmentTableBody">
        {shipment.length > 0 ? (
          shipment.map((shipmentItem) => {
            const estadoEntrega = traducirEstadoEntrega(shipmentItem.shipment_status);
            return (
              <div key={shipmentItem.id_shipment} id="shipmentTableBodyRow" className="shipmentTableBodyRow">
                <div className="shipmentTableBodyRowRef">{shipmentItem.ref_SH}</div>
                <div className="shipmentTableBodyRowRefSales">{shipmentItem.ref_DN}</div>
                <div className="shipmentTableBodyRowDate">
                  {getNormalizedDate(shipmentItem.delivery_date).toLocaleDateString()}
                </div>
                <div className="shipmentTableBodyRowStatus" style={{ color: estadoEntrega.color }}>
                  {estadoEntrega.text}
                </div>
                <div className="shipmentTableBodyRowActions">
                  <MoreShipments shipment={shipmentItem} />
                  {['delayed', 'cancelled', 'refused'].includes(shipmentItem.shipment_status) ? 
                    <Prohibited /> : 
                    <UpdateShipment
                      shipment={shipmentItem.id_shipment}
                      onUpdateShipment={updateShipment}
                      token={token}
                    />
                  }
                  <DeleteGenericModal
                    id={shipmentItem.id_shipment}
                    onDelete={deleteShipment}
                    token={token}
                    typeModule="shipment"
                    typeModuleMessage="Envío"
                  />
                </div>
              </div>
            );
          })
        ) : (
          <div className='noResult'>No hay envíos disponibles</div>
        )}
      </div>
    </section>
  );
};