import { useState } from 'react';
import { MainLayout } from '../../layout/MainLayout.jsx';
import NavShipment from '../../components/NavBar/NavShipment.jsx'; 
import ShipmentsCrud from '../../components/PagesComponents/Shipment/ShipmentCrud.jsx'; 
import DeliveryRoutes from '../../components/PagesComponents/Shipment/DeliveryRoute.jsx'


export const ShipmentPage = () => {
  const [showCrud, setShowCrud] = useState(false); // Estado para controlar la visualización del CRUD de envíos
  const [showRoutes, setShowRoutes] = useState(false); // Estado para controlar la visualización de las rutas de entrega


  return (
    <MainLayout>
      <NavShipment setShowCrud={setShowCrud} setShowRoutes={setShowRoutes} /> {/* Pasamos las funciones para actualizar el estado de visualización del CRUD y de las rutas */}
      {showCrud && <ShipmentsCrud />} {/* Renderiza el componente de CRUD de envíos si showCrud es true */}
      {showRoutes && <DeliveryRoutes />} {/* Renderiza el componente de las rutas de entrega si showRoutes es true */}
    </MainLayout>
  );
};