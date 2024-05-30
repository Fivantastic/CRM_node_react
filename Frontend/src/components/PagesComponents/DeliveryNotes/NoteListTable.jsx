import { useUser } from '../../../context/authContext.jsx';
import { UpdateDelivery } from './UpdateDeliveryNote.jsx';
import { DeleteGenericModal } from '../../forms/DeleteGenericModal.jsx';
import { getNormalizedDate } from '../../../Services/getNormalizedDate.js';
import { MoreNote } from './MoreNote.jsx';
import './NoteListTable.css';

export const NoteListTable = ({ note, onDeliveryNote, onDelete }) => {
  const token = useUser();

  const traducirEstadoEntrega = (estado) => {
    switch (estado) { 
      case 'pending':
        return { text: 'Pendiente', color: 'blue' };
      case 'delivered':
        return { text: 'Entregado', color: 'green' };
      case 'cancelled':
        return { text: 'Cancelado', color: 'red' };
      case 'delivering':
        return { text: 'En reparto', color: 'orange' };
      case 'readyToShipment':
        return { text: 'Listo para envio', color: 'orange' };
      case 'incidence':
        return { text: 'Incidencia', color: 'red' };
      default:
        return { text: estado, color: 'black' };
    }
  };

  return (
    <section id="note_table">
      <div id="noteTableHead">
        <div id="noteTableHeadRowRef">Ref. Albarán</div>
        <div id="noteTableHeadRowRefSales">Ref. Venta</div>
        <div id="noteTableHeadRowCompany">Empresa</div>
        <div id="noteTableHeadRowProduct">Producto</div>
        <div id="noteTableHeadRowQuantity">Cant.</div>
        <div id="noteTableHeadRowDate">F. entrega</div>
        <div id="noteTableHeadRowStatus">Estado</div>
        <div id="noteTableHeadRowActions">Acciones</div>
      </div>
      <div id="noteTableBody">
        {note.length > 0 &&
          note.map((noteItem) => {
            const fechaEntrega = getNormalizedDate(noteItem.delivery_date);
            const statusEntrega = traducirEstadoEntrega(noteItem.delivery_status);
            return (
              <div key={noteItem.id_note} className="noteTableBodyRow">
                <div className="noteTableBodyRowRef">{noteItem.ref_DN}</div>
                <div className="noteTableBodyRowRefSales">{noteItem.ref_SL}</div>
                <div className="noteTableBodyRowCompany">{noteItem.company_name}</div>
                <div className="noteTableBodyRowProduct">{noteItem.product_name}</div>
                <div className="noteTableBodyRowQuantity">{noteItem.product_quantity} u.</div>
                <div className="noteTableBodyRowDate">{fechaEntrega.toLocaleDateString()}</div>
                <div className="noteTableBodyRowStatus" style={{ color: statusEntrega.color }}>
                  {statusEntrega.text}
                </div>
                <span className="noteTableBodyRowActions">
                  <MoreNote note={noteItem} />
                  <UpdateDelivery
                    deliveryNote={noteItem.id_note}
                    onDeliveryNote={onDeliveryNote}
                    token={token}
                  />
                  <DeleteGenericModal
                    id={noteItem.id_note}
                    onDelete={onDelete}
                    token={token}
                    typeModule="deliveryNotes"
                    typeModuleMessage="Entrega"
                  />
                </span>
              </div>
            );
          })}
      </div>
    </section>
  );
};
