import { getNormalizedDate } from '../../../Services/getNormalizedDate.js';
import { useUser } from '../../../context/authContext.jsx';
import { DeleteGenericModal } from '../../forms/DeleteGenericModal.jsx';
import { UpdateVisit } from './UpdateVisit.jsx';
import '../Visits/VisitListTable.css';
import { MoreInfo } from '../../InfoModal/MoreInfo.jsx';

export const VisitListTable = ({ visit, onUpdateSale, onDelete }) => {
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

  const moreInfoFields = [
    { name: 'ref_CT', label: 'Ref', value: visit.ref_VT },
    { name: 'Nombre', label: 'Nombre', value: visit.customer_name },
    {
      name: 'Fecha de la visita',
      label: 'Fecha de la visita',
      value: fechaNormal.toLocaleDateString(),
    },

    { name: 'Observacines', label: 'Observacines', value: visit.observations },
    {
      name: 'Valoración de la visita',
      label: 'Valoración de la visita',
      value: visit.rating_visit,
    },
    { name: 'Comentarios', label: 'Comentarios', value: visit.rating_comment },

    { name: 'Estado', label: 'Estado', value: visit.visit_status },
  ];

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
        {visitData.length > 0 &&
          visitData.map((visit) => (
            <div key={visit.id_visit} id="visitTableBodyRow">
              <div id="visitTableBodyRowRef">Ref: {visit.ref_VT}</div>
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
                <MoreInfo fields={moreInfoFields} />
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
