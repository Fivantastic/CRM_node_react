import { useEffect, useState, useRef } from 'react';
import { useUser } from '../../../context/authContext.jsx';
import { SearchPages } from '../../../components/NavPages/SearchPages.jsx';
import { CreateShipment } from '../../../components/PagesComponents/Shipment/CreateShipment.jsx';
import { SortPages } from '../../../components/NavPages/SortPages.jsx';
import { FilterPages } from '../../../components/NavPages/FilterPages.jsx';
import { ToggleMode } from '../../../components/NavPages/ToggleMode.jsx';
import { ShipmentList } from '../../../components/PagesComponents/Shipment/ShipmentList.jsx';
import { MoreShipments } from '../../../components/PagesComponents/Shipment/MoreShipments.jsx';
import { UpdateShipment } from '../../../components/PagesComponents/Shipment/UpdateShipment.jsx';
import { DeleteGenericModal } from '../../../components/forms/DeleteGenericModal.jsx';
import useShipmentList from '../../../hooks/PagesHooks/useShipmentList.js';
import { ShipmentListTable } from './ShipmentListTable.jsx';
import '../../../Styles/Pages/StyleShipmentList.css';

export const ShipmentsCrud = () => {
  const token = useUser();
  const typeModule = 'shipment';
  const typeModuleMessage = 'Envío';

  const {
    filteredShipmentList,
    handleSearch,
    handleFilterChange,
    handleSortChange,
    addShipment,
    deleteShipment,
    updateShipment
  } = useShipmentList(token);

  const [isListView, setIsListView] = useState(() => window.innerWidth <= 825);
  const [selectedShipment, setSelectedShipment] = useState(null);
  const popupRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsListView(window.innerWidth <= 825);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setSelectedShipment(null);
    }
  };

  const handleShipmentClick = (shipmentId) => {
    if (selectedShipment === shipmentId) {
      setSelectedShipment(null);
    } else {
      setSelectedShipment(shipmentId);
    }
  };

  const filterOptions = [
    { label: 'Pendiente', value: 'pending' },
    { label: 'En Reparto', value: 'inTransit' },
    { label: 'Retrasado', value: 'delayed' },
    { label: 'Cancelado', value: 'cancelled' },
    { label: 'Entregado', value: 'delivered' },
  ];

  const sortOptions = [
    { label: 'Fecha (Antiguos)', value: 'fecha-asc' },
    { label: 'Fecha (Recientes)', value: 'fecha-desc' },
    { label: 'Ref (ASC)', value: 'ref-asc' },
    { label: 'Ref (DSC)', value: 'ref-desc' },
  ];

  return (
    <section id="shipment_container" className="mainContainer">
      <nav id="user_nav" className="mainNav">
        <SearchPages onSearch={handleSearch} />
        <CreateShipment onAddShipment={addShipment} token={token} />
        <FilterPages options={filterOptions} onChange={handleFilterChange} />
        <SortPages options={sortOptions} onSort={handleSortChange} />
        <ToggleMode onClick={() => setIsListView((prev) => !prev)} isListView={isListView} />
      </nav>
      {isListView ? (
        <div id="shipments_list" className="main_olist">
          {filteredShipmentList.map((shipment) => (
            <div key={shipment.id_shipment} id="element_shipment_container" className="main_ilist">
              <div className="shipment-item" onClick={() => handleShipmentClick(shipment.id_shipment)}>
                <ShipmentList shipment={shipment} />
              </div>
              <div id="shipment_actions" className="main_actions">
                <MoreShipments shipment={shipment} key={`more-${shipment.id_shipment}`} />
                <UpdateShipment
                  shipment={shipment.id_shipment}
                  onUpdateShipment={updateShipment}
                  token={token}
                  key={`update-${shipment.id_shipment}`}
                />
                <DeleteGenericModal
                  id={shipment.id_shipment}
                  onDelete={deleteShipment}
                  token={token}
                  typeModule={typeModule}
                  typeModuleMessage={typeModuleMessage}
                  key={`delete-${shipment.id_shipment}`}
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div id="shipments_table">
          <ShipmentListTable
            shipment={filteredShipmentList}
            onUpdateShipment={updateShipment}
            onDelete={deleteShipment}
            token={token}
          />
        </div>
      )}
      {selectedShipment && (
        <div className="popup open" ref={popupRef}>
          <h6>Detalles del envío</h6>
          {filteredShipmentList.find(shipment => shipment.id_shipment === selectedShipment) && (
            <>
              <p><strong>Nombre:</strong> {filteredShipmentList.find(shipment => shipment.id_shipment === selectedShipment)?.customer_name}</p>
              <p><strong>Compañía:</strong> {filteredShipmentList.find(shipment => shipment.id_shipment === selectedShipment)?.company_name}</p>
              <p><strong>Dirección:</strong> {filteredShipmentList.find(shipment => shipment.id_shipment === selectedShipment)?.delivery_address}</p>
              <p><strong>NIF:</strong> {filteredShipmentList.find(shipment => shipment.id_shipment === selectedShipment)?.NIF}</p>
              <p><strong>Producto:</strong> {filteredShipmentList.find(shipment => shipment.id_shipment === selectedShipment)?.product_name}</p>
              <p><strong>Cantidad:</strong> {filteredShipmentList.find(shipment => shipment.id_shipment === selectedShipment)?.product_quantity}</p>
              <p><strong>Ciudad:</strong> {filteredShipmentList.find(shipment => shipment.id_shipment === selectedShipment)?.address_city}</p>
              <p><strong>Teléfono:</strong> {filteredShipmentList.find(shipment => shipment.id_shipment === selectedShipment)?.customer_phone}</p>
            </>
          )}
        </div>
      )}
    </section>
  );
};
