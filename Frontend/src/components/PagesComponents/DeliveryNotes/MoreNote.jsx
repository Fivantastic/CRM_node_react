import { MoreInfo } from "../../InfoModal/MoreInfo.jsx";
import { getNormalizedDate } from "../../../Services/getNormalizedDate.js";

export const MoreNote = ({ note }) => {
  if (!note) return null;

  const dueDate = getNormalizedDate(note.delivery_date);
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

  const estadoEntrega = traducirEstadoEntrega(note.delivery_status);

  const moreInfoFields = [
    { label: 'Referencia albarán', value: note.ref_DN },
    { label: 'Referencia venta', value: note.ref_SL },
    { label: 'Empresa', value: note.company_name },
    { label: 'Cliente', value: note.customer_name },
    { label: 'Email', value: note.customer_email },
    { label: 'Teléfono', value: note.customer_phone },
    { label: 'Producto', value: note.product_name },
    { label: 'Cantidad', value: `${note.product_quantity} u.` },
    { label: 'Descripción', value: note.product_description },
    { label: 'Fecha de entrega', value: dueDate.toLocaleDateString() },
    { label: 'Estado', value: estadoEntrega.text, color: estadoEntrega.color },
  ];

  const modalIds = {
    classState: 'font-bold',
  }

  return <MoreInfo fields={moreInfoFields} modalIds={modalIds} />;
};
