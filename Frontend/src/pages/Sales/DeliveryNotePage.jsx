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

export const DeliveryNotePage = () => {
  const token = useUser();
  const typeModule = 'deliveryNotes';
  const typeModuleMessage = 'DeliveryNote';

  const {
    filteredAlbaranList,
    handleSearch,
    handleFilterChange,
    handleSortChange,
    addDeliveryNote,
    deleteDeliveryNote,
    updateDeleveryNotes,
  } = useDeliveryList(token);
  //  const [isListView, setIsListView] = useState(() => window.innerWidth <= 1000);

  const filterOptions = [
    { label: 'Pendiente', value: 'pending' },
    { label: 'Entregado', value: 'delivered' },
    { label: 'Cancelado', value: 'cancelled' },
    { label: 'En reparto', value: 'delivering' },
  ];

  const sortOptions = [
    { label: 'Fecha (Antiguos)', value: 'fecha-asc' },
    { label: 'Fecha (Recientes)', value: 'fecha-desc' },
  ];

  return (
    <MainLayout title="Albaranes">
      <section id="note_container" className="note_container mainContainer">
        <nav id="note_nav" className="mainNav">
          <SearchPages onSearch={handleSearch} />
          <CreateDeliveryNote onAddDeliveryNote={addDeliveryNote} token={token} />
          <FilterPages options={filterOptions} onChange={handleFilterChange} />
          <SortPages options={sortOptions} onSort={handleSortChange} />
           <ToggleMode  /*  onClick={() => setIsListView(prev => !prev)} isListView={isListView} */ /> 
        </nav>
        <ol className="note_list main_olist">
          {filteredAlbaranList.map((data) => (
            <li
              key={data.id_note}
              id="element_note_container"
              className="main_ilist"
            >
              <DeliveryNoteList deliveryNote={data} />
              <span id="note_actions" className="main_actions">
                <UpdateDelivery
                  deliveryNote={data.id_note}
                  onDeliveryNote={updateDeleveryNotes}
                  token={token}
                  typeModule={typeModule}
                />
                <DeleteGenericModal
                  id={data.id_note} // Asegúrate de pasar el ID correcto
                  onDelete={deleteDeliveryNote}
                  token={token}
                  typeModule={typeModule}
                  typeModuleMessage={typeModuleMessage}
                />
              </span>
            </li>
          ))}
        </ol>
      </section>
    </MainLayout>
  );
};

export default DeliveryNotePage;
