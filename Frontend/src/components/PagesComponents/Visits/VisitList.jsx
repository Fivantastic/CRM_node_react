import { getNormalizedDate } from '../../../Services/getNormalizedDate.js';
import { MoreInfo } from '../../InfoModal/MoreInfo.jsx';
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

  console.log(visit.visit_date);
  
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

  const nameComplete = `${visit.visit_name} `;

  const moreInfoFields = [
    { name: 'ref_CT', label: 'Ref', value: visit.ref_VT },
    { name: 'Nombre', label: 'Nombre', value: nameComplete },
    {
      name: 'Fecha de la visita',
      label: 'Fecha de la visita',
      value: fechaNormal.toLocaleDateString(),
    },

    { name: 'Observacones', label: 'Observacones', value: visit.observations },
    {
      name: 'Valoración de la visita',
      label: 'Valoración de la visita',
      value: visit.rating_visit,
    },
    { name: 'Comentarios', label: 'Comentarios', value: visit.rating_comment },

    { name: 'Estado', label: 'Estado', value: visit.visit_status },
  ];

  const modalIds = {
    idModalContainer: 'visitModalContainer',
    idModalHeader: 'visitModalHeader',
    idModalTitle: 'visitModalTitle',
    idModalBody: 'visitModalBody',
    idModalFooter: 'visitModalFooter',
    idModalBtnClose: 'visitModalBtnClose',
  };

  return (
    <>
      <h2 id="element_visit_section" className=" mainSubSection">
        Cliente
      </h2>
      <p id="element_visit_subtitle" className="mainInsideSub">
        Ref: {visit.ref_VT}
      </p>
      <p>
        <strong>Nombre: </strong> {visit.visit_name}
      </p>
      <p>
        <strong>Fecha de la visita: </strong> {fechaNormal.toLocaleDateString()}
      </p>
      {/* <p>
        <strong>Observacones: </strong> {visit.observations}
      </p> */}
      <p>
        <strong>Valoración de la visita: </strong> {visit.rating_visit}
      </p>
      {/* <p>
        <strong>Comentarios: </strong> {visit.rating_comment}
      </p> */}
      <p>
        <strong>Estado: </strong> {traducirEstadoVisita(visit.visit_status)}
      </p>
      <span id="visit_actions" className="main_actions">
        <MoreInfo fields={moreInfoFields} modalIds={[]} />
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
