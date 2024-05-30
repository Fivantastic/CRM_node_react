import { MoreInfo } from '../../InfoModal/MoreInfo.jsx';
import { getNormalizedDate } from '../../../Services/getNormalizedDate.js';

export const MoreShipments = ({ shipment }) => {

  const dueDate = getNormalizedDate(shipment.shipment_create_at);
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

  const estadoEntrega = traducirEstadoEntrega(shipment.shipment_status);

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

  const modalIds = {
    classState: 'font-bold'
  };

  return <MoreInfo fields={moreInfoFields} modalIds={modalIds} />;
};