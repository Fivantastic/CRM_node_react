import { MoreInfo } from '../../InfoModal/MoreInfo.jsx';
import { getNormalizedDate } from '../../../Services/getNormalizedDate.js';

export const MoreShipments = ({ shipment }) => {
  if (!shipment) return null;

  const dueDate = getNormalizedDate(shipment.shipment_create_at);
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

  const estadoEntrega = traducirEstadoEntrega(shipment.delivery_status);

  const moreInfoFields = [
    { label: 'Referencia envío', value: shipment.ref_SH },
    { label: 'Referencia albarán', value: shipment.ref_DN },
    { label: 'Empresa', value: shipment.company_name },
    { label: 'Cliente', value: shipment.customer_name },
    { label: 'Email', value: shipment.customer_email },
    { label: 'Teléfono', value: shipment.customer_phone },

    { label: 'Descripción', value: shipment.product_description },
    { label: 'Fecha de envío', value: dueDate.toLocaleDateString() },
    { label: 'Estado', value: estadoEntrega.text, color: estadoEntrega.color },
  ];

  return <MoreInfo fields={moreInfoFields} modalIds={[]} />;
};