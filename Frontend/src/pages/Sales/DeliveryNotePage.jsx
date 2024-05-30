import { MainLayout } from '../../layout/MainLayout.jsx';
import { useUser } from '../../context/authContext.jsx';
import { DeliveryNoteList } from '../../components/PagesComponents/DeliveryNotes/DeliveryNoteList.jsx';
import { CreateDeliveryNote } from '../../components/PagesComponents/DeliveryNotes/CreateDeliveryNote.jsx';
import { UpdateDelivery } from '../../components/PagesComponents/DeliveryNotes/UpdateDeliveryNote.jsx';
import { DeleteGenericModal } from '../../components/forms/DeleteGenericModal.jsx';
import { SearchPages } from '../../components/NavPages/SearchPages.jsx';
import { FilterPages } from '../../components/NavPages/FilterPages.jsx';
import { SortPages } from '../../components/NavPages/SortPages.jsx';
import { useDeliveryList } from '../../hooks/PagesHooks/useDeliveryList.js';
import { ToggleMode } from '../../components/NavPages/ToggleMode.jsx';
import { useEffect, useState } from 'react';
import { NoteListTable } from '../../components/PagesComponents/DeliveryNotes/NoteListTable.jsx';
import { MoreNote } from '../../components/PagesComponents/DeliveryNotes/MoreNote.jsx';

export const DeliveryNotePage = () => {
  const token = useUser();
  const typeModule = 'deliveryNotes';
  const typeModuleMessage = 'Entrega';

  const {
    filteredAlbaranList,
    handleSearch,
    handleFilterChange,
    handleSortChange,
    addDeliveryNote,
    deleteDeliveryNote,
    updateDeleveryNotes,
  } = useDeliveryList(token);

  const [isListView, setIsListView] = useState(() => window.innerWidth <= 1205);

  useEffect(() => {
    const handleResize = () => {
      setIsListView(window.innerWidth <= 1205);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  'pending', 'readyToShipment', 'incidence', 'cancelled', 'delivering', 'delivered'
  const filterOptions = [
    { label: 'Pendiente', value: 'pending' },
    { label: 'Listo para envio', value: 'readyToShipment' },
    { label: 'En reparto', value: 'delivering' },
    { label: 'Incidencia', value: 'incidence' },
    { label: 'Cancelado', value: 'cancelled' },
    { label: 'Entregado', value: 'delivered' },
  ];

  const sortOptions = [
    { label: 'Nombre (A - Z)', value: 'nombre-asc' },
    { label: 'Nombre (Z - A)', value: 'nombre-desc' },
    { label: 'Fecha (Antiguos)', value: 'fecha-asc' },
    { label: 'Fecha (Recientes)', value: 'fecha-desc' },
    { label: 'Ref (ASC)', value: 'ref-asc' },
    { label: 'Ref (DSC)', value: 'ref-desc' },
  ];

  return (
    <MainLayout title="Albaranes">
      <section id="note_container" className="note_container mainContainer">
        <nav id="user_nav" className="mainNav">
          <SearchPages onSearch={handleSearch} />
          <CreateDeliveryNote onAddDeliveryNote={addDeliveryNote} token={token} />
          <FilterPages options={filterOptions} onChange={handleFilterChange} />
          <SortPages options={sortOptions} onSort={handleSortChange} />
          <ToggleMode onClick={() => setIsListView((prev) => !prev)} isListView={isListView} />
        </nav>
        {isListView ? (
          <ol id="note_list" className="main_olist">
            {filteredAlbaranList.length > 0 ? (
              filteredAlbaranList.map((note) => (
                <li key={note.id_note} id="element_note_container" className="main_ilist">
                  <DeliveryNoteList deliveryNote={note} />
                  <span id="note_actions" className="main_actions">
                    <MoreNote note={note} />
                    <UpdateDelivery
                      deliveryNote={note.id_note}
                      onDeliveryNote={updateDeleveryNotes}
                      token={token}
                      typeModule={typeModule}
                    />
                    <DeleteGenericModal
                      id={note.id_note}
                      onDelete={deleteDeliveryNote}
                      token={token}
                      typeModule={typeModule}
                      typeModuleMessage={typeModuleMessage}
                    />
                  </span>
                </li>
              ))
            ) : (
              <div className="noResult">No hay albaranes disponibles</div>
            )}
          </ol>
        ) : (
          <NoteListTable
            note={filteredAlbaranList}
            onDeliveryNote={updateDeleveryNotes}
            onDelete={deleteDeliveryNote}
          />
        )}

      </section>
    </MainLayout>
  );
};
