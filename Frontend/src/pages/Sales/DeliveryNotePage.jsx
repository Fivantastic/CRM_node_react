import { MainLayout } from '../../layout/MainLayout.jsx';
import { useUser } from '../../context/authContext.jsx';
import { useState, useEffect } from 'react';
import { DeliveryNoteList } from '../../components/PagesComponents/DeliveryNotes/DeliveryNoteList.jsx';
import { CreateDeliveryNote } from '../../components/PagesComponents/DeliveryNotes/CreateDeliveryNote.jsx';
import { UpdateDelivery } from '../../components/PagesComponents/DeliveryNotes/UpdateDeliveryNote.jsx';
import { DeleteGenericModal } from '../../components/forms/DeleteGenericModal.jsx';
import { SearchPages } from '../../components/NavPages/SearchPages.jsx';
import { FilterPages } from '../../components/NavPages/FilterPages.jsx';
import { SortPages } from '../../components/NavPages/SortPages.jsx';
import { Toast } from '../../components/alerts/Toast.jsx';

export const DeliveryNotePage = () => {
  const token = useUser();
  const [deliveryNotesList, setDeliveryNotesList] = useState([]);
  const [filteredDeliveryNotesList, setFilteredDeliveryNotesList] = useState(
    []
  ); // Nuevo estado para la lista filtrada
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState([]);
  const [sortOption, setSortOption] = useState('');

  const typeModule = 'deliveryNotes';
  const typeModuleMessage = 'DeliveryNote';

  const fetchDeliveryNotes = async () => {
    try {
      const queryParams = new URLSearchParams({
        search: searchTerm,
        sort: sortOption,
      });

      console.log(
        'Fetching delivery notes with query:',
        queryParams.toString()
      );

      const response = await fetch(
        `http://localhost:3000/${typeModule}?${queryParams.toString()}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${token}`,
          },
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        console.log('Obtener notas de entrega satisfactorio:', responseData);
        setDeliveryNotesList(responseData.data);
      } else {
        const errorData = await response.json();
        console.error('Obtener notas de entrega fallido:', errorData);
      }
    } catch (error) {
      console.error('Error al obtener la lista de notas de entrega:', error);
    }
  };

  useEffect(() => {
    fetchDeliveryNotes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, searchTerm, sortOption]);

  useEffect(() => {
    // Filtrar la lista de notas de entrega basada en los filtros seleccionados
    let filteredList = deliveryNotesList;

    console.log('Current filters:', filters);
    console.log('Delivery notes list:', deliveryNotesList);

    if (filters.length > 0) {
      // Asumiendo que 'filters' es un array de strings (por ejemplo, ['pending', 'delivered'])
      filteredList = deliveryNotesList.filter((note) =>
        filters.some((filter) => note.delivery_status === filter)
      );
    }

    console.log('Filtered delivery notes list:', filteredList);
    setFilteredDeliveryNotesList(filteredList);
  }, [deliveryNotesList, filters]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleFilterChange = (selectedFilters) => {
    console.log('Selected filters:', selectedFilters);
    setFilters(selectedFilters);
  };

  const handleSortChange = (selectedSortOption) => {
    setSortOption(selectedSortOption);
  };

  const filterOptions = [
    { label: 'Pendiente', value: 'pending' },
    { label: 'Entregado', value: 'delivered' },
    { label: 'Cancelado', value: 'cancelled' },
    { label: 'En reparto', value: 'delivering' },
  ];

  const sortOptions = [
    { label: 'Fecha (Antiguos)', value: 'fecha-asc' },
    { label: 'Fecha (Recientes)', value: 'fecha-desc' },
    { label: 'Estado (A - Z)', value: 'estado-asc' },
    { label: 'Estado (Z - A)', value: 'estado-desc' },
  ];

  const addDeliveryNote = (newDeliveryNote) => {
    setDeliveryNotesList([...deliveryNotesList, newDeliveryNote]);
  };

  //Actualizo el estado con la venta eliminada y solicito la lista actualizada al servidor
  const deleteDeliveryNote = async (id_note) => {
    try {
      // Eliminar la venta del estado local
      setDeliveryNotesList((prevVisit) =>
        prevVisit.filter((deliveryNote) => deliveryNote.id_note !== id_note)
      );

      // Solicitar la lista actualizada de ventas al servidor utilizando la función reutilizada
      await fetchDeliveryNotes();
    } catch (error) {
      console.error('Error al eliminar la venta:', error);
      // Mostrar un mensaje de error al usuario
    }
  };

  // Actualizo el estado con la venta eliminada
  const updateDeleveryNotes = async (id_note) => {
    try {
      setDeliveryNotesList((prevSales) =>
        prevSales.filter((deleveryNotes) => deleveryNotes.id_note !== id_note)
      );

      await fetchDeliveryNotes();
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
          {filteredDeliveryNotesList.map((data) => (
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
