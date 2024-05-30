import { getNormalizedDate } from '../../../Services/getNormalizedDate.js';
import { MoreInfo } from '../../InfoModal/MoreInfo.jsx';
import { DeleteGenericModal } from '../../forms/DeleteGenericModal.jsx';
import { UpdateVisit } from './UpdateVisit.jsx';
import { ToggleVisitStatusButton } from '../../buttons/StatesBtn/ToggleVisitStatusButton.jsx';
import '../../../Styles/Pages/StyleVisitList.css';
import { PencilBroken } from '../../../assets/creado/PencilBroken.jsx';

export const VisitsList = ({
  visit,
  onDelete,
  onUpdateVisit,
  typeModule,
  typeModuleMessage,
  token,
}) => {
  const fechaNormal = getNormalizedDate(visit.visit_date);

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

  const estadoVisita = traducirEstadoVisita(visit.visit_status);
  const nameComplete = `${visit.customer_name} ${visit.customer_last_name}`;
  const nameCompleteAgent = `${visit.selesAgent} ${visit.selesAgent_lastName}`;

  const moreInfoFields = [
    { label: 'Ref', value: visit.ref_VT },
    {
      label: 'Nombre',
      value: nameComplete,
    },
    { label: 'Telefono', value: visit.customer_phone },
    {
      label: 'Dirección',
      value: `${visit.address} ${visit.number}, ${visit.city}, ${visit.country}`,
    },
    { label: 'Email', value: visit.customer_email },
    { label: 'Fecha de la visita', value: fechaNormal.toLocaleDateString() },
    { label: 'Estado', value: estadoVisita.text, color: estadoVisita.color },
    { label: 'Observaciones', value: visit.observations },
    { label: 'Comercial', value: nameCompleteAgent },
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
      <p id="element_visit_subtitle" className="mainInsideSub">
        Ref: {visit.ref_VT}
      </p>
      <p id="VisitName" className="mainInsideSub VisitP">
        <strong>Contacto: </strong> { nameComplete }
      </p>
      <p id="VisitPhone" className="mainInsideSub VisitP">
        <strong>Telefono: </strong> {visit.customer_phone}
      </p>
      <p id="VisitDate" className="mainInsideSub VisitP">
        <strong>Fecha de visita: </strong> {fechaNormal.toLocaleDateString()}
      </p>
      <p
        id="VisitState"
        className={`mainInsideSub VisitP ${visit.visit_status}`}
        style={{ color: estadoVisita.color }}
      >
        <strong>Estado: </strong> {estadoVisita.text}
      </p>

      <span id="visit_actions" className="main_actions">
        <MoreInfo fields={moreInfoFields} modalIds={modalIds} />
        <ToggleVisitStatusButton
          id={visit.id_visit}
          currentStatus={visit.visit_status}
          updateVisit={onUpdateVisit}
          token={token}
        />
          {visit.visit_status === 'completed'? (
            <PencilBroken  />
          ) : visit.visit_status === 'cancelled'? (
            <PencilBroken />
          ) : (
          <UpdateVisit visit={visit.id_visit} onUpdateVisit={onUpdateVisit} />
          )}
        <DeleteGenericModal
          id={visit.id_visit}
          onDelete={onDelete}
          token={token}
          typeModule={typeModule}
          typeModuleMessage={typeModuleMessage}
        />
      </span>
    </>
  );
};
