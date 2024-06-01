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
import { Prohibited } from '../../buttons/BtnForms/Prohibited.jsx';

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
    { label: 'En trásnsito', value: 'inTransit' },
    { label: 'Entregados', value: 'delivered' },
    { label: 'Cancelados', value: 'cancelled' },
    { label: 'Atrasados', value: 'delayed' },
    { label: 'Rechazados', value: 'refused' },
  ];

  const sortOptions = [
    { label: 'Ref (DSC)', value: 'ref-desc' },
    { label: 'Ref (ASC)', value: 'ref-asc' },
    { label: 'Fecha (Antiguos)', value: 'fecha-asc' },
    { label: 'Fecha (Recientes)', value: 'fecha-desc' },
  ];

  const defaultSort = { label: 'Ref (DSC)', value: 'ref-desc' }

  return (
    <section id="shipment_container" className="mainContainer">
      <nav id="user_nav" className="mainNav">
        <SearchPages onSearch={handleSearch} />
        <CreateShipment onAddShipment={addShipment} token={token} typeModule={typeModule} />
        <FilterPages options={filterOptions} onChange={handleFilterChange} />
        <SortPages options={sortOptions} onSort={handleSortChange} defaultSort={defaultSort}/>
        <ToggleMode onClick={() => setIsListView((prev) => !prev)} isListView={isListView} />
      </nav>
      {isListView ? (
        <div id="shipments_list" className="main_olist">
          {filteredShipmentList.length > 0 ? (
            filteredShipmentList.map((shipment) => (
              <div key={shipment.id_shipment} id="element_shipment_container" className="main_ilist">
                <div className="shipment-item" onClick={() => handleShipmentClick(shipment.id_shipment)}>
                  <ShipmentList shipment={shipment} />
                </div>
                <div id="shipment_actions" className="main_actions">
                  <MoreShipments shipment={shipment} />
                  {['delayed', 'cancelled', 'refused'].includes(shipment.shipment_status) ? 
                    <Prohibited /> : 
                    <UpdateShipment
                      shipment={shipment.id_shipment}
                      onUpdateShipment={updateShipment}
                      token={token}
                    />
                  }
                  <DeleteGenericModal
                    id={shipment.id_shipment}
                    onDelete={deleteShipment}
                    token={token}
                    typeModule={typeModule}
                    typeModuleMessage={typeModuleMessage}
                  />
                </div>
              </div>
            ))
          ) : (
            <div className="noResult">No hay envíos disponibles</div>
          )}
        </div>
      ) : (
        <div id="shipments_table">
          <ShipmentListTable
            shipment={filteredShipmentList}
            updateShipment={updateShipment}
            deleteShipment={deleteShipment}
            token={token}
          />
        </div>
      )}
    </section>
  );
};





