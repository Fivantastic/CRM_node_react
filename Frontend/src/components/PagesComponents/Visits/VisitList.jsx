import { getNormalizedDate} from "../../../Services/getNormalizedDate.js";

export const VisitsList = ({ visit }) => {
  const fechaNormal = getNormalizedDate(visit.visit_date);
  return (
    <>
      <h3 id="element_visit_section" className=" mainSubSection">Cliente</h3>
      <p>{visit.customer_name}</p>
      <p><strong>Fecha de la visita:</strong> {fechaNormal.toLocaleDateString()}</p>
      <p><strong>Observacones:</strong> {visit.observations}</p>
      <p><strong>Valoración de la visita:</strong> {visit.rating_visit}</p>
      <p><strong>Comentarios:</strong> {visit.rating_comment}</p>
      <p><strong>Estado:</strong> {visit.visit_status}</p>
    </>
  );
};
