import { useUser } from '../../../context/authContext.jsx';
import { ShipmentList } from '../../../components/PagesComponents/Shipment/ShipmentList.jsx';
import { CreateShipment } from '../../../components/PagesComponents/Shipment/CreateShipment.jsx';
import { UpdateShipment } from '../../../components/PagesComponents/Shipment/UpdateShipment.jsx';
import { DeleteGenericModal } from '../../../components/forms/DeleteGenericModal.jsx';
import { SearchPages } from '../../../components/NavPages/SearchPages.jsx';
import { FilterPages } from '../../../components/NavPages/FilterPages.jsx';
import { SortPages } from '../../../components/NavPages/SortPages.jsx';
import  useShipmentList  from '../../../hooks/PagesHooks/useShipmentList.js';
import { ToggleMode } from '../../NavPages/ToggleMode.jsx';

const ShipmentsCrud = () => {
  const token = useUser();
  const typeModule = 'shipment';
  const typeModuleMessage = 'Envío';

  const {
    filteredShipmentList,
    handleSearch,
    handleFilterChange,
    handleSortChange,
    getShipmentList,
    setFilteredShipmentList,
  } = useShipmentList(token);
  // const [isListView, setIsListView] = useState(true);


  const filterOptions = [
    { label: 'Pendiente', value: 'pending' },
    { label: 'En Tránsito', value: 'inTransit' },
    { label: 'Entregado', value: 'delivered' },
    { label: 'Retrasado', value: 'delayed' },
    { label: 'Cancelado', value: 'cancelled' },
  ];

  const sortOptions = [
    { label: 'Fecha (Antiguos)', value: 'fecha-asc' },
    { label: 'Fecha (Recientes)', value: 'fecha-desc' },
  ];

  const addShipment = async () => {
    try {
      await getShipmentList();
    } catch (error) {
      console.error('Error al agregar el envío:', error);
    }
  };

  const deleteShipment = async (id_shipment) => {
    try {
      setFilteredShipmentList((prevShipments) =>
        prevShipments.filter((shipment) => shipment.id_shipment !== id_shipment)
      );
      await getShipmentList();
    } catch (error) {
      console.error('Error al eliminar el envío:', error);
    }
  };

  const updateShipment = async (id_shipment) => {
    try {
      setFilteredShipmentList((prevShipments) =>
        prevShipments.filter((shipment) => shipment.id_shipment !== id_shipment)
      );
      await getShipmentList();
    } catch (error) {
      console.error('Error al actualizar el envío:', error);
    }
  };

  return (
    <section id="shipment_container" className="mainContainer">
      <nav className="mainNav">
        <SearchPages onSearch={handleSearch} />
        <CreateShipment onAddShipment={addShipment} token={token} />
        <FilterPages options={filterOptions} onChange={handleFilterChange} />
        <SortPages options={sortOptions} onSort={handleSortChange} />
        <ToggleMode /*onClick={() => setIsListView(prev => !prev)} */ />
      </nav>
      <ol id="shipments_list" className="main_olist">
        {filteredShipmentList.map((data) => (
          <li key={data.id_shipment} className="main_ilist">
            <ShipmentList shipment={data} />
            <UpdateShipment
              shipment={data.id_shipment}
              onUpdateShipment={updateShipment}
              token={token}
            />
            <DeleteGenericModal
              id={data.id_shipment}
              onDelete={deleteShipment}
              token={token}
              typeModule={typeModule}
              typeModuleMessage={typeModuleMessage}
            />
          </li>
        ))}
      </ol>
    </section>
  );
};

export default ShipmentsCrud;
