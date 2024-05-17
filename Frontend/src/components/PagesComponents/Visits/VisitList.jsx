import { getNormalizedDate } from '../../../Services/getNormalizedDate.js';
import { DeleteGenericModal } from '../../forms/DeleteGenericModal.jsx';
import { UpdateVisit } from './UpdateVisit.jsx';

export const VisitsList = ({
  visit,
  updateVisit,
  deleteVisit,
  token,
  typeModule,
  typeModuleMessage,
}) => {
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
  };
  return (
    <>
      <h2 id="element_visit_section" className=" mainSubSection">
        Cliente
      </h2>
      <p>
        <strong>Nombre: </strong> {visit.customer_name}
      </p>
      <p>
        <strong>Fecha de la visita: </strong> {fechaNormal.toLocaleDateString()}
      </p>
      <p>
        <strong>Observacones: </strong> {visit.observations}
      </p>
      <p>
        <strong>Valoración de la visita: </strong> {visit.rating_visit}
      </p>
      <p>
        <strong>Comentarios: </strong> {visit.rating_comment}
      </p>
      <p>
        <strong>Estado: </strong> {traducirEstadoVisita(visit.visit_status)}
      </p>
      <span id="visit_actions" className="main_actions">
        <UpdateVisit visit={visit.id_visit} onUpdateVisit={updateVisit} />
        <DeleteGenericModal
          id={visit.id_visit}
          onDelete={deleteVisit}
          token={token}
          typeModule={typeModule}
          typeModuleMessage={typeModuleMessage}
        />
      </span>
    </>
  );
};
