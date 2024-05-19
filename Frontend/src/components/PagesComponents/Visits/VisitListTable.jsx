import { getNormalizedDate } from '../../../Services/getNormalizedDate.js';
import { DeleteGenericModal } from '../../forms/DeleteGenericModal.jsx';
import { UpdateVisit } from './UpdateVisit.jsx';
import { MoreVisits } from './MoreVisits.jsx';
import { ToggleVisitStatusButton } from '../../buttons/StatesBtn/ToggleVisitStatusButton.jsx';
import '../Visits/VisitListTable.css';

export const VisitListTable = ({ visit, onUpdateVisit, onDelete, token }) => {

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

  return (
    <section id="visit_table">
      <div id="visitTableHead" className="visitTableHead">
        <div id="VisitTableHeadRowRef" className="headRow">Ref</div>
        <div id="visitTableHeadRowName" className="headRow">Nombre</div>
        <div id="visitTableHeadRowDate" className="headRow">Fecha de la visita</div>
        <div id="visitTableHeadRowStatus" className="headRow">Estado</div>
        <div id="visitTableHeadRowActions" className="headRow">Acciones</div>
      </div>
      <div id="visitTableBody">
        {visit.length > 0 && visit.map((visitItem) => {
          const estadoVisita = traducirEstadoVisita(visitItem.visit_status);
          return (
            <div key={visitItem.id_visit} id="visitTableBodyRow">
              <div className="visitTableBodyRowRef">Ref: {visitItem.ref_VT}</div>
              <div className="visitTableBodyRowName">{visitItem.customer_name}</div>
              <div className="visitTableBodyDate">
                {getNormalizedDate(visitItem.visit_date).toLocaleDateString()}
              </div>
              <div className="visitTableBodyRowStatus" style={{ color: estadoVisita.color }}>
                {estadoVisita.text}
              </div>
              <div className="visitTableBodyRowActions">
                <MoreVisits visit={visitItem} />
                <ToggleVisitStatusButton
                  id={visitItem.id_visit}
                  currentStatus={visitItem.visit_status}
                  updateVisit={onUpdateVisit}
                  token={token}
                />
                <UpdateVisit visit={visitItem.id_visit} onUpdateVisit={onUpdateVisit} />
                <DeleteGenericModal
                  id={visitItem.id_visit}
                  onDelete={onDelete}
                  token={token}
                  typeModule="visit"
                  typeModuleMessage="Visitas"
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
