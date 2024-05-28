import { useUser } from '../../../context/authContext.jsx';
import { UpdateDelivery } from '../DeliveryNotes/UpdateDeliveryNote.jsx';
import { MoreNote } from '../DeliveryNotes/MoreNote.jsx';
import './RoutesPage.css';

export const RoutesPageNoteList = ({ notes, onDeliveryNote }) => {
  const token = useUser();

  const traducirEstadoEntrega = (estado) => {
    switch (estado) {
      case 'delivered':
        return { text: 'Entregado', color: 'green' };
      case 'cancelled':
        return { text: 'Cancelado', color: 'red' };
      case 'delivering':
        return { text: 'En reparto', color: 'orange' };
      default:
        return { text: estado, color: 'black' };
    }
  };

  return (
    <section className="routes_page_note_table">
      <div className="routes_page_noteTableHead">
        <div>Ref</div>
        <div>Nombre</div>
        <div>Fecha de la visita</div>
        <div>Estado</div>
        <div>Acciones</div>
      </div>
      <div className="routes_page_noteTableBody">
        {notes.length > 0 &&
          notes.map((noteItem) => {
            const statusEntrega = traducirEstadoEntrega(noteItem.estado);
            return (
              <div key={noteItem.ref} className="routes_page_noteTableBodyRow">
                <div className="routes_page_noteTableBodyRowStatus" style={{ color: statusEntrega.color }}>
                  {statusEntrega.text}
                </div>
                <div className="routes_page_noteTableBodyRowActions">
                  <MoreNote note={noteItem} />
                  <UpdateDelivery
                    deliveryNote={noteItem.ref}
                    onDeliveryNote={onDeliveryNote}
                    token={token}
                  />
                </div>
              </div>
            );
          })}
      </div>
    </section>
  );
};
