import { MainLayout } from '../../layout/MainLayout.jsx';
import { useUser } from '../../context/authContext.jsx';
import { DeliveryNoteList } from '../../components/PagesComponents/DeliveryNotes/DeliveryNoteList.jsx';
import { CreateDeliveryNote } from '../../components/PagesComponents/DeliveryNotes/CreateDeliveryNote.jsx';
import { UpdateDelivery } from '../../components/PagesComponents/DeliveryNotes/UpdateDeliveryNote.jsx';
import { DeleteGenericModal } from '../../components/forms/DeleteGenericModal.jsx';
import { SearchPages } from '../../components/NavPages/SearchPages.jsx';
import { FilterPages } from '../../components/NavPages/FilterPages.jsx';
import { SortPages } from '../../components/NavPages/SortPages.jsx';
import { Toast } from '../../components/alerts/Toast.jsx';
import { useDeliveryList } from '../../hooks/PagesHooks/useDeliveryList.js'; // Asegúrate de que la ruta es correcta

export const DeliveryNotePage = () => {
  const token = useUser();
  const typeModule = 'deliveryNotes';
  const typeModuleMessage = 'DeliveryNote';

  const {
    filteredAlbaranList,
    handleSearch,
    handleFilterChange,
    handleSortChange,
    getAlbaranList,
    setFilteredAlbaranList,
  } = useDeliveryList(token);

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

  const addDeliveryNote = (newDeliveryNote) => {
    setFilteredAlbaranList((prevList) => [...prevList, newDeliveryNote]);
  };

  const deleteDeliveryNote = async (id_note) => {
    try {
      // Eliminar la venta del estado local
      setFilteredAlbaranList((prevList) =>
        prevList.filter((deliveryNote) => deliveryNote.id_note !== id_note)
      );
      // Solicitar la lista actualizada de ventas al servidor utilizando la función reutilizada
      await getAlbaranList();
    } catch (error) {
      console.error('Error al eliminar la venta:', error);
      // Mostrar un mensaje de error al usuario
    }
  };

  const updateDeleveryNotes = async (id_note) => {
    try {
      // Actualizar el estado de filteredAlbaranList
      setFilteredAlbaranList((prevList) =>
        prevList.filter((deleveryNotes) => deleveryNotes.id_note !== id_note)
      );
      await getAlbaranList();
    } catch (error) {
      console.error('Error al actualizar la factura:', error);
      Toast.fire({
        icon: 'error',
        title: 'Error al actualizar la factura',
      });
    }
  };

  return (
    <MainLayout>
      <section id="note_container" className="note_container mainContainer">
        <h1 id="note_title" className=" mainTitle">
          Albaranes
        </h1>
        <nav className="mainNav">
          <SearchPages onSearch={handleSearch} />
          <FilterPages options={filterOptions} onChange={handleFilterChange} />
          <SortPages options={sortOptions} onSort={handleSortChange} />
        </nav>
        <CreateDeliveryNote onAddDeliveryNote={addDeliveryNote} token={token} />
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
