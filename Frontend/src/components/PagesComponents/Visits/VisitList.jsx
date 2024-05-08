export const VisitsList = ({ visit }) => {
  return (
    <>
      <li className="visit">
        <h2 className="element_title">ID de la visita</h2>
        <p className="element_subtitle"> {visit.id_visit}</p>
        <h3 className="element_section">Cliente</h3>
        <p>{visit.customer_name}</p>
        <h3 className="element_section">Fecha de la visita</h3>
        <p>{visit.visit_date}</p>
        <h3 className="element_section">Observaciones</h3>
        <p>{visit.observations}</p>
        <h3 className="element_section">Valoración de la visita</h3>
        <p>{visit.rating_visit}</p>
        <h3 className="element_section">Comentarios sobre la visita</h3>
        <p>{visit.rating_comment}</p>
        <h3 className="element_section">Estado</h3>
        <p>{visit.visit_status}</p>

      </li>
    </>
  );
};
