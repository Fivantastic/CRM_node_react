export const VisitsList = ({ visit }) => {
  return (
    <>
      <li>
        <h2>Detalles de la visita</h2>
        <p>ID de la visita: {visit.id_visit}</p>
        <h3>Cliente</h3>
        <p>Nombre del cliente: {visit.customer_name}</p>
        <h3>Estado de la visita</h3>
        <p>{visit.visit_status}</p>
        <h3>Fecha de la visita</h3>
        <p>{visit.visit_date}</p>
        <h3>Observaciones</h3>
        <p>{visit.observations}</p>
        <h3>Calificación de la visita</h3>
        <p>{visit.rating_visit}</p>
        <h3>Comentario sobre la calificación</h3>
        <p>{visit.rating_comment}</p>
      </li>
    </>
  );
};
