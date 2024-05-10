import { getNormalizedDate} from "../../../Services/getNormalizedDate.js";

export const VisitsList = ({ visit }) => {
  const fechaNormal = getNormalizedDate(visit.visit_date);

  const traducirEstadoVisita = (estado) => {
    
    switch (estado) {
      case 'scheduled':
        return 'Programada';
      case 'cancelled':
        return 'Cancelada';
      case 'completed':
        return 'Clompletada';
      default:
        return estado;
    }
  }
  return (
    <>
      <h2 id="element_visit_section" className=" mainSubSection">Cliente</h2>
      <p><strong>Nombre: </strong> {visit.customer_name}</p>
      <p><strong>Fecha de la visita: </strong> {fechaNormal.toLocaleDateString()}</p>
      <p><strong>Observacones: </strong> {visit.observations}</p>
      <p><strong>Valoración de la visita: </strong> {visit.rating_visit}</p>
      <p><strong>Comentarios: </strong> {visit.rating_comment}</p>
      <p><strong>Estado: </strong> {traducirEstadoVisita(visit.visit_status)}</p>
    </>
  );
};
