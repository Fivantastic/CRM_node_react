import { getNormalizedDate } from "../../../Services/getNormalizedDate.js";
import { MoreInfo } from "../../InfoModal/MoreInfo.jsx";

export const MoreVisits = ({ visit }) => {

  const traducirEstadoVisita = (estado) => {
    switch (estado) {
      case 'scheduled':
        return { text: 'Programada', color: 'blue' };
      case 'cancelled':
        return { text: 'Cancelada', color: 'red' };
      case 'completed':
        return { text: 'Completada', color: 'green' };
      default:
        return { text: estado, color: 'black' };
    }
  };

  const estadoVisita = traducirEstadoVisita(visit.visit_status);
  const fechaNormal = getNormalizedDate(visit.visit_date);
  const nameComplete = `${visit.selesAgent} ${visit.selesAgent_lastName}`

  const moreInfoFields = [
    { label: 'Ref', value: visit.ref_VT },
    { label: 'Nombre', value: `${visit.customer_name} ${visit.customer_last_name}` || visit.customer_name },
    { label: 'Telefono', value: visit.customer_phone },
    { label: 'Email', value: visit.customer_email },
    { label: 'Fecha de la visita', value: fechaNormal.toLocaleDateString() },
    { label: 'Estado', value: estadoVisita.text, color: estadoVisita.color },
    { label: 'Dirección', value: `${visit.address} ${visit.number}, ${visit.city}, ${visit.country}` },
    { label: 'Observaciones', value: visit.observations },
    { label: 'Comercial', value: nameComplete },
  ];

  const modalIds = {
    classState: 'font-bold'
  };

  return (
    <MoreInfo fields={moreInfoFields} modalIds={modalIds} />
  );
};
