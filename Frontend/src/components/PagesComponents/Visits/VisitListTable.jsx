import { getNormalizedDate } from '../../../Services/getNormalizedDate.js';
import { useUser } from '../../../context/authContext.jsx';
import { DeleteGenericModal } from '../../forms/DeleteGenericModal.jsx';
import { UpdateVisit } from './UpdateVisit.jsx';
import { MoreVisits } from './MoreVisits.jsx';
import '../Visits/VisitListTable.css';

export const VisitListTable = ({ visit, onUpdateSale, onDelete }) => {
  const token = useUser();

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


  const modalIds = {
    idModalContainer: 'visitModalContainer',
    idModalHeader: 'visitModalHeader',
    idModalTitle: 'visitModalTitle',
    idModalBody: 'visitModalBody',
    idModalFooter: 'visitModalFooter',
    idModalBtnClose: 'visitModalBtnClose',
  };

  return (
    <section id="visit_table">
      {/* <div id="visitTableHeadRowNameCustomer">Cliente</div> */}
      <div id="visitTableHead">
        <div id="VisitTableHeadRowRef">Ref</div>
        <div id="visitTableHeadRowName">Nombre</div>
        <div id="visitTableHeadRowDate">Fecha de la visita</div>
        {/* <div id="visitTableHeadRowDescription">Observacones</div> */}
        <div id="visitTableHeadRowRating">Valoración de la visita</div>
        {/* <div id="visitTableHeadRowComents">Comentarios</div> */}
        <div id="visitTableHeadRowStatus">Estado</div>
        <div id="visitTableHeadRowActions">Acciones</div>
      </div>
      <div id="visitTableBody">
        {visit.length > 0 &&
          visit.map((visit) => (
            <div key={visit.id_visit} id="visitTableBodyRow">
              <div id="visitTableBodyRowRef">Ref: {visit.ref_VT}</div>
              <div id="visitTableBodyRowName">{visit.customer_name}</div>
              <div id="visitTableBodyDate">
                {getNormalizedDate(visit.visit_date).toLocaleDateString()}
              </div>
              {/* <div id="saleTableBodyRowDescription">{visit.observations}</div> */}
              <div id="saleTableBodyRowRating">{visit.rating_visit}</div>
              {/* <div id="saleTableBodyRowComents">{visit.rating_comment}</div> */}
              <div id="saleTableBodyRowStatus">
                {traducirEstadoVisita(visit.visit_status)}
              </div>
              <div id="visitTableBodyRowActions">
                <MoreVisits visit={visit} />
                <UpdateVisit
                  visit={visit.id_visit}
                  onUpdateVisit={onUpdateSale}
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
