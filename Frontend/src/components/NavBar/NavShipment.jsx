import { useState } from 'react';
import ShipmentsCrud from '../../components/PagesComponents/Shipment/ShipmentCrud'; // Importa el componente de CRUD de envíos
import DeliveryRoutes from '../../components/PagesComponents/Shipment/DeliveryRoute'; // Importa el componente de las rutas de entrega

const NavShipment = () => {
  const [showRoutes, setShowRoutes] = useState(false); // Estado para controlar la visualización de las rutas de entrega
  const [showCrud, setShowCrud] = useState(false); // Estado para controlar la visualización del CRUD de envíos

  return (
    <nav>
      <ul>
        <li>
          <button onClick={() => setShowRoutes(!showRoutes)}>Ver Hoja de Rutas</button>
        </li>
        <li>
          <button onClick={() => setShowCrud(!showCrud)}>Mostrar Envíos</button>
        </li>
      </ul>
      {/* Muestra las rutas de entrega si showRoutes es true */}
      {showRoutes && <DeliveryRoutes />}
      
      {/* Muestra el CRUD de envíos si showCrud es true */}
      {showCrud && <ShipmentsCrud />}
    </nav>
  );
};

export default NavShipment;
