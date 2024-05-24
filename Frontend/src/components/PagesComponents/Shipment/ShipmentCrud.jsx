import { useUser } from '../../../context/authContext.jsx';
import { useEffect, useState } from 'react';
import { SearchPages } from '../../../components/NavPages/SearchPages.jsx';
import { CreateShipment } from '../../../components/PagesComponents/Shipment/CreateShipment.jsx';
import { SortPages } from '../../../components/NavPages/SortPages.jsx';
import { FilterPages } from '../../../components/NavPages/FilterPages.jsx';
import { ToggleMode } from '../../NavPages/ToggleMode.jsx';
import { ShipmentList } from '../../../components/PagesComponents/Shipment/ShipmentList.jsx';
import { MoreShipments } from '../../../components/PagesComponents/Shipment/MoreShipments.jsx';
import { UpdateShipment } from '../../../components/PagesComponents/Shipment/UpdateShipment.jsx';
import { DeleteGenericModal } from '../../../components/forms/DeleteGenericModal.jsx';
import '../../../Styles/Pages/StyleShipmentList.css'

import useShipmentList from '../../../hooks/PagesHooks/useShipmentList.js';
import { ShipmentListTable } from './ShipmentListTable.jsx';

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
  const [isListView, setIsListView] = useState(() => window.innerWidth <=825);

  useEffect(() => {
    const handleResize = () => {
      setIsListView(window.innerWidth <= 825);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const filterOptions = [
    { label: 'Pendiente', value: 'pending' },
    { label: 'En Tránsito', value: 'inTransit' },
    { label: 'Retrasado', value: 'delayed' },
  ];

  const sortOptions = [
    { label: 'Fecha (Antiguos)', value: 'fecha-asc' },
    { label: 'Fecha (Recientes)', value: 'fecha-desc' },
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
          <ol id="shipments_list" className="main_olist">
            {filteredShipmentList.map((shipment) => (
              <li key={shipment.id_shipment} id="element_shipment_container" className="main_ilist">
                <ShipmentList shipment={shipment} />
                <span id="shipment_actions" className="main_actions">
                  <MoreShipments shipment={shipment} />
                  <UpdateShipment
                    shipment={shipment.id_shipment}
                    onUpdateShipment={updateShipment}
                    token={token}
                  />
                  <DeleteGenericModal
                    id={shipment.id_shipment}
                    onDelete={deleteShipment}
                    token={token}
                    typeModule={typeModule}
                    typeModuleMessage={typeModuleMessage}
                  />
                </span>
              </li>
            ))}
          </ol>
        ) : (
          <ShipmentListTable shipment={filteredShipmentList} onUpdateShipment={updateShipment} onDelete={deleteShipment} />
        )}
      </section>
  );
};
