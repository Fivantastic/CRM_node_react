import { useUser } from '../../../context/authContext.jsx';
import { DeleteGenericModal } from '../../../components/forms/DeleteGenericModal.jsx';
import { UpdateShipment } from './UpdateShipment.jsx';

export const ShipmentsListTable = ({ shipments, onUpdateShipment, onDelete }) => {
  const token = useUser();

  const traducirEstadoEnvio = (estado) => {
    switch (estado) {
      case 'pending':
        return 'Pendiente';
      case 'inTransit':
        return 'En Tránsito';
      case 'delivered':
        return 'Entregado';
      case 'delayed':
        return 'Retrasado';
      case 'cancelled':
        return 'Cancelado';
      default:
        return estado;
    }
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Ref</th>
          <th>Cliente</th>
          <th>Estado</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {shipments.map((shipment) => (
          <tr key={shipment.id_shipment}>
            <td>{shipment.ref_SL}</td>
            <td>{shipment.customer_name}</td>
            <td>{traducirEstadoEnvio(shipment.status)}</td>
            <td>
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
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
