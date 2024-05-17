import { getNormalizedDate } from '../../../Services/getNormalizedDate.js';
import { useUser } from '../../../context/authContext.jsx';
import { useSalesList } from '../../../hooks/PagesHooks/useSalesList.js';
import { DeleteGenericModal } from '../../forms/DeleteGenericModal.jsx';
import { UpdateVisit } from './UpdateVisit.jsx';
import '../Visits/VisitListTable.css';
import { AddButon } from '../../buttons/addButton.jsx';

export const VisitListTable = ({ visit, onDelete }) => {
  const token = useUser();
  const visitData = visit;

  const fechaNormal = getNormalizedDate(visit.visit_date);

  const traducirEstadoVisita = (estado) => {
    switch (estado) {
      case 'scheduled':
        return 'Programada';
      case 'cancelled':
        return 'Cancelada';
      case 'completed':
        return 'Completada';
      default:
        return estado;
    }
  };

  const { updateVisit } = useSalesList(token);

  return (
    <section id="visit_table">
      {/* <div id="visitTableHeadRowNameCustomer">Cliente</div> */}
      <div id="visitTableHead">
        <div id="visitTableHeadRowName">Nombre</div>
        <div id="visitTableHeadRowDate">Fecha de la visita</div>
        {/* <div id="visitTableHeadRowDescription">Observacones</div> */}
        <div id="visitTableHeadRowRating">Valoración de la visita</div>
        {/* <div id="visitTableHeadRowComents">Comentarios</div> */}
        <div id="visitTableHeadRowStatus">Estado</div>
        <div id="visitTableHeadRowActions">Acciones</div>
      </div>
      <div id="visitTableBody">
        {visitData.length > 0 &&
          visitData.map((visit) => (
            <div key={visit.id_visit} id="visitTableBodyRow">
              <div id="visitTableBodyRowName">{visit.customer_name}</div>
              <div id="visitTableBodyDate">
                {fechaNormal.toLocaleDateString()}
              </div>
              {/* <div id="saleTableBodyRowDescription">{visit.observations}</div> */}
              <div id="saleTableBodyRowRating">{visit.rating_visit}</div>
              {/* <div id="saleTableBodyRowComents">{visit.rating_comment}</div> */}
              <div id="saleTableBodyRowStatus">
                {traducirEstadoVisita(visit.visit_status)}
              </div>
              <div id="visitTableBodyRowActions">
                <AddButon />
                <UpdateVisit
                  visit={visit.id_visit}
                  onUpdateVisit={updateVisit}
                />
                <DeleteGenericModal
                  id={visit.id_visit}
                  onDelete={onDelete}
                  token={token}
                  typeModule="visit"
                  typeModuleMessage="Visitas"
                />
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};
